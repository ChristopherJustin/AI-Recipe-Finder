from pydantic import BaseModel


class PantryItemCreate(BaseModel):
    name: str
    quantity: str | None = None


class PantryItemResponse(BaseModel):
    id: int
    name: str
    quantity: str | None = None

    class Config:
        from_attributes = True