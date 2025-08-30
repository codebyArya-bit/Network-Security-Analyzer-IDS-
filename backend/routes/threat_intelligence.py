from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, validator
from typing import List, Dict, Any, Optional
import httpx
import asyncio
import logging
from datetime import datetime
import os

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/threat", tags=["Threat Intelligence"])

# Pydantic Models
class IPAnalysisRequest(BaseModel):
    ip_address: str
    check_reputation: bool = True
    check_geolocation: bool = True
    check_malware: bool = True

    @validator('ip_address')
    def validate_ip(cls, v):
        import ipaddress
        try:
            ipaddress.ip_address(v)
            return v
        except ValueError:
            raise ValueError('Invalid IP address format')

class DomainAnalysisRequest(BaseModel):
    domain: str
    check_reputation: bool = True
    check_dns: bool = True
    check_ssl: bool = True

class ThreatIntelligenceResponse(BaseModel):
    target: str
    analysis_type: str
    threat_level: str
    confidence_score: float
    reputation_data: Dict[str, Any]
    geolocation_data: Optional[Dict[str, Any]] = None
    malware_data: Optional[Dict[str, Any]] = None
    timestamp: datetime

# Threat Intelligence Services
class ThreatIntelligenceService:
    def __init__(self):
        self.abuseipdb_key = os.getenv('ABUSEIPDB_API_KEY')
        self.virustotal_key = os.getenv('VIRUSTOTAL_API_KEY')
        self.geolocation_key = os.getenv('GEOLOCATION_API_KEY')
    
    async def check_abuseipdb(self, ip_address: str) -> Dict[str, Any]:
        """Check IP reputation using AbuseIPDB"""
        if not self.abuseipdb_key:
            return {"error": "AbuseIPDB API key not configured"}
        
        try:
            url = "https://api.abuseipdb.com/api/v2/check"
            headers = {
                'Key': self.abuseipdb_key,
                'Accept': 'application/json'
            }
            params = {
                'ipAddress': ip_address,
                'maxAgeInDays': 90,
                'verbose': ''
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=headers, params=params)
                
            if response.status_code == 200:
                data = response.json()
                return {
                    "source": "AbuseIPDB",
                    "abuse_confidence": data.get('data', {}).get('abuseConfidencePercentage', 0),
                    "is_public": data.get('data', {}).get('isPublic', False),
                    "usage_type": data.get('data', {}).get('usageType', 'Unknown'),
                    "country_code": data.get('data', {}).get('countryCode', 'Unknown'),
                    "total_reports": data.get('data', {}).get('totalReports', 0),
                    "last_reported": data.get('data', {}).get('lastReportedAt')
                }
            else:
                return {"error": f"AbuseIPDB API error: {response.status_code}"}
                
        except Exception as e:
            logger.error(f"AbuseIPDB check error: {e}")
            return {"error": str(e)}
    
    async def check_geolocation(self, ip_address: str) -> Dict[str, Any]:
        """Get geolocation data for IP address"""
        try:
            # Using ipapi.co as a free geolocation service
            url = f"https://ipapi.co/{ip_address}/json/"
            
            async with httpx.AsyncClient() as client:
                response = await client.get(url)
            
            if response.status_code == 200:
                data = response.json()
                return {
                    "source": "ipapi.co",
                    "country": data.get('country_name', 'Unknown'),
                    "country_code": data.get('country_code', 'Unknown'),
                    "region": data.get('region', 'Unknown'),
                    "city": data.get('city', 'Unknown'),
                    "latitude": data.get('latitude'),
                    "longitude": data.get('longitude'),
                    "timezone": data.get('timezone', 'Unknown'),
                    "isp": data.get('org', 'Unknown'),
                    "asn": data.get('asn', 'Unknown')
                }
            else:
                return {"error": f"Geolocation API error: {response.status_code}"}
                
        except Exception as e:
            logger.error(f"Geolocation check error: {e}")
            return {"error": str(e)}
    
    async def check_virustotal(self, target: str, target_type: str = "ip") -> Dict[str, Any]:
        """Check target using VirusTotal API"""
        if not self.virustotal_key:
            return {"error": "VirusTotal API key not configured"}
        
        try:
            if target_type == "ip":
                url = f"https://www.virustotal.com/vtapi/v2/ip-address/report"
                params = {'apikey': self.virustotal_key, 'ip': target}
            else:
                url = f"https://www.virustotal.com/vtapi/v2/domain/report"
                params = {'apikey': self.virustotal_key, 'domain': target}
            
            async with httpx.AsyncClient() as client:
                response = await client.get(url, params=params)
            
            if response.status_code == 200:
                data = response.json()
                return {
                    "source": "VirusTotal",
                    "response_code": data.get('response_code', 0),
                    "detected_urls": len(data.get('detected_urls', [])),
                    "detected_samples": len(data.get('detected_samples', [])),
                    "resolutions": data.get('resolutions', [])[:5],  # Limit to 5
                    "verbose_msg": data.get('verbose_msg', 'No data')
                }
            else:
                return {"error": f"VirusTotal API error: {response.status_code}"}
                
        except Exception as e:
            logger.error(f"VirusTotal check error: {e}")
            return {"error": str(e)}
    
    def calculate_threat_level(self, reputation_data: Dict[str, Any]) -> tuple[str, float]:
        """Calculate overall threat level and confidence score"""
        threat_score = 0
        confidence = 0.5
        
        # AbuseIPDB scoring
        if 'abuse_confidence' in reputation_data:
            abuse_conf = reputation_data['abuse_confidence']
            threat_score += abuse_conf * 0.4  # 40% weight
            confidence += 0.3
        
        # VirusTotal scoring
        if 'detected_urls' in reputation_data:
            detected = reputation_data['detected_urls']
            if detected > 0:
                threat_score += min(detected * 10, 50)  # Max 50 points
            confidence += 0.2
        
        # Determine threat level
        if threat_score >= 70:
            threat_level = "high"
        elif threat_score >= 40:
            threat_level = "medium"
        elif threat_score >= 20:
            threat_level = "low"
        else:
            threat_level = "minimal"
        
        return threat_level, min(confidence, 1.0)

# Initialize service
threat_service = ThreatIntelligenceService()

# API Routes
@router.post("/analyze-ip", response_model=ThreatIntelligenceResponse)
async def analyze_ip_address(request: IPAnalysisRequest):
    """Comprehensive IP address threat analysis"""
    try:
        logger.info(f"Starting IP analysis for: {request.ip_address}")
        
        # Collect data from multiple sources
        tasks = []
        
        if request.check_reputation:
            tasks.extend([
                threat_service.check_abuseipdb(request.ip_address),
                threat_service.check_virustotal(request.ip_address, "ip")
            ])
        
        if request.check_geolocation:
            tasks.append(threat_service.check_geolocation(request.ip_address))
        
        # Execute all checks concurrently
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Process results
        reputation_data = {}
        geolocation_data = None
        malware_data = None
        
        for result in results:
            if isinstance(result, dict) and 'source' in result:
                if result['source'] in ['AbuseIPDB', 'VirusTotal']:
                    reputation_data.update(result)
                elif result['source'] == 'ipapi.co':
                    geolocation_data = result
        
        # Calculate threat level
        threat_level, confidence = threat_service.calculate_threat_level(reputation_data)
        
        return ThreatIntelligenceResponse(
            target=request.ip_address,
            analysis_type="ip_analysis",
            threat_level=threat_level,
            confidence_score=confidence,
            reputation_data=reputation_data,
            geolocation_data=geolocation_data,
            malware_data=malware_data,
            timestamp=datetime.now()
        )
        
    except Exception as e:
        logger.error(f"IP analysis error: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.post("/analyze-domain")
async def analyze_domain(request: DomainAnalysisRequest):
    """Domain threat analysis"""
    try:
        logger.info(f"Starting domain analysis for: {request.domain}")
        
        # Basic domain analysis (can be extended)
        analysis_result = {
            "domain": request.domain,
            "analysis_type": "domain_analysis",
            "timestamp": datetime.now().isoformat(),
            "dns_records": {},
            "ssl_info": {},
            "reputation": {}
        }
        
        if request.check_dns:
            # DNS resolution check
            import socket
            try:
                ip_address = socket.gethostbyname(request.domain)
                analysis_result["dns_records"]["A"] = ip_address
                analysis_result["dns_resolution"] = True
            except socket.gaierror:
                analysis_result["dns_resolution"] = False
        
        if request.check_reputation:
            # Check domain reputation using VirusTotal
            vt_result = await threat_service.check_virustotal(request.domain, "domain")
            analysis_result["reputation"] = vt_result
        
        return analysis_result
        
    except Exception as e:
        logger.error(f"Domain analysis error: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.get("/reputation/{ip_address}")
async def get_ip_reputation(ip_address: str):
    """Quick IP reputation check"""
    try:
        # Validate IP address
        import ipaddress
        ipaddress.ip_address(ip_address)
        
        # Quick reputation check
        reputation = await threat_service.check_abuseipdb(ip_address)
        
        return {
            "ip_address": ip_address,
            "reputation": reputation,
            "timestamp": datetime.now().isoformat()
        }
        
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid IP address")
    except Exception as e:
        logger.error(f"Reputation check error: {e}")
        raise HTTPException(status_code=500, detail=f"Check failed: {str(e)}")

@router.get("/geolocation/{ip_address}")
async def get_ip_geolocation(ip_address: str):
    """Get IP geolocation information"""
    try:
        # Validate IP address
        import ipaddress
        ipaddress.ip_address(ip_address)
        
        # Get geolocation data
        geolocation = await threat_service.check_geolocation(ip_address)
        
        return {
            "ip_address": ip_address,
            "geolocation": geolocation,
            "timestamp": datetime.now().isoformat()
        }
        
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid IP address")
    except Exception as e:
        logger.error(f"Geolocation check error: {e}")
        raise HTTPException(status_code=500, detail=f"Check failed: {str(e)}")