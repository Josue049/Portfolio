export const loadWork = () => import("./pages/work");
export const loadAbout = () => import("./pages/about");
export const loadContact = () => import("./pages/contact");
export const loadCaseStudy = () => import("./pages/caseStudy");
export const loadNotFound = () => import("./pages/notFound");

// Resolves once the lazy page chunk for `pathname` is loaded, so hydrating over the prerendered
// HTML never flashes an empty <main>.
export function preloadRoute(pathname) {
  const path = pathname.replace(/\/+$/, "");
  if (path === "") return Promise.resolve();
  if (path === "/work") return loadWork();
  if (path.startsWith("/work/")) return loadCaseStudy();
  if (path === "/about") return loadAbout();
  if (path === "/contact") return loadContact();
  return loadNotFound();
}
