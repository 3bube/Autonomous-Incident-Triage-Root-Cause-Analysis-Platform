from sqlalchemy import Column, Integer, String, ForeignKey, Enum as SQLEnum, Float, DateTime
from .incident_features_model import FeatureTypeEnum
from core.database import Base
from datetime import datetime, timezone

class ServiceBaselineModel(Base):
    __tablename__ = "service_baselines"

    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    feature_type = Column(SQLEnum(FeatureTypeEnum), nullable=False)
    baseline_value = Column(Float, nullable=False)
    stddev = Column(Float, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)