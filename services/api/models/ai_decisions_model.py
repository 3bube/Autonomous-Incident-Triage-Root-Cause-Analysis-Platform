from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from core.database import Base
from datetime import datetime, timezone


class AIDecisionsModel(Base):
    __tablename__ = "ai_decisions"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id"), nullable=False)
    decision_type = Column(String, nullable=False)
    input_snapshot = Column(JSONB, nullable=False)
    decision_output = Column(JSONB, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
