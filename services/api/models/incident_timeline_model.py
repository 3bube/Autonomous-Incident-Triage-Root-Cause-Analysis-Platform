from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from core.database import Base
from datetime import datetime, timezone


class IncidentTimelineModel(Base):
    __tablename__ = "incident_timeline"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id"), nullable=False)
    timestamp = Column(DateTime, nullable=False)
    metric_value = Column(Integer, nullable=False)  # e.g., error count, latency
    status = Column(String, nullable=False)  # normal, warning, critical
    event_label = Column(String, nullable=True)  # e.g., "Deploy v2.4.1"
    annotation = Column(String, nullable=True)  # e.g., "Latency > 1s"
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
