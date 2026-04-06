import json
from pathlib import Path
from typing import List, Dict, Optional
from difflib import SequenceMatcher

from app.schemas.recipe_schema import RecipeResponse

DATA_PATH = Path(__file__).parent.parent / "seed_data" / "recipes.json"

with open(DATA_PATH) as f:
    RECIPES = json.load(f)

RECIPES_BY_ID = {r["id"]: r for r in RECIPES}


def normalize_text_list(values: List[str]) -> List[str]:
    return [v.strip().lower() for v in values if v and v.strip()]


def similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()


def search_recipes(user_terms: List[str]) -> Dict:
    terms = normalize_text_list(user_terms)

    exact_matches: List[Dict] = []
    partial_matches: List[Dict] = []

    if not terms:
        return {
            "exact_matches": [],
            "partial_matches": [],
        }

    for recipe in RECIPES:
        recipe_name = recipe["name"].lower()
        recipe_ingredients = normalize_text_list(recipe.get("ingredients", []))

        score = 0
        matched_terms = []

        for term in terms:
            name_exact = term in recipe_name
            ingredient_exact = any(term in ing for ing in recipe_ingredients)

            name_fuzzy = similarity(term, recipe_name) >= 0.72
            ingredient_fuzzy = any(
                similarity(term, ing) >= 0.72 for ing in recipe_ingredients
            )

            if name_exact:
                score += 5
                matched_terms.append(term)
            elif ingredient_exact:
                score += 2
                matched_terms.append(term)
            elif name_fuzzy:
                score += 3
                matched_terms.append(term)
            elif ingredient_fuzzy:
                score += 1
                matched_terms.append(term)

        if score <= 0:
            continue

        # ✅ FIX: calculate missing INGREDIENTS (not search terms)
        missing_ingredients = [
            ing for ing in recipe_ingredients
            if not any(
                term in ing or similarity(term, ing) >= 0.72
                for term in terms
            )
        ]

        # how many ingredients user has vs total
        matched_ingredient_count = len(recipe_ingredients) - len(missing_ingredients)

        match_percentage = int(
            (matched_ingredient_count / len(recipe_ingredients)) * 100
        ) if recipe_ingredients else 0

        result = {
            "id": recipe["id"],
            "name": recipe["name"],
            "ingredients": recipe.get("ingredients", []),  # ✅ full list stays
            "instructions": recipe.get("instructions", []),
            "missing_ingredients": missing_ingredients,     # ✅ actual missing ingredients
            "match_percentage": match_percentage,
        }

        if len(missing_ingredients) == 0:
            exact_matches.append(result)
        else:
            partial_matches.append(result)

    exact_matches.sort(key=lambda r: (-r["match_percentage"], r["name"]))
    partial_matches.sort(key=lambda r: (-r["match_percentage"], r["name"]))

    return {
        "exact_matches": exact_matches,
        "partial_matches": partial_matches,
    }


def get_recipe_by_id(recipe_id: int) -> Optional[Dict]:
    return RECIPES_BY_ID.get(recipe_id)


def get_all_recipes() -> List[RecipeResponse]:
    return [
        RecipeResponse(
            id=r["id"],
            name=r["name"],
            ingredients=r.get("ingredients", []),
            instructions=r.get("instructions", []),
            missing_ingredients=[],
        )
        for r in RECIPES
    ]
