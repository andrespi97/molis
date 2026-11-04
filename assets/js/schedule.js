/* Horario: pinta la semana completa y marca el día actual. */

import { $ } from "./utils.js";
import { SCHEDULE, DAY_NAMES, DAY_IDS } from "./schedule-data.js";

const slug = (name) => name.toLowerCase().replace(/\s+/g, "-");

const classTag = (item) => `
  <span class="slot__class slot__class--${slug(item.n)}${item.open ? " slot__class--open" : ""}">
    <b>${item.n}</b><em>${item.d}</em>
  </span>`;

const slotRow = (slot, i) => `
  <li class="week__slot" style="--i:${i}">
    <span class="week__time">${slot.t}</span>
    <span class="week__classes">${slot.c.map(classTag).join("")}</span>
  </li>`;

const dayBlock = (slots, day) => {
  const today = day === new Date().getDay() - 1;
  return `
    <section class="week__day${today ? " is-today" : ""}" aria-labelledby="day-${DAY_IDS[day]}">
      <h3 class="week__name" id="day-${DAY_IDS[day]}">
        ${DAY_NAMES[day]}${today ? '<span class="week__today">Hoy</span>' : ""}
      </h3>
      <ul class="week__list">${slots.map(slotRow).join("")}</ul>
    </section>`;
};

export function initSchedule() {
  const panel = $("#schedulePanel");
  if (!panel) return;
  panel.innerHTML = `<div class="week">${SCHEDULE.map(dayBlock).join("")}</div>`;
}
