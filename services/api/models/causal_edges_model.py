from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from core.database import Base
from datetime import datetime, timezone


class CausalEdgeModel(Base):
    __tablename__ = "causal_edges"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    from_entity_type = Column(String, nullable=False)
    from_entity_id = Column(String, nullable=False)
    to_entity_type = Column(String, nullable=False)
    to_entity_id = Column(String, nullable=False)
    weight = Column(Float, nullable=False)
    evidence = Column(JSONB, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)