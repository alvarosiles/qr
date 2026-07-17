# 📱 QR Payment Manager

Aplicación web estática para organizar, mostrar y compartir códigos QR de pago de forma rápida. Pensada para negocios que necesitan mostrarle un QR de cobro a un cliente en segundos, desde una PC, tablet o celular.

Sitio: [qr.alvarosiles.cloud](https://qr.alvarosiles.cloud)

## Características

- Dashboard con resumen de QR registrados, categorías y último QR utilizado.
- Gestión de QR: agregar, editar y eliminar códigos con nombre, tipo, descripción, color, estado y orden.
- Búsqueda por nombre y filtro por categoría.
- Orden configurable (por orden manual, nombre o tipo).
- Vista de tarjetas con imagen, acciones rápidas (mostrar, descargar, editar, eliminar).
- **Modo cliente**: pantalla limpia y a pantalla completa para mostrarle el QR al cliente.
- Copiar información del QR al portapapeles.
- Exportar / importar los datos en formato JSON, y restablecer a los datos originales.
- Todo se guarda en el navegador con `LocalStorage`, sin backend ni servidor.
- Diseño oscuro, responsive (PC, tablet y móvil), con animaciones suaves.

## Tecnologías

Solo tecnologías nativas del navegador, sin frameworks ni backend:

- HTML5
- CSS3
- JavaScript ES6 (módulo nativo)
- JSON
- LocalStorage
- Font Awesome (iconos, vía CDN)

## Estructura del proyecto

```
qr/
├── index.html          # Estructura de la app (dashboard, menú, formularios, modales)
├── style.css            # Estilos (tema oscuro, responsive)
├── app.js                # Lógica de la aplicación (ES6)
├── data/
│   └── qr.json           # Datos semilla de códigos QR
├── qr/                   # Imágenes de los códigos QR
│   ├── banco.svg
│   ├── billetera.svg
│   ├── pago.svg
│   └── otros.svg
├── assets/
│   └── logo.svg          # Logo de la aplicación
├── README.md
├── LICENSE
└── .gitignore
```

## Instalación

No requiere instalación de dependencias. Al ser una app estática, solo necesitas los archivos y un servidor HTTP (por `fetch` de `data/qr.json`, abrir `index.html` directamente con `file://` no funciona en todos los navegadores).

Clona el repositorio:

```bash
git clone https://github.com/<tu-usuario>/qr.git
cd qr
```

Levanta un servidor local, por ejemplo con Python:

```bash
python -m http.server 8080
```

O con la extensión "Live Server" de VS Code. Luego abre `http://localhost:8080`.

## Uso

1. La primera vez que abres la app, se cargan los QR de ejemplo desde `data/qr.json`.
2. Desde el menú lateral puedes navegar entre **Inicio**, **Mis QR**, **Agregar QR**, **Categorías**, **Configuración** e **Información**.
3. En **Mis QR** puedes buscar, filtrar por categoría y ordenar tus códigos.
4. Cada tarjeta permite: mostrar el QR en grande, descargarlo, editarlo o eliminarlo.
5. Dentro de la vista de un QR, el botón **"Mostrar al Cliente"** abre una pantalla completa y limpia, ideal para que el cliente escanee el código.
6. En **Configuración** puedes exportar tus datos a un archivo `qr.json`, importar uno existente, o restablecer la app a los datos originales.

Todos los cambios (agregar, editar, eliminar) se guardan automáticamente en `LocalStorage` del navegador.

## Cómo agregar nuevos QR

**Desde la app (recomendado):**

Ve a **➕ Agregar QR**, completa el formulario (nombre, tipo, descripción, imagen, color, estado y orden) y guarda. La imagen se almacena directamente en `LocalStorage`.

**Editando los datos semilla:**

Agrega la imagen del QR dentro de la carpeta `qr/` y añade una entrada en `data/qr.json`:

```json
{
  "id": 5,
  "name": "Nuevo Pago",
  "type": "Banco",
  "description": "Descripción del método de pago",
  "image": "qr/nuevo.png",
  "color": "#2563EB",
  "status": "active",
  "order": 5
}
```

> Nota: `data/qr.json` solo se usa para la carga inicial. Si ya existen datos en `LocalStorage`, puedes restablecerlos desde **Configuración → Restablecer datos** para volver a leer el JSON.

## Cómo publicar en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub.
2. Entra a **Settings → Pages**.
3. En **Source**, selecciona la rama `main` (o `dev`) y la carpeta `/ (root)`.
4. Guarda los cambios. GitHub publicará el sitio en `https://<tu-usuario>.github.io/<repositorio>/`.

## Cómo conectar el dominio qr.alvarosiles.cloud

1. En el repositorio, crea un archivo `CNAME` en la raíz con el contenido:
   ```
   qr.alvarosiles.cloud
   ```
2. En tu proveedor de DNS, crea un registro `CNAME` para el subdominio `qr` apuntando a `<tu-usuario>.github.io`.
3. En **Settings → Pages** de GitHub, escribe `qr.alvarosiles.cloud` como **Custom domain** y espera a que se verifique el DNS.
4. Activa **Enforce HTTPS** una vez que el certificado esté disponible.

## Licencia

Distribuido bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.
