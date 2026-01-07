from pydantic import BaseModel
from datetime import datetime


class OrganizationCreateSchema(BaseModel):
    name: str

    
class OrganizationResponseSchema(BaseModel):
    id: int
    name: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True