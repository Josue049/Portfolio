import { useEffect, useRef } from "react";

// Pulls its child slightly toward the pointer. Fine pointers only.
export default function Magnetic({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.25;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const reset = () => { el.style.transform = ""; };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", reset); };
  }, []);
  return <span ref={ref} className="magnetic">{children}</span>;
}
