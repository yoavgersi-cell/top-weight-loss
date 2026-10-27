import type { TrustpilotReview } from "@/lib/config";
import { REVIEW_RECORDS } from "@/data/reviews";
import type { ProviderReviewRecord } from "@/data/reviews/types";
import { REVIEW_THEMES, resolveThemes, reviewKey, type ProviderThemes, type ResolvedTheme } from "@/data/reviews/themes";

// ───── Review analysis pages ─────
// One page per weight-loss provider with a large enough stored review set:
// /weight-loss/review-analysis/<providerId>. Everything on those pages is
// computed here from the registry (src/data/reviews) and the themes file; no
// figure is typed into the page. A provider qualifies when it has at least
// REVIEW_ANALYSIS_MIN transcribed reviews and a written theme summary.

export const REVIEW_ANALYSIS_MIN = 40;

export const analysisPath = (providerId: string) => `/weight-loss/review-analysis/${providerId}`;

const totalReviews = (r: ProviderReviewRecord) => r.batches.reduce((n, b) => n + b.reviews.length, 0);

export function reviewAnalysisRecords(): ProviderReviewRecord[] {
  return REVIEW_RECORDS.filter(
    (r) => r.vertical === "weight-loss" && REVIEW_THEMES[r.providerId]?.summary && totalReviews(r) >= REVIEW_ANALYSIS_MIN,
  );
}

export function hasReviewAnalysis(providerId: string): boolean {
  return reviewAnalysisRecords().some((r) => r.providerId === providerId);
}

export const allReviews = (r: ProviderReviewRecord): TrustpilotReview[] => r.batches.flatMap((b) => b.reviews);

export function reviewTime(r: TrustpilotReview): number {
  if (!r.date) return 0;
  const t = new Date(`${r.date} UTC`).getTime();
  return isNaN(t) ? 0 : t;
}

export type StarRow = { stars: number; count: number; pct: number };

/** Count of stored reviews at each star level, 5 first. */
export function starDistribution(r: ProviderReviewRecord): { rows: StarRow[]; total: number; positive: number; low: number } {
  const all = allReviews(r);
  const total = all.length;
  const rows = [5, 4, 3, 2, 1].map((stars) => {
    const count = all.filter((x) => Math.round(x.rating) === stars).length;
    return { stars, count, pct: total ? Math.round((count / total) * 100) : 0 };
  });
  return { rows, total, positive: all.filter((x) => x.rating >= 4).length, low: all.filter((x) => x.rating <= 3).length };
}

export type MonthRow = { label: string; key: string; count: number; positive: number; low: number };

/** Dated stored reviews grouped by the month Trustpilot displayed, oldest first; undated reviews counted separately. */
export function monthlyCounts(r: ProviderReviewRecord): { rows: MonthRow[]; undated: number } {
  const map = new Map<string, MonthRow>();
  let undated = 0;
  for (const x of allReviews(r)) {
    const t = reviewTime(x);
    if (!t) {
      undated++;
      continue;
    }
    const d = new Date(t);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
    const row = map.get(key) ?? { label, key, count: 0, positive: 0, low: 0 };
    row.count++;
    if (x.rating >= 4) row.positive++;
    else row.low++;
    map.set(key, row);
  }
  return { rows: [...map.values()].sort((a, b) => a.key.localeCompare(b.key)), undated };
}

export function dateRange(r: ProviderReviewRecord): { from: number; to: number } | null {
  const ts = allReviews(r).map(reviewTime).filter((t) => t > 0);
  return ts.length ? { from: Math.min(...ts), to: Math.max(...ts) } : null;
}

/** Latest batch capture date (YYYY-MM-DD or YYYY-MM), for "reviews captured through". */
export function latestCapture(r: ProviderReviewRecord): string | undefined {
  return r.batches.map((b) => b.capturedOn).filter((d): d is string => !!d).sort().pop();
}

export type ThemeExcerpt = { theme: ResolvedTheme; review: TrustpilotReview; excerpt: string };

/** Trim a review to its first sentences, whole, within roughly `max` characters. */
export function excerptOf(text: string, max = 280): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const sentences = clean.split(/(?<=[.!?])\s+/);
  let out = "";
  for (const s of sentences) {
    if ((out + " " + s).trim().length > max) break;
    out = (out + " " + s).trim();
  }
  return out.length >= 60 ? `${out}…` : `${clean.slice(0, max).trim()}…`;
}

/**
 * For each resolved theme, a stored review to quote that is NOT the one the
 * review page already quotes under the theme and NOT one of its featured
 * reviews, so the analysis page adds excerpts rather than repeating them.
 * Prefers longer reviews, which carry more of the reasoning.
 */
export function freshExcerpts(record: ProviderReviewRecord, themes: ProviderThemes, resolved: ResolvedTheme[]): ThemeExcerpt[] {
  const byKey = new Map<string, TrustpilotReview>();
  for (const x of allReviews(record)) if (!byKey.has(reviewKey(x))) byKey.set(reviewKey(x), x);
  const taken = new Set<string>([...(themes.featured ?? []).map((f) => f.ref), ...themes.praise.map((t) => t.quote ?? ""), ...themes.criticism.map((t) => t.quote ?? "")]);
  const out: ThemeExcerpt[] = [];
  for (const theme of resolved) {
    const candidates = theme.refs
      .filter((k) => !taken.has(k) && byKey.has(k))
      .map((k) => byKey.get(k)!)
      .filter((x) => x.text.trim().length >= 80)
      .sort((a, b) => b.text.length - a.text.length);
    const review = candidates[0];
    if (!review) continue;
    taken.add(reviewKey(review));
    out.push({ theme, review, excerpt: excerptOf(review.text) });
  }
  return out;
}

export function analysisFor(record: ProviderReviewRecord) {
  const themes = REVIEW_THEMES[record.providerId];
  const { praise, criticism, total } = resolveThemes(record, themes);
  const byCount = (a: ResolvedTheme, b: ResolvedTheme) => b.count - a.count;
  return {
    themes,
    total,
    praise: [...praise].sort(byCount),
    criticism: [...criticism].sort(byCount),
    stars: starDistribution(record),
    months: monthlyCounts(record),
    range: dateRange(record),
    capturedThrough: latestCapture(record),
  };
}
