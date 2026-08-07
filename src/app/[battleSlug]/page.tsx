import type { Metadata } from "next";
import Link from "next/link";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED } from "@/lib/config";
import { ComparisonLayout } from "@/components/comparison-layout";
import { EditorialContent } from "@/components/editorial-content";
import { LandingEditorial } from "@/components/landing-editorial";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Minus, Trophy } from "lucide-react";
import { ProviderCta } from "@/components/provider-cta";
import { TrustpilotCarousel } from "@/components/trustpilot-carousel";
import { WinnerTugMeter } from "@/components/winner-tug-meter";
import { ExpertByline } from "@/components/expert-byline";

export const revalidate = 60;

const RESERVED_SLUGS = [
  "about",
  "admin",
  "api",
  "articles",
  "disclaimer",
  "find-your-match",
  "reviews",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}): Promise<Metadata> {
  const { battleSlug } = await params;
  if (RESERVED_SLUGS.includes(battleSlug)) return {};

  const config = await getConfig();

  // Check landing pages first
  const landing = (config.landingPages ?? []).find((lp) => lp.slug === battleSlug);
  if (landing) {
    return {
      title: landing.seoTitle,
      description: landing.seoDescription,
      alternates: { canonical: `https://www.topweightloss.io/${landing.slug}` },
      openGraph: {
        title: landing.seoTitle,
        description: landing.seoDescription,
        url: `https://www.topweightloss.io/${landing.slug}`,
      },
    };
  }

  const battle = (config.battles ?? []).find((b) => b.slug === battleSlug);
  if (!battle) return { title: "Not Found" };

  return {
    title: battle.title,
    description: battle.description,
    alternates: { canonical: `https://www.topweightloss.io/${battle.slug}` },
    openGraph: {
      title: battle.title,
      description: battle.description,
      url: `https://www.topweightloss.io/${battle.slug}`,
      type: "article",
    },
  };
}

export default async function BattlePage({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}) {
  const { battleSlug } = await params;
  if (RESERVED_SLUGS.includes(battleSlug)) return notFound();

  const config = await getConfig();

  // ───── LANDING PAGE ─────
  const landing = (config.landingPages ?? []).find((lp) => lp.slug === battleSlug);
  if (landing) {
    // Build a config override with custom provider order + positions
    const customConfig = {
      ...config,
      ranking: {
        ...config.ranking,
        providerOrder: landing.providerOrder.length > 0 ? landing.providerOrder : config.ranking.providerOrder,
      },
    };

    const providerOrder = landing.providerOrder.length > 0 ? landing.providerOrder : config.ranking.providerOrder;

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: landing.seoTitle,
      description: landing.seoDescription,
      url: `https://www.topweightloss.io/${landing.slug}`,
      dateModified: landing.updatedAt || CONTENT_LAST_UPDATED,
      publisher: { "@type": "Organization", name: "topweightloss.io", url: "https://www.topweightloss.io" },
    };

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: landing.h1,
      numberOfItems: providerOrder.length,
      itemListElement: providerOrder.map((id, i) => {
        const p = config.providers.find((pr) => pr.id === id);
        return { "@type": "ListItem", position: i + 1, name: p?.name ?? id };
      }),
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.topweightloss.io" },
        { "@type": "ListItem", position: 2, name: landing.h1, item: `https://www.topweightloss.io/${landing.slug}` },
      ],
    };

    // FAQ schema from editorial sections
    const landingFaqSchema = landing.editorialSections && landing.editorialSections.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: landing.editorialSections.map((s) => ({
        "@type": "Question",
        name: s.heading,
        acceptedAnswer: { "@type": "Answer", text: s.body.replace(/<[^>]*>/g, "") },
      })),
    } : null;

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {landingFaqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(landingFaqSchema) }} />}
        <ComparisonLayout
          config={customConfig}
          heroOverrides={{
            h1: landing.h1,
            h2: landing.h2,
            description: landing.heroDescription,
          }}
        >
          {landing.editorialSections && landing.editorialSections.length > 0 ? (
            <LandingEditorial sections={landing.editorialSections} />
          ) : (
            <EditorialContent />
          )}
        </ComparisonLayout>
      </>
    );
  }

  // ───── BATTLE PAGE ─────
  const battle = (config.battles ?? []).find((b) => b.slug === battleSlug);
  if (!battle) return notFound();

  const p1 = config.providers.find((p) => p.id === battle.provider1Id);
  const p2 = config.providers.find((p) => p.id === battle.provider2Id);
  if (!p1 || !p2) return notFound();

  // Winner is set per-battle in the CMS (Admin → Battles → Winner)
  const winner = battle.winnerId === p2.id ? p2 : p1;
  const loser = winner.id === p1.id ? p2 : p1;
  const hasExplicitWinner = battle.winnerId === p1.id || battle.winnerId === p2.id;

  // Advantage % for the verdict meter, derived from category winners
  const winnerKey = winner.id === p1.id ? "provider1" : "provider2";
  const catWins = battle.categories.filter((c) => c.winner === winnerKey).length;
  const catTies = battle.categories.filter((c) => c.winner === "tie").length;
  const catTotal = battle.categories.length || 1;
  const rawAdvantage = Math.round(((catWins + catTies * 0.5) / catTotal) * 100);
  const advantage = Math.min(88, Math.max(68, rawAdvantage || 75));

  const getCategoryLabel = (cat: (typeof battle.categories)[0]) => {
    if (cat.winner === "tie") return "Close call";
    return cat.winner === "provider1" ? `Edge: ${p1.name}` : `Edge: ${p2.name}`;
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: battle.title,
    description: battle.description,
    datePublished: "2026-06-01",
    dateModified: battle.updatedAt || CONTENT_LAST_UPDATED,
    author: { "@type": "Organization", name: "TopWeightLoss Team", url: "https://www.topweightloss.io" },
    publisher: { "@type": "Organization", name: "topweightloss.io", url: "https://www.topweightloss.io" },
    mainEntityOfPage: `https://www.topweightloss.io/${battle.slug}`,
  };

  const battleBreadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.topweightloss.io" },
      { "@type": "ListItem", position: 2, name: `${p1.name} vs ${p2.name}`, item: `https://www.topweightloss.io/${battle.slug}` },
    ],
  };

  const battleFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: battle.categories.map((cat) => ({
      "@type": "Question",
      name: `${cat.name}: ${p1.name} or ${p2.name}?`,
      acceptedAnswer: { "@type": "Answer", text: cat.explanation },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(battleBreadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(battleFaqSchema) }} />

      <div className="min-h-screen bg-[#FAFAFA]">
        {/* ───── HERO ───── */}
        <section className="relative overflow-hidden border-b border-gray-200 bg-white">
          {/* Subtle gradient accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0C4B75] via-[#1a8cd8] to-[#0C4B75]" />
          <div className="mx-auto max-w-[1100px] px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-12">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: `${p1.name} vs ${p2.name}` },
              ]}
            />

            <h1 className="text-[26px] font-extrabold leading-[1.15] text-[#191919] sm:text-[38px]">
              {battle.title}
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-gray-500">
              {battle.subtitle || battle.description}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
          {/* ───── VERDICT METER (above the fold) ───── */}
          {hasExplicitWinner && (
            <WinnerTugMeter
              winnerName={winner.name}
              loserName={loser.name}
              advantage={advantage}
              winnerHref={winner.affiliateUrl}
              winnerSlug={winner.id}
            />
          )}

          {/* ───── EXPERT INTRO ───── */}
          <div className="mb-12 max-w-[760px]">
            <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">
              Editor&rsquo;s Analysis
            </p>
            <p className="text-[16px] leading-[1.85] text-gray-600">
              {battle.intro}
            </p>
            {config.experts && config.experts.length > 0 && (
              <div className="mt-5">
                <ExpertByline expert={config.experts[0]} label="Analysis by" />
              </div>
            )}
          </div>

          {/* ───── PROVIDER CARDS (enriched) ───── */}
          <div className="relative mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* VS badge */}
            <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0C4B75]/20 bg-white text-[13px] font-extrabold text-[#0C4B75] shadow-sm">
                VS
              </div>
            </div>
            {/* Mobile VS */}
            <div className="flex items-center justify-center sm:hidden -my-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0C4B75]/20 bg-white text-[12px] font-extrabold text-[#0C4B75]">
                VS
              </div>
            </div>

            {[p1, p2].map((provider, idx) => {
              const isWinner = hasExplicitWinner && provider.id === battle.winnerId;
              return (
              <div
                key={provider.id}
                className={`relative rounded-2xl border bg-white px-6 pb-6 pt-7 shadow-sm ${isWinner ? "border-emerald-300" : "border-gray-200"} ${idx === 0 ? "order-first" : "order-last sm:order-last"}`}
              >
                {isWinner && (
                  <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
                    <Trophy className="h-3 w-3" strokeWidth={2.5} />
                    Winner
                  </div>
                )}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-[40px] w-[110px] items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={provider.logo} alt={`${provider.name} logo`} className="max-h-full max-w-full object-contain" />
                  </div>
                </div>

                <p className="mb-4 text-[14px] leading-relaxed text-gray-500">
                  {provider.tagline}
                </p>

                <ul className="mb-5 space-y-2">
                  {provider.highlights.slice(0, 3).map((h, hi) => (
                    <li key={hi} className="flex items-start gap-2 text-[13px] text-gray-700">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2} />
                      {h}
                    </li>
                  ))}
                </ul>

                <ProviderCta
                  href={provider.affiliateUrl}
                  providerName={provider.name}
                  providerSlug={provider.id}
                  pageType="battle"
                  sourceFlow="battle_page"
                  className="flex h-[44px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#0C4B75] text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
                >
                  Visit {provider.name}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </ProviderCta>
              </div>
              );
            })}
          </div>

          {/* ───── ROUND-BY-ROUND COMPARISON ───── */}
          <div className="mb-14">
            <h2 className="mb-8 text-[24px] font-bold text-[#191919]">
              How They Compare
            </h2>

            <div className="space-y-6">
              {battle.categories.map((cat, i) => {
                const label = getCategoryLabel(cat);
                const isP1Edge = cat.winner === "provider1";
                const isP2Edge = cat.winner === "provider2";
                const isTie = cat.winner === "tie";

                return (
                  <div key={i} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    {/* Round header */}
                    <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0C4B75] text-[12px] font-bold text-white">
                          {i + 1}
                        </span>
                        <h3 className="text-[16px] font-bold text-[#191919]">
                          {cat.name}
                        </h3>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                        isTie
                          ? "bg-amber-50 text-amber-600"
                          : "bg-emerald-50 text-emerald-700"
                      }`}>
                        {label}
                      </span>
                    </div>

                    <div className="p-6">
                      <p className="mb-5 max-w-[700px] text-[14px] leading-[1.7] text-gray-500">
                        {cat.explanation}
                      </p>

                      {cat.supportingPoints && cat.supportingPoints.length > 0 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          {/* P1 strengths */}
                          <div className={`rounded-xl p-4 ${isP1Edge ? "bg-emerald-50/50 border border-emerald-100" : "bg-gray-50"}`}>
                            <p className={`mb-2.5 text-[12px] font-bold uppercase tracking-wider ${isP1Edge ? "text-emerald-700" : "text-gray-400"}`}>
                              {p1.name}
                            </p>
                            <ul className="space-y-1.5">
                              {cat.supportingPoints.slice(0, Math.ceil(cat.supportingPoints.length / 2)).map((point, pi) => (
                                <li key={pi} className="flex items-start gap-2 text-[13px] text-gray-600">
                                  <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${isP1Edge ? "text-emerald-500" : "text-gray-400"}`} strokeWidth={2} />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* P2 strengths */}
                          <div className={`rounded-xl p-4 ${isP2Edge ? "bg-emerald-50/50 border border-emerald-100" : "bg-gray-50"}`}>
                            <p className={`mb-2.5 text-[12px] font-bold uppercase tracking-wider ${isP2Edge ? "text-emerald-700" : "text-gray-400"}`}>
                              {p2.name}
                            </p>
                            <ul className="space-y-1.5">
                              {cat.supportingPoints.slice(Math.ceil(cat.supportingPoints.length / 2)).map((point, pi) => (
                                <li key={pi} className="flex items-start gap-2 text-[13px] text-gray-600">
                                  <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${isP2Edge ? "text-emerald-500" : "text-gray-400"}`} strokeWidth={2} />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ───── WINNER PROMO BANNER (mid-page, e-commerce style) ───── */}
          {hasExplicitWinner && (
            <div className="mb-14 overflow-hidden rounded-3xl bg-gradient-to-br from-[#E9F1E4] to-[#F7FAF4] shadow-sm">
              <div className={`grid ${config.battleWinnerBannerImageDesktop ? "sm:grid-cols-2" : ""}`}>
                {/* Mobile image */}
                {config.battleWinnerBannerImageMobile && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={config.battleWinnerBannerImageMobile}
                    alt={`${winner.name} customers`}
                    className="h-52 w-full object-cover sm:hidden"
                  />
                )}

                {/* Content */}
                <div className="flex flex-col items-start justify-center p-6 sm:p-10 lg:p-12">
                  <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
                    <Trophy className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Our Winner
                  </span>

                  <div className="mb-4 flex h-[38px] w-[150px] items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={winner.logo}
                      alt={`${winner.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <p className="mb-4 text-[24px] font-extrabold leading-tight text-[#191919] sm:text-[28px]">
                    {winner.tagline}
                  </p>

                  <ul className="mb-6 space-y-2">
                    {winner.highlights.slice(0, 3).map((h, hi) => (
                      <li key={hi} className="flex items-start gap-2 text-[14px] text-gray-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <ProviderCta
                    href={winner.affiliateUrl}
                    providerName={winner.name}
                    providerSlug={winner.id}
                    pageType="battle"
                    sourceFlow="battle_page"
                    className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#0C4B75] px-8 text-[15px] font-bold text-white transition-colors hover:bg-[#093d61] sm:w-auto"
                  >
                    Visit {winner.name}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </ProviderCta>
                </div>

                {/* Desktop image */}
                {config.battleWinnerBannerImageDesktop && (
                  <div className="relative hidden min-h-[340px] sm:block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={config.battleWinnerBannerImageDesktop}
                      alt={`${winner.name} customer`}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ───── FEATURE COMPARISON TABLE ───── */}
          {battle.features && battle.features.length > 0 && (() => {
            const getIcon = (row: typeof battle.features[0], which: "p1" | "p2") => {
              const h = row.highlight ?? "both";
              const isHighlighted = h === "both" || (which === "p1" && h === "provider1") || (which === "p2" && h === "provider2");
              const isDimmed = h !== "both" && h !== "none" && !isHighlighted;
              return { isHighlighted, isDimmed };
            };

            return (
            <div className="mb-14">
              <h2 className="mb-6 text-[22px] font-bold text-[#191919]">
                Side-by-Side Comparison
              </h2>

              {/* Desktop table */}
              <div className="hidden sm:block overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="bg-gray-50 px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-gray-400 w-[200px]">
                        Feature
                      </th>
                      <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-[#191919]">
                        {p1.name}
                      </th>
                      <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-[#191919]">
                        {p2.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {battle.features.map((row, i) => {
                      const p1s = getIcon(row, "p1");
                      const p2s = getIcon(row, "p2");
                      return (
                        <tr
                          key={i}
                          className={`${i < battle.features.length - 1 ? "border-b border-gray-100" : ""} ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                        >
                          <td className="px-6 py-4 font-semibold text-[#191919] bg-gray-50/70">
                            {row.feature}
                          </td>
                          <td className={`px-6 py-4 ${p1s.isDimmed ? "text-gray-400" : "text-gray-700"}`}>
                            <div className="flex items-start gap-2">
                              {p1s.isHighlighted ? (
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
                              ) : p1s.isDimmed ? (
                                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-gray-300" strokeWidth={2} />
                              ) : null}
                              {row.provider1Value}
                            </div>
                          </td>
                          <td className={`px-6 py-4 ${p2s.isDimmed ? "text-gray-400" : "text-gray-700"}`}>
                            <div className="flex items-start gap-2">
                              {p2s.isHighlighted ? (
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
                              ) : p2s.isDimmed ? (
                                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-gray-300" strokeWidth={2} />
                              ) : null}
                              {row.provider2Value}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile stacked */}
              <div className="space-y-3 sm:hidden">
                {battle.features.map((row, i) => {
                  const p1s = getIcon(row, "p1");
                  const p2s = getIcon(row, "p2");
                  return (
                    <div
                      key={i}
                      className="rounded-xl border border-gray-200 bg-white p-4"
                    >
                      <p className="mb-3 text-[13px] font-bold text-[#191919]">
                        {row.feature}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className={`rounded-lg p-2.5 ${p1s.isHighlighted ? "bg-emerald-50" : "bg-gray-50"}`}>
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                            {p1.name}
                          </p>
                          <div className={`flex items-start gap-1.5 text-[13px] ${p1s.isDimmed ? "text-gray-400" : "text-gray-700"}`}>
                            {p1s.isHighlighted && <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />}
                            {p1s.isDimmed && <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-300" strokeWidth={2} />}
                            {row.provider1Value}
                          </div>
                        </div>
                        <div className={`rounded-lg p-2.5 ${p2s.isHighlighted ? "bg-emerald-50" : "bg-gray-50"}`}>
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                            {p2.name}
                          </p>
                          <div className={`flex items-start gap-1.5 text-[13px] ${p2s.isDimmed ? "text-gray-400" : "text-gray-700"}`}>
                            {p2s.isHighlighted && <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />}
                            {p2s.isDimmed && <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-300" strokeWidth={2} />}
                            {row.provider2Value}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            );
          })()}

          {/* ───── TRUSTPILOT REVIEWS ───── */}
          {((p1.trustpilotReviews?.length ?? 0) > 0 || (p2.trustpilotReviews?.length ?? 0) > 0) && (
            <div className="mb-14">
              <h2 className="mb-6 text-[22px] font-bold text-[#191919]">
                What Real Customers Say
              </h2>
              <div className="space-y-6">
                {[p1, p2].map((provider) =>
                  (provider.trustpilotReviews?.length ?? 0) > 0 ? (
                    <TrustpilotCarousel
                      key={provider.id}
                      providerName={provider.name}
                      providerLogo={provider.logo}
                      reviews={provider.trustpilotReviews!}
                      rating={provider.trustpilotRating}
                      reviewCount={provider.trustpilotReviewCount}
                    />
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* ───── VERDICT ───── */}
          <div className="mb-14 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="p-6 sm:p-8">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <h2 className="text-[22px] font-bold text-[#191919]">The Bottom Line</h2>
                {hasExplicitWinner && (
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-bold text-emerald-700">
                    <Trophy className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Winner: {winner.name}
                  </span>
                )}
              </div>

              <p className="mb-6 text-[15px] leading-[1.75] text-gray-600">
                {battle.verdict}
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className={`rounded-xl p-5 ${hasExplicitWinner ? "border border-emerald-100 bg-emerald-50/50" : "bg-gray-50"}`}>
                  <p className="mb-3 text-[13px] font-bold uppercase tracking-wider text-[#191919]">
                    Choose {winner.name} if you want
                  </p>
                  <ul className="space-y-2">
                    {(battle.verdictWinnerPoints ?? []).map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[14px] text-gray-600"
                      >
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${hasExplicitWinner ? "text-emerald-500" : "text-gray-400"}`} strokeWidth={2} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-gray-50 p-5">
                  <p className="mb-3 text-[13px] font-bold uppercase tracking-wider text-[#191919]">
                    Choose {loser.name} if you prefer
                  </p>
                  <ul className="space-y-2">
                    {(battle.verdictLoserPoints ?? []).map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[14px] text-gray-600"
                      >
                        <Minus className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" strokeWidth={2} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <ProviderCta
                href={winner.affiliateUrl}
                providerName={winner.name}
                providerSlug={winner.id}
                pageType="battle"
                sourceFlow="battle_page"
                className="mt-7 flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0C4B75] text-[15px] font-bold text-white transition-colors hover:bg-[#093d61] sm:w-auto sm:px-8"
              >
                Visit {winner.name}
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </ProviderCta>
            </div>
          </div>

          {/* ───── BOTTOM CTAs ───── */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            {[
              { provider: p1, color: "from-gray-50 to-gray-50/50", hoverColor: "hover:border-[#0C4B75]/30", textColor: "text-[#191919]" },
              { provider: p2, color: "from-gray-50 to-gray-50/50", hoverColor: "hover:border-[#0C4B75]/30", textColor: "text-[#191919]" },
            ].map(({ provider, color, hoverColor, textColor }) => (
              <ProviderCta
                key={provider.id}
                href={provider.affiliateUrl}
                providerName={provider.name}
                providerSlug={provider.id}
                pageType="battle"
                sourceFlow="battle_page"
                className={`group flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-gradient-to-b ${color} px-4 py-6 transition-all ${hoverColor} hover:shadow-md`}
              >
                <div className="flex h-[36px] w-[100px] items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={provider.logo}
                    alt={`${provider.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className={`flex items-center gap-1 text-[13px] font-bold ${textColor} group-hover:underline`}>
                  Visit Site
                  <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                </span>
              </ProviderCta>
            ))}
          </div>

          {/* Related links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-4 text-[13px]">
            <Link href={`/reviews/${p1.id}`} className="font-semibold text-[#0C4B75] hover:underline">
              {p1.name} Review
            </Link>
            <span className="text-gray-300">|</span>
            <Link href={`/reviews/${p2.id}`} className="font-semibold text-[#0C4B75] hover:underline">
              {p2.name} Review
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/" className="font-semibold text-[#0C4B75] hover:underline">
              Compare All Providers
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
