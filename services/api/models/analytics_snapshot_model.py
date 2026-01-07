from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from core.database import Base
from datetime import datetime, timezone


class AnalyticsSnapshotModel(Base):
    """
    Stores periodic snapshots of analytics metrics for historical tracking
    """
    __tablename__ = "analytics_snapshots"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    snapshot_time = Column(DateTime, nullable=False)
    
    # MTTR & MTTD
    mttr_minutes = Column(Float, nullable=True)
    mttd_minutes = Column(Float, nullable=True)
    
    # Noise Reduction
    noise_reduction_percentage = Column(Float, nullable=True)
    
    # Error Budget
    error_budget_percentage = Column(Float, nullable=True)
    
    # Alert Funnel
    raw_alerts_count = Column(Integer, nullable=True)
    correlated_groups_count = Column(Integer, nullable=True)
    incidents_count = Column(Integer, nullable=True)
    
    # Incident Counts by Severity
    p0_incidents = Column(Integer, default=0)
    p1_incidents = Column(Integer, default=0)
    p2_incidents = Column(Integer, default=0)
    p3_incidents = Column(Integer, default=0)
    p4_incidents = Column(Integer, default=0)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
