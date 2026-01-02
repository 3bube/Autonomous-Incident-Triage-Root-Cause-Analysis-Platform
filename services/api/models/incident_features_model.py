from sqlalchemy import Column, Integer, String, ForeignKey, Enum as SQLEnum, Float, DateTime
from enum import Enum
from core.database import Base
from datetime import datetime, timezone


class FeatureTypeEnum(Enum):
    LATENCY_SPIKE = "latency_spike"
    ERROR_RATE_CHANGE = "error_rate_change"
    CPU_ANOMALY = "cpu_anomaly"
    LOG_ENTROPY = "log_entropy"


class IncidentFeatureModel(Base):
    __tablename__ = "incident_features"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id"), nullable=False)
    feature_type = Column(SQLEnum(FeatureTypeEnum), nullable=False)
    value = Column(Float, nullable=False)
    window_start = Column(DateTime, nullable=False)
    window_end = Column(DateTime, nullable=False)
    confidence_score = Column(Float, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)