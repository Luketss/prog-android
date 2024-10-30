# models.py
from typing import Optional
from datetime import datetime, timezone
from sqlmodel import Field, Relationship, SQLModel
from enum import Enum, IntEnum


class OrderStatusEnum(IntEnum):
    PRODUCAO = (1,)
    PRONTO = (2,)
    EMROTA = (3,)
    ENTREGUE = 4


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    email: str = Field(unique=True, index=True)
    username: str = Field(unique=True, index=True)
    hashed_password: str = Field()
    created_at: datetime = Field(default_factory=lambda: datetime.now())


class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field()
    description: str = Field()
    image_url: str = Field()
    price: float = Field()


class Order(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now())
    user_id: int | None = Field(default=None, foreign_key="user.id")
    order_status: OrderStatusEnum = Field(default=1)


class OrderMenuItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: int | None = Field(default=None, foreign_key="order.id")
    product_id: int | None = Field(default=None, foreign_key="product.id")
    quantity: int = Field()


class ImageModel(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    file_path: str
