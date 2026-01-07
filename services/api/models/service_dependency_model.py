from sqlalchemy import Column, Integer, String, Enum as SQLEnum, ForeignKey
from core.database import Base
from enum import Enum


class DependencyTypeEnum(str, Enum):
    UPSTREAM = "upstream"
    DOWNSTREAM = "downstream"
    BIDIRECTIONAL = "bidirectional"


class ServiceDependencyModel(Base):
    __tablename__ = "service_dependencies"

    id = Column(Integer, primary_key=True, index=True)
    source_service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    target_service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    dependency_type = Column(SQLEnum(DependencyTypeEnum), nullable=False)
