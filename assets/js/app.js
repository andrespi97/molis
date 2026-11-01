/* =========================================================
   MOLIS BOX
   Interacciones: menú, reveals, parallax, horarios, vídeo y form
   ========================================================= */

(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     1. Navegación
     --------------------------------------------------------- */
  const nav = $("#nav");
  const burger = $("#burger");
  const menu = $("#menu");
  const progressBar = $("#progressBar");

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-stuck", y > 24);
    document.body.classList.toggle("has-scrolled", y > window.innerHeight * 0.55);

    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(y / max, 1) : 0;
    progressBar.style.transform = `scaleX(${p})`;
  };

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  const setMenu = (open) => {
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    menu.toggleAttribute("inert", !open);
    document.body.classList.toggle("menu-open", open);
    if (open) {
      const first = $("a", menu);
      if (first) setTimeout(() => first.focus(), 320);
    } else {
      burger.focus();
    }
  };

  burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));

  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false);
  });

  /* ---------------------------------------------------------
     2. Reveals
     --------------------------------------------------------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------------------------------------------------------
     3. Scrollspy
     --------------------------------------------------------- */
  const navLinks = $$(".nav__links a");
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-current", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    sections.forEach((section) => spy.observe(section));
  }

  /* ---------------------------------------------------------
     4. Disciplinas · imagen de preview
     --------------------------------------------------------- */
  const preview = $("#classPreview");
  if (preview) {
    const imgs = $$("img", preview);
    const label = $("#previewLabel");
    const rows = $$(".class-row");
    const names = ["WOD", "Fullbody", "Hyfit", "Haltero", "Mobility", "Personales"];

    const activate = (index) => {
      imgs.forEach((img, i) => img.classList.toggle("is-active", i === index));
      if (label) label.textContent = `${String(index + 1).padStart(2, "0")} / ${names[index]}`;
    };

    rows.forEach((row) => {
      const index = Number(row.dataset.index) || 0;
      row.addEventListener("mouseenter", () => activate(index));
      row.addEventListener("focus", () => activate(index));
      row.addEventListener("click", () => activate(index));
    });
  }

  /* ---------------------------------------------------------
     5. Horarios
     --------------------------------------------------------- */
  const SCHEDULE = [
    /* Lunes */
    [
      { t: "07:30", c: [{ n: "WOD", d: "60'" }] },
      { t: "09:15", c: [{ n: "WOD", d: "60'" }] },
      { t: "10:30", c: [{ n: "Fullbody", d: "45'" }] },
      { t: "16:00", c: [{ n: "WOD", d: "60'" }] },
      { t: "17:00", c: [{ n: "WOD", d: "60'" }] },
      { t: "18:00", c: [{ n: "WOD", d: "60'" }] },
      { t: "19:00", c: [{ n: "Hyfit", d: "45'" }, { n: "WOD", d: "60'" }] },
      { t: "20:00", c: [{ n: "WOD", d: "60'" }, { n: "Fullbody", d: "45'" }] },
      { t: "21:00", c: [{ n: "WOD", d: "60'" }] }
    ],
    /* Martes */
    [
      { t: "07:30", c: [{ n: "Fullbody", d: "45'" }] },
      { t: "09:15", c: [{ n: "WOD", d: "60'" }] },
      { t: "10:30", c: [{ n: "WOD", d: "60'" }] },
      { t: "16:00", c: [{ n: "WOD", d: "60'" }] },
      { t: "17:00", c: [{ n: "WOD", d: "60'" }] },
      { t: "18:00", c: [{ n: "Fullbody", d: "45'" }] },
      { t: "19:00", c: [{ n: "WOD", d: "60'" }, { n: "Fullbody", d: "45'" }] },
      { t: "20:00", c: [{ n: "WOD", d: "60'" }, { n: "Mobility", d: "45'" }] },
      { t: "21:00", c: [{ n: "WOD", d: "60'" }] }
    ],
    /* Miércoles */
    [
      { t: "07:30", c: [{ n: "WOD", d: "60'" }] },
      { t: "09:15", c: [{ n: "WOD", d: "60'" }] },
      { t: "10:30", c: [{ n: "Fullbody", d: "45'" }] },
      { t: "16:00", c: [{ n: "WOD", d: "60'" }] },
      { t: "17:00", c: [{ n: "WOD", d: "60'" }] },
      { t: "18:00", c: [{ n: "WOD", d: "60'" }] },
      { t: "19:00", c: [{ n: "Hyfit", d: "45'" }, { n: "WOD", d: "60'" }] },
      { t: "20:00", c: [{ n: "WOD", d: "60'" }, { n: "Fullbody", d: "45'" }] },
      { t: "21:00", c: [{ n: "WOD", d: "60'" }] }
    ],
    /* Jueves */
    [
      { t: "07:30", c: [{ n: "Fullbody", d: "45'" }] },
      { t: "09:15", c: [{ n: "WOD", d: "60'" }] },
      { t: "10:30", c: [{ n: "WOD", d: "60'" }] },
      { t: "16:00", c: [{ n: "WOD", d: "60'" }] },
      { t: "17:00", c: [{ n: "WOD", d: "60'" }] },
      { t: "18:00", c: [{ n: "Fullbody", d: "45'" }] },
      { t: "19:00", c: [{ n: "WOD", d: "60'" }, { n: "Fullbody", d: "45'" }] },
      { t: "20:00", c: [{ n: "WOD", d: "60'" }, { n: "Hyfit", d: "45'" }] },
      { t: "21:00", c: [{ n: "WOD", d: "60'" }] }
    ],
    /* Viernes */
    [
      { t: "07:30", c: [{ n: "WOD", d: "60'" }] },
      { t: "09:15", c: [{ n: "WOD", d: "60'" }] },
      { t: "10:30", c: [{ n: "WOD", d: "60'" }] },
      { t: "16:00", c: [{ n: "WOD", d: "60'" }] },
      { t: "17:00", c: [{ n: "WOD", d: "60'" }] },
      { t: "18:00", c: [{ n: "Fullbody", d: "45'" }] },
      { t: "19:00", c: [{ n: "WOD", d: "60'" }] },
      { t: "20:00", c: [{ n: "WOD", d: "60'" }] }
    ],
    /* Sábado */
    [
      { t: "10:00", c: [{ n: "WOD", d: "60'" }, { n: "Open Box", d: "10–12", open: true }] }
    ]
  ];

  const panel = $("#schedulePanel");
  const dayButtons = $$(".day");
  const dayIds = ["lun", "mar", "mie", "jue", "vie", "sab"];

  const renderDay = (dayIndex) => {
    if (!panel) return;
    const slots = SCHEDULE[dayIndex] || [];
    panel.setAttribute("aria-labelledby", `tab-${dayIds[dayIndex]}`);

    panel.innerHTML = slots.map((slot, i) => {
      const classes = slot.c.map((item) => `
        <span class="slot__class${item.open ? " slot__class--open" : ""}">
          <b>${item.n}</b><em>${item.d}</em>
        </span>
      `).join("");

      const meta = slot.c.some((item) => item.open) ? "Acceso libre" : "";

      return `
        <div class="slot" style="--i:${i}">
          <span class="slot__time">${slot.t}</span>
          <div class="slot__classes">${classes}</div>
          ${meta ? `<span class="slot__meta">${meta}</span>` : ""}
          <a class="slot__cta" href="#contacto">Reservar <span aria-hidden="true">↗</span></a>
        </div>
      `;
    }).join("");
  };

  const selectDay = (index) => {
    dayButtons.forEach((btn, i) => {
      const active = i === index;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
      btn.setAttribute("tabindex", active ? "0" : "-1");
    });
    renderDay(index);
  };

  if (panel && dayButtons.length) {
    dayButtons.forEach((btn, i) => {
      btn.addEventListener("click", () => selectDay(i));
      btn.addEventListener("keydown", (e) => {
        let next = null;
        if (e.key === "ArrowRight") next = (i + 1) % dayButtons.length;
        if (e.key === "ArrowLeft") next = (i - 1 + dayButtons.length) % dayButtons.length;
        if (e.key === "Home") next = 0;
        if (e.key === "End") next = dayButtons.length - 1;
        if (next !== null) {
          e.preventDefault();
          selectDay(next);
          dayButtons[next].focus();
        }
      });
    });

    // Día actual (lunes = 0 … sábado = 5). Domingo abre la semana.
    const today = new Date().getDay();
    const start = today === 0 ? 0 : today - 1;
    selectDay(start);
  }

  /* ---------------------------------------------------------
     6. Parallax
     --------------------------------------------------------- */
  const parallaxEls = $$("[data-parallax]");
  let parallaxTick = false;

  const updateParallax = () => {
    if (reduceMotion || !parallaxEls.length) return;
    const vh = window.innerHeight;

    parallaxEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -vh * 0.15 || rect.top > vh * 1.15) return;
      const speed = parseFloat(el.dataset.parallax) || 0.12;
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const y = Math.max(-56, Math.min(56, progress * speed * 120));
      el.style.setProperty("--parallax-y", `${y.toFixed(1)}px`);
    });
  };

  const requestParallax = () => {
    if (parallaxTick) return;
    parallaxTick = true;
    window.requestAnimationFrame(() => {
      updateParallax();
      parallaxTick = false;
    });
  };

  if (parallaxEls.length && !reduceMotion) {
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);
    window.addEventListener("load", requestParallax);
    requestParallax();
  } else {
    parallaxEls.forEach((el) => el.style.removeProperty("--parallax-y"));
  }

  /* ---------------------------------------------------------
     7. Vídeo
     --------------------------------------------------------- */
  $$(".reel").forEach((reel) => {
    const video = $(".reel__video", reel);
    const toggle = $(".reel__toggle", reel);
    if (!video || !toggle) return;

    if (reduceMotion) {
      video.removeAttribute("autoplay");
      video.pause();
    }

    const sync = () => {
      const paused = video.paused;
      reel.classList.toggle("is-paused", paused);
      toggle.textContent = paused ? "Reproducir" : "Pausa";
      toggle.setAttribute("aria-label", paused ? "Reproducir vídeo" : "Pausar vídeo");
    };

    const flip = () => {
      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    toggle.addEventListener("click", flip);
    video.addEventListener("click", flip);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    video.addEventListener("loadeddata", sync);
    video.addEventListener("ended", sync);
    sync();

    // El vídeo de fondo no se descarga hasta que la sección está cerca.
    if (!reduceMotion && video.hasAttribute("data-autostart")) {
      const start = () => {
        if (video.paused) video.play().catch(() => {});
      };
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            start();
            io.disconnect();
          }
        }, { rootMargin: "320px 0px" });
        io.observe(reel);
      } else {
        start();
      }
    }
  });

  /* ---------------------------------------------------------
     8. Formulario
     --------------------------------------------------------- */
  const form = $("#trialForm");
  if (form) {
    const success = $("#formSuccess");
    const fields = {
      name: $("#name"),
      email: $("#email"),
      phone: $("#phone"),
      privacy: $("#privacy")
    };

    const showError = (input, message) => {
      const field = input.closest(".field");
      if (!field) return;
      field.classList.add("has-error");
      const err = $(".field__error", field);
      if (err) err.textContent = message;
      input.setAttribute("aria-invalid", "true");
    };

    const clearError = (input) => {
      const field = input.closest(".field");
      if (!field) return;
      field.classList.remove("has-error");
      const err = $(".field__error", field);
      if (err) err.textContent = "";
      input.removeAttribute("aria-invalid");
    };

    const validate = () => {
      let firstInvalid = null;

      const fail = (input, msg) => {
        showError(input, msg);
        if (!firstInvalid) firstInvalid = input;
      };

      if (fields.name.value.trim().length < 2) fail(fields.name, "Dinos cómo te llamas.");
      else clearError(fields.name);

      const email = fields.email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) fail(fields.email, "Revisa tu email.");
      else clearError(fields.email);

      const digits = fields.phone.value.replace(/\D/g, "");
      if (digits.length < 9 || digits.length > 11) fail(fields.phone, "Necesitamos un teléfono válido.");
      else clearError(fields.phone);

      if (!fields.privacy.checked) fail(fields.privacy, "Acepta la política para continuar.");
      else clearError(fields.privacy);

      return firstInvalid;
    };

    Object.values(fields).forEach((input) => {
      input.addEventListener("input", () => clearError(input));
      input.addEventListener("change", () => clearError(input));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const invalid = validate();
      if (invalid) {
        invalid.focus({ preventScroll: false });
        return;
      }

      form.classList.add("is-sent");
      if (success) {
        success.hidden = false;
        success.setAttribute("tabindex", "-1");
        success.focus({ preventScroll: true });
      }
      form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    });
  }

  /* ---------------------------------------------------------
     9. Año actual
     --------------------------------------------------------- */
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
