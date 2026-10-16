import { useEffect, useRef } from "react";

// Round label that follows the pointer over elements with data-cursor="…".
export default function ViewCursor() {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    let x = -200, y = -200, tx = -200, ty = -200, raf = 0, label = "";

    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target.closest?.("[data-cursor]");
      const next = target ? target.dataset.cursor : "";
      if (next !== label) {
        label = next;
        if (next) el.textContent = next;
        el.classList.toggle("is-on", Boolean(next));
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
