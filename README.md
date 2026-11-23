# Entre Sabores — Proyecto organizado

## Estructura
- `backend/`: código original de FastAPI y PostgreSQL; únicamente se añadió CORS para desarrollo local.
- `frontend/`: React + Vite, interfaz responsive basada en el diseño de Stitch.
- `stitch-original/`: HTML exportado de Stitch para comparar y adaptar detalles.

## Ejecutar frontend
```bash
cd frontend
npm install
npm run dev
```
Abrir http://localhost:5173

## Ejecutar backend
En otra terminal:
```bash
cd backend
python -m pip install -r requirements.txt
```
Crea un archivo `.env` dentro de `backend/` con `DATABASE_URL=...` (no lo subas a Git). Después:
```bash
fastapi dev main.py
```

## Estado real de las funcionalidades
- Inicio, navegación, catálogo, filtros, detalle y páginas informativas están implementados en React.
- El catálogo intenta leer `GET /recetas` de FastAPI. Si no conecta, muestra recetas de demostración y un aviso.
- El backend original solo implementa `GET /` y `GET /recetas` y `GET /recetas/{id}`.
- Los formularios de crear/editar, eliminar y contacto son **prototipos visuales**: NO guardan ni borran datos ni envían mensajes. Se deben desarrollar POST/PUT/DELETE y su integración.
- La API original devuelve filas SQL como listas; el frontend tiene un adaptador provisional que supone el orden de columnas `(id,nombre,pais,categoria,ingredientes,preparacion,tiempo_minutos,imagen_url)`. Verifica el esquema real de la tabla `recetas` y cambia ese adaptador si es necesario. Es preferible que FastAPI devuelva objetos JSON.
- Las imágenes de Stitch usan URLs externas de Google y pueden dejar de funcionar; antes de publicar descarga imágenes con permiso de uso y guárdalas en `frontend/public`.
- La página legal es provisional y necesita revisión antes de publicar.
- Este ZIP no contiene `.env` real, credenciales, `.git` ni dependencias instaladas.
