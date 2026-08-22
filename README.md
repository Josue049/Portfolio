# Josué Gutiérrez — Portfolio

Portfolio personal construido con React + Vite.

## Ejecutar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Contenido

La información principal está centralizada en:

`src/data/portfolio.js`

## Imágenes

- Desktop home: `public/FondoNegro.png`
- Mobile home: `public/FondoNegroMobile.jpg`
- Proyectos: revisa `public/projects/IMAGE_GUIDE.md`

Los case studies y la vista `/work` ya tienen espacios preparados para portada y galería. Si una imagen todavía no existe, la interfaz conserva el espacio como placeholder sin romper el layout.

## Responsive

Se trabajaron layouts específicos para desktop, tablet y móvil en Home, About, Work, Contact y Case Studies. La navegación lateral se convierte en una barra inferior centrada en móvil y se mantiene dentro del viewport.
