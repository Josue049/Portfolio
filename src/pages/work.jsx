import { useState } from "react";
import { projects, projectGroups, projectFilters } from "../data/portfolio";
import ProjectList from "../components/ProjectList";

export default function Work() {
  const [filter, setFilter] = useState("All");
  const shown = projects.filter((p) => filter === "All" || projectGroups[p.id] === filter);

  return (
    <div className="work on-dark">
      <div className="container">
        <header className="work__head">
          <p className="eyebrow">Work</p>
          <h1>Selected projects</h1>
        </header>
        <div className="filters" role="group" aria-label="Filter projects">
          {projectFilters.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>
        <ProjectList key={filter} items={shown} />
      </div>
    </div>
  );
}
