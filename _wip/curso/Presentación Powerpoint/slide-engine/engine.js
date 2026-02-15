// engine.js — Slide type functions for PptxGenJS
// Each function adds one slide to the presentation
const { COLORS, MODULE_COLORS, FONT, SIZES, SLIDE, POS } = require("./tokens");
const {
  addLogoLockup, addPageNumber, addDecoCircles,
  addContentHeader, addInsightBox, addQuoteCard,
  addContentCard, addTag, addAccentLine, addImagePlaceholder,
} = require("./components");

// Helper: set dark background
function darkBg(slide) {
  slide.background = { fill: COLORS.darkTeal };
}
// Helper: set light background
function lightBg(slide) {
  slide.background = { fill: COLORS.cream };
}

// ─────────────────────────────────────────────
// TIPO 1 — Portada del Módulo (fondo oscuro)
// ─────────────────────────────────────────────
function slidePortada(pres, data) {
  // data: { moduleNum, moduleName, title, subtitle, quote, quoteAuthor, notes }
  const slide = pres.addSlide();
  darkBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  // Decorative circles
  addDecoCircles(slide, "topRight", 0.06);
  addDecoCircles(slide, "bottomLeft", 0.04);

  // Logo lockup (dark variant)
  addLogoLockup(slide, "dark");

  // Module badge
  const badgeText = `MÓDULO ${data.moduleNum} · ${(data.moduleName || "").toUpperCase()}`;
  slide.addText(badgeText, {
    x: 0.60, y: 1.20,
    w: 5.50, h: 0.35,
    fontFace: FONT,
    fontSize: SIZES.portadaTag.fontSize,
    bold: true,
    color: COLORS.coral,
    charSpacing: SIZES.portadaTag.charSpacing,
  });

  // Title
  slide.addText(data.title, {
    x: 0.60, y: 1.70,
    w: 5.80, h: 1.10,
    fontFace: FONT,
    fontSize: 40,
    bold: true,
    color: COLORS.white,
    valign: "top",
    lineSpacingMultiple: 1.05,
  });

  // Accent line
  addAccentLine(slide, 0.60, 3.05, 1.20);

  // Quote (if provided)
  if (data.quote) {
    slide.addText(`"${data.quote}"`, {
      x: 0.60, y: 3.25,
      w: 5.50, h: 0.60,
      fontFace: FONT,
      fontSize: SIZES.portadaCita.fontSize,
      italic: true,
      color: COLORS.textLight,
      valign: "top",
      lineSpacingMultiple: 1.3,
    });
  }

  // Subtitle / context
  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 0.60, y: 3.90,
      w: 5.50, h: 0.40,
      fontFace: FONT, fontSize: 11,
      color: COLORS.textDimmed,
    });
  }

  return slide;
}

// ─────────────────────────────────────────────
// TIPO 2 — Hoja de Ruta / Mapa del Módulo
// ─────────────────────────────────────────────
function slideHojaRuta(pres, data) {
  // data: { tag, title, blocks: [{ num, title, desc, active }], pageNum, totalPages, notes }
  const slide = pres.addSlide();
  lightBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "light");
  addContentHeader(slide, data.tag || "HOJA DE RUTA", data.title || "Estructura del módulo");
  addDecoCircles(slide, "topRight", 0.06);

  const blocks = data.blocks || [];
  const cols = Math.min(blocks.length, 4);
  const cardW = (8.40 / cols) - 0.15;
  const startX = 0.60;
  const cardY = 1.95;
  const cardH = 2.80;

  blocks.forEach((block, i) => {
    const x = startX + i * (cardW + 0.15);
    const borderColor = block.active ? COLORS.coral : COLORS.midTeal;
    const bg = block.active ? COLORS.warmBg : COLORS.white;

    addContentCard(slide, {
      x, y: cardY, w: cardW, h: cardH,
      borderColor, bgColor: bg,
      items: [
        { type: "number", text: block.num || `0${i + 1}` },
        { type: "title", text: block.title },
        { type: "body", text: block.desc },
      ],
    });
  });

  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages);
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 3 — Separador de Tema (fondo oscuro)
// ─────────────────────────────────────────────
function slideSeparador(pres, data) {
  // data: { num, title, subtitle, notes, pageNum, totalPages }
  const slide = pres.addSlide();
  darkBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "dark");
  addDecoCircles(slide, "right", 0.05);

  // Large number
  slide.addText(data.num || "01", {
    x: 0.60, y: 1.20,
    w: 2.00, h: 1.40,
    fontFace: FONT,
    fontSize: SIZES.separadorNum.fontSize,
    bold: true,
    color: COLORS.coral,
    valign: "top",
  });

  // Vertical coral bar
  slide.addShape("rect", {
    x: 2.70, y: 1.20,
    w: 0.05, h: 2.60,
    fill: { color: COLORS.coral },
  });

  // Tag "TEMA"
  slide.addText("TEMA", {
    x: 3.00, y: 1.20,
    w: 6.00, h: 0.30,
    fontFace: FONT,
    fontSize: SIZES.separadorTag.fontSize,
    bold: true,
    color: COLORS.textLight,
    charSpacing: SIZES.separadorTag.charSpacing,
  });

  // Title
  slide.addText(data.title, {
    x: 3.00, y: 1.55,
    w: 6.00, h: 1.20,
    fontFace: FONT,
    fontSize: SIZES.separadorH1.fontSize,
    bold: true,
    color: COLORS.white,
    valign: "top",
    lineSpacingMultiple: 1.1,
  });

  // Accent line
  addAccentLine(slide, 3.00, 2.85, 1.00);

  // Subtitle
  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 3.00, y: 3.05,
      w: 6.00, h: 0.80,
      fontFace: FONT,
      fontSize: SIZES.separadorSub.fontSize,
      color: COLORS.textLight,
      valign: "top",
      lineSpacingMultiple: 1.3,
    });
  }

  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages, "dark");
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 4 — Contenido Estándar (fondo claro)
// ─────────────────────────────────────────────
function slideContenido(pres, data) {
  // data: { tag, title, body (string or array), insightBox, insightKeyword, notes, pageNum, totalPages }
  const slide = pres.addSlide();
  lightBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "light");
  addContentHeader(slide, data.tag, data.title);

  // Body content
  if (Array.isArray(data.body)) {
    // Array of bullet points
    const bullets = data.body.map(item => ({
      text: item,
      options: {
        fontFace: FONT, fontSize: SIZES.body.fontSize,
        color: COLORS.textSecondary, bullet: { code: "2022" },
        lineSpacingMultiple: 1.5,
      },
    }));
    slide.addText(bullets, {
      x: POS.content.x, y: POS.content.y,
      w: POS.content.w, h: data.insightBox ? 2.80 : POS.content.h,
      valign: "top",
    });
  } else if (data.body) {
    slide.addText(data.body, {
      x: POS.content.x, y: POS.content.y,
      w: POS.content.w, h: data.insightBox ? 2.80 : POS.content.h,
      fontFace: FONT, fontSize: SIZES.body.fontSize,
      color: COLORS.textSecondary,
      valign: "top",
      lineSpacingMultiple: 1.5,
    });
  }

  if (data.insightBox) {
    addInsightBox(slide, data.insightBox, data.insightKeyword);
  }

  addDecoCircles(slide, "topRight", 0.04);
  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages);
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 5 — Dato Impacto / Estadística
// ─────────────────────────────────────────────
function slideDatoImpacto(pres, data) {
  // data: { number, description, source, dark, notes, pageNum, totalPages }
  const slide = pres.addSlide();
  const isDark = data.dark !== false;

  if (isDark) {
    darkBg(slide);
    addLogoLockup(slide, "dark");
  } else {
    lightBg(slide);
    addLogoLockup(slide, "light");
  }
  if (data.notes) slide.addNotes(data.notes);

  addDecoCircles(slide, "right", 0.04);

  // Big number
  slide.addText(data.number, {
    x: 0.60, y: 1.30,
    w: 8.80, h: 1.40,
    fontFace: FONT,
    fontSize: SIZES.datoNum.fontSize,
    bold: true,
    color: COLORS.coral,
    align: "center",
    valign: "middle",
  });

  // Description
  slide.addText(data.description, {
    x: 1.50, y: 2.80,
    w: 7.00, h: 0.80,
    fontFace: FONT,
    fontSize: SIZES.datoDesc.fontSize,
    color: isDark ? COLORS.white : COLORS.textPrimary,
    align: "center",
    valign: "top",
    lineSpacingMultiple: 1.3,
  });

  // Source
  if (data.source) {
    slide.addText(data.source, {
      x: 1.50, y: 3.70,
      w: 7.00, h: 0.40,
      fontFace: FONT,
      fontSize: 10,
      italic: true,
      color: isDark ? COLORS.textDimmed : COLORS.textMuted,
      align: "center",
    });
  }

  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages, isDark ? "dark" : "light");
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 6 — Evidence Grid / Datos en Grid
// ─────────────────────────────────────────────
function slideEvidenceGrid(pres, data) {
  // data: { tag, title, items: [{ number, desc, source }], notes, pageNum, totalPages }
  const slide = pres.addSlide();
  lightBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "light");
  addContentHeader(slide, data.tag, data.title);

  const items = data.items || [];
  const cols = 2;
  const rows = Math.ceil(items.length / cols);
  const cardW = 4.15;
  const cardH = rows > 1 ? 1.45 : 2.80;
  const startX = 0.60;
  const startY = 1.95;
  const gapX = 0.30;
  const gapY = 0.15;

  items.forEach((item, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardW + gapX);
    const y = startY + row * (cardH + gapY);

    // Card bg
    slide.addShape("rect", { x, y, w: cardW, h: cardH, fill: { color: COLORS.white } });
    // Left border
    slide.addShape("rect", { x, y, w: 0.05, h: cardH, fill: { color: COLORS.coral } });

    // Number — large coral, single row
    slide.addText(item.number, {
      x: x + 0.15, y: y + 0.10,
      w: cardW - 0.35, h: 0.38,
      fontFace: FONT, fontSize: 22, bold: true,
      color: COLORS.coral, valign: "top",
    });

    // Description
    slide.addText(item.desc, {
      x: x + 0.15, y: y + 0.52,
      w: cardW - 0.35, h: 0.55,
      fontFace: FONT, fontSize: 11,
      color: COLORS.textSecondary, valign: "top",
      lineSpacingMultiple: 1.2,
    });

    // Source
    if (item.source) {
      slide.addText(item.source, {
        x: x + 0.15, y: y + cardH - 0.28,
        w: cardW - 0.35, h: 0.22,
        fontFace: FONT, fontSize: 9, italic: true,
        color: COLORS.textMuted, valign: "bottom",
      });
    }
  });

  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages);
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 7 — Cita / Quote (fondo claro)
// ─────────────────────────────────────────────
function slideQuote(pres, data) {
  // data: { quote, author, source, notes, pageNum, totalPages }
  const slide = pres.addSlide();
  lightBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "light");
  addDecoCircles(slide, "bottomLeft", 0.05);

  addQuoteCard(slide, {
    quote: data.quote,
    author: data.author,
    source: data.source,
    x: 1.20, y: 1.10,
    w: 7.60, h: 3.60,
  });

  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages);
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 8 — Secuencia / Proceso (fondo claro)
// ─────────────────────────────────────────────
function slideSecuencia(pres, data) {
  // data: { tag, title, steps: [{ title, desc, icon? }], notes, pageNum, totalPages }
  const slide = pres.addSlide();
  lightBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "light");
  addContentHeader(slide, data.tag, data.title);

  const steps = data.steps || [];
  const cols = steps.length;
  const colW = (8.40 / cols) - 0.15;
  const startX = 0.60;
  const startY = 1.95;
  const colH = 2.80;

  steps.forEach((step, i) => {
    const x = startX + i * (colW + 0.15);

    // Number circle
    slide.addShape("ellipse", {
      x: x + colW / 2 - 0.22, y: startY,
      w: 0.44, h: 0.44,
      fill: { color: COLORS.midTeal },
    });
    slide.addText(`${i + 1}`, {
      x: x + colW / 2 - 0.22, y: startY,
      w: 0.44, h: 0.44,
      fontFace: FONT, fontSize: 14, bold: true,
      color: COLORS.white, align: "center", valign: "middle",
    });

    // Step title
    slide.addText(step.title, {
      x, y: startY + 0.55,
      w: colW, h: 0.40,
      fontFace: FONT, fontSize: 13, bold: true,
      color: COLORS.midTeal, align: "center", valign: "top",
    });

    // Step description
    slide.addText(step.desc, {
      x, y: startY + 1.00,
      w: colW, h: colH - 1.00,
      fontFace: FONT, fontSize: 11,
      color: COLORS.textSecondary, align: "center", valign: "top",
      lineSpacingMultiple: 1.3,
    });
  });

  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages);
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 9 — Comparativa (fondo claro)
// ─────────────────────────────────────────────
function slideComparativa(pres, data) {
  // data: { tag, title, left: { title, items }, right: { title, items }, insightBox, insightKeyword, notes, pageNum, totalPages }
  const slide = pres.addSlide();
  lightBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "light");
  addContentHeader(slide, data.tag, data.title);

  const colW = 4.00;
  const colH = data.insightBox ? 2.60 : 3.20;
  const colY = 1.95;

  // Left column (the "old/insufficient")
  slide.addShape("rect", {
    x: 0.60, y: colY, w: colW, h: colH,
    fill: { color: COLORS.offWhite },
  });
  slide.addText(data.left.title.toUpperCase(), {
    x: 0.80, y: colY + 0.10,
    w: colW - 0.40, h: 0.35,
    fontFace: FONT, fontSize: 14, bold: true,
    color: COLORS.textSecondary, align: "center",
    charSpacing: 0.5,
  });
  // Separator inside column
  slide.addShape("rect", {
    x: 0.80, y: colY + 0.45,
    w: colW - 0.40, h: 0.015,
    fill: { color: COLORS.border },
  });
  // Items
  const leftBullets = data.left.items.map(item => ({
    text: item,
    options: {
      fontFace: FONT, fontSize: 11,
      color: COLORS.textSecondary, bullet: { code: "2022" },
      lineSpacingMultiple: 1.5,
    },
  }));
  slide.addText(leftBullets, {
    x: 0.80, y: colY + 0.55,
    w: colW - 0.40, h: colH - 0.65,
    valign: "top",
  });

  // Arrow between columns
  slide.addText("\u2192", {
    x: 4.65, y: colY + colH / 2 - 0.20,
    w: 0.50, h: 0.40,
    fontFace: FONT, fontSize: 20,
    color: COLORS.coral, align: "center", valign: "middle",
  });

  // Right column (the "new/desirable")
  slide.addShape("rect", {
    x: 5.20, y: colY, w: colW, h: colH,
    fill: { color: COLORS.warmBg },
  });
  slide.addShape("rect", {
    x: 5.20, y: colY, w: 0.04, h: colH,
    fill: { color: COLORS.coralLight },
  });
  slide.addText(data.right.title.toUpperCase(), {
    x: 5.40, y: colY + 0.10,
    w: colW - 0.40, h: 0.35,
    fontFace: FONT, fontSize: 14, bold: true,
    color: COLORS.coral, align: "center",
    charSpacing: 0.5,
  });
  slide.addShape("rect", {
    x: 5.40, y: colY + 0.45,
    w: colW - 0.40, h: 0.015,
    fill: { color: COLORS.coralLight },
  });
  const rightBullets = data.right.items.map(item => ({
    text: item,
    options: {
      fontFace: FONT, fontSize: 11,
      color: COLORS.textPrimary, bullet: { code: "2022" },
      lineSpacingMultiple: 1.5,
    },
  }));
  slide.addText(rightBullets, {
    x: 5.40, y: colY + 0.55,
    w: colW - 0.40, h: colH - 0.65,
    valign: "top",
  });

  if (data.insightBox) addInsightBox(slide, data.insightBox, data.insightKeyword);
  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages);
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 11 — Reflexión / Pausa (fondo oscuro)
// ─────────────────────────────────────────────
function slideReflexion(pres, data) {
  // data: { tag, question, subtitle, notes, pageNum, totalPages }
  const slide = pres.addSlide();
  darkBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "dark");
  addDecoCircles(slide, "center", 0.04);

  // Tag
  if (data.tag) {
    slide.addText(data.tag.toUpperCase(), {
      x: 1.00, y: 1.30,
      w: 8.00, h: 0.30,
      fontFace: FONT, fontSize: 12, bold: true,
      color: COLORS.textLight, align: "center",
      charSpacing: 2,
    });
  }

  // Question
  slide.addText(data.question, {
    x: 1.00, y: 1.80,
    w: 8.00, h: 1.60,
    fontFace: FONT, fontSize: 24, bold: true,
    color: COLORS.white, align: "center", valign: "middle",
    lineSpacingMultiple: 1.2,
  });

  // Accent line
  addAccentLine(slide, 4.40, 3.50, 1.20);

  // Subtitle
  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 1.50, y: 3.70,
      w: 7.00, h: 0.80,
      fontFace: FONT, fontSize: 14,
      italic: true,
      color: COLORS.textDimmed, align: "center", valign: "top",
      lineSpacingMultiple: 1.3,
    });
  }

  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages, "dark");
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 12 — Resumen y Cierre (fondo oscuro)
// ─────────────────────────────────────────────
function slideResumenCierre(pres, data) {
  // data: { tag, title, items: [{ num, title, desc }], nextModule, contact, notes, pageNum, totalPages }
  const slide = pres.addSlide();
  darkBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "dark");
  addDecoCircles(slide, "topRight", 0.04);

  // Tag
  slide.addText((data.tag || "RESUMEN Y CIERRE").toUpperCase(), {
    x: 0.60, y: 0.80,
    w: 8.80, h: 0.25,
    fontFace: FONT, fontSize: SIZES.tag.fontSize, bold: true,
    color: COLORS.coral, charSpacing: SIZES.tag.charSpacing,
  });

  // Title
  slide.addText(data.title || "Ideas clave del módulo", {
    x: 0.60, y: 1.05,
    w: 8.80, h: 0.40,
    fontFace: FONT, fontSize: 22, bold: true,
    color: COLORS.white,
  });

  // Items
  const items = data.items || [];
  const itemStartY = 1.55;
  const itemH = 0.55;

  items.forEach((item, i) => {
    const y = itemStartY + i * (itemH + 0.10);

    // Number circle
    slide.addShape("ellipse", {
      x: 0.60, y: y + 0.05,
      w: 0.40, h: 0.40,
      fill: { color: COLORS.midTeal },
    });
    slide.addText(`${item.num || i + 1}`, {
      x: 0.60, y: y + 0.05,
      w: 0.40, h: 0.40,
      fontFace: FONT, fontSize: 14, bold: true,
      color: COLORS.white, align: "center", valign: "middle",
    });

    // Title
    slide.addText(item.title, {
      x: 1.15, y,
      w: 7.50, h: 0.25,
      fontFace: FONT, fontSize: 13, bold: true,
      color: COLORS.white, valign: "top",
    });

    // Desc
    if (item.desc) {
      slide.addText(item.desc, {
        x: 1.15, y: y + 0.25,
        w: 7.50, h: 0.25,
        fontFace: FONT, fontSize: 11,
        color: COLORS.textDimmed, valign: "top",
      });
    }
  });

  // Next module
  if (data.nextModule) {
    const nmY = itemStartY + items.length * (itemH + 0.10) + 0.20;
    slide.addShape("rect", {
      x: 0.60, y: nmY,
      w: 8.80, h: 0.015,
      fill: { color: COLORS.textDimmed },
    });
    slide.addText(`Siguiente: ${data.nextModule}`, {
      x: 0.60, y: nmY + 0.10,
      w: 8.80, h: 0.30,
      fontFace: FONT, fontSize: 12, bold: true,
      color: COLORS.coral,
    });
  }

  // Contact
  if (data.contact) {
    slide.addText(data.contact, {
      x: 0.60, y: 4.90,
      w: 8.80, h: 0.25,
      fontFace: FONT, fontSize: 10,
      color: COLORS.textDimmed,
    });
  }

  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages, "dark");
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 13 — Práctica / Meditación (fondo claro)
// ─────────────────────────────────────────────
function slidePractica(pres, data) {
  // data: { tag, title, subtitle, duration, steps: [string], notes, pageNum, totalPages }
  const slide = pres.addSlide();
  lightBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "light");

  // Badge "PRÁCTICA"
  addTag(slide, data.tag || "PRÁCTICA", 0.60, 0.85);

  // Title
  slide.addText(data.title, {
    x: 0.60, y: 1.25,
    w: 5.50, h: 0.45,
    fontFace: FONT, fontSize: 22, bold: true,
    color: COLORS.midTeal,
  });

  // Subtitle
  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 0.60, y: 1.70,
      w: 5.50, h: 0.30,
      fontFace: FONT, fontSize: 12,
      color: COLORS.textSecondary,
    });
  }

  // Duration circle (right side)
  if (data.duration) {
    const cx = 8.00, cy = 1.60, r = 0.55;
    slide.addShape("ellipse", {
      x: cx - r, y: cy - r,
      w: r * 2, h: r * 2,
      fill: { color: COLORS.offWhite },
      line: { color: COLORS.midTeal, width: 2 },
    });
    slide.addText(data.duration, {
      x: cx - r, y: cy - r,
      w: r * 2, h: r * 2,
      fontFace: FONT, fontSize: 14, bold: true,
      color: COLORS.midTeal, align: "center", valign: "middle",
    });
  }

  // Steps
  const steps = data.steps || [];
  const stepStartY = 2.20;

  steps.forEach((step, i) => {
    const y = stepStartY + i * 0.50;

    // Number circle
    slide.addShape("ellipse", {
      x: 0.60, y: y + 0.05,
      w: 0.30, h: 0.30,
      fill: { color: COLORS.midTeal },
    });
    slide.addText(`${i + 1}`, {
      x: 0.60, y: y + 0.05,
      w: 0.30, h: 0.30,
      fontFace: FONT, fontSize: 10, bold: true,
      color: COLORS.white, align: "center", valign: "middle",
    });

    // Step text
    slide.addText(step, {
      x: 1.05, y,
      w: 7.50, h: 0.40,
      fontFace: FONT, fontSize: 12,
      color: COLORS.textSecondary, valign: "middle",
    });
  });

  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages);
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 15 — Recorrido de 7 módulos (fondo claro)
// ─────────────────────────────────────────────
function slideRecorrido(pres, data) {
  // data: { tag, title, modules: [{ num, name, desc }], phases: [{ name, range }], notes, pageNum, totalPages }
  const slide = pres.addSlide();
  lightBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "light");
  addContentHeader(slide, data.tag || "RECORRIDO", data.title || "El viaje de 7 módulos");

  const modules = data.modules || [];
  const startX = 0.40;
  const dotY = 2.20;
  const spacing = 1.10;
  const dotR = 0.18;

  // Timeline line
  slide.addShape("rect", {
    x: startX + dotR, y: dotY + dotR - 0.01,
    w: (modules.length - 1) * spacing, h: 0.02,
    fill: { color: COLORS.border },
  });

  // Module dots and labels
  modules.forEach((mod, i) => {
    const x = startX + i * spacing;
    const mKey = `M${mod.num}`;
    const color = MODULE_COLORS[mKey] || COLORS.midTeal;
    const isHighlighted = mod.num === 0;

    // Dot
    slide.addShape("ellipse", {
      x, y: dotY,
      w: dotR * 2, h: dotR * 2,
      fill: { color },
      line: isHighlighted ? { color: COLORS.coral, width: 2 } : undefined,
    });

    // Module number
    slide.addText(`M${mod.num}`, {
      x, y: dotY,
      w: dotR * 2, h: dotR * 2,
      fontFace: FONT, fontSize: 7, bold: true,
      color: COLORS.white, align: "center", valign: "middle",
    });

    // Module name below
    slide.addText(mod.name, {
      x: x - 0.30, y: dotY + 0.45,
      w: dotR * 2 + 0.60, h: 0.50,
      fontFace: FONT, fontSize: 8, bold: true,
      color: COLORS.midTeal, align: "center", valign: "top",
      lineSpacingMultiple: 1.1,
    });

    // Short desc
    if (mod.desc) {
      slide.addText(mod.desc, {
        x: x - 0.30, y: dotY + 0.90,
        w: dotR * 2 + 0.60, h: 0.40,
        fontFace: FONT, fontSize: 7,
        color: COLORS.textMuted, align: "center", valign: "top",
      });
    }
  });

  // Phase labels below timeline
  const phases = data.phases || [];
  const phaseY = 3.80;

  phases.forEach((phase, i) => {
    const x = 0.60 + i * 3.10;
    const phaseColors = [COLORS.coral, COLORS.lightTeal, COLORS.midTeal];

    slide.addShape("rect", {
      x, y: phaseY,
      w: 2.80, h: 0.50,
      fill: { color: COLORS.offWhite },
    });
    slide.addShape("rect", {
      x, y: phaseY,
      w: 0.04, h: 0.50,
      fill: { color: phaseColors[i] || COLORS.midTeal },
    });
    slide.addText(`${phase.name} (${phase.range})`, {
      x: x + 0.15, y: phaseY,
      w: 2.50, h: 0.50,
      fontFace: FONT, fontSize: 10, bold: true,
      color: COLORS.midTeal, valign: "middle",
    });
  });

  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages);
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 18 — Principios / Lista con iconos
// ─────────────────────────────────────────────
function slidePrincipios(pres, data) {
  // data: { tag, title, items: [{ title, desc }], notes, pageNum, totalPages }
  const slide = pres.addSlide();
  lightBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "light");
  addContentHeader(slide, data.tag, data.title);
  addDecoCircles(slide, "right", 0.04);

  const items = data.items || [];
  const startY = 1.95;
  const itemH = items.length <= 4 ? 0.70 : 0.58;

  items.forEach((item, i) => {
    const y = startY + i * itemH;

    // Icon placeholder (small teal square)
    slide.addShape("roundRect", {
      x: 0.60, y: y + 0.05,
      w: 0.38, h: 0.38,
      fill: { color: COLORS.offWhite },
      line: { color: COLORS.primaryMuted, width: 1 },
      rectRadius: 0.06,
    });
    // Bullet number
    slide.addText(`${i + 1}`, {
      x: 0.60, y: y + 0.05,
      w: 0.38, h: 0.38,
      fontFace: FONT, fontSize: 12, bold: true,
      color: COLORS.midTeal, align: "center", valign: "middle",
    });

    // Title
    slide.addText(item.title, {
      x: 1.15, y,
      w: 7.00, h: 0.30,
      fontFace: FONT, fontSize: 13, bold: true,
      color: COLORS.midTeal, valign: "middle",
    });

    // Description
    if (item.desc) {
      slide.addText(item.desc, {
        x: 1.15, y: y + 0.28,
        w: 7.00, h: 0.28,
        fontFace: FONT, fontSize: 11,
        color: COLORS.textSecondary, valign: "top",
      });
    }
  });

  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages);
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 21 — Recursos / Referencias (fondo claro)
// ─────────────────────────────────────────────
function slideRecursos(pres, data) {
  // data: { tag, title, refs: [{ author, title, note }], notes, pageNum, totalPages }
  const slide = pres.addSlide();
  lightBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "light");
  addContentHeader(slide, data.tag || "PARA PROFUNDIZAR", data.title || "Fuentes principales");

  const refs = data.refs || [];
  const cols = 2;
  const colW = 4.00;
  const startX = 0.60;
  const startY = 1.95;
  const gapX = 0.60;
  const refH = 0.78;

  refs.forEach((ref, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (colW + gapX);
    const y = startY + row * refH;

    // Left border
    slide.addShape("rect", {
      x, y, w: 0.04, h: refH - 0.10,
      fill: { color: COLORS.coral },
    });

    // Author
    slide.addText(ref.author, {
      x: x + 0.15, y,
      w: colW - 0.20, h: 0.18,
      fontFace: FONT, fontSize: 10, bold: true,
      color: COLORS.midTeal, valign: "top",
    });

    // Title
    slide.addText(ref.title, {
      x: x + 0.15, y: y + 0.18,
      w: colW - 0.20, h: 0.30,
      fontFace: FONT, fontSize: 9, italic: true,
      color: COLORS.textSecondary, valign: "top",
      lineSpacingMultiple: 1.1,
    });

    // Note
    if (ref.note) {
      slide.addText(ref.note, {
        x: x + 0.15, y: y + 0.50,
        w: colW - 0.20, h: 0.16,
        fontFace: FONT, fontSize: 8,
        color: COLORS.textMuted, valign: "top",
      });
    }
  });

  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages);
  return slide;
}

// ─────────────────────────────────────────────
// TIPO 22 — Claim / Impacto (fondo oscuro)
// ─────────────────────────────────────────────
function slideClaim(pres, data) {
  // data: { tag, concept, definition, subtext, notes, pageNum, totalPages }
  const slide = pres.addSlide();
  darkBg(slide);
  if (data.notes) slide.addNotes(data.notes);

  addLogoLockup(slide, "dark");
  addDecoCircles(slide, "topRight", 0.03);

  // Tag
  if (data.tag) {
    slide.addText(data.tag.toUpperCase(), {
      x: 1.00, y: 1.00,
      w: 8.00, h: 0.30,
      fontFace: FONT, fontSize: 12, bold: true,
      color: COLORS.textLight, align: "center",
      charSpacing: 2,
    });
  }

  // Concept (large coral text)
  slide.addText(data.concept.toUpperCase(), {
    x: 0.40, y: 1.10,
    w: 9.20, h: 1.80,
    fontFace: FONT,
    fontSize: 36,
    bold: true,
    color: COLORS.coral,
    align: "center",
    valign: "middle",
    lineSpacingMultiple: 1.05,
  });

  // Accent line below concept
  addAccentLine(slide, 3.50, 3.00, 3.00, COLORS.coral);

  // Definition
  if (data.definition) {
    slide.addText(data.definition, {
      x: 1.00, y: 3.15,
      w: 8.00, h: 1.00,
      fontFace: FONT,
      fontSize: 14,
      color: COLORS.white,
      align: "center",
      valign: "top",
      lineSpacingMultiple: 1.3,
    });
  }

  // Subtext
  if (data.subtext) {
    slide.addText(data.subtext, {
      x: 1.50, y: 4.30,
      w: 7.00, h: 0.45,
      fontFace: FONT, fontSize: 12,
      italic: true,
      color: COLORS.textDimmed,
      align: "center",
    });
  }

  if (data.pageNum) addPageNumber(slide, data.pageNum, data.totalPages, "dark");
  return slide;
}

module.exports = {
  slidePortada,
  slideHojaRuta,
  slideSeparador,
  slideContenido,
  slideDatoImpacto,
  slideEvidenceGrid,
  slideQuote,
  slideSecuencia,
  slideComparativa,
  slideReflexion,
  slideResumenCierre,
  slidePractica,
  slideRecorrido,
  slidePrincipios,
  slideRecursos,
  slideClaim,
};
