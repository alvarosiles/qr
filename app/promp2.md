 Sí. Vi el estilo de las capturas y el diseño tiene una estética muy moderna tipo **dashboard corporativo**, con estas características:

* Tema **dark** elegante.
* Fondo azul petróleo muy oscuro (`#071C26`, `#0A2330`).
* Tarjetas con bordes redondeados (18-24px).
* Glow turquesa/cyan alrededor de los paneles.
* Botones color **turquesa brillante**.
* Iconografía minimalista.
* Tipografía moderna (Inter, Poppins o Manrope).
* Mucho espacio en blanco.
* Sombras suaves.
* Barra lateral fija.
* Header limpio.
* Efecto glassmorphism muy ligero.
* Hover con iluminación.

Este prompt está pensado para Claude 4 para que genere un HTML profesional.

---

# Prompt

```text
Actúa como un Senior UI/UX Designer y Frontend Developer experto en dashboards modernos.

Quiero que diseñes una interfaz completamente nueva inspirada en sistemas gubernamentales modernos como la Oficina Virtual Tributaria, pero NO la copies. Debe sentirse premium, elegante y tecnológica.

Genera un único archivo HTML completo con CSS y JavaScript incluidos.

No utilices Bootstrap.

Utiliza únicamente:

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome
- Google Fonts (Inter)

========================
ESTILO VISUAL
========================

Quiero una interfaz Dark Premium.

Paleta:

Background principal
#071A24

Sidebar
#081F2B

Cards
#102634

Header
#0B2330

Color primario
#10D7C8

Color secundario
#14F1E4

Texto principal
#FFFFFF

Texto secundario
#A7BDC7

Bordes
rgba(16,215,200,.15)

Sombras

box-shadow:
0 10px 30px rgba(0,0,0,.45);

Glow:

box-shadow:
0 0 0 1px rgba(16,215,200,.15),
0 0 30px rgba(16,215,200,.15);

Bordes redondeados:

20px

Transiciones

0.25s ease

========================
LAYOUT
========================

Sidebar izquierda fija.

Header superior.

Contenido responsive.

Grid moderno.

Mucho espacio entre componentes.

========================
SIDEBAR
========================

Logo arriba.

Menú con iconos.

Items con hover.

Item activo con fondo degradado:

linear-gradient(90deg,#10D7C8,#0AA99C)

Icono blanco.

Texto blanco.

Al pasar el mouse:

Glow turquesa.

========================
HEADER
========================

Header minimalista.

Izquierda:

Título del módulo.

Derecha:

Modo oscuro

Notificaciones

Usuario

Avatar circular

========================
CONTENIDO
========================

Crear dashboard moderno.

Primera fila:

4 tarjetas KPI

Cada tarjeta contiene:

icono

valor grande

título

indicador verde o rojo

Segunda fila:

Una tarjeta grande de estadísticas.

Otra tarjeta de actividad reciente.

Tercera fila:

Tabla moderna.

Columnas:

ID

Nombre

Estado

Fecha

Acciones

Estados:

Activo (verde)

Pendiente (amarillo)

Suspendido (rojo)

Botones de acción redondeados.

========================
CARDS
========================

Muy modernas.

Fondo:

#102634

Borde:

1px solid rgba(16,215,200,.15)

Glow muy suave.

Hover:

transform: translateY(-4px);

más glow.

========================
BOTONES
========================

Botón principal:

background:

linear-gradient(
135deg,
#10D7C8,
#0AB5A9
);

Texto blanco.

Hover:

Glow turquesa.

Botón secundario:

Solo borde.

========================
TABLAS
========================

Muy elegantes.

Filas oscuras.

Hover iluminado.

Cabecera con fondo ligeramente más claro.

Sin líneas pesadas.

========================
INPUTS
========================

Oscuros.

Borde cyan.

Focus con glow.

Placeholder gris.

========================
ANIMACIONES
========================

Fade In.

Slide Up.

Hover suave.

Cards con transición.

Botones con efecto ripple ligero.

========================
RESPONSIVE
========================

Desktop

Tablet

Móvil

Sidebar colapsable.

Cards adaptables.

========================
CALIDAD
========================

El código debe verse como un producto premium de 2026.

No quiero un diseño básico.

Debe parecer un sistema SaaS de nivel empresarial.

Debe tener excelente jerarquía visual.

Muchos detalles de UI.

Espaciado perfecto.

Iconografía moderna.

Sombras elegantes.

Microanimaciones.

Debe verse mejor que el ejemplo de referencia.

Entrega únicamente un archivo HTML completamente funcional con CSS y JavaScript integrados, listo para abrir en el navegador.
```

Ese prompt suele producir un resultado muy cercano al estilo de **AdminLTE + Figma Premium + Linear + Vercel Dashboard**, con un acabado bastante más moderno que el de las capturas que compartiste.
