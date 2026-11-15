(function () {
  "use strict";

  document.body.classList.add("js-ready");

  var root = document.documentElement;
  var THEME_KEY = "portfolio-theme";
  var themeToggle = document.getElementById("theme-toggle");

  function setTheme(theme) {
    root.dataset.theme = theme;
    if (themeToggle) {
      var label = theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro";
      themeToggle.setAttribute("aria-label", label);
      themeToggle.setAttribute("title", label);
    }
  }

  var storedTheme = null;
  try {
    storedTheme = localStorage.getItem(THEME_KEY);
  } catch (error) {
    storedTheme = null;
  }

  var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(storedTheme || (prefersLight ? "light" : "dark"));

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      setTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (error) {
        /* almacenamiento no disponible */
      }
    });
  }

  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.getElementById("nav-links");

  function closeMenu() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  var revealItems = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = document.querySelectorAll(".nav-links a");

  function setActiveLink(id) {
    navAnchors.forEach(function (anchor) {
      anchor.classList.toggle("is-active", anchor.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  var meta = window.PORTFOLIO_META || {};
  var registryDate = document.getElementById("registry-date");
  if (registryDate && meta.updated) {
    var parsedDate = new Date(meta.updated + "T12:00:00");
    if (!isNaN(parsedDate.getTime())) {
      registryDate.dateTime = meta.updated;
      registryDate.textContent = new Intl.DateTimeFormat("es", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(parsedDate);
    }
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var printButton = document.getElementById("print-cv");
  if (printButton) {
    printButton.addEventListener("click", function () {
      window.print();
    });
  }

  var projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS.slice() : [];
  var grid = document.getElementById("projects-grid");
  var filtersEl = document.getElementById("project-filters");
  var countEl = document.getElementById("project-count");
  var activeFilter = "Todos";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function slug(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function clampProgress(value) {
    var number = Number(value);
    if (isNaN(number)) return 0;
    return Math.min(100, Math.max(0, Math.round(number)));
  }

  function renderLinks(project) {
    var links = Array.isArray(project.links) ? project.links : [];
    if (!links.length) {
      return '<span class="link-note">En local · repositorio público próximamente</span>';
    }

    return links
      .map(function (link) {
        if (!link || !link.url) return "";
        var external = /^https?:\/\//i.test(link.url);
        return (
          '<a class="link-btn" href="' +
          escapeHtml(link.url) +
          '"' +
          (external ? ' target="_blank" rel="noopener noreferrer"' : "") +
          ">" +
          escapeHtml(link.label || "Ver más") +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>' +
          "</a>"
        );
      })
      .join("");
  }

  function renderCard(project) {
    var status = project.status || "Aprendizaje";
    var statusClass = "status-" + slug(status);
    var progress = clampProgress(project.progress);
    var title = escapeHtml(project.title || "Proyecto sin título");
    var highlights = Array.isArray(project.highlights) ? project.highlights : [];
    var stack = Array.isArray(project.stack) ? project.stack : [];

    return (
      '<article class="project-card' +
      (project.featured ? " is-featured" : "") +
      '" data-status="' +
      escapeHtml(status) +
      '">' +
      '<div class="project-top">' +
      '<span class="status-badge ' +
      statusClass +
      '">' +
      escapeHtml(status) +
      "</span>" +
      '<span class="project-year">' +
      escapeHtml(project.year || "") +
      "</span>" +
      "</div>" +
      '<h3 class="project-title">' +
      title +
      "</h3>" +
      '<p class="project-subtitle">' +
      escapeHtml(project.subtitle || "") +
      "</p>" +
      '<p class="project-summary">' +
      escapeHtml(project.summary || "") +
      "</p>" +
      (highlights.length
        ? '<ul class="project-highlights">' +
          highlights
            .map(function (item) {
              return "<li>" + escapeHtml(item) + "</li>";
            })
            .join("") +
          "</ul>"
        : "") +
      (stack.length
        ? '<ul class="project-stack" aria-label="Tecnologías">' +
          stack
            .map(function (tech) {
              return "<li>" + escapeHtml(tech) + "</li>";
            })
            .join("") +
          "</ul>"
        : "") +
      '<div class="project-progress">' +
      '<div class="progress-head"><span>Progreso</span><span>' +
      progress +
      "%</span></div>" +
      '<div class="progress-bar" role="progressbar" aria-valuenow="' +
      progress +
      '" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso de ' +
      title +
      '"><span class="progress-fill" data-progress="' +
      progress +
      '"></span></div>' +
      "</div>" +
      '<div class="project-links">' +
      renderLinks(project) +
      "</div>" +
      "</article>"
    );
  }

  function sortProjects(list) {
    var statusOrder = { Completado: 0, "En curso": 1, Aprendizaje: 2 };
    return list.sort(function (a, b) {
      var featuredDiff = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      if (featuredDiff !== 0) return featuredDiff;
      var orderA = statusOrder[a.status] != null ? statusOrder[a.status] : 9;
      var orderB = statusOrder[b.status] != null ? statusOrder[b.status] : 9;
      if (orderA !== orderB) return orderA - orderB;
      return clampProgress(b.progress) - clampProgress(a.progress);
    });
  }

  function applyFilter() {
    if (!grid) return;
    var cards = grid.querySelectorAll(".project-card");
    var visible = 0;

    cards.forEach(function (card) {
      var show = activeFilter === "Todos" || card.dataset.status === activeFilter;
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (countEl) {
      countEl.textContent =
        visible + " de " + projects.length + (projects.length === 1 ? " proyecto" : " proyectos");
    }
  }

  function buildFilters() {
    if (!filtersEl || !projects.length) return;

    var order = ["Completado", "En curso", "Aprendizaje"];
    var statuses = [];
    projects.forEach(function (project) {
      if (project.status && statuses.indexOf(project.status) === -1) {
        statuses.push(project.status);
      }
    });

    statuses.sort(function (a, b) {
      var indexA = order.indexOf(a);
      var indexB = order.indexOf(b);
      return (indexA === -1 ? 9 : indexA) - (indexB === -1 ? 9 : indexB);
    });

    filtersEl.innerHTML = ["Todos"]
      .concat(statuses)
      .map(function (status) {
        var isActive = status === activeFilter;
        return (
          '<button class="filter-btn' +
          (isActive ? " is-active" : "") +
          '" type="button" data-filter="' +
          escapeHtml(status) +
          '" aria-pressed="' +
          String(isActive) +
          '">' +
          escapeHtml(status) +
          "</button>"
        );
      })
      .join("");

    filtersEl.addEventListener("click", function (event) {
      var button = event.target.closest(".filter-btn");
      if (!button) return;

      activeFilter = button.dataset.filter || "Todos";

      filtersEl.querySelectorAll(".filter-btn").forEach(function (item) {
        var selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      applyFilter();
    });
  }

  function renderProjects() {
    if (!grid) return;

    if (!projects.length) {
      grid.innerHTML =
        '<p class="notice">Todavía no hay proyectos registrados. Añádelos en <code>data/projects.js</code>.</p>';
      return;
    }

    sortProjects(projects);
    grid.innerHTML = projects.map(renderCard).join("");
    buildFilters();
    applyFilter();

    window.requestAnimationFrame(function () {
      grid.querySelectorAll(".progress-fill").forEach(function (bar) {
        bar.style.width = (bar.dataset.progress || 0) + "%";
      });
    });
  }

  renderProjects();

  var filterBeforePrint = null;
  window.addEventListener("beforeprint", function () {
    filterBeforePrint = activeFilter;
    activeFilter = "Todos";
    applyFilter();
  });

  window.addEventListener("afterprint", function () {
    if (filterBeforePrint) {
      activeFilter = filterBeforePrint;
      filterBeforePrint = null;
      if (filtersEl) {
        filtersEl.querySelectorAll(".filter-btn").forEach(function (button) {
          var selected = button.dataset.filter === activeFilter;
          button.classList.toggle("is-active", selected);
          button.setAttribute("aria-pressed", String(selected));
        });
      }
      applyFilter();
    }
  });
})();
