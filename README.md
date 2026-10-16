# Josué Gutiérrez — Portfolio

Portfolio personal construido con React + Vite + React Router.

## Ejecutar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

`vite build` va seguido de `scripts/postbuild.mjs`, que genera HTML estático por ruta
(`dist/work/index.html`, `dist/work/<proyecto>/index.html`, …), `404.html`, `robots.txt` y,
si hay dominio configurado, `sitemap.xml`.

## Contenido

La información principal está centralizada en `src/data/portfolio.js`.
Títulos y descripciones SEO por página: `src/seo/meta.js` (los proyectos usan su `title` y `summary`).

## Dominio (SEO)

Copia `.env.example` a `.env` (o define la variable en tu hosting) cuando tengas el dominio:

```
VITE_SITE_URL=https://tu-dominio.com
```

Sin ese valor se omiten canonical, `og:url`, `og:image`, las URLs del JSON-LD y el sitemap
(el build lo avisa). No se inventa ningún dominio.

## CV

Coloca el PDF en `public/Josue-Gutierrez-CV.pdf`. Los botones «Download CV» (Home y About)
solo aparecen cuando el archivo existe.

## Iconos y vista previa

`public/favicon.svg`, `favicon.ico`, `favicon-48x48.png`, `icon-192.png`, `icon-512.png`,
`apple-touch-icon.png`, `site.webmanifest` y `og-image.png` (1200×630).

## Imágenes

- Home: `public/FondoNegro.webp` (con `FondoNegro.png` como respaldo)
- Proyectos: revisa `public/projects/IMAGE_GUIDE.md`. Si una imagen no existe, la interfaz usa una portada tipográfica.
