from pydantic import BaseModel, Field
from typing import List, Optional


class IngredientRequest(BaseModel):
    ingredients: List[str]


class Recipe(BaseModel):
    id: int
    name: str
    ingredients: List[str]
    instructions: Optional[List[str]] = None


class PartialRecipeMatch(BaseModel):
    id: int
    name: str
    ingredients: List[str]
    instructions: Optional[List[str]] = None
    missing_ingredients: List[str] = Field(default_factory=list)
    match_percentage: int


class RecipeSearchResponse(BaseModel):
    exact_matches: List[Recipe]
    partial_matches: List[PartialRecipeMatch]


class RecipeResponse(BaseModel):
    id: int
    name: str
    ingredients: List[str]
    instructions: Optional[List[str]] = None
    missing_ingredients: List[str] = Field(default_factory=list)