from sqlalchemy import Column, String, ForeignKey, Integer, DateTime
from sqlalchemy.orm import relationship
from core.database import Base
from datetime import datetime, timezone

class OrganizationModel(Base):
    __tablename__ = 'organizations'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    owner_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    owner = relationship("UserModel", back_populates="organizations")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)