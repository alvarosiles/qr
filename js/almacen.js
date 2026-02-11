import { addDoc, getDocs, deleteDoc, doc } from "./firebase.js";
import { colAlmacenes } from "./app.js";
import { confirmar } from "./ui.js";

const nombre = document.getElementById("nombre");
const tabla = document.getElementById("tabla");

async function cargar(){
const snap = await getDocs(colAlmacenes);
tabla.innerHTML="";
snap.forEach(d=>{
tabla.innerHTML+=`
<tr>
<td>${d.data().nombre}</td>
<td>
<button onclick="eliminar('${d.id}')">Eliminar</button>
</td>
</tr>`;
});
}

window.eliminar = async(id)=>{
if(!confirmar("Eliminar almacén?")) return;
await deleteDoc(doc(colAlmacenes,id));
cargar();
}

document.getElementById("guardar").onclick = async()=>{
await addDoc(colAlmacenes,{nombre:nombre.value});
nombre.value="";
cargar();
};

cargar();
