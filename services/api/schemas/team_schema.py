from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum


class UserRoleEnum(str, Enum):
    SUPER_ADMIN = "super_admin"
    ADMIN = "admin"
    SRE = "sre"
    DEVELOPER = "developer"
    VIEWER = "viewer"


class InviteStatusEnum(str, Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    EXPIRED = "expired"
    REVOKED = "revoked"


class TeamStatsSchema(BaseModel):
    total_users: int
    active_admins: int
    sre_team_count: int
    pending_invites: int


class TeamMemberSchema(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: UserRoleEnum
    is_active: bool
    last_login: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class TeamMemberResponseSchema(TeamMemberSchema):
    incidents_resolved: Optional[int] = 0
    avg_resolution_time: Optional[str] = None
    
    class Config:
        from_attributes = True


class TeamInviteSchema(BaseModel):
    id: int
    email: EmailStr
    role: UserRoleEnum
    status: InviteStatusEnum
    invited_by: str
    invited_at: datetime
    expires_at: datetime
    
    class Config:
        from_attributes = True


class TeamResponseSchema(BaseModel):
    stats: TeamStatsSchema
    members: List[TeamMemberResponseSchema]
    pending_invites: List[TeamInviteSchema]


class TeamInviteCreateSchema(BaseModel):
    email: EmailStr
    role: UserRoleEnum
    organization_id: int


class TeamMemberUpdateSchema(BaseModel):
    role: Optional[UserRoleEnum] = None
    is_active: Optional[bool] = None
