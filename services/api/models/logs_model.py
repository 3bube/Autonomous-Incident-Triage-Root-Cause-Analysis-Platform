from sqlalchemy import Column, Integer, String, DateTime, Text, Index
from core.database import Base
from datetime import datetime, timezone


class LogModel(Base):
    """Raw application logs from telemetry"""
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    service_name = Column(String, nullable=False, index=True)
    timestamp = Column(DateTime, nullable=False, index=True)
    level = Column(String, nullable=False)  # INFO, DEBUG, WARN, ERROR
    message = Column(Text, nullable=False)
    trace_id = Column(String, nullable=True, index=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    __table_args__ = (
        Index('ix_logs_service_timestamp', 'service_name', 'timestamp'),
    )
