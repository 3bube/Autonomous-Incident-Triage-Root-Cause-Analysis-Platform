from sqlalchemy import Column, Integer, String, Enum as SQLEnum, DateTime, ForeignKey, JSON
from core.database import Base
from datetime import datetime, timezone
from enum import Enum


class IntegrationStatusEnum(str, Enum):
    CONNECTED = "connected"
    DISCONNECTED = "disconnected"
    SYNCED = "synced"
    ERROR = "error"


class IntegrationTypeEnum(str, Enum):
    PROMETHEUS = "prometheus"
    OPENTELEMETRY = "opentelemetry"
    DATADOG = "datadog"
    GITHUB = "github"
    SLACK = "slack"
    ELASTICSEARCH = "elasticsearch"
    PAGERDUTY = "pagerduty"


class IntegrationModel(Base):
    __tablename__ = "integrations"

    id = Column(String, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    type = Column(SQLEnum(IntegrationTypeEnum), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    status = Column(SQLEnum(IntegrationStatusEnum), default=IntegrationStatusEnum.DISCONNECTED, nullable=False)
    config = Column(JSON, nullable=True)  # Store integration-specific config
    last_sync_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
