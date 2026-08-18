import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Star, Syringe, Sparkles, Dumbbell, HeartPulse, ShieldCheck } from "lucide-react";
import { VERTICALS, DEFAULT_VERTICAL, isPublishedVertical, type Provider, type RankingPosition, type ReviewData } from "@/lib/config";
import { getConfig } from "@/lib/config-store";
import { ProviderCta } from "@/components/provider-cta";

// Decorative category icons (visual only — no data implied).
const VERTICAL_ICON: Record<string, typeof Syringe> = {
  "weight-loss": Syringe,
  "hair-loss": Sparkles,
  trt: Dumbbell,
  hrt: HeartPulse,
};

// Short, umbrella-brand blurbs per category.
const CATEGORY_COPY: Record<string, string> = {
  "weight-loss": "GLP-1 injections, pills and telehealth programs compared on price, support and results.",
  "hair-loss": "Finasteride, minoxidil and doctor-led regrowth plans, side by side.",
  trt: "Testosterone replacement therapy, prescribed and managed online.",
  hrt: "Menopause and hormone therapy providers, treatments and support.",
};

// Real, keyword-rich internal links surfaced on a live category card. Only
// routes that actually exist are listed here.
const CATEGORY_LINKS: Record<string, { label: string; href: string }[]> = {
  "weight-loss": [
    { label: "GLP-1 injections", href: "/weight-loss" },
    { label: "Weight-loss pills", href: "/weight-loss-pills" },
    { label: "Ozempic alternatives", href: "/ozempic-alternatives" },
  ],
};

function updatedLabel(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Compact provider card for the homepage shelf — mirrors the ranking card's
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
          <span className="font-bold text-gray-700">{provider.trustpilotRating}</span>
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
          <li key={h} className="flex items-start gap-2 text-[13px] leading-snug text-gray-700">
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
// provider, score, review count and article is pulled from config — nothing is
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
    .slice(0, 8) as Provider[];

  const articles = (wl.articles ?? []).slice(0, 6);

  return (
    <div className="bg-white">
      {/* ───── HERO ───── */}
      <section className="bg-gradient-to-b from-[#EAF2F8] to-white">
        <div className="mx-auto max-w-[1100px] px-5 py-16 text-center sm:px-8 sm:py-24">
          <h1 className="mx-auto max-w-[900px] text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#191919] sm:text-[54px]">
            Compare the Best Online Treatment Providers for Your Needs
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-relaxed text-gray-600 sm:text-[19px]">
            Independent rankings across weight loss, hair loss, TRT and HRT — based on pricing, medical
            support and real customer reviews.
          </p>

          {/* Category cards */}
          <div className="mx-auto mt-12 grid max-w-[820px] gap-4 text-left sm:grid-cols-2">
            {VERTICALS.map((v) => {
              const live = isPublishedVertical(v.id);
              const Icon = VERTICAL_ICON[v.id] ?? Syringe;
              const links = live ? CATEGORY_LINKS[v.id] ?? [] : [];

              return (
                <div
                  key={v.id}
                  className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2F8] text-[#0C4B75]">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div>
                      {live ? (
                        <Link href={`/${v.id}`} className="text-[17px] font-bold text-[#191919] hover:text-[#0C4B75]">
                          {v.name}
                        </Link>
                      ) : (
                        <span className="text-[17px] font-bold text-[#191919]">{v.name}</span>
                      )}
                      {!live && (
                        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-400">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-gray-500">{CATEGORY_COPY[v.id] ?? v.tagline}</p>
                  {links.length > 0 && (
                    <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                      {links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          className="group flex items-center justify-between text-[14px] font-semibold text-gray-700 hover:text-[#0C4B75]"
                        >
                          {l.label}
                          <ArrowRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#0C4B75]" strokeWidth={2.5} />
                        </Link>
                      ))}
                    </div>
                  )}
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
            <h2 className="text-center text-[22px] font-bold tracking-[-0.01em] text-[#191919]">
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
                <h2 className="mt-1.5 text-[26px] font-bold leading-tight tracking-[-0.01em] text-[#191919] sm:text-[30px]">
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
            <h2 className="text-[26px] font-bold tracking-[-0.01em] text-[#191919] sm:text-[30px]">
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
                      {a.author || "TreatmentsHub Staff"}
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
            <h2 className="text-[24px] font-bold tracking-[-0.01em] text-[#191919] sm:text-[28px]">
              How TreatmentsHub compares providers
            </h2>
            <p className="mt-4 text-[16.5px] leading-[1.7] text-gray-600">
              We look at what actually matters when choosing treatment online — price, what&rsquo;s
              included, access to medical support, treatment options, cancellation terms, and
              customer experience. Rankings are editorial and independent; partnerships never buy a
              higher placement.
            </p>
            <Link
              href="/how-we-rank"
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
