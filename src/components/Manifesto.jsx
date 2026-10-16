import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks";

// Large statement whose words light up as it scrolls through the viewport.
export default function Manifesto({ text }) {
  const ref = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    const spans = [...el.children];
    if (prefersReducedMotion()) {
      spans.forEach((s) => { s.style.opacity = 1; });
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (r.height + vh * 0.4)));
      const lit = p * (spans.length + 3);
      spans.forEach((s, i) => { s.style.opacity = Math.min(1, Math.max(0.16, (lit - i) / 3)); });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className="manifesto">
      {words.map((w, i) => <span key={i}>{w} </span>)}
    </p>
  );
}
