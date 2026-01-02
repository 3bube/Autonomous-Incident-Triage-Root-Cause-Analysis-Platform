from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from core.database import Base
from datetime import datetime, timezone

class IncidentServiceModel(Base):
    __tablename__ = "incident_services"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id"), nullable=False)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    impact_score = Column(Float, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    