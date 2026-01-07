from sqlalchemy import Column, Integer, String, ForeignKey, Enum as SQLEnum, DateTime, Text
from core.database import Base
from datetime import datetime, timezone
from enum import Enum


class LogLevelEnum(str, Enum):
    ERROR = "ERROR"
    WARN = "WARN"
    INFO = "INFO"
    DEBUG = "DEBUG"


class IncidentLogModel(Base):
    __tablename__ = "incident_logs"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id"), nullable=False)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=True)
    timestamp = Column(DateTime, nullable=False)
    level = Column(SQLEnum(LogLevelEnum), nullable=False)
    message = Column(Text, nullable=False)
    source = Column(String, nullable=True)  # log source/stream identifier
    log_metadata = Column(Text, nullable=True)  # additional log context in JSON
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
