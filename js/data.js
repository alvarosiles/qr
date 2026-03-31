// LISTA DE ALMACENES
export const warehouses = [
    { id: 1, name: "Almacén Central" },
    { id: 2, name: "Bodega Norte" },
    { id: 3, name: "Sucursal Sur" },
    { id: 4, name: "Depósito Secundario" }
];


// LISTA DE PRODUCTOS
export const products = [

    // ALMACÉN 1
    { id: "P001", name: "Laptop HP", grupo: "Tecnología", disponible: 20, vendidos: 5, comprado: 30, vencimiento: "-", valor: 850, warehouseId: 1 },
    { id: "P002", name: "Mouse Logitech", grupo: "Accesorios", disponible: 100, vendidos: 40, comprado: 200, vencimiento: "-", valor: 25, warehouseId: 1 },
    { id: "P003", name: "Monitor Samsung", grupo: "Tecnología", disponible: 15, vendidos: 3, comprado: 20, vencimiento: "-", valor: 300, warehouseId: 1 },

    // ALMACÉN 2
    { id: "P004", name: "Teclado Redragon", grupo: "Accesorios", disponible: 60, vendidos: 15, comprado: 100, vencimiento: "-", valor: 45, warehouseId: 2 },
    { id: "P005", name: "Disco SSD 1TB", grupo: "Tecnología", disponible: 40, vendidos: 10, comprado: 70, vencimiento: "-", valor: 120, warehouseId: 2 },

    // ALMACÉN 3
    { id: "P006", name: "Impresora Epson", grupo: "Oficina", disponible: 12, vendidos: 4, comprado: 20, vencimiento: "-", valor: 250, warehouseId: 3 },
    { id: "P007", name: "Silla Ergonómica", grupo: "Oficina", disponible: 25, vendidos: 8, comprado: 40, vencimiento: "-", valor: 180, warehouseId: 3 },

    // ALMACÉN 4
    { id: "P008", name: "Cable HDMI", grupo: "Accesorios", disponible: 200, vendidos: 60, comprado: 300, vencimiento: "-", valor: 8, warehouseId: 4 },
    { id: "P009", name: "Router TP-Link", grupo: "Redes",
