import { useEffect, useRef, useState } from "react";
import { TLink } from "./TLink";

// Editorial project index. Each row is a big title; on pointer devices a floating "app window"
// preview follows the cursor and shows the hovered project's thumbnail (project.image). On touch
// devices every row shows its thumbnail inline. Missing images fall back to a neutral frame that
// carries the project's own title, never invented artwork.
const OFFSET = { x: 36, y: -120 };

function Shot({ project, className = "" }) {
  const [ok, setOk] = useState(false);
  const label = project.live ? project.live.replace(/^https?:\/\/(www\.)?/, "") : project.title;
  return (
    <div className={`shot ${ok ? "has-image" : ""} ${className}`}>
      <div className="shot__bar" aria-hidden="true"><i /><i /><i /><span>{label}</span></div>
      <div className="shot__screen">
        <img src={project.image} alt="" loading="lazy" decoding="async" onLoad={() => setOk(true)} onError={() => setOk(false)} />
        <span className="shot__empty" aria-hidden="true">{project.title}</span>
      </div>
    </div>
  );
}

export default function ProjectList({ items }) {
  const [active, setActive] = useState(null);
  const previewRef = useRef(null);
  const moveRef = useRef(null);

  useEffect(() => {
    const el = previewRef.current;
    const s = { x: 0, y: 0, tx: 0, ty: 0, raf: 0, seen: false };
    const place = () => {
      s.raf = 0;
      s.x += (s.tx - s.x) * 0.16;
      s.y += (s.ty - s.y) * 0.16;
      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      if (Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > 0.3) s.raf = requestAnimationFrame(place);
    };
    moveRef.current = (x, y) => {
      const w = el.offsetWidth || 360;
      const h = el.offsetHeight || 260;
      s.tx = Math.min(window.innerWidth - w - 16, Math.max(16, x + OFFSET.x));
      s.ty = Math.min(window.innerHeight - h - 16, Math.max(16, y + OFFSET.y));
      if (!s.seen) { s.x = s.tx; s.y = s.ty; s.seen = true; }
      if (!s.raf) s.raf = requestAnimationFrame(place);
    };
    return () => cancelAnimationFrame(s.raf);
  }, []);

  const onFocus = (id, e) => {
    setActive(id);
    const r = e.currentTarget.getBoundingClientRect();
    moveRef.current?.(r.left + r.width * 0.55, r.top + r.height / 2);
  };

  return (
    <div className="plist" onPointerMove={(e) => moveRef.current?.(e.clientX, e.clientY)} onPointerLeave={() => setActive(null)}>
      <ul>
        {items.map((p, i) => (
          <li key={p.id} className={active === p.id ? "is-active" : active ? "is-dim" : ""}>
            <TLink
              to={`/work/${p.id}`}
              className="prow"
              onPointerEnter={() => setActive(p.id)}
              onFocus={(e) => onFocus(p.id, e)}
              onBlur={() => setActive(null)}
            >
              <span className="prow__num">{String(i + 1).padStart(2, "0")}</span>
              <span className="prow__main">
                <span className="prow__title">{p.title}</span>
                <span className="prow__cat">{p.eyebrow}</span>
              </span>
              <span className="prow__year">{p.year}</span>
              <span className="prow__arrow" aria-hidden="true">↗</span>
              <Shot project={p} className="shot--inline" />
            </TLink>
          </li>
        ))}
      </ul>
      <div ref={previewRef} className={`plist__preview${active ? " is-on" : ""}`} aria-hidden="true">
        {items.map((p) => (
          <div key={p.id} className={`plist__slide${active === p.id ? " is-on" : ""}`}><Shot project={p} /></div>
        ))}
      </div>
    </div>
  );
}
