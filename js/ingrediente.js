import {
addDoc,
getDocs,
deleteDoc,
updateDoc,
doc
} from "./firebase.js";

import { colIngredientes } from "./app.js";

const nombre = document.getElementById("nombre");
const minimo = document.getElementById("minimo");
const tabla = document.getElementById("tabla");

async function cargar(){
const snap = await getDocs(colIngredientes);
tabla.innerHTML="";

snap.forEach(d=>{
tabla.innerHTML+=`
<tr>
<td>${d.data().nombre}</td>
<td>${d.data().minimo || 0}</td>
<td>
<button onclick="editar('${d.id}','${d.data().nombre}',${d.data().minimo||0})">Editar</button>
<button onclick="eliminar('${d.id}')">Eliminar</button>
</td>
</tr>`;
});
}

window.editar = async(id,nombreActual,minActual)=>{
const nuevoNombre = prompt("Nombre:",nombreActual);
const nuevoMin = prompt("Stock mínimo:",minActual);

await updateDoc(doc(colIngredientes,id),{
nombre:nuevoNombre,
minimo:Number(nuevoMin)
});
cargar();
};

window.eliminar = async(id)=>{
if(!confirm("Eliminar ingrediente?")) return;
await deleteDoc(doc(colIngredientes,id));
cargar();
};

document.getElementById("guardar").onclick = async()=>{
await addDoc(colIngredientes,{
nombre:nombre.value,
minimo:Number(minimo.value)
});
nombre.value="";
minimo.value="";
cargar();
};

cargar();
