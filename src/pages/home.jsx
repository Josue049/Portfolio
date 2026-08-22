import { useState } from "react";
import { Link } from "react-router-dom";
import SiteRail from "../components/SiteRail";
import { profile } from "../data/portfolio";
import styles from "../styles/home.module.css";
import loadedStyles from "../styles/loaded.module.css";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && (
        <div
          className={loadedStyles.loaded}
          aria-hidden="true"
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) setIntroDone(true);
          }}
        >
          <div className={loadedStyles.Presentation}>
            <div className={loadedStyles.name}><p>JOSUÉ</p></div>
            <span className={loadedStyles.symbol}>|</span>
            <div className={loadedStyles.title}><p>Developer</p></div>
          </div>
        </div>
      )}

      <div className={styles.hero}>
        {introDone && <SiteRail />}

        <div className={styles.content}>
          <div className={styles.redes} aria-label="Social links">
            {[
              ["LinkedIn", profile.socials.linkedin],
              ["GitHub", profile.socials.github],
              ["Hugging Face", profile.socials.huggingface],
            ].map(([label, href]) => (
              <a
                key={label}
                className={styles.socialLink}
                href={href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{label}</span>
                <span className={styles.arrow}>↗</span>
              </a>
            ))}
          </div>

          <main className={styles.heroMain}>
            <div className={styles.eyebrow}>JOSUÉ GUTIÉRREZ · SOFTWARE ENGINEERING</div>
            <h1 className={styles.heroName}>SOFTWARE</h1>
            <div className={styles.heroTagline}>
              <span className={styles.taglineUpper}>I DESIGN AND BUILD PRODUCTS THAT</span>
              <span className={styles.taglineLower}>deliver real impact.</span>
            </div>
            <div className={styles.ctas}>
              <Link to="/work" className={styles.primary}>Explore work <span>↗</span></Link>
              <Link to="/about" className={styles.secondary}>About me</Link>
            </div>
          </main>

          <footer className={styles.heroFooter}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>{profile.location}</span>
            </div>
            <div className={`${styles.infoBlock} ${styles.right}`}>
              <span className={styles.infoLabel}>Full Stack Dev</span>
              <span className={styles.infoSub}>+ AI, Machine Learning</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
