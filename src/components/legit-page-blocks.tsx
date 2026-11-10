import Link from "next/link";
import { ArrowUpRight, Check, AlertTriangle } from "lucide-react";
import { ProviderCta } from "@/components/provider-cta";
import type { Provider } from "@/lib/config";

// ───── Blocks for "is <brand> legit?" articles ─────
// Code-rendered trust and conversion blocks for the brand legitimacy pages:
// a scannable legitimacy checklist under the quick answer, a verdict CTA at
// the end, and a dated capture of the provider's own pricing page. Every line
// is operator-verified; pages without an entry here render nothing extra.

export type LegitChecklistItem = { ok: boolean; text: string };

export type LegitPageData = {
  providerId: string;
  checklist: LegitChecklistItem[];
  /** One line of verified pricing for the verdict box, e.g. "$41/mo semaglutide · $71/mo tirzepatide". */
  priceLine: string;
  /** Optional secondary link for readers the caveat rules out. */
  alternative?: { text: string; href: string };
  capture?: { image: string; width: number; height: number; capturedAt: string; shows: string };
  /** "A peek at the provider's own site": dated crops of its public pages,
   *  each with what it shows (the provider's words) and our note on it. */
  peek?: { capturedAt: string; shots: PeekShot[] };
};

export type PeekShot = {
  image: string;
  width: number;
  height: number;
  /** Which part of the site, e.g. "Plan picker". */
  label: string;
  /** What the crop shows, in the provider's own words (quoted where exact). */
  shows: string;
  /** Our reading of it: what it means for the reader, including caveats. */
  note: string;
  /** The important crop is shown full width. */
  wide?: boolean;
};

export const LEGIT_PAGES: Record<string, LegitPageData> = {
  "is-wellmedr-legit": {
    providerId: "wellmedr",
    checklist: [
      { ok: true, text: "A licensed provider reviews your medical intake before prescribing; approval is not automatic" },
      { ok: true, text: "Prescription required - there is no no-prescription route" },
      { ok: true, text: "Dispensed through a regulated US pharmacy (Reddit commenters independently name its Florida pharmacy)" },
      { ok: true, text: "Trustpilot 4.6 across 2,679 reviews, re-verified October 25, 2026" },
      { ok: true, text: "Weight-loss warranty, with its terms published on the provider's site" },
      { ok: false, text: "The $41 / $71 rates are tied to a 12-month plan, billed monthly; standard delivery is 3-5 business days" },
    ],
    priceLine: "$41/mo compounded semaglutide · $71/mo tirzepatide, the same price at every dose",
    alternative: { text: "Not sure about a 12-month plan? Compare the month-to-month alternative in embody vs welludr", href: "/embody-vs-wellmedr" },
    capture: {
      image: "/verification/wellmedr-pricing-2026-10-05.webp",
      width: 900,
      height: 325,
      capturedAt: "2026-10-05",
      shows: "tirzepatide monthly plan starting at $89 and semaglutide at $49, shipped every 4 weeks, same price regardless of dosage, cancel or change anytime",
    },
    // Operator-supplied screenshots of welludr.com, Nov 10, 2026 (desktop).
    peek: {
      capturedAt: "2026-11-10",
      shots: [
        {
          image: "/verification/welludr-site-2026-11-10/choose-your-plan.webp",
          width: 1200,
          height: 1229,
          label: "Plan picker",
          wide: true,
          shows:
            "Two plans. Tirzepatide, \"Most Powerful Option\", monthly plan starting at $71 a month, shipped every 4 weeks, same price regardless of dosage, cancel or change anytime. Semaglutide, \"Proven & Steady\", starting at $41 a month, provider reviews your intake, dosing adjusted as your body responds. Both carry a \"Recommended for most patients\" badge.",
          note:
            "The $41 and $71 match the prices we verified. \"Starting at\" is the phrase to read carefully: when we last checked, those rates came with a 12-month plan billed monthly, so confirm the plan term on the checkout screen before you pay. A badge that recommends both medicines for most patients is marketing; the clinician who reviews your intake decides which, if either, is right for you.",
        },
        {
          image: "/verification/welludr-site-2026-11-10/why-people-choose.webp",
          width: 1200,
          height: 665,
          label: "What is included",
          shows:
            "Three \"Included\" cards: unlimited messaging with licensed clinicians (same-day appointments, US-based clinicians, guidance on dosing and tolerance), real-time access to the care platform (progress tracking, \"AI-enhanced weight-loss support\"), and on-time refills (discreet delivery, refills shipped before you run out).",
          note:
            "Clinician messaging and dose guidance being part of the price rather than paid add-ons is a genuine plus. \"AI-enhanced support\" describes the app; a licensed clinician still makes every prescribing decision, and the site says so on the next screen.",
        },
        {
          image: "/verification/welludr-site-2026-11-10/what-happens-next-1-2.webp",
          width: 1200,
          height: 766,
          label: "How it works, steps 1 and 2",
          shows:
            "\"Activate your weight loss plan instantly\": same-day slots, takes about 15 minutes. \"Clinician builds your program\": intake reviewed by a licensed clinician, personalised treatment plan created.",
          note:
            "This is the process we describe above, and it is one of the markers we check for: a clinician reviews your intake before anything is prescribed. The vial in the picture is the compounded tirzepatide, labelled Rx only.",
        },
        {
          image: "/verification/welludr-site-2026-11-10/what-happens-next-3-4.webp",
          width: 1200,
          height: 778,
          label: "How it works, steps 3 and 4",
          shows:
            "\"Medication delivered right to your doorstep\": discreet, \"guaranteed\" delivery, no pharmacy visits. \"On-time refills guaranteed\": refills arrive before you run out.",
          note:
            "Shipping is the most common complaint in the reviews we captured, so read \"guaranteed\" as the goal rather than a promise. The provider lists standard delivery at 3-5 business days; order your refill with that in mind.",
        },
        {
          image: "/verification/welludr-site-2026-11-10/we-deliver-real-results.webp",
          width: 1200,
          height: 685,
          label: "Results claims",
          shows:
            "\"We deliver real results\": GLP-1 therapies \"shown in clinical studies to produce significant early weight loss\", \"meaningful results within the first 90 days\", and trial patients who \"often achieve double-digit weight loss within their first few months\".",
          note:
            "These are statements about GLP-1 medicines in general, not results from welludr\u2019s own patients. The trial figures behind them come from brand-name medicines at full dose over 68 to 72 weeks, and individual results vary widely: one Reddit account above reports a single pound in eight weeks. Treat the 90-day line as what the drugs can do, not as something the provider measures or promises.",
        },
      ],
    },
  },
};

function dateLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

const ctaClass =
  "inline-flex h-[46px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#0C4B75] px-6 text-[14.5px] font-bold text-white transition-colors hover:bg-[#093d61]";

export function LegitChecklist({ data, provider, linkPrefix = "" }: { data: LegitPageData; provider: Provider; linkPrefix?: string }) {
  return (
    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">Legitimacy checklist</p>
      <p className="mt-1 text-[14px] text-gray-600">What we could verify about {provider.name}, and the one thing to understand before you buy.</p>
      <ul className="mt-4 space-y-2.5">
        {data.checklist.map((item) => (
          <li key={item.text} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-800">
            {item.ok ? (
              <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
            ) : (
              <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-amber-500" strokeWidth={2.25} />
            )}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13.5px] text-gray-600">{data.priceLine}</p>
        <div className="flex items-center gap-4">
          <Link href={`${linkPrefix}/reviews/${provider.id}`} className="text-[13px] font-semibold text-[#0C4B75] hover:underline">
            Full review
          </Link>
          <ProviderCta
            href={provider.affiliateUrl}
            providerName={provider.name}
            providerSlug={provider.id}
            position={1}
            pageType="listing"
            sourceFlow="main_comparison"
            className={`${ctaClass} h-[42px] px-5 text-[13.5px]`}
          >
            Check eligibility at {provider.name}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </ProviderCta>
        </div>
      </div>
    </div>
  );
}

export function LegitVerdictCta({ data, provider, linkPrefix = "" }: { data: LegitPageData; provider: Provider; linkPrefix?: string }) {
  return (
    <div className="my-8 rounded-xl border border-[#0C4B75]/15 bg-[#F4F8FB] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
      <div>
        <p className="text-[15px] font-bold text-[#191919]">Our verdict: {provider.name} is legit by every marker we can check</p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-gray-600">
          {data.priceLine}.
          {data.alternative && (
            <>
              {" "}
              <Link href={`${linkPrefix}${data.alternative.href}`} className="font-semibold text-[#0C4B75] hover:underline">
                {data.alternative.text} →
              </Link>
            </>
          )}
        </p>
      </div>
      <ProviderCta
        href={provider.affiliateUrl}
        providerName={provider.name}
        providerSlug={provider.id}
        position={1}
        pageType="listing"
        sourceFlow="main_comparison"
        className={`${ctaClass} mt-4 w-full shrink-0 sm:mt-0 sm:w-auto`}
      >
        Check eligibility at {provider.name}
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
      </ProviderCta>
    </div>
  );
}

export function PricingCapture({ data, provider }: { data: LegitPageData; provider: Provider }) {
  const c = data.capture;
  if (!c) return null;
  const when = dateLabel(c.capturedAt);
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">Price verified {when}</p>
        <p className="mt-0.5 text-[13.5px] text-gray-600">
          A crop of {provider.name}&rsquo;s own pricing page as it read that day. Prices and promotions change; the provider&rsquo;s site is the final word.
        </p>
      </div>
      <a href={c.image} target="_blank" rel="noopener noreferrer" title="Open the full-size capture" className="block bg-[#F7F8FA] p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={c.image}
          alt={`${provider.name} pricing page, captured ${when}: ${c.shows}`}
          width={c.width}
          height={c.height}
          loading="lazy"
          className="mx-auto max-h-[360px] w-auto max-w-full rounded-lg border border-gray-200 bg-white object-contain"
        />
      </a>
      <figcaption className="px-5 py-3 text-[12.5px] leading-snug text-gray-500">Pricing page showed {c.shows}.</figcaption>
    </figure>
  );
}

// ───── A peek at the provider's own site ─────
// Dated crops of the provider's public pages with, under each, what it shows
// in the provider's own words and our note on it. Readers see what they will
// be sold before they click through; nothing here is our claim.
export function ProviderPeek({ data, provider }: { data: LegitPageData; provider: Provider }) {
  const peek = data.peek;
  if (!peek || peek.shots.length === 0) return null;
  const when = dateLabel(peek.capturedAt);
  const wide = peek.shots.filter((s) => s.wide);
  const rest = peek.shots.filter((s) => !s.wide);
  const Shot = ({ s }: { s: PeekShot }) => (
    <figure
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white ${
        s.wide ? "sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : "flex flex-col"
      }`}
    >
      <a
        href={s.image}
        target="_blank"
        rel="noopener noreferrer"
        title="Open the full-size capture"
        className={`block bg-[#F7F8FA] p-2.5 ${s.wide ? "sm:border-r sm:border-gray-200" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.image}
          alt={`${provider.name} website, ${s.label.toLowerCase()}, captured ${when}: ${s.shows}`}
          width={s.width}
          height={s.height}
          loading="lazy"
          decoding="async"
          className="mx-auto h-auto w-full rounded-lg border border-gray-200 bg-white object-contain"
        />
      </a>
      <figcaption className={`flex flex-col gap-2 px-4 py-3.5 ${s.wide ? "sm:justify-center sm:px-5" : "flex-1"}`}>
        <p className="text-[11.5px] font-bold uppercase tracking-wider text-gray-400">{s.label}</p>
        <p className="text-[13.5px] leading-relaxed text-gray-700">
          <span className="font-semibold text-[#191919]">The page says: </span>
          {s.shows}
        </p>
        <p className="rounded-lg bg-[#0C4B75]/[0.04] px-3 py-2 text-[13.5px] leading-relaxed text-gray-800">
          <span className="font-semibold text-[#0C4B75]">Our note: </span>
          {s.note}
        </p>
      </figcaption>
    </figure>
  );
  return (
    <section className="my-10" aria-labelledby="provider-peek-heading">
      <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">A peek at the provider&rsquo;s own site</p>
      <h2 id="provider-peek-heading" className="mt-1 text-[20px] font-bold text-[#191919]">
        What {provider.name}&rsquo;s website shows
      </h2>
      <p className="mt-1.5 max-w-[760px] text-[14px] leading-relaxed text-gray-600">
        Crops of {provider.name}&rsquo;s homepage as it read on {when}, so you can see what you will be sold before you click through. The
        wording under each picture is the provider&rsquo;s; the note is ours. Pages change, and the provider&rsquo;s site is the final word.
      </p>
      <div className="mt-5 space-y-5">
        {wide.map((s) => (
          <Shot key={s.image} s={s} />
        ))}
        {rest.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            {rest.map((s) => (
              <Shot key={s.image} s={s} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
