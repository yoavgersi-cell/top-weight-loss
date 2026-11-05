// Article hero backgrounds sit behind dark text (title, intro, review bar).
// Some ported guides carry a dark heroColor from their original design
// (white-text heroes), which rendered dark-on-dark and unreadable (operator
// report, Nov 5, 2026). Any colour too dark for dark text falls back to the
// site's light brand tint, so every hero stays readable whatever the data says.
const FALLBACK = "#EEF3F8";

function luminance(hex: string): number | null {
  const m = hex.trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  const h = m[1].length === 3 ? m[1].split("").map((c) => c + c).join("") : m[1];
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** A hero background safe for dark text: the given colour if light enough, else the brand tint. */
export function readableHeroColor(color?: string): string {
  if (!color) return FALLBACK;
  const l = luminance(color);
  // Contrast of #191919 text on the background must clear 7:1 (AAA); that
  // needs a background luminance of roughly 0.45 or more.
  return l !== null && l >= 0.45 ? color : FALLBACK;
}
