import Link from "next/link";
import {
  NOINDEX_ARTICLE_SLUGS,
  NOINDEX_WL_BATTLE_SLUGS,
  NOINDEX_WL_REVIEW_SLUGS,
  type SiteConfig,
} from "@/lib/config";
import { hubLink, type SiteContext } from "@/lib/site-context";

// ───── Sibling links (crawl paths) ─────
// Nov 4, 2026 internal-link audit: no page was a true orphan, but 31 sitemap
// URLs had fewer than five internal links (four weight-loss reviews had one,
// from the reviews index only). These blocks link each review, comparison and
// guide to its siblings in the same category, so every page is reachable from
// many pages, not just an index.
//
// Selection is deterministic: "the next N after the current page" in the
// category's own order, wrapping around. Every page therefore receives the
// same number of sibling links (N), spread evenly, and the set only changes
// when pages are added. Labels are each destination's own title or name, so
// nothing here can drift from the page it points at. Noindexed pages are left
// out, as they are from the sitemap.

export type SiblingLink = { href: string; label: string };

export const CATEGORY_LABEL: Record<string, string> = {
  "weight-loss": "weight loss",
  "hair-loss": "hair loss",
  trt: "TRT",
  hrt: "HRT",
  "online-therapy": "online therapy",
  ed: "ED",
};

/** The next `count` items after `currentHref`, wrapping; all others when count is omitted. */
export function pickSiblings(items: SiblingLink[], currentHref: string, count?: number): SiblingLink[] {
  const others = items.filter((x) => x.href !== currentHref);
  if (count === undefined || others.length <= count) return others;
  const at = items.findIndex((x) => x.href === currentHref);
  if (at < 0) return others.slice(0, count);
  const out: SiblingLink[] = [];
  for (let k = 1; out.length < count && k < items.length; k++) {
    const next = items[(at + k) % items.length];
    if (next.href !== currentHref) out.push(next);
  }
  return out;
}

const NOINDEX_ARTICLES = new Set<string>(NOINDEX_ARTICLE_SLUGS);
const stripBrand = (t: string) => t.replace(/\s*\|\s*Treatments Hub\s*$/i, "").trim();

export function reviewSiblings(config: SiteConfig, ctx: SiteContext): SiblingLink[] {
  const names = new Map(config.providers.map((p) => [p.id, p.name] as const));
  return (config.reviews ?? [])
    .filter((r) => !(ctx.vertical === "weight-loss" && NOINDEX_WL_REVIEW_SLUGS.has(r.slug)))
    .map((r) => ({ href: hubLink(ctx, `/reviews/${r.slug}`), label: `${names.get(r.providerId) ?? r.slug} review` }));
}

export function comparisonSiblings(config: SiteConfig, ctx: SiteContext): SiblingLink[] {
  const names = new Map(config.providers.map((p) => [p.id, p.name] as const));
  const battles = (config.battles ?? [])
    .filter((b) => !(ctx.vertical === "weight-loss" && NOINDEX_WL_BATTLE_SLUGS.has(b.slug)))
    .map((b) => ({
      href: hubLink(ctx, `/${b.slug}`),
      label: b.matchupLabel ?? `${names.get(b.provider1Id) ?? b.provider1Id} vs ${names.get(b.provider2Id) ?? b.provider2Id}`,
    }));
  const landings = (config.landingPages ?? []).map((lp) => ({ href: hubLink(ctx, `/${lp.slug}`), label: stripBrand(lp.seoTitle) }));
  return [...landings, ...battles];
}

export function articleSiblings(config: SiteConfig, ctx: SiteContext): SiblingLink[] {
  return (config.articles ?? [])
    .filter((a) => !NOINDEX_ARTICLES.has(a.slug))
    .map((a) => ({ href: hubLink(ctx, `/articles/${a.slug}`), label: a.title }));
}

export function SiblingLinks({
  title,
  links,
  className = "",
}: {
  title: string;
  links: SiblingLink[];
  className?: string;
}) {
  if (links.length === 0) return null;
  return (
    <nav aria-label={title} className={`rounded-xl border border-gray-200 bg-white p-5 ${className}`}>
      <h2 className="mb-3 text-[17px] font-bold text-[#191919]">{title}</h2>
      <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href} className="min-w-0">
            <Link href={l.href} className="block truncate text-[14.5px] font-medium text-[#0C4B75] hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
