from sqlalchemy import Column, Integer, String, Enum as SQLEnum, DateTime, ForeignKey, Text
from core.database import Base
from datetime import datetime, timezone
from enum import Enum


class AlertRuleStatusEnum(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    PAUSED = "paused"


class AlertRuleModel(Base):
    __tablename__ = "alert_rules"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    condition = Column(Text, nullable=False)
    severity = Column(String, nullable=True)
    status = Column(SQLEnum(AlertRuleStatusEnum), default=AlertRuleStatusEnum.ACTIVE, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)


class SuppressionPolicyModel(Base):
    __tablename__ = "suppression_policies"

    id = Column(String, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    condition = Column(Text, nullable=False)
    impact = Column(String, nullable=True)
    time_window = Column(String, nullable=True)
    status = Column(SQLEnum(AlertRuleStatusEnum), default=AlertRuleStatusEnum.ACTIVE, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
