from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, validator
from typing import List, Dict, Any, Optional
import asyncio
import socket
import subprocess
import logging
from datetime import datetime
import ipaddress
import json
import uuid

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/network", tags=["Network Scanning"])

# Pydantic Models
class PortScanRequest(BaseModel):
    target: str
    ports: Optional[List[int]] = None
    port_range: Optional[str] = None  # e.g., "1-1000"
    scan_type: str = "tcp"  # tcp, udp, syn
    timeout: int = 3
    max_threads: int = 100

    @validator('target')
    def validate_target(cls, v):
        try:
            # Try to parse as IP address
            ipaddress.ip_address(v)
            return v
        except ValueError:
            # If not IP, assume it's a hostname
            if len(v) > 0 and all(c.isalnum() or c in '.-' for c in v):
                return v
            raise ValueError('Invalid target format')

class NetworkDiscoveryRequest(BaseModel):
    network: str  # e.g., "192.168.1.0/24"
    discovery_method: str = "ping"  # ping, arp, tcp
    timeout: int = 2
    max_hosts: int = 254

    @validator('network')
    def validate_network(cls, v):
        try:
            ipaddress.ip_network(v, strict=False)
            return v
        except ValueError:
            raise ValueError('Invalid network format (use CIDR notation)')

class VulnerabilityScanRequest(BaseModel):
    target: str
    scan_depth: str = "basic"  # basic, intermediate, deep
    check_services: bool = True
    check_ssl: bool = True
    check_headers: bool = True

class ScanResult(BaseModel):
    scan_id: str
    target: str
    scan_type: str
    status: str
    start_time: datetime
    end_time: Optional[datetime] = None
    results: Dict[str, Any]
    error: Optional[str] = None

# In-memory storage for scan results (in production, use a database)
scan_results = {}

# Network Scanning Service
class NetworkScanService:
    def __init__(self):
        self.active_scans = {}
    
    async def tcp_port_scan(self, target: str, ports: List[int], timeout: int = 3) -> Dict[str, Any]:
        """Perform TCP port scan"""
        open_ports = []
        closed_ports = []
        filtered_ports = []
        
        async def scan_port(port: int):
            try:
                # Create socket connection
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                sock.settimeout(timeout)
                
                result = sock.connect_ex((target, port))
                
                if result == 0:
                    # Try to get service banner
                    try:
                        sock.send(b'\r\n')
                        banner = sock.recv(1024).decode('utf-8', errors='ignore').strip()
                    except:
                        banner = ""
                    
                    open_ports.append({
                        "port": port,
                        "state": "open",
                        "service": self.get_service_name(port),
                        "banner": banner[:100] if banner else ""  # Limit banner length
                    })
                else:
                    closed_ports.append(port)
                
                sock.close()
                
            except socket.timeout:
                filtered_ports.append(port)
            except Exception as e:
                logger.error(f"Port scan error for {target}:{port} - {e}")
                filtered_ports.append(port)
        
        # Limit concurrent connections
        semaphore = asyncio.Semaphore(50)
        
        async def scan_with_semaphore(port):
            async with semaphore:
                await scan_port(port)
        
        # Execute port scans concurrently
        tasks = [scan_with_semaphore(port) for port in ports]
        await asyncio.gather(*tasks, return_exceptions=True)
        
        return {
            "target": target,
            "scan_type": "tcp_port_scan",
            "total_ports": len(ports),
            "open_ports": open_ports,
            "closed_ports": len(closed_ports),
            "filtered_ports": len(filtered_ports),
            "scan_duration": "completed"
        }
    
    def get_service_name(self, port: int) -> str:
        """Get common service name for port"""
        common_ports = {
            21: "FTP", 22: "SSH", 23: "Telnet", 25: "SMTP", 53: "DNS",
            80: "HTTP", 110: "POP3", 143: "IMAP", 443: "HTTPS", 993: "IMAPS",
            995: "POP3S", 3389: "RDP", 5432: "PostgreSQL", 3306: "MySQL",
            1433: "MSSQL", 27017: "MongoDB", 6379: "Redis", 5672: "RabbitMQ",
            9200: "Elasticsearch", 8080: "HTTP-Alt", 8443: "HTTPS-Alt"
        }
        return common_ports.get(port, "Unknown")
    
    async def network_discovery(self, network: str, method: str = "ping", timeout: int = 2) -> Dict[str, Any]:
        """Discover active hosts in network"""
        try:
            net = ipaddress.ip_network(network, strict=False)
            active_hosts = []
            
            async def ping_host(ip: str):
                try:
                    if method == "ping":
                        # Use ping command
                        process = await asyncio.create_subprocess_exec(
                            'ping', '-n', '1', '-w', str(timeout * 1000), str(ip),
                            stdout=asyncio.subprocess.PIPE,
                            stderr=asyncio.subprocess.PIPE
                        )
                        stdout, stderr = await process.communicate()
                        
                        if process.returncode == 0:
                            # Try to get hostname
                            try:
                                hostname = socket.gethostbyaddr(str(ip))[0]
                            except:
                                hostname = "Unknown"
                            
                            active_hosts.append({
                                "ip": str(ip),
                                "hostname": hostname,
                                "status": "active",
                                "method": "ping"
                            })
                    
                    elif method == "tcp":
                        # Try TCP connection to common ports
                        common_ports = [22, 80, 443, 135, 139, 445]
                        for port in common_ports:
                            try:
                                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                                sock.settimeout(timeout)
                                result = sock.connect_ex((str(ip), port))
                                sock.close()
                                
                                if result == 0:
                                    try:
                                        hostname = socket.gethostbyaddr(str(ip))[0]
                                    except:
                                        hostname = "Unknown"
                                    
                                    active_hosts.append({
                                        "ip": str(ip),
                                        "hostname": hostname,
                                        "status": "active",
                                        "method": f"tcp:{port}",
                                        "open_port": port
                                    })
                                    break
                            except:
                                continue
                
                except Exception as e:
                    logger.error(f"Host discovery error for {ip}: {e}")
            
            # Limit to reasonable number of hosts
            hosts_to_scan = list(net.hosts())[:254]
            
            # Use semaphore to limit concurrent scans
            semaphore = asyncio.Semaphore(20)
            
            async def scan_with_semaphore(ip):
                async with semaphore:
                    await ping_host(ip)
            
            tasks = [scan_with_semaphore(ip) for ip in hosts_to_scan]
            await asyncio.gather(*tasks, return_exceptions=True)
            
            return {
                "network": network,
                "discovery_method": method,
                "total_hosts_scanned": len(hosts_to_scan),
                "active_hosts": active_hosts,
                "active_count": len(active_hosts)
            }
            
        except Exception as e:
            logger.error(f"Network discovery error: {e}")
            raise HTTPException(status_code=500, detail=f"Discovery failed: {str(e)}")
    
    async def vulnerability_scan(self, target: str, depth: str = "basic") -> Dict[str, Any]:
        """Basic vulnerability assessment"""
        vulnerabilities = []
        services = []
        
        try:
            # First, do a port scan to identify services
            common_ports = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995, 3389, 1433, 3306, 5432]
            port_results = await self.tcp_port_scan(target, common_ports, timeout=2)
            
            for port_info in port_results.get('open_ports', []):
                port = port_info['port']
                service = port_info['service']
                banner = port_info.get('banner', '')
                
                services.append({
                    "port": port,
                    "service": service,
                    "banner": banner,
                    "protocol": "tcp"
                })
                
                # Check for common vulnerabilities
                vuln_checks = self.check_service_vulnerabilities(port, service, banner)
                vulnerabilities.extend(vuln_checks)
            
            # Additional checks based on depth
            if depth in ["intermediate", "deep"]:
                # Check for common web vulnerabilities if HTTP/HTTPS is open
                http_ports = [p for p in port_results.get('open_ports', []) if p['port'] in [80, 443, 8080, 8443]]
                for http_port in http_ports:
                    web_vulns = await self.check_web_vulnerabilities(target, http_port['port'])
                    vulnerabilities.extend(web_vulns)
            
            # Calculate risk score
            risk_score = self.calculate_risk_score(vulnerabilities)
            
            return {
                "target": target,
                "scan_depth": depth,
                "services_detected": services,
                "vulnerabilities": vulnerabilities,
                "vulnerability_count": len(vulnerabilities),
                "risk_score": risk_score,
                "risk_level": self.get_risk_level(risk_score)
            }
            
        except Exception as e:
            logger.error(f"Vulnerability scan error: {e}")
            raise HTTPException(status_code=500, detail=f"Vulnerability scan failed: {str(e)}")
    
    def check_service_vulnerabilities(self, port: int, service: str, banner: str) -> List[Dict[str, Any]]:
        """Check for known service vulnerabilities"""
        vulnerabilities = []
        
        # Common vulnerability patterns
        vuln_patterns = {
            21: {  # FTP
                "anonymous_login": "Anonymous FTP access may be enabled",
                "weak_encryption": "FTP transmits data in plaintext"
            },
            23: {  # Telnet
                "plaintext_protocol": "Telnet transmits credentials in plaintext",
                "weak_authentication": "Telnet lacks strong authentication mechanisms"
            },
            80: {  # HTTP
                "unencrypted_web": "Web service not using HTTPS encryption",
                "information_disclosure": "Server banner may reveal version information"
            },
            3389: {  # RDP
                "rdp_exposed": "RDP service exposed to internet",
                "brute_force_risk": "RDP vulnerable to brute force attacks"
            }
        }
        
        if port in vuln_patterns:
            for vuln_id, description in vuln_patterns[port].items():
                vulnerabilities.append({
                    "vulnerability_id": vuln_id,
                    "port": port,
                    "service": service,
                    "severity": "medium",
                    "description": description,
                    "recommendation": f"Secure or disable {service} service"
                })
        
        # Banner-based vulnerability detection
        if banner:
            if "SSH-1." in banner:
                vulnerabilities.append({
                    "vulnerability_id": "ssh_v1",
                    "port": port,
                    "service": service,
                    "severity": "high",
                    "description": "SSH version 1.x detected (deprecated)",
                    "recommendation": "Upgrade to SSH version 2.x"
                })
        
        return vulnerabilities
    
    async def check_web_vulnerabilities(self, target: str, port: int) -> List[Dict[str, Any]]:
        """Check for common web vulnerabilities"""
        vulnerabilities = []
        
        try:
            import httpx
            protocol = "https" if port == 443 else "http"
            base_url = f"{protocol}://{target}:{port}"
            
            async with httpx.AsyncClient(timeout=10) as client:
                # Check for common security headers
                try:
                    response = await client.get(base_url)
                    headers = response.headers
                    
                    # Missing security headers
                    security_headers = {
                        "X-Frame-Options": "Clickjacking protection missing",
                        "X-Content-Type-Options": "MIME type sniffing protection missing",
                        "X-XSS-Protection": "XSS protection header missing",
                        "Strict-Transport-Security": "HSTS header missing (HTTPS only)",
                        "Content-Security-Policy": "CSP header missing"
                    }
                    
                    for header, description in security_headers.items():
                        if header not in headers:
                            if header == "Strict-Transport-Security" and protocol == "http":
                                continue  # Skip HSTS check for HTTP
                            
                            vulnerabilities.append({
                                "vulnerability_id": f"missing_{header.lower().replace('-', '_')}",
                                "port": port,
                                "service": "HTTP/HTTPS",
                                "severity": "low",
                                "description": description,
                                "recommendation": f"Add {header} security header"
                            })
                    
                    # Check server banner
                    server_header = headers.get("Server", "")
                    if server_header and any(version in server_header.lower() for version in ["apache/2.2", "nginx/1.0", "iis/6.0"]):
                        vulnerabilities.append({
                            "vulnerability_id": "outdated_server",
                            "port": port,
                            "service": "HTTP/HTTPS",
                            "severity": "medium",
                            "description": f"Potentially outdated server version: {server_header}",
                            "recommendation": "Update web server to latest version"
                        })
                
                except Exception as e:
                    logger.error(f"Web vulnerability check error: {e}")
        
        except ImportError:
            logger.warning("httpx not available for web vulnerability checks")
        
        return vulnerabilities
    
    def calculate_risk_score(self, vulnerabilities: List[Dict[str, Any]]) -> float:
        """Calculate overall risk score based on vulnerabilities"""
        severity_weights = {
            "critical": 10,
            "high": 7,
            "medium": 4,
            "low": 1
        }
        
        total_score = 0
        for vuln in vulnerabilities:
            severity = vuln.get('severity', 'low')
            total_score += severity_weights.get(severity, 1)
        
        # Normalize to 0-100 scale
        max_possible = len(vulnerabilities) * 10
        if max_possible > 0:
            return min((total_score / max_possible) * 100, 100)
        return 0
    
    def get_risk_level(self, risk_score: float) -> str:
        """Convert risk score to risk level"""
        if risk_score >= 80:
            return "critical"
        elif risk_score >= 60:
            return "high"
        elif risk_score >= 40:
            return "medium"
        elif risk_score >= 20:
            return "low"
        else:
            return "minimal"

# Initialize service
network_service = NetworkScanService()

# API Routes
@router.post("/port-scan", response_model=ScanResult)
async def port_scan(request: PortScanRequest, background_tasks: BackgroundTasks):
    """Perform port scan on target"""
    scan_id = str(uuid.uuid4())
    
    try:
        # Determine ports to scan
        if request.ports:
            ports = request.ports
        elif request.port_range:
            start, end = map(int, request.port_range.split('-'))
            ports = list(range(start, min(end + 1, 65536)))
        else:
            # Default common ports
            ports = [21, 22, 23, 25, 53, 80, 110, 135, 139, 143, 443, 445, 993, 995, 1433, 3306, 3389, 5432, 5900, 8080]
        
        # Limit number of ports
        if len(ports) > 1000:
            ports = ports[:1000]
        
        logger.info(f"Starting port scan {scan_id} for {request.target} on {len(ports)} ports")
        
        # Initialize scan result
        scan_result = ScanResult(
            scan_id=scan_id,
            target=request.target,
            scan_type="port_scan",
            status="running",
            start_time=datetime.now(),
            results={}
        )
        scan_results[scan_id] = scan_result
        
        # Perform scan
        results = await network_service.tcp_port_scan(request.target, ports, request.timeout)
        
        # Update scan result
        scan_result.status = "completed"
        scan_result.end_time = datetime.now()
        scan_result.results = results
        
        return scan_result
        
    except Exception as e:
        logger.error(f"Port scan error: {e}")
        if scan_id in scan_results:
            scan_results[scan_id].status = "failed"
            scan_results[scan_id].error = str(e)
            scan_results[scan_id].end_time = datetime.now()
        raise HTTPException(status_code=500, detail=f"Port scan failed: {str(e)}")

@router.post("/network-discovery")
async def network_discovery(request: NetworkDiscoveryRequest):
    """Discover active hosts in network"""
    try:
        logger.info(f"Starting network discovery for {request.network}")
        
        results = await network_service.network_discovery(
            request.network,
            request.discovery_method,
            request.timeout
        )
        
        return {
            "scan_id": str(uuid.uuid4()),
            "timestamp": datetime.now().isoformat(),
            "status": "completed",
            **results
        }
        
    except Exception as e:
        logger.error(f"Network discovery error: {e}")
        raise HTTPException(status_code=500, detail=f"Network discovery failed: {str(e)}")

@router.post("/vulnerability-scan")
async def vulnerability_scan(request: VulnerabilityScanRequest):
    """Perform vulnerability assessment"""
    scan_id = str(uuid.uuid4())
    
    try:
        logger.info(f"Starting vulnerability scan {scan_id} for {request.target}")
        
        results = await network_service.vulnerability_scan(request.target, request.scan_depth)
        
        return {
            "scan_id": scan_id,
            "timestamp": datetime.now().isoformat(),
            "status": "completed",
            **results
        }
        
    except Exception as e:
        logger.error(f"Vulnerability scan error: {e}")
        raise HTTPException(status_code=500, detail=f"Vulnerability scan failed: {str(e)}")

@router.get("/scan-result/{scan_id}")
async def get_scan_result(scan_id: str):
    """Get scan result by ID"""
    if scan_id not in scan_results:
        raise HTTPException(status_code=404, detail="Scan result not found")
    
    return scan_results[scan_id]

@router.get("/scan-history")
async def get_scan_history(limit: int = 10):
    """Get recent scan history"""
    recent_scans = list(scan_results.values())[-limit:]
    return {
        "scans": recent_scans,
        "total_count": len(scan_results)
    }