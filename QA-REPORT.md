# Molis Box · QA Report

Fecha: 31/10/2026 (revisión tras pasada de tipografía) · Servidor: `http://localhost:4173` (python3 http.server) · Playwright + Chromium headless

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

## 11. Pasada de tipografía y limpieza de relleno (31/10/2026)

Tras el pedido de "letras más grandes y menos descripciones":

**Textos eliminados** (sin relleno):
- Descripción de cada disciplina en `#disciplinas` (6 párrafos) — queda solo nombre + duración/nivel
- Párrafo introductorio de `#disciplinas` y link redundante del foot
- Segundo párrafo del manifesto (1 parrafo conciso en su lugar)
- Párrafos largos de `#horarios`, `#precios`, `#envivo`, `#contacto` y footer
- Etiquetas de planes reducidas de 4–5 bullets a 3–4
- Meta por fila de horario ("Coach en pista · Todos los niveles") eliminada; solo queda "Acceso libre" en Open Box
- Tags duplicados de disciplinas en `#envivo` (6 etiquetas)
- Estadísticas del hero con dt más cortos

**Tipografía escalada**:
- Etiquetas mono: 8–9.5px → 10–11.5px (todas las `.sec-index`, `.slot__cta`, `.price small`, `.class-row__meta`, etc.)
- Párrafos de cuerpo: 13–15px → 15–17px (`.schedule__intro`, `.pricing__intro`, `.trial__copy`, `.band__copy`, `.live__text`, `.contact__lead`, `.form__note`)
- Plan `ul`: 12.5px → 15px
- Inputs de formulario: 14.5px → 16px
- Labels mono del menú/hero: 11px → 12px
- `.logo__word`: 27px → 30px
- Títulos medianos (`.plan__head h3`, `.form__title`, stats dd) +15–20%
- Hero title desktop: clamp subido a 7.2/7.6rem en móvil (line-height 0.9)

**Verificación post-cambio** (Playwright, 31/10):
- 6 viewports: 0 errores consola, 0 IDs duplicados, 0 anchors rotos, 0 overflow real
- Hero sigue encajando exacto: 900/800/768/900/768px (desktop) y 1110px (móvil apilado)
- Horario: Lun–Jue 9 slots, Vie 8, Sáb 1 (hoy sábado, autoselección correcta)
- Form vacío → errores; válido → `is-sent` ✅
- Menú móvil, vídeo, reveals 29/29 ✅

**Ajustes móviles (31/10):**
- La barra fija inferior (`Reservar clase / Llamar`) ya no aparece sobre el hero: se muestra a partir de ~55% del viewport (`body.has-scrolled`), así no duplica el CTA del hero ni tapa el texto de entrada
- Oculto el aviso “Pasa el cursor” en ≤900px, donde la vista previa de disciplinas no existe
- Comprobado en 390, 768, 1024, 1280 y 1440px: 0 texto recortado, 0 scroll horizontal
- Anclas de navegación con offset correcto: sección a 94px (nav 78px + 16px)
- Añadidos `robots.txt` y `sitemap.xml`

## 12. Medios a pantalla completa (31/10)

- **Hero a sangre:** imagen a `100svh` con titular, entradilla, CTAs y estadísticas superpuestos sobre un degradado; la imagen pasa a `sizes="100vw"` y la nav se invierte a claro mientras está sobre el hero.
- **Manifiesto:** dos fotos a sangre (~88svh) con el titular y el párrafo integrados en la imagen principal; la segunda foto conserva su pie. En ≤900px se apilan y en móvil usan 3/4.
- **En vivo:** dos reels a ancho completo (~86svh) con “El box, sin filtros” superpuesto; galería a sangre en tres columnas con alturas escalonadas. En ≤900px ambos pasan a carrusel horizontal con `scroll-snap`.
- **Banda:** sube a ~92svh.
- Verificado en 320, 390, 768, 1024, 1280, 1440, 1600 y 1920px: 0 scroll horizontal, 0 texto recortado, 0 errores de consola, 0 IDs duplicados, 0 anchors rotos. Anclas a 94px, formulario y toggles de vídeo correctos.
- En 320×568 el hero crece a 674px porque el contenido no cabe en 568px; se resuelve con scroll vertical, sin solapes.

## 13. Imágenes y vídeos optimizados (01/11)

- **Imágenes:** cada foto se sirve en AVIF (q50), WebP (q78) y JPEG (mozjpeg q79) con `srcset`/`sizes` por hueco real. Hero 720/1080, manifiesto 450–1440, disciplinas y galería 360/540/720, banda 800/1200/1600, posters 480/720.
- **Logos:** mark a 96/192 px en WebP; favicon y apple-touch-icon reoptimizados (9,7 → 4,1 KB y 60,7 → 20,3 KB).
- **Posters:** WebP (poster WOD 21 → 12 KB; Hyfit 42 → 26 KB).
- **Vídeo:** H.264 High sin audio y `+faststart`; WOD 1,2 MB → 827 KB, Hyfit 3,6 MB → 1,7 MB (−47 %).
- **Carga diferida:** los MP4 usan `preload="none"`; el WOD se reproduce con `IntersectionObserver` a 320px del viewport. En la primera carga no se descarga ningún vídeo.
- **Preload del hero** apunta a AVIF 720/1080 con `sizes="100vw"`; no se descarga el JPEG de respaldo.
- **Medido sin caché:** primera carga 158 KB (390px) / 211 KB (1440px). Recorriendo toda la página: 49 KB de imágenes en móvil y 155 KB en escritorio. Antes: 1,7 MB de imágenes y 4,7 MB de vídeo.
- **QA 320–1920px:** 0 scroll horizontal, 0 imágenes rotas, 0 errores de consola, 0 recursos 404. Los “clips” del botón de reel en ≤900px son los del carrusel fuera de pantalla, no recortes.

## Pendientes para producción (de README)

1. Conectar el formulario a un endpoint real
2. Completar NIF + correo definitivo en `privacidad.html`
3. Confirmar tarifas con el box
4. Actualizar dominio si no es `molisbox.com`
5. Revisar `robots.txt`/`sitemap.xml` y el `noindex` de la página legal
6. Valorar autoalojar las fuentes
