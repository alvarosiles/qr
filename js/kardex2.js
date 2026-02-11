import {
getDocs,
query,
where
} from "./firebase.js";

import {
colAlmacenes,
colKardex,
colIngredientes
} from "./app.js";

const almacenFiltro = document.getElementById("almacenFiltro");
const tabla = document.getElementById("tabla");

/* ========================
   CARGAR ALMACENES
======================== */
async function cargarAlmacenes(){

const snap = await getDocs(colAlmacenes);

almacenFiltro.innerHTML="";

snap.forEach(d=>{
almacenFiltro.innerHTML+=`
<option value="${d.id}">${d.data().nombre}</option>`;
});

if(snap.size > 0){
cargarKardex();
}
}

/* ========================
   CARGAR KARDEX
======================== */
async function cargarKardex(){

const almacenId = almacenFiltro.value;

const snap = await getDocs(query(
colKardex,
where("almacenId","==",almacenId)
));

tabla.innerHTML="";

for(const k of snap.docs){

const data = k.data();

/* Obtener nombre ingrediente */
let nombreIngrediente = data.ingredienteId;

const ingSnap = await getDocs(query(
colIngredientes,
where("__name__","==",data.ingredienteId)
));

if(!ingSnap.empty){
nombreIngrediente = ingSnap.docs[0].data().nombre;
}

/* Formatear fecha */
let fecha = "";
if(data.fecha){
fecha = new Date(data.fecha.seconds*1000).toLocaleString();
}

/* Clase tipo */
let claseTipo = "tipo-" + data.tipo;

tabla.innerHTML+=`
<tr>
<td>${fecha}</td>
<td>${nombreIngrediente}</td>
<td class="${claseTipo}">${data.tipo}</td>
<td>${data.cantidad}</td>
<td>${data.stockAnterior}</td>
<td>${data.stockNuevo}</td>
</tr>`;
}
}

almacenFiltro.addEventListener("change",cargarKardex);

cargarAlmacenes();
