from fastapi import APIRouter, HTTPException

from app.schemas.recipe_schema import IngredientRequest
from app.services.ai_service import generate_recipes_from_text

router = APIRouter()


@router.post("/generate-recipes")
def generate_ai_recipes(data: IngredientRequest):
    if not data.ingredients:
        raise HTTPException(status_code=400, detail="Ingredients are required")

    recipes = generate_recipes_from_text(data.ingredients)

    return {"recipes": recipes}


