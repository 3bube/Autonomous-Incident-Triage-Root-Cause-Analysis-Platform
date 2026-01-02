from sqlalchemy import Column, Integer, String, ForeignKey, Enum as SQLEnum, DateTime
from core.database import Base
from enum import Enum
from datetime import datetime, timezone

class StatusEnum(Enum):
    OPEN = "open"
    MITIGATED = "mitigated"
    RESOLVED = "resolved"


class IncidentModel(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    primary_service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    title = Column(String, nullable=False)
    severity = Column(String, nullable=False)
    status = Column(SQLEnum(StatusEnum), default=StatusEnum.OPEN, nullable=False)
    start_time = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    end_time = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)