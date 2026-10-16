# Josué Gutiérrez — Portfolio

**Software Engineering · Full-Stack Development · Artificial Intelligence**

A personal portfolio showcasing selected software projects, technical experience, and a passion for building thoughtful digital products. Built as an interactive, editorial-style experience where clean design meets creative engineering.

![Portfolio social preview](public/og-image.png)

> **Status:** In active development. A public production URL will be added after deployment.

## Overview

This website brings together my work across full-stack applications, applied AI, digital platforms, and experimental projects. Instead of a conventional project list, it emphasizes visual storytelling, motion, and detailed case studies—without sacrificing accessibility or usability.

### Highlights

- **Interactive homepage** with personal photography, an animated introduction, and clear navigation.
- **Selected work** presented through an image-led project gallery and individual case studies.
- **Motion-driven interactions** including scroll-based reveals and subtle depth effects.
- **About and contact sections** covering my interests, technologies, and professional links.
- **Responsive layouts** for desktop, tablet, and mobile screens.
- **Search and social sharing foundations** including site metadata, favicons, and an Open Graph image.
- **Downloadable résumé** accessible from the website.

## Tech stack

| Area | Technology |
| --- | --- |
| UI | React 19 |
| Build tooling | Vite 8 |
| Routing | React Router 7 |
| Styling | CSS Modules and CSS |
| Code quality | ESLint |
| Animations | CSS and browser-based interactions |

## Getting started

**Requirements:** Node.js compatible with Vite 8 (Node.js **20.19+** or **22.12+**) and npm.

```bash
# Clone your repository
# git clone <YOUR_REPOSITORY_URL>
# cd <YOUR_REPOSITORY_FOLDER>

npm install
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Generate the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
public/
├── projects/              # Project screenshots and image guidance
├── tech/                  # Technology logo assets
├── favicon.svg            # Brand favicon (JG.)
├── og-image.png           # Social sharing image
└── Josue-Gutierrez-CV.pdf # Downloadable résumé
src/
├── components/            # Shared UI and navigation
├── data/
│   └── portfolio.js       # Profile information and project content
├── pages/                 # Home, work, about, contact, case studies
├── styles/                # Shared and page-specific CSS modules
├── App.jsx                # Application composition and routing
└── main.jsx               # React entry point
```

> The tree summarizes the current portfolio structure. Some assets were added after the initial project archive; confirm their presence in your local working copy.

## Content and assets

Profile information, external links, and project details are maintained in `src/data/portfolio.js`.

- Update **project images** under `public/projects/`. Refer to `public/projects/IMAGE_GUIDE.md` for the expected filenames.
- Replace the **résumé PDF** at `public/Josue-Gutierrez-CV.pdf` with the latest version when needed.
- Keep the **favicon and Open Graph image** consistent with the JG. visual identity.
- Do not commit private keys, passwords, or sensitive credentials.

## SEO and deployment

For production builds, configure the site's real public URL so canonical links and other generated SEO references point to the correct domain.

1. Copy `.env.example` to `.env` if the example file exists in your current branch.
2. Set the environment variable using **your actual deployed origin** (without a trailing slash):

```env
VITE_SITE_URL=https://your-real-domain.example
```

3. Run `npm run build` and verify the generated output.
4. Deploy `dist/` to your static hosting provider (for example, Vercel).
5. Configure **SPA route fallback** so direct visits to `/work`, `/about`, `/contact`, and `/work/:slug` resolve correctly.
6. Submit the published sitemap through [Google Search Console](https://search.google.com/search-console/), once the production domain is configured.

**Note:** SEO configuration helps discovery but does not guarantee a specific Google ranking.

## Contact

- [GitHub](https://github.com/Josue049)
- [LinkedIn](https://www.linkedin.com/in/josuegutierrezcuellar/)
- [Hugging Face](https://huggingface.co/MrJosue09)

## Rights and attribution

This repository contains original portfolio code, personal content, and project imagery. Third-party trademarks and technology logos belong to their respective owners.

No open-source license is declared here. If you intend to allow reuse, add a `LICENSE` file with the terms you choose.

---

**Designed and developed by Josué Gutiérrez.**
