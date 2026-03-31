// Renderiza la tabla de productos
export function renderTable(tbody, data) {

    tbody.innerHTML = "";

    if (!data || data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center; padding:20px; color:#999;">
                    No hay productos para mostrar
                </td>
            </tr>
        `;
        return;
    }

    const rows = data.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.grupo}</td>
            <td>${product.disponible}</td>
            <td>${product.vendidos}</td>
            <td>${product.comprado}</td>
            <td>${product.vencimiento}</td>
            <td>$${formatCurrency(product.valor)}</td>
        </tr>
    `).join("");

    tbody.innerHTML = rows;
}


// Formatea moneda profesional
function formatCurrency(value) {
    return Number(value).toLocaleString("es-BO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
