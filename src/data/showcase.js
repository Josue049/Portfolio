// Visual identity of each project inside the Featured Work carousel.
// Everything here is presentation only; real content (title, year, summary, tech, links) comes
// from portfolio.js. To give a project real artwork, drop files at the paths listed in
// public/projects/IMAGE_GUIDE.md — covers and backgrounds pick them up automatically, and the
// typographic composition below is used until then.
//
//   accent  : highlight colour of the cover and its ambient background
//   deep    : dark base tone of the project's atmosphere
//   art     : CSS composition used behind the typography (see .art--* in site.css)
//   mark    : large glyph on the typographic cover (derived from the project name)
//   focus   : object-position used when a real image is cropped to the 3:4 cover
export const showcase = {
  "data-agro-5": { accent: "#7fdcb9", deep: "#0d3324", art: "contours", mark: "5.0", focus: "50% 50%" },
  "wff-peru-chapter": { accent: "#ff8a3d", deep: "#2d1706", art: "columns", mark: "WFF", focus: "50% 50%" },
  "sleep-watch-alert": { accent: "#8f9dff", deep: "#12184a", art: "scan", mark: "SW", focus: "50% 40%" },
  "adpilot-ai": { accent: "#ff6b57", deep: "#3a1410", art: "beams", mark: "AP", focus: "50% 50%" },
  "math-game": { accent: "#ffd23f", deep: "#332805", art: "tiles", mark: "π", focus: "50% 50%" },
  "parkgo-services": { accent: "#4cc9f0", deep: "#06293a", art: "route", mark: "PG", focus: "50% 50%" },
  "basura-ia": { accent: "#a3e635", deep: "#1b2907", art: "detect", mark: "IA", focus: "50% 50%" },
  "museo-ar": { accent: "#e0b184", deep: "#33210f", art: "arch", mark: "AR", focus: "50% 50%" },
};

export const fallbackShowcase = { accent: "#7fdcb9", deep: "#13201b", art: "columns", mark: "", focus: "50% 50%" };
export const showcaseFor = (id) => showcase[id] ?? fallbackShowcase;
