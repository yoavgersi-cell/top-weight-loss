"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Star } from "lucide-react";
import { ProviderCta } from "@/components/provider-cta";
import { trackEvent, trackOnce } from "@/lib/analytics";
import { captureClickId, withClickId } from "@/lib/click-id";

// ───── Native-traffic qualifier ─────
// Three taps replace the eleven-card ranking for paid (Taboola) visitors:
// each answer is a small commitment, and the result shows one match and one
// alternative instead of a table. Every price, note, shipping and commitment
// line is the verified price-index record passed in by the page - nothing
// here is written by the component.

export type FunnelProvider = {
  id: string;
  name: string;
  logo: string;
  affiliateUrl: string;
  edge: string;
  semaglutide: { price: string; note: string } | null;
  tirzepatide: { price: string; note: string } | null;
  shipping: string;
  commitment: string;
  trustpilot: { rating: string; count: string } | null;
};

type Med = "semaglutide" | "tirzepatide" | "unsure";
type Pay = "m2m" | "12mo" | "flat";
type Speed = "fast" | "ok";

const MED_OPTIONS: { value: Med; label: string; hint: string }[] = [
  { value: "semaglutide", label: "Semaglutide", hint: "The active ingredient in Ozempic and Wegovy" },
  { value: "tirzepatide", label: "Tirzepatide", hint: "The active ingredient in Mounjaro and Zepbound" },
  { value: "unsure", label: "Not sure yet", hint: "Show me both" },
];
const PAY_OPTIONS: { value: Pay; label: string; hint: string }[] = [
  { value: "m2m", label: "Month to month", hint: "Cancel anytime, no commitment" },
  { value: "12mo", label: "12-month plan", hint: "Lowest monthly price, longer commitment" },
  { value: "flat", label: "One flat price", hint: "Same price at every dose" },
];
const SPEED_OPTIONS: { value: Speed; label: string; hint: string }[] = [
  { value: "fast", label: "As fast as possible", hint: "1-2 day shipping matters to me" },
  { value: "ok", label: "A few days is fine", hint: "Price matters more than speed" },
];

// Providers whose own published copy states that no insurance is required
// (carried on their ranking cards); the line is shown only for these.
const NO_INSURANCE_STATED = new Set(["embody", "altrx", "directmeds"]);

// Answer → [lead, alternative]. The rule is the price index's own ordering:
// cheapest no-commitment price (embody), cheapest committed price (welludr),
// cheapest flat-at-every-dose price (altRx), and the 1-2 day flat-price
// option (DirectMeds) when speed is the deciding factor.
function pick(pay: Pay | null, speed: Speed | null): [string, string] {
  if (pay === "12mo") return ["wellmedr", "embody"];
  if (pay === "flat") return speed === "fast" ? ["directmeds", "altrx"] : ["altrx", "directmeds"];
  return ["embody", "altrx"];
}

function Stars({ rating }: { rating: string }) {
  const n = Math.round(parseFloat(rating));
  return (
    <span className="inline-flex gap-0.5 align-[-2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < n ? "fill-[#00B67A] text-[#00B67A]" : "fill-gray-200 text-gray-200"}`} strokeWidth={0} />
      ))}
    </span>
  );
}

function Option<T extends string>({
  o,
  selected,
  onPick,
}: {
  o: { value: T; label: string; hint: string };
  selected: boolean;
  onPick: (v: T) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPick(o.value)}
      className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left transition-colors ${
        selected ? "border-[#0C4B75] bg-[#F4F8FB]" : "border-gray-200 bg-white hover:border-[#0C4B75]/50"
      }`}
    >
      <span>
        <span className="block text-[16px] font-bold text-[#191919]">{o.label}</span>
        <span className="block text-[13px] text-gray-500">{o.hint}</span>
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-[#0C4B75]" strokeWidth={2.5} />
    </button>
  );
}

function PriceLine({ p, med }: { p: FunnelProvider; med: Med }) {
  const rows = (med === "unsure" ? (["semaglutide", "tirzepatide"] as const) : ([med] as const))
    .map((m) => (p[m] ? { m, ...p[m]! } : null))
    .filter(Boolean) as { m: "semaglutide" | "tirzepatide"; price: string; note: string }[];
  return (
    <div className="space-y-1">
      {rows.map((r) => (
        <p key={r.m} className="text-[15px] text-[#191919]">
          <span className="capitalize">{r.m}</span>{" "}
          <span className="text-[22px] font-extrabold tabular-nums">{r.price}</span>
          <span className="text-gray-500">/month</span>
          <span className="block text-[12.5px] text-gray-500">{r.note}</span>
        </p>
      ))}
    </div>
  );
}

export function NativeFunnel({ providers, verifiedOn }: { providers: FunnelProvider[]; verifiedOn: string }) {
  const [med, setMed] = useState<Med | null>(null);
  const [pay, setPay] = useState<Pay | null>(null);
  const [speed, setSpeed] = useState<Speed | null>(null);
  // Read once on the client; the server initializer returns null and nothing
  // that uses it renders before the visitor's first tap, so no hydration gap.
  const [click] = useState<{ id: string; source: string } | null>(() => captureClickId());

  const step = med === null ? 1 : pay === null ? 2 : speed === null ? 3 : 4;
  const byId = useMemo(() => new Map(providers.map((p) => [p.id, p])), [providers]);
  const [leadId, altId] = pick(pay, speed);
  const lead = byId.get(leadId);
  const alt = byId.get(altId);

  useEffect(() => {
    if (step === 4 && lead) trackEvent("CompleteMatch", { provider: lead.id, medication: med ?? "", pay: pay ?? "", speed: speed ?? "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const answer = <T extends string>(set: (v: T | null) => void, n: number) => (v: T) => {
    trackOnce("StartMatch");
    trackEvent("QuizStep", { step: n, value: v });
    set(v);
  };

  const cta = (p: FunnelProvider, position: number, className: string) => (
    <ProviderCta
      href={withClickId(p.affiliateUrl, click)}
      providerName={p.name}
      providerSlug={p.id}
      position={position}
      pageType="quiz_results"
      sourceFlow="matching_flow"
      className={className}
    >
      Check availability at {p.name}
      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
    </ProviderCta>
  );

  return (
    <section id="match" className="mx-auto max-w-[640px] px-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        {step < 4 && (
          <>
            <p className="text-[12px] font-bold uppercase tracking-wider text-[#0C4B75]">Question {step} of 3</p>
            <h2 className="mt-1.5 text-[20px] font-bold leading-snug text-[#191919] sm:text-[22px]">
              {step === 1 && "Which medication are you looking at?"}
              {step === 2 && "How do you want to pay?"}
              {step === 3 && "How fast do you need it?"}
            </h2>
            <div className="mt-4 space-y-2.5">
              {step === 1 && MED_OPTIONS.map((o) => <Option key={o.value} o={o} selected={med === o.value} onPick={answer<Med>(setMed, 1)} />)}
              {step === 2 && PAY_OPTIONS.map((o) => <Option key={o.value} o={o} selected={pay === o.value} onPick={answer<Pay>(setPay, 2)} />)}
              {step === 3 && SPEED_OPTIONS.map((o) => <Option key={o.value} o={o} selected={speed === o.value} onPick={answer<Speed>(setSpeed, 3)} />)}
            </div>
            <p className="mt-4 text-[12px] text-gray-400">No sign-up. Your answers only pick which verified provider we show first.</p>
          </>
        )}

        {step === 4 && lead && (
          <>
            <p className="text-[12px] font-bold uppercase tracking-wider text-emerald-700">Your match</p>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex h-[44px] w-[120px] shrink-0 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lead.logo} alt={`${lead.name} logo`} width={120} height={44} className="max-h-full max-w-full object-contain object-left" />
              </div>
              {lead.trustpilot && (
                <p className="text-[12.5px] text-gray-600">
                  <Stars rating={lead.trustpilot.rating} /> <strong className="text-[#191919]">{lead.trustpilot.rating}</strong> on Trustpilot
                  <span className="block text-gray-400">{lead.trustpilot.count} reviews</span>
                </p>
              )}
            </div>
            <p className="mt-3 text-[15px] font-semibold text-[#191919]">{lead.edge}</p>
            <div className="mt-3 rounded-xl bg-[#F4F8FB] p-4">
              <PriceLine p={lead} med={med ?? "unsure"} />
            </div>
            <ul className="mt-3 space-y-1.5 text-[14px] text-gray-700">
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} /><span>{lead.shipping}</span></li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} /><span>{lead.commitment}</span></li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} /><span>Online intake reviewed by a licensed US clinician{NO_INSURANCE_STATED.has(lead.id) ? "; no insurance required" : ""}</span></li>
            </ul>
            {cta(lead, 1, "mt-4 inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#0C4B75] px-6 text-[15.5px] font-bold text-white transition-colors hover:bg-[#093d61]")}
            <p className="mt-2 text-center text-[11.5px] text-gray-400">
              Prices verified on {lead.name}&rsquo;s site as of {verifiedOn}. Compounded medications are not FDA-approved.
            </p>

            {alt && (
              <div className="mt-5 rounded-xl border border-gray-200 p-4">
                <p className="text-[11.5px] font-bold uppercase tracking-wider text-gray-400">Also worth a look</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-bold text-[#191919]">{alt.name}</p>
                    <p className="text-[13px] text-gray-600">{alt.edge}</p>
                    <div className="mt-1.5 text-[13px] text-gray-700">
                      {(med === "tirzepatide" ? alt.tirzepatide : alt.semaglutide) && (
                        <span>
                          <span className="capitalize">{med === "tirzepatide" ? "tirzepatide" : "semaglutide"}</span>{" "}
                          <strong>{(med === "tirzepatide" ? alt.tirzepatide : alt.semaglutide)!.price}/mo</strong>
                          <span className="text-gray-500"> · {(med === "tirzepatide" ? alt.tirzepatide : alt.semaglutide)!.note}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {cta(alt, 2, "mt-3 inline-flex h-[42px] w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0C4B75] px-5 text-[14px] font-bold text-[#0C4B75] transition-colors hover:bg-[#F4F8FB]")}
              </div>
            )}

            <button
              type="button"
              onClick={() => { setMed(null); setPay(null); setSpeed(null); }}
              className="mt-4 text-[13px] font-medium text-gray-500 underline underline-offset-2 hover:text-[#0C4B75]"
            >
              Start over
            </button>
          </>
        )}
      </div>

      {/* Sticky phone CTA once a match exists */}
      {step === 4 && lead && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-3 backdrop-blur sm:hidden">
          {cta(lead, 1, "inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0C4B75] px-5 text-[15px] font-bold text-white")}
        </div>
      )}
    </section>
  );
}
