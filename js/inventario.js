import { db, collection, addDoc, getDocs, updateDoc, doc } from "./firebase.js";

export async function agregarIngrediente(nombre, stock, unidad) {
  await addDoc(collection(db, "ingredientes"), {
    nombre,
    stock: Number(stock),
    unidad
  });
}

export async function agregarProducto(nombre, precio) {
  await addDoc(collection(db, "productos"), {
    nombre,
    precio: Number(precio)
  });
}

export async function agregarReceta(productoId, ingredienteId, cantidad) {
  await addDoc(collection(db, "recetas"), {
    productoId,
    ingredienteId,
    cantidad: Number(cantidad)
  });
}

export async function obtenerReceta(productoId) {
  const snapshot = await getDocs(collection(db, "recetas"));
  return snapshot.docs.filter(d => d.data().productoId === productoId);
}

export async function actualizarStock(ingredienteId, nuevoStock) {
  await updateDoc(doc(db, "ingredientes", ingredienteId), {
    stock: nuevoStock
  });
}

export async function obtenerIngredientes() {
  return await getDocs(collection(db, "ingredientes"));
}
