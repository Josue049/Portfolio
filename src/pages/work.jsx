import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteRail from "../components/SiteRail";
import { categories } from "../data/portfolio";
import styles from "../styles/work.module.css";

const ACTIVE_SLOT = 1;

function MediaPreview({ detail, title, category }) {
  const gallery = detail?.gallery || [];
  const notes = detail?.imageNotes || [];

  return (
    <div className={styles.mediaBlock}>
      <div
        className={styles.coverMedia}
        style={detail?.image ? { backgroundImage: `linear-gradient(180deg, transparent 25%, rgba(0,0,0,.72) 100%), url("${detail.image}")` } : undefined}
      >
        <span>{detail?.image ? "PROJECT COVER" : category}</span>
        <strong>{title}</strong>
      </div>

      {gallery.length > 0 && (
        <div className={styles.miniGallery}>
          {gallery.slice(0, 3).map((src, index) => (
            <div
              className={styles.galleryThumb}
              key={src}
              style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(0,0,0,.58)), url("${src}")` }}
            >
              <span>{notes[index] || `Image ${index + 1}`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Work() {
  const navigate = useNavigate();
  const [catIndex, setCatIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);

  const category = categories[catIndex];
  const activeItem = category.items[itemIndex];
  const detail = activeItem?.detail;

  const selectCategory = useCallback((index) => {
    setCatIndex(index);
    setItemIndex(0);
  }, []);

  const openItem = useCallback((item = activeItem) => {
    if (!item) return;
    if (item.href) navigate(item.href);
    else if (item.external) window.open(item.external, "_blank", "noopener,noreferrer");
  }, [activeItem, navigate]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowLeft") selectCategory(Math.max(0, catIndex - 1));
      if (event.key === "ArrowRight") selectCategory(Math.min(categories.length - 1, catIndex + 1));
      if (event.key === "ArrowUp") setItemIndex((i) => Math.max(0, i - 1));
      if (event.key === "ArrowDown") setItemIndex((i) => Math.min(category.items.length - 1, i + 1));
      if (event.key === "Enter" || event.key.toLowerCase() === "x") openItem();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [catIndex, category.items.length, openItem, selectCategory]);

  const slotWidth = 100 / categories.length;
  const getLeft = (ci) => (ci - catIndex + ACTIVE_SLOT) * slotWidth + slotWidth / 2;
  const activeLeft = ACTIVE_SLOT * slotWidth + slotWidth / 2;
  const canOpen = Boolean(activeItem?.href || activeItem?.external);

  return (
    <div className={styles.ps3Root}>
      <SiteRail />
      <div className={styles.ambientOne} />
      <div className={styles.ambientTwo} />

      <header className={styles.workspaceTitle}>
        <span>PORTFOLIO / 2026</span>
        <h1>SELECTED<br />WORK.</h1>
        <p>Projects, experience and experiments where software meets real-world problems.</p>
      </header>

      <div className={styles.xmbLine} />
      <div className={styles.xmbCategories}>
        {categories.map((cat, ci) => {
          const left = getLeft(ci);
          if (left < -12 || left > 112) return null;
          return (
            <button
              key={cat.id}
              className={styles.xmbCat}
              style={{ left: `${left}%`, opacity: Math.max(.18, 1 - Math.abs(ci - catIndex) * .22) }}
              onClick={() => selectCategory(ci)}
            >
              <span className={ci === catIndex ? styles.xmbCatLabelActive : styles.xmbCatLabel}>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.xmbItems} style={{ left: `${activeLeft}%` }}>
        {category.items.map((item, ii) => {
          const off = ii - itemIndex;
          const active = ii === itemIndex;
          return (
            <button
              key={item.id}
              className={active ? styles.xmbItemActive : styles.xmbItem}
              style={{ transform: `translateY(${off * 50}px)`, opacity: Math.max(0, 1 - Math.abs(off) * .28) }}
              onClick={() => active ? openItem(item) : setItemIndex(ii)}
            >
              <span className={active ? styles.xmbItemLabelActive : styles.xmbItemLabel}>{item.label}</span>
            </button>
          );
        })}
      </div>

      {detail && (
        <aside className={styles.detailCard} key={`${catIndex}-${itemIndex}`}>
          <div className={styles.detailCardInner}>
            <MediaPreview detail={detail} title={activeItem.label} category={category.label} />

            <div className={styles.detailContent}>
              <div className={styles.detailCatTag}>{category.label}</div>
              <h2 className={styles.detailTitle}>{activeItem.label}</h2>
              <p className={styles.detailSubtitle}>{detail.subtitle}</p>

              <div className={styles.detailMeta}>
                {detail.meta?.map((m) => <span key={m} className={styles.detailMetaChip}>{m}</span>)}
                {detail.location && <span className={styles.detailMetaChip}>{detail.location}</span>}
              </div>

              <p className={styles.detailDescription}>{detail.description}</p>

              {(detail.role || detail.tech?.length) && (
                <div className={styles.infoGrid}>
                  {detail.role && <div><span>ROLE</span><strong>{detail.role}</strong></div>}
                  {detail.tech?.length > 0 && <div><span>STACK</span><strong>{detail.tech.slice(0, 4).join(" · ")}</strong></div>}
                </div>
              )}

              {detail.highlights?.length > 0 && (
                <ul className={styles.highlightList}>
                  {detail.highlights.slice(0, 2).map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              )}

              {canOpen && (
                <button className={styles.openButton} onClick={() => openItem()}>
                  <span>{activeItem.href ? "View full case study" : "Open link"}</span>
                  <span>↗</span>
                </button>
              )}
            </div>
          </div>
        </aside>
      )}

      <div className={styles.mobileIntro}>
        <span>PORTFOLIO / WORK</span>
        <strong>Selected work.</strong>
        <p>Choose a category and explore the projects in detail.</p>
      </div>

      <div className={styles.mobileCategories}>
        {categories.map((c, i) => (
          <button className={i === catIndex ? styles.mobileCatActive : ""} onClick={() => selectCategory(i)} key={c.id}>{c.label}</button>
        ))}
      </div>

      <div className={styles.mobileCards}>
        {category.items.map((item) => {
          const itemDetail = item.detail || {};
          return (
            <article key={item.id} className={styles.mobileCard}>
              {(itemDetail.image || category.type === "project") && (
                <div
                  className={styles.mobileCardImage}
                  style={itemDetail.image ? { backgroundImage: `linear-gradient(180deg, transparent, rgba(0,0,0,.74)), url("${itemDetail.image}")` } : undefined}
                >
                  <span>{itemDetail.subtitle || category.label}</span>
                </div>
              )}
              <div className={styles.mobileCardBody}>
                <span className={styles.mobileEyebrow}>{itemDetail.subtitle || category.label}</span>
                <strong>{item.label}</strong>
                <p>{itemDetail.description}</p>
                {itemDetail.meta?.length > 0 && <div className={styles.mobileMeta}>{itemDetail.meta.map((m) => <em key={m}>{m}</em>)}</div>}
                {(item.href || item.external) && <button onClick={() => openItem(item)}>View more <span>↗</span></button>}
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.hint}>← → categories &nbsp; ↑ ↓ items &nbsp; X / Enter open</div>
    </div>
  );
}
