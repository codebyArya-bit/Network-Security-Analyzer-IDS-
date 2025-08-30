from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
import logging
from datetime import datetime
import os
from contextlib import asynccontextmanager

# Import route modules
from routes import threat_intelligence, network_scan, websocket
from utils.config import get_settings, get_cors_config, get_trusted_host_config

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Application lifespan manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting Network Security Analyzer API")
    logger.info(f"Environment: {os.getenv('ENVIRONMENT', 'development')}")
    
    # Initialize any startup tasks here
    yield
    
    # Shutdown
    logger.info("Shutting down Network Security Analyzer API")

# Initialize FastAPI app
app = FastAPI(
    title="Network Security Analyzer API",
    description="Advanced network security scanning and threat intelligence API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Get application settings
settings = get_settings()
cors_config = get_cors_config()
trusted_host_config = get_trusted_host_config()

# Environment-based configuration
ENVIRONMENT = settings.environment
FRONTEND_URL = settings.frontend_url

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    **cors_config
)

# Add TrustedHost middleware
app.add_middleware(
    TrustedHostMiddleware,
    **trusted_host_config
)

# Root endpoint for health check
@app.get("/")
async def root():
    return {"message": "Network Security Analyzer API", "status": "running", "version": "1.0.0"}

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": "2024-01-01T00:00:00Z"}

# Include routers
app.include_router(threat_intelligence.router, prefix="/api/v1/threat-intelligence", tags=["threat-intelligence"])
app.include_router(network_scan.router, prefix="/api/v1/network-scan", tags=["network-scan"])
app.include_router(websocket.router, prefix="/api/v1/websocket", tags=["websocket"])

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Global exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": "An unexpected error occurred",
            "timestamp": datetime.now().isoformat()
        }
    )



# Core API Routes
@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "name": "Network Security Analyzer API",
        "version": "1.0.0",
        "description": "Advanced network security scanning and threat intelligence",
        "environment": ENVIRONMENT,
        "endpoints": {
            "health": "/health",
            "network_scanning": "/api/network/*",
            "threat_intelligence": "/api/threat/*",
            "websocket": "/ws/*",
            "documentation": "/docs",
            "api_schema": "/openapi.json"
        },
        "features": [
            "Port Scanning",
            "Network Discovery",
            "Vulnerability Assessment",
            "Threat Intelligence",
            "Real-time WebSocket Updates",
            "IP Geolocation",
            "Domain Analysis"
        ],
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    from routes.websocket import manager
    
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "environment": ENVIRONMENT,
        "active_websocket_connections": len(manager.active_connections),
        "services": {
            "network_scanning": "operational",
            "threat_intelligence": "operational",
            "websocket": "operational"
        }
    }

@app.get("/api/info")
async def api_info():
    """Detailed API information"""
    return {
        "api": {
            "name": "Network Security Analyzer API",
            "version": "1.0.0",
            "description": "Comprehensive network security analysis platform"
        },
        "capabilities": {
            "network_scanning": {
                "port_scanning": True,
                "network_discovery": True,
                "vulnerability_assessment": True,
                "service_detection": True
            },
            "threat_intelligence": {
                "ip_reputation": True,
                "domain_analysis": True,
                "geolocation": True,
                "malware_detection": True
            },
            "real_time": {
                "websocket_support": True,
                "live_scanning": True,
                "progress_updates": True
            }
        },
        "supported_targets": [
            "IPv4 addresses",
            "IPv6 addresses",
            "Domain names",
            "Network ranges (CIDR)"
        ],
        "rate_limits": {
            "scanning": "100 requests per minute",
            "threat_analysis": "50 requests per minute"
        },
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=ENVIRONMENT == "development",
        log_level="info"
    )