import { db, collection, addDoc } from "./firebase.js";
import { obtenerReceta, obtenerIngredientes, actualizarStock } from "./inventario.js";

export async function venderProducto(productoId, cantidadVenta) {

  const recetaDocs = await obtenerReceta(productoId);
  const ingredientesSnapshot = await obtenerIngredientes();

  for (let receta of recetaDocs) {

    const { ingredienteId, cantidad } = receta.data();

    const ingredienteDoc = ingredientesSnapshot.docs.find(d => d.id === ingredienteId);

    if (!ingredienteDoc) continue;

    const stockActual = ingredienteDoc.data().stock;

    const descuento = cantidad * cantidadVenta;
    const nuevoStock = stockActual - descuento;

    if (nuevoStock < 0) {
      alert("Stock insuficiente de " + ingredienteDoc.data().nombre);
      return;
    }

    await actualizarStock(ingredienteId, nuevoStock);
  }

  await addDoc(collection(db, "ventas"), {
    productoId,
    cantidad: cantidadVenta,
    fecha: new Date()
  });

  alert("Venta realizada y stock actualizado 🔥");
}
