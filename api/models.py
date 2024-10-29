# models.py
from typing import Optional
from datetime import datetime, timezone
from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    email: str = Field(unique=True, index=True)
    username: str = Field(unique=True, index=True)
    hashed_password: str = Field()
    created_at: datetime = Field(default_factory=lambda: datetime.now())


class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    price: float = Field()


class Order(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now())
    product_id: int | None = Field(default=None, foreign_key="product.id")
