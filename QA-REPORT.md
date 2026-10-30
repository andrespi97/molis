# Molis Box · QA Report

Fecha: 30/10/2026 · Servidor: `http://localhost:4173` (python3 http.server) · Playwright + Chromium headless

## Resultado global: ✅ PASS (2 falsos positivos descartados, 0 bugs reales)

## 1. Consola y red

| Check | Resultado |
| --- | --- |
| Console errors | **0** (en todas las páginas y viewports) |
| Page errors | **0** |
| Failed requests | **0** (el `wod.mp4 ERR_ABORTED` inicial era una petición de rango abortada por el bloqueo de autoplay de headless; curl confirma 200 OK) |
| Imágenes rotas | **0** |
| Fuentes cargadas | Anton, Inter Tight, JetBrains Mono ✅ |

## 2. Estructura

| Check | Resultado |
| --- | --- |
| IDs duplicados | **0** |
| Anchors rotos | **0** (53 anchors internos verificados) |
| Secciones | `box`, `disciplinas`, `horarios`, `precios`, `envivo`, `contacto` — todas presentes |
| Links navegación | 6 links idénticos en header y menú móvil |
| Sección coaches | Eliminada correctamente — 0 menciones en HTML |
| Links privacidad | `privacidad.html` + `#aviso`, `#privacidad`, `#cookies` → navegación OK |
| assets | 15 imágenes locales + 2 vídeos + poster, todos 200 |

## 3. Horarios (renderizado por JS)

| Día | Filas | Detalle |
| --- | --- | --- |
| Lun–Jue | 9 | 07:30–21:00, dobles a las 19:00 y 20:00 (Hyfit/WOD, WOD/Fullbody) |
| Vie | 8 | Sin clase a las 17:00 |
| Sáb | 1 | WOD 10:00 + Open Box 10–12 (acceso libre) |

- Selección de día actual automática ✅
- Cambio de pestaña con `aria-selected` + `tabindex` ✅
- Teclado: flechas, Home/End implementados ✅

## 4. Hero en múltiples viewports

| Viewport | Altura hero | Cabe en viewport | Título |
| --- | --- | --- | --- |
| 1280×800 | 800 | ✅ | 120px, sin overflow |
| 1366×768 | 768 | ✅ | 115px |
| 1440×900 | 900 | ✅ | 142px |
| 1600×900 | 900 | ✅ | 142px |
| 1024×768 | 768 | ✅ | 101px |
| 390×844 | 1116 | por diseño (stacked) | 60px, line-height 0.9 |

Sin overflow horizontal no intencional en ningún viewport. Los elementos marcados (`band__media`, `reel`, `gallery__item`) son parallax/scroll-snap intencionales dentro de contenedores con `overflow` controlado.

## 5. Vídeos

- `wod.mp4`: autoplay muted + loop cuando el navegador lo permite (verificado con `--autoplay-policy`); poster y botón pausa/reproducir con `aria-label` ✅
- `hyfit.mp4`: click-to-play, `preload="none"` ✅
- **Reduced motion**: `autoplay` eliminado, `video.pause()`, toggle sigue disponible ✅
- Parallax desactivado con `prefers-reduced-motion` ✅
- Reveals mostrados inmediatamente con `reduce` ✅

## 6. Formulario

| Escenario | Resultado |
| --- | --- |
| Submit vacío | Errores en los 4 campos (nombre, email, teléfono, privacidad) con `aria-live` ✅ |
| Submit válido | Estado `is-sent` + `#formSuccess` visible ✅ |
| Validaciones | Email regex, teléfono 9–11 dígitos ✅ |

⚠️ Recordatorio README: el formulario **no envía datos** hasta conectar a un endpoint real.

## 7. Scrollspy y barra de progreso

- `is-current` en el link del nav según sección ✅ (verificado en box/horarios/precios/contacto)
- `#progressBar` con `transform: scaleX(p)` funcionando (0.12 → 0.9) ✅
- Nav con `is-stuck` + backdrop blur al hacer scroll ✅

## 8. Accesibilidad y contraste

| Selector | Ratio | Mínimo |
| --- | --- | --- |
| `.slot__meta`, `.schedule__zone` (8.5px) | 4.89 | 4.5 ✅ |
| `.footer__bottom`, `.footer__col h4` (8px) | 6.29 | 4.5 ✅ |
| `.class-row__meta`, `.contact__info dt` | 5.5 | 4.5 ✅ |

Skip link, `:focus-visible`, menú móvil con `inert` + Escape, roles ARIA en tabs, alt en imágenes ✅

## 9. Página privacidad.html

- HTTP 200, 0 errores, 0 IDs duplicados, 0 anchors rotos, 0 overflow
- Nav en modo oscuro sobre hero (`.nav--light`) + cambio a claro al hacer scroll ✅
- TOC sticky en desktop, wrap en móvil (390px) sin overflow ✅
- Menú móvil funcional ✅
- Meta `noindex, follow` (pendiente de quitar al publicar)

## 10. Capturas de pantalla

Generadas en `~/Proyectos/molis/.qa/` o en temp: hero desktop/mobile, secciones `box`, `disciplinas`, `horarios`, `precios`, `envivo`, `contacto`, footer, menú móvil, página legal (desktop/mobile). Revisión visual: sin solapamientos, sin elementos cortados, jerarquía correcta.

## Pendientes para producción (de README)

1. Conectar el formulario a un endpoint real
2. Completar NIF + correo definitivo en `privacidad.html`
3. Confirmar tarifas con el box
4. Actualizar dominio si no es `molisbox.com`
5. `robots.txt` + `sitemap.xml`
6. Valorar autoalojar las fuentes
