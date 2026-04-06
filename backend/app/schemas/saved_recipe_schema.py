from pydantic import BaseModel
from typing import List


class SaveRecipeRequest(BaseModel):
    recipe_id: int
    recipe_name: str


class SavedRecipeResponseItem(BaseModel):
    id: int
    recipe_id: int
    name: str


class SavedRecipesResponse(BaseModel):
    recipes: List[SavedRecipeResponseItem]