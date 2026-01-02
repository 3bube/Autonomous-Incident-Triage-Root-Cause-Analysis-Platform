from sqlalchemy import Column, Integer, String, ForeignKey, Enum as SQLEnum, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from enum import Enum
from core.database import Base
from datetime import datetime, timezone


class ChangeTypeEnum(Enum):
    DEPLOY = "deploy"
    CONFIG = "config"
    INFRA = "infra"


class ChangeEventModel(Base):
    __tablename__ = "change_events"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    change_type = Column(SQLEnum(ChangeTypeEnum), nullable=False)
    version = Column(String, nullable=False)
    author = Column(String, nullable=False)
    change_metadata = Column(JSONB, nullable=True)
    started_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    ended_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
