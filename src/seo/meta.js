// Single source of truth for per-route SEO. Used at runtime (client-side navigation) and by
// scripts/postbuild.mjs (static head tags for every route). Keep this file free of browser APIs.
import { profile, projects } from "../data/portfolio.js";

export const SITE_NAME = "Josué Gutiérrez";
export const OG_IMAGE = { path: "/og-image.png", width: 1200, height: 630, alt: "Josué Gutiérrez — Software Engineer & Full-Stack Developer" };

const clip = (text, max = 160) => (text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`);

const STATIC = {
  "/": {
    title: "Josué Gutiérrez | Software Engineer & Full-Stack Developer",
    description: "Portfolio of Josué Gutiérrez, a software engineer from Lima, Perú focused on full-stack development and applied AI. Selected projects, experience and contact.",
  },
  "/work": {
    title: "Projects | Josué Gutiérrez, Software Engineer",
    description: "Selected projects by Josué Gutiérrez: an AI and IoT irrigation pilot, a full-stack community platform, computer vision, realtime backend services and an award-winning educational game.",
  },
  "/about": {
    title: "About Josué Gutiérrez | Software Engineer & Full-Stack Developer",
    description: "Software Engineering student, full-stack developer and AI builder based in Lima, Perú. Experience, education, awards and the technologies Josué Gutiérrez works with.",
  },
  "/contact": {
    title: "Contact Josué Gutiérrez | Software Engineer",
    description: "Get in touch with Josué Gutiérrez about collaborations, internships and projects in full-stack development and applied AI. Find him on LinkedIn, GitHub and Hugging Face.",
  },
};

const normalize = (pathname) => pathname.replace(/\/+$/, "") || "/";

export function getMeta(pathname) {
  const path = normalize(pathname);
  if (STATIC[path]) return { ...STATIC[path], path };

  const match = path.match(/^\/work\/([^/]+)$/);
  const project = match && projects.find((p) => p.id === decodeURIComponent(match[1]));
  if (project) {
    return {
      title: `${project.title} — Case Study | ${SITE_NAME}`,
      description: clip(project.summary),
      path,
    };
  }
  return {
    title: `Page not found | ${SITE_NAME}`,
    description: "The page you are looking for does not exist. Browse the portfolio of Josué Gutiérrez, software engineer.",
    path,
    noindex: true,
  };
}

// Every public, indexable route (used for static head tags and the sitemap).
export function listRoutes() {
  return [...Object.keys(STATIC), ...projects.map((p) => `/work/${p.id}`)];
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function structuredData(siteUrl) {
  const personId = siteUrl ? `${siteUrl}/#person` : undefined;
  const person = {
    "@type": "Person",
    ...(personId && { "@id": personId }),
    name: profile.name,
    alternateName: ["Josué Gutiérrez", "Josue Gutierrez"],
    jobTitle: "Software Engineer",
    description: profile.intro,
    ...(siteUrl && { url: siteUrl, image: `${siteUrl}${OG_IMAGE.path}` }),
    address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
    knowsAbout: profile.stack,
    sameAs: Object.values(profile.socials),
  };
  const website = {
    "@type": "WebSite",
    ...(siteUrl && { "@id": `${siteUrl}/#website`, url: siteUrl }),
    name: `${SITE_NAME} — Portfolio`,
    inLanguage: "en",
    ...(personId && { author: { "@id": personId }, publisher: { "@id": personId } }),
  };
  return { "@context": "https://schema.org", "@graph": [person, website] };
}

// Head tags for one route, as an HTML string (build time).
export function renderHead(meta, siteUrl) {
  const pageUrl = siteUrl ? `${siteUrl}${meta.path === "/" ? "/" : meta.path}` : "";
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    meta.noindex ? `<meta name="robots" content="noindex" />` : "",
    siteUrl && !meta.noindex ? `<link rel="canonical" href="${pageUrl}" />` : "",
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    siteUrl ? `<meta property="og:url" content="${pageUrl}" />` : "",
    siteUrl ? `<meta property="og:image" content="${siteUrl}${OG_IMAGE.path}" />` : "",
    siteUrl ? `<meta property="og:image:width" content="${OG_IMAGE.width}" />` : "",
    siteUrl ? `<meta property="og:image:height" content="${OG_IMAGE.height}" />` : "",
    siteUrl ? `<meta property="og:image:alt" content="${esc(OG_IMAGE.alt)}" />` : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    siteUrl ? `<meta name="twitter:image" content="${siteUrl}${OG_IMAGE.path}" />` : "",
    !meta.noindex
      ? `<script type="application/ld+json">${JSON.stringify(structuredData(siteUrl)).replace(/</g, "\\u003c")}</script>`
      : "",
  ];
  return tags.filter(Boolean).join("\n    ");
}

// Runtime: keep the head in sync on client-side navigation.
export function applyMeta(meta, siteUrl) {
  const doc = document;
  const set = (selector, create, attr, value) => {
    let el = doc.head.querySelector(selector);
    if (value == null || value === "") { el?.remove(); return; }
    if (!el) { el = create(); doc.head.appendChild(el); }
    el.setAttribute(attr, value);
  };
  const metaTag = (key, name) => () => { const el = doc.createElement("meta"); el.setAttribute(key, name); return el; };
  const url = siteUrl ? `${siteUrl}${meta.path === "/" ? "/" : meta.path}` : "";

  doc.title = meta.title;
  set('meta[name="description"]', metaTag("name", "description"), "content", meta.description);
  set('meta[name="robots"]', metaTag("name", "robots"), "content", meta.noindex ? "noindex" : "");
  set('link[rel="canonical"]', () => { const el = doc.createElement("link"); el.rel = "canonical"; return el; }, "href", meta.noindex ? "" : url);
  set('meta[property="og:title"]', metaTag("property", "og:title"), "content", meta.title);
  set('meta[property="og:description"]', metaTag("property", "og:description"), "content", meta.description);
  set('meta[property="og:url"]', metaTag("property", "og:url"), "content", url);
  set('meta[name="twitter:title"]', metaTag("name", "twitter:title"), "content", meta.title);
  set('meta[name="twitter:description"]', metaTag("name", "twitter:description"), "content", meta.description);
}
