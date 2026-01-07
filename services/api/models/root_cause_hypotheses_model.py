from sqlalchemy import Column, Integer, String, Enum as SQLEnum, ForeignKey, Float, DateTime, Text
from enum import Enum
from core.database import Base
from datetime import datetime, timezone


class EntityType(str, Enum):
    SERVICE = "service"
    CHANGE_EVENT = "change_event"
    INFRA = "infra"


class RootCauseHypothesisModel(Base):
    __tablename__ = "root_cause_hypotheses"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id"), nullable=False)
    title = Column(String, nullable=False)  # e.g., "Bad Deployment: checkout-service v2.4.1"
    description = Column(Text, nullable=True)  # Detailed description
    entity_type = Column(SQLEnum(EntityType), nullable=False)
    entity_id = Column(String, nullable=False)
    explanation = Column(Text, nullable=True)
    confidence_score = Column(Float, nullable=True)  # 0-100
    model_version = Column(String, nullable=False)
    is_primary = Column(Integer, default=0, nullable=False)  # 1 if this is the primary/selected hypothesis
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
