"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Loader2, Star } from "lucide-react";
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

// Answer → [lead, runner-up]. Only the lead is rendered; the runner-up is
// kept so the rule stays readable and a second card can return if wanted. The rule is the price index's own ordering:
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

  const answered = med !== null && pay !== null && speed !== null;
  // A short "finding your match" beat after the third tap, so the result
  // reads as computed from the answers rather than pre-loaded. The timer
  // only runs once per completed set of answers; "Start over" resets it.
  const [matching, setMatching] = useState(false);
  const [matchTick, setMatchTick] = useState(0);
  useEffect(() => {
    if (!answered) return;
    const steps = setInterval(() => setMatchTick((n) => n + 1), 450);
    const done = setTimeout(() => setMatching(false), 1500);
    return () => {
      clearInterval(steps);
      clearTimeout(done);
    };
  }, [answered]);
  const step = !answered ? (med === null ? 1 : pay === null ? 2 : 3) : matching ? 3.5 : 4;
  const byId = useMemo(() => new Map(providers.map((p) => [p.id, p])), [providers]);
  // One result only (operator decision, Oct 20, 2026): the alternative card
  // was removed so the page ends in a single provider and a single button.
  const [leadId] = pick(pay, speed);
  const lead = byId.get(leadId);

  useEffect(() => {
    if (step === 4 && lead) trackEvent("CompleteMatch", { provider: lead.id, medication: med ?? "", pay: pay ?? "", speed: speed ?? "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const answer = <T extends string>(set: (v: T | null) => void, n: number) => (v: T) => {
    trackOnce("StartMatch");
    trackEvent("QuizStep", { step: n, value: v });
    if (n === 3) {
      setMatching(true);
      setMatchTick(0);
    }
    set(v);
  };
  const MATCHING_STEPS = ["Checking verified prices", "Comparing shipping and commitment", "Matching your answers"];

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
        {(step === 1 || step === 2 || step === 3) && (
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

        {step === 3.5 && (
          <div className="py-6 text-center" role="status" aria-live="polite">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#0C4B75]" strokeWidth={2} />
            <p className="mt-4 text-[17px] font-bold text-[#191919]">Finding your match</p>
            <ul className="mx-auto mt-3 max-w-[300px] space-y-1.5 text-left text-[14px] text-gray-600">
              {MATCHING_STEPS.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  {i < matchTick ? (
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  ) : (
                    <span className={`h-4 w-4 shrink-0 rounded-full border-2 ${i === matchTick ? "border-[#0C4B75]" : "border-gray-200"}`} />
                  )}
                  <span className={i <= matchTick ? "text-[#191919]" : ""}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 4 && lead && (
          <>
            {/* Header: badge row, then the logo on its own line, then the
                verdict line and a single-line Trustpilot record. Keeps the
                logo and the rating from fighting for the same row on phones. */}
            <div className="flex items-center justify-between gap-3">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-wider text-emerald-700">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                Your match
              </p>
              {lead.trustpilot && (
                <p className="flex items-center gap-1.5 whitespace-nowrap text-[12.5px] text-gray-600">
                  <Stars rating={lead.trustpilot.rating} />
                  <strong className="text-[#191919]">{lead.trustpilot.rating}</strong>
                  <span className="text-gray-400">({lead.trustpilot.count})</span>
                </p>
              )}
            </div>
            <div className="mt-4 flex h-[48px] items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lead.logo} alt={`${lead.name} logo`} width={160} height={48} className="max-h-[48px] max-w-[170px] object-contain object-left" />
            </div>
            <p className="mt-2 text-[16px] font-bold leading-snug text-[#191919]">{lead.edge}</p>
            {lead.trustpilot && (
              <p className="mt-1 text-[12.5px] text-gray-500">
                Rated {lead.trustpilot.rating} across {lead.trustpilot.count} Trustpilot reviews
              </p>
            )}
            <div className="mt-3 rounded-xl bg-[#F4F8FB] p-4">
              <PriceLine p={lead} med={med ?? "unsure"} />
            </div>
            <ul className="mt-3 space-y-1.5 text-[14px] text-gray-700">
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} /><span>{lead.shipping}</span></li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} /><span>{lead.commitment.replace(/^None - /, "No commitment: ")}</span></li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} /><span>Online intake reviewed by a licensed US clinician{NO_INSURANCE_STATED.has(lead.id) ? "; no insurance required" : ""}</span></li>
            </ul>
            {cta(lead, 1, "mt-4 inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#0C4B75] px-6 text-[15.5px] font-bold text-white transition-colors hover:bg-[#093d61]")}
            <p className="mt-2 text-center text-[11.5px] text-gray-400">
              Prices verified on {lead.name}&rsquo;s site as of {verifiedOn}. Compounded medications are not FDA-approved.
            </p>

            <button
              type="button"
              onClick={() => { setMed(null); setPay(null); setSpeed(null); setMatching(false); }}
              className="mt-4 text-[13px] font-medium text-gray-500 underline underline-offset-2 hover:text-[#0C4B75]"
            >
              Start over
            </button>
          </>
        )}
      </div>

    </section>
  );
}
