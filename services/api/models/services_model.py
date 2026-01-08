from sqlalchemy import Column, Integer, String, Enum as SQLEnum, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from core.database import Base
from datetime import datetime, timezone
from enum import Enum

class TierEnum(str, Enum):
    CRITICAL = "critical"
    NON_CRITICAL = "non_critical"

class ServiceHealthEnum(str, Enum):
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    CRITICAL = "critical"
    UNKNOWN = "unknown"

class ServiceModel(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    tier = Column(SQLEnum(TierEnum, native_enum=False), nullable=False, default=TierEnum.NON_CRITICAL)
    owner_team = Column(String, nullable=False)
    health_status = Column(SQLEnum(ServiceHealthEnum, native_enum=False), default=ServiceHealthEnum.UNKNOWN, nullable=False)
    avg_latency = Column(Float, nullable=True)  # milliseconds
    error_rate = Column(Float, nullable=True)  # percentage
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    