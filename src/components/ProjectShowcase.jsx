import { useCallback, useEffect, useRef, useState } from "react";
import { TLink } from "./TLink";
import { showcaseFor } from "../data/showcase";

// Featured Work carousel. The selection mechanic is a coverflow-style shelf: the active project sits
// large in the centre, neighbours shrink and recede on both sides, and the section background
// crossfades to the atmosphere of the active project. Only transform/opacity are animated.

// Horizontal position (in card widths) and scale for |offset| = 0..4, so gaps stay even.
const X = [0, 0.88, 1.52, 2.05, 2.5];
const S = [1, 0.64, 0.52, 0.42, 0.36];
const O = [1, 0.8, 0.5, 0.28, 0];
const VISIBLE = 3;

const pad = (n) => String(n).padStart(2, "0");

// Resolves to the first source that really loads (missing files fall back to the typographic art).
const probes = new Map();
const probe = (url) => {
  if (!probes.has(url)) {
    probes.set(url, new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    }));
  }
  return probes.get(url);
};

function useFirstImage(sources, enabled) {
  const key = sources.filter(Boolean).join("|");
  const [src, setSrc] = useState(null);
  useEffect(() => {
    if (!enabled || !key) return;
    let alive = true;
    (async () => {
      for (const s of key.split("|")) {
        if (await probe(s)) { if (alive) setSrc(s); return; }
      }
    })();
    return () => { alive = false; };
  }, [key, enabled]);
  return src;
}

const toneStyle = (cfg) => ({ "--ac": cfg.accent, "--deep": cfg.deep });

function Poster({ project, index, near }) {
  const cfg = showcaseFor(project.id);
  const src = useFirstImage([project.image], near);
  return (
    <div className={`poster${src ? " has-image" : ""}`} style={toneStyle(cfg)} aria-hidden="true">
      <div className={`art art--${cfg.art}`} />
      {src && <img className="poster__img" src={src} alt="" draggable={false} decoding="async" style={{ objectPosition: cfg.focus }} />}
      <div className="poster__shade" />
      <div className="poster__top"><span>{pad(index + 1)}</span><span>{project.year}</span></div>
      {!src && cfg.mark && <div className="poster__mark">{cfg.mark}</div>}
      <div className="poster__foot">
        <span className="poster__eyebrow">{project.eyebrow}</span>
        <strong>{project.title}</strong>
      </div>
    </div>
  );
}

function Backdrop({ project, active, near }) {
  const cfg = showcaseFor(project.id);
  const src = useFirstImage([project.gallery?.[0], project.image], near);
  return (
    <div className={`sc-bg__layer${active ? " is-on" : ""}`} style={toneStyle(cfg)}>
      <div className="sc-bg__in">
        <div className={`art art--${cfg.art} art--bg`} />
        {src && <img src={src} alt="" draggable={false} decoding="async" />}
      </div>
    </div>
  );
}

export default function ProjectShowcase({ items }) {
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const inView = useRef(false);
  const drag = useRef(null);
  const justDragged = useRef(false);
  const wheelLock = useRef(0);
  const last = items.length - 1;

  const go = useCallback((i) => setActive((cur) => Math.max(0, Math.min(last, typeof i === "function" ? i(cur) : i))), [last]);

  // Keyboard works whenever the section is on screen; vertical scroll is never intercepted.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { inView.current = e.isIntersecting; }, { threshold: 0.35 });
    io.observe(rootRef.current);
    const onKey = (e) => {
      if (!inView.current || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      if (t?.closest?.("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight") { go((c) => c + 1); e.preventDefault(); }
      else if (e.key === "ArrowLeft") { go((c) => c - 1); e.preventDefault(); }
      else if (e.key === "Home" && t === document.body) go(0);
      else if (e.key === "End" && t === document.body) go(last);
    };
    window.addEventListener("keydown", onKey);
    return () => { io.disconnect(); window.removeEventListener("keydown", onKey); };
  }, [go, last]);

  // Trackpad horizontal swipes.
  useEffect(() => {
    const el = stageRef.current;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 24) return;
      const now = performance.now();
      if (now - wheelLock.current < 450) return;
      wheelLock.current = now;
      go((c) => c + Math.sign(e.deltaX));
    };
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, [go]);

  // Pointer drag (mouse + touch). touch-action: pan-y keeps vertical page scroll native.
  const setDrag = (px) => trackRef.current?.style.setProperty("--drag", `${px}px`);
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, dx: 0, on: false, t: performance.now() };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x0;
    if (!d.on) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(e.clientY - d.y0)) return;
      d.on = true;
      stageRef.current.setPointerCapture(e.pointerId);
      stageRef.current.classList.add("is-drag");
    }
    d.dx = dx;
    setDrag(dx * 0.6);
  };
  const endDrag = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.on) return;
    stageRef.current.classList.remove("is-drag");
    setDrag(0);
    justDragged.current = true;
    setTimeout(() => { justDragged.current = false; }, 60);
    const cw = stageRef.current.querySelector(".sc-item")?.offsetWidth ?? 300;
    const speed = Math.abs(d.dx) / Math.max(1, performance.now() - d.t);
    if (e.type !== "pointercancel" && (Math.abs(d.dx) > cw * 0.16 || speed > 0.45)) go((c) => c - Math.sign(d.dx));
  };
  const onClickCapture = (e) => {
    if (justDragged.current) { e.preventDefault(); e.stopPropagation(); }
  };

  const p = items[active];
  const cfg = showcaseFor(p.id);

  return (
    <div ref={rootRef} className="showcase" style={toneStyle(cfg)}>
      <div className="sc-bg" aria-hidden="true">
        {items.map((it, i) => <Backdrop key={it.id} project={it} active={i === active} near={Math.abs(i - active) <= 2} />)}
        <div className="sc-bg__shade" />
      </div>

      <div
        ref={stageRef}
        className="sc-stage"
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected projects"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <div ref={trackRef} className="sc-track">
          {items.map((it, i) => {
            const d = i - active;
            const a = Math.abs(d);
            const sg = Math.sign(d);
            const k = Math.min(a, 4);
            const isActive = d === 0;
            const style = { "--x": sg * X[k], "--s": S[k], "--sg": sg, opacity: O[k], zIndex: 10 - a };
            const cls = `sc-item${isActive ? " is-active" : ""}${a > VISIBLE ? " is-far" : ""}`;
            return (
              <div key={it.id} className={cls} style={style} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}>
                {isActive ? (
                  <TLink to={`/work/${it.id}`} className="sc-face" aria-label={`Open ${it.title}`} data-cursor="Open" draggable={false} vtName={`cover-${it.id}`}>
                    <Poster project={it} index={i} near />
                  </TLink>
                ) : (
                  <button type="button" className="sc-face" aria-label={`Show ${it.title}`} tabIndex={a === 1 ? 0 : -1} onClick={() => go(i)}>
                    <Poster project={it} index={i} near={Math.abs(i - active) <= 2} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="container sc-info">
        <div className="sc-info__main" key={p.id}>
          <p className="sc-count" style={{ "--d": "0s" }}><b>{pad(active + 1)}</b><span>/ {pad(items.length)}</span></p>
          <h3 className="sc-title" style={{ "--d": "0.04s" }}>{p.title}</h3>
          <p className="sc-meta" style={{ "--d": "0.1s" }}>
            <span>{p.eyebrow}</span><span>{p.year}</span><span>{p.location}</span>
          </p>
        </div>
        <div className="sc-info__side" key={`${p.id}-side`}>
          <p className="sc-summary" style={{ "--d": "0.1s" }}>{p.summary}</p>
          <ul className="sc-tech" style={{ "--d": "0.16s" }} aria-label="Technologies">
            {p.tech.slice(0, 5).map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <div className="sc-controls">
          <TLink to={`/work/${p.id}`} className="sc-open">Explore project <span aria-hidden="true">↗</span></TLink>
          <div className="sc-nav">
            <button type="button" className="sc-arrow" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous project">←</button>
            <ol className="sc-dots" aria-label="Choose a project">
              {items.map((it, i) => (
                <li key={it.id}>
                  <button type="button" onClick={() => go(i)} aria-label={`Project ${i + 1}: ${it.title}`} aria-current={i === active ? "true" : undefined} />
                </li>
              ))}
            </ol>
            <button type="button" className="sc-arrow" onClick={() => go(active + 1)} disabled={active === last} aria-label="Next project">→</button>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{`${p.title}, project ${active + 1} of ${items.length}`}</p>
    </div>
  );
}
