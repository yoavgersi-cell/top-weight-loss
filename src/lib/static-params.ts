import { PUBLISHED_VERTICALS } from "@/lib/config";
import { getConfig } from "@/lib/config-store";

// Static-param lists for the dynamic hub routes. In this Next version a
// dynamic route is only cached (ISR) when it exports generateStaticParams;
// without it every visit is a full server render with no CDN cache, which on
// Vercel meant ~1-1.5 s TTFB on every page (measured Nov 17, 2026). The lists
// below prerender the known pages at build; anything not listed still renders
// on demand and is then cached (dynamicParams stays true).

export function verticalParams(): { battleSlug: string }[] {
  return PUBLISHED_VERTICALS.map((battleSlug) => ({ battleSlug }));
}

async function perVertical<T>(pick: (config: Awaited<ReturnType<typeof getConfig>>) => string[], key: "slug" | "comparison"): Promise<(T & { battleSlug: string })[]> {
  const out: (T & { battleSlug: string })[] = [];
  for (const battleSlug of PUBLISHED_VERTICALS) {
    try {
      const config = await getConfig(battleSlug);
      for (const value of new Set(pick(config))) out.push({ battleSlug, [key]: value } as T & { battleSlug: string });
    } catch {
      // A config read failure must not fail the build: the pages render on demand.
    }
  }
  return out;
}

export const reviewParams = () => perVertical<{ slug: string }>((c) => (c.reviews ?? []).map((r) => r.slug), "slug");
export const articleParams = () => perVertical<{ slug: string }>((c) => (c.articles ?? []).map((a) => a.slug), "slug");
export const comparisonParams = () =>
  perVertical<{ comparison: string }>(
    (c) => [...(c.battles ?? []).map((b) => b.slug), ...(c.landingPages ?? []).map((l) => l.slug)],
    "comparison",
  );
