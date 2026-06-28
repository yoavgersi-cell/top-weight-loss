import type { Metadata } from "next";
import Link from "next/link";
import { getConfig } from "@/lib/config-store";
import { ComparisonLayout } from "@/components/comparison-layout";
import { EditorialContent } from "@/components/editorial-content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { notFound } from "next/navigation";
import { Trophy, ArrowRight, Check, Minus } from "lucide-react";

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

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: landing.seoTitle,
      description: landing.seoDescription,
      url: `https://www.topweightloss.io/${landing.slug}`,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <ComparisonLayout
          config={customConfig}
          heroOverrides={{
            h1: landing.h1,
            h2: landing.h2,
            description: landing.heroDescription,
          }}
        >
          <EditorialContent />
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

  const { providerOrder, positions } = config.ranking;
  const p1Rank = providerOrder.indexOf(p1.id);
  const p2Rank = providerOrder.indexOf(p2.id);
  const p1Score = p1Rank >= 0 && positions[p1Rank] ? positions[p1Rank] : null;
  const p2Score = p2Rank >= 0 && positions[p2Rank] ? positions[p2Rank] : null;

  const winner = battle.winnerId === p1.id ? p1 : p2;
  const loser = battle.winnerId === p1.id ? p2 : p1;

  const getCategoryWinnerName = (cat: (typeof battle.categories)[0]) => {
    if (cat.winner === "tie") return "Tie";
    return cat.winner === "provider1" ? p1.name : p2.name;
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: battle.title,
    description: battle.description,
    author: { "@type": "Organization", name: "topweightloss.io" },
    publisher: { "@type": "Organization", name: "topweightloss.io" },
    mainEntityOfPage: `https://www.topweightloss.io/${battle.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-[#FAFAFA]">
        {/* ───── HERO ───── */}
        <section className="relative overflow-hidden border-b border-gray-200 bg-white">
          {/* Subtle gradient accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0C4B75] via-[#1a8cd8] to-[#0C4B75]" />
          <div className="mx-auto max-w-[860px] px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-12">
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

        <div className="mx-auto max-w-[860px] px-4 py-10 sm:px-6">
          {/* ───── PROVIDER CARDS ───── */}
          <div className="relative mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* VS badge between cards */}
            <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-[13px] font-extrabold text-gray-400 shadow-sm">
                VS
              </div>
            </div>

            {[
              { provider: p1, score: p1Score, isWinner: battle.winnerId === p1.id },
              { provider: p2, score: p2Score, isWinner: battle.winnerId === p2.id },
            ].map(({ provider, score, isWinner }) => (
              <div
                key={provider.id}
                className={`relative rounded-2xl border bg-white px-6 pb-6 pt-8 ${
                  isWinner
                    ? "border-[#0C4B75]/25 shadow-[0_4px_20px_rgba(12,75,117,0.1)]"
                    : "border-gray-200 shadow-sm"
                }`}
              >
                {isWinner && (
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0C4B75] to-[#1a7ab5] px-3.5 py-1 text-[11px] font-bold text-white uppercase tracking-wide shadow-sm">
                      <Trophy className="h-3 w-3" strokeWidth={2} />
                      Winner
                    </span>
                  </div>
                )}

                <div className="mb-5 flex h-[44px] w-[120px] items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={provider.logo}
                    alt={`${provider.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {score && (
                  <div className="mb-1 flex items-baseline gap-1.5">
                    <span className={`text-[32px] font-extrabold ${isWinner ? "text-[#0C4B75]" : "text-[#191919]"}`}>
                      {score.score}
                    </span>
                    <span className="text-[14px] font-semibold text-gray-300">/10</span>
                  </div>
                )}
                {score && (
                  <p className={`mb-5 text-[13px] font-semibold ${isWinner ? "text-[#0C4B75]/60" : "text-gray-400"}`}>
                    {score.label}
                  </p>
                )}

                <a
                  href={provider.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={`flex h-[44px] w-full items-center justify-center gap-1.5 rounded-xl text-[14px] font-bold transition-all ${
                    isWinner
                      ? "bg-gradient-to-r from-[#0C4B75] to-[#1a7ab5] text-white shadow-sm hover:shadow-md"
                      : "border border-gray-300 text-gray-600 hover:border-[#0C4B75] hover:text-[#0C4B75]"
                  }`}
                >
                  Visit {provider.name}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </a>
              </div>
            ))}
          </div>

          {/* ───── INTRO ───── */}
          <div className="mb-14">
            <p className="text-[16px] leading-[1.8] text-gray-600">
              {battle.intro}
            </p>
          </div>

          {/* ───── CATEGORY WINNERS ───── */}
          <div className="mb-14">
            <h2 className="mb-6 text-[22px] font-bold text-[#191919]">
              Winner by Category
            </h2>

            <div className="space-y-4">
              {battle.categories.map((cat, i) => {
                const catWinnerName = getCategoryWinnerName(cat);
                const isTie = cat.winner === "tie";
                const isP1 = cat.winner === "provider1";

                return (
                  <div
                    key={i}
                    className={`rounded-2xl border bg-white p-6 sm:p-7 ${
                      isTie
                        ? "border-gray-200"
                        : "border-gray-200"
                    }`}
                  >
                    {/* Colored top accent */}
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <h3 className="text-[16px] font-bold text-[#191919]">
                        {cat.name}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                          isTie
                            ? "bg-amber-50 text-amber-600"
                            : isP1
                              ? "bg-[#0C4B75]/8 text-[#0C4B75]"
                              : "bg-teal-50 text-teal-700"
                        }`}
                      >
                        {isTie ? "Tie" : `Winner: ${catWinnerName}`}
                      </span>
                    </div>

                    <p className="mb-4 text-[14px] leading-[1.7] text-gray-500">
                      {cat.explanation}
                    </p>

                    {cat.supportingPoints && cat.supportingPoints.length > 0 && (
                      <ul className="space-y-1.5">
                        {cat.supportingPoints.map((point, pi) => (
                          <li
                            key={pi}
                            className="flex items-start gap-2.5 text-[13px] text-gray-600"
                          >
                            <Check
                              className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                                isTie ? "text-amber-500" : isP1 ? "text-[#0C4B75]" : "text-teal-600"
                              }`}
                              strokeWidth={2}
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ───── FEATURE COMPARISON TABLE ───── */}
          {battle.features && battle.features.length > 0 && (
            <div className="mb-14">
              <h2 className="mb-6 text-[22px] font-bold text-[#191919]">
                Side-by-Side Comparison
              </h2>

              {/* Desktop table */}
              <div className="hidden sm:block overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="bg-gray-50 px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-gray-400">
                        Feature
                      </th>
                      <th className="bg-[#0C4B75]/[0.03] px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-[#0C4B75]">
                        {p1.name}
                      </th>
                      <th className="bg-teal-50/40 px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-teal-700">
                        {p2.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {battle.features.map((row, i) => (
                      <tr
                        key={i}
                        className={i < battle.features.length - 1 ? "border-b border-gray-100" : ""}
                      >
                        <td className="bg-gray-50/50 px-6 py-4 font-semibold text-[#191919]">
                          {row.feature}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {row.provider1Value}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {row.provider2Value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile stacked */}
              <div className="space-y-3 sm:hidden">
                {battle.features.map((row, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                  >
                    <p className="mb-3 text-[13px] font-bold text-[#191919]">
                      {row.feature}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-[#0C4B75]/[0.03] p-2.5">
                        <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#0C4B75]/70">
                          {p1.name}
                        </p>
                        <p className="text-[13px] text-gray-600">
                          {row.provider1Value}
                        </p>
                      </div>
                      <div className="rounded-lg bg-teal-50/40 p-2.5">
                        <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-teal-700/70">
                          {p2.name}
                        </p>
                        <p className="text-[13px] text-gray-600">
                          {row.provider2Value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───── VERDICT ───── */}
          <div className="mb-14 overflow-hidden rounded-2xl border border-[#0C4B75]/15 bg-gradient-to-br from-[#0C4B75]/[0.03] to-[#1a8cd8]/[0.04]">
            {/* Colored top bar */}
            <div className="h-1 bg-gradient-to-r from-[#0C4B75] via-[#1a8cd8] to-[#0C4B75]" />
            <div className="p-6 sm:p-8">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0C4B75]/10">
                  <Trophy className="h-4 w-4 text-[#0C4B75]" strokeWidth={1.5} />
                </div>
                <h2 className="text-[22px] font-bold text-[#191919]">Our Verdict</h2>
              </div>

              <p className="mb-6 text-[15px] leading-[1.75] text-gray-600">
                {battle.verdict}
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Winner points */}
                <div className="rounded-xl bg-white/70 p-5">
                  <p className="mb-3 text-[13px] font-bold uppercase tracking-wider text-[#0C4B75]">
                    Choose {winner.name} if you want
                  </p>
                  <ul className="space-y-2">
                    {(battle.verdictWinnerPoints ?? []).map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[14px] text-gray-600"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0C4B75]" strokeWidth={2} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Loser points */}
                <div className="rounded-xl bg-white/70 p-5">
                  <p className="mb-3 text-[13px] font-bold uppercase tracking-wider text-teal-700">
                    Choose {loser.name} if you prefer
                  </p>
                  <ul className="space-y-2">
                    {(battle.verdictLoserPoints ?? []).map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[14px] text-gray-600"
                      >
                        <Minus className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" strokeWidth={2} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={winner.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-7 flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0C4B75] to-[#1a7ab5] text-[15px] font-bold text-white shadow-sm transition-shadow hover:shadow-md sm:w-auto sm:px-8"
              >
                Visit {winner.name}
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* ───── BOTTOM CTAs ───── */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            {[
              { provider: p1, color: "from-[#0C4B75]/5 to-[#0C4B75]/[0.02]", hoverColor: "hover:border-[#0C4B75]/30", textColor: "text-[#0C4B75]" },
              { provider: p2, color: "from-teal-50/50 to-teal-50/20", hoverColor: "hover:border-teal-300", textColor: "text-teal-700" },
            ].map(({ provider, color, hoverColor, textColor }) => (
              <a
                key={provider.id}
                href={provider.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
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
              </a>
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
