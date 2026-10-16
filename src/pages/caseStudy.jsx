import { useState } from "react";
import { useParams } from "react-router-dom";
import { projects, awards, projectGroups } from "../data/portfolio";
import { TLink } from "../components/TLink";
import ProjectCover from "../components/ProjectCover";
import Reveal from "../components/Reveal";

function Section({ label, children }) {
  return (
    <Reveal as="section" className="csec">
      <h2 className="csec__label">{label}</h2>
      <div className="csec__body">{children}</div>
    </Reveal>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const [failed, setFailed] = useState({});
  const index = projects.findIndex((x) => x.id === slug);
  const p = projects[index];

  if (!p) {
    return (
      <div className="container page">
        <TLink to="/work" className="link-arrow">← Back to work</TLink>
        <h1>Project not found.</h1>
      </div>
    );
  }

  const next = projects[(index + 1) % projects.length];
  const recognitions = awards.filter((a) => a.meta.includes(p.title));
  const shots = p.gallery.map((src, i) => ({ src, label: p.imageNotes[i] || `${p.title} image ${i + 1}` }));
  const allMissing = shots.every((s) => failed[s.src]);
  const meta = [["Role", p.role], ["Year", p.year], ["Status", p.status], ["Location", p.location]];

  return (
    <article className="case" key={p.id}>
      <header className="case__top on-dark">
        <div className="container case__top-inner">
          <TLink to="/work" className="link-arrow">← All projects</TLink>
          <p className="eyebrow">{p.eyebrow} · {projectGroups[p.id]}</p>
          <h1>{p.title}</h1>
          <p className="case__lead">{p.summary}</p>
          {p.live && (
            <a className="btn btn--primary btn--lg" href={p.live} target="_blank" rel="noreferrer">Visit project ↗</a>
          )}
          <dl className="case__meta">
            {meta.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
            <div className="case__tech">
              <dt>Technologies</dt>
              <dd><ul className="chips">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul></dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="case__hero">
        <div className="container">
          <ProjectCover project={p} vtName={`cover-${p.id}`} />
        </div>
      </div>

      <div className="container case__sections">
        <Section label="Context"><p>{p.description}</p></Section>
        {p.problem && <Section label="Problem"><p>{p.problem}</p></Section>}
        {p.solution && <Section label="Solution"><p>{p.solution}</p></Section>}
        <Section label="Development">
          <ul className="bullets">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        </Section>
        {(p.results || recognitions.length > 0) && (
          <Section label="Results">
            {p.results && <p>{p.results}</p>}
            {recognitions.map((a) => (
              <p key={a.id} className="result"><strong>{a.title}</strong> — {a.subtitle}. {a.description}</p>
            ))}
          </Section>
        )}
      </div>

      <section className="container case__shots">
        <h2 className="csec__label">Screenshots</h2>
        {allMissing ? (
          <p className="muted">Screenshots for this project haven’t been added yet.</p>
        ) : (
          <div className="shots">
            {shots.map((s) => (
              failed[s.src] ? null : (
                <Reveal as="figure" key={s.src}>
                  <img src={s.src} alt={s.label} loading="lazy" onError={() => setFailed((f) => ({ ...f, [s.src]: true }))} />
                  <figcaption>{s.label}</figcaption>
                </Reveal>
              )
            ))}
          </div>
        )}
      </section>

      <TLink to={`/work/${next.id}`} className="case__next on-dark" data-cursor="Next">
        <div className="container">
          <span>Next project</span>
          <strong>{next.title} →</strong>
        </div>
      </TLink>
    </article>
  );
}
