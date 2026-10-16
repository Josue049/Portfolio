import { profile, about, experience, education, awards, talks } from "../data/portfolio";
import CvLink from "../components/CvLink";
import Reveal from "../components/Reveal";
import TechStack from "../components/TechStack";

function Timeline({ title, items }) {
  return (
    <Reveal as="section" className="about__block">
      <h2>{title}</h2>
      <ul className="timeline">
        {items.map((x) => (
          <li key={x.id}>
            <h3>{x.title}</h3>
            <p className="timeline__sub">{x.subtitle} · {x.meta.join(" · ")}</p>
            <p>{x.description}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function About() {
  return (
    <>
      <section className="container page about__hero">
        <div>
          <p className="eyebrow eyebrow--blue">About</p>
          <h1>Build.<br />Learn.<br />Ship.<span className="sr-only"> — About Josué Gutiérrez, Software Engineer</span></h1>
        </div>
        <div className="about__portrait">
          <picture>
            <source srcSet="/FondoNegro.webp" type="image/webp" />
            <img src="/FondoNegro.png" width="1919" height="911" alt="Josué Gutiérrez in profile, wearing round sunglasses" loading="lazy" decoding="async" />
          </picture>
        </div>
      </section>

      <section className="container about__intro">
        <p className="about__lead">{profile.intro}</p>
        <div className="about__cols-text">
          {about.paragraphs.map((t) => <p key={t}>{t}</p>)}
        </div>
        <dl className="snapshot">
          {about.snapshot.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
        <CvLink className="cv-link--light" />
      </section>

      <section className="band">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow eyebrow--blue">Technologies</p>
            <h2>The tools behind the work.</h2>
          </Reveal>
          <TechStack />
        </div>
      </section>

      <section className="section container about__cols">
        <Timeline title="Experience" items={experience} />
        <Timeline title="Education" items={education} />
      </section>

      <section className="section on-dark">
        <div className="container about__cols">
          <Timeline title="Awards" items={awards} />
          <Timeline title="Talks" items={talks} />
        </div>
      </section>
    </>
  );
}
