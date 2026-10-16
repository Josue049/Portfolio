import { useEffect, useRef } from "react";
import { TLink } from "./TLink";
import ProjectCover from "./ProjectCover";
import { prefersReducedMotion } from "../hooks";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// Vertical two-column gallery. A single rAF-throttled scroll handler writes --p (signed distance
// from viewport center, -1..1) and --a (its absolute value) on each item; CSS turns them into
// perspective tilt, parallax and scale. Layout never changes, only transforms.
export default function ProjectGallery({ items }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const nodes = [...rootRef.current.querySelectorAll("[data-gitem]")];
    const reduced = prefersReducedMotion();
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const k = window.innerWidth < 800 ? 0.4 : 1; // gentler on small screens
      const reads = nodes.map((el) => el.getBoundingClientRect());
      nodes.forEach((el, i) => {
        const r = reads[i];
        if (r.bottom < -vh * 0.6 || r.top > vh * 1.6) return; // far off-screen
        const p = reduced ? 0 : clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1) * k;
        el.style.setProperty("--p", p.toFixed(3));
        el.style.setProperty("--a", Math.abs(p).toFixed(3));
      });
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
  }, [items]);

  return (
    <ul ref={rootRef} className="ggrid">
      {items.map((p) => (
        <li key={p.id} className="gitem" data-gitem>
          <TLink to={`/work/${p.id}`} vtName={`cover-${p.id}`} data-cursor="View" className="gcard">
            <div className="gcard__tilt">
              <ProjectCover project={p} />
              <span className="gcard__arrow" aria-hidden="true">↗</span>
            </div>
            <div className="gcard__meta">
              <h3>{p.title}</h3>
              <p className="gcard__cat">{p.eyebrow} · {p.year}</p>
              <ul className="chips" aria-label="Technologies">
                {p.tech.slice(0, 5).map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </TLink>
        </li>
      ))}
    </ul>
  );
}
