from sqlalchemy import Column, Integer, String, DateTime, Text, Index
from core.database import Base
from datetime import datetime, timezone


class EventModel(Base):
    """System/infrastructure events from telemetry"""
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    service_name = Column(String, nullable=False, index=True)
    timestamp = Column(DateTime, nullable=False, index=True)
    type = Column(String, nullable=False)  # config_change, deployment, etc.
    details = Column(Text, nullable=False)
    severity = Column(String, nullable=False)  # critical, warning, info
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    __table_args__ = (
        Index('ix_events_service_timestamp', 'service_name', 'timestamp'),
        Index('ix_events_type', 'type'),
    )
