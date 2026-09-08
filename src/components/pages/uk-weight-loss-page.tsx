import { Check, Star, ArrowUpRight, ShieldCheck } from "lucide-react";
import { UK_WEIGHT_LOSS_SERVICES, type UkWeightLossService } from "@/data/uk-weight-loss";

// UK weight-loss SERVICE comparison (compliance-framed). Compares the providers
// as services - support model, process, delivery, programme pricing and verified
// Trustpilot reviews about the service experience. It deliberately contains NO
// prescription-medicine names, doses, "GLP-1"/"injection" terms, or efficacy
// claims (UK POM-advertising law). Rendered under /uk and kept noindex until
// published.

function ServiceCard({ s }: { s: UkWeightLossService }) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[20px] font-extrabold text-[#191919]">{s.name}</h2>
          <p className="mt-1 text-[14px] leading-relaxed text-gray-500">{s.tagline}</p>
        </div>
        {s.trustpilotRating && (
          <div className="flex shrink-0 flex-col items-end">
            <div className="flex items-center gap-1 text-[14px] font-bold text-[#191919]">
              <Star className="h-4 w-4 fill-[#00B67A] text-[#00B67A]" strokeWidth={0} />
              {s.trustpilotRating}
            </div>
            {s.trustpilotReviewCount && (
              <span className="mt-0.5 text-[11.5px] text-gray-400">{s.trustpilotReviewCount} on Trustpilot</span>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 rounded-xl bg-[#F3F9FD] p-4">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-[#0C4B75]">Service price</p>
        <p className="mt-1 text-[16px] font-bold text-[#191919]">{s.servicePrice}</p>
        {s.offer && <p className="mt-1 text-[13px] text-emerald-700">{s.offer}</p>}
      </div>

      <ul className="mt-4 space-y-2.5">
        {s.included.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[14px] leading-snug text-gray-800">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
            {f}
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-[13.5px]">
        {s.eligibility && (
          <div className="flex gap-2">
            <dt className="w-[80px] shrink-0 font-semibold text-gray-500">Eligibility</dt>
            <dd className="text-gray-800">{s.eligibility}</dd>
          </div>
        )}
        {s.delivery && (
          <div className="flex gap-2">
            <dt className="w-[80px] shrink-0 font-semibold text-gray-500">Delivery</dt>
            <dd className="text-gray-800">{s.delivery}</dd>
          </div>
        )}
      </dl>

      <div className="mt-5 flex-1" />
      <a
        href={s.affiliateUrl ?? s.siteUrl}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="inline-flex h-[46px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#0C4B75] text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
      >
        Visit {s.name}
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
      </a>

      {s.reviews && s.reviews.length > 0 && (
        <div className="mt-5 space-y-3">
          <p className="text-[12px] font-bold uppercase tracking-wide text-gray-400">What customers say about the service</p>
          {s.reviews.slice(0, 3).map((r) => (
            <div key={r.name} className="rounded-lg border border-gray-100 bg-gray-50/60 p-3">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[#00B67A] text-[#00B67A]" strokeWidth={0} />
                ))}
                <span className="ml-1 text-[12.5px] font-semibold text-[#191919]">{r.name}</span>
                <span className="text-[11px] text-gray-400">· {r.location}</span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-gray-600">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function UkWeightLossPage() {
  const services = UK_WEIGHT_LOSS_SERVICES;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1000px] px-4 pb-9 pt-10 sm:px-6 sm:pb-11 sm:pt-12">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0C4B75]">TreatmentsHub UK</p>
          <h1 className="mt-3 max-w-[720px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">
            Compare UK weight-loss services
          </h1>
          <p className="mt-3 max-w-[680px] text-[15.5px] leading-relaxed text-gray-500">
            An independent look at UK weight-loss services - compared on how you&rsquo;re
            supported, the process and delivery, programme pricing, and verified customer
            reviews. Any treatment and eligibility is decided by a licensed clinician.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 text-[13px] leading-relaxed text-gray-500 sm:p-6">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0C4B75]" strokeWidth={2} />
          <p>
            Prices and programme details are the providers&rsquo; published rates at the time of
            writing and can change - confirm current details on their website. Eligibility and any
            treatment are assessed and decided by a licensed clinician. This page compares services
            to help you choose and is not medical advice. Trustpilot ratings and review counts shown
            are the providers&rsquo; live records at our last check.
          </p>
        </div>
      </div>
    </div>
  );
}
