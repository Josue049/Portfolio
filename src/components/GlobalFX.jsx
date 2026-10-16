import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks";

// Site-wide soft presence that follows the cursor: three glows chained with different inertia
// (a liquid "tail"), stretched along the pointer's velocity. One fixed, quarter-resolution canvas,
// so no CSS blur is needed. The blend mode adapts to the section under the cursor:
// "screen" on dark sections (adds light), "multiply" on light ones (adds a pale tint).
// It fades over photos/covers, never intercepts events, stops drawing once settled, and is not
// mounted at all on touch devices or with prefers-reduced-motion.
const SCALE = 0.25;
const TRAIL = [
  { k: 0.14, r: 170, a: 0.22 },
  { k: 0.07, r: 240, a: 0.14 },
  { k: 0.035, r: 320, a: 0.09 },
];
const THEMES = {
  dark: { colors: ["110,200,205", "92,112,224", "110,200,205"], gain: 1 },
  light: { colors: ["150,225,225", "150,176,240", "150,225,225"], gain: 1.4 },
};
const DARK_SELECTOR = ".on-dark, .menu";
const QUIET_SELECTOR = "[data-fx-quiet], .hero__photo, .cover, figure";

export default function GlobalFX() {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || prefersReducedMotion()) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const target = { x: -999, y: -999 };
    const pts = TRAIL.map(() => ({ x: -999, y: -999 }));
    let w = 1, h = 1, raf = 0, mode = "dark", switching = false, started = false;
    let quiet = 0, quietTarget = 0, vx = 0, vy = 0;

    const resize = () => {
      w = Math.max(2, Math.ceil(window.innerWidth * SCALE));
      h = Math.max(2, Math.ceil(window.innerHeight * SCALE));
      canvas.width = w;
      canvas.height = h;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (!started) return;
      const theme = THEMES[mode];
      const speed = Math.min(1, Math.hypot(vx, vy) / 40);
      const angle = Math.atan2(vy, vx);
      TRAIL.forEach((c, i) => {
        const r = c.r * SCALE;
        const alpha = c.a * theme.gain * (1 - quiet * 0.8);
        ctx.save();
        ctx.translate(pts[i].x * SCALE, pts[i].y * SCALE);
        ctx.rotate(angle);
        ctx.scale(1 + speed * (i === 0 ? 0.9 : 0.5), 1 / Math.sqrt(1 + speed * 0.7));
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
        g.addColorStop(0, `rgba(${theme.colors[i]},${alpha})`);
        g.addColorStop(1, `rgba(${theme.colors[i]},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(-r, -r, r * 2, r * 2);
        ctx.restore();
      });
    };

    const loop = () => {
      let moving = false;
      let prev = target;
      pts.forEach((p, i) => {
        const dx = (prev.x - p.x) * TRAIL[i].k;
        const dy = (prev.y - p.y) * TRAIL[i].k;
        p.x += dx;
        p.y += dy;
        if (i === 0) { vx += (dx - vx) * 0.3; vy += (dy - vy) * 0.3; }
        if (Math.abs(prev.x - p.x) + Math.abs(prev.y - p.y) > 0.4) moving = true;
        prev = p;
      });
      quiet += (quietTarget - quiet) * 0.12;
      if (Math.abs(quietTarget - quiet) > 0.01) moving = true;
      draw();
      raf = moving ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const setMode = (next, instant) => {
      if (next === mode || switching) return;
      if (instant) { mode = next; canvas.dataset.mode = next; return; }
      switching = true;
      canvas.style.opacity = "0";
      setTimeout(() => { mode = next; canvas.dataset.mode = next; canvas.style.opacity = "1"; switching = false; }, 180);
    };
    const inspect = (el, instant) => {
      if (!el || !el.closest) return;
      setMode(el.closest(DARK_SELECTOR) ? "dark" : "light", instant);
      quietTarget = el.closest(QUIET_SELECTOR) ? 1 : 0;
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!started) {
        started = true;
        pts.forEach((p) => { p.x = target.x; p.y = target.y; });
        inspect(e.target, true);
      } else {
        inspect(e.target, false);
      }
      canvas.style.opacity = switching ? "0" : "1";
      kick();
    };
    // Page scrolls under a still cursor: re-evaluate which section it is over.
    let scrollRaf = 0;
    const onScroll = () => {
      if (!started || scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        inspect(document.elementFromPoint(target.x, target.y), false);
        kick();
      });
    };
    const onLeave = (e) => { if (!e.relatedTarget) canvas.style.opacity = "0"; };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="fx" data-mode="dark" aria-hidden="true" />;
}
