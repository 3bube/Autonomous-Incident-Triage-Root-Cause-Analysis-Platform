from pydantic_settings import BaseSettings
from pydantic import field_validator
from typing import Optional
import logging
import os

class Settings(BaseSettings):
    """Application configuration settings"""
    
    # App Settings
    APP_NAME: str = "Autonomous Incident Triage API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # Groq AI Settings
    GROQ_API_KEY: Optional[str] = None
    
    # Database Settings (Required - must be in .env)
    DATABASE_URL: str
    
    # API Settings
    API_PREFIX: str = "/api/v1"
        
    # Server Settings
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    LOG_LEVEL: str = "INFO"

    # Security Settings
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # 30 minutes
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7  # 7 days
    ALGORITHM: str
    
    # CORS Settings
    CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:5173"]
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: list = ["*"]
    CORS_ALLOW_HEADERS: list = ["*"]

    @field_validator("DEBUG", mode="before")
    @classmethod
    def parse_debug(cls, v):
        """Convert string to boolean"""
        if isinstance(v, str):
            return v.lower() in ("true", "1", "yes")
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"
        
        

settings = Settings()

def configure_logging():
    """Configure logging for the application"""
    handlers = [logging.StreamHandler()]  # Console output
    
    # Only log to file in production (not in debug mode)
    if not settings.DEBUG:
        logs_dir = 'logs'
        os.makedirs(logs_dir, exist_ok=True)
        handlers.append(logging.FileHandler('logs/app.log', mode='a'))
    
    logging.basicConfig(
        level=getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=handlers
    )

# Initialize logging
configure_logging()

def get_logger(name: str):
    """Get a logger instance for a module"""
    return logging.getLogger(name)