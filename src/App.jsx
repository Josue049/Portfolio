import { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import SiteRail from "./components/SiteRail";
import Home from "./pages/home";
import Work from "./pages/work";
import About from "./pages/about";
import Contact from "./pages/contact";
import CaseStudy from "./pages/caseStudy";

// Las cuatro secciones permanecen montadas durante toda la sesión.
// Cambiar de ruta solo alterna su visibilidad, sin reiniciar sus estados.
function PortfolioShell() {
  const { pathname } = useLocation();
  const [introDone, setIntroDone] = useState(() => window.location.pathname !== "/");
  const section = pathname === "/" ? "home"
    : pathname === "/about" ? "about"
    : pathname === "/contact" ? "contact"
    : pathname === "/work" ? "work"
    : pathname.startsWith("/work/") ? "caseStudy" : "home";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      {introDone && <SiteRail />}
      <div style={{ display: section === "home" ? "contents" : "none" }} aria-hidden={section !== "home"}>
        <Home introDone={introDone} onIntroDone={() => setIntroDone(true)} />
      </div>
      <div style={{ display: section === "work" ? "contents" : "none" }} aria-hidden={section !== "work"}>
        <Work active={section === "work"} />
      </div>
      <div style={{ display: section === "about" ? "contents" : "none" }} aria-hidden={section !== "about"}>
        <About />
      </div>
      <div style={{ display: section === "contact" ? "contents" : "none" }} aria-hidden={section !== "contact"}>
        <Contact />
      </div>
      <div style={{ display: section === "caseStudy" ? "contents" : "none" }} aria-hidden={section !== "caseStudy"}>
        <CaseStudy slug={section === "caseStudy" ? decodeURIComponent(pathname.slice("/work/".length)) : null} />
      </div>
    </>
  );
}

export default function App() {
  return <BrowserRouter><PortfolioShell /></BrowserRouter>;
}
