import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Star, ShieldCheck } from "lucide-react";
import { VERTICALS, DEFAULT_VERTICAL, isPublishedVertical, type Provider, type RankingPosition, type ReviewData } from "@/lib/config";
import { getConfig } from "@/lib/config-store";
import { ProviderCta } from "@/components/provider-cta";

// ───── Category icons ─────
// Hand-drawn two-tone line icons (outline + light fill), matching the
// comparison-publisher look: detailed enough to feel bespoke, drawn inline so
// there are no external assets. Purely decorative - no data implied.
const ICON_STROKE = "#1673B9";
const ICON_FILL = "#DCEDF9";

function WeightLossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* apple body */}
      <path
        d="M32 19c-3.5-4.5-10-5.5-14.5-2C11 21.5 9 31.5 13.5 41c3.5 7.5 9.5 12 13.5 12 2 0 3.5-1 5-1s3 1 5 1c4 0 10-4.5 13.5-12C55 31.5 53 21.5 46.5 17 42 13.5 35.5 14.5 32 19z"
        fill={ICON_FILL}
        stroke={ICON_STROKE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* stem + leaf */}
      <path d="M32 18v-7" stroke={ICON_STROKE} strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M33.5 12.5c1.5-4.5 5.5-7 10.5-6.5-.5 5-3.5 8.5-8.5 9.5"
        fill="#fff"
        stroke={ICON_STROKE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* measuring tape wrapped across the apple */}
      <path
        d="M8 31.5c9 3.8 39 3.8 48 0v9c-9 3.8-39 3.8-48 0z"
        fill="#fff"
        stroke={ICON_STROKE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M15 34.5v4M22 35.5v4M29 36v4M36 36v4M43 35.5v4M50 34.5v4" stroke={ICON_STROKE} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function HairGrowthIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* skin cross-section */}
      <rect x="13" y="37" width="38" height="15" rx="4" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="2.2" />
      {/* follicle root + bulb under the surface */}
      <path d="M32 37v7" stroke={ICON_STROKE} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="32" cy="46.5" r="2.4" fill="#fff" stroke={ICON_STROKE} strokeWidth="2" />
      {/* two hairs - different heights, flowing the same way */}
      <path d="M32 37c-2-5.5-.2-9.5-2.8-15.5" stroke={ICON_STROKE} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M32 37c2.6-3.5 3.2-7.5 2.4-11.5" stroke={ICON_STROKE} strokeWidth="2.2" strokeLinecap="round" />
      {/* sparkles */}
      <path d="M44 13v8M40 17h8" stroke={ICON_STROKE} strokeWidth="2" strokeLinecap="round" />
      <path d="M20 11v5.5M17.25 13.75h5.5" stroke={ICON_STROKE} strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="49" cy="28" r="1.4" fill={ICON_STROKE} />
    </svg>
  );
}

function TrtIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* dumbbell - unmistakable at small sizes */}
      {/* outer plates */}
      <rect x="6" y="22" width="7" height="20" rx="3" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="2.2" />
      <rect x="51" y="22" width="7" height="20" rx="3" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="2.2" />
      {/* inner plates */}
      <rect x="15" y="17" width="9" height="30" rx="3.5" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="2.2" />
      <rect x="40" y="17" width="9" height="30" rx="3.5" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="2.2" />
      {/* bar */}
      <path d="M24 32h16" stroke={ICON_STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* effort sparkle */}
      <path d="M50 8v7M46.5 11.5h7" stroke={ICON_STROKE} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HrtIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* droplet */}
      <path
        d="M32 8C24 19 15 28 15 38.5 15 48 22.5 55 32 55s17-7 17-16.5C49 28 40 19 32 8z"
        fill={ICON_FILL}
        stroke={ICON_STROKE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* inner highlight crescent */}
      <path d="M23 39c0 5 3.5 9 8 10" stroke={ICON_STROKE} strokeWidth="2" strokeLinecap="round" />
      {/* balance sparkles - hormone equilibrium */}
      <path d="M52 14v7M48.5 17.5h7" stroke={ICON_STROKE} strokeWidth="2" strokeLinecap="round" />
      <path d="M11 10v5M8.5 12.5h5" stroke={ICON_STROKE} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function HearingAidsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* ear outline - helix curving into the canal */}
      <path
        d="M22 26c0-9 6.5-15 14-15s13.5 6 13.5 14c0 6.5-3.5 9.5-6.5 13-2.6 3-4 5.5-4.5 9-.6 4.5-3.5 7-7.5 7-4.5 0-7.5-3-7.5-7"
        fill={ICON_FILL}
        stroke={ICON_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* inner helix fold */}
      <path d="M28.5 26.5c0-5 3.2-8.5 7.5-8.5 4.5 0 7.5 3.5 7.5 8" stroke={ICON_STROKE} strokeWidth="2" strokeLinecap="round" />
      {/* hearing-aid: behind-the-ear body hooking over the helix */}
      <path d="M22 26c-4.5.5-8 4-8 8.5 0 3.5 2 6.5 5 7.9" stroke={ICON_STROKE} strokeWidth="2.2" strokeLinecap="round" />
      {/* in-ear receiver */}
      <circle cx="33" cy="30.5" r="4.2" fill="#fff" stroke={ICON_STROKE} strokeWidth="2.2" />
      {/* tube connecting device to receiver */}
      <path d="M19 42.4c3.5 1.6 7.5-.5 10.5-8" stroke={ICON_STROKE} strokeWidth="2" strokeLinecap="round" />
      {/* sound sparkle */}
      <path d="M53 36c1.5-2.5 1.5-5.5 0-8M57 39c2.5-4.5 2.5-9.5 0-14" stroke={ICON_STROKE} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function OnlineTherapyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* speech bubble - the conversation itself */}
      <path
        d="M10 14h44a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H30l-11 10 2.5-10H10a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z"
        fill={ICON_FILL}
        stroke={ICON_STROKE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* heart inside the conversation */}
      <path
        d="M32 39c-5.5-3.6-9-6.8-9-10.6 0-2.7 2-4.7 4.6-4.7 1.8 0 3.4 1 4.4 2.6 1-1.6 2.6-2.6 4.4-2.6 2.6 0 4.6 2 4.6 4.7 0 3.8-3.5 7-9 10.6z"
        fill="#fff"
        stroke={ICON_STROKE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* calm sparkle */}
      <path d="M54 5v6M51 8h6" stroke={ICON_STROKE} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const VERTICAL_ICON: Record<string, (p: { className?: string }) => React.JSX.Element> = {
  "weight-loss": WeightLossIcon,
  "hair-loss": HairGrowthIcon,
  trt: TrtIcon,
  hrt: HrtIcon,
  "hearing-aids": HearingAidsIcon,
  "online-therapy": OnlineTherapyIcon,
};

// Display names tuned for the category grid (treatment-led, like a
// comparison publisher, rather than condition-led).
const CATEGORY_NAME: Record<string, string> = {
  "weight-loss": "Weight Loss",
  "hair-loss": "Hair Growth Treatments",
  trt: "TRT",
  hrt: "HRT",
  "hearing-aids": "Hearing Aids",
  "online-therapy": "Online Therapy",
};

// Real, keyword-rich internal links surfaced on a live category card. Only
// routes that actually exist are listed here - all hub-prefixed so they
// resolve without a redirect hop.
const CATEGORY_LINKS: Record<string, { label: string; href: string }[]> = {
  "weight-loss": [
    { label: "Injections", href: "/weight-loss" },
    { label: "Pills & tablets", href: "/weight-loss/weight-loss-pills" },
    { label: "Cheapest GLP-1", href: "/weight-loss/cheapest-glp1" },
    { label: "Switch from Ozempic", href: "/weight-loss/switch-from-ozempic" },
  ],
  "hair-loss": [
    { label: "All treatments", href: "/hair-loss" },
    { label: "Reviews", href: "/hair-loss/reviews" },
    { label: "Guides", href: "/hair-loss/articles" },
  ],
  trt: [
    { label: "Compare providers", href: "/trt" },
    { label: "Reviews", href: "/trt/reviews" },
    { label: "Guides", href: "/trt/articles" },
  ],
  hrt: [
    { label: "Compare providers", href: "/hrt" },
    { label: "Reviews", href: "/hrt/reviews" },
  ],
  "hearing-aids": [
    { label: "Compare brands", href: "/hearing-aids" },
    { label: "Reviews", href: "/hearing-aids/reviews" },
  ],
  "online-therapy": [
    { label: "Compare platforms", href: "/online-therapy" },
    { label: "Reviews", href: "/online-therapy/reviews" },
    { label: "Guides", href: "/online-therapy/articles" },
  ],
};

function updatedLabel(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Compact provider card for the homepage shelf - mirrors the ranking card's
// data but in a lighter, three-up form. Every value (logo, score, Trustpilot
// count, highlights, price) comes from config; nothing is invented, and the
// Trustpilot line only appears when a real aggregate rating exists.
function ProviderMiniCard({
  provider,
  position,
  review,
  rank,
}: {
  provider: Provider;
  position: RankingPosition;
  review?: ReviewData;
  rank: number;
}) {
  const highlights = (review?.keyFeatures ?? provider.highlights).slice(0, 3);
  const startingPlan = review?.pricingPlans?.[0];
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-[40px] w-[130px] items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={provider.logo} alt={`${provider.name} logo`} className="max-h-full max-w-full object-contain object-left" />
        </div>
        <div className="flex flex-col items-center rounded-lg bg-[#0C4B75] px-2.5 py-1 text-white">
          <span className="text-[17px] font-extrabold leading-none">{position.score.toFixed(1)}</span>
          <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wide text-white/70">/ 10</span>
        </div>
      </div>

      {provider.trustpilotRating ? (
        <div className="mt-3 flex items-center gap-1.5 text-[12.5px] text-gray-500">
          <Star className="h-3.5 w-3.5 fill-[#00B67A] text-[#00B67A]" strokeWidth={0} />
          <span className="font-bold text-gray-800">{provider.trustpilotRating}</span>
          <span>on Trustpilot</span>
          {provider.trustpilotReviewCount && <span className="text-gray-400">({provider.trustpilotReviewCount})</span>}
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-wide text-[#0C4B75]">
          <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
          {position.label}
        </div>
      )}

      <ul className="mt-3 space-y-1.5">
        {highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-[13px] leading-snug text-gray-800">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
            <span className="line-clamp-2">{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex-1" />

      {startingPlan?.price && (
        <p className="mb-2.5 text-[12.5px] text-gray-500">
          From <span className="text-[15px] font-extrabold text-[#191919]">{startingPlan.price}</span>
          {startingPlan.unit && <span className="font-semibold text-gray-500">{startingPlan.unit}</span>}
        </p>
      )}
      <ProviderCta
        href={provider.affiliateUrl}
        providerName={provider.name}
        providerSlug={provider.id}
        position={rank}
        pageType="listing"
        sourceFlow="main_comparison"
        className="flex h-[44px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#0C4B75] text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
      >
        Visit Site
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
      </ProviderCta>
      <Link
        href={`/${DEFAULT_VERTICAL}/reviews/${review?.slug ?? provider.id}`}
        className="mt-2 text-center text-[12.5px] font-semibold text-[#0C4B75] hover:underline"
      >
        Read review
      </Link>
    </div>
  );
}

// Hub landing (treatmentshub.com). An editorial front door for the umbrella
// brand, styled as a real comparison publisher: a clear hero, a category grid,
// a shelf of trusted providers, top-rated picks and editorial guides. Every
// provider, score, review count and article is pulled from config - nothing is
// fabricated, and unpublished categories are shown as "coming soon".
export async function HubHome() {
  const wl = await getConfig(DEFAULT_VERTICAL);
  const providerCount = (wl.providers ?? []).length;
  const order = wl.ranking?.providerOrder ?? [];
  const positions = wl.ranking?.positions ?? [];
  const reviews = wl.reviews ?? [];

  const topProviders = order
    .map((id, i) => {
      const provider = wl.providers.find((p) => p.id === id);
      if (!provider) return null;
      const position = positions[i] ?? positions[positions.length - 1];
      return { provider, position, review: reviews.find((r) => r.providerId === id), rank: i + 1 };
    })
    .filter(Boolean)
    .slice(0, 3) as { provider: Provider; position: RankingPosition; review?: ReviewData; rank: number }[];

  const shelfProviders = order
    .map((id) => wl.providers.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 6) as Provider[];

  const articles = (wl.articles ?? []).slice(0, 6);

  return (
    <div className="bg-white">
      {/* ───── HERO ───── */}
      <section className="bg-gradient-to-b from-[#E8F3FB] via-[#F3F9FD] to-white">
        <div className="mx-auto max-w-[1100px] px-5 pb-14 pt-14 text-center sm:px-8 sm:pb-20 sm:pt-20">
          <h1 className="mx-auto max-w-[950px] text-[36px] font-extrabold leading-[1.06] tracking-[-0.025em] text-[#111] sm:text-[62px]">
            Compare the Best Health &amp; Wellness Services for Your Needs
          </h1>
          <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-relaxed text-gray-700 sm:mt-6 sm:text-[19px]">
            Independent rankings across weight loss, hair growth, TRT, HRT, hearing aids and online
            therapy - real published prices and verified customer reviews.
          </p>

          {/* Category cards - icon-led, links behind a divider. Dense 3-up
              grid (2-up on tablet) so all six verticals sit above the fold. */}
          <div className="mx-auto mt-10 grid max-w-[1080px] gap-3.5 text-left sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {VERTICALS.map((v) => {
              const live = isPublishedVertical(v.id);
              const Icon = VERTICAL_ICON[v.id] ?? WeightLossIcon;
              const name = CATEGORY_NAME[v.id] ?? v.name;
              const links = live ? CATEGORY_LINKS[v.id] ?? [] : [];

              if (links.length === 0) {
                // Icon + name only (unpublished categories) - centered, calm.
                return (
                  <div
                    key={v.id}
                    className="flex items-center justify-center gap-3 rounded-xl border border-gray-200/80 bg-white px-5 py-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)]"
                  >
                    <Icon className="h-[40px] w-[40px] shrink-0" />
                    <div className="text-left">
                      <span className="block text-[17px] font-bold leading-snug text-[#191919]">{name}</span>
                      {!live && (
                        <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-400">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={v.id}
                  className="flex items-stretch gap-4 rounded-xl border border-gray-200/80 bg-white px-4 py-4 shadow-[0_1px_3px_rgba(16,42,67,0.06)] transition-shadow hover:shadow-[0_4px_14px_rgba(16,42,67,0.10)] sm:px-5"
                >
                  {/* Icon + category name */}
                  <div className="flex w-[92px] shrink-0 flex-col items-center justify-center gap-2 text-center">
                    <Icon className="h-[40px] w-[40px]" />
                    <Link
                      href={`/${v.id}`}
                      className="text-[15px] font-bold leading-[1.2] text-[#191919] hover:text-[#0C4B75]"
                    >
                      {name}
                    </Link>
                  </div>

                  <div className="w-px self-stretch bg-gray-200" />

                  {/* Arrow links */}
                  <div className="flex flex-1 flex-col justify-center gap-[7px] py-0.5">
                    {links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium leading-snug text-gray-800 hover:text-[#0C4B75]"
                      >
                        {l.label}
                        <ArrowRight
                          className="h-3.5 w-3.5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#0C4B75]"
                          strokeWidth={2.2}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── PROVIDER SHELF ───── */}
      {shelfProviders.length > 0 && (
        <section className="border-y border-gray-200 bg-white">
          <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8">
            <h2 className="text-center text-[22px] font-bold tracking-[-0.015em] text-[#191919] sm:text-[26px]">
              Compare trusted online providers
            </h2>
            <p className="mx-auto mt-2 max-w-[560px] text-center text-[15px] leading-relaxed text-gray-500">
              Independent reviews of licensed telehealth brands across our categories.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
              {shelfProviders.map((p) => (
                <div key={p.id} className="flex h-[34px] w-[120px] items-center opacity-60 grayscale">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo} alt={`${p.name} logo`} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── TOP-RATED PROVIDERS ───── */}
      {topProviders.length > 0 && (
        <section className="bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-16">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#0C4B75]">Weight loss</p>
                <h2 className="mt-1.5 text-[26px] font-bold leading-tight tracking-[-0.015em] text-[#191919] sm:text-[32px]">
                  Top-rated providers this month
                </h2>
              </div>
              <Link
                href={`/${DEFAULT_VERTICAL}`}
                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0C4B75] hover:underline underline-offset-4"
              >
                See all {providerCount} providers
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {topProviders.map((t) => (
                <ProviderMiniCard key={t.provider.id} provider={t.provider} position={t.position} review={t.review} rank={t.rank} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── EDITOR'S PICKS ───── */}
      {articles.length > 0 && (
        <section className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-16">
            <h2 className="text-[26px] font-bold tracking-[-0.015em] text-[#191919] sm:text-[32px]">
              TreatmentsHub Editor&rsquo;s Picks
            </h2>
            <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-gray-500">
              Independent guides and research from our editorial team.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/${DEFAULT_VERTICAL}/articles/${a.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div
                    className="relative flex h-[120px] items-end p-4"
                    style={{ background: `linear-gradient(135deg, ${a.heroColor || "#0C4B75"}, #191919)` }}
                  >
                    <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#0C4B75]">
                      {a.category || "Guide"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[16px] font-bold leading-snug text-[#191919] transition-colors group-hover:text-[#0C4B75] line-clamp-3">
                      {a.title}
                    </h3>
                    <div className="mt-3 flex-1" />
                    <p className="text-[12.5px] font-medium text-gray-400">
                      TreatmentsHub Staff
                      {a.readTime && <span className="text-gray-300"> · {a.readTime}</span>}
                      {updatedLabel(a.updatedAt) && <span className="text-gray-300"> · {updatedLabel(a.updatedAt)}</span>}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href={`/${DEFAULT_VERTICAL}/articles`}
              className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0C4B75] hover:underline underline-offset-4"
            >
              All guides
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </section>
      )}

      {/* ───── METHODOLOGY ───── */}
      <section className="border-t border-gray-200 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-[720px]">
            <h2 className="text-[26px] font-bold tracking-[-0.015em] text-[#191919] sm:text-[32px]">
              How TreatmentsHub compares providers
            </h2>
            <p className="mt-4 text-[16.5px] leading-[1.7] text-gray-600">
              We look at what actually matters when choosing treatment online - price, what&rsquo;s
              included, access to medical support, treatment options, cancellation terms, and
              customer experience. Rankings are editorial and independent; partnerships never buy a
              higher placement.
            </p>
            <Link
              href="/weight-loss/how-we-rank"
              className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-bold text-[#0C4B75] hover:underline underline-offset-4"
            >
              See how we rank providers
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
