from sqlalchemy import Column, Integer, String, Enum as SQLEnum, DateTime, ForeignKey, Boolean
from core.database import Base
from datetime import datetime, timezone
from enum import Enum


class InviteStatusEnum(str, Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    EXPIRED = "expired"
    REVOKED = "revoked"


class TeamInviteModel(Base):
    __tablename__ = "team_invites"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    email = Column(String, nullable=False)
    role = Column(String, nullable=False)  # super_admin, admin, sre, developer, viewer
    status = Column(SQLEnum(InviteStatusEnum), default=InviteStatusEnum.PENDING, nullable=False)
    invited_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    invite_token = Column(String, nullable=False, unique=True)
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
