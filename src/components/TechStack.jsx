import { stackGroups } from "../data/portfolio";
import Reveal from "./Reveal";

// Logo gallery grouped by category. Icons are local SVGs (public/tech).
export default function TechStack() {
  return (
    <div className="tech">
      {stackGroups.map((g) => (
        <Reveal as="section" key={g.title} className="tech__group">
          <h3 className="tech__title">
            {g.title}
            <small>{String(g.items.length).padStart(2, "0")}</small>
          </h3>
          <ul className="tech__grid">
            {g.items.map(([name, icon]) => (
              <li key={name} className="tcell">
                <img src={`/tech/${icon}.svg`} alt="" width="56" height="56" loading="lazy" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
