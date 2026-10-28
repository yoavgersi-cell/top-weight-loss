import type { Metadata } from "next";
import Link from "next/link";
import { BadgePercent, CalendarClock, ShieldCheck, Tag } from "lucide-react";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { GuideCluster } from "@/components/guide-cluster";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { TrustDisclosure } from "@/components/medical-sources";
import { ProviderCta } from "@/components/provider-cta";
import { HolidayCountdown } from "@/components/tools/holiday-countdown";
import { DealChecker, type CheckerRow } from "@/components/tools/deal-checker";
import { getConfig } from "@/lib/config-store";
import { VERTICALS } from "@/lib/config";
import { medicalWebPageFields } from "@/lib/medical-schema";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED } from "@/lib/price-index";
import { HOLIDAY_OFFERS, HOLIDAY_SEASON, latestCheck, latestVerified, offerStatus, type HolidayOffer, type HolidayVertical } from "@/lib/holiday-offers";

export const revalidate = 3600;

// ───── Black Friday & Cyber Monday GLP-1 deals ─────
// One evergreen URL, reused every season. Everything with a dollar sign on
// it comes from two verified sources: the price index (everyday and regular
// prices) and the holiday-offers registry (each offer verified by the
// operator on a stated date). Before the first offer is verified the page
// shows the prices a real deal has to beat, a countdown, a deal checker and
// the checks that separate a saving from a repackaged everyday price.

const SLUG = "black-friday-glp1-deals";
const PATH = `/weight-loss/${SLUG}`;
const CANONICAL = `https://www.treatmentshub.com${PATH}`;
const PUBLISHED = "2026-10-28";

const longDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const shortDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const todayIso = () => new Date().toISOString().slice(0, 10);
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const num = (s: string) => parseFloat(s.replace(/[^\d.]/g, ""));
const regOf = (note: string): number | null => {
  const m = note.replace(/,/g, "").match(/reg\.?\s*\$(\d+(?:\.\d+)?)/i);
  return m ? parseFloat(m[1]) : null;
};

const FAQS = (count: number, updated: string): { question: string; answer: string }[] => [
  {
    question: "When is Black Friday and Cyber Monday 2026?",
    answer: `Black Friday is Friday, ${longDate(HOLIDAY_SEASON.blackFriday)}, and Cyber Monday is Monday, ${longDate(HOLIDAY_SEASON.cyberMonday)}. Online GLP-1 providers usually start their promotions in the week before Black Friday and run them through Cyber Monday; the exact windows are on this page as each provider publishes one.`,
  },
  {
    question: "Do online GLP-1 providers run Black Friday deals?",
    answer: `Several run promotions all year, which is why the everyday prices in our index already include introductory rates at some providers. Whether a given provider publishes a separate Black Friday or Cyber Monday offer varies by year. We list ${count === 0 ? "each offer as we verify it on the provider's own site" : `the ${count} offer${count === 1 ? "" : "s"} we have verified`}, with the date; this page was last updated ${longDate(updated)}.`,
  },
  {
    question: "How do I know a Black Friday GLP-1 deal is real?",
    answer: "Compare the advertised price with the provider's published regular price, not with a competitor's price or a brand-name drug. Check whether it applies after month one, at every dose, and without a prepaid plan, and whether the consultation and shipping are included. Our deal checker does the arithmetic against the verified price index, and the checklist on this page covers the common catches.",
  },
  {
    question: "Should I wait for Black Friday to start GLP-1 treatment?",
    answer: "Not for medical reasons: starting is a decision for you and a prescriber, and a few weeks of delay for a discount on month one rarely changes the cost of a year. If you are already deciding between two providers, a verified offer can reasonably break the tie. Never change a dose, skip doses or stretch a vial to make a promotion last; the labels set the dosing and the prescriber adjusts it.",
  },
  {
    question: "Are compounded GLP-1 medications on sale FDA-approved?",
    answer: "No. Compounded semaglutide and tirzepatide are prepared by licensed compounding pharmacies under a prescription and are not FDA-approved products; the FDA does not review them for safety or effectiveness before sale. A discount does not change that, and the same prescribing, pharmacy and licensing checks apply at any price.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const count = HOLIDAY_OFFERS.length;
  const title = `Black Friday GLP-1 Deals ${HOLIDAY_SEASON.year}: Verified Offers by Provider`;
  const description = count
    ? `${count} verified Black Friday and Cyber Monday GLP-1 offer${count === 1 ? "" : "s"} from online semaglutide and tirzepatide providers, each dated, next to the regular price it must beat.`
    : `Every Black Friday and Cyber Monday GLP-1 offer from online semaglutide and tirzepatide providers, verified and dated, next to the regular price it must beat.`;
  return { title, description, alternates: { canonical: CANONICAL }, openGraph: { images: [DEFAULT_OG_IMAGE], title, description, url: CANONICAL, type: "article" } };
}

export default async function BlackFridayDealsPage() {
  const today = todayIso();
  const updated = latestVerified();
  const wl = await getConfig("weight-loss");
  const providerById = new Map(wl.providers.map((p) => [p.id, p]));
  const reviewSlugByProvider = new Map((wl.reviews ?? []).map((r) => [r.providerId, r.slug]));
  const reviewHref = (id: string) => (reviewSlugByProvider.get(id) ? `/weight-loss/reviews/${reviewSlugByProvider.get(id)}` : "/weight-loss/reviews");
  const nameOf = (id: string) => providerById.get(id)?.name ?? id;

  // Other verticals' providers, for offers filed under them.
  const verticalConfigs = new Map<HolidayVertical, Awaited<ReturnType<typeof getConfig>>>();
  verticalConfigs.set("weight-loss", wl);
  for (const v of new Set(HOLIDAY_OFFERS.map((o) => o.vertical))) if (!verticalConfigs.has(v)) verticalConfigs.set(v, await getConfig(v));
  const providerIn = (v: HolidayVertical, id: string) => verticalConfigs.get(v)?.providers.find((p) => p.id === id);
  const verticalLabel = (v: HolidayVertical) => VERTICALS.find((x) => x.id === v)?.name ?? v;

  const checkerRows: CheckerRow[] = PRICE_INDEX.map((r) => ({ providerId: r.providerId, name: nameOf(r.providerId), reviewHref: reviewHref(r.providerId), semaglutide: r.semaglutide, tirzepatide: r.tirzepatide }));
  const everydayPromos = PRICE_INDEX.filter((r) => /promo|off|discount|reg\./i.test(`${r.semaglutide?.note ?? ""} ${r.tirzepatide?.note ?? ""}`));
  const indexVerified = longDate(PRICE_INDEX_VERIFIED);
  const count = HOLIDAY_OFFERS.length;
  const live = HOLIDAY_OFFERS.filter((o) => offerStatus(o, today) === "live").length;
  const byVertical = [...new Set<HolidayVertical>(["weight-loss", ...HOLIDAY_OFFERS.map((o) => o.vertical)])].map((v) => ({ v, offers: HOLIDAY_OFFERS.filter((o) => o.vertical === v) }));
  const faqs = FAQS(count, updated);
  const title = `Black Friday & Cyber Monday GLP-1 Deals ${HOLIDAY_SEASON.year}: Every Verified Offer, by Provider`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: PUBLISHED,
    dateModified: updated,
    author: { "@type": "Organization", name: "Treatments Hub Team", url: "https://www.treatmentshub.com" },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: "https://www.treatmentshub.com" },
    mainEntityOfPage: medicalWebPageFields("weight-loss", CANONICAL, PATH),
  };
  const offersSchema = count
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${HOLIDAY_SEASON.label}: verified GLP-1 offers`,
        itemListElement: HOLIDAY_OFFERS.map((o, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Offer",
            name: `${providerIn(o.vertical, o.providerId)?.name ?? o.providerId}: ${o.headline}`,
            description: o.detail,
            seller: { "@type": "Organization", name: providerIn(o.vertical, o.providerId)?.name ?? o.providerId },
            ...(o.startsOn && { validFrom: o.startsOn }),
            ...(o.endsOn && { validThrough: o.endsOn }),
            ...(o.offerMonthly?.semaglutide && { price: String(o.offerMonthly.semaglutide), priceCurrency: "USD" }),
          },
        })),
      }
    : null;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.treatmentshub.com/weight-loss" },
      { "@type": "ListItem", position: 2, name: "Black Friday GLP-1 Deals", item: CANONICAL },
    ],
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

  const ext = "font-semibold text-[#0C4B75] hover:underline";
  const cell = "px-3 py-2.5 align-top text-[13.5px] [font-variant-numeric:tabular-nums]";
  const th = "px-3 py-2.5 text-left text-[11.5px] font-bold uppercase tracking-wide text-gray-500";
  const statusChip = (s: ReturnType<typeof offerStatus>) =>
    s === "live" ? "bg-emerald-100 text-emerald-800" : s === "upcoming" ? "bg-sky-100 text-sky-800" : s === "ended" ? "bg-gray-200 text-gray-600" : "bg-amber-100 text-amber-800";
  const statusLabel = (s: ReturnType<typeof offerStatus>) => (s === "live" ? "Live now" : s === "upcoming" ? "Starts soon" : s === "ended" ? "Ended" : "No end date published");

  const OfferCard = ({ o }: { o: HolidayOffer }) => {
    const p = providerIn(o.vertical, o.providerId);
    const s = offerStatus(o, today);
    const idx = PRICE_INDEX.find((r) => r.providerId === o.providerId);
    const gaps: string[] = [];
    if (o.vertical === "weight-loss" && idx && o.offerMonthly) {
      for (const m of ["semaglutide", "tirzepatide"] as const) {
        const off = o.offerMonthly[m];
        const c = idx[m];
        if (off && c) {
          const base = regOf(c.note) ?? num(c.price);
          const d = base - off;
          const lowest = Math.min(...PRICE_INDEX.map((r) => (r[m] ? num(r[m]!.price) : Infinity)));
          const lowestNote = off <= lowest ? ", the lowest in our index" : "";
          gaps.push(
            d > 0
              ? `${m}: ${usd(d)}/month below the ${regOf(c.note) ? "published regular" : "everyday listed"} price of ${usd(base)}${lowestNote}`
              : `${m}: the same ${usd(base)}/month as the everyday listed price${lowestNote}; the saving is against the regular rate, not the everyday one`,
          );
        }
      }
    }
    return (
      <li className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-wide text-gray-500">{p?.name ?? o.providerId}</p>
            <h3 className="mt-0.5 text-[18px] font-bold text-[#191919]">{o.headline}</h3>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold ${statusChip(s)}`}>{statusLabel(s)}</span>
        </div>
        <p className="mt-2 text-[14.5px] leading-relaxed text-gray-700">{o.detail}</p>
        {gaps.length > 0 && (
          <ul className="mt-2 text-[13.5px] text-gray-700">
            {gaps.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        )}
        <dl className="mt-3 grid gap-x-6 gap-y-1 text-[13px] text-gray-500 sm:grid-cols-2">
          {o.code && (
            <div><dt className="inline font-semibold text-gray-700">Code: </dt><dd className="inline font-mono text-[#191919]">{o.code}</dd></div>
          )}
          <div><dt className="inline font-semibold text-gray-700">Window: </dt><dd className="inline">{o.startsOn || o.endsOn ? `${o.startsOn ? shortDate(o.startsOn) : "not stated"} to ${o.endsOn ? shortDate(o.endsOn) : "not stated"}` : "not published by the provider"}</dd></div>
          <div><dt className="inline font-semibold text-gray-700">Verified: </dt><dd className="inline">{longDate(o.verifiedOn)}, {o.source}</dd></div>
        </dl>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {p && (
            <ProviderCta href={p.affiliateUrl} providerName={p.name} providerSlug={p.id} pageType="listing" sourceFlow="main_comparison" className="inline-flex items-center rounded-lg bg-[#0C4B75] px-4 py-2 text-[14px] font-bold text-white hover:bg-[#093d61]">
              See the offer at {p.name}
            </ProviderCta>
          )}
          <Link href={o.vertical === "weight-loss" ? reviewHref(o.providerId) : `/${o.vertical}/reviews/${o.providerId}`} className={`${ext} text-[14px]`}>Read our {p?.name ?? o.providerId} review</Link>
        </div>
      </li>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {offersSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[960px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/weight-loss" }, { label: "Black Friday GLP-1 Deals" }]} />
          <h1 className="max-w-[860px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">{title}</h1>
          <p className="mt-3 max-w-[760px] text-[16px] leading-relaxed text-gray-500">
            Every Black Friday and Cyber Monday offer from the online GLP-1 providers we review, added the day we verify it on
            the provider&rsquo;s own site and dated, next to the regular price it has to beat. No offer appears here until it
            is real, and nothing on this page is a price we estimated.
          </p>
          <LastUpdated date={updated} className="mt-4" />
          <MedicalReviewBar path={PATH} className="mt-4 max-w-[760px]" />
          <TrustDisclosure disclaimerHref="/weight-loss/disclaimer" />
        </div>
      </div>

      <div className="mx-auto max-w-[960px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        <div className="qa mb-10 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" strokeWidth={2} />
          <div className="text-[15px] leading-[1.75] text-gray-600">
            <h2 className="mb-2 text-[18px] font-bold text-[#191919]">The short answer</h2>
            <p>
              Black Friday is <strong className="text-[#191919]">{longDate(HOLIDAY_SEASON.blackFriday)}</strong> and Cyber Monday is{" "}
              <strong className="text-[#191919]">{longDate(HOLIDAY_SEASON.cyberMonday)}</strong>.{" "}
              {count === 0 ? (
                <>
                  As of {longDate(updated)}, <strong className="text-[#191919]">no provider in our index has published a Black Friday or Cyber Monday offer yet</strong>. Several already run year-round promotions, so the price a holiday deal has to beat is below, from our verified index. We add each offer the day we verify it.
                </>
              ) : (
                <>
                  We have verified <strong className="text-[#191919]">{count} offer{count === 1 ? "" : "s"}</strong>{live ? `, ${live} live today` : ""}, each dated and judged against the provider&rsquo;s regular price. The cards below carry the terms as the provider states them.
                </>
              )}{" "}
              A real deal is one that beats the provider&rsquo;s own published regular price after month one, at every dose, without a prepaid plan; the checker further down does that arithmetic for you.
            </p>
          </div>
        </div>

        <section className="mb-12" aria-labelledby="countdown-heading">
          <div className="mb-3 flex items-center gap-2">
            <CalendarClock className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 id="countdown-heading" className="text-[22px] font-bold text-[#191919]">Countdown</h2>
          </div>
          <HolidayCountdown targets={[{ label: "Black Friday", date: HOLIDAY_SEASON.blackFriday }, { label: "Cyber Monday", date: HOLIDAY_SEASON.cyberMonday }]} />
        </section>

        <section className="mb-12" aria-labelledby="offers-heading">
          <div className="mb-2 flex items-center gap-2">
            <Tag className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 id="offers-heading" className="text-[22px] font-bold text-[#191919]">Verified offers{count ? ` (${count})` : ""}</h2>
          </div>
          {count === 0 ? (
            <p className="mb-4 text-[15px] text-gray-500">Nothing verified yet. We add each offer the day we see it on the provider&rsquo;s own site.</p>
          ) : (
            <div className="mb-8 space-y-8">
              {byVertical.filter((g) => g.offers.length > 0).map((g) => (
                <div key={g.v}>
                  <h3 className="mb-3 text-[17px] font-bold text-[#191919]">{verticalLabel(g.v)}</h3>
                  <ul className="grid gap-4">
                    {g.offers.map((o) => (
                      <OfferCard key={`${o.vertical}-${o.providerId}-${o.headline}`} o={o} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          <h3 className="mb-2 text-[17px] font-bold text-[#191919]">Every provider in the index: the price to beat, and where we stand</h3>
          <p className="mb-4 text-[15px] text-gray-500">
            The everyday listed rate and, where the provider publishes one, the regular rate it reverts to, with the date we last checked the provider&rsquo;s site for a holiday offer. Prices verified {indexVerified}.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F7F8FA]">
                  <th className={th}>Provider</th>
                  <th className={th}>Semaglutide, everyday</th>
                  <th className={th}>Tirzepatide, everyday</th>
                  <th className={th}>Holiday offer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {PRICE_INDEX.map((r) => {
                  const offer = HOLIDAY_OFFERS.find((o) => o.vertical === "weight-loss" && o.providerId === r.providerId);
                  const check = latestCheck(r.providerId);
                  return (
                    <tr key={r.providerId}>
                      <td className={`${cell} font-semibold text-[#191919]`}><Link href={reviewHref(r.providerId)} className="hover:text-[#0C4B75] hover:underline">{nameOf(r.providerId)}</Link></td>
                      <td className={cell}>{r.semaglutide ? <><strong className="text-[#191919]">{r.semaglutide.price}</strong><span className="block text-[12px] text-gray-500">{r.semaglutide.note}</span></> : <span className="text-gray-400">Not published</span>}</td>
                      <td className={cell}>{r.tirzepatide ? <><strong className="text-[#191919]">{r.tirzepatide.price}</strong><span className="block text-[12px] text-gray-500">{r.tirzepatide.note}</span></> : <span className="text-gray-400">Not published</span>}</td>
                      <td className={cell}>
                        {offer ? (
                          <><span className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold ${statusChip(offerStatus(offer, today))}`}>Verified offer</span><span className="mt-1 block text-[12px] text-gray-500">{offer.headline}; verified {shortDate(offer.verifiedOn)}</span></>
                        ) : check ? (
                          <><span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11.5px] font-bold text-gray-600">None as of {shortDate(check.checkedOn)}</span><span className="mt-1 block text-[12px] text-gray-500">Checked {longDate(check.checkedOn)}: {check.found}.</span></>
                        ) : (
                          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11.5px] font-bold text-gray-600">Not checked yet</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="checker-heading">
          <div className="mb-2 flex items-center gap-2">
            <BadgePercent className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 id="checker-heading" className="text-[22px] font-bold text-[#191919]">Is it really a deal? Check any advertised price</h2>
          </div>
          <p className="mb-4 text-[15px] text-gray-500">
            Type the price a promotion advertises and the tool compares it with that provider&rsquo;s verified regular price over the months you would stay.
          </p>
          <DealChecker rows={checkerRows} verifiedOn={indexVerified} />
        </section>

        {everydayPromos.length > 0 && (
          <section className="mb-12" aria-labelledby="everyday-heading">
            <h2 id="everyday-heading" className="mb-2 text-[22px] font-bold text-[#191919]">The promotions already running, every day</h2>
            <p className="mb-4 text-[15px] text-gray-500">
              Some providers&rsquo; everyday prices are themselves promotions, with a higher regular price in the small print. A holiday offer at one of these is only a saving if it goes below the everyday rate, not just the regular one. From the index, verified {indexVerified}:
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {everydayPromos.map((r) => (
                <li key={r.providerId} className="rounded-xl border border-gray-200 bg-white p-4 text-[14px]">
                  <Link href={reviewHref(r.providerId)} className="font-bold text-[#191919] hover:text-[#0C4B75] hover:underline">{nameOf(r.providerId)}</Link>
                  <ul className="mt-1 text-gray-600">
                    {r.semaglutide && <li>Semaglutide {r.semaglutide.price}/mo, {r.semaglutide.note}</li>}
                    {r.tirzepatide && <li>Tirzepatide {r.tirzepatide.price}/mo, {r.tirzepatide.note}</li>}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-12" aria-labelledby="checks-heading">
          <h2 id="checks-heading" className="mb-3 text-[22px] font-bold text-[#191919]">How to tell a real GLP-1 Black Friday deal from a repackaged one</h2>
          <ol className="list-decimal space-y-3 pl-5 text-[15px] leading-[1.7] text-gray-700">
            <li><strong className="text-[#191919]">Compare with the provider&rsquo;s own regular price.</strong> "Save $200 versus brand-name Wegovy" is not a discount on anything the provider sells; the only number that matters is what the same provider charged last week. The index and the checker hold that number.</li>
            <li><strong className="text-[#191919]">Ask what happens in month two.</strong> Most introductory rates apply to the first month or the first order. A year on a plan is twelve months; a saving on one of them is a twelfth of a saving.</li>
            <li><strong className="text-[#191919]">Ask what happens at the next dose.</strong> Some providers charge more as the dose rises. An offer quoted at the starting dose can disappear the month the prescriber increases it. The providers whose price is flat at every dose are marked in the index.</li>
            <li><strong className="text-[#191919]">Read the plan length.</strong> The lowest monthly figures are often tied to a 12-month or prepaid plan, billed in full. That can be the right choice, but it is a commitment, not a sale, and it is what our <Link href="/weight-loss/glp1-cost-calculator" className={ext}>cost calculator</Link> totals as billed.</li>
            <li><strong className="text-[#191919]">Check what is included.</strong> The consultation, the clinician follow-ups, shipping and supplies are included at some providers and extra at others. A lower headline with a separate consultation fee can cost more.</li>
            <li><strong className="text-[#191919]">Know the refund and cancellation terms before the code.</strong> A promotion does not change a no-refund policy. The terms we verified for each provider are on its review page, with what its customers say about billing.</li>
            <li><strong className="text-[#191919]">Never change the dose for a deal.</strong> Stretching a vial, skipping weeks or buying a higher strength to split it is not a saving; it is dosing outside the label and the prescriber&rsquo;s plan. Our <Link href="/weight-loss/articles/glp1-microdosing-complete-guide" className={ext}>microdosing guide</Link> covers why.</li>
          </ol>
        </section>

        <section className="mb-12" aria-labelledby="plan-heading">
          <h2 id="plan-heading" className="mb-3 text-[22px] font-bold text-[#191919]">A short plan for the week</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-[14px] leading-relaxed text-gray-700">
              <p className="mb-1 text-[12px] font-bold uppercase tracking-wide text-[#0C4B75]">Before</p>
              Decide whether you qualify with the <Link href="/weight-loss/glp1-bmi-calculator" className={ext}>BMI and eligibility check</Link>, shortlist two or three providers from the <Link href="/weight-loss/how-to-choose-a-glp1-provider" className={ext}>provider guide</Link>, and note their everyday prices from the table above. A promotion only matters between providers you would already use.
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-[14px] leading-relaxed text-gray-700">
              <p className="mb-1 text-[12px] font-bold uppercase tracking-wide text-[#0C4B75]">On the day</p>
              Run each advertised price through the checker, read the window and the conditions on the provider&rsquo;s page, and confirm the consultation and shipping are in the price. Intake and clinician review still take their usual time; a code does not speed up a prescription.
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-[14px] leading-relaxed text-gray-700">
              <p className="mb-1 text-[12px] font-bold uppercase tracking-wide text-[#0C4B75]">After</p>
              Diary the date the promotional rate ends and what the price becomes, and check the first renewal charge against it. Our <Link href="/weight-loss/glp1-price-changes" className={ext}>price change log</Link> records every change we verify, including when holiday rates lapse.
            </div>
          </div>
        </section>

        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6" aria-labelledby="method-heading">
          <h2 id="method-heading" className="mb-3 text-[20px] font-bold text-[#191919]">How offers get onto this page</h2>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-gray-600">
            <li><strong className="text-[#191919]">Verified on the provider&rsquo;s own site.</strong> An offer is added only after we have seen it on the provider&rsquo;s page or in its own communication, on the date shown on the card. We do not add offers from press releases, coupon sites or other comparison pages.</li>
            <li><strong className="text-[#191919]">Judged against the index.</strong> The regular price an offer is compared with is the one in our <Link href="/weight-loss/glp1-weight-loss-statistics" className={ext}>verified price index</Link>, so "what you save" is always one verified figure minus another.</li>
            <li><strong className="text-[#191919]">Dated and windowed as stated.</strong> Start and end dates are the provider&rsquo;s. Where a provider publishes no end date, the card says so rather than guessing one.</li>
            <li><strong className="text-[#191919]">Removed when they end.</strong> Expired offers are marked ended and then removed after the season; the page stays at this address for next year.</li>
            <li><strong className="text-[#191919]">Commissions.</strong> We may earn a commission when you buy through a link here. It does not decide which offers are listed or how they are described; every offer we verify is listed, and the regular-price comparison is arithmetic.</li>
          </ul>
        </section>

        <section className="mb-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="mb-4 text-[22px] font-bold text-[#191919]">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.question}>
                <h3 className="mb-1 text-[17px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[15px] leading-[1.75] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <MedicalDisclaimer vertical="weight-loss" className="mb-8" />
        <GuideCluster currentSlug={SLUG} />
      </div>
    </div>
  );
}
