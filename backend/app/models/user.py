from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)

    saved_recipes = relationship(
        "SavedRecipe",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    pantry_items = relationship(
        "PantryItem",
        back_populates="user",
        cascade="all, delete-orphan",
    )
