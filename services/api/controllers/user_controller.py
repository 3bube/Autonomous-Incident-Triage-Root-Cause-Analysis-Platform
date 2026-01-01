from fastapi import Depends, HTTPException
from fastapi.responses import JSONResponse
from services.user_service import UserService
from schemas.user_schema import UserCreateSchema, UserResponseSchema


class UserController:
    def __init__(self, user_service: UserService = Depends()):
        self.user_service = user_service

    async def create_user(self, user: UserCreateSchema) -> JSONResponse:
        try:
            created_user = await self.user_service.create_user(user)
            return JSONResponse(status_code=201, content=created_user.model_dump())
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    async def get_user(self, email: str) -> JSONResponse:
        user = await self.user_service.get_user_by_email(email)
        if user:
            return JSONResponse(status_code=200, content=user.model_dump())
        raise HTTPException(status_code=404, detail="User not found")

    async def authenticate_user(self, email: str, password: str) -> JSONResponse:
        user = await self.user_service.authenticate_user(email, password)
        if user:
            return JSONResponse(status_code=200, content=user.model_dump())
        raise HTTPException(status_code=401, detail="Invalid credentials")