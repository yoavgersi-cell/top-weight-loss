// Which URL a stored battle is served at, and which battle a URL serves.
//
// The CMS can hold a battle under a slug the proxy 301s away from (an alias in
// SLUG_ALIASES, e.g. the blob stores "ro-vs-trimrx" while the proxy redirects
// it to "trimrx-vs-ro"). Nov 15, 2026 audit (F1): the battle page chose the
// alphabetically-first STORED slug of a provider pair as canonical and 308'd to
// it, the proxy 301'd it back, and both URLs looped forever. Every decision
// about battle slugs now goes through these helpers, which only ever name a
// slug the proxy will serve. The sitemap and llms.txt use the same rule, so a
// URL is listed only when it answers 200.
import { SLUG_ALIASES } from "@/lib/slug-aliases";
import type { BattleData, SiteConfig } from "@/lib/config";

/** The slug a stored battle is reachable at: its own, unless the proxy aliases it away. */
export const servedBattleSlug = (b: { slug: string }): string => SLUG_ALIASES[b.slug] ?? b.slug;

const samePair = (a: BattleData, b: BattleData) =>
  (a.provider1Id === b.provider1Id && a.provider2Id === b.provider2Id) ||
  (a.provider1Id === b.provider2Id && a.provider2Id === b.provider1Id);

/**
 * The stored battle that serves `slug`: a direct match first, otherwise a
 * battle whose stored slug is an alias of `slug` (so the aliased data still
 * renders at the canonical URL).
 */
export function findBattleForSlug(config: SiteConfig, slug: string): BattleData | undefined {
  const battles = config.battles ?? [];
  return battles.find((b) => b.slug === slug) ?? battles.find((b) => SLUG_ALIASES[b.slug] === slug);
}

/**
 * The one URL slug for a provider pair: the alphabetically-first SERVED slug
 * among every stored battle of that pair. Never an alias key, so a redirect to
 * it cannot be bounced back by the proxy.
 */
export function canonicalPairSlug(config: SiteConfig, battle: BattleData): string {
  const served = new Set((config.battles ?? []).filter((b) => samePair(battle, b)).map(servedBattleSlug));
  return [...served].sort()[0] ?? servedBattleSlug(battle);
}

/** True when a stored battle's own slug is the URL that answers 200 for its pair. */
export const isCanonicalBattleSlug = (config: SiteConfig, battle: BattleData): boolean =>
  !(battle.slug in SLUG_ALIASES) && canonicalPairSlug(config, battle) === battle.slug;
