import { profile, projects, awards } from "../data/portfolio";
import { TLink } from "../components/TLink";
import CvLink from "../components/CvLink";
import Manifesto from "../components/Manifesto";
import Magnetic from "../components/Magnetic";
import ProjectGallery from "../components/ProjectGallery";
import Reveal from "../components/Reveal";
import Roll from "../components/Roll";
import TechStack from "../components/TechStack";
import ScrollStroke from "../components/ScrollStroke";

const delay = (s) => ({ "--d": `${s}s` });

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const [first, ...rest] = profile.shortName.split(" ");
  const [title, ...areas] = profile.role.split(" · ");
  return (
    <>
      <section className="hero on-dark">
        <div className="hero__photo">
          <picture>
            <source srcSet="/FondoNegro.webp" type="image/webp" />
            <img src="/FondoNegro.png" width="1919" height="911" fetchPriority="high" decoding="async" alt="Portrait of Josué Gutiérrez looking over his shoulder, wearing round sunglasses" />
          </picture>
        </div>

        <div className="hero__top">
          <p className="eyebrow rise" style={delay(0.05)}>{areas.join(" · ")}</p>
          <h1 aria-label={profile.shortName}>
            <span className="line" aria-hidden="true"><span style={delay(0.1)}>{first}</span></span>
            <span className="line" aria-hidden="true"><span style={delay(0.22)}>{rest.join(" ")}</span></span>
          </h1>
          <p className="hero__role rise" style={delay(0.34)}>{title}</p>
          <p className="hero__lead rise" style={delay(0.44)}>{profile.headline}</p>
          <div className="actions rise" style={delay(0.54)}>
            <TLink className="btn btn--primary" to="/work"><Roll>View projects</Roll></TLink>
            <TLink className="btn btn--ghost" to="/contact"><Roll>Get in touch</Roll></TLink>
            <CvLink />
          </div>
        </div>
      </section>

      <ScrollStroke className="intro">
        <div className="container intro__grid">
          <div className="intro__side">
            <p className="eyebrow eyebrow--blue">About</p>
            <TLink className="link-arrow" to="/about">More about me →</TLink>
          </div>
          <Manifesto text={profile.intro} />
        </div>
      </ScrollStroke>

      <section className="section section--gallery on-dark">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Featured work</p>
            <h2>Products built to work outside the classroom.</h2>
          </Reveal>
          <ProjectGallery items={featured} />
          <TLink className="link-arrow" to="/work">All projects →</TLink>
        </div>
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

      <section className="section container split">
        <Reveal>
          <p className="eyebrow eyebrow--blue">Recognition</p>
          <h2>Results with names and places attached.</h2>
        </Reveal>
        <Reveal as="ul" className="award-list">
          {awards.map((a) => (
            <li key={a.id}>
              <strong>{a.title}</strong>
              <span>{a.subtitle}</span>
            </li>
          ))}
        </Reveal>
      </section>

      <section className="cta on-dark">
        <div className="container">
          <h2>Have a product in mind?</h2>
          <Magnetic><TLink className="btn btn--primary btn--xl" to="/contact"><Roll>Let’s talk</Roll></TLink></Magnetic>
        </div>
      </section>
    </>
  );
}
