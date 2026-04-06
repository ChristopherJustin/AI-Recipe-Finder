from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.pantry_schema import PantryItemCreate, PantryItemResponse
from app.services import pantry_service

router = APIRouter(prefix="/pantry", tags=["Pantry"])


@router.get("/", response_model=list[PantryItemResponse])
def get_pantry(db: Session = Depends(get_db)):

    user_id = 1  # replace later with auth user

    return pantry_service.get_pantry_items(db, user_id)


@router.post("/", response_model=PantryItemResponse)
def add_item(item: PantryItemCreate, db: Session = Depends(get_db)):

    user_id = 1

    return pantry_service.add_pantry_item(
        db,
        user_id,
        item.name,
        item.quantity
    )


@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):

    user_id = 1

    pantry_service.delete_pantry_item(db, item_id, user_id)

    return {"message": "Item deleted"}