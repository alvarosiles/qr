import {
addDoc,
getDocs,
query,
where
} from "./firebase.js";

import {
colAlmacenes,
colIngredientes,
colKardex
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
almacenSelect.innerHTML="";

snap.forEach(d=>{
almacenSelect.innerHTML+=`
<option value="${d.id}">${d.data().nombre}</option>`;
});
}

/* ========================
   CARGAR INGREDIENTES
======================== */
async function cargarIngredientes(){
const snap = await getDocs(colIngredientes);
ingredienteSelect.innerHTML="";

snap.forEach(d=>{
ingredienteSelect.innerHTML+=`
<option value="${d.id}">${d.data().nombre}</option>`;
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

if(!cantidad){
alert("Cantidad inválida");
return;
}

await addDoc(colKardex,{
almacenId,
ingredienteId,
tipo,
cantidad
});

cantidadInput.value="";
cargarKardex();
};

/* ========================
   MOSTRAR KARDEX
======================== */
async function cargarKardex(){

const almacenId = almacenSelect.value;
const ingredienteId = ingredienteSelect.value;

const snap = await getDocs(query(
colKardex,
where("almacenId","==",almacenId),
where("ingredienteId","==",ingredienteId)
));

tabla.innerHTML="";

snap.forEach(d=>{
const data = d.data();
tabla.innerHTML+=`
<tr>
<td>${data.tipo}</td>
<td>${data.cantidad}</td>
</tr>`;
});
}

almacenSelect.addEventListener("change",cargarKardex);
ingredienteSelect.addEventListener("change",cargarKardex);

async function init(){
await cargarAlmacenes();
await cargarIngredientes();
cargarKardex();
}

init();
