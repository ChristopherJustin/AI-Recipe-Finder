from fastapi import APIRouter, HTTPException
from typing import List
from urllib.parse import unquote

from app.schemas.recipe_schema import (
    IngredientRequest,
    RecipeSearchResponse,
    RecipeResponse,
)

from app.services.recipe_service import (
    search_recipes,
    get_recipe_by_id,
    get_all_recipes,
)

router = APIRouter()


@router.get("/all", response_model=List[RecipeResponse])
async def get_all_recipes_endpoint():
    """
    Return all recipes from the recipe dataset.
    """
    return get_all_recipes()


@router.post("/search", response_model=RecipeSearchResponse)
async def search_recipes_endpoint(data: IngredientRequest):
    """
    Search for recipes based on user-provided ingredients.
    """
    return search_recipes(data.ingredients)


@router.get("/{recipe_id}", response_model=RecipeResponse)
async def get_recipe(recipe_id: int):

    recipe = get_recipe_by_id(recipe_id)

    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    return recipe