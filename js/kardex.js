import {
addDoc,
getDocs,
getDoc,
updateDoc,
doc,
query,
where,
Timestamp
} from "./firebase.js";

import {
colAlmacenes,
colIngredientes,
colKardex,
colInventario
} from "./app.js";

const almacenSelect = document.getElementById("almacenSelect");
const ingredienteSelect = document.getElementById("ingredienteSelect");
const tipoSelect = document.getElementById("tipoSelect");
const cantidadInput = document.getElementById("cantidadInput");
const guardarBtn = document.getElementById("guardarBtn");
const tabla = document.getElementById("tabla");

/* ========================
   CARGAR ALMACENES
======================== */
async function cargarAlmacenes(){
const snap = await getDocs(colAlmacenes);
almacenSelect.innerHTML = "";

snap.forEach(d=>{
almacenSelect.innerHTML +=
`<option value="${d.id}">${d.data().nombre}</option>`;
});
}

/* ========================
   CARGAR INGREDIENTES
======================== */
async function cargarIngredientes(){
const snap = await getDocs(colIngredientes);
ingredienteSelect.innerHTML = "";

snap.forEach(d=>{
ingredienteSelect.innerHTML +=
`<option value="${d.id}">${d.data().nombre}</option>`;
});
}

/* ========================
   GUARDAR MOVIMIENTO
======================== */
guardarBtn.onclick = async()=>{

const almacenId = almacenSelect.value;
const ingredienteId = ingredienteSelect.value;
const tipo = tipoSelect.value;
const cantidad = Number(cantidadInput.value);

if(!cantidad || cantidad <= 0){
alert("Cantidad inválida");
return;
}

/* Buscar inventario actual */
const invSnap = await getDocs(query(
colInventario,
where("almacenId","==",almacenId),
where("ingredienteId","==",ingredienteId)
));

let stockAnterior = 0;
let inventarioDocId = null;

if(!invSnap.empty){
const invDoc = invSnap.docs[0];
stockAnterior = invDoc.data().stock;
inventarioDocId = invDoc.id;
}

let stockNuevo = stockAnterior;

if(tipo === "ENTRADA"){
stockNuevo = stockAnterior + cantidad;
}

if(tipo === "SALIDA"){
if(stockAnterior < cantidad){
alert("Stock insuficiente");
return;
}
stockNuevo = stockAnterior - cantidad;
}

/* Actualizar inventario */
if(inventarioDocId){
await updateDoc(doc(colInventario,inventarioDocId),{
stock: stockNuevo
});
}else{
await addDoc(colInventario,{
almacenId,
ingredienteId,
stock: stockNuevo
});
}

/* Guardar kardex */
await addDoc(colKardex,{
almacenId,
ingredienteId,
tipo,
cantidad,
stockAnterior,
stockNuevo,
fecha: Timestamp.now()
});

cantidadInput.value = "";
cargarKardex();
};

/* ========================
   MOSTRAR KARDEX
======================== */
async function cargarKardex(){

const almacenId = almacenSelect.value;
const ingredienteId = ingredienteSelect.value;

if(!almacenId || !ingredienteId) return;

const snap = await getDocs(query(
colKardex,
where("almacenId","==",almacenId),
where("ingredienteId","==",ingredienteId)
));

tabla.innerHTML = "";

for(const d of snap.docs){

const data = d.data();

/* Obtener nombre ingrediente */
let nombreIngrediente = data.ingredienteId;
const ingDoc = await getDoc(doc(colIngredientes,data.ingredienteId));
if(ingDoc.exists()){
nombreIngrediente = ingDoc.data().nombre;
}

/* Obtener nombre almacén */
let nombreAlmacen = data.almacenId;
const almDoc = await getDoc(doc(colAlmacenes,data.almacenId));
if(almDoc.exists()){
nombreAlmacen = almDoc.data().nombre;
}

const fecha = data.fecha
? data.fecha.toDate().toLocaleString()
: "";

tabla.innerHTML += `
<tr>
<td>${fecha}</td>
<td>${nombreAlmacen}</td>
<td>${nombreIngrediente}</td>
<td>${data.tipo}</td>
<td>${data.cantidad}</td>
<td>${data.stockAnterior}</td>
<td>${data.stockNuevo}</td>
</tr>`;
}
}

almacenSelect.addEventListener("change",cargarKardex);
ingredienteSelect.addEventListener("change",cargarKardex);

/* INIT */
async function init(){
await cargarAlmacenes();
await cargarIngredientes();
cargarKardex();
}

init();
