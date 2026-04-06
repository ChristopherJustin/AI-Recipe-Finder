from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.auth_service import get_current_user
from app.models.saved_recipe import SavedRecipe
from app.models.user import User
from app.schemas.saved_recipe_schema import (
    SaveRecipeRequest,
    SavedRecipesResponse,
)

router = APIRouter()

@router.get("/", response_model=SavedRecipesResponse)
def get_saved_recipes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    recipes = (
        db.query(SavedRecipe)
        .filter(SavedRecipe.user_id == current_user.id)
        .order_by(SavedRecipe.id.desc())
        .all()
    )

    return {
        "recipes": [
            {
                "id": recipe.id,
                "recipe_id": recipe.recipe_id,
                "name": recipe.name,
            }
            for recipe in recipes
        ]
    }


@router.post("/save")
def save_recipe(
    data: SaveRecipeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing = (
        db.query(SavedRecipe)
        .filter(
            SavedRecipe.user_id == current_user.id,
            SavedRecipe.recipe_id == data.recipe_id,
        )
        .first()
    )

    if existing:
        raise HTTPException(status_code=400, detail="Recipe already saved")

    saved_recipe = SavedRecipe(
        recipe_id=data.recipe_id,
        name=data.recipe_name,
        user_id=current_user.id,
    )

    db.add(saved_recipe)
    db.commit()
    db.refresh(saved_recipe)

    return {
        "id": saved_recipe.id,
        "recipe_id": saved_recipe.recipe_id,
        "name": saved_recipe.name,
    }


@router.delete("/delete/{saved_recipe_id}")
def delete_saved_recipe(
    saved_recipe_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    saved_recipe = (
        db.query(SavedRecipe)
        .filter(
            SavedRecipe.id == saved_recipe_id,
            SavedRecipe.user_id == current_user.id,
        )
        .first()
    )

    if not saved_recipe:
        raise HTTPException(status_code=404, detail="Saved recipe not found")

    db.delete(saved_recipe)
    db.commit()

    return {"message": "Recipe removed successfully"}
