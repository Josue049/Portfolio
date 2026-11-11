import { useEffect } from "react";
import { prefersReducedMotion } from "../hooks";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
// Elements that get the lens distortion.
const TARGETS = ".reveal, .section__head, .about__portrait, .case__hero, .case__meta, .site-footer__inner, main h2, main h3, main p:not(.rise), main .chips, main .btn, .site-footer p";

// Fisheye-on-scroll. Every target is treated as a point on a lens centered in the viewport:
// --p / --px are its signed vertical / horizontal offset from the center (-1..1) and --d the radial
// distance. CSS bulges what is near the center and curves, shrinks and pulls the edges inward
// (barrel distortion). --k is the lens strength: driven only by scroll velocity,
// so it is zero (no distortion) when the page is still. Layout never changes, only transforms.
export default function Scroll3D({ pathname }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let nodes = [];
    let raf = 0;
    let lastY = window.scrollY;
    let v = 0;

    const collect = () => {
      nodes = [...document.querySelectorAll(TARGETS)];
      nodes.forEach((el) => el.classList.add("s3d"));
    };

    const frame = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const speed = clamp(Math.abs(y - lastY) / 35, 0, 1);
      lastY = y;
      v += (speed - v) * 0.18;
      if (v < 0.01) v = 0; // fully at rest: no distortion
      const small = vw < 800 ? 0.6 : 1;
      const k = 1.7 * v * small; // zero when the page is still
      const reads = nodes.map((el) => el.getBoundingClientRect());
      nodes.forEach((el, i) => {
        const r = reads[i];
        if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return;
        const p = clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1);
        const px = clamp((r.left + r.width / 2 - vw / 2) / vw, -1, 1);
        el.style.setProperty("--p", p.toFixed(3));
        el.style.setProperty("--px", px.toFixed(3));
        el.style.setProperty("--d", clamp(Math.hypot(p, px), 0, 1).toFixed(3));
        el.style.setProperty("--k", k.toFixed(3));
      });
      if (v > 0) raf = requestAnimationFrame(frame); // keep easing back to rest after scrolling stops
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

    collect();
    frame();
    // Routes are lazy-loaded and the page prerendered: pick up nodes as they mount.
    let moRaf = 0;
    const mo = new MutationObserver(() => {
      if (moRaf) return;
      moRaf = requestAnimationFrame(() => { moRaf = 0; collect(); kick(); });
    });
    mo.observe(document.getElementById("main") || document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      mo.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(moRaf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, [pathname]);

  return null;
}
