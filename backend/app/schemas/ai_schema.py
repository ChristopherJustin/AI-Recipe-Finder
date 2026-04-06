from pydantic import BaseModel
from typing import Dict, List


class AIDetectionResponse(BaseModel):
    ingredients: List[str]
    confidence: Dict[str, float]

class AIRequest(BaseModel):
    ingredients: List[str]