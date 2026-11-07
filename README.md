# Molis Box · Cross Training en Mos

Sitio de una página para **Molis Box**, box de cross training en Camiño Santiaguiño, 8 · 36417 Guizán, Mos (Pontevedra). HTML, CSS y JavaScript estáticos: sin framework, sin build y sin dependencias de npm.

```
index.html              · página principal (secciones, copia, SEO, JSON-LD)
privacidad.html         · aviso legal, privacidad y cookies
robots.txt              · indexación (privacidad.html excluida)
sitemap.xml             · mapa del sitio

assets/css/styles.css   · índice que importa los módulos, en orden de cascada
assets/css/base.css     · tokens, reset, layout, tipografía y botones
assets/css/nav.css      · navegación, menú móvil y parallax
assets/css/hero.css     · hero y marquesina
assets/css/manifesto.css, classes.css, schedule.css, pricing.css,
band.css, live.css, contact.css · un archivo por sección
assets/css/footer.css   · footer y CTA móvil
assets/css/legal.css    · páginas legales
assets/css/motion.css   · reveals
assets/css/responsive.css · media queries y motion reducido

assets/js/app.js        · punto de entrada: importa y arranca los módulos
assets/js/utils.js      · helpers ($, $$, reduced motion)
assets/js/nav.js        · nav pegajosa, progreso y menú
assets/js/reveal.js     · reveals y scrollspy
assets/js/classes.js    · filas de clases y foto de vista previa
assets/js/schedule-data.js · datos del horario semanal
assets/js/schedule.js   · render del horario
assets/js/parallax.js   · parallax
assets/js/video.js      · reels de vídeo
assets/js/year.js       · año del footer

assets/img/             · fotos optimizadas, logo, posters y OG image
assets/video/           · reels verticales WOD e Hyfit
```

## Estructura del código

Cada archivo se mantiene por debajo de 300 líneas para que sea fácil de editar.
El CSS se importa desde `assets/css/styles.css` (el orden de los `@import` es el
orden de cascada). El JavaScript usa módulos ES nativos: `app.js` solo importa y
arranca cada módulo, así que para añadir una interacción basta con crear el
archivo en `assets/js/` e importarlo allí.

## Ver en local

```bash
python3 -m http.server 4173
# http://localhost:4173
```

No abras `index.html` con `file://`: los módulos ES y los vídeos necesitan servidor.

## Contenido real ya integrado

| Dato | Valor |
| --- | --- |
| Nombre | Molis Box |
| Dirección | Camiño Santiaguiño, 8 · 36417 Guizán, Mos · Pontevedra |
| Teléfono / WhatsApp | 618 730 768 |
| Instagram | [@molisbox](https://www.instagram.com/molisbox/) |
| Facebook | [molisbox](https://www.facebook.com/molisbox/) |
| Horario | L–V 07:00–21:30 · Sábado 10:00–12:00 · Domingo cerrado |

**Disciplinas:** WOD, Fullbody, Hyfit, Halterofilia, Mobility y entrenamiento personal.

**Tarifas** (tomadas de la web de reservas de Molis; confirmar antes de publicar):

- 5 sesiones · 40 €/mes
- 9 sesiones · 50 €/mes
- 14 + 2 · 60 €/mes
- Ilimitada · 70 €/mes
- Molis Method · 85 €/mes
- Molis Gym · +10 €/mes
- Bono 1 sesión · 8 €

El horario de `#horarios` sigue la imagen de horarios facilitada por el box (L–V con varias franjas a las 19:00 y 20:00, sábado 10:00 + Open Box). Se renderiza desde el array `SCHEDULE` en `assets/js/schedule-data.js`; el día actual se marca automáticamente.

## Diseño y comportamiento

- **Paleta:** naranja de marca `#f05a22`, tinta `#0b0b0b`, hueso `#f2efe8`, papel `#e7e2d7`. `--accent-ink` se usa para texto naranja pequeño sobre fondo claro (contraste AA).
- **Tipografía:** Anton (titulares), Inter Tight (texto) y JetBrains Mono (etiquetas). Se cargan desde Google Fonts. Cuerpo a 15–17px y etiquetas mono a 10–11.5px para lectura cómoda; textos de relleno reducidos al mínimo.
- **Estructura:** hero → marquee → 01 El box → 02 Disciplinas → 03 Horarios → 04 Tarifas → banda full-bleed → 05 En vivo → 06 Contacto → footer.
- **Medios a pantalla completa:** el hero es una imagen a sangre de `100svh` con titular, entradilla, CTAs y datos superpuestos; el manifiesto usa dos fotos a sangre (~88svh) con el texto encima; los dos reels de “En vivo” ocupan el ancho completo a ~86svh con el titular integrado y la galería va a sangre. En ≤900px reels y galería pasan a carrusel horizontal con snap.
- **Navegación sobre imagen:** en el hero la nav va en hueso; al hacer scroll pasa a fondo hueso con texto tinta.
- **Parallax:** hero, fotos del manifesto, banda y galería mediante `data-parallax` y `--parallax-y`. Se desactiva con `prefers-reduced-motion: reduce`.
- **Vídeo:** `wod.mp4` arranca silenciado y en bucle cuando la sección se acerca al viewport; `hyfit.mp4` es click-to-play. Ambos usan `preload="none"`, poster WebP y botón de pausa/reproducción accesible. Los MP4 van sin pista de audio y con `faststart`.
- **Sección de coaches desactivada:** no hay entrenadores en la navegación ni en la página. En su lugar está “El box, sin filtros” con vídeo y galería. Para recuperarla, crear el bloque y añadir el enlace en `#nav`, menú móvil y footer.
- **Contacto:** la web es informativa, sin formulario. La sección `#contacto` ofrece llamada directa, WhatsApp, dirección y horario.

## Antes de publicar

1. **Completar datos legales** en `privacidad.html`: NIF, correo definitivo y revisión por asesoría. El correo `info@molisbox.com` es provisional.
2. **Confirmar tarifas, horarios y condiciones** con el box. La nota de `#precios` ya avisa de que deben consultarse.
3. **Dominio:** canonical, `og:url`, `og:image`, JSON-LD, `robots.txt` y `sitemap.xml` apuntan a `https://molisbox.com/`. Si el dominio final es otro, actualizar `index.html`, `privacidad.html` y el JSON-LD.
4. **Revisar** `robots.txt` y `sitemap.xml` tras confirmar el dominio. `privacidad.html` va en `noindex` y bloqueada en `robots.txt`; quitar ambas cosas solo si se quiere indexar.
5. **Fonts:** valorar autoalojar Anton, Inter Tight y JetBrains Mono para rendimiento y GDPR (hoy se piden a Google Fonts).
6. **Derechos de imagen:** confirmar autorización de las personas que aparecen en fotos y vídeos.

## Medios

Todas las fotos y vídeos vienen del material facilitado por Molis Box. Cada imagen se sirve en **AVIF** (primera opción), **WebP** (segunda) y **JPEG** (fallback) con `srcset`/`sizes` y el ancho adecuado a su hueco en pantalla.

- `hero.avif` / `hero-720.avif` · 1080×1350 y 720×900 (AVIF, WebP y JPEG).
- Manifiesto: `manifesto-a` 720/1080/1440 px y `disc-fullbody` 360/540/720 px como inset.
- `disc-*` y `gallery-*` en 360/540/720 px; `thumb-*.webp` 120×150 para la lista móvil.
- Banda: `band` 800/1200/1600 px y `disc-personal` 360/540/720 px en ≤900 px.
- `poster-wod-720.webp`, `poster-hyfit-720.webp`; `logo-mark-96/192.webp`; `favicon.png`, `apple-touch-icon.png` y `og.jpg` para redes.
- `logo-molis.jpg`, `logo-badge.webp`, `reel-wod.jpg` y `contact.jpg` son material de archivo y no se cargan en la página.

Los vídeos son verticales 720×1280, H.264 High, sin audio y con `faststart`: `wod.mp4` (≈11 s, 827 KB) y `hyfit.mp4` (≈14 s, 1,7 MB). Si se sustituyen, mantener relación vertical, recortar el audio y generar nuevos posters desde un frame.

### Rendimiento medido (local, sin caché)

| | Primera carga | Imágenes tras recorrer toda la página | Vídeo |
|---|---|---|---|
| Móvil 390 px | ~158 KB | ~49 KB | 828 KB (WOD) · 1,7 MB (Hyfit, solo al pulsar) |
| Escritorio 1440 px | ~211 KB | ~155 KB | 828 KB (WOD) · 1,7 MB (Hyfit, solo al pulsar) |

Los datos incluyen HTML, CSS, JS, fuentes de Google y posters. Las imágenes suponen un 70–90 % menos que los JPEG originales y los vídeos un 47 % menos. En producción conviene activar Brotli/gzip y caché larga para `assets/` desde el hosting.

## Accesibilidad

Skip link, `:focus-visible`, menú móvil con `inert` y cierre con `Escape`, pestañas de horario con roles ARIA, vídeos con etiqueta y botón, y movimiento reducido respetado. El contraste de textos pequeños se ajustó a AA sobre hueso, papel y tinta.
