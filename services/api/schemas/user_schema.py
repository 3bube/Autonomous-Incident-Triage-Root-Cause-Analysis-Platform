from pydantic import BaseModel, EmailStr
from enum import Enum


class UserRole(str, Enum):
    ADMIN = "admin"
    SRE = "sre"
    VIEWER = "viewer"


class UserCreateSchema(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: UserRole
    
    class Config:
        from_attributes = True
        
        
class UserResponseSchema(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: UserRole

    class Config:
        from_attributes = True