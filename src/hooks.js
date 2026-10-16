import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export const prefersReducedMotion = () => window.matchMedia(QUERY).matches;

// True only when `url` really exists and is served with a matching content type.
// (A SPA fallback answers 200 with text/html for missing files, hence the content-type check.)
const assetCache = new Map();
export function useAssetExists(url, mime) {
  const [exists, setExists] = useState(() => assetCache.get(url) ?? false);
  useEffect(() => {
    if (assetCache.has(url)) return;
    let alive = true;
    fetch(url, { method: "HEAD" })
      .then((r) => r.ok && (r.headers.get("content-type") || "").includes(mime))
      .catch(() => false)
      .then((ok) => {
        assetCache.set(url, ok);
        if (alive) setExists(ok);
      });
    return () => { alive = false; };
  }, [url, mime]);
  return exists;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  useEffect(() => {
    const m = window.matchMedia(QUERY);
    const onChange = () => setReduced(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
