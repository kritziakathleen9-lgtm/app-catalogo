import os
import psycopg
from psycopg.rows import dict_row
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pathlib import Path

load_dotenv(Path(__file__).resolve().parent / ".env")

app = FastAPI(title="Entre Sabores - API de Recetas")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://app-catalogo-rx85.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Receta(BaseModel):
    nombre: str
    pais: str
    categoria: str
    ingredientes: str
    preparacion: str
    tiempo_minutos: int
    imagen_url: str | None = None


class Contacto(BaseModel):
    nombre: str = Field(min_length=2, max_length=100)
    correo: str = Field(min_length=5, max_length=254)
    mensaje: str = Field(min_length=1, max_length=2000)

@app.get("/")
def inicio():
    return {"mensaje": "Bienvenido a Entre Sabores"}


def conectar_db():
    return psycopg.connect(
        os.getenv("DATABASE_URL"),
        row_factory=dict_row
    )


@app.get("/recetas")
def listar_recetas():
    with conectar_db() as conexion:
        with conexion.cursor() as cursor:
            cursor.execute("SELECT * FROM recetas")
            recetas = cursor.fetchall()

    return recetas

@app.post("/recetas", status_code=201)
def agregar_receta(receta: Receta):
    with conectar_db() as conexion:
        with conexion.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO recetas (
                    nombre,
                    pais,
                    categoria,
                    ingredientes,
                    preparacion,
                    tiempo_minutos,
                    imagen_url
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id
                """,
                (
                    receta.nombre,
                    receta.pais,
                    receta.categoria,
                    receta.ingredientes,
                    receta.preparacion,
                    receta.tiempo_minutos,
                    receta.imagen_url
                )
            )

            nuevo_id = cursor.fetchone()["id"]

    return {
        "mensaje": "Receta agregada correctamente",
        "id": nuevo_id
    }

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

@app.put("/recetas/{id}")
def editar_receta(id: int, receta: Receta):
    with conectar_db() as conexion:
        with conexion.cursor() as cursor:
            cursor.execute(
                """
                UPDATE recetas
                SET nombre = %s,
                    pais = %s,
                    categoria = %s,
                    ingredientes = %s,
                    preparacion = %s,
                    tiempo_minutos = %s,
                    imagen_url = %s
                WHERE id = %s
                RETURNING id
                """,
                (
                    receta.nombre,
                    receta.pais,
                    receta.categoria,
                    receta.ingredientes,
                    receta.preparacion,
                    receta.tiempo_minutos,
                    receta.imagen_url,
                    id
                )
            )
            resultado = cursor.fetchone()

    if resultado is None:
        raise HTTPException(
            status_code=404,
            detail="Receta no encontrada"
        )

    return {"mensaje": "Receta actualizada correctamente"}

@app.delete("/recetas/{id}")
def eliminar_receta(id: int):
    with conectar_db() as conexion:
        with conexion.cursor() as cursor:
            cursor.execute(
                "DELETE FROM recetas WHERE id = %s RETURNING id",
                (id,)
            )
            resultado = cursor.fetchone()

    if resultado is None:
        raise HTTPException(
            status_code=404,
            detail="Receta no encontrada"
        )

    return {"mensaje": "Receta eliminada correctamente"}



@app.post("/contactos", status_code=201)
def enviar_contacto(contacto: Contacto):
    with conectar_db() as conexion:
        with conexion.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO contactos (
                    nombre,
                    correo,
                    mensaje
                )
                VALUES (%s, %s, %s)
                RETURNING id
                """,
                (
                    contacto.nombre,
                    contacto.correo,
                    contacto.mensaje
                )
            )

            nuevo_id = cursor.fetchone()["id"]

    return {
        "mensaje": "Mensaje enviado correctamente",
        "id": nuevo_id
    }
