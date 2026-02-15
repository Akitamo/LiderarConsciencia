// components.js — Reusable slide components for PptxGenJS
const { COLORS, FONT, SIZES, POS } = require("./tokens");
const { loadAssetBase64 } = require("./icons");

/**
 * Add logo lockup (logo PNG + "Liderar con Consciencia" text)
 * @param {object} slide - PptxGenJS slide
 * @param {"light"|"dark"} variant - Which logo variant to use
 */
function addLogoLockup(slide, variant = "light") {
  const logoFile = variant === "dark" ? "logo-dark.png" : "logo-light.png";
  const logoB64 = loadAssetBase64(logoFile);
  const textColor = variant === "dark" ? COLORS.textLight : COLORS.textPrimary;

  slide.addImage({
    data: `image/png;base64,${logoB64}`,
    x: POS.logo.x, y: POS.logo.y,
    w: POS.logo.w, h: POS.logo.h,
  });

  slide.addText("Liderar con Consciencia", {
    x: POS.lockupText.x, y: POS.lockupText.y,
    w: 2.0, h: 0.35,
    fontFace: FONT,
    fontSize: POS.lockupText.fontSize,
    bold: true,
    color: textColor,
    valign: "middle",
  });
}

/**
 * Add page number "X / N"
 * @param {object} slide - PptxGenJS slide
 * @param {number} current - Current page
 * @param {number} total - Total pages
 * @param {"light"|"dark"} variant
 */
function addPageNumber(slide, current, total, variant = "light") {
  const color = variant === "dark" ? COLORS.textDimmed : COLORS.textMuted;
  slide.addText(`${current} / ${total}`, {
    x: POS.pageNum.x, y: POS.pageNum.y,
    w: 0.80, h: 0.30,
    fontFace: FONT,
    fontSize: SIZES.pageNum.fontSize,
    color,
    align: "right",
    valign: "bottom",
  });
}

/**
 * Add decorative circles PNG
 * @param {object} slide - PptxGenJS slide
 * @param {"topRight"|"bottomLeft"|"right"|"center"} position
 * @param {number} opacity - 0 to 1
 */
function addDecoCircles(slide, position = "topRight", opacity = 0.08) {
  const b64 = loadAssetBase64("circulos-deco.png");
  const posData = {
    topRight:   POS.circlesTopRight,
    bottomLeft: POS.circlesBottomLeft,
    right:      POS.circlesRight,
    center:     { x: 3.50, y: 1.00, w: 3.50, h: 3.50 },
  }[position] || POS.circlesTopRight;

  slide.addImage({
    data: `image/png;base64,${b64}`,
    x: posData.x, y: posData.y,
    w: posData.w, h: posData.h,
    transparency: Math.round((1 - opacity) * 100),
  });
}

/**
 * Add header (tag + title + separator line) for content slides
 * @param {object} slide - PptxGenJS slide
 * @param {string} tag - Tag text (uppercase)
 * @param {string} title - Title text
 */
function addContentHeader(slide, tag, title) {
  // Tag (coral, uppercase)
  slide.addText(tag.toUpperCase(), {
    x: POS.header.tag.x, y: POS.header.tag.y,
    w: 8.80, h: 0.25,
    fontFace: FONT,
    fontSize: SIZES.tag.fontSize,
    bold: true,
    color: COLORS.coral,
    charSpacing: SIZES.tag.charSpacing,
    valign: "bottom",
  });

  // Title h2 (midTeal)
  slide.addText(title, {
    x: POS.header.title.x, y: POS.header.title.y,
    w: 8.80, h: 0.70,
    fontFace: FONT,
    fontSize: 24,
    bold: true,
    color: COLORS.midTeal,
    valign: "top",
  });

  // Separator line
  slide.addShape("rect", {
    x: POS.header.tag.x, y: POS.header.lineY,
    w: 8.80, h: 0.02,
    fill: { color: COLORS.border },
  });
}

/**
 * Add insight box at the bottom of a slide
 * @param {object} slide - PptxGenJS slide
 * @param {string} text - Insight text
 * @param {string} [keyword] - Keyword to highlight in coral
 */
function addInsightBox(slide, text, keyword) {
  const y = 4.70;
  // Background bar
  slide.addShape("rect", {
    x: 0, y,
    w: 10.0, h: 0.60,
    fill: { color: COLORS.midTeal },
  });

  if (keyword && text.includes(keyword)) {
    // Split text around keyword for dual-color rendering
    const parts = text.split(keyword);
    const fullText = [
      { text: parts[0], options: { color: COLORS.white, fontFace: FONT, fontSize: 12 } },
      { text: keyword, options: { color: COLORS.coral, fontFace: FONT, fontSize: 12, bold: true } },
      { text: parts[1] || "", options: { color: COLORS.white, fontFace: FONT, fontSize: 12 } },
    ];
    slide.addText(fullText, {
      x: 0.60, y,
      w: 8.80, h: 0.60,
      valign: "middle",
      align: "center",
    });
  } else {
    slide.addText(text, {
      x: 0.60, y,
      w: 8.80, h: 0.60,
      fontFace: FONT,
      fontSize: 12,
      color: COLORS.white,
      align: "center",
      valign: "middle",
    });
  }
}

/**
 * Add a quote card component
 * @param {object} slide - PptxGenJS slide
 * @param {object} data - { quote, author, source, x, y, w, h }
 */
function addQuoteCard(slide, { quote, author, source, x, y, w, h }) {
  // Card background
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: COLORS.offWhite },
  });
  // Left border coral
  slide.addShape("rect", {
    x, y, w: 0.06, h,
    fill: { color: COLORS.coral },
  });
  // Quote marks
  const qmB64 = loadAssetBase64("quote-mark.png");
  slide.addImage({
    data: `image/png;base64,${qmB64}`,
    x: x + 0.25, y: y + 0.15,
    w: 0.35, h: 0.25,
    transparency: 50,
  });
  // Quote text
  slide.addText(quote, {
    x: x + 0.25, y: y + 0.45,
    w: w - 0.50, h: h - 1.10,
    fontFace: FONT,
    fontSize: SIZES.quoteText.fontSize,
    italic: true,
    color: COLORS.midTeal,
    valign: "top",
    lineSpacingMultiple: 1.3,
  });
  // Author
  slide.addText(author.toUpperCase(), {
    x: x + 0.25, y: y + h - 0.65,
    w: w - 0.50, h: 0.25,
    fontFace: FONT,
    fontSize: SIZES.quoteAuthor.fontSize,
    bold: true,
    color: COLORS.coral,
    charSpacing: 0.8,
  });
  // Source
  if (source) {
    slide.addText(source, {
      x: x + 0.25, y: y + h - 0.40,
      w: w - 0.50, h: 0.25,
      fontFace: FONT,
      fontSize: 10,
      italic: true,
      color: COLORS.textSecondary,
    });
  }
}

/**
 * Add a content card with left border
 * @param {object} slide
 * @param {object} data - { x, y, w, h, borderColor, bgColor, items }
 */
function addContentCard(slide, { x, y, w, h, borderColor, bgColor, items }) {
  const bg = bgColor || COLORS.white;
  const border = borderColor || COLORS.midTeal;

  slide.addShape("rect", { x, y, w, h, fill: { color: bg } });
  slide.addShape("rect", { x, y, w: 0.05, h, fill: { color: border } });

  let textY = y + 0.15;
  for (const item of items) {
    if (item.type === "number") {
      slide.addText(item.text, {
        x: x + w - 0.70, y,
        w: 0.60, h: 0.50,
        fontFace: FONT, fontSize: 28, bold: true,
        color: COLORS.primaryMuted, align: "right", valign: "top",
      });
    } else if (item.type === "title") {
      slide.addText(item.text, {
        x: x + 0.20, y: textY,
        w: w - 0.40, h: 0.50,
        fontFace: FONT, fontSize: 12, bold: true,
        color: COLORS.midTeal, valign: "top",
        lineSpacingMultiple: 1.1,
      });
      textY += 0.45;
    } else {
      slide.addText(item.text, {
        x: x + 0.20, y: textY,
        w: w - 0.40, h: 0.25,
        fontFace: FONT, fontSize: 11,
        color: COLORS.textSecondary, valign: "top",
        lineSpacingMultiple: 1.2,
      });
      textY += 0.25;
    }
  }
}

/**
 * Add a tag badge
 * @param {object} slide
 * @param {string} text
 * @param {number} x
 * @param {number} y
 * @param {object} [opts] - { bgColor, textColor }
 */
function addTag(slide, text, x, y, opts = {}) {
  const bgColor = opts.bgColor || COLORS.coral;
  const textColor = opts.textColor || COLORS.white;
  const w = Math.max(text.length * 0.10 + 0.30, 1.20);

  slide.addShape("roundRect", {
    x, y, w, h: 0.28,
    fill: { color: bgColor },
    rectRadius: 0.14,
  });
  slide.addText(text.toUpperCase(), {
    x, y, w, h: 0.28,
    fontFace: FONT,
    fontSize: 8,
    bold: true,
    color: textColor,
    align: "center",
    valign: "middle",
    charSpacing: 1.0,
  });
}

/**
 * Add accent line (coral bar)
 * @param {object} slide
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {string} [color]
 */
function addAccentLine(slide, x, y, w = 1.20, color) {
  slide.addShape("rect", {
    x, y, w, h: 0.06,
    fill: { color: color || COLORS.coral },
  });
}

/**
 * Add image placeholder (dashed border box with label)
 * @param {object} slide
 * @param {string} label - Description of expected image
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {object} [opts] - { bgColor, borderColor, fontSize }
 */
function addImagePlaceholder(slide, label, x, y, w, h, opts = {}) {
  const bgColor = opts.bgColor || COLORS.bgAlt;
  const borderColor = opts.borderColor || COLORS.border;
  const fontSize = opts.fontSize || 9;

  // Background rect
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: bgColor },
    line: { color: borderColor, width: 1, dashType: "dash" },
  });

  // Image icon (camera emoji placeholder)
  slide.addText("\u{1F5BC}", {
    x, y: y + h / 2 - 0.25,
    w, h: 0.30,
    fontFace: FONT, fontSize: 16,
    color: COLORS.textMuted, align: "center", valign: "middle",
  });

  // Label text
  slide.addText(label, {
    x: x + 0.10, y: y + h / 2 + 0.05,
    w: w - 0.20, h: 0.40,
    fontFace: FONT, fontSize,
    color: COLORS.textMuted, align: "center", valign: "top",
    lineSpacingMultiple: 1.1,
  });
}

module.exports = {
  addLogoLockup,
  addPageNumber,
  addDecoCircles,
  addContentHeader,
  addInsightBox,
  addQuoteCard,
  addContentCard,
  addTag,
  addAccentLine,
  addImagePlaceholder,
};
