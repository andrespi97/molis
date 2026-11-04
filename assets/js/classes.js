/* Clases: genera la imagen de vista previa y la cambia al pasar por cada fila. */

import { $, $$ } from "./utils.js";

const SIZES = "75vw";
const WIDTHS = [360, 540, 720];

const srcset = (slug, ext) =>
  WIDTHS.map((w) => `assets/img/disc-${slug}-${w}.${ext} ${w}w`).join(", ");

const picture = (slug, active) => `
  <picture>
    <source type="image/avif" srcset="${srcset(slug, "avif")}" sizes="${SIZES}">
    <source type="image/webp" srcset="${srcset(slug, "webp")}" sizes="${SIZES}">
    <img src="assets/img/disc-${slug}-720.jpg" srcset="${srcset(slug, "jpg")}" sizes="${SIZES}"
         alt="" width="720" height="900" loading="lazy" decoding="async"${active ? ' class="is-active"' : ""}>
  </picture>`;

export function initClasses() {
  const preview = $("#classPreview");
  if (!preview) return;

  const label = $("#previewLabel");
  const rows = $$(".class-row");

  // Cada fila declara su imagen con data-img="wod" (se usa también como miniatura).
  // La miniatura se aplica al <li>; la URL va absoluta porque el var() se resuelve
  // en la hoja responsive.css, no en el documento.
  rows.forEach((row) => {
    if (!row.dataset.img) return;
    const thumb = `url("${new URL(`assets/img/thumb-${row.dataset.img}.webp`, document.baseURI).href}")`;
    row.style.setProperty("--thumb", thumb);
    const item = row.closest("li");
    if (item) item.style.setProperty("--thumb", thumb);
  });

  const pictures = rows
    .map((row, i) => picture(row.dataset.img, i === 0))
    .join("");
  if (label) label.insertAdjacentHTML("beforebegin", pictures);
  else preview.insertAdjacentHTML("afterbegin", pictures);

  const imgs = $$("img", preview);
  const names = rows.map((row) => $(".class-row__name", row)?.textContent.trim() || "");

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
