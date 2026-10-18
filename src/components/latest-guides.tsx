import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NOINDEX_ARTICLE_SLUGS, VERTICALS, type ArticleData } from "@/lib/config";

// ───── Latest guides ─────
// A dated grid of the newest guides, used on the hub home (across every
// published vertical) and on each vertical home (that vertical only). Every
// card carries the guide's own updated date and byline, so a crawler or an
// answer engine landing on a home page can see that the site publishes dated,
// attributed editorial without having to find the articles index first.
// Everything shown comes from the article record itself - nothing is derived.

export type GuideItem = { vertical: string; article: ArticleData };

const NAME_BY_VERTICAL = new Map(VERTICALS.map((v) => [v.id, v.name] as const));
const PARKED = new Set<string>(NOINDEX_ARTICLE_SLUGS);

const stamp = (a: ArticleData) => Date.parse(a.updatedAt || a.publishedAt || "") || 0;

/**
 * Newest guides across the given verticals, most recently updated first.
 * `pinned` slugs (any vertical) lead the list in the order given - the hub
 * home uses this for the guides Google has been slow to index.
 */
export function newestGuides(byVertical: Record<string, ArticleData[]>, limit: number, pinned: string[] = []): GuideItem[] {
  const all: GuideItem[] = [];
  for (const [vertical, articles] of Object.entries(byVertical)) {
    for (const article of articles) {
      if (PARKED.has(article.slug)) continue;
      all.push({ vertical, article });
    }
  }
  const lead = pinned
    .map((slug) => all.find((g) => g.article.slug === slug))
    .filter((g): g is GuideItem => !!g);
  const rest = all
    .filter((g) => !pinned.includes(g.article.slug))
    .sort((a, b) => stamp(b.article) - stamp(a.article));
  return [...lead, ...rest].slice(0, limit);
}

function dateLabel(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function LatestGuides({
  items,
  title,
  subtitle,
  allHref,
  allLabel,
  showVertical = false,
}: {
  items: GuideItem[];
  title: string;
  subtitle?: string;
  allHref: string;
  allLabel: string;
  /** Label each card with its vertical (hub home, where verticals mix). */
  showVertical?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <>
      <h2 className="text-[26px] font-bold tracking-[-0.015em] text-[#191919] sm:text-[32px]">{title}</h2>
      {subtitle && <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-gray-500">{subtitle}</p>}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ vertical, article: a }) => {
          const updated = dateLabel(a.updatedAt);
          const chip = showVertical ? (NAME_BY_VERTICAL.get(vertical) ?? vertical) : a.category || "Guide";
          return (
            <Link
              key={`${vertical}/${a.slug}`}
              href={`/${vertical}/articles/${a.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className="relative flex h-[120px] items-end overflow-hidden p-4"
                style={{ background: `linear-gradient(135deg, ${a.heroColor || "#0C4B75"}, #191919)` }}
              >
                {a.image && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.image}
                      alt={a.imageAlt || a.title}
                      width={640}
                      height={360}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                  </>
                )}
                <span className="relative z-10 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#0C4B75]">
                  {chip}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[16px] font-bold leading-snug text-[#191919] transition-colors group-hover:text-[#0C4B75] line-clamp-3">
                  {a.title}
                </h3>
                <div className="mt-3 flex-1" />
                <p className="text-[12.5px] font-medium text-gray-400">
                  {/* Author records predate the hub brand ("TopWeightLoss Team");
                      the article page rebrands them the same way. */}
                  {(a.author || "Treatments Hub Research Team").replace(/TopWeightLoss/gi, "Treatments Hub")}
                  {a.readTime && <span> · {a.readTime}</span>}
                </p>
                {updated && (
                  <p className="mt-1 text-[12.5px] text-gray-400">
                    Updated <time dateTime={a.updatedAt}>{updated}</time>
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <Link href={allHref} className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0C4B75] hover:underline underline-offset-4">
        {allLabel}
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </Link>
    </>
  );
}
