import Link from "next/link";
import type { SiteConfig } from "@/lib/config";

// ───── Ranking snapshot ─────
// A short direct answer plus an at-a-glance table of a vertical's ranked
// providers, placed above the cards so a reader (and an AI engine answering
// "most trusted online X provider") gets the ranking in one quotable block.
// Every value comes from the vertical's config - rank order, our score, the
// provider's own tagline and treatment list, and the public rating as plain
// text where one is on record. Nothing is typed here. Added Nov 8, 2026
// from the Bing AI Performance export (hair-loss home: "most trusted digital
// hair loss treatment provider", 188 citations at 16%).
export function RankingSnapshot({
  config,
  linkPrefix,
  categoryLabel,
  asOf,
}: {
  config: SiteConfig;
  linkPrefix: string;
  /** e.g. "hair-loss" for "online hair-loss providers". */
  categoryLabel: string;
  /** The ranking's own date label, e.g. "October 2026". */
  asOf?: string;
}) {
  const byId = new Map(config.providers.map((p) => [p.id, p]));
  const rows = config.ranking.providerOrder
    .map((id, i) => {
      const p = byId.get(id);
      if (!p) return null;
      const review = (config.reviews ?? []).find((r) => r.providerId === id);
      return {
        id,
        rank: i + 1,
        name: p.name,
        score: config.ranking.positions[i]?.score,
        tagline: p.tagline,
        offers: (review?.treatmentOptions ?? []).slice(0, 2).map((t) => t.split(" - ")[0]),
        rating: p.trustpilotRating && p.trustpilotReviewCount ? `${p.trustpilotRating} across ${p.trustpilotReviewCount} Trustpilot reviews` : null,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);
  if (rows.length < 2) return null;

  const top = rows.slice(0, 3);
  const fmt = (n?: number) => (typeof n === "number" ? n.toFixed(1) : "");
  const list = top.map((r) => `${r.name}${r.score ? ` (${fmt(r.score)}/10)` : ""}`);
  const listText = list.length > 1 ? `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}` : list[0];

  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-4" aria-labelledby="ranking-snapshot-heading">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
        <h2 id="ranking-snapshot-heading" className="text-[18px] font-bold text-[#191919] sm:text-[20px]">
          Which online {categoryLabel} providers do we rate highest?
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-gray-800">
          <strong>Short answer:</strong> {listText} are the online {categoryLabel} providers we rate highest
          {asOf ? <> in our ranking as of {asOf}</> : null}. We score each one on medical oversight, treatment
          options, price transparency and its public review record; the full cards and reviews are below.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-gray-200 text-[11.5px] uppercase tracking-wide text-gray-500">
                <th className="py-2 pr-3 font-bold">#</th>
                <th className="py-2 pr-3 font-bold">Provider</th>
                <th className="py-2 pr-3 font-bold">Our score</th>
                <th className="py-2 pr-3 font-bold">What it offers</th>
                <th className="py-2 font-bold">Public rating</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 align-top last:border-0">
                  <td className="py-2.5 pr-3 font-bold text-gray-500">{r.rank}</td>
                  <td className="py-2.5 pr-3">
                    <Link href={`${linkPrefix}/reviews/${r.id}`} className="font-semibold text-[#0C4B75] hover:underline">
                      {r.name}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-3 font-semibold text-[#191919]">{r.score ? `${fmt(r.score)}/10` : "-"}</td>
                  <td className="py-2.5 pr-3 text-gray-700">{r.offers.length ? r.offers.join(" · ") : r.tagline}</td>
                  <td className="py-2.5 text-gray-700">{r.rating ?? "Not published"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
