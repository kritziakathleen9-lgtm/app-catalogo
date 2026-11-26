
# 🍴 Entre Sabores

### Dos culturas, infinitos sabores

Entre Sabores es un recetario digital dedicado a la gastronomía española y peruana. Permite explorar, buscar, añadir, editar y eliminar recetas mediante una interfaz intuitiva conectada a una API REST propia y una base de datos PostgreSQL.

Proyecto educativo Full Stack desarrollado en equipo.

## 🌐 Aplicación en producción

La aplicación está desplegada en Render y permite acceder a sus funcionalidades sin necesidad de realizar una instalación local.

| Servicio | Enlace |
|---|---|
| Frontend | [Entre Sabores](https://app-catalogo-rx85.onrender.com) |
| Backend | [API REST](https://entre-sabores-api.onrender.com) |
| Documentación | [Swagger UI](https://entre-sabores-api.onrender.com/docs) |
| Repositorio | [GitHub](https://github.com/kritziakathleen9-lgtm/app-catalogo) |

> El backend está alojado en Render. Si el servicio está inactivo, la primera petición puede tardar unos segundos adicionales.

## 🎯 Objetivo

Desarrollar una aplicación web funcional que integre frontend, backend y base de datos, aplicando los conocimientos adquiridos sobre React, Python, FastAPI, SQL y consumo de APIs REST.

Además, el proyecto busca acercar la gastronomía española y peruana a los usuarios mediante una experiencia digital accesible, intuitiva y visualmente atractiva.

## ✨ Funcionalidades

- Visualización de recetas españolas y peruanas.
- Búsqueda de recetas por nombre.
- Filtrado por país.
- Consulta detallada de recetas.
- Creación, edición y eliminación de recetas.
- Validación de formularios.
- Almacenamiento persistente en PostgreSQL.
- Gestión de imágenes mediante URLs.
- Imagen predeterminada para recetas sin fotografía.
- Formulario de contacto conectado a la base de datos.
- Mensajes de confirmación y gestión de errores.
- Confirmación antes de eliminar una receta.
- Mensaje informativo cuando no existen resultados.
- Navegación entre páginas.
- Diseño responsive.
- Favicon personalizado.
- Centro legal y privacidad.

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

### Diseño y herramientas de desarrollo

- Visual Studio Code
- Google Stitch
- Git
- GitHub
- Swagger UI
- Postman

### Despliegue

- Render Web Service — Backend.
- Render Static Site — Frontend.
- Supabase — Base de datos PostgreSQL.

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
              USUARIO
                 │
                 ▼
        FRONTEND — React
         Render Static Site
                 │
       Peticiones HTTP / JSON
                 │
                 ▼
        BACKEND — FastAPI
         Render Web Service
                 │
           Psycopg / SQL
                 │
                 ▼
     BASE DE DATOS — PostgreSQL
              Supabase
```

El frontend consume una API REST desarrollada con FastAPI mediante peticiones HTTP.

El backend recibe las solicitudes, valida los datos mediante Pydantic y ejecuta las consultas SQL utilizando Psycopg.

Supabase proporciona la base de datos PostgreSQL, permitiendo almacenar los datos de forma persistente.

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
| tiempo_minutos | Tiempo de preparación en minutos |
| imagen_url | URL de la fotografía |

La tabla contiene más de seis recetas de la gastronomía española y peruana.

El campo `tiempo_minutos` permite almacenar un valor numérico y el identificador se genera automáticamente.

### Tabla contactos

| Campo | Descripción |
|---|---|
| id | Identificador automático |
| nombre | Nombre del visitante |
| correo | Correo electrónico |
| mensaje | Contenido del mensaje |
| fecha | Fecha de envío |

Esta tabla permite almacenar los mensajes enviados desde el formulario de contacto.

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

### Operaciones CRUD

| Operación | Método HTTP | Funcionalidad |
|---|---|---|
| Create | POST | Crear recetas |
| Read | GET | Consultar recetas |
| Update | PUT | Editar recetas |
| Delete | DELETE | Eliminar recetas |

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

### Ejemplo de error 404

Al consultar, editar o eliminar una receta cuyo ID no existe, la API devuelve el código HTTP 404.

```json
{
  "detail": "Receta no encontrada"
}
```

### Ejemplo de mensaje de contacto

**POST /contactos**

```json
{
  "nombre": "Usuario de prueba",
  "correo": "prueba@example.com",
  "mensaje": "Me encantan las recetas de Entre Sabores."
}
```

El formulario almacena los mensajes en la base de datos. Actualmente no realiza envíos de correo electrónico.

## 🚀 Instalación y ejecución local

### Requisitos previos

- Python 3.14.
- Node.js y npm.
- Git.
- Una base de datos PostgreSQL configurada en Supabase.

### 1. Clonar el repositorio

```bash
git clone https://github.com/kritziakathleen9-lgtm/app-catalogo.git
cd app-catalogo
git switch main
```

### 2. Configurar el backend

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

### 3. Configurar las variables de entorno

Crear un archivo `.env` dentro de la carpeta `backend`, utilizando `.env.example` como referencia.

```env
DATABASE_URL=tu_cadena_de_conexion_postgresql
```

Es necesario disponer de una base de datos PostgreSQL con las tablas `recetas` y `contactos` configuradas.

El archivo `.env` contiene información privada y no debe subirse a GitHub.

### 4. Ejecutar el backend

```bash
python -m uvicorn main:app --reload
```

API local:

http://127.0.0.1:8000

Documentación Swagger:

http://127.0.0.1:8000/docs

### 5. Configurar el frontend

Abrir una segunda terminal desde la raíz del proyecto:

```bash
cd frontend
npm install
```

Crear un archivo `.env` dentro de la carpeta `frontend`.

Para utilizar el backend local:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Para utilizar el backend publicado en Render:

```env
VITE_API_URL=https://entre-sabores-api.onrender.com
```

### 6. Ejecutar el frontend

```bash
npm run dev
```

Aplicación disponible normalmente en:

http://localhost:5173

## ☁️ Despliegue en Render

El frontend y el backend están desplegados como servicios independientes dentro del mismo proyecto de Render.

### Backend

- Tipo de servicio: Web Service.
- Rama: `main`.
- Directorio raíz: `backend`.
- Variable de entorno: `DATABASE_URL`.

### Frontend

- Tipo de servicio: Static Site.
- Rama: `main`.
- Directorio raíz: `frontend`.
- Build Command:

```bash
npm install && npm run build
```

- Publish Directory: `dist`.
- Variable de entorno:

```env
VITE_API_URL=https://entre-sabores-api.onrender.com
```

### Configuración de React Router

Para permitir el acceso directo a las rutas internas y evitar errores al recargar la página, se ha configurado la siguiente regla en Render:

| Source | Destination | Action |
|---|---|---|
| `/*` | `/index.html` | Rewrite |

También se ha configurado CORS en el backend para permitir la comunicación con el frontend publicado.

## 🎨 Diseño e identidad visual

Entre Sabores utiliza una estética cálida y elegante inspirada en la cocina tradicional española y peruana.

### Paleta de colores

| Color | Código |
|---|---|
| Crema | `#f8f4ec` |
| Terracota | `#a65236` |
| Verde | `#394a36` |
| Café oscuro | `#2d2925` |

### Tipografías

- Playfair Display: títulos y elementos destacados.
- DM Sans: textos, navegación y formularios.

### Características visuales

- Fotografías gastronómicas.
- Iconografía minimalista.
- Tarjetas de recetas.
- Hero panorámico.
- Navegación intuitiva.
- Diseño adaptable a ordenadores, tablets y móviles.

El diseño inicial se realizó utilizando Google Stitch y posteriormente se adaptó e integró con React.

## 🔒 Seguridad y buenas prácticas

- Variables de entorno para proteger las credenciales.
- Archivos `.env` excluidos mediante `.gitignore`.
- Consultas SQL parametrizadas.
- Validación de datos mediante Pydantic.
- Configuración CORS.
- Gestión de errores HTTP.
- Confirmación antes de eliminar recetas.
- Row Level Security en la tabla de contactos.
- Separación entre frontend y backend.

La aplicación tiene una finalidad académica. Actualmente, las operaciones de gestión de recetas no requieren autenticación de usuarios.

Para un entorno comercial sería necesario incorporar autenticación, autorización, protección frente a usos indebidos y completar la revisión de privacidad.

## 🧪 Pruebas realizadas

Se han realizado pruebas de los endpoints de la API mediante Postman y Swagger UI, además de pruebas funcionales desde la aplicación publicada en Render.

Estas comprobaciones han permitido verificar las operaciones CRUD, la gestión de errores HTTP, la persistencia de los datos y la comunicación entre el frontend, el backend y la base de datos.


| Prueba | Resultado |
|---|---|
| Consultar catálogo de recetas | Correcto |
| Consultar detalle de una receta | Correcto |
| Crear una receta | Correcto |
| Editar una receta | Correcto |
| Eliminar una receta | Correcto |
| Buscar recetas por nombre | Correcto |
| Filtrar recetas por país | Correcto |
| Búsqueda sin resultados | Correcto |
| Formulario de contacto | Correcto |
| Almacenamiento de contactos en Supabase | Correcto |
| GET con ID inexistente | 404 |
| PUT con ID inexistente | 404 |
| DELETE con ID inexistente | 404 |
| Comunicación frontend y backend | Correcto |
| Navegación y recarga de rutas | Correcto |
| Diseño responsive | Correcto |

Las pruebas de creación, edición y eliminación se realizaron utilizando una receta temporal para evitar modificar los datos originales.

## 🌿 Organización de ramas

| Rama | Función |
|---|---|
| main | Versión estable y publicada |
| dev | Integración y desarrollo |
| feat-kritzia | Desarrollo individual |
| feat-paula | Desarrollo individual |

El proyecto se ha desarrollado de manera colaborativa utilizando Git y GitHub para gestionar las versiones e integrar los cambios.

## 👩‍💻 Autoras

### Kritzia

- Diseño e identidad visual del proyecto.
- Creación del prototipo mediante Google Stitch.
- Desarrollo y adaptación del frontend con React.
- Integración del frontend con la API REST.
- Diseño responsive para distintos dispositivos.
- Configuración y despliegue del frontend y backend en Render.
- Pruebas funcionales de la aplicación en producción.
- Elaboración y actualización de la documentación.

### Paula

- Creación y configuración de la base de datos en Supabase.
- Desarrollo de funcionalidades del backend con FastAPI.
- Implementación de las operaciones CRUD.
- Integración de la API con PostgreSQL.
- Pruebas de los endpoints mediante Postman.
- Comprobación del funcionamiento de la API.

### Trabajo colaborativo

- Definición del proyecto y su temática.
- Planificación y organización de tareas.
- Selección de recetas españolas y peruanas.
- Integración del frontend, backend y base de datos.
- Control de versiones mediante Git y GitHub.
- Revisión del funcionamiento de la aplicación.
- Preparación de la presentación y entrega final.

## 📚 Aprendizajes

Durante el desarrollo de Entre Sabores hemos aplicado conocimientos relacionados con:

- Desarrollo de aplicaciones Full Stack.
- Creación y consumo de APIs REST.
- Operaciones CRUD.
- Gestión de bases de datos relacionales.
- Validación de datos.
- Diseño de interfaces responsive.
- Control de versiones con Git.
- Trabajo colaborativo.
- Despliegue de aplicaciones web.

## 📌 Estado del proyecto

**Implementado, desplegado y probado en producción.**

Las funcionalidades principales del catálogo de recetas y el formulario de contacto están operativas.

El frontend y el backend están publicados en Render y conectados a la base de datos PostgreSQL de Supabase.

Proyecto desarrollado con fines educativos como parte de nuestra formación en desarrollo web Full Stack.

---

**Entre Sabores — Dos culturas, infinitos sabores.**

© 2026 Entre Sabores · Proyecto educativo.
