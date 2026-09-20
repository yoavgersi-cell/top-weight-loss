import { ProviderCta } from "@/components/provider-cta";
import { ArrowRight } from "lucide-react";

// ───── "How it works" showcase ─────
// A visual, provider-branded 3-step walkthrough for review pages, built from
// the provider's OWN how-it-works creative (operator-supplied screenshots,
// cropped per step - never generated, never paraphrased). Registry-gated: a
// provider renders this block only when an entry exists below; everyone else
// keeps the plain numbered list. Desktop: three cards side by side. Mobile: a
// CSS scroll-snap carousel (one card per swipe, no JS).
//
// To add a provider: drop its step images in /public/how-it-works/ and add an
// entry with the provider's own step copy, verbatim.

export type ShowcaseStep = {
  image: string;
  imageAlt: string;
  /** Title split so the accent phrase renders in brand blue, e.g. ["Start Your ", "Free 2-Minute Assessment"]. */
  title: [string, string] | [string, string, string];
  body: string;
};

export type HowItWorksShowcaseSpec = {
  /** The provider's own one-line framing shown next to the heading. */
  intro: string;
  steps: ShowcaseStep[];
  /** CTA label - the provider's own first-step wording. */
  ctaLabel: string;
};

export const HOW_IT_WORKS_SHOWCASE: Record<string, HowItWorksShowcaseSpec> = {
  altrx: {
    intro:
      "With altRx, getting started is simple: a guided consult, a personalized plan, and treatment delivered to your door with support built in at every step.",
    steps: [
      {
        image: "/how-it-works/altrx-step-1.webp",
        imageAlt: "A woman completing the altRx assessment on her phone",
        title: ["Start Your ", "Free 2-Minute Assessment"],
        body: "Complete our quick assessment to see if you qualify for prescription weight loss medication - no cost, no obligation.",
      },
      {
        image: "/how-it-works/altrx-step-2.webp",
        imageAlt: "The altRx app open on a phone",
        title: ["Get Your ", "Treatment Plan"],
        body: "If your provider determines that treatment is appropriate, you will receive a personalized care plan. Your provider may prescribe GLP-1 (Compounded Semaglutide) or GLP-1/GIP (Compounded Tirzepatide) as part of your plan based on your individual health profile.",
      },
      {
        image: "/how-it-works/altrx-step-3.webp",
        imageAlt: "A woman receiving an altRx delivery box at her door",
        title: ["", "Receive", " Your Medication"],
        body: "If prescribed, your medication ships directly to your door from a licensed pharmacy. Your care team provides ongoing support throughout your membership.",
      },
    ],
    ctaLabel: "Start Your Free 2-Minute Assessment",
  },
};

export function HowItWorksShowcase({
  spec,
  providerName,
  providerId,
  affiliateUrl,
}: {
  spec: HowItWorksShowcaseSpec;
  providerName: string;
  providerId: string;
  affiliateUrl: string;
}) {
  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Heading row: title left, the provider's own framing right */}
      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 pb-5 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:px-7">
        <h2 className="text-[24px] font-extrabold leading-tight text-[#0C4B75] sm:text-[30px]">
          How {providerName} works
        </h2>
        <p className="max-w-[460px] text-[14px] leading-[1.6] text-gray-600 sm:text-right sm:text-[14.5px]">
          {spec.intro}
        </p>
      </div>

      {/* Steps: 3-up grid on desktop, snap carousel on mobile */}
      <div className="px-5 pt-5 sm:px-7">
        <ol
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
          aria-label={`How ${providerName} works, in ${spec.steps.length} steps`}
        >
          {spec.steps.map((step, i) => (
            <li
              key={i}
              className="w-[84%] shrink-0 snap-center overflow-hidden rounded-xl border border-gray-200 bg-white sm:w-auto sm:shrink"
            >
              <div className="aspect-[4/3] w-full bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0C4B75]">Step {i + 1}</span>
                  <span className="h-px flex-1 bg-gray-200" />
                </div>
                <h3 className="text-[18px] font-extrabold leading-snug text-[#191919] sm:text-[19px]">
                  {step.title[0]}
                  <span className="text-[#0C4B75]">{step.title[1]}</span>
                  {step.title[2] ?? ""}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-gray-600">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        {/* Mobile hint - the dots aren't interactive, they just say "there's more" */}
        <div className="mt-1 flex items-center justify-center gap-1.5 sm:hidden" aria-hidden>
          {spec.steps.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full ${i === 0 ? "w-5 bg-[#0C4B75]" : "w-1.5 bg-gray-300"}`} />
          ))}
          <span className="ml-2 text-[11px] text-gray-400">swipe</span>
        </div>
      </div>

      {/* CTA - the provider's own first step, tracked like every other review CTA */}
      <div className="px-5 pb-6 pt-5 sm:px-7">
        <ProviderCta
          href={affiliateUrl}
          providerName={providerName}
          providerSlug={providerId}
          pageType="review"
          sourceFlow="provider_review"
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#0C4B75] px-6 text-[15px] font-bold text-white transition-colors hover:bg-[#093d61] sm:mx-auto sm:w-auto sm:min-w-[340px]"
        >
          {spec.ctaLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </ProviderCta>
        <p className="mt-2.5 text-center text-[12px] text-gray-400">
          Free assessment. A licensed provider decides whether treatment is appropriate.
        </p>
      </div>
    </section>
  );
}
