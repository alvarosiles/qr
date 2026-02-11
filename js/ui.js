export function limpiarCampos(...campos){
campos.forEach(c=>c.value="");
}

export function confirmar(msg){
return confirm(msg);
}
