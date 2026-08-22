import SiteRail from "../components/SiteRail";
import { profile } from "../data/portfolio";
import styles from "../styles/global.module.css";

export default function About() {
  return (
    <div className={styles.page}>
      <SiteRail />

      <section className={styles.aboutHero}>
        <div className={styles.aboutIntro}>
          <div className={styles.kicker}>About / Josué</div>
          <h1 className={styles.title}>BUILD.<br />LEARN.<br />SHIP.</h1>
          <p className={styles.lead}>{profile.intro}</p>
        </div>

        <aside className={styles.panel}>
          <h3>Snapshot</h3>
          <div className={styles.stat}><strong>Lima, Perú</strong><span>Based in</span></div>
          <div className={styles.stat}><strong>CS50x</strong><span>Harvard · completed</span></div>
          <div className={styles.stat}><strong>Full Stack + AI</strong><span>Primary focus</span></div>
          <div className={styles.stat}><strong>1st Place</strong><span>CodePi Innovation Challenge · France</span></div>
        </aside>
      </section>

      <section className={styles.aboutBody}>
        <div className={styles.copy}>
          <p>I started programming young and kept moving toward projects where software has to survive outside a classroom: agriculture, realtime services, public platforms, education and applied AI.</p>
          <p>My favorite work sits between engineering and product design. I like understanding the system end-to-end, from data model and APIs to the interface people actually touch.</p>
        </div>

        <div className={styles.stack}>{profile.stack.map((x) => <span className={styles.chip} key={x}>{x}</span>)}</div>
      </section>
    </div>
  );
}
