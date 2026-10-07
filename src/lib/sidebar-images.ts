// ───── Sidebar featured-provider creatives ─────
// The CMS stores each provider's sidebar creative as a PNG path
// (/sidebar/<id>.png). Every PNG has a WebP twin at the same basename,
// generated at 676px wide (2x the 338px the sidebar renders), and the PNG
// itself is kept as the fallback at the same size. Dimensions are recorded
// here so the <img> can carry explicit width/height (Lighthouse CLS audit,
// Oct 7, 2026) without reading files at render time. Regenerate both the
// files and this table together whenever a creative changes.
export const SIDEBAR_IMAGE_DIMS: Record<string, { width: number; height: number }> = {
  "/sidebar/altrx.png": { width: 676, height: 836 },
  "/sidebar/directmeds.png": { width: 676, height: 907 },
  "/sidebar/embody.png": { width: 676, height: 898 },
  "/sidebar/livbody.png": { width: 676, height: 905 },
  "/sidebar/shed.png": { width: 676, height: 831 },
  "/sidebar/sprout.png": { width: 676, height: 908 },
};

/** WebP twin for a /sidebar/*.png path, or null when the path isn't one of ours. */
export function sidebarWebp(src: string): string | null {
  return /^\/sidebar\/[a-z0-9-]+\.png$/i.test(src) ? src.replace(/\.png$/i, ".webp") : null;
}
