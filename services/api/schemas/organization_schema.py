from pydantic import BaseModel, Field
from datetime import datetime


class OrganizationSchema(BaseModel):
    id: int
    name: str = Field(..., example="Acme Corp", nullable=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

class OrganizationCreateSchema(BaseModel):
    id: int = Field(..., example=1)
    name: str = Field(..., example="Acme Corp", nullable=True)

    
class OrganizationResponseSchema(OrganizationSchema):
    id: int
    name: str
    created_at: datetime