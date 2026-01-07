from pydantic import BaseModel, EmailStr
from enum import Enum
from datetime import datetime
from typing import Optional


class UserRole(str, Enum):
    SUPER_ADMIN = "super_admin"
    ADMIN = "admin"
    SRE = "sre"
    DEVELOPER = "developer"
    VIEWER = "viewer"


class LoginSchema(BaseModel):
    """Login request schema"""
    email: EmailStr
    password: str


class UserCreateSchema(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: UserRole = UserRole.ADMIN
    
    class Config:
        from_attributes = True
        
        
class UserResponseSchema(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: UserRole
    is_active: bool
    last_login: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True