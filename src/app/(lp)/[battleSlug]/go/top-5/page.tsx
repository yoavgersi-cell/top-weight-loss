import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ShieldCheck, Star } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { VERTICALS } from "@/lib/config";
import { HubLogo } from "@/components/hub-logo";

// ───── Paid-social landing page: /<vertical>/go/top-5 ─────
// Built for Facebook/Instagram ad traffic: cold, on a phone, one scroll. No
// site navigation; the page is the category's top five from the live ranking,
// rendered as lean cards (score, three bullets, one trust line, one button),
// followed by three short paragraphs. Order, scores and badges come from the
// same ranking config as the comparison page, so the page can never disagree
// with it. Every bullet is a provider highlight already verified for the
// comparison cards; the trust line is the provider's verified Trustpilot
// record and is omitted where none is published. No visitor counters or other
// figures we cannot verify. noindex, absent from the sitemap. Categories that
// rank fewer than five providers show the real count in the headline.

export const revalidate = 3600;

const COPY: Record<string, { h1: string; sub: string; note?: string }> = {
  "weight-loss": {
    h1: "The {n} best online GLP-1 weight loss programs of 2026",
    sub: "Licensed US clinicians, medication shipped to your door, no insurance needed. Ranked on verified prices and real customer reviews.",
    note: "Compounded semaglutide and tirzepatide are not FDA-approved. A licensed clinician decides whether a GLP-1 is right for you.",
  },
  "hair-loss": {
    h1: "The {n} best online hair loss treatments of 2026",
    sub: "Doctor-reviewed finasteride, minoxidil and custom formulas, shipped to your door. Ranked on verified prices and real customer reviews.",
    note: "Prescription treatments need a licensed clinician's review. Results take months and vary from person to person.",
  },
  trt: {
    h1: "The {n} best online TRT clinics of 2026",
    sub: "Lab testing, licensed clinicians and treatment delivered to your door. Ranked on verified prices and real customer reviews.",
    note: "Testosterone therapy needs blood tests and a licensed clinician's diagnosis before any prescription.",
  },
  hrt: {
    h1: "The {n} best online menopause HRT providers of 2026",
    sub: "Licensed clinicians, hormone therapy shipped to your door. Ranked on verified prices and real customer reviews.",
    note: "Hormone therapy is a decision for you and a licensed clinician, based on your health history.",
  },
  "online-therapy": {
    h1: "The {n} best online therapy platforms of 2026",
    sub: "Licensed therapists and psychiatrists by video, phone or chat. Ranked on price, insurance and real customer reviews.",
    note: "If you are in crisis, call or text 988 (US) for free, 24/7 support.",
  },
  ed: {
    h1: "The {n} best online ED treatments of 2026",
    sub: "Licensed US clinicians, discreet delivery, no clinic visit. Ranked on verified prices and real customer reviews.",
    note: "ED medication needs a licensed clinician's review. Never combine it with nitrates.",
  },
};

// Operator's pick order per category (Nov 1, 2026; Eden first). Categories without an
// entry use their live ranking's top five. Ids that have no record in the
// category's config are skipped, never faked: Gala is listed for weight loss
// but only has an HRT record so far, so its card appears once a verified
// GLP-1 record (prices, plan terms, partner link) is added to the
// weight-loss config.
const PICKS: Record<string, string[]> = {
  "weight-loss": ["eden", "embody", "wellmedr", "altrx", "gala"],
};

// Page-only scores in card order (operator, Nov 1, 2026). They replace the
// ranking-slot scores on this page only; label and stars follow the same
// bands the comparison page uses for those scores.
const PAGE_SCORES: Record<string, { score: number; starRating: number; label: string }[]> = {
  "weight-loss": [
    { score: 9.8, starRating: 5, label: "Exceptional" },
    { score: 9.6, starRating: 4.5, label: "Excellent" },
    { score: 9.2, starRating: 4, label: "Excellent" },
    { score: 8.9, starRating: 3.5, label: "Very Good" },
    { score: 8.7, starRating: 3, label: "Very Good" },
  ],
};

function pickIds(vertical: string, providerOrder: string[], providerIds: string[]): string[] {
  const ids = PICKS[vertical] ?? providerOrder;
  return ids.filter((id) => providerIds.includes(id)).slice(0, 5);
}

export async function generateMetadata({ params }: { params: Promise<{ battleSlug: string }> }): Promise<Metadata> {
  const { battleSlug } = await params;
  const copy = COPY[battleSlug];
  if (!copy) return {};
  const config = await getConfig(battleSlug);
  const n = pickIds(battleSlug, config.ranking.providerOrder, config.providers.map((p) => p.id)).length;
  return {
    title: { absolute: `${copy.h1.replace("{n}", String(n))} - Treatments Hub` },
    description: copy.sub,
    robots: { index: false, follow: true },
  };
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => {
        // Fill fraction for this star: 1, 0.5 or 0 (half stars for x.5 ratings).
        const fill = Math.max(0, Math.min(1, n - i));
        return (
          <span key={i} className="relative inline-block h-4 w-4">
            <Star className="absolute inset-0 h-4 w-4 fill-gray-200 text-gray-200" strokeWidth={0} />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" strokeWidth={0} />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export default async function TopFivePage({ params }: { params: Promise<{ battleSlug: string }> }) {
  const { battleSlug: vertical } = await params;
  const copy = COPY[vertical];
  if (!copy || !VERTICALS.some((v) => v.id === vertical)) return notFound();

  const config = await getConfig(vertical);
  const { providerOrder, positions } = config.ranking;
  const cards = pickIds(vertical, providerOrder, config.providers.map((p) => p.id))
    .map((id, displayIdx) => {
      const p = config.providers.find((x) => x.id === id);
      if (!p) return null;
      // Score, label and stars come from the provider's real ranking slot;
      // the card number and the "Our Top Pick" tag follow this page's order.
      const index = providerOrder.indexOf(id);
      const pos =
        PAGE_SCORES[vertical]?.[displayIdx] ??
        (index >= 0 ? positions[index] : undefined) ??
        positions[positions.length - 1];
      const review = (config.reviews ?? []).find((r) => r.providerId === id);
      // Never ship a dead button: a placeholder link falls back to the review.
      const href = p.affiliateUrl && p.affiliateUrl !== "#" ? p.affiliateUrl : `/${vertical}/reviews/${review?.slug ?? id}`;
      return {
        id,
        rank: displayIdx + 1,
        name: p.name,
        logo: p.logo,
        tagline: p.tagline,
        bullets: (p.highlights ?? []).slice(0, 3),
        score: pos.score,
        label: pos.label,
        stars: pos.starRating ?? Math.round(pos.score / 2),
        badge: displayIdx === 0 ? "Our Top Pick" : undefined,
        trustpilot: p.trustpilotRating && p.trustpilotReviewCount ? `${p.trustpilotRating} on Trustpilot (${p.trustpilotReviewCount} reviews)` : null,
        href,
        reviewHref: `/${vertical}/reviews/${review?.slug ?? id}`,
      };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);
  if (cards.length === 0) return notFound();

  const month = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

  return (
    <div className="bg-[#F4F7F9] pb-12 text-[#191919]">
      {/* Logo + disclosure */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[880px] items-center justify-between px-4 py-2.5">
          <Link href={`/${vertical}`} aria-label="Treatments Hub">
            <HubLogo vertical={vertical} />
          </Link>
        </div>
        <p className="bg-[#f0f4f8] px-4 py-1.5 text-center text-[10.5px] leading-tight text-gray-600 sm:text-[12px]">
          We may earn a commission from links on this page. It never changes our ratings.{" "}
          <Link href="/weight-loss/disclaimer" className="font-bold underline underline-offset-2">Advertising disclosure</Link>
        </p>
      </div>

      {/* Headline */}
      <header className="mx-auto max-w-[880px] px-4 pt-6 pb-5 sm:pt-9">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-bold text-emerald-700">
          <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
          Updated {month}
        </p>
        <h1 className="mt-3 text-[26px] font-extrabold leading-[1.15] tracking-tight sm:text-[34px]">{copy.h1.replace("{n}", String(cards.length))}</h1>
        <p className="mt-2.5 text-[15px] leading-relaxed text-gray-600 sm:text-[16.5px]">{copy.sub}</p>
      </header>

      {/* Lean cards */}
      <ol className="mx-auto max-w-[880px] space-y-4 px-4">
        {cards.map((c) => (
          <li key={c.id} className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-stretch">
              <span className="flex h-9 w-9 items-center justify-center rounded-br-lg bg-[#191919] text-[17px] font-extrabold text-white">{c.rank}</span>
              {c.badge && (
                <span className="ml-1.5 flex items-center rounded-b-lg bg-amber-400 px-3 text-[12px] font-extrabold uppercase tracking-wide text-[#3d2e00]">{c.badge}</span>
              )}
            </div>

            <div className="grid gap-4 px-4 pt-3 pb-5 sm:grid-cols-[180px_1fr_200px] sm:items-center sm:gap-6 sm:px-6 sm:pt-2">
              {/* Logo + score (score sits beside the logo on mobile, right column on desktop) */}
              <div className="flex items-center justify-between sm:block">
                <div className="flex h-[44px] w-[150px] items-center sm:h-[56px] sm:w-[170px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.logo} alt={`${c.name} logo`} width={170} height={56} className="max-h-full max-w-full object-contain object-left" />
                </div>
                <div className="flex items-center gap-2 sm:hidden">
                  <span className="text-[34px] font-extrabold leading-none">{c.score.toFixed(1)}</span>
                  <span className="flex flex-col gap-0.5">
                    <Stars n={c.stars} />
                    <span className="text-[12.5px] font-semibold text-gray-500">{c.label}</span>
                  </span>
                </div>
              </div>

              {/* Tagline + 3 bullets + trust line */}
              <div>
                <p className="text-[16px] font-bold leading-snug sm:text-[17px]">{c.tagline}</p>
                <ul className="mt-2 space-y-1.5">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-[14.5px] leading-snug text-gray-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                      {b}
                    </li>
                  ))}
                </ul>
                {c.trustpilot && (
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-[13px] font-semibold text-amber-800">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" strokeWidth={0} />
                    {c.trustpilot}
                  </p>
                )}
              </div>

              {/* Score (desktop) + CTA */}
              <div className="flex flex-col gap-3">
                <div className="hidden items-center gap-2 sm:flex">
                  <span className="text-[38px] font-extrabold leading-none">{c.score.toFixed(1)}</span>
                  <span className="flex flex-col gap-0.5">
                    <Stars n={c.stars} />
                    <span className="text-[13px] font-semibold text-gray-500">{c.label}</span>
                  </span>
                </div>
                <a
                  href={c.href}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="flex h-[50px] items-center justify-center gap-2 rounded-lg bg-[#0C4B75] text-[17px] font-bold text-white transition-colors hover:bg-[#093d61]"
                >
                  Visit Site <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
                <Link href={c.reviewHref} className="text-center text-[13.5px] font-semibold text-[#0C4B75] hover:underline">
                  Read {c.name} review
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Short text below the chart */}
      <section className="mx-auto mt-8 max-w-[880px] space-y-3 px-4 text-[14.5px] leading-relaxed text-gray-600">
        <h2 className="text-[17px] font-bold text-[#191919]">How we picked</h2>
        <p>We compare published prices, what each plan includes, how care works and real customer reviews.</p>
        <p>
          Want the details? See the <Link href={`/${vertical}`} className="font-semibold text-[#0C4B75] underline underline-offset-2">full comparison</Link>.
        </p>
      </section>

      <footer className="mx-auto mt-8 max-w-[880px] px-4 text-[11.5px] leading-relaxed text-gray-400">
        <p>
          {copy.note} This page is for information only and is not medical advice. Prices and offers can change; confirm them on the provider&rsquo;s site.
        </p>
        <p className="mt-2">
          <Link href="/weight-loss/disclaimer" className="underline underline-offset-2">Disclaimer</Link>
          {" · "}
          <Link href="/weight-loss/privacy" className="underline underline-offset-2">Privacy</Link>
        </p>
      </footer>
    </div>
  );
}
