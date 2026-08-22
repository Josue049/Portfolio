import { NavLink } from "react-router-dom";
import { profile } from "../data/portfolio";
import styles from "../styles/rail.module.css";

const internal = [
  ["/", "Home", "ti-home"],
  ["/about", "About", "ti-user"],
  ["/work", "Work", "ti-briefcase"],
  ["/contact", "Contact", "ti-message-circle"],
];

export default function SiteRail() {
  return (
    <nav className={styles.rail} aria-label="Main navigation">
      {internal.map(([to, label, icon]) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ""}`}
          data-tooltip={label}
          aria-label={label}
        >
          <i className={`ti ${icon}`} />
        </NavLink>
      ))}
      <div className={styles.divider} />
      <a className={styles.item} href={profile.socials.github} target="_blank" rel="noreferrer" data-tooltip="GitHub" aria-label="GitHub">
        <i className="fa-brands fa-github" />
      </a>
    </nav>
  );
}
