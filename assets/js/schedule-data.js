/* Datos del horario semanal. Cada día es una lista de franjas:
   { t: "hora", c: [{ n: "clase", d: "duración", open?: true }] } */

export const DAY_NAMES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
export const DAY_IDS = ["lun", "mar", "mie", "jue", "vie", "sab"];

export const SCHEDULE = [
  // Lunes
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
  // Martes
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
  // Miércoles
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
  // Jueves
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
  // Viernes
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
  // Sábado
  [
    { t: "10:00", c: [{ n: "WOD", d: "60'" }, { n: "Open Box", d: "10–12", open: true }] }
  ]
];
