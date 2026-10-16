import { useState } from "react";
import { projects } from "../data/portfolio";

const tones = ["blue", "coral", "mint", "navy"];

// Shows the real cover when the file exists; otherwise a typographic cover
// built only from the project's own data (no invented imagery).
export default function ProjectCover({ project, vtName }) {
  const [loaded, setLoaded] = useState(false);
  const index = projects.findIndex((p) => p.id === project.id);
  return (
    <div
      className={`cover cover--${tones[index % tones.length]}${loaded ? " has-image" : ""}`}
      style={vtName ? { viewTransitionName: vtName } : undefined}
    >
      <img src={project.image} alt="" loading="lazy" onLoad={() => setLoaded(true)} onError={() => setLoaded(false)} />
      <span className="cover__num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <span className="cover__tag" aria-hidden="true">{project.eyebrow}</span>
    </div>
  );
}
