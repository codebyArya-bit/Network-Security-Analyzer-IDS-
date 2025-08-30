# Routes package initialization
"""
Network Security Analyzer API Routes

This package contains all the API route modules for the Network Security Analyzer:
- threat_intelligence: Threat intelligence and IP reputation analysis
- network_scan: Network scanning, port scanning, and vulnerability assessment
- websocket: Real-time WebSocket communication and updates
"""

__version__ = "1.0.0"
__author__ = "Network Security Analyzer Team"

# Import all routers for easy access
from .threat_intelligence import router as threat_router
from .network_scan import router as network_router
from .websocket import router as websocket_router

__all__ = [
    "threat_router",
    "network_router", 
    "websocket_router"
]