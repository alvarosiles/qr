import {
addDoc,
getDocs,
updateDoc,
doc,
query,
where
} from "./firebase.js";

import {
colAlmacenes,
colInventario,
colIngredientes
} from "./app.js";

const almacenSelect = document.getElementById("almacenSelect");
const ingredienteSelect = document.getElementById("ingredienteSelect");
const stockInput = document.getElementById("stockInput");
const guardarStockBtn = document.getElementById("guardarStock");

const almacenFiltro = document.getElementById("almacenFiltro");
const tabla = document.getElementById("tabla");

/* ========================
   CARGAR ALMACENES
======================== */
async function cargarAlmacenes(){

const snap = await getDocs(colAlmacenes);

almacenSelect.innerHTML="";
almacenFiltro.innerHTML="";

snap.forEach(d=>{
almacenSelect.innerHTML+=`
<option value="${d.id}">${d.data().nombre}</option>`;

almacenFiltro.innerHTML+=`
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
   GUARDAR O ACTUALIZAR STOCK
======================== */
guardarStockBtn.onclick = async()=>{

const almacenId = almacenSelect.value;
const ingredienteId = ingredienteSelect.value;
const cantidad = Number(stockInput.value);

if(!cantidad){
alert("Ingrese cantidad válida");
return;
}

const snap = await getDocs(query(
colInventario,
where("almacenId","==",almacenId),
where("ingredienteId","==",ingredienteId)
));

if(snap.empty){
await addDoc(colInventario,{
almacenId,
ingredienteId,
stock:cantidad
});
}else{
const docInv = snap.docs[0];
await updateDoc(doc(colInventario,docInv.id),{
stock:cantidad
});
}

stockInput.value="";
cargarInventario();
};

/* ========================
   MOSTRAR INVENTARIO
======================== */
async function cargarInventario(){

const almacenId = almacenFiltro.value;

const snap = await getDocs(query(
colInventario,
where("almacenId","==",almacenId)
));

tabla.innerHTML="";

for(const inv of snap.docs){

const ingredienteSnap = await getDocs(query(
colIngredientes,
where("__name__","==",inv.data().ingredienteId)
));

let nombreIngrediente = inv.data().ingredienteId;

if(!ingredienteSnap.empty){
nombreIngrediente = ingredienteSnap.docs[0].data().nombre;
}

tabla.innerHTML+=`
<tr>
<td>${nombreIngrediente}</td>
<td>${inv.data().stock}</td>
<td>
<button onclick="editarStock('${inv.id}',${inv.data().stock})">Editar</button>
</td>
</tr>`;
}
}

window.editarStock = async(id, stockActual)=>{
const nuevo = prompt("Nuevo stock:",stockActual);
if(nuevo===null) return;
await updateDoc(doc(colInventario,id),{
stock:Number(nuevo)
});
cargarInventario();
};

almacenFiltro.addEventListener("change",cargarInventario);

async function init(){
await cargarAlmacenes();
await cargarIngredientes();
await cargarInventario();
}

init();
