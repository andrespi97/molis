/* Año actual en el pie de página. */

import { $ } from "./utils.js";

export function initYear() {
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
}
