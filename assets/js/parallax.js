/* Parallax suave: mueve las imágenes según su posición en pantalla. */

import { $$, reduceMotion } from "./utils.js";

export function initParallax() {
  const els = $$("[data-parallax]");
  let ticking = false;

  const update = () => {
    if (reduceMotion || !els.length) return;
    const vh = window.innerHeight;

    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -vh * 0.15 || rect.top > vh * 1.15) return;
      const speed = parseFloat(el.dataset.parallax) || 0.12;
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const y = Math.max(-56, Math.min(56, progress * speed * 120));
      el.style.setProperty("--parallax-y", `${y.toFixed(1)}px`);
    });
  };

  const request = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  if (els.length && !reduceMotion) {
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    window.addEventListener("load", request);
    request();
  } else {
    els.forEach((el) => el.style.removeProperty("--parallax-y"));
  }
}
