from sqlalchemy import Column, Integer, String, Enum as SQLEnum, ForeignKey, Float, DateTime
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
    entity_type = Column(SQLEnum(EntityType), nullable=False)
    entity_id = Column(String, nullable=False)
    explanation = Column(String, nullable=True)
    confidence_score = Column(Float, nullable=True)
    model_version = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)