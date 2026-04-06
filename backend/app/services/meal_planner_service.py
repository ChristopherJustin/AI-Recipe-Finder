from sqlalchemy.orm import Session
from app.models.pantry_item import PantryItem


def generate_meal_plan(db: Session, user_id: int, days: int):

    pantry_items = db.query(PantryItem).filter(
        PantryItem.user_id == user_id
    ).all()

    ingredients = [item.name for item in pantry_items]

    # placeholder AI logic
    meal_plan = []

    for day in range(1, days + 1):
        meal_plan.append({
            "day": day,
            "breakfast": "Egg omelette",
            "lunch": "Chicken rice bowl",
            "dinner": "Vegetable stir fry"
        })

    return {
        "ingredients_used": ingredients,
        "plan": meal_plan
    }