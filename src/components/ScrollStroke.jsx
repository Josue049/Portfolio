import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks";

// Two hand-drawn paths (desktop / mobile). Each lives fully inside its viewBox with margins larger
// than the stroke, and the SVG uses "meet", so nothing is ever cropped at the section edges.
// Drawn with dasharray/dashoffset from real scroll progress (eased, reversible); content sits on top.
const VARIANTS = [
  {
    id: "d",
    viewBox: "0 0 1200 520",
    stroke: 40,
    d: "M70 430 C220 500 400 470 470 360 C540 250 460 110 340 120 C240 128 230 260 340 290 C480 330 600 200 720 180 C860 156 960 260 1010 360 C1050 440 1100 450 1140 400",
  },
  {
    id: "m",
    viewBox: "0 0 400 640",
    stroke: 26,
    d: "M44 596 C44 520 150 540 200 470 C260 390 120 330 130 250 C140 170 300 190 340 120 C358 88 352 56 330 44",
  },
];

export default function ScrollStroke({ className = "", children }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const paths = [...section.querySelectorAll("path[data-stroke]")];
    const setProgress = (p) => paths.forEach((el) => { el.style.strokeDashoffset = (1.05 * (1 - p)).toFixed(4); });
    if (prefersReducedMotion()) { setProgress(1); return; }

    let current = 0, target = 0, raf = 0;
    const measure = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      target = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height * 0.85 + vh * 0.2)));
    };
    const loop = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0007) current = target;
      setProgress(current);
      raf = current === target ? 0 : requestAnimationFrame(loop);
    };
    const onScroll = () => { measure(); if (!raf) raf = requestAnimationFrame(loop); };

    measure();
    current = target;
    setProgress(current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`stroke ${className}`}>
      {VARIANTS.map((v) => (
        <svg key={v.id} className={`stroke__svg stroke__svg--${v.id}`} viewBox={v.viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={`stroke-grad-${v.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#86e6df" />
              <stop offset="1" stopColor="#9bc8ff" />
            </linearGradient>
          </defs>
          <path
            data-stroke
            d={v.d}
            pathLength="1"
            fill="none"
            stroke={`url(#stroke-grad-${v.id})`}
            strokeWidth={v.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.62"
            strokeDasharray="1 1.1"
            strokeDashoffset="1.05"
          />
        </svg>
      ))}
      <div className="stroke__content">{children}</div>
    </section>
  );
}
