from typing import List, Dict, Any
import json
import time

from app.core.config import settings
from google import genai

SYSTEM_PROMPT = """
You are a professional cooking assistant.

Given a list of ingredients:
- Generate 1–2 realistic recipes
- Use only the provided ingredients plus common pantry items
- Return ONLY valid JSON
- No markdown or extra text

JSON format:
{
  "recipes": [
    {
      "name": string,
      "ingredients": string[],
      "instructions": string[]
    }
  ]
}
"""

def _get_client():
    api_key = settings.gemini_api_key

    print("Using Gemini:", bool(api_key))

    if not api_key:
        return None

    return genai.Client(api_key=api_key)


def _normalize_ingredients(ingredients: List[str]) -> List[str]:
    return [i.lower().strip() for i in ingredients if i and i.strip()]


def _mock_recipes(ingredients: List[str]) -> List[Dict[str, Any]]:
    return [
        {
            "name": f"Mock AI Omelette with {', '.join(ingredients)}",
            "ingredients": ingredients + ["salt", "pepper"],
            "instructions": [
                "Crack the eggs into a bowl.",
                "Whisk with salt and pepper.",
                "Cook in a pan until set.",
            ],
        },
        {
            "name": f"Mock AI Smoothie with {', '.join(ingredients)}",
            "ingredients": ingredients + ["banana", "honey"],
            "instructions": [
                "Add all ingredients to a blender.",
                "Blend until smooth.",
                "Serve chilled.",
            ],
        },
    ]


def _extract_json(text: str) -> Dict[str, Any]:
    text = text.strip()

    if text.startswith("```"):
        text = text.replace("```json", "").replace("```", "").strip()

    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1:
        raise ValueError("No JSON object found in model response")

    return json.loads(text[start:end + 1])


def _normalize_recipe_output(recipes: Any) -> List[Dict[str, Any]]:
    if not isinstance(recipes, list):
        return []

    normalized = []

    for recipe in recipes:
        if not isinstance(recipe, dict):
            continue

        name = recipe.get("name", "Untitled Recipe")
        ingredients = recipe.get("ingredients", [])
        instructions = recipe.get("instructions", recipe.get("steps", []))

        if not isinstance(ingredients, list):
            ingredients = []

        if not isinstance(instructions, list):
            instructions = []

        normalized.append(
            {
                "name": str(name),
                "ingredients": [str(i) for i in ingredients],
                "instructions": [str(step) for step in instructions],
            }
        )

    return normalized


def _generate_with_retry(client, contents, retries=2, delay=1):
    last_error = None

    for attempt in range(retries + 1):
        try:
            return client.models.generate_content(
                model="gemini-2.0-flash",
                contents=contents,
            )
        except Exception as e:
            last_error = e
            print(f"⚠️ Gemini attempt {attempt + 1} failed:", e)

            if attempt < retries:
                time.sleep(delay * (attempt + 1))

    raise last_error


def generate_recipes_from_text(ingredients: List[str]) -> List[Dict[str, Any]]:
    normalized = _normalize_ingredients(ingredients)

    if not normalized:
        return []

    client = _get_client()

    if client is None:
        return _mock_recipes(normalized)

    try:
        response = _generate_with_retry(
            client,
            [
                SYSTEM_PROMPT,
                f"Ingredients: {', '.join(normalized)}",
            ],
        )

        print("\n--- GEMINI RAW RESPONSE ---")
        print(response.text)
        print("--- END RESPONSE ---\n")

        parsed = _extract_json(response.text)
        return _normalize_recipe_output(parsed.get("recipes", []))

    except Exception as e:
        print("\n❌ Gemini recipe generation failed")
        print("Error:", e)
        return _mock_recipes(normalized)
