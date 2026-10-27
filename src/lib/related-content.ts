import type { Article } from "@/data/articles";

// ───── Related-content selection ─────
// Two deterministic helpers that replace "first three articles in the same
// category" (which sent every article's related links to the same handful of
// pages and left most articles with no contextual inlink at all):
//
//  - relatedArticles(): the N articles whose title, slug and description share
//    the most words with the current one, category as a tie-break. Every
//    article in a vertical ends up linked from its closest siblings, with the
//    sibling's own title as the anchor.
//  - providerArticles(): the brand-question cluster for one provider (is-X-
//    legit, X-cost, X-alternatives, X-tirzepatide-review ...) so a comparison
//    page can link both providers' clusters.

const STOP = new Set(
  "the a an and or of to in for on with vs versus is are what how why when where which your you our it its by from at as into than that this these those does do can should will best top guide review reviews online weight loss 2026 2025 complete full real honest month per".split(" "),
);

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((t) => t.length >= 3 && !STOP.has(t));
}

export function relatedArticles(all: Article[], current: Article, n = 3): Article[] {
  const titleT = new Set(tokens(`${current.title} ${current.slug.replace(/-/g, " ")}`));
  const descT = new Set(tokens(current.description ?? ""));
  const scored = all
    .filter((a) => a.slug !== current.slug)
    .map((a) => {
      const at = tokens(`${a.title} ${a.slug.replace(/-/g, " ")}`);
      const ad = tokens(a.description ?? "");
      let score = 0;
      for (const t of new Set(at)) {
        if (titleT.has(t)) score += 3;
        else if (descT.has(t)) score += 1;
      }
      for (const t of new Set(ad)) if (titleT.has(t)) score += 1;
      if (a.category === current.category) score += 1;
      return { a, score };
    })
    .sort((x, y) => y.score - x.score || x.a.slug.localeCompare(y.a.slug));
  return scored.slice(0, n).map((x) => x.a);
}

const CLUSTER_RE = /(legit|cost|price|pricing|alternatives|review|vs)/;

/** Articles about one provider: the slug names the provider id as a whole segment and is a brand-question piece. */
export function providerArticles(all: Article[], providerId: string): Article[] {
  const id = providerId.toLowerCase();
  return all
    .filter((a) => {
      const segs = a.slug.toLowerCase().split("-");
      return segs.includes(id) && CLUSTER_RE.test(a.slug) && !/-vs-/.test(a.slug);
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}
