from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from core.database import Base
from datetime import datetime, timezone


class DeploymentEventModel(Base):
    """
    Tracks deployment events for correlation with incidents
    """
    __tablename__ = "deployment_events"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    version = Column(String, nullable=False)
    environment = Column(String, nullable=False)  # prod, staging, dev
    deployed_by = Column(String, nullable=True)
    commit_sha = Column(String, nullable=True)
    repository = Column(String, nullable=True)
    deployment_started_at = Column(DateTime, nullable=False)
    deployment_completed_at = Column(DateTime, nullable=True)
    rollback_at = Column(DateTime, nullable=True)
    status = Column(String, nullable=False)  # in_progress, completed, failed, rolled_back
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
