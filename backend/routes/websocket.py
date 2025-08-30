from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException
from typing import Dict, List, Any, Optional
import json
import asyncio
import logging
from datetime import datetime
import uuid
from pydantic import BaseModel

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/ws", tags=["WebSocket"])

# WebSocket Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.user_sessions: Dict[str, Dict[str, Any]] = {}
        self.scan_subscriptions: Dict[str, List[str]] = {}  # scan_id -> [connection_ids]
    
    async def connect(self, websocket: WebSocket, client_id: str = None) -> str:
        """Accept WebSocket connection and assign client ID"""
        await websocket.accept()
        
        if not client_id:
            client_id = str(uuid.uuid4())
        
        self.active_connections[client_id] = websocket
        self.user_sessions[client_id] = {
            "connected_at": datetime.now(),
            "last_activity": datetime.now(),
            "subscriptions": []
        }
        
        logger.info(f"WebSocket client {client_id} connected")
        
        # Send welcome message
        await self.send_personal_message({
            "type": "connection_established",
            "client_id": client_id,
            "timestamp": datetime.now().isoformat(),
            "message": "Connected to Network Security Analyzer"
        }, client_id)
        
        return client_id
    
    def disconnect(self, client_id: str):
        """Remove client connection"""
        if client_id in self.active_connections:
            del self.active_connections[client_id]
        
        if client_id in self.user_sessions:
            del self.user_sessions[client_id]
        
        # Remove from scan subscriptions
        for scan_id, subscribers in self.scan_subscriptions.items():
            if client_id in subscribers:
                subscribers.remove(client_id)
        
        logger.info(f"WebSocket client {client_id} disconnected")
    
    async def send_personal_message(self, message: Dict[str, Any], client_id: str):
        """Send message to specific client"""
        if client_id in self.active_connections:
            try:
                websocket = self.active_connections[client_id]
                await websocket.send_text(json.dumps(message))
                
                # Update last activity
                if client_id in self.user_sessions:
                    self.user_sessions[client_id]["last_activity"] = datetime.now()
                    
            except Exception as e:
                logger.error(f"Error sending message to {client_id}: {e}")
                self.disconnect(client_id)
    
    async def broadcast(self, message: Dict[str, Any]):
        """Broadcast message to all connected clients"""
        if not self.active_connections:
            return
        
        disconnected_clients = []
        
        for client_id, websocket in self.active_connections.items():
            try:
                await websocket.send_text(json.dumps(message))
            except Exception as e:
                logger.error(f"Error broadcasting to {client_id}: {e}")
                disconnected_clients.append(client_id)
        
        # Clean up disconnected clients
        for client_id in disconnected_clients:
            self.disconnect(client_id)
    
    async def send_to_subscribers(self, scan_id: str, message: Dict[str, Any]):
        """Send message to clients subscribed to specific scan"""
        if scan_id not in self.scan_subscriptions:
            return
        
        subscribers = self.scan_subscriptions[scan_id].copy()
        disconnected_clients = []
        
        for client_id in subscribers:
            if client_id in self.active_connections:
                try:
                    await self.send_personal_message(message, client_id)
                except Exception as e:
                    logger.error(f"Error sending scan update to {client_id}: {e}")
                    disconnected_clients.append(client_id)
            else:
                disconnected_clients.append(client_id)
        
        # Clean up disconnected clients
        for client_id in disconnected_clients:
            if client_id in self.scan_subscriptions[scan_id]:
                self.scan_subscriptions[scan_id].remove(client_id)
    
    def subscribe_to_scan(self, client_id: str, scan_id: str):
        """Subscribe client to scan updates"""
        if scan_id not in self.scan_subscriptions:
            self.scan_subscriptions[scan_id] = []
        
        if client_id not in self.scan_subscriptions[scan_id]:
            self.scan_subscriptions[scan_id].append(client_id)
            
            # Update user session
            if client_id in self.user_sessions:
                if "subscriptions" not in self.user_sessions[client_id]:
                    self.user_sessions[client_id]["subscriptions"] = []
                self.user_sessions[client_id]["subscriptions"].append(scan_id)
    
    def unsubscribe_from_scan(self, client_id: str, scan_id: str):
        """Unsubscribe client from scan updates"""
        if scan_id in self.scan_subscriptions and client_id in self.scan_subscriptions[scan_id]:
            self.scan_subscriptions[scan_id].remove(client_id)
            
            # Update user session
            if client_id in self.user_sessions and "subscriptions" in self.user_sessions[client_id]:
                if scan_id in self.user_sessions[client_id]["subscriptions"]:
                    self.user_sessions[client_id]["subscriptions"].remove(scan_id)
    
    def get_connection_stats(self) -> Dict[str, Any]:
        """Get connection statistics"""
        return {
            "total_connections": len(self.active_connections),
            "active_scans": len(self.scan_subscriptions),
            "total_subscriptions": sum(len(subs) for subs in self.scan_subscriptions.values()),
            "connections": {
                client_id: {
                    "connected_at": session["connected_at"].isoformat(),
                    "last_activity": session["last_activity"].isoformat(),
                    "subscriptions": len(session.get("subscriptions", []))
                }
                for client_id, session in self.user_sessions.items()
            }
        }

# Global connection manager instance
manager = ConnectionManager()

# Message handlers
class MessageHandler:
    def __init__(self, connection_manager: ConnectionManager):
        self.manager = connection_manager
    
    async def handle_message(self, client_id: str, message: Dict[str, Any]):
        """Handle incoming WebSocket message"""
        message_type = message.get("type")
        
        if message_type == "ping":
            await self.handle_ping(client_id, message)
        elif message_type == "subscribe_scan":
            await self.handle_subscribe_scan(client_id, message)
        elif message_type == "unsubscribe_scan":
            await self.handle_unsubscribe_scan(client_id, message)
        elif message_type == "get_stats":
            await self.handle_get_stats(client_id, message)
        elif message_type == "start_realtime_scan":
            await self.handle_start_realtime_scan(client_id, message)
        else:
            await self.handle_unknown_message(client_id, message)
    
    async def handle_ping(self, client_id: str, message: Dict[str, Any]):
        """Handle ping message"""
        await self.manager.send_personal_message({
            "type": "pong",
            "timestamp": datetime.now().isoformat(),
            "client_id": client_id
        }, client_id)
    
    async def handle_subscribe_scan(self, client_id: str, message: Dict[str, Any]):
        """Handle scan subscription"""
        scan_id = message.get("scan_id")
        if not scan_id:
            await self.manager.send_personal_message({
                "type": "error",
                "message": "scan_id is required for subscription",
                "timestamp": datetime.now().isoformat()
            }, client_id)
            return
        
        self.manager.subscribe_to_scan(client_id, scan_id)
        
        await self.manager.send_personal_message({
            "type": "subscription_confirmed",
            "scan_id": scan_id,
            "message": f"Subscribed to scan {scan_id}",
            "timestamp": datetime.now().isoformat()
        }, client_id)
    
    async def handle_unsubscribe_scan(self, client_id: str, message: Dict[str, Any]):
        """Handle scan unsubscription"""
        scan_id = message.get("scan_id")
        if not scan_id:
            await self.manager.send_personal_message({
                "type": "error",
                "message": "scan_id is required for unsubscription",
                "timestamp": datetime.now().isoformat()
            }, client_id)
            return
        
        self.manager.unsubscribe_from_scan(client_id, scan_id)
        
        await self.manager.send_personal_message({
            "type": "unsubscription_confirmed",
            "scan_id": scan_id,
            "message": f"Unsubscribed from scan {scan_id}",
            "timestamp": datetime.now().isoformat()
        }, client_id)
    
    async def handle_get_stats(self, client_id: str, message: Dict[str, Any]):
        """Handle stats request"""
        stats = self.manager.get_connection_stats()
        
        await self.manager.send_personal_message({
            "type": "stats_response",
            "stats": stats,
            "timestamp": datetime.now().isoformat()
        }, client_id)
    
    async def handle_start_realtime_scan(self, client_id: str, message: Dict[str, Any]):
        """Handle real-time scan request"""
        scan_config = message.get("config", {})
        scan_type = scan_config.get("type", "port_scan")
        target = scan_config.get("target")
        
        if not target:
            await self.manager.send_personal_message({
                "type": "error",
                "message": "Target is required for real-time scan",
                "timestamp": datetime.now().isoformat()
            }, client_id)
            return
        
        # Generate scan ID and start scan
        scan_id = str(uuid.uuid4())
        
        # Subscribe client to scan updates
        self.manager.subscribe_to_scan(client_id, scan_id)
        
        # Send scan started message
        await self.manager.send_personal_message({
            "type": "scan_started",
            "scan_id": scan_id,
            "scan_type": scan_type,
            "target": target,
            "timestamp": datetime.now().isoformat()
        }, client_id)
        
        # Start the actual scan in background
        asyncio.create_task(self.perform_realtime_scan(scan_id, scan_type, target, scan_config))
    
    async def perform_realtime_scan(self, scan_id: str, scan_type: str, target: str, config: Dict[str, Any]):
        """Perform real-time scan with progress updates"""
        try:
            if scan_type == "port_scan":
                await self.realtime_port_scan(scan_id, target, config)
            elif scan_type == "network_discovery":
                await self.realtime_network_discovery(scan_id, target, config)
            else:
                await self.manager.send_to_subscribers(scan_id, {
                    "type": "scan_error",
                    "scan_id": scan_id,
                    "error": f"Unsupported scan type: {scan_type}",
                    "timestamp": datetime.now().isoformat()
                })
        
        except Exception as e:
            logger.error(f"Real-time scan error: {e}")
            await self.manager.send_to_subscribers(scan_id, {
                "type": "scan_error",
                "scan_id": scan_id,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            })
    
    async def realtime_port_scan(self, scan_id: str, target: str, config: Dict[str, Any]):
        """Perform real-time port scan with progress updates"""
        ports = config.get("ports", [80, 443, 22, 21, 25, 53, 110, 143, 993, 995])
        timeout = config.get("timeout", 3)
        
        total_ports = len(ports)
        scanned_ports = 0
        open_ports = []
        
        # Send initial progress
        await self.manager.send_to_subscribers(scan_id, {
            "type": "scan_progress",
            "scan_id": scan_id,
            "progress": 0,
            "total_ports": total_ports,
            "scanned_ports": 0,
            "open_ports_found": 0,
            "timestamp": datetime.now().isoformat()
        })
        
        # Scan ports with progress updates
        for port in ports:
            try:
                import socket
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                sock.settimeout(timeout)
                
                result = sock.connect_ex((target, port))
                
                if result == 0:
                    # Port is open
                    service_name = self.get_service_name(port)
                    open_ports.append({
                        "port": port,
                        "service": service_name,
                        "state": "open"
                    })
                    
                    # Send real-time update for open port
                    await self.manager.send_to_subscribers(scan_id, {
                        "type": "port_found",
                        "scan_id": scan_id,
                        "port": port,
                        "service": service_name,
                        "timestamp": datetime.now().isoformat()
                    })
                
                sock.close()
                
            except Exception as e:
                logger.error(f"Port scan error for {target}:{port} - {e}")
            
            scanned_ports += 1
            progress = (scanned_ports / total_ports) * 100
            
            # Send progress update every 10 ports or at the end
            if scanned_ports % 10 == 0 or scanned_ports == total_ports:
                await self.manager.send_to_subscribers(scan_id, {
                    "type": "scan_progress",
                    "scan_id": scan_id,
                    "progress": progress,
                    "total_ports": total_ports,
                    "scanned_ports": scanned_ports,
                    "open_ports_found": len(open_ports),
                    "timestamp": datetime.now().isoformat()
                })
            
            # Small delay to prevent overwhelming
            await asyncio.sleep(0.1)
        
        # Send final results
        await self.manager.send_to_subscribers(scan_id, {
            "type": "scan_completed",
            "scan_id": scan_id,
            "target": target,
            "total_ports": total_ports,
            "open_ports": open_ports,
            "scan_duration": "completed",
            "timestamp": datetime.now().isoformat()
        })
    
    async def realtime_network_discovery(self, scan_id: str, network: str, config: Dict[str, Any]):
        """Perform real-time network discovery"""
        # This would implement real-time network discovery
        # For now, send a placeholder message
        await self.manager.send_to_subscribers(scan_id, {
            "type": "scan_completed",
            "scan_id": scan_id,
            "message": "Network discovery completed",
            "network": network,
            "timestamp": datetime.now().isoformat()
        })
    
    def get_service_name(self, port: int) -> str:
        """Get service name for port"""
        common_ports = {
            21: "FTP", 22: "SSH", 23: "Telnet", 25: "SMTP", 53: "DNS",
            80: "HTTP", 110: "POP3", 143: "IMAP", 443: "HTTPS", 993: "IMAPS",
            995: "POP3S", 3389: "RDP", 5432: "PostgreSQL", 3306: "MySQL"
        }
        return common_ports.get(port, "Unknown")
    
    async def handle_unknown_message(self, client_id: str, message: Dict[str, Any]):
        """Handle unknown message type"""
        await self.manager.send_personal_message({
            "type": "error",
            "message": f"Unknown message type: {message.get('type', 'undefined')}",
            "timestamp": datetime.now().isoformat()
        }, client_id)

# Initialize message handler
message_handler = MessageHandler(manager)

# WebSocket Routes
@router.websocket("/connect")
async def websocket_endpoint(websocket: WebSocket, client_id: Optional[str] = None):
    """Main WebSocket endpoint"""
    assigned_client_id = None
    
    try:
        assigned_client_id = await manager.connect(websocket, client_id)
        
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            
            try:
                message = json.loads(data)
                await message_handler.handle_message(assigned_client_id, message)
            except json.JSONDecodeError:
                await manager.send_personal_message({
                    "type": "error",
                    "message": "Invalid JSON format",
                    "timestamp": datetime.now().isoformat()
                }, assigned_client_id)
            except Exception as e:
                logger.error(f"Message handling error: {e}")
                await manager.send_personal_message({
                    "type": "error",
                    "message": "Message processing failed",
                    "timestamp": datetime.now().isoformat()
                }, assigned_client_id)
    
    except WebSocketDisconnect:
        if assigned_client_id:
            manager.disconnect(assigned_client_id)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        if assigned_client_id:
            manager.disconnect(assigned_client_id)

# HTTP endpoints for WebSocket management
@router.get("/stats")
async def get_websocket_stats():
    """Get WebSocket connection statistics"""
    return manager.get_connection_stats()

@router.post("/broadcast")
async def broadcast_message(message: Dict[str, Any]):
    """Broadcast message to all connected clients"""
    try:
        await manager.broadcast({
            "type": "broadcast",
            "timestamp": datetime.now().isoformat(),
            **message
        })
        return {"status": "success", "message": "Message broadcasted"}
    except Exception as e:
        logger.error(f"Broadcast error: {e}")
        raise HTTPException(status_code=500, detail=f"Broadcast failed: {str(e)}")

@router.post("/notify-scan-update/{scan_id}")
async def notify_scan_update(scan_id: str, update: Dict[str, Any]):
    """Send update to clients subscribed to specific scan"""
    try:
        await manager.send_to_subscribers(scan_id, {
            "type": "scan_update",
            "scan_id": scan_id,
            "timestamp": datetime.now().isoformat(),
            **update
        })
        return {"status": "success", "message": f"Update sent to scan {scan_id} subscribers"}
    except Exception as e:
        logger.error(f"Scan update notification error: {e}")
        raise HTTPException(status_code=500, detail=f"Notification failed: {str(e)}")

# Export manager for use in other modules
__all__ = ["manager", "router"]