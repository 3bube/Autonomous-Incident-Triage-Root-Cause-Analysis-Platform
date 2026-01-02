from fastapi import Depends, HTTPException
from fastapi.responses import JSONResponse
from services.user_service import UserService
from services.organization_service import OrganizationService
from schemas.user_schema import UserCreateSchema, UserResponseSchema
from core.config import get_logger


logger = get_logger(__name__)


class UserController:
    def __init__(self, user_service: UserService = Depends(), organization_service: OrganizationService = Depends()):
        self.user_service = user_service
        self.organization_service = organization_service

    async def create_user(self, user: UserCreateSchema) -> JSONResponse:
        try:
            logger.info(f"Controller: Creating user {user.email}")
            created_user = await self.user_service.create_user(user)

            if created_user:
                # Auto-create organization for the new user
                await self.organization_service.create_organization_for_user(user_id=created_user.id, org_name=f"{created_user.full_name}-org")
            else:
                logger.error("Controller: Organization creation failed")
                return JSONResponse(status_code=500, content={"message": "Organization creation failed"})

            return JSONResponse(status_code=201, content=created_user.model_dump())
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    async def get_user(self, email: str) -> JSONResponse:
        try:
            logger.info(f"Controller: Getting user {email}")
            user = await self.user_service.get_user_by_email(email)
            if user:
                logger.info(f"Controller: User found {email}")
                return JSONResponse(status_code=200, content=user.model_dump())
            raise HTTPException(status_code=404, detail="User not found")
        except Exception as e:
            logger.error(f"Controller: Error getting user {email} - {e}")
            raise HTTPException(status_code=400, detail=str(e))

    async def authenticate_user(self, email: str, password: str) -> JSONResponse:
        try:
            logger.info(f"Controller: Authenticating user {email}")
            user = await self.user_service.authenticate_user(email, password)
            if user:
                return JSONResponse(status_code=200, content=user.model_dump())
            raise HTTPException(status_code=401, detail="Invalid credentials")
        except Exception as e:
            logger.error(f"Controller: Error authenticating user {email} - {e}")
            raise HTTPException(status_code=400, detail=str(e))