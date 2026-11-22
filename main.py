import os
import psycopg
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

load_dotenv()

app = FastAPI(title="Entre Sabores - API de Recetas")


class Receta(BaseModel):
    nombre: str
    pais: str
    categoria: str
    ingredientes: str
    preparacion: str
    tiempo_minutos: int
    imagen_url: str | None = None

@app.get("/")
def inicio():
    return {"mensaje": "Bienvenido a Entre Sabores"}


def conectar_db():
    return psycopg.connect(os.getenv("DATABASE_URL"))


@app.get("/recetas")
def listar_recetas():
    with conectar_db() as conexion:
        with conexion.cursor() as cursor:
            cursor.execute("SELECT * FROM recetas")
            recetas = cursor.fetchall()

    return recetas

@app.get("/recetas/{id}")
def buscar_receta(id: int):
    with conectar_db() as conexion:
        with conexion.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM recetas WHERE id = %s",
                (id,)
            )
            receta = cursor.fetchone()

    if receta is None:
        raise HTTPException(
            status_code=404,
            detail="Receta no encontrada"
        )

    return receta
