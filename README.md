# Portafolio y registro de proyectos — Daniel Andrade

Sitio web estático que funciona a la vez como **CV profesional** y como
**registro vivo de proyectos**. Está hecho con HTML, CSS y JavaScript puros:
sin frameworks, sin build y sin dependencias.

## Cómo verlo

Abre `index.html` directamente en el navegador. También puedes levantar un
servidor local:

```bash
cd "/home/andrade/Proyectos/Pagina web"
python3 -m http.server 8080
```

Luego visita <http://localhost:8080>.

## Estructura

```text
Pagina web/
├── index.html              # Estructura y contenido de la página
├── assets/
│   ├── css/styles.css      # Estilos, temas y estilos de impresión
│   └── js/main.js          # Tema, menú, animaciones y render de proyectos
├── data/
│   └── projects.js         # Registro de proyectos (única fuente de datos)
├── README.md               # Este archivo
└── HANDOFF.md              # Estado, cambios e ideas para la próxima IA
```

## Cómo añadir o actualizar un proyecto

Edita `data/projects.js` y añade un objeto al arreglo
`window.PORTFOLIO_PROJECTS`:

```js
{
  id: "mi-proyecto",
  title: "Nombre del proyecto",
  subtitle: "Una frase que lo describa",
  status: "Completado",        // Completado | En curso | Aprendizaje
  year: "2026",
  progress: 100,               // 0 a 100
  featured: true,              // aparece primero
  summary: "Qué hace y por qué existe.",
  highlights: ["Logro 1", "Logro 2"],
  stack: ["Python", "FastAPI"],
  links: [
    { label: "Ver repositorio", url: "https://github.com/usuario/repo" }
  ]
}
```

La fecha del registro se cambia en `window.PORTFOLIO_META.updated`
(formato `AAAA-MM-DD`). Los filtros y las tarjetas se generan solos.

## CV en PDF

El botón **Descargar CV (PDF)** abre el diálogo de impresión del navegador.
Elige "Guardar como PDF". Los estilos de impresión ocultan el menú, los
filtros y los botones, y reorganizan el contenido para que quepa bien.

## Tema claro y oscuro

El botón de la esquina superior derecha cambia el tema y lo guarda en
`localStorage`. Si no hay preferencia guardada, respeta el tema del sistema.

## Publicarlo gratis con GitHub Pages

1. Crea un repositorio en GitHub y sube esta carpeta.
2. En el repositorio: **Settings → Pages**.
3. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. Espera un minuto y abre la URL que muestra GitHub.

Antes de publicar, actualiza en `index.html` los enlaces de GitHub y LinkedIn
si cambian, y revisa los datos de contacto.

## Accesibilidad y rendimiento

- HTML semántico, enlace para saltar al contenido y estados de foco visibles.
- Menú móvil con `aria-expanded` y cierre con `Escape`.
- Animaciones desactivadas si el sistema pide movimiento reducido.
- Cero peticiones externas: funciona sin conexión.

## Para la próxima IA

Lee **`HANDOFF.md`** antes de modificar nada. Contiene el estado actual, las
decisiones tomadas, los pendientes y las ideas acordadas.
