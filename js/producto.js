import {
addDoc,
getDocs,
deleteDoc,
doc,
query,
where
} from "./firebase.js";

import {
colProductos,
colIngredientes,
colRecetas
} from "./app.js";

const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const tabla = document.getElementById("tabla");

const productoReceta = document.getElementById("productoReceta");
const ingredienteReceta = document.getElementById("ingredienteReceta");
const cantidadReceta = document.getElementById("cantidadReceta");
const tablaReceta = document.getElementById("tablaReceta");

/* ========================
   CARGAR PRODUCTOS
======================== */
async function cargarProductos(){
const snap = await getDocs(colProductos);
tabla.innerHTML="";
productoReceta.innerHTML="";
snap.forEach(d=>{
tabla.innerHTML+=`
<tr>
<td>${d.data().nombre}</td>
<td>${d.data().precio}</td>
</tr>`;
productoReceta.innerHTML+=`
<option value="${d.id}">${d.data().nombre}</option>`;
});
}

/* ========================
   CARGAR INGREDIENTES
======================== */
async function cargarIngredientes(){
const snap = await getDocs(colIngredientes);
ingredienteReceta.innerHTML="";
snap.forEach(d=>{
ingredienteReceta.innerHTML+=`
<option value="${d.id}">${d.data().nombre}</option>`;
});
}

/* ========================
   GUARDAR PRODUCTO
======================== */
document.getElementById("guardar").onclick = async()=>{
await addDoc(colProductos,{
nombre:nombre.value,
precio:Number(precio.value)
});
nombre.value="";
precio.value="";
cargarProductos();
};

/* ========================
   AGREGAR RECETA
======================== */
document.getElementById("agregarReceta").onclick = async()=>{

await addDoc(colRecetas,{
productoId:productoReceta.value,
ingredienteId:ingredienteReceta.value,
cantidad:Number(cantidadReceta.value)
});

cantidadReceta.value="";
cargarReceta();
};

/* ========================
   CARGAR RECETA
======================== */
async function cargarReceta(){

const snap = await getDocs(query(
colRecetas,
where("productoId","==",productoReceta.value)
));

tablaReceta.innerHTML="";

for(const r of snap.docs){

tablaReceta.innerHTML+=`
<tr>
<td>${r.data().ingredienteId}</td>
<td>${r.data().cantidad}</td>
<td><button onclick="eliminarReceta('${r.id}')">X</button></td>
</tr>`;
}
}

window.eliminarReceta = async(id)=>{
await deleteDoc(doc(colRecetas,id));
cargarReceta();
};

productoReceta.addEventListener("change",cargarReceta);

cargarProductos();
cargarIngredientes();
