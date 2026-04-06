from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.ai_vision_service import detect_ingredients_from_image

router = APIRouter()


@router.post("/search-from-image")
async def search_from_image(image: UploadFile = File(...)):
    # ✅ Validate file exists
    if not image:
        raise HTTPException(status_code=400, detail="Image file is required")

    # ✅ Validate content type
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="A valid image file is required (jpg, png, etc.)",
        )

    try:
        result = await detect_ingredients_from_image(image)

        # ✅ Safety fallback (never return broken structure)
        return {
            "ingredients": result.get("ingredients", []),
            "confidence": result.get("confidence", {}),
            "uncertain": result.get("uncertain", []),
        }

    except Exception as e:
        print(f"Vision route error: {e}")

        raise HTTPException(
            status_code=500,
            detail="Failed to process image",
        )