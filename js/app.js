import { db, collection } from "./firebase.js";

export const colAlmacenes = collection(db,"almacenes");
export const colIngredientes = collection(db,"ingredientes");
export const colInventario = collection(db,"inventario");
export const colProductos = collection(db,"productos");
export const colRecetas = collection(db,"recetas");
export const colVentas = collection(db,"ventas");
export const colKardex = collection(db,"kardex");
export const colKardex2 = collection(db,"kardex");
