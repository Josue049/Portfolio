import { profile } from "../data/portfolio";
import Magnetic from "../components/Magnetic";
import Roll from "../components/Roll";

const handle = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default function Contact() {
  const { linkedin, github, huggingface } = profile.socials;
  const links = [
    ["LinkedIn", linkedin],
    ["GitHub", github],
    ["Hugging Face", huggingface],
  ];
  return (
    <section className="contact on-dark">
      <div className="container">
        <p className="eyebrow rise">Contact</p>
        <h1 className="rise" style={{ "--d": "0.08s" }}>Let’s build something that works.</h1>
        <div className="contact__row rise" style={{ "--d": "0.2s" }}>
          <div>
            <p className="hero__lead">Open to collaborations, internships and projects in full-stack development and applied AI. Based in {profile.location}.</p>
            <div className="actions">
              <Magnetic>
                <a className="btn btn--primary btn--xl" href={linkedin} target="_blank" rel="noreferrer"><Roll>Message me on LinkedIn</Roll> ↗</a>
              </Magnetic>
            </div>
          </div>
          <ul className="contact__links">
            {links.map(([name, url]) => (
              <li key={name}>
                <a href={url} target="_blank" rel="noreferrer">
                  <span><Roll>{name}</Roll></span>
                  <small>{handle(url)}</small>
                  <b aria-hidden="true">↗</b>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
