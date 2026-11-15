window.PORTFOLIO_META = {
  updated: "2026-11-15",
  owner: "Daniel Andrade",
};

window.PORTFOLIO_PROJECTS = [
  {
    id: "game-backlog-tracker",
    title: "Game Backlog Tracker API",
    subtitle: "API REST para gestionar una biblioteca personal de videojuegos",
    status: "Completado",
    year: "2026",
    progress: 95,
    featured: true,
    summary:
      "Backend completo para registrar qué juegos tienes, cuáles estás jugando, cuántas horas les dedicas y si corren en Linux. Incluye filtros, paginación, validación de datos y estadísticas calculadas con Pandas.",
    highlights: [
      "9 endpoints REST con FastAPI y validación de datos con Pydantic",
      "Modelo de datos con SQLAlchemy sobre SQLite y actualizaciones parciales",
      "Estadísticas con Pandas: resumen, por género y compatibilidad con Linux",
      "22 tests con pytest sobre una base de datos en memoria",
      "README con instalación paso a paso y captura de /docs",
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "SQLite", "Pandas", "pytest", "Git"],
    links: [
      {
        label: "Ver repositorio",
        url: "https://github.com/Andrade2516/Proyecto-1-",
        type: "repo",
      },
    ],
  },
  {
    id: "portafolio",
    title: "Portafolio y registro de proyectos",
    subtitle: "Este mismo sitio: CV interactivo y bitácora de proyectos",
    status: "En curso",
    year: "2026",
    progress: 70,
    featured: true,
    summary:
      "Sitio estático hecho desde cero con HTML, CSS y JavaScript, sin frameworks ni dependencias. Cumple dos funciones: presentar mi perfil profesional y mantener un registro editable de cada proyecto, su estado y su progreso.",
    highlights: [
      "Diseño responsive con tema claro y oscuro persistente",
      "Registro de proyectos alimentado por un único archivo de datos",
      "Navegación accesible, animaciones suaves y estilos de impresión para el CV en PDF",
      "Sin build ni dependencias: se abre directamente en el navegador",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Accesibilidad", "Git"],
    links: [],
  },
];
