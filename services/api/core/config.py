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
    ALGORITHM: str

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


CORS_ORIGINS = [
    "http://localhost:3000",]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
CORS_ALLOW_HEADERS = ["*"]

def configure_logging():
    """Configure logging for the application"""
    # Create logs directory if it doesn't exist
    logs_dir = 'logs'
    os.makedirs(logs_dir, exist_ok=True)
    
    logging.basicConfig(
        level=getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler(),  # Console output
            logging.FileHandler('logs/app.log', mode='a')  # File output
        ]
    )

# Initialize logging
configure_logging()

def get_logger(name: str):
    """Get a logger instance for a module"""
    return logging.getLogger(name)