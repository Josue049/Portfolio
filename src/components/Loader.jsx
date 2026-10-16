import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../hooks";
import styles from "../styles/loaded.module.css";

const KEY = "jg-intro";

function shouldPlay() {
  try {
    return !sessionStorage.getItem(KEY) && !prefersReducedMotion();
  } catch {
    return false;
  }
}

// The original "JOSUÉ | Developer" splash, shown once per session.
export default function Loader() {
  const [show, setShow] = useState(() => {
    const play = shouldPlay();
    if (play) document.documentElement.dataset.intro = "play";
    return play;
  });

  const done = () => {
    try { sessionStorage.setItem(KEY, "1"); } catch { /* storage unavailable */ }
    delete document.documentElement.dataset.intro;
    setShow(false);
  };

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(done, 2600); // safety net if animationend never fires
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;
  return (
    <div className={styles.loaded} aria-hidden="true" onAnimationEnd={(e) => e.target === e.currentTarget && done()}>
      <div className={styles.Presentation}>
        <div className={styles.name}><p>JOSUÉ</p></div>
        <div className={styles.symbol}>|</div>
        <div className={styles.title}><p>Developer</p></div>
      </div>
    </div>
  );
}
