from fastapi import FastAPI
from core.config import settings, get_logger
from routes.auth_routes import router as auth_router
import uvicorn

logger = get_logger(__name__)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG
)

# Include auth routes
app.include_router(auth_router)


@app.get("/")
async def read_root():
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "database": "connected" if settings.DATABASE_URL else "missing",
    }


@app.get("/health")
async def health():
    return {"status": "ok"}


if __name__ == "__main__":
    logger.info(f"Starting {settings.APP_NAME} on {settings.HOST}:{settings.PORT}")
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower()
    )