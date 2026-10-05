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
  /** One line of verified pricing for the verdict box, e.g. "$49/mo semaglutide · $89/mo tirzepatide". */
  priceLine: string;
  /** Optional secondary link for readers the caveat rules out. */
  alternative?: { text: string; href: string };
  capture?: { image: string; width: number; height: number; capturedAt: string; shows: string };
};

export const LEGIT_PAGES: Record<string, LegitPageData> = {
  "is-wellmedr-legit": {
    providerId: "wellmedr",
    checklist: [
      { ok: true, text: "A licensed provider reviews your medical intake before prescribing; approval is not automatic" },
      { ok: true, text: "Prescription required - there is no no-prescription route" },
      { ok: true, text: "Dispensed through a regulated US pharmacy (Reddit commenters independently name its Florida pharmacy)" },
      { ok: true, text: "Trustpilot 4.6 across 2,091 reviews, re-verified October 5, 2026" },
      { ok: true, text: "Weight-loss warranty, with its terms published on the provider's site" },
      { ok: false, text: "The $49 / $89 rates are tied to a 12-month plan, billed monthly; standard delivery is 3-5 business days" },
    ],
    priceLine: "$49/mo compounded semaglutide · $89/mo tirzepatide, the same price at every dose",
    alternative: { text: "Not sure about a 12-month plan? Compare the month-to-month alternative in embody vs wellmedr", href: "/embody-vs-wellmedr" },
    capture: {
      image: "/verification/wellmedr-pricing-2026-10-05.webp",
      width: 900,
      height: 325,
      capturedAt: "2026-10-05",
      shows: "tirzepatide monthly plan starting at $89 and semaglutide at $49, shipped every 4 weeks, same price regardless of dosage, cancel or change anytime",
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
