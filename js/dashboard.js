import { getDocs } from "./firebase.js";
import {
colVentas,
colInventario,
colIngredientes
} from "./app.js";

const ventasHoyDiv = document.getElementById("ventasHoy");
const stockBajoDiv = document.getElementById("stockBajo");

async function ventasHoy(){

const snap = await getDocs(colVentas);

let total = 0;
snap.forEach(v=> total += v.data().cantidad);

ventasHoyDiv.innerHTML = `
<h3>Ventas Totales</h3>
<p>${total}</p>
`;
}

async function stockBajo(){

const inventario = await getDocs(colInventario);
const ingredientes = await getDocs(colIngredientes);

let alertaHTML="<h3>🚨 Stock Bajo</h3>";

for(const inv of inventario.docs){

const ing = ingredientes.docs.find(i=>i.id===inv.data().ingredienteId);

if(ing && inv.data().stock <= (ing.data().minimo || 0)){
alertaHTML+=`
<p>${ing.data().nombre} stock: ${inv.data().stock}</p>`;
}
}

stockBajoDiv.innerHTML = alertaHTML;
}

ventasHoy();
stockBajo();
