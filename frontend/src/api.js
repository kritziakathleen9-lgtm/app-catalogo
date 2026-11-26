
const BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// GET - Obtener todas las recetas
export async function obtenerRecetas() {
  const r = await fetch(`${BASE}/recetas`);

  if (!r.ok) {
    throw new Error("No se pudieron cargar las recetas");
  }

  return r.json();
}

// GET - Obtener una receta por ID
export async function obtenerReceta(id) {
  const r = await fetch(`${BASE}/recetas/${id}`);

  if (!r.ok) {
    throw new Error("Receta no encontrada");
  }

  return r.json();
}

// POST - Añadir una receta
export async function crearReceta(receta) {
  const r = await fetch(`${BASE}/recetas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(receta),
  });

  if (!r.ok) {
    throw new Error("No se pudo añadir la receta");
  }

  return r.json();
}

// PUT - Editar una receta
export async function editarReceta(id, receta) {
  const r = await fetch(`${BASE}/recetas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(receta),
  });

  if (!r.ok) {
    throw new Error("No se pudo editar la receta");
  }

  return r.json();
}

// DELETE - Eliminar una receta
export async function eliminarReceta(id) {
  const r = await fetch(`${BASE}/recetas/${id}`, {
    method: "DELETE",
  });

  if (!r.ok) {
    throw new Error("No se pudo eliminar la receta");
  }

  return true;
}

export async function enviarContacto(datos) {
  const respuesta = await fetch(`${BASE}/contactos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo enviar el mensaje.");
  }

  return respuesta.json();
}