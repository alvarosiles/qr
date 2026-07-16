Actúa como un desarrollador Senior especializado en HTML5, CSS3, JavaScript ES6, diseño UX/UI y aplicaciones web modernas.

Quiero crear una aplicación web llamada **QR**.

URL del proyecto:

qr.alvarosiles.cloud

Objetivo:

Crear una aplicación web para gestionar, mostrar y compartir códigos QR de pago de forma rápida para clientes.

La aplicación debe permitir organizar mis códigos QR dentro de una carpeta, mostrarlos en pantalla, descargarlos y abrirlos rápidamente cuando un cliente necesite realizar un pago.

---

# Tecnologías

Utilizar únicamente:

* HTML5
* CSS3
* JavaScript ES6
* JSON
* LocalStorage

No utilizar frameworks.

No utilizar backend.

Debe funcionar como una aplicación web estática.

---

# Diseño

Crear un diseño moderno y profesional tipo aplicación de pagos.

Inspiración:

* Billeteras digitales
* Aplicaciones bancarias
* Dashboard modernos

Estilo:

Modo oscuro elegante.

Colores:

Fondo:
#111827

Tarjetas:
#1F2937

Color principal:
#2563EB

Éxito:
#10B981

Texto:
#FFFFFF

Bordes redondeados:

12px

Sombras suaves.

Responsive para:

* PC
* Tablet
* Móvil

---

# Interfaz principal

Crear un Dashboard:

Título:

📱 QR Payment Manager

Mostrar tarjetas:

Cantidad de QR registrados

Categorías

Último QR utilizado

Acciones rápidas

---

# Menú

Crear un menú lateral:

🏠 Inicio

💳 Mis QR

➕ Agregar QR

📁 Categorías

⚙ Configuración

ℹ Información

---

# Gestión de QR

Crear un formulario para registrar códigos QR.

Campos:

Nombre del pago

Ejemplo:

Banco Principal

Tipo:

* Banco
* Billetera Digital
* Pago móvil
* Criptomoneda
* Otro

Descripción

Imagen QR

Archivo:

.png
.jpg
.svg

Color

Estado:

Activo
Inactivo

Orden de visualización

---

# Carpeta QR

Crear una estructura:

qr/

banco.png

paypal.png

billetera.png

otros.png

La aplicación debe cargar automáticamente las imágenes desde esta carpeta.

---

# Archivo JSON

Crear:

data/qr.json

Ejemplo:

{
"qrPayments":[
{
"id":1,
"name":"Banco Principal",
"type":"Banco",
"description":"Cuenta principal",
"image":"qr/banco.png",
"status":"active"
},
{
"id":2,
"name":"Pago Digital",
"type":"Billetera",
"description":"Pago móvil",
"image":"qr/pago.png",
"status":"active"
}
]
}

---

# Vista de tarjetas QR

Cada QR debe mostrarse como una tarjeta:

Ejemplo:

---

💳 Banco Principal

[ Imagen QR ]

Banco

Cuenta principal

Botones:

👁 Mostrar

⬇ Descargar

📋 Copiar información

---

---

# Modo cliente

Crear un botón:

"Mostrar al Cliente"

Debe abrir una vista limpia:

* QR grande
* Nombre del pago
* Información
* Botón cerrar

Ideal para mostrar en una pantalla o celular.

---

# Funciones

Implementar:

✔ Cargar QR desde JSON

✔ Buscar QR

✔ Filtrar por categoría

✔ Mostrar QR grande

✔ Descargar imagen

✔ Vista pantalla completa

✔ Copiar información

✔ Ordenar tarjetas

✔ Guardar configuración con LocalStorage

---

# Diseño adicional

Agregar:

Animaciones suaves.

Hover en tarjetas.

Iconos usando Font Awesome.

Loading mientras carga información.

Mensajes de éxito:

"QR descargado correctamente"

---

# Estructura del proyecto

Crear:

qr/

│
├── index.html
├── style.css
├── app.js
│
├── data/
│   └── qr.json
│
├── qr/
│   ├── banco.png
│   ├── pago.png
│   └── otros.png
│
├── assets/
│   ├── icons/
│   └── logo.png
│
├── README.md
├── LICENSE
└── .gitignore

---

# Calidad del código

El código debe ser:

* Profesional
* Limpio
* Modular
* Comentado
* Fácil de ampliar

Seguir buenas prácticas JavaScript.

No repetir código.

---

# README.md

Crear documentación:

* Descripción del proyecto
* Características
* Instalación
* Uso
* Estructura
* Cómo agregar nuevos QR
* Cómo publicar en GitHub Pages
* Cómo conectar el dominio qr.alvarosiles.cloud

---

# Entrega

Genera el proyecto archivo por archivo.

Primero crea:

1. Estructura del proyecto
2. index.html
3. style.css
4. app.js
5. data/qr.json
6. README.md

Explica cada archivo antes de mostrar el código.

No resumas.

Espera mi confirmación antes de continuar con el siguiente archivo.
