import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { profile } from "../data/portfolio";
import { SITE_URL } from "../siteConfig";
import { applyMeta, getMeta } from "../seo/meta";
import { TLink, TNavLink } from "./TLink";
import GlobalFX from "./GlobalFX";
import Loader from "./Loader";
import Roll from "./Roll";
import ViewCursor from "./ViewCursor";

const links = [
  ["/", "Home"],
  ["/work", "Work"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

const socials = [
  ["LinkedIn", profile.socials.linkedin],
  ["GitHub", profile.socials.github],
  ["Hugging Face", profile.socials.huggingface],
];

export default function Layout() {
  // The menu is open only for the route it was opened on, so navigating closes it.
  const { pathname } = useLocation();
  const [openAt, setOpenAt] = useState(null);
  const open = openAt === pathname;
  const setOpen = (next) => setOpenAt(next ? pathname : null);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => { applyMeta(getMeta(pathname), SITE_URL); }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") { setOpenAt(null); toggleRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Loader />
      <ViewCursor />
      <GlobalFX />
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <div className="site-header__inner">
          <TLink to="/" className="brand" aria-label="Josué Gutiérrez — home">JG.</TLink>
          <button
            ref={toggleRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(!open)}
          >
            <Roll>{open ? "Close" : "Menu"}</Roll>
          </button>
        </div>
      </header>

      <div id="site-menu" className={`menu${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open}>
        <div className="menu__inner container">
          <nav aria-label="Main navigation">
            <ul className="menu__links">
              {links.map(([to, label], i) => (
                <li key={to} style={{ "--i": i }}>
                  <TNavLink to={to} end={to === "/"} ref={i === 0 ? firstLinkRef : undefined} tabIndex={open ? 0 : -1}>
                    <span className="menu__num">0{i + 1}</span>
                    <span className="menu__label"><span>{label}</span></span>
                  </TNavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu__side">
            <p className="eyebrow">Elsewhere</p>
            <ul>
              {socials.map(([name, url]) => (
                <li key={name}><a href={url} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}><Roll>{name}</Roll> ↗</a></li>
              ))}
            </ul>
            <p className="menu__loc">{profile.location}</p>
          </div>
        </div>
      </div>

      <main id="main" inert={open}><Outlet /></main>

      <footer className="site-footer on-dark" inert={open}>
        <div className="container site-footer__inner">
          <p>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
          <p className="site-footer__links">
            {socials.map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noreferrer"><Roll>{name}</Roll></a>
            ))}
          </p>
        </div>
      </footer>
    </>
  );
}
