# Molis Box · Cross Training en Mos

Sitio de una página para **Molis Box**, box de cross training en Camiño Santiaguiño, 8 · 36417 Guizán, Mos (Pontevedra). HTML, CSS y JavaScript estáticos: sin framework, sin build y sin dependencias de npm.

```
index.html              · página principal (secciones, copia, SEO, JSON-LD)
privacidad.html         · aviso legal, privacidad y cookies
robots.txt              · indexación (privacidad.html excluida)
sitemap.xml             · mapa del sitio
assets/css/styles.css   · sistema visual, layout, responsive, parallax y motion
assets/js/app.js        · menú, reveals, scrollspy, horarios, parallax, vídeo y formulario
assets/img/             · fotos optimizadas, logo, posters y OG image
assets/video/           · reels verticales WOD e Hyfit
```

## Ver en local

```bash
python3 -m http.server 4173
# http://localhost:4173
```

No abras `index.html` con `file://`: los vídeos y algunas rutas necesitan servidor.

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

El horario de `#horarios` sigue la imagen de horarios facilitada por el box (L–V con varias franjas a las 19:00 y 20:00, sábado 10:00 + Open Box). Se renderiza desde el array `SCHEDULE` en `assets/js/app.js`; el día actual se selecciona automáticamente y las pestañas admiten flechas, `Home` y `End`.

## Diseño y comportamiento

- **Paleta:** naranja de marca `#f05a22`, tinta `#0b0b0b`, hueso `#f2efe8`, papel `#e7e2d7`. `--accent-ink` se usa para texto naranja pequeño sobre fondo claro (contraste AA).
- **Tipografía:** Anton (titulares), Inter Tight (texto) y JetBrains Mono (etiquetas). Se cargan desde Google Fonts. Cuerpo a 15–17px y etiquetas mono a 10–11.5px para lectura cómoda; textos de relleno reducidos al mínimo.
- **Estructura:** hero → marquee → 01 El box → 02 Disciplinas → 03 Horarios → 04 Tarifas → banda full-bleed → 05 En vivo → cita → 06 Contacto → footer.
- **Medios a pantalla completa:** el hero es una imagen a sangre de `100svh` con titular, entradilla, CTAs y datos superpuestos; el manifiesto usa dos fotos a sangre (~88svh) con el texto encima; los dos reels de “En vivo” ocupan el ancho completo a ~86svh con el titular integrado y la galería va a sangre. En ≤900px reels y galería pasan a carrusel horizontal con snap.
- **Navegación sobre imagen:** en el hero la nav va en hueso; al hacer scroll pasa a fondo hueso con texto tinta.
- **Parallax:** hero, fotos del manifesto, banda y galería mediante `data-parallax` y `--parallax-y`. Se desactiva con `prefers-reduced-motion: reduce`.
- **Vídeo:** `wod.mp4` arranca silenciado y en bucle; `hyfit.mp4` es click-to-play con poster y `preload="none"`. Ambos tienen botón de pausa/reproducción accesible.
- **Sección de coaches desactivada:** no hay entrenadores en la navegación ni en la página. En su lugar está “El box, sin filtros” con vídeo y galería. Para recuperarla, crear el bloque y añadir el enlace en `#nav`, menú móvil y footer.
- **Formulario:** validación en cliente y estado de éxito. **No envía datos todavía** (ver abajo).

## Antes de publicar

1. **Conectar el formulario** a un endpoint real (Formspree, Resend, Cloudflare Worker o API propia) en el handler `submit` de `assets/js/app.js`. Hoy solo muestra `#formSuccess`.
2. **Completar datos legales** en `privacidad.html`: NIF, correo definitivo y revisión por asesoría. El correo `info@molisbox.com` es provisional.
3. **Confirmar tarifas, horarios y condiciones** con el box. La nota de `#precios` ya avisa de que deben consultarse.
4. **Dominio:** canonical, `og:url`, `og:image`, JSON-LD, `robots.txt` y `sitemap.xml` apuntan a `https://molisbox.com/`. Si el dominio final es otro, actualizar `index.html`, `privacidad.html` y el JSON-LD.
5. **Revisar** `robots.txt` y `sitemap.xml` tras confirmar el dominio. `privacidad.html` va en `noindex` y bloqueada en `robots.txt`; quitar ambas cosas solo si se quiere indexar.
6. **Fonts:** valorar autoalojar Anton, Inter Tight y JetBrains Mono para rendimiento y GDPR (hoy se piden a Google Fonts).

## Medios

Todas las fotos y vídeos vienen del material facilitado por Molis Box y están optimizados en `assets/img` y `assets/video`.

- `hero.jpg` / `hero-720.jpg` · 1080×1350 y 720×900
- `manifesto-a.jpg` (1440×900), `manifesto-b.jpg` (900×1200)
- `disc-*.jpg` (720×900) + `thumb-*.jpg` para la lista de disciplinas
- `band.jpg` (1600×900), `gallery-a/b/c.jpg` (720×900)
- `poster-wod.jpg`, `poster-hyfit.jpg`, `reel-wod.jpg`
- `logo-molis.jpg` (original), `logo-mark.webp`, `logo-badge.webp`, `favicon.png`, `apple-touch-icon.png`, `og.jpg`

Los vídeos son verticales 720×1280: `wod.mp4` (≈11 s, 1,2 MB) y `hyfit.mp4` (≈14 s, 3,6 MB). Si se sustituyen, mantener relación vertical y generar nuevos posters desde un frame.

## Accesibilidad

Skip link, `:focus-visible`, menú móvil con `inert` y cierre con `Escape`, pestañas de horario con roles ARIA, errores de formulario anunciados con `aria-live`, vídeos con etiqueta y botón, y movimiento reducido respetado. El contraste de textos pequeños se ajustó a AA sobre hueso, papel y tinta.
