/* Vídeos de los reels: pausa/reproduce y arranque diferido. */

import { $, $$, reduceMotion } from "./utils.js";

export function initVideo() {
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
}
