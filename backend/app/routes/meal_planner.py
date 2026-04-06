from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services import meal_planner_service

router = APIRouter(prefix="/meal-plan", tags=["Meal Planner"])


@router.post("/")
def generate_meal_plan(days: int = 5, db: Session = Depends(get_db)):

    user_id = 1

    return meal_planner_service.generate_meal_plan(
        db,
        user_id,
        days
    )