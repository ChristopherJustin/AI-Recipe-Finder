from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database.database import Base, engine

from app.routes import recipes, ai, vision, saved, contact, pantry, meal_planner, auth
from app.models.user import User
from app.models.saved_recipe import SavedRecipe

app = FastAPI(title=settings.app_name, version=settings.app_version)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins if isinstance(settings.cors_origins, list) else [settings.cors_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

app.include_router(recipes.router, prefix="/api/v1/recipes", tags=["Recipes"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI"])
app.include_router(vision.router, prefix="/api/v1/vision", tags=["Vision"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(saved.router, prefix="/api/v1/saved", tags=["Saved Recipes"])
app.include_router(contact.router, prefix="/api/v1/contact", tags=["Contact"])
# app.include_router(pantry.router, prefix="/api/v1/pantry", tags=["Pantry"])
# app.include_router(meal_planner.router, prefix="/api/v1/meal-planner", tags=["Meal Planner"])

@app.get("/api/v1/health", tags=["Health"])
def health_check():
    return {
        "status": "ok",
        "app": settings.app_name,
        "version": settings.app_version,
        "environment": settings.environment,
    }

@app.get("/", tags=["Root"])
def root():
    return {"message": "Welcome to AI Recipe Finder API!"}


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error"},
    )
