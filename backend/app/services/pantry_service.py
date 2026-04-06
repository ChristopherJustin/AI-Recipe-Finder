from sqlalchemy.orm import Session
from app.models.pantry_item import PantryItem


def get_pantry_items(db: Session, user_id: int):
    return db.query(PantryItem).filter(PantryItem.user_id == user_id).all()


def add_pantry_item(db: Session, user_id: int, name: str, quantity: str | None):
    item = PantryItem(
        name=name,
        quantity=quantity,
        user_id=user_id
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


def delete_pantry_item(db: Session, item_id: int, user_id: int):
    item = (
        db.query(PantryItem)
        .filter(PantryItem.id == item_id, PantryItem.user_id == user_id)
        .first()
    )

    if not item:
        return None

    db.delete(item)
    db.commit()

    return item