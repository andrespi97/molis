/* =========================================================
   MOLIS BOX · punto de entrada
   Cada interacción vive en su propio módulo de assets/js/.
   ========================================================= */

import { initNav } from "./nav.js";
import { initReveals, initScrollSpy } from "./reveal.js";
import { initClasses } from "./classes.js";
import { initSchedule } from "./schedule.js";
import { initParallax } from "./parallax.js";
import { initVideo } from "./video.js";
import { initForm } from "./form.js";
import { initYear } from "./year.js";

initNav();
initReveals();
initScrollSpy();
initClasses();
initSchedule();
initParallax();
initVideo();
initForm();
initYear();
