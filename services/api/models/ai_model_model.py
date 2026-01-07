from sqlalchemy import Column, Integer, String, Enum as SQLEnum, DateTime, ForeignKey, Float
from core.database import Base
from datetime import datetime, timezone
from enum import Enum


class AIModelTypeEnum(str, Enum):
    ROOT_CAUSE_ANALYSIS = "root_cause_analysis"
    ANOMALY_DETECTION = "anomaly_detection"
    ALERT_CORRELATION = "alert_correlation"
    SEVERITY_PREDICTION = "severity_prediction"
    SERVICE_DEPENDENCY = "service_dependency"


class AIModelStatusEnum(str, Enum):
    ACTIVE = "active"
    TRAINING = "training"
    IDLE = "idle"
    ERROR = "error"


class AIModelModel(Base):
    __tablename__ = "ai_models"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    name = Column(String, nullable=False)
    type = Column(SQLEnum(AIModelTypeEnum), nullable=False)
    version = Column(String, nullable=False)
    accuracy = Column(Float, nullable=True)  # percentage
    status = Column(SQLEnum(AIModelStatusEnum), default=AIModelStatusEnum.IDLE, nullable=False)
    training_samples = Column(Integer, nullable=True)
    false_positive_rate = Column(Float, nullable=True)
    false_negative_rate = Column(Float, nullable=True)
    last_trained_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
