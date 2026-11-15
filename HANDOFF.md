# HANDOFF — Portafolio y registro de proyectos

> **Para la próxima IA:** lee este archivo completo antes de tocar el código.
> Responde en **español**. Daniel es principiante: explica el *porqué*, avanza
> en pasos pequeños y no añadas tecnologías sin preguntar.
>
> Última actualización: **2026-11-15**.

---

## 1. Qué es este proyecto

Una página web personal para **Daniel Andrade** que cumple dos funciones:

1. **CV / portafolio profesional** para presentarse a prácticas o a un primer
   empleo junior (backend / Python / datos).
2. **Registro vivo de proyectos**: cada proyecto tiene estado, stack, avance y
   aprendizajes, y se actualiza editando un solo archivo de datos.

**Restricción clave:** debe seguir siendo un sitio estático, sin build, sin
dependencias y sin peticiones externas. Se abre con doble clic en `index.html`.

## 2. Estado actual

- ✅ Sitio completo y funcional: hero, sobre mí, habilidades, proyectos,
  trayectoria, contacto y footer.
- ✅ Diseño responsive (escritorio, tablet y móvil).
- ✅ Tema claro/oscuro persistente y respeto por el tema del sistema.
- ✅ Registro de 2 proyectos renderizado desde `data/projects.js`.
- ✅ Filtros por estado, contador y barras de progreso animadas.
- ✅ CV imprimible en PDF con estilos `@media print`.
- ✅ Menú móvil accesible, animaciones con `prefers-reduced-motion` y
  navegación con sección activa.
- ✅ Verificado en el navegador integrado de Orca (http://127.0.0.1:8099):
  2 tarjetas, 3 filtros (Todos, Completado, En curso), tema claro/oscuro
  persistente, filtro por estado, menú móvil a 390 px, sin desbordamiento
  horizontal y sin errores de consola.
- ✅ PDF de impresión generado (7 páginas, tamaño carta); se corrigió el
  enlace "Saltar al contenido" que aparecía en el PDF.
- ⬜ Captura visual pendiente: la pestaña del navegador no dibuja frames en
  segundo plano, así que `screenshot` falla. El contenido y el PDF sí se
  validaron.
- ⬜ Sin repositorio Git propio todavía.

## 3. Archivos y responsabilidades

| Archivo | Qué contiene | Cuándo editarlo |
|---|---|---|
| `index.html` | Estructura, textos del CV, enlaces y secciones | Cambios de contenido o nuevos apartados |
| `assets/css/styles.css` | Variables de tema, layout, componentes, responsive y print | Cambios visuales |
| `assets/js/main.js` | Tema, menú, reveal, filtros, render de tarjetas, impresión | Cambios de comportamiento |
| `data/projects.js` | `PORTFOLIO_META` y `PORTFOLIO_PROJECTS` | Añadir/actualizar proyectos |
| `README.md` | Uso, estructura y publicación | Cambios de uso o despliegue |
| `HANDOFF.md` | Este documento | Al terminar cualquier sesión |

## 4. Datos personales usados (no inventar otros)

- **Nombre:** Daniel Andrade
- **Ubicación:** La Habana, Cuba
- **Formación:** Ingeniería en Ciencias Informáticas, UCI (en curso)
- **Correo:** daniel438400@gmail.com
- **GitHub:** <https://github.com/Andrade2516>
- **LinkedIn:** <https://www.linkedin.com/in/daniel-hernandez-b128753a2>
- **Git local:** `Andrade2516 <daniel438400@gmail.com>`

No hay teléfono, dirección exacta ni fechas de graduación. **No inventarlos.**
Si hacen falta, preguntar a Daniel.

### Proyectos registrados

1. **Game Backlog Tracker API** — completado (95 %). Repo:
   <https://github.com/Andrade2516/Proyecto-1->. Python, FastAPI, SQLAlchemy,
   SQLite, Pandas, pytest. 9 endpoints y 22 tests.
2. **Portafolio y registro de proyectos** — en curso (70 %). Este sitio.

> El stack personal se limita a **Python** y **primeros fundamentos de C++**,
> según indicó Daniel. Los proyectos de aprendizaje de Rust y C++ se retiraron
> del registro el 2026-11-15.

> Contexto del proyecto de FastAPI: documento maestro en
> `/home/andrade/Descargas/PROYECTO_GAME_BACKLOG_TRACKER.md` y estado en
> `/home/andrade/Proyectos/python/PROGRESO.md`. El repo se renombrará; si eso
> pasa, actualizar la URL en `data/projects.js` y en `README.md` del sitio.

## 5. Decisiones tomadas en esta sesión

- **Vanilla HTML/CSS/JS**, sin frameworks, para que Daniel pueda entenderlo y
  publicarlo en GitHub Pages sin build.
- Los proyectos viven en **`data/projects.js`** (asigna a `window`) en vez de
  un `.json` con `fetch`, porque `fetch` falla al abrir con `file://`.
- El registro es **editable a mano**: una tarjeta = un objeto.
- Estados normalizados: `Completado`, `En curso`, `Aprendizaje`. El CSS usa su
  versión en slug (`status-completado`, etc.).
- El botón de CV usa `window.print()`; **no** se genera un PDF aparte.
- El sitio está en español; nombres de código en inglés.
- Se usan datos reales extraídos de los proyectos existentes; el resto es
  contenido de perfil redactado de forma honesta y sin exagerar.

## 6. Cómo probar

```bash
cd "/home/andrade/Proyectos/Pagina web"
python3 -m http.server 8080
```

Abrir <http://localhost:8080> y comprobar:

- [ ] Cambio de tema y persistencia al recargar.
- [ ] Menú móvil (ancho < 760 px), cierre con `Escape`.
- [ ] Filtros de proyectos y contador.
- [ ] Botón **Descargar CV (PDF)** (vista previa de impresión).
- [ ] Sin errores en la consola del navegador.
- [ ] Enlaces de GitHub, LinkedIn y correo.

También se puede abrir `index.html` directamente; todo funciona sin servidor.

## 7. Pendientes priorizados

1. **Revisar la captura visual** en una pestaña visible y corregir cualquier
   detalle estético (el layout funcional ya se validó por DOM y PDF).
2. **Renombrar el repo del API** y actualizar su URL en `data/projects.js`.
3. **Añadir enlace al repo de este portafolio** cuando se publique.
4. **Publicar en GitHub Pages** y poner la URL en el README de GitHub y en
   LinkedIn.
5. **Sustituir el favicon/OG** por una imagen real si Daniel quiere.
6. **Añadir captura del proyecto** en las tarjetas (campo opcional `image`).

## 8. Ideas acordadas para el futuro (no implementar sin consultar)

- **Sección "Ahora"**: qué está aprendiendo Daniel esta semana.
- **Filtro por tecnología** además del filtro por estado.
- **Enlaces a demos en vivo** cuando exista despliegue del API.
- **Descarga de CV en PDF real** (por ejemplo con una versión impresa
  separada), si el `window.print()` no basta.
- **Modo "solo CV"** que oculte el registro de proyectos para enviar a
  reclutadores.
- **Estadísticas del registro**: total de proyectos, horas invertidas, etc.
- **Integrar el frontend del Game Backlog Tracker** con su API FastAPI.
- **Inglés**: versión bilingüe o botón ES/EN (requiere duplicar textos).

## 9. Convenciones al editar

- Mantener **cero dependencias** y rutas relativas.
- No usar `innerHTML` con datos sin escapar; ya existe `escapeHtml` en
  `main.js`. Reutilizarla.
- Añadir estilos en `styles.css` usando las variables de `:root`; no colores
  sueltos, para que el tema claro siga funcionando.
- Comprobar el modo claro **y** el oscuro, y el ancho móvil.
- Respetar `prefers-reduced-motion`.
- Si se añade una sección, actualizar el menú, el `scroll-padding` y el
  observador de sección activa (funciona solo si la sección tiene `id`).
- Commits pequeños en inglés; Daniel los hace él mismo salvo que autorice lo
  contrario.

## 10. Changelog

### 2026-11-15 — Ajustes de perfil

- Stack del hero reducido a **Python** y **primeros fundamentos de C++**.
- Registro reducido a **2 proyectos**: Game Backlog Tracker API y este
  portafolio. Se retiraron los proyectos de aprendizaje de Rust y C++.
- **JavaScript** eliminado de la tarjeta "Web" de la sección Habilidades.
- Contador de proyectos del hero actualizado de 4 a 2.

### 2026-11-15 — Creación inicial

- Estructura del proyecto y `index.html` con 6 secciones.
- `styles.css` con sistema de diseño, tema claro/oscuro, responsive y print.
- `main.js` con tema, menú, reveal, filtros, render de proyectos, fecha del
  registro e impresión.
- `data/projects.js` con 4 proyectos reales de Daniel.
- `README.md` y este `HANDOFF.md`.
- Verificado: HTML bien formado (parser de Python); en Orca se comprobaron
  render de 4 proyectos, filtros, tema, menú móvil, ausencia de desbordamiento
  y cero errores de consola; se generó el PDF de impresión y se revisó su texto.
  La captura visual sigue pendiente porque la pestaña no pinta en segundo plano.
