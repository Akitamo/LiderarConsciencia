// Design tokens — extracted from brand-guidelines.md + slide-engine-brief.md §3.4
// Colors are WITHOUT '#' prefix (PptxGenJS format)

const COLORS = {
  // Principales
  darkTeal:      "1A3A40",  // Primary Dark — Fondo slides oscuras
  midTeal:       "2A5058",  // Primary — Títulos h2, insight-box
  lightTeal:     "487878",  // Primary Light — Headers secundarios
  coral:         "DC8060",  // Accent — Tags, highlights, números, CTAs
  coralDark:     "B86848",  // Accent Dark
  coralLight:    "F0A080",  // Accent Light

  // Fondos
  cream:         "FDFCFB",  // Background — Fondo slides claras
  bgAlt:         "F9F7F5",  // Background Alt
  offWhite:      "F2F7F7",  // Primary Subtle — Fondo tarjetas
  warmBg:        "FDF6F3",  // Accent Muted — Fondo tarjetas acento
  white:         "FFFFFF",

  // Texto
  textPrimary:   "2A3A3A",  // Títulos, texto principal
  textSecondary: "5A6A6A",  // Cuerpo, descripciones
  textMuted:     "8A9696",  // Labels, terciario

  // Bordes
  border:        "E8E4E0",  // Líneas separadoras
  primaryMuted:  "E0EBEB",  // Fondos badges, cards primary

  // Textos en slides oscuras
  textLight:     "E0EBEB",  // Texto claro
  textDimmed:    "A8B0A8",  // Texto apagado
};

// Colores de módulos (sistema de 7)
const MODULE_COLORS = {
  M0: "DC8060",  // Same as M1 (apertura)
  M1: "DC8060",  // Coral arcilla
  M2: "C48870",  // Arena rosada
  M3: "A89080",  // Duna
  M4: "889088",  // Niebla
  M5: "688888",  // Marea
  M6: "487878",  // Profundidad
  M7: "2A5058",  // Océano
};

const FONT = "Montserrat";
const FONT_FALLBACK = "Arial";

// Tamaños tipográficos (en pt para PptxGenJS)
const SIZES = {
  // Slides claras — header
  tag:           { fontSize: 11, bold: true,  charSpacing: 1.5 },
  titleH2:       { fontSize: 28, bold: true },
  body:          { fontSize: 13 },
  bodyLarge:     { fontSize: 14 },
  bodySmall:     { fontSize: 11 },
  caption:       { fontSize: 9 },

  // Portada
  portadaTag:    { fontSize: 14, bold: true,  charSpacing: 3 },
  portadaH1:     { fontSize: 48, bold: true },
  portadaCita:   { fontSize: 16, italic: true },

  // Separador
  separadorNum:  { fontSize: 72, bold: true },
  separadorTag:  { fontSize: 12, bold: true,  charSpacing: 2 },
  separadorH1:   { fontSize: 40, bold: true },
  separadorSub:  { fontSize: 16 },

  // Dato impacto
  datoNum:       { fontSize: 48, bold: true },
  datoDesc:      { fontSize: 16 },

  // Quote
  quoteText:     { fontSize: 18, italic: true },
  quoteAuthor:   { fontSize: 13, bold: true },

  // Claim
  claimConcept:  { fontSize: 48, bold: true },
  claimDef:      { fontSize: 18 },

  // Paginación
  pageNum:       { fontSize: 9 },
};

// Slide dimensions (inches — PptxGenJS default widescreen)
const SLIDE = {
  w: 10.0,
  h: 5.625,
};

// Key positions (inches) — derived from Plantilla inspection
const POS = {
  // Logo lockup
  logo: { x: 0.40, y: 0.25, w: 0.40, h: 0.40 },
  lockupText: { x: 0.85, y: 0.30, fontSize: 9 },

  // Content margins
  margin: { left: 0.60, right: 0.60, top: 1.0, bottom: 0.60 },

  // Header (tag + title) in content slides
  header: {
    tag:   { x: 0.60, y: 0.80 },
    title: { x: 0.60, y: 1.00 },
    lineY: 1.75,
  },

  // Content area (below header line)
  content: { x: 0.60, y: 1.95, w: 8.80, h: 3.00 },

  // Page number
  pageNum: { x: 8.80, y: 5.17 },

  // Decorative circles
  circlesTopRight:   { x: 7.50, y: -0.80, w: 3.20, h: 3.20 },
  circlesBottomLeft:  { x: -0.60, y: 3.50, w: 2.80, h: 2.80 },
  circlesRight:      { x: 8.00, y: 1.50, w: 2.50, h: 2.50 },
};

module.exports = { COLORS, MODULE_COLORS, FONT, FONT_FALLBACK, SIZES, SLIDE, POS };
