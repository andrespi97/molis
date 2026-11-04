/* Navegación: nav pegajosa, barra de progreso y menú móvil. */

import { $ } from "./utils.js";

export function initNav() {
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

  const setMenu = (open, viaKeyboard = false) => {
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    menu.toggleAttribute("inert", !open);
    document.body.classList.toggle("menu-open", open);
    // Con teclado, lleva el foco dentro del menú; con puntero, deja el foco donde estaba.
    if (open && viaKeyboard) {
      const first = $("a", menu);
      if (first) setTimeout(() => first.focus(), 320);
    } else if (!open && viaKeyboard && menu.contains(document.activeElement)) {
      burger.focus();
    }
  };

  burger.addEventListener("click", (e) => setMenu(!menu.classList.contains("is-open"), e.detail === 0));

  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false, true);
  });
}
