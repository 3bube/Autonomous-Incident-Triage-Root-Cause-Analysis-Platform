from sqlalchemy import Column, Integer, String, ForeignKey, Enum as SQLEnum, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from core.database import Base
from enum import Enum
from datetime import datetime, timezone

class EventType(str, Enum):
    ALERT_TRIGGERED = "alert_triggered"
    ANOMALY_DETECTED = "anomaly_detected"
    CHANGE_DETECTED = "change_detected"
    HYPOTHESIS_GENERATED = "hypothesis_generated"
    HUMAN_OVERRIDE = "human_override"


class IncidentEventModel(Base):
    __tablename__ = "incident_events"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id"), nullable=False)
    event_type = Column(SQLEnum(EventType), nullable=False)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    payload = Column(JSONB, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)