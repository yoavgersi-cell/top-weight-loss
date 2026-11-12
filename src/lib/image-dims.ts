import dims from "./image-dims.json";

// Intrinsic width/height of the static images under public/ (logos, heroes,
// article images), generated with sharp on Nov 12, 2026. Spread the result
// onto an <img> so the browser reserves the right box before the file loads
// (no layout shift) even when CSS then scales it. Unknown paths spread to
// nothing, so a missing entry never breaks a render.
const DIMS = dims as unknown as Record<string, [number, number]>;

export function imgDims(src: string | undefined | null): { width: number; height: number } | Record<string, never> {
  if (!src) return {};
  const d = DIMS[src.split("?")[0]];
  return d ? { width: d[0], height: d[1] } : {};
}
