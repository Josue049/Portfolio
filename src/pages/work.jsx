import { useState, useEffect } from "react";
import styles from "../styles/work.module.css";

const CATEGORIES = [
  {
    id: "projects",
    label: "PROYECTOS",
    items: [
      { id: "sleep", label: "Sleep Watch Alert", detail: { subtitle: "Hackathon Winner", meta: ["CS50 Harvard", "Canadá", "IA"], description: "Proyecto desarrollado como trabajo final de CS50 Harvard. Ganador del Concordia CS Hackathon. Sistema inteligente de monitoreo y alerta para el sueño." } },
      { id: "agro", label: "Data Agro 5.0", detail: { subtitle: "Agricultura Inteligente", meta: ["FAO", "Tacna", "IA"], description: "Piloto de agricultura con inteligencia artificial liderado para la FAO en campos agrícolas de Tacna." } },
      { id: "wff", label: "WFF Peru Chapter", detail: { subtitle: "Web Institucional", meta: ["React", "Diseño Web", "WFF"], description: "Desarrollo completo de la plataforma web oficial del capítulo peruano del World Food Forum." } },
      { id: "voltiger", label: "Voltiger", detail: { subtitle: "Diseño Experimental", meta: ["UI/UX", "Frontend"], description: "Proyecto de exploración visual enfocado en diseño web moderno y experiencias digitales innovadoras." } },
      { id: "math", label: "Math Game", detail: { subtitle: "Primer Lugar Internacional", meta: ["Francia", "Educación", "Low-Code"], description: "Videojuego educativo de matemáticas ganador del primer lugar en competencia internacional evaluada por ingenieros de Microsoft, Google, Meta, Apple, Disney, Amazon y Huawei." } },
      { id: "trash", label: "Basura IA", detail: { subtitle: "Computer Vision", meta: ["TACO Dataset", "IA", "Smart City"], description: "Aplicación basada en inteligencia artificial para detección y reporte geolocalizado de residuos urbanos." } },
      { id: "museum", label: "Museo AR", detail: { subtitle: "Realidad Aumentada", meta: ["3D", "AR", "Patrimonio"], description: "Proyecto para crear el primer museo con realidad aumentada en Tacna utilizando escaneo 3D y experiencias inmersivas." } },
    ],
  },
  {
    id: "experience",
    label: "EXPERIENCIA",
    items: [
      { id: "fao", label: "FAO Perú", detail: { subtitle: "Ciencia e Innovación", meta: ["Representante Nacional", "Innovación"], description: "Representante alterno nacional en Ciencia e Innovación participando en iniciativas tecnológicas y agrícolas." } },
      { id: "wffexp", label: "World Food Forum", detail: { subtitle: "Juventud e Innovación", meta: ["ONU", "Alimentación"], description: "Participación en iniciativas juveniles relacionadas con innovación alimentaria y desarrollo sostenible." } },
      { id: "mintra", label: "Ministerio de Trabajo", detail: { subtitle: "Proyecto IA", meta: ["Inclusión", "Accesibilidad"], description: "Desarrollo de propuesta basada en IA para mejorar oportunidades laborales de personas con discapacidad." } },
      { id: "muni", label: "Municipalidad de Lima", detail: { subtitle: "Instructor", meta: ["Programación", "Niños"], description: "Docente de programación para niños durante seis meses en programas educativos municipales." } },
      { id: "robbuild", label: "Robbuild", detail: { subtitle: "Educación STEM", meta: ["Robótica", "Tecnología"], description: "Diseño e impartición de un curso modelo para plataforma de aprendizaje infantil." } },
    ],
  },
  {
    id: "ai",
    label: "IA",
    items: [
      { id: "agroai", label: "Data Agro 5.0", detail: { subtitle: "Agricultura con IA", meta: ["FAO", "Visión Artificial"], description: "Uso de inteligencia artificial aplicada a monitoreo y análisis agrícola." } },
      { id: "trashai", label: "Basura IA", detail: { subtitle: "Detección de Residuos", meta: ["Computer Vision", "YOLO"], description: "Sistema inteligente para identificar residuos mediante visión computacional." } },
      { id: "sleepai", label: "Sleep Watch Alert", detail: { subtitle: "Health AI", meta: ["Hackathon Winner"], description: "Sistema inteligente de monitoreo y alertas relacionado con hábitos de sueño." } },
      { id: "jobai", label: "Trabajo Inclusivo IA", detail: { subtitle: "Ministerio de Trabajo", meta: ["Accesibilidad", "IA"], description: "Proyecto orientado a mejorar la inclusión laboral mediante herramientas inteligentes." } },
      { id: "museumai", label: "Museo AR", detail: { subtitle: "Experiencias Inteligentes", meta: ["AR", "3D"], description: "Aplicación de tecnologías inmersivas para patrimonio cultural." } },
    ],
  },
  {
    id: "awards",
    label: "PREMIOS",
    items: [
      { id: "france", label: "Primer Lugar Francia", detail: { subtitle: "Competencia Internacional", meta: ["1er Lugar"], description: "Ganador absoluto con un videojuego educativo de matemáticas." } },
      { id: "canada", label: "Hackathon Canadá", detail: { subtitle: "Concordia CS", meta: ["Ganador"], description: "Ganador del Concordia CS Hackathon con Sleep Watch Alert." } },
      { id: "utp", label: "UTP Destacado x3", detail: { subtitle: "Reconocimiento Académico", meta: ["3 Veces"], description: "Reconocido como estudiante destacado en tres oportunidades." } },
      { id: "stanford", label: "Beca Stanford", detail: { subtitle: "Apoyo Académico", meta: ["Álgebra Lineal"], description: "Beneficiario de beca para especialización relacionada con álgebra lineal." } },
    ],
  },
  {
    id: "education",
    label: "EDUCACIÓN",
    items: [
      { id: "systems", label: "Ingeniería de Sistemas", detail: { subtitle: "Formación Profesional", meta: ["Software", "IA"], description: "Formación enfocada en desarrollo de software, innovación e inteligencia artificial." } },
      { id: "cs50", label: "CS50 Harvard", detail: { subtitle: "Computer Science", meta: ["100%", "Harvard"], description: "Curso completado con calificación perfecta y proyecto premiado internacionalmente." } },
      { id: "stanfordedu", label: "Stanford Specialization", detail: { subtitle: "Linear Algebra", meta: ["Stanford"], description: "Especialización enfocada en fundamentos matemáticos aplicados a IA." } },
    ],
  },
  {
    id: "talks",
    label: "CHARLAS",
    items: [
      { id: "uni", label: "Universidad Nacional de Ingeniería", detail: { subtitle: "Conferencista", meta: ["UNI"], description: "Ponencia sobre tecnología, innovación y desarrollo profesional." } },
      { id: "youth", label: "Youth Food Lab", detail: { subtitle: "Evento de Apertura", meta: ["Teatro Mario Vargas Llosa"], description: "Participación en la apertura del primer laboratorio juvenil de innovación alimentaria." } },
      { id: "icarrd", label: "ICARRD+20 Colombia", detail: { subtitle: "Representación Internacional", meta: ["Colombia"], description: "Representación de la juventud en encuentro internacional sobre desarrollo rural." } },
    ],
  },
  {
    id: "contact",
    label: "CONTACTO",
    items: [
      { id: "github", label: "GitHub", detail: { subtitle: "Código Fuente", meta: ["Repositorios"], description: "Explora proyectos, experimentos y contribuciones de desarrollo." } },
      { id: "linkedin", label: "LinkedIn", detail: { subtitle: "Perfil Profesional", meta: ["Networking"], description: "Experiencia, proyectos y trayectoria profesional." } },
      { id: "hf", label: "Hugging Face", detail: { subtitle: "Modelos IA", meta: ["Machine Learning"], description: "Modelos, datasets y experimentos relacionados con inteligencia artificial." } },
      { id: "email", label: "Correo", detail: { subtitle: "Contacto Directo", meta: ["Disponible"], description: "Canal principal para colaboraciones y oportunidades." } },
      { id: "cv", label: "Curriculum Vitae", detail: { subtitle: "Resumen Profesional", meta: ["PDF"], description: "Versión completa de experiencia, educación y proyectos." } },
    ],
  },
];

const ACTIVE_SLOT = 1;
const SLOT_WIDTH = 100 / CATEGORIES.length;

export default function Work() {
  const [catIndex, setCatIndex] = useState(5);
  const [itemIndex, setItemIndex] = useState(0);
  const [notification, setNotification] = useState(null);
  const [clock, setClock] = useState(
    new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );

  const category = CATEGORIES[catIndex];
  const activeItem = category.items[itemIndex];
  const detail = activeItem?.detail;

  useEffect(() => {
    const tick = setInterval(() => {
      setClock(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    }, 10000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    setItemIndex(0);
  }, [catIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft")  setCatIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setCatIndex((i) => Math.min(CATEGORIES.length - 1, i + 1));
      if (e.key === "ArrowUp")    setItemIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown")  setItemIndex((i) => Math.min(category.items.length - 1, i + 1));
      if (e.key === "Enter" || e.key === "x" || e.key === "X") {
        setNotification(`Opening: ${activeItem.label}`);
        setTimeout(() => setNotification(null), 2000);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [catIndex, itemIndex, category, activeItem]);

  const getCatLeft = (ci) => {
    const slotOffset = ci - catIndex + ACTIVE_SLOT;
    return slotOffset * SLOT_WIDTH + SLOT_WIDTH / 2;
  };

  const activeCatLeft = ACTIVE_SLOT * SLOT_WIDTH + SLOT_WIDTH / 2;

  return (
    <div className={styles["ps3-root"]}>
      <div className={styles["xmb-line"]} />

      {/* XMB Horizontal Categories */}
      <div className={styles["xmb-categories"]}>
        {CATEGORIES.map((cat, ci) => {
          const isActive = ci === catIndex;
          const distance = Math.abs(ci - catIndex);
          const leftPct = getCatLeft(ci);
          const visible = leftPct > -10 && leftPct < 110;
          if (!visible) return null;
          return (
            <div
              key={cat.id}
              className={styles["xmb-cat"]}
              style={{ left: `${leftPct}%`, opacity: Math.max(0.15, 1 - distance * 0.22) }}
              onClick={() => setCatIndex(ci)}
            >
              {/* ✅ Usamos la clase dedicada del módulo, sin depender de selectores descendientes */}
              <span className={isActive ? styles["xmb-cat-label-active"] : styles["xmb-cat-label"]}>
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* XMB Vertical Items */}
      <div className={styles["xmb-items"]} style={{ left: `${activeCatLeft}%` }}>
        {category.items.map((item, ii) => {
          const offset = ii - itemIndex;
          const isActive = ii === itemIndex;
          const distance = Math.abs(offset);
          return (
            <div
              key={item.id}
              className={isActive ? styles["xmb-item-active"] : styles["xmb-item"]}
              style={{
                transform: `translateY(${offset * 48}px)`,
                opacity: Math.max(0, 1 - distance * 0.28),
              }}
              onClick={() => {
                setItemIndex(ii);
                setNotification(`Opening: ${item.label}`);
                setTimeout(() => setNotification(null), 2000);
              }}
            >
              {/* ✅ Usamos la clase dedicada del módulo, sin depender de selectores descendientes */}
              <span className={isActive ? styles["xmb-item-label-active"] : styles["xmb-item-label"]}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Detail Card */}
      {detail && (
        <div className={styles["detail-card"]} key={`${catIndex}-${itemIndex}`}>
          <div className={styles["detail-card-inner"]}>
            <div className={styles["detail-header"]}>
              <div className={styles["detail-cat-tag"]}>{category.label}</div>
              <h2 className={styles["detail-title"]}>{activeItem.label}</h2>
              <p className={styles["detail-subtitle"]}>{detail.subtitle}</p>
            </div>
            <div className={styles["detail-divider"]} />
            <div className={styles["detail-meta"]}>
              {detail.meta.map((m, i) => (
                <span key={i} className={styles["detail-meta-chip"]}>{m}</span>
              ))}
            </div>
            <p className={styles["detail-description"]}>{detail.description}</p>
            <div className={styles["detail-divider"]} />
            <div className={styles["detail-actions"]}>
              <div className={styles["detail-action"]}>
                <span className={`${styles["ps3-btn"]} ${styles["ps3-btn-x"]}`}>✕</span>
                <span>Open</span>
              </div>
              <div className={styles["detail-action"]}>
                <span className={`${styles["ps3-btn"]} ${styles["ps3-btn-t"]}`}>△</span>
                <span>Options</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div className={styles["notification"]}>{notification}</div>
      )}
    </div>
  );
}