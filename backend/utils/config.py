# Configuration management for Network Security Analyzer

import os
from functools import lru_cache
from typing import List, Optional
from pydantic import validator
try:
    from pydantic_settings import BaseSettings
except ImportError:
    from pydantic import BaseSettings


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """
    
    # Application Environment
    environment: str = "development"
    debug: bool = False
    reload: bool = False
    
    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000
    
    # Frontend Configuration
    frontend_url: str = "http://localhost:5173"
    
    # Database Configuration
    database_url: Optional[str] = None
    
    # API Keys
    abuseipdb_api_key: Optional[str] = None
    virustotal_api_key: Optional[str] = None
    geolocation_api_key: Optional[str] = None
    
    # EmailJS Configuration (for frontend)
    vite_emailjs_service_id: Optional[str] = None
    vite_emailjs_template_id: Optional[str] = None
    vite_emailjs_public_key: Optional[str] = None
    
    # Security Configuration
    jwt_secret_key: str = "dev_secret_key_change_in_production"
    jwt_algorithm: str = "HS256"
    jwt_expiration_hours: int = 24
    
    # Rate Limiting
    rate_limit_requests_per_minute: int = 100
    rate_limit_burst: int = 20
    
    # Logging Configuration
    log_level: str = "INFO"
    log_file: str = "logs/network_security_analyzer.log"
    
    # Scanning Configuration
    max_concurrent_scans: int = 10
    default_scan_timeout: int = 30
    max_ports_per_scan: int = 1000
    max_hosts_per_discovery: int = 254
    
    # Security Headers
    secure_headers_enabled: bool = True
    hsts_max_age: int = 31536000
    
    # CORS Configuration
    cors_allow_credentials: bool = True
    cors_max_age: int = 86400
    
    @validator('environment')
    def validate_environment(cls, v):
        allowed_environments = ['development', 'production', 'testing']
        if v not in allowed_environments:
            raise ValueError(f'Environment must be one of: {allowed_environments}')
        return v
    
    @validator('log_level')
    def validate_log_level(cls, v):
        allowed_levels = ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL']
        if v.upper() not in allowed_levels:
            raise ValueError(f'Log level must be one of: {allowed_levels}')
        return v.upper()
    
    @validator('port')
    def validate_port(cls, v):
        if not 1 <= v <= 65535:
            raise ValueError('Port must be between 1 and 65535')
        return v
    
    @property
    def is_development(self) -> bool:
        """Check if running in development mode."""
        return self.environment == "development"
    
    @property
    def is_production(self) -> bool:
        """Check if running in production mode."""
        return self.environment == "production"
    
    @property
    def cors_origins(self) -> List[str]:
        """Get CORS allowed origins based on environment."""
        if self.is_development:
            return [
                "http://localhost:3000",
                "http://localhost:5173",
                "http://127.0.0.1:3000",
                "http://127.0.0.1:5173",
                self.frontend_url
            ]
        else:
            # In production, only allow the configured frontend URL
            return [self.frontend_url]
    
    @property
    def trusted_hosts(self) -> List[str]:
        """Get trusted hosts based on environment."""
        hosts = ["localhost", "127.0.0.1"]
        
        if self.is_production:
            # Add production hosts
            hosts.extend([
                "network-security-analyzer-ids.onrender.com",
                "network-security-ids.onrender.com",
                "securenet-analyzer.onrender.com"
            ])
        
        return hosts
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached application settings.
    Uses lru_cache to ensure settings are loaded only once.
    """
    return Settings()


def get_cors_config() -> dict:
    """
    Get CORS configuration for FastAPI.
    """
    settings = get_settings()
    
    return {
        "allow_origins": settings.cors_origins,
        "allow_credentials": settings.cors_allow_credentials,
        "allow_methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": [
            "Accept",
            "Accept-Language",
            "Content-Language",
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "X-API-Key"
        ],
        "max_age": settings.cors_max_age
    }


def get_trusted_host_config() -> dict:
    """
    Get TrustedHost configuration for FastAPI.
    """
    settings = get_settings()
    
    return {
        "allowed_hosts": settings.trusted_hosts
    }