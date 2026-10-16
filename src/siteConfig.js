// Production URL, e.g. https://your-domain.com (set VITE_SITE_URL in .env / your host's env vars).
// While it is empty, canonical links, og:url/og:image, structured-data URLs and the sitemap are omitted
// instead of guessing a domain.
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").trim().replace(/\/+$/, "");

// Put the PDF at public/Josue-Gutierrez-CV.pdf. The Download CV links only appear when the file exists.
export const CV = { href: "/Josue-Gutierrez-CV.pdf", filename: "Josue-Gutierrez-CV.pdf" };
