import { addDoc, getDocs, deleteDoc, doc } from "./firebase.js";
import { colIngredientes } from "./app.js";
import { confirmar } from "./ui.js";

const nombre = document.getElementById("nombre");
const tabla = document.getElementById("tabla");

async function cargar(){
const snap = await getDocs(colIngredientes);
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
if(!confirmar("Eliminar ingrediente?")) return;
await deleteDoc(doc(colIngredientes,id));
cargar();
}

document.getElementById("guardar").onclick = async()=>{
await addDoc(colIngredientes,{nombre:nombre.value});
nombre.value="";
cargar();
};

cargar();
