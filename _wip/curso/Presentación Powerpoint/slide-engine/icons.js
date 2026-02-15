// icons.js — Generate PNG base64 from @iconify/json SVGs via sharp
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Cache generated icons in memory
const cache = new Map();

// Load iconify icon set on demand
let heroiconsData = null;
function getHeroicons() {
  if (!heroiconsData) {
    const jsonPath = require.resolve("@iconify/json/json/heroicons.json");
    heroiconsData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  }
  return heroiconsData;
}

// Also try Material Design Icons as fallback
let mdiData = null;
function getMdi() {
  if (!mdiData) {
    try {
      const jsonPath = require.resolve("@iconify/json/json/mdi.json");
      mdiData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    } catch {
      mdiData = { icons: {} };
    }
  }
  return mdiData;
}

/**
 * Get SVG string for an iconify icon
 * @param {string} name - Icon name (e.g., "device-phone-mobile" for heroicons)
 * @param {string} color - Hex color WITHOUT '#'
 * @param {number} size - Output size in px
 * @returns {string} SVG string
 */
function getIconSvg(name, color = "2A5058", size = 128) {
  const data = getHeroicons();
  let iconData = data.icons[name];
  let viewBox = `0 0 ${data.width || 24} ${data.height || 24}`;

  if (!iconData) {
    // Try outline variant
    iconData = data.icons[name + "-outline"] || data.icons[name + "-solid"];
  }

  if (!iconData) {
    // Fallback: MDI
    const mdi = getMdi();
    iconData = mdi.icons[name];
    if (iconData) {
      viewBox = `0 0 ${mdi.width || 24} ${mdi.height || 24}`;
    }
  }

  if (!iconData) {
    // Return a simple circle as placeholder
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}">
      <circle cx="12" cy="12" r="10" fill="#${color}" opacity="0.2"/>
      <circle cx="12" cy="12" r="6" fill="#${color}" opacity="0.4"/>
    </svg>`;
  }

  const body = iconData.body.replace(/currentColor/g, `#${color}`);
  // If body doesn't have fill/stroke with color, add fill
  const coloredBody = body.includes(`#${color}`) ? body : body.replace(/<path/g, `<path fill="#${color}"`);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${size}" height="${size}">
    ${coloredBody}
  </svg>`;
}

/**
 * Generate a base64 PNG from an iconify icon
 * @param {string} name - Icon name
 * @param {string} color - Hex color WITHOUT '#'
 * @param {number} size - Output size in px
 * @returns {Promise<string>} base64 data string (no prefix)
 */
async function getIconBase64(name, color = "2A5058", size = 128) {
  const cacheKey = `${name}_${color}_${size}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const svg = getIconSvg(name, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  const b64 = pngBuffer.toString("base64");
  cache.set(cacheKey, b64);
  return b64;
}

/**
 * Load a local PNG asset as base64
 * @param {string} filename - File in assets/ folder
 * @returns {string} base64 data string
 */
function loadAssetBase64(filename) {
  const cacheKey = `asset_${filename}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const filePath = path.join(__dirname, "assets", filename);
  const buffer = fs.readFileSync(filePath);
  const b64 = buffer.toString("base64");
  cache.set(cacheKey, b64);
  return b64;
}

// Icon name mapping for M00 concepts → heroicons names
const ICON_MAP = {
  "fragmentacion":   "device-phone-mobile",
  "legitimidad":     "shield-exclamation",
  "ia":              "cpu-chip",
  "agotamiento":     "fire",
  "desconexion":     "eye-slash",
  "cinismo":         "face-frown",
  "burnout":         "bolt",
  "foco":            "eye",
  "discernimiento":  "light-bulb",
  "espacio":         "heart",
  "humanidad":       "user-group",
  "reloj":           "clock",
  "check":           "check-circle",
  "x-no":            "x-circle",
  "flecha":          "arrow-right",
  "libro":           "book-open",
  "semilla":         "sparkles",
};

module.exports = { getIconBase64, getIconSvg, loadAssetBase64, ICON_MAP };
