import {
getDocs,
addDoc,
updateDoc,
doc,
query,
where,
Timestamp
} from "./firebase.js";

import {
colProductos,
colAlmacenes,
colInventario,
colRecetas,
colVentas,
colKardex
} from "./app.js";

const almacenSelect = document.getElementById("almacen");
const productoSelect = document.getElementById("producto");
const cantidadInput = document.getElementById("cantidad");

async function cargar(){
const alm = await getDocs(colAlmacenes);
almacenSelect.innerHTML="";
alm.forEach(d=>{
almacenSelect.innerHTML+=`<option value="${d.id}">${d.data().nombre}</option>`;
});

const prod = await getDocs(colProductos);
productoSelect.innerHTML="";
prod.forEach(d=>{
productoSelect.innerHTML+=`<option value="${d.id}">${d.data().nombre}</option>`;
});
}

document.getElementById("vender").onclick = async()=>{

const productoId = productoSelect.value;
const almacenId = almacenSelect.value;
const cantidadVenta = Number(cantidadInput.value);

const recetas = await getDocs(query(colRecetas, where("productoId","==",productoId)));

for(const r of recetas.docs){

const receta = r.data();
const totalNecesario = receta.cantidad * cantidadVenta;

const invSnap = await getDocs(query(colInventario,
where("ingredienteId","==",receta.ingredienteId),
where("almacenId","==",almacenId)
));

if(invSnap.empty){
alert("No hay inventario");
return;
}

const invDoc = invSnap.docs[0];
const stockActual = invDoc.data().stock;

if(stockActual < totalNecesario){
alert("Stock insuficiente");
return;
}

await updateDoc(doc(colInventario,invDoc.id),{
stock: stockActual - totalNecesario
});

await addDoc(colKardex,{
ingredienteId: receta.ingredienteId,
almacenId,
tipo:"SALIDA",
cantidad: totalNecesario,
fecha: Timestamp.now()
});
}

await addDoc(colVentas,{
productoId,
cantidad:cantidadVenta,
almacenId,
fecha: Timestamp.now()
});

alert("Venta realizada");
};

cargar();
