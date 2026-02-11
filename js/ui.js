import {
  agregarIngrediente,
  agregarProducto,
  agregarReceta,
  obtenerIngredientes
} from "./inventario.js";

import { venderProducto } from "./ventas.js";
import { db, collection, getDocs } from "./firebase.js";

window.crearIngrediente = async function() {
  await agregarIngrediente(
    ingNombre.value,
    ingStock.value,
    ingUnidad.value
  );
  cargarIngredientes();
};

window.crearProducto = async function() {
  await agregarProducto(prodNombre.value, prodPrecio.value);
  cargarProductos();
};

window.crearReceta = async function() {
  await agregarReceta(
    recProducto.value,
    recIngrediente.value,
    recCantidad.value
  );
  alert("Receta agregada");
};

window.vender = async function() {
  await venderProducto(
    ventaProducto.value,
    Number(ventaCantidad.value)
  );
  cargarAlmacen();
};

async function cargarIngredientes() {
  const snap = await getDocs(collection(db, "ingredientes"));
  tablaIngredientes.innerHTML = "";
  tablaAlmacen.innerHTML = "";
  recIngrediente.innerHTML = "";

  snap.forEach(doc => {
    const d = doc.data();
    tablaIngredientes.innerHTML += `<tr><td>${d.nombre}</td><td>${d.stock}</td><td>${d.unidad}</td></tr>`;
    tablaAlmacen.innerHTML += `<tr><td>${d.nombre}</td><td>${d.stock}</td></tr>`;
    recIngrediente.innerHTML += `<option value="${doc.id}">${d.nombre}</option>`;
  });
}

async function cargarProductos() {
  const snap = await getDocs(collection(db, "productos"));
  tablaProductos.innerHTML = "";
  recProducto.innerHTML = "";
  ventaProducto.innerHTML = "";

  snap.forEach(doc => {
    const d = doc.data();
    tablaProductos.innerHTML += `<tr><td>${d.nombre}</td><td>${d.precio}</td></tr>`;
    recProducto.innerHTML += `<option value="${doc.id}">${d.nombre}</option>`;
    ventaProducto.innerHTML += `<option value="${doc.id}">${d.nombre}</option>`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarIngredientes();
  cargarProductos();
});
