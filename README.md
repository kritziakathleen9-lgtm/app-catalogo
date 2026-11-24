# 🍴 Entre Sabores

### Dos culturas, infinitos sabores

Entre Sabores es un recetario digital dedicado a la gastronomía española y peruana. Permite explorar, buscar, añadir, editar y eliminar recetas mediante una interfaz intuitiva conectada a una API REST propia y una base de datos PostgreSQL.

Proyecto educativo Full Stack desarrollado en equipo.

## 🎯 Objetivo

Desarrollar una aplicación web funcional que integre frontend, backend y base de datos, aplicando los conocimientos adquiridos sobre React, Python, FastAPI, SQL y consumo de APIs REST.

## ✨ Funcionalidades

- Visualización de recetas españolas y peruanas.
- Búsqueda de recetas por nombre.
- Filtrado por país.
- Consulta detallada de recetas.
- Creación, edición y eliminación de recetas.
- Validación de formularios.
- Almacenamiento persistente en PostgreSQL.
- Gestión de imágenes mediante URLs.
- Formulario de contacto conectado a la base de datos.
- Mensajes de confirmación y gestión de errores.
- Navegación entre páginas.
- Diseño responsive.
- Favicon personalizado.

## 🛠️ Tecnologías utilizadas

### Frontend

- HTML5
- CSS3
- JavaScript
- React
- React Router DOM
- Vite
- Lucide React

### Backend

- Python
- FastAPI
- Pydantic
- Psycopg
- Uvicorn
- Python-dotenv

### Base de datos

- PostgreSQL
- Supabase
- Supabase Storage

### Herramientas

- Visual Studio Code
- Stitch
- Git
- GitHub
- Swagger

## 📂 Estructura del proyecto

```text
app-catalogo/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   └── favicon.png
│   ├── src/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── imagenes.js
│   │   ├── main.jsx
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

## 🏗️ Arquitectura

```text
Usuario
   │
   ▼
React — Frontend
   │
   │ Peticiones HTTP / JSON
   ▼
FastAPI — Backend
   │
   │ Psycopg / SQL
   ▼
PostgreSQL — Supabase
```

El frontend consume una API REST desarrollada con FastAPI. El backend gestiona las operaciones y la comunicación con la base de datos PostgreSQL.

Las fotografías pueden almacenarse en Supabase Storage y mostrarse mediante sus URLs públicas.

## 🗄️ Base de datos

### Tabla recetas

| Campo | Descripción |
|---|---|
| id | Identificador automático |
| nombre | Nombre de la receta |
| pais | País de origen |
| categoria | Tipo de plato |
| ingredientes | Ingredientes necesarios |
| preparacion | Instrucciones de preparación |
| tiempo_minutos | Tiempo de preparación |
| imagen_url | URL de la fotografía |

### Tabla contactos

| Campo | Descripción |
|---|---|
| id | Identificador automático |
| nombre | Nombre del visitante |
| correo | Correo electrónico |
| mensaje | Contenido del mensaje |
| fecha | Fecha de envío |

## 🔌 Endpoints de la API

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/` | Bienvenida a la API |
| GET | `/recetas` | Obtener todas las recetas |
| GET | `/recetas/{id}` | Obtener una receta por ID |
| POST | `/recetas` | Crear una receta |
| PUT | `/recetas/{id}` | Actualizar una receta |
| DELETE | `/recetas/{id}` | Eliminar una receta |
| POST | `/contactos` | Registrar un mensaje de contacto |

### Códigos de respuesta HTTP

| Código | Descripción |
|---|---|
| 200 | Operación realizada correctamente |
| 201 | Registro creado correctamente |
| 404 | Recurso no encontrado |
| 422 | Error de validación |

### Ejemplo de creación de una receta

**POST /recetas**

```json
{
  "nombre": "Ceviche clásico",
  "pais": "Perú",
  "categoria": "Entrante",
  "ingredientes": "Pescado, lima, cebolla roja, ají y cilantro",
  "preparacion": "Cortar el pescado y marinarlo con zumo de lima.",
  "tiempo_minutos": 25,
  "imagen_url": null
}
```

### Ejemplo de mensaje de contacto

**POST /contactos**

```json
{
  "nombre": "María García",
  "correo": "maria@example.com",
  "mensaje": "Me encantan las recetas de Entre Sabores."
}
```

El formulario almacena los mensajes en la base de datos. Actualmente no realiza envíos de correo electrónico.

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/kritziakathleen9-lgtm/app-catalogo.git
cd app-catalogo
```

### 2. Acceder a la rama de desarrollo

```bash
git switch dev
```

### 3. Configurar el backend

```bash
cd backend
python -m venv .venv
```

Activar el entorno virtual en Windows utilizando Git Bash:

```bash
source .venv/Scripts/activate
```

Instalar las dependencias:

```bash
python -m pip install -r requirements.txt
```

### 4. Configurar las variables de entorno

Crear un archivo `.env` dentro de la carpeta `backend`, utilizando `.env.example` como referencia.

```env
DATABASE_URL=tu_cadena_de_conexion_postgresql
```

Es necesario disponer de una base de datos PostgreSQL en Supabase con las tablas `recetas` y `contactos` configuradas.

El archivo `.env` contiene información privada y no debe subirse a GitHub.

### 5. Ejecutar el backend

```bash
python -m uvicorn main:app --reload
```

API disponible en:

http://127.0.0.1:8000

Documentación interactiva de Swagger:

http://127.0.0.1:8000/docs

### 6. Configurar el frontend

Abrir una segunda terminal desde la raíz del proyecto:

```bash
cd frontend
npm install
```

### 7. Ejecutar el frontend

```bash
npm run dev
```

Aplicación disponible normalmente en:

http://localhost:5173

Para utilizar una API diferente a la local, configurar la variable de entorno del frontend:

```env
VITE_API_URL=https://url-de-la-api
```

## 🎨 Diseño e identidad visual

Entre Sabores utiliza una estética cálida y elegante inspirada en la cocina tradicional española y peruana.

- Tonos crema, terracota y verde.
- Tipografía Playfair Display.
- Tipografía DM Sans.
- Fotografías gastronómicas.
- Iconografía minimalista.
- Diseño adaptable a distintos dispositivos.

## 🔒 Seguridad y buenas prácticas

- Variables de entorno para proteger las credenciales.
- Consultas SQL parametrizadas.
- Validación de datos mediante Pydantic.
- Configuración CORS.
- Gestión de errores HTTP.
- Confirmación antes de eliminar recetas.
- Row Level Security en la tabla de contactos.
- Separación entre frontend y backend.

## 🌿 Organización de ramas

| Rama | Función |
|---|---|
| main | Versión estable |
| dev | Integración y desarrollo |
| feat-kritzia | Desarrollo individual |
| feat-paula | Desarrollo individual |

## 👩‍💻 Autoras

- Kritzia
- Paula

Proyecto desarrollado de manera colaborativa como parte de nuestra formación en desarrollo web Full Stack.

## 📌 Estado del proyecto

En desarrollo.

El CRUD de recetas y el formulario de contacto están implementados. Quedan pendientes las comprobaciones finales, la documentación complementaria, la revisión de seguridad y el despliegue de la aplicación.

---

**Entre Sabores — Dos culturas, infinitos sabores.**

© 2026 Entre Sabores · Proyecto educativo.