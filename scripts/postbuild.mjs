// Runs after `vite build`. Static host-friendly SEO output, no server or headless browser needed:
//  - dist/<route>/index.html for every public route, with its own <title>, description, canonical,
//    Open Graph / Twitter tags and JSON-LD (so crawlers and link previews that don't run JS see them,
//    and direct loads work on hosts without SPA fallback)
//  - the rendered body of every route (react-dom/static via dist-ssr), so the content is in the initial HTML
//  - dist/404.html (noindex), dist/sitemap.xml and dist/robots.txt
// The site URL comes from VITE_SITE_URL (env var or .env). Without it, URL-dependent tags and the
// sitemap are skipped rather than guessed.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { loadEnv } from "vite";
import { getMeta, listRoutes, renderHead } from "../src/seo/meta.js";

const dist = "dist";
const ssrDir = "dist-ssr";
const env = loadEnv("production", process.cwd(), "");
const siteUrl = (process.env.VITE_SITE_URL ?? env.VITE_SITE_URL ?? "").trim().replace(/\/+$/, "");

const template = readFileSync(join(dist, "index.html"), "utf8");
const block = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!block.test(template)) throw new Error("index.html is missing the <!--seo:start--> … <!--seo:end--> block");

const { render } = await import(pathToFileURL(join(process.cwd(), ssrDir, "entry-server.js")).href);
const emptyRoot = '<div id="root"></div>';
if (!template.includes(emptyRoot)) throw new Error('index.html is missing <div id="root"></div>');

const page = (meta, extraHead = "", body = "") =>
  template
    .replace(block, `<!--seo:start-->\n    ${renderHead(meta, siteUrl)}${extraHead}\n    <!--seo:end-->`)
    .replace(emptyRoot, body ? `<div id="root" data-prerender>${body}</div>` : emptyRoot);
const write = (file, content) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

const preload = '\n    <link rel="preload" as="image" href="/FondoNegro.webp" type="image/webp" fetchpriority="high" />';
const routes = listRoutes();
for (const route of routes) {
  const file = route === "/" ? join(dist, "index.html") : join(dist, route, "index.html");
  write(file, page(getMeta(route), route === "/" ? preload : "", await render(route)));
}
write(join(dist, "404.html"), page(getMeta("/404-not-found")));

const robots = ["User-agent: *", "Allow: /", ...(siteUrl ? ["", `Sitemap: ${siteUrl}/sitemap.xml`] : [])].join("\n") + "\n";
write(join(dist, "robots.txt"), robots);

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((r) => `  <url>\n    <loc>${siteUrl}${r === "/" ? "/" : r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join("\n");
  write(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  console.log(`SEO: ${routes.length} routes prerendered, sitemap.xml and robots.txt written for ${siteUrl}`);
} else {
  console.warn(`SEO: ${routes.length} routes prerendered. VITE_SITE_URL is not set, so canonical links, og:url/og:image and sitemap.xml were skipped.`);
}

if (!existsSync(join(dist, "Josue-Gutierrez-CV.pdf"))) {
  console.warn("CV: public/Josue-Gutierrez-CV.pdf not found. The Download CV buttons stay hidden until you add it.");
}

rmSync(ssrDir, { recursive: true, force: true });
