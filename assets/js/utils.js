/* Utilidades compartidas por todos los módulos. */

export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
export const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
