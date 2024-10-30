from typing import Annotated
from datetime import timedelta, datetime
from fastapi import APIRouter, Depends, HTTPException, Query, status
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlmodel import Session, select
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from database import get_session
from models import User, Order, Product

# Create a router instance
router = APIRouter()

# Define the session dependency correctly using Annotated and Depends
SessionDep = Annotated[Session, Depends(get_session)]

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.now() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@router.get("/")
def read_root():
    return {"Hello": "World"}


@router.post("/login")
def login(
    # form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    email: str,
    password: str,
    session: Annotated[Session, Depends(get_session)],
):
    user = session.exec(select(User).where(User.email == email)).first()
    # if not user or not verify_password(form_data.password, user.hashed_password):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/users/")
def create_user(users: User, session: SessionDep) -> User:
    users.created_at = datetime.now()
    session.add(users)
    session.commit()
    session.refresh(users)
    return users


@router.get("/users/")
def read_users(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[User]:
    users = session.exec(select(User).offset(offset).limit(limit)).all()
    return users


@router.get("/user/{user_id}")
def read_user(user_id: int, session: SessionDep) -> User:
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="user not found")
    return user


@router.delete("/user/{user_id}")
def delete_user(user_id: int, session: SessionDep):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="user not found")


@router.get("/produtos")
def list_all_produtos(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Product]:
    products = session.exec(select(Product).offset(offset).limit(limit)).all()
    return products


@router.post("/produtos")
def create_produto(products: Product, session: SessionDep) -> Product:
    session.add(products)
    session.commit()
    session.refresh(products)
    return products


@router.get("/produtos/{product_id}")
def list_produto(product_id: int, session: SessionDep) -> Product:
    produto = session.get(Product, product_id)
    if not produto:
        raise HTTPException(status_code=404, detail="produto not found")
    return produto


@router.delete("/pedidos/{product_id}")
def delete_produto(product_id: int, session: SessionDep):
    produto = session.get(Order, product_id)
    if not produto:
        raise HTTPException(status_code=404, detail="user not found")


@router.get("/pedidos")
def list_all_pedidos(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Order]:
    orders = session.exec(select(Order).offset(offset).limit(limit)).all()
    return orders


@router.post("/pedidos")
def create_order(orders: Order, session: SessionDep) -> Order:
    session.add(orders)
    session.commit()
    session.refresh(orders)
    return orders


@router.get("/pedidos/{order_id}")
def list_pedido(order_id: int, session: SessionDep) -> Order:
    pedido = session.get(User, order_id)
    if not pedido:
        raise HTTPException(status_code=404, detail="pedido not found")
    return pedido


@router.delete("/pedidos/{order_id}")
def delete_pedido(order_id: int, session: SessionDep):
    pedido = session.get(Order, order_id)
    if not pedido:
        raise HTTPException(status_code=404, detail="pedido not found")
