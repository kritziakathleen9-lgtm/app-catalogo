# 🍽️ Entre Sabores

### Dos culturas, infinitos sabores

Entre Sabores es una aplicación web Full Stack que reúne recetas tradicionales de la gastronomía española y peruana en un mismo catálogo digital.

El proyecto permite descubrir, buscar, filtrar, añadir, editar, eliminar y marcar recetas como favoritas mediante una interfaz intuitiva, responsive y conectada a una base de datos real.

## 🌐 Proyecto desplegado

- [Aplicación web](https://app-catalogo-rx85.onrender.com)
- [API REST](https://entre-sabores-api.onrender.com)
- [Documentación Swagger](https://entre-sabores-api.onrender.com/docs)

## 🎯 Objetivo del proyecto

Desarrollar una aplicación Full Stack funcional, accesible e intuitiva, poniendo en práctica la creación de una API REST propia, la gestión de bases de datos relacionales, el desarrollo frontend y el despliegue en producción.

## 🛠️ Tecnologías utilizadas

### Frontend

- React
- JavaScript
- HTML5
- CSS3
- Vite
- React Router DOM
- Lucide React
- Google Stitch

### Backend

- Python 3.14
- FastAPI
- Pydantic
- Psycopg
- Python-dotenv
- Uvicorn

### Base de datos y herramientas

- Supabase
- PostgreSQL
- Render
- Git y GitHub
- Postman
- Swagger UI
- Visual Studio Code

## ✨ Funcionalidades

- Catálogo de recetas españolas y peruanas.
- Visualización del detalle de cada receta.
- Creación, edición y eliminación de recetas.
- Buscador conectado directamente a la API.
- Filtro por país.
- Sistema de favoritos persistente en la base de datos.
- Formulario de contacto conectado a Supabase.
- Diseño responsive para móviles, tablets y ordenadores.
- Validación de formularios.
- Gestión de errores y estados de carga.
- Aviso legal, política de privacidad, política de cookies y términos y condiciones.

## 🏗️ Arquitectura

La aplicación está organizada en tres capas:

1. **Frontend:** React gestiona la interfaz y realiza peticiones HTTP mediante Fetch.
2. **Backend:** FastAPI recibe las peticiones, valida los datos y ejecuta consultas SQL parametrizadas mediante Psycopg.
3. **Base de datos:** PostgreSQL, alojado en Supabase, almacena las recetas y los mensajes de contacto.

Flujo de comunicación:

**React → FastAPI → Psycopg → Supabase**

Los datos se devuelven al frontend en formato JSON.

## 🗄️ Base de datos

### Tabla recetas

| Campo | Tipo |
|---|---|
| id | Entero autogenerado |
| nombre | Texto |
| pais | Texto |
| categoria | Texto |
| ingredientes | Texto |
| preparacion | Texto |
| tiempo_minutos | Entero |
| imagen_url | Texto opcional |
| favorito | Booleano |

El campo `favorito` tiene como valor predeterminado `false`.

### Tabla contactos

| Campo |
|---|
| id |
| nombre |
| correo |
| mensaje |

Ambas tablas tienen Row Level Security (RLS) activado.

## 🔌 Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | / | Mensaje de bienvenida |
| GET | /recetas | Listar todas las recetas |
| GET | /recetas?q=paella | Buscar recetas por nombre |
| GET | /recetas/{id} | Obtener una receta |
| POST | /recetas | Crear una receta |
| PUT | /recetas/{id} | Editar una receta |
| DELETE | /recetas/{id} | Eliminar una receta |
| PATCH | /recetas/{id}/favorito | Actualizar el estado de favorito |
| POST | /contactos | Guardar un mensaje de contacto |

## 🚀 Funcionalidades adicionales

### Códigos de estado HTTP

- 200 OK: petición realizada correctamente.
- 201 Created: recurso creado correctamente.
- 204 No Content: receta eliminada correctamente sin cuerpo de respuesta.
- 404 Not Found: receta no encontrada.
- 422 Unprocessable Entity: error de validación de datos.

### Validaciones con Pydantic

Se utiliza `Field` para validar los datos recibidos por la API:

- Campos de texto obligatorios y no vacíos.
- Tiempo de preparación mayor que cero.
- Límites de longitud en los campos del formulario de contacto.
- Validación del campo booleano de favoritos.

### Buscador mediante SQL ILIKE

La búsqueda de recetas se realiza directamente en la base de datos mediante el parámetro opcional `q`.

Ejemplo: `/recetas?q=paella`

Se utiliza `ILIKE` para permitir búsquedas parciales sin distinguir entre mayúsculas y minúsculas.

El frontend incorpora una espera de 300 milisegundos antes de realizar la búsqueda para reducir las peticiones innecesarias.

### Sistema de favoritos

Cada receta dispone de un campo booleano que permite marcarla o desmarcarla como favorita mediante una petición PATCH.

Los cambios se almacenan en Supabase y permanecen al actualizar la página.

Al tratarse de una aplicación sin autenticación, los favoritos son compartidos entre los visitantes.

### Configuración de CORS

El backend utiliza la variable de entorno `FRONTEND_URL` para autorizar únicamente el origen del frontend correspondiente a cada entorno.

Se permiten los métodos GET, POST, PUT, DELETE y PATCH.

### Consultas SQL parametrizadas

Las consultas que reciben datos externos utilizan parámetros `%s` para evitar la concatenación directa de valores en las instrucciones SQL y prevenir inyecciones SQL.

## 📁 Estructura del proyecto

```text
app-catalogo/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── imagenes.js
│   │   ├── main.jsx
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── README.md
```

## 💻 Instalación y ejecución local

### 1. Clonar el repositorio

Clonar el repositorio desde GitHub y acceder a la carpeta `app-catalogo`.

### 2. Configurar el backend

```bash
cd backend
python -m venv .venv
```

Activar el entorno virtual en Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Instalar las dependencias:

```bash
python -m pip install -r requirements.txt
```

Crear un archivo `.env` dentro de `backend` tomando como referencia `.env.example`:

```env
DATABASE_URL=tu_url_de_conexion_a_supabase
FRONTEND_URL=http://localhost:5173
```

Iniciar el servidor:

```bash
python -m uvicorn main:app --reload
```

- API local: http://127.0.0.1:8000
- Swagger: http://127.0.0.1:8000/docs

### 3. Configurar el frontend

Desde otra terminal:

```bash
cd frontend
npm install
```

Crear un archivo `.env` dentro de `frontend`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Iniciar el frontend:

```bash
npm run dev
```

Aplicación local: http://localhost:5173

## ☁️ Despliegue

La aplicación utiliza Render para alojar sus dos servicios:

- **Backend:** Web Service con FastAPI.
- **Frontend:** Static Site generado con Vite.
- **Base de datos:** PostgreSQL alojado en Supabase.

Las variables de entorno se configuran directamente en Render, sin publicar las credenciales de la base de datos en GitHub.

El frontend utiliza una regla Rewrite hacia `index.html` para permitir la navegación y recarga de las rutas de React Router.

## 🧪 Pruebas realizadas

- Conexión entre frontend, backend y Supabase.
- Operaciones CRUD completas.
- Validaciones de datos mediante Pydantic.
- Respuestas 201, 204, 404 y 422.
- Búsquedas parciales y en mayúsculas y minúsculas.
- Búsquedas sin resultados.
- Filtros por país.
- Comprobación de peticiones mediante Network.
- Marcado y desmarcado de favoritos.
- Persistencia de favoritos en Supabase.
- Comprobación de orígenes autorizados y no autorizados mediante CORS.
- Envío y almacenamiento de mensajes de contacto.
- Adaptación a diferentes tamaños de pantalla.

Las funcionalidades adicionales se han comprobado en el entorno local.

## 🎨 Diseño e identidad visual

La identidad visual está inspirada en la gastronomía tradicional española y peruana, utilizando una estética cálida, elegante y minimalista.

### Paleta de colores

| Color | Código |
|---|---|
| Crema | #F8F4EC |
| Terracota | #A65236 |
| Café oscuro | #2D2925 |
| Verde oliva | #394A36 |

### Tipografías

- Playfair Display
- DM Sans

## 👥 Equipo de desarrollo

### Kritzia — Frontend e integración

- Diseño de la interfaz e identidad visual mediante Google Stitch.
- Desarrollo y personalización del frontend con React, JavaScript y CSS.
- Implementación de la navegación mediante React Router DOM.
- Adaptación responsive para diferentes dispositivos.
- Desarrollo de interfaces y formularios para la gestión de recetas.
- Integración del frontend con la API REST mediante Fetch.
- Gestión de estados, errores y peticiones HTTP.
- Configuración y despliegue de la aplicación en Render.

### Paula — Backend y base de datos

- Creación y configuración de la base de datos en Supabase.
- Diseño y estructuración de las tablas y sus campos.
- Desarrollo de funcionalidades del backend con FastAPI.
- Implementación de las operaciones CRUD.
- Integración de la API con PostgreSQL mediante Psycopg.
- Pruebas y comprobación de los endpoints mediante Postman.
- Gestión de la persistencia de los datos.
- Comprobación del funcionamiento de la API REST.

### Trabajo colaborativo

- Definición de la temática, objetivos y funcionalidades del proyecto.
- Selección y organización del contenido gastronómico.
- Integración del frontend, backend y base de datos.
- Incorporación de funcionalidades adicionales: buscador, favoritos, validaciones y códigos de estado HTTP.
- Configuración de seguridad, CORS y variables de entorno.
- Gestión de ramas y control de versiones mediante Git y GitHub.
- Pruebas funcionales, resolución de errores y mejoras de la aplicación.
- Elaboración de la documentación técnica.
- Preparación de la presentación y demostración final del proyecto.

## 🌿 Gestión de ramas

- `main`: versión estable del proyecto.
- `dev`: rama de integración y desarrollo.
- `feat-kritzia`: desarrollo individual.
- `feat-paula`: desarrollo individual.

## 📚 Aprendizajes

Durante el desarrollo del proyecto hemos puesto en práctica:

- Desarrollo de aplicaciones Full Stack.
- Creación y consumo de APIs REST.
- Gestión de bases de datos relacionales.
- Consultas SQL parametrizadas.
- Validaciones mediante Pydantic.
- Gestión de estados y efectos en React.
- Configuración de CORS y variables de entorno.
- Trabajo colaborativo mediante Git y GitHub.
- Despliegue de aplicaciones web en producción.

---

Proyecto académico · 2026

**Entre Sabores — Dos culturas, infinitos sabores.**