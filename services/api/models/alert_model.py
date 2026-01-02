from sqlalchemy import Column, Integer, String, ForeignKey, Enum as SQLEnum, DateTime
from core.database import Base
from enum import Enum
from datetime import datetime, timezone


class AlertSourceEnum(Enum):
    PROMETHEUS = "prometheus"
    ELK = "elk"
    CUSTOM = "custom"

class AlertModel(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    fingerprint = Column(String, nullable=False, unique=True)
    source = Column(SQLEnum(AlertSourceEnum), nullable=False)
    severity = Column(String, nullable=False)
    first_seen_at = Column(DateTime, nullable=True)
    last_seen_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    