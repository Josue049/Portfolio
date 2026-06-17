import styles from "../styles/home.module.css";
import loadedStyles from "../styles/loaded.module.css";

export default function Home() {
  return (
    <>
      <div className={loadedStyles.loaded}>
        <div className={loadedStyles.Presentation}>
          <div className={loadedStyles.name}>
            <p>JOSUE</p>
          </div>

          <span className={loadedStyles.symbol}>|</span>

          <div className={loadedStyles.title}>
            <p>Developer</p>
          </div>
        </div>
      </div>

      <div className={styles.hero}>
        <nav className={styles["side-nav"]}>
          <a href="#" className={styles["nav-item"]} data-tooltip="Home">
            <i className="ti ti-home"></i>
          </a>

          <a href="#" className={styles["nav-item"]} data-tooltip="About">
            <i className="ti ti-user"></i>
          </a>

          <a href="#" className={styles["nav-item"]} data-tooltip="Work">
            <i className="ti ti-briefcase"></i>
          </a>

          <a href="#" className={styles["nav-item"]} data-tooltip="Blogs">
            <i className="ti ti-pencil"></i>
          </a>

          <div className={styles["nav-divider"]}></div>

          <a href="#" className={styles["nav-item"]} data-tooltip="More">
            <i className="ti ti-dots"></i>
          </a>
        </nav>

        <div className={styles.content}>
          <div className={styles.redes}>
            <a
              className={styles["badge-x"]}
              href="https://www.linkedin.com/in/josuegutierrezcuellar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles["x-circle"]}>
                <i className="fa-brands fa-linkedin-in"></i>
              </div>
              <span className={styles.label}>
                <strong>LinkedIn</strong>
              </span>
              <div className={styles.arrow}>›</div>
            </a>

            <a
              className={styles["badge-x"]}
              href="https://github.com/Josue049"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles["x-circle"]}>
                <i className="fa-brands fa-github"></i>
              </div>
              <span className={styles.label}>
                <strong>GitHub</strong>
              </span>
              <div className={styles.arrow}>›</div>
            </a>

            <a
              className={styles["badge-x"]}
              href="https://huggingface.co/MrJosue09"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles["x-circle"]}>
                <i className="fa-solid fa-face-smiling-hands"></i>
              </div>
              <span className={styles.label}>
                <strong>Hugging Face</strong>
              </span>
              <div className={styles.arrow}>›</div>
            </a>
          </div>

          <main>
            <h1 className={styles["hero-name"]}>SOFTWARE</h1>

            <div className={styles["hero-tagline"]}>
              <span className={styles["tagline-upper"]}>
                I design and build products that
              </span>

              <span className={styles["tagline-lower"]}>
                deliver real impact.
              </span>
            </div>
          </main>

          <footer>
            <div className={styles["info-block"]}>
              <div className={styles["info-icon"]}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                </svg>
              </div>

              <span className={styles["info-label"]}>LIMA, PERÚ</span>
            </div>

            <div className={`${styles["info-block"]} ${styles.right}`}>
              <div className={`${styles["info-icon"]} ${styles.stack}`}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="1.8"
                >
                  <polygon points="12 2 22 8 12 14 2 8 12 2" />
                  <polyline points="2 12 12 18 22 12" />
                  <polyline points="2 16 12 22 22 16" />
                </svg>
              </div>

              <span className={styles["info-label"]}>Full Stack Dev</span>

              <span className={styles["info-sub"]}>+ AI, Machine Learning</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
