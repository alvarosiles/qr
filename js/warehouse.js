// Renderiza la lista de almacenes
export function renderWarehouses(container, warehouses, selectedId, onSelect) {

    container.innerHTML = "";

    warehouses.forEach(warehouse => {

        const li = document.createElement("li");
        li.textContent = warehouse.name;

        // Activar clase si es el seleccionado
        if (warehouse.id === selectedId) {
            li.classList.add("active");
        }

        // Evento click
        li.addEventListener("click", () => {
            onSelect(warehouse.id);
        });

        container.appendChild(li);
    });
}
