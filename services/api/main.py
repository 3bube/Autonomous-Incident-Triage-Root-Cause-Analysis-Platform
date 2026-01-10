from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings, get_logger
from routes.auth_routes import router as auth_router
from routes.incident_routes import router as incident_router
from routes.analytics_routes import router as analytics_router
from routes.integration_routes import router as integration_router
from routes.alert_rule_routes import router as alert_rule_router
from routes.ai_model_routes import router as ai_model_router
from routes.team_routes import router as team_router
from routes.dashboard_routes import router as dashboard_router
from routes.service_routes import router as service_router
from routes.telemetry_routes import router as telemetry_router
import uvicorn

logger = get_logger(__name__)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=settings.CORS_ALLOW_METHODS,
    allow_headers=settings.CORS_ALLOW_HEADERS,
)


# Include all routes
app.include_router(auth_router)
app.include_router(incident_router)
app.include_router(analytics_router)
app.include_router(integration_router)
app.include_router(alert_rule_router)
app.include_router(ai_model_router)
app.include_router(team_router)
app.include_router(dashboard_router)
app.include_router(service_router)
app.include_router(telemetry_router)


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