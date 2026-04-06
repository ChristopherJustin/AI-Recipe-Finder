from fastapi import UploadFile
from typing import Dict, Any, List
import json
import base64
import time

from app.core.config import settings
from google import genai


SYSTEM_PROMPT = """
You are a food recognition assistant.

Given an image of food ingredients:
- Identify all visible food ingredients
- Normalize ingredient names
- Return ONLY valid JSON
- No markdown or extra text

JSON format:
{
  "ingredients": string[],
  "confidence": { "ingredient": number },
  "uncertain": string[]
}
"""


def _mock_detection() -> Dict[str, Any]:
    return {
        "ingredients": ["eggs", "milk", "cheese"],
        "confidence": {
            "eggs": 0.95,
            "milk": 0.90,
            "cheese": 0.88,
        },
        "uncertain": [],
    }


def _get_client():
    api_key = settings.gemini_api_key

    print("Using Gemini Vision:", bool(api_key))

    if not api_key:
        return None

    return genai.Client(api_key=api_key)


def _generate_with_retry(client, contents, retries=2):
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
                time.sleep(1 * (attempt + 1))  # simple backoff

    raise last_error


def _extract_json(text: str) -> Dict[str, Any]:
    text = text.strip()

    if text.startswith("```"):
        text = text.replace("```json", "").replace("```", "").strip()

    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1:
        raise ValueError("No JSON object found in model response")

    return json.loads(text[start:end + 1])


def _normalize_ingredients(values: Any) -> List[str]:
    if not isinstance(values, list):
        return []

    return [
        str(v).strip().lower()
        for v in values
        if v and str(v).strip()
    ]


def _normalize_confidence(values: Any) -> Dict[str, float]:
    if not isinstance(values, dict):
        return {}

    normalized = {}

    for key, value in values.items():
        name = str(key).strip().lower()
        if not name:
            continue

        try:
            score = float(value)
            score = max(0.0, min(1.0, score))
        except:
            continue

        normalized[name] = score

    return normalized


def _normalize_uncertain(values: Any) -> List[str]:
    if not isinstance(values, list):
        return []

    return [str(v).strip() for v in values if str(v).strip()]


def _normalize_output(data: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "ingredients": _normalize_ingredients(data.get("ingredients", [])),
        "confidence": _normalize_confidence(data.get("confidence", {})),
        "uncertain": _normalize_uncertain(data.get("uncertain", [])),
    }


async def detect_ingredients_from_image(image: UploadFile) -> Dict[str, Any]:
    client = _get_client()

    if client is None:
        return _mock_detection()

    try:
        image_bytes = await image.read()
        encoded = base64.b64encode(image_bytes).decode("utf-8")

        contents = [
            {
                "role": "user",
                "parts": [
                    {"text": SYSTEM_PROMPT},
                    {
                        "inline_data": {
                            "mime_type": image.content_type,
                            "data": encoded,
                        }
                    },
                ],
            }
        ]

        response = _generate_with_retry(client, contents)

        print("\n--- GEMINI VISION RAW RESPONSE ---")
        print(response.text)
        print("--- END RESPONSE ---\n")

        parsed = _extract_json(response.text)
        return _normalize_output(parsed)

    except Exception as e:
        print("\n❌ Gemini image detection failed after retries")
        print("Error:", e)

        return _mock_detection()