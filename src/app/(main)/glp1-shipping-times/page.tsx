import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Truck, ShieldCheck, MessageSquareQuote } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { GuideCluster } from "@/components/guide-cluster";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { TrustDisclosure } from "@/components/medical-sources";
import { ProviderCta } from "@/components/provider-cta";
import { TrustpilotWordmark, tpStarColor } from "@/components/trustpilot-rating";
import { pageReviewSchema } from "@/data/reviewers";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED } from "@/lib/price-index";
import type { Provider, TrustpilotReview } from "@/lib/config";

export const revalidate = 60;

// ───── GLP-1 shipping times by provider ─────
// Two columns of fact, kept apart on purpose: (1) what each provider PUBLISHES
// about shipping, taken from the verified price index; (2) what reviewers
// REPORT, computed from the Trustpilot reviews we captured verbatim with one
// keyword rule. Nothing here is a measured delivery time.

const CANONICAL = "https://www.treatmentshub.com/weight-loss/glp1-shipping-times";
const PUBLISHED = "2026-10-06";
const UPDATED = "2026-10-06";

const SHIPPING_RE = /ship|deliver|arriv|tracking|fedex|package|refill/i;
// A delivery-related sentence that states a span or a day count.
const SPAN_RE = /\b(\d+|one|two|three|four|five|six|seven|eight|ten)[- ](?:to[- ]\d+[- ])?(day|days|week|weeks|business days)\b|next day|same day|overnight|48 hours|24 hours/i;
const DELIVERY_SENTENCE_RE = /ship|deliver|arriv|tracking|fedex|package|received|came|late|delay/i;

const MIN_REVIEWS = 5;
const SMALL_SAMPLE = 5;

type Row = {
  provider: Provider;
  promise: string | null;
  n: number;
  mentions: TrustpilotReview[];
  pos: number;
  neg: number;
  quotes: { review: TrustpilotReview; sentence: string }[];
};

function reviewTime(r: TrustpilotReview): number {
  if (!r.date) return 0;
  const t = new Date(r.date).getTime();
  return isNaN(t) ? 0 : t;
}
const pct = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);
const longDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

function buildRows(providers: Provider[]): Row[] {
  return providers
    .filter((p) => (p.trustpilotReviews?.length ?? 0) >= MIN_REVIEWS)
    .map((p) => {
      const reviews = p.trustpilotReviews!;
      const mentions = reviews.filter((r) => SHIPPING_RE.test(`${r.title} ${r.text}`));
      const quotes = mentions
        .sort((a, b) => reviewTime(b) - reviewTime(a))
        .flatMap((review) => {
          const sentence = review.text.split(/(?<=[.!?])\s+/).find((s) => DELIVERY_SENTENCE_RE.test(s) && SPAN_RE.test(s));
          return sentence ? [{ review, sentence: sentence.trim() }] : [];
        })
        .slice(0, 3);
      return {
        provider: p,
        promise: PRICE_INDEX.find((r) => r.providerId === p.id)?.shipping ?? null,
        n: reviews.length,
        mentions,
        pos: mentions.filter((r) => r.rating >= 4).length,
        neg: mentions.filter((r) => r.rating <= 2).length,
        quotes,
      };
    })
    .filter((r) => r.mentions.length > 0)
    // Providers with a usable delivery sample first, then by positive share.
    .sort((a, b) => {
      const au = a.mentions.length >= SMALL_SAMPLE ? 1 : 0;
      const bu = b.mentions.length >= SMALL_SAMPLE ? 1 : 0;
      if (au !== bu) return bu - au;
      return pct(b.pos, b.mentions.length) - pct(a.pos, a.mentions.length) || b.mentions.length - a.mentions.length;
    });
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig("weight-loss");
  const rows = buildRows(config.providers);
  const total = rows.reduce((s, r) => s + r.mentions.length, 0);
  const title = `GLP-1 Shipping Times by Provider (2026): Published Promise vs What ${total} Reviewers Report`;
  const description = `How fast online GLP-1 providers say they ship (1-2 days, overnight, 3-5 days) against what ${total} Trustpilot reviewers who mention delivery actually report, with every stated day count quoted - across ${rows.length} providers.`;
  return { title, description, alternates: { canonical: CANONICAL }, openGraph: { title, description, url: CANONICAL, type: "article" } };
}

export default async function ShippingTimesPage() {
  const config = await getConfig("weight-loss");
  const rows = buildRows(config.providers);
  const totalMentions = rows.reduce((s, r) => s + r.mentions.length, 0);
  const totalReviews = rows.reduce((s, r) => s + r.n, 0);
  const totalNeg = rows.reduce((s, r) => s + (r.mentions.length - r.pos), 0);
  // Published-promise buckets, computed from the index strings of providers
  // that appear in the table (so the summary never names a provider the
  // table does not show).
  const shown = new Set(rows.map((r) => r.provider.id));
  const nameOf = (id: string) => config.providers.find((p) => p.id === id)?.name ?? id;
  const promises = PRICE_INDEX.filter((r) => shown.has(r.providerId));
  const fastest = promises.filter((r) => /overnight|1-2 day|next-day/i.test(r.shipping)).map((r) => nameOf(r.providerId));
  const slower = promises.filter((r) => /\d-\d (business )?days/i.test(r.shipping) && !/1-2 day/i.test(r.shipping)).map((r) => `${nameOf(r.providerId)} (${r.shipping.replace(/^(free )?(shipping in |ships in |ships )?/i, "").toLowerCase()})`);
  const noWindow = promises.filter((r) => !/\d/.test(r.shipping) && !/overnight|next-day/i.test(r.shipping)).map((r) => nameOf(r.providerId));
  const title = `GLP-1 Shipping Times by Provider: Published Promise vs What ${totalMentions} Reviewers Report`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    ...pageReviewSchema("/weight-loss/glp1-shipping-times"),
    author: { "@type": "Organization", name: "Treatments Hub Team", url: "https://www.treatmentshub.com" },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: "https://www.treatmentshub.com" },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.treatmentshub.com/weight-loss" },
      { "@type": "ListItem", position: 2, name: "GLP-1 Shipping Times by Provider", item: CANONICAL },
    ],
  };

  const ext = "font-semibold text-[#0C4B75] hover:underline";
  const cell = "border-r border-gray-200 px-3 py-3 align-top last:border-r-0 [font-variant-numeric:tabular-nums]";

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[960px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/weight-loss" }, { label: "Shipping Times by Provider" }]} />
          <h1 className="max-w-[820px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">{title}</h1>
          <p className="mt-3 max-w-[720px] text-[16px] leading-relaxed text-gray-500">
            Delivery is the most common complaint in GLP-1 telehealth reviews, and the one thing every provider makes a
            promise about. This page keeps the two apart: the shipping terms each provider publishes, from our verified
            price index, next to what reviewers who mention delivery actually report - every stated day count quoted as
            written.
          </p>
          <LastUpdated date={UPDATED} className="mt-4" />
          <MedicalReviewBar path="/weight-loss/glp1-shipping-times" className="mt-4 max-w-[760px]" />
          <TrustDisclosure disclaimerHref="/weight-loss/disclaimer" />
        </div>
      </div>

      <div className="mx-auto max-w-[960px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        <div className="mb-10 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" strokeWidth={2} />
          <div className="text-[15px] leading-[1.75] text-gray-600">
            <h2 className="mb-2 text-[18px] font-bold text-[#191919]">The short answer</h2>
            <p className="mb-2">
              {fastest.length > 0 && (
                <>The fastest published promises are {fastest.join(", ")}: overnight or 1-2 day delivery. </>
              )}
              {slower.length > 0 && <>Slower published windows: {slower.join("; ")}. </>}
              {noWindow.length > 0 && <>{noWindow.join(", ")} publish{noWindow.length === 1 ? "es" : ""} free delivery without a stated window. </>}
              Across {totalReviews} captured reviews, <strong className="text-[#191919]">{totalMentions} mention delivery</strong>, and{" "}
              {pct(totalNeg, totalMentions)}% of those rate the provider 3 stars or lower.
            </p>
            <p>
              The pattern in the quotes below is consistent: when delivery goes wrong, it is a first order or a refill that
              ships days after the promised window, sometimes after the reviewer&rsquo;s injection day. Promises are
              published; outcomes are individual reports.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <div className="mb-2 flex items-center gap-2">
            <Truck className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">Published promise vs reviewer reports</h2>
          </div>
          <p className="mb-4 text-[15px] text-gray-500">
            &ldquo;Published&rdquo; is the provider&rsquo;s own shipping statement as recorded in our price index (verified{" "}
            {longDate(PRICE_INDEX_VERIFIED)}). &ldquo;Mention delivery&rdquo; counts captured reviews whose title or text matches the
            delivery keyword rule; &ldquo;4-5★&rdquo; is the share of those rating the provider 4 or 5 stars.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[820px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F7F8FA] text-left text-[12px] font-bold uppercase tracking-wide text-gray-500">
                  <th className={cell}>Provider</th>
                  <th className={cell}>Published shipping</th>
                  <th className={cell}>Captured</th>
                  <th className={cell}>Mention delivery</th>
                  <th className={cell}>4-5★</th>
                  <th className={cell}>1-2★</th>
                  <th className={cell}>Public Trustpilot</th>
                  <th className={cell} />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.provider.id} className="border-b border-gray-200 last:border-b-0">
                    <td className={cell}>
                      <Link href={`/weight-loss/reviews/${r.provider.id}`} className="font-bold text-[#191919] hover:text-[#0C4B75] hover:underline">{r.provider.name}</Link>
                      {r.mentions.length < SMALL_SAMPLE && <p className="text-[11.5px] text-amber-600">Small sample</p>}
                    </td>
                    <td className={`${cell} text-gray-700`}>{r.promise ?? <span className="text-gray-400">Not stated in our index</span>}</td>
                    <td className={cell}>{r.n}</td>
                    <td className={cell}>{r.mentions.length}</td>
                    <td className={`${cell} font-bold text-[#191919]`}>{pct(r.pos, r.mentions.length)}%</td>
                    <td className={cell}>{r.neg}</td>
                    <td className={cell}>
                      {r.provider.trustpilotRating ? (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap">
                          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: tpStarColor(parseFloat(r.provider.trustpilotRating)) }} />
                          <strong>{r.provider.trustpilotRating}</strong>
                          {r.provider.trustpilotReviewCount && <span className="text-gray-400">({r.provider.trustpilotReviewCount})</span>}
                        </span>
                      ) : (
                        <span className="text-gray-400">Not published</span>
                      )}
                    </td>
                    <td className={cell}>
                      <ProviderCta href={r.provider.affiliateUrl} providerName={r.provider.name} providerSlug={r.provider.id} pageType="listing" sourceFlow="main_comparison" className="inline-flex items-center gap-1 whitespace-nowrap text-[12.5px] font-semibold text-[#0C4B75] hover:underline">
                        Visit site <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </ProviderCta>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-gray-500">
            Public Trustpilot figures are each provider&rsquo;s profile aggregate on the date we captured it. Source:{" "}
            <TrustpilotWordmark starClass="h-3.5 w-3.5" textClass="text-[12.5px]" />
          </p>
        </section>

        <section className="mb-12">
          <div className="mb-2 flex items-center gap-2">
            <MessageSquareQuote className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">What reviewers report, in days</h2>
          </div>
          <p className="mb-5 text-[15px] text-gray-500">
            Every delivery-related sentence that states a day count or a span, quoted as written, newest first, up to three
            per provider. Individual reports, not measurements.
          </p>
          <div className="space-y-4">
            {rows.filter((r) => r.quotes.length > 0).map((r) => (
              <div key={r.provider.id} className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="mb-1 text-[15px] font-bold text-[#191919]">
                  <Link href={`/weight-loss/reviews/${r.provider.id}`} className="hover:text-[#0C4B75] hover:underline">{r.provider.name}</Link>
                </p>
                {r.promise && <p className="mb-3 text-[12.5px] text-gray-500">Published: {r.promise}</p>}
                <ul className="space-y-2.5">
                  {r.quotes.map(({ review, sentence }, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-gray-700">
                      <span className="mt-1 inline-flex h-5 shrink-0 items-center rounded px-1.5 text-[11px] font-bold text-white" style={{ backgroundColor: tpStarColor(review.rating) }}>{review.rating}★</span>
                      <span>
                        &ldquo;{sentence}&rdquo;
                        <span className="text-gray-400"> - {review.name}{review.date ? `, ${review.date}` : ""}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-3 text-[20px] font-bold text-[#191919]">Methodology and limits</h2>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-gray-600">
            <li><strong className="text-[#191919]">Published promise.</strong> The shipping statement in each provider&rsquo;s own materials, as recorded in our verified price index on {longDate(PRICE_INDEX_VERIFIED)}. Where a provider publishes no delivery window, the table says so.</li>
            <li><strong className="text-[#191919]">Reviewer reports.</strong> Trustpilot reviews captured verbatim from each provider&rsquo;s public profile, names shortened. A review counts as mentioning delivery if its title or text contains ship, deliver, arrive, tracking, FedEx, package or refill. The same rule applies to every provider.</li>
            <li><strong className="text-[#191919]">Day counts.</strong> Sentences that both concern delivery and state a span (&ldquo;2 days&rdquo;, &ldquo;overnight&rdquo;, &ldquo;three days late&rdquo;), quoted as written. They are what one customer reported about one order.</li>
            <li><strong className="text-[#191919]">Limits.</strong> Samples are small and uneven, people with a problem review more often, and a first order (which includes the provider review) is not the same as a refill. Read the table as a map of what customers talk about. Prices and plan details are on the{" "}<Link href="/weight-loss/cheapest-glp1" className={ext}>cheapest GLP-1 comparison</Link>; support and billing on{" "}<Link href="/weight-loss/glp1-provider-support" className={ext}>provider support compared</Link>.</li>
          </ul>
        </section>

        <GuideCluster currentSlug="glp1-shipping-times" />
      </div>
    </div>
  );
}
