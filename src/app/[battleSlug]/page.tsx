import type { Metadata } from "next";
import Link from "next/link";
import { getConfig } from "@/lib/config-store";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { notFound } from "next/navigation";
import { Trophy, ArrowRight } from "lucide-react";

export const revalidate = 60;

// Prevent this catch-all from matching known static routes
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
  const battle = (config.battles ?? []).find((b) => b.slug === battleSlug);
  if (!battle) return { title: "Not Found" };

  return {
    title: battle.title,
    description: battle.description,
    alternates: { canonical: `https://topweightloss.io/${battle.slug}` },
    openGraph: {
      title: battle.title,
      description: battle.description,
      url: `https://topweightloss.io/${battle.slug}`,
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
  const battle = (config.battles ?? []).find((b) => b.slug === battleSlug);
  if (!battle) return notFound();

  const p1 = config.providers.find((p) => p.id === battle.provider1Id);
  const p2 = config.providers.find((p) => p.id === battle.provider2Id);
  if (!p1 || !p2) return notFound();

  // Get scores from ranking
  const { providerOrder, positions } = config.ranking;
  const p1Rank = providerOrder.indexOf(p1.id);
  const p2Rank = providerOrder.indexOf(p2.id);
  const p1Score = p1Rank >= 0 && positions[p1Rank] ? positions[p1Rank] : null;
  const p2Score = p2Rank >= 0 && positions[p2Rank] ? positions[p2Rank] : null;

  const winner = battle.winnerId === p1.id ? p1 : p2;
  const p1Wins = battle.categories.filter((c) => c.provider1Score > c.provider2Score).length;
  const p2Wins = battle.categories.filter((c) => c.provider2Score > c.provider1Score).length;
  const ties = battle.categories.filter((c) => c.provider1Score === c.provider2Score).length;

  // JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: battle.title,
    description: battle.description,
    author: { "@type": "Organization", name: "topweightloss.io" },
    publisher: { "@type": "Organization", name: "topweightloss.io" },
    mainEntityOfPage: `https://topweightloss.io/${battle.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-[#0C4B75]">
          <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6 sm:py-14">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: `${p1.name} vs ${p2.name}` },
              ]}
            />

            <h1 className="text-[24px] font-bold leading-tight text-white sm:text-[36px]">
              {p1.name} vs {p2.name}
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/70">
              {battle.description}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
          {/* Score header cards */}
          <div className="mb-8 grid grid-cols-2 gap-4">
            {[
              { provider: p1, score: p1Score, isWinner: battle.winnerId === p1.id },
              { provider: p2, score: p2Score, isWinner: battle.winnerId === p2.id },
            ].map(({ provider, score, isWinner }) => (
              <div
                key={provider.id}
                className={`relative rounded-xl border bg-white p-5 text-center shadow-sm sm:p-6 ${isWinner ? "border-[#0C4B75] ring-1 ring-[#0C4B75]/20" : "border-gray-200"}`}
              >
                {isWinner && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#0C4B75] px-3 py-0.5 text-[11px] font-bold text-white uppercase tracking-wide">
                      <Trophy className="h-3 w-3" strokeWidth={2} />
                      Winner
                    </span>
                  </div>
                )}
                <div className="mx-auto mb-3 flex h-[45px] w-[120px] items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={provider.logo}
                    alt={`${provider.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                {score && (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[28px] font-extrabold text-[#191919]">
                      {score.score}
                    </span>
                    <span className="text-[13px] font-semibold text-gray-400">
                      / 10
                    </span>
                  </div>
                )}
                {score && (
                  <p className="mt-0.5 text-[12px] font-semibold text-gray-400">
                    {score.label}
                  </p>
                )}
                <a
                  href={provider.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="mt-4 inline-flex h-[40px] w-full items-center justify-center gap-1.5 rounded-lg bg-[#0C4B75] text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
                >
                  Visit {provider.name}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </a>
              </div>
            ))}
          </div>

          {/* Win tally */}
          <div className="mb-8 flex items-center justify-center gap-6 rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
            <div className="text-center">
              <p className="text-[22px] font-extrabold text-[#0C4B75]">{p1Wins}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{p1.name}</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-[22px] font-extrabold text-gray-400">{ties}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Tied</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-[22px] font-extrabold text-[#0C4B75]">{p2Wins}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{p2.name}</p>
            </div>
          </div>

          {/* Intro */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-[16px] leading-[1.75] text-gray-600">
              {battle.intro}
            </p>
          </div>

          {/* Category breakdowns */}
          <div className="mb-8 space-y-4">
            {battle.categories.map((cat, i) => {
              const p1Higher = cat.provider1Score > cat.provider2Score;
              const p2Higher = cat.provider2Score > cat.provider1Score;
              const maxScore = 10;

              return (
                <div
                  key={i}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <h3 className="mb-4 text-[18px] font-bold text-[#191919]">
                    {cat.name}
                  </h3>

                  {/* Score bars */}
                  <div className="mb-4 space-y-3">
                    {/* Provider 1 */}
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className={`text-[13px] font-semibold ${p1Higher ? "text-[#0C4B75]" : "text-gray-500"}`}>
                          {p1.name}
                        </span>
                        <span className={`text-[14px] font-bold ${p1Higher ? "text-[#0C4B75]" : "text-gray-500"}`}>
                          {cat.provider1Score}/{maxScore}
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full transition-all ${p1Higher ? "bg-[#0C4B75]" : "bg-gray-300"}`}
                          style={{ width: `${(cat.provider1Score / maxScore) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Provider 2 */}
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className={`text-[13px] font-semibold ${p2Higher ? "text-[#0C4B75]" : "text-gray-500"}`}>
                          {p2.name}
                        </span>
                        <span className={`text-[14px] font-bold ${p2Higher ? "text-[#0C4B75]" : "text-gray-500"}`}>
                          {cat.provider2Score}/{maxScore}
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full transition-all ${p2Higher ? "bg-[#0C4B75]" : "bg-gray-300"}`}
                          style={{ width: `${(cat.provider2Score / maxScore) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-[14px] leading-[1.7] text-gray-500">
                    {cat.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Verdict */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-3 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-[#0C4B75]" strokeWidth={1.5} />
              <h2 className="text-[20px] font-bold text-[#191919]">Our Verdict</h2>
            </div>
            <p className="text-[16px] leading-[1.75] text-gray-600">
              {battle.verdict}
            </p>
          </div>

          {/* Final CTAs */}
          <div className="grid grid-cols-2 gap-4">
            {[p1, p2].map((provider) => (
              <a
                key={provider.id}
                href={provider.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-[40px] w-[110px] items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={provider.logo}
                    alt={`${provider.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className="flex items-center gap-1.5 text-[14px] font-bold text-[#0C4B75]">
                  Visit {provider.name}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </a>
            ))}
          </div>

          {/* Related links */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[13px]">
            <Link href={`/reviews/${p1.id}`} className="font-semibold text-[#0C4B75] hover:underline">
              {p1.name} Full Review
            </Link>
            <span className="text-gray-300">|</span>
            <Link href={`/reviews/${p2.id}`} className="font-semibold text-[#0C4B75] hover:underline">
              {p2.name} Full Review
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
