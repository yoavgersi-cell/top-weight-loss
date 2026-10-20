"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Loader2, Star } from "lucide-react";
import { ProviderCta } from "@/components/provider-cta";
import { trackEvent, trackOnce } from "@/lib/analytics";
import { captureClickId, withClickId } from "@/lib/click-id";

// ───── Native-traffic qualifier ─────
// Four taps replace the eleven-card ranking for paid (Taboola) visitors:
// each answer is a small commitment, and the result shows one provider. The
// page offers two providers (operator decision, Oct 20, 2026): embody and
// Eden. Every price, note and fact line is passed in by the page from the
// verified records - nothing here is written by the component.

export type FunnelProvider = {
  id: string;
  name: string;
  logo: string;
  affiliateUrl: string;
  edge: string;
  semaglutide: { price: string; note: string } | null;
  tirzepatide: { price: string; note: string } | null;
  /** Three verified fact lines shown under the price. */
  facts: string[];
  trustpilot: { rating: string; count: string } | null;
};

type Experience = "first" | "switching" | "unsure";
type Med = "semaglutide" | "tirzepatide" | "unsure";
type Priority = "price" | "shipping" | "support";
type Contact = "portal" | "human" | "either";

// Question one. It never changes the provider (neither has a verified
// "better for switchers" fact); it changes one advice line on the result and
// is recorded in the quiz events so the operator learns who is clicking.
const EXPERIENCE_OPTIONS: { value: Experience; label: string; hint: string }[] = [
  { value: "first", label: "This would be my first time", hint: "I have not used a GLP-1 before" },
  { value: "switching", label: "I am switching from another provider", hint: "Already on semaglutide or tirzepatide" },
  { value: "unsure", label: "Not sure yet", hint: "Just looking at my options" },
];
const MED_OPTIONS: { value: Med; label: string; hint: string }[] = [
  { value: "semaglutide", label: "Semaglutide", hint: "The active ingredient in Ozempic and Wegovy" },
  { value: "tirzepatide", label: "Tirzepatide", hint: "The active ingredient in Mounjaro and Zepbound" },
  { value: "unsure", label: "Not sure yet", hint: "Show me both" },
];
const PRIORITY_OPTIONS: { value: Priority; label: string; hint: string }[] = [
  { value: "price", label: "The lowest monthly price", hint: "Same medication, least money each month" },
  { value: "shipping", label: "The fastest delivery", hint: "At my door in a day or two" },
  { value: "support", label: "Support I can reach any time", hint: "A person to talk to, around the clock" },
];
const CONTACT_OPTIONS: { value: Contact; label: string; hint: string }[] = [
  { value: "portal", label: "Messaging through a patient portal is fine", hint: "I mostly want the medication handled well" },
  { value: "human", label: "I want 24/7 human support included", hint: "Questions answered by a person, any hour" },
  { value: "either", label: "No strong preference", hint: "Pick what fits my other answers" },
];

// Answer → provider. Each answer is a vote for the provider whose verified
// record matches it: embody for price (cheapest no-commitment price we track)
// and shipping (1-2 days); Eden for support (24/7 human support included).
// Ties and "no preference" go to embody, the page's default.
function pick(priority: Priority | null, contact: Contact | null): string {
  let eden = 0;
  let embody = 0;
  if (priority === "support") eden++;
  if (priority === "price" || priority === "shipping") embody++;
  if (contact === "human") eden++;
  if (contact === "portal") embody++;
  return eden > embody ? "eden" : "embody";
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

const MATCHING_STEPS = ["Checking verified prices", "Comparing support and delivery", "Matching your answers"];

// One line of advice on the result, chosen by question one. Each line is a
// fact the provider publishes (embody: full refund if not approved; Eden:
// free 3-minute assessment) or general guidance that names no provider.
function adviceFor(exp: Experience | null, providerId: string): string | null {
  if (exp === "first") {
    if (providerId === "embody") return "First time? embody refunds you in full if a clinician does not approve you, so there is no cost to finding out.";
    if (providerId === "eden") return "First time? Eden's online assessment is free and takes about 3 minutes, before you pay anything.";
  }
  if (exp === "switching") return "Switching? Have your current dose and your pharmacy's name ready for the intake - the clinician decides whether to continue it.";
  return null;
}

export function NativeFunnel({ providers, verifiedOn }: { providers: FunnelProvider[]; verifiedOn: string }) {
  const [exp, setExp] = useState<Experience | null>(null);
  const [med, setMed] = useState<Med | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  // Read once on the client; the server initializer returns null and nothing
  // that uses it renders before the visitor's first tap, so no hydration gap.
  const [click] = useState<{ id: string; source: string } | null>(() => captureClickId());

  const answered = exp !== null && med !== null && priority !== null && contact !== null;
  // A short "finding your match" beat after the third tap, so the result
  // reads as computed from the answers rather than pre-loaded.
  const [matching, setMatching] = useState(false);
  const [matchTick, setMatchTick] = useState(0);
  useEffect(() => {
    if (!answered) return;
    // 2.2 seconds, three steps ticking at 650ms: long enough to read, short
    // enough not to feel like waiting (operator: "a bit slower, not much").
    const steps = setInterval(() => setMatchTick((n) => n + 1), 650);
    const done = setTimeout(() => setMatching(false), 2200);
    return () => {
      clearInterval(steps);
      clearTimeout(done);
    };
  }, [answered]);
  const step = !answered ? (exp === null ? 1 : med === null ? 2 : priority === null ? 3 : 4) : matching ? 4.5 : 5;

  const byId = useMemo(() => new Map(providers.map((p) => [p.id, p])), [providers]);
  const lead = byId.get(pick(priority, contact)) ?? providers[0];

  useEffect(() => {
    if (step === 5 && lead) trackEvent("CompleteMatch", { provider: lead.id, experience: exp ?? "", medication: med ?? "", priority: priority ?? "", contact: contact ?? "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const answer = <T extends string>(set: (v: T | null) => void, n: number) => (v: T) => {
    trackOnce("StartMatch");
    trackEvent("QuizStep", { step: n, value: v });
    if (n === 4) {
      setMatching(true);
      setMatchTick(0);
    }
    set(v);
  };

  const cta = (p: FunnelProvider, className: string) => (
    <ProviderCta
      href={withClickId(p.affiliateUrl, click)}
      providerName={p.name}
      providerSlug={p.id}
      position={1}
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
        {(step === 1 || step === 2 || step === 3 || step === 4) && (
          <>
            <p className="text-[12px] font-bold uppercase tracking-wider text-[#0C4B75]">Question {step} of 4</p>
            <h2 className="mt-1.5 text-[20px] font-bold leading-snug text-[#191919] sm:text-[22px]">
              {step === 1 && "Have you used a GLP-1 medication before?"}
              {step === 2 && "Which medication are you looking at?"}
              {step === 3 && "What matters most to you?"}
              {step === 4 && "How do you want to reach your care team?"}
            </h2>
            <div className="mt-4 space-y-2.5">
              {step === 1 && EXPERIENCE_OPTIONS.map((o) => <Option key={o.value} o={o} selected={exp === o.value} onPick={answer<Experience>(setExp, 1)} />)}
              {step === 2 && MED_OPTIONS.map((o) => <Option key={o.value} o={o} selected={med === o.value} onPick={answer<Med>(setMed, 2)} />)}
              {step === 3 && PRIORITY_OPTIONS.map((o) => <Option key={o.value} o={o} selected={priority === o.value} onPick={answer<Priority>(setPriority, 3)} />)}
              {step === 4 && CONTACT_OPTIONS.map((o) => <Option key={o.value} o={o} selected={contact === o.value} onPick={answer<Contact>(setContact, 4)} />)}
            </div>
            <p className="mt-4 text-[12px] text-gray-400">No sign-up. Your answers only pick which verified provider we show.</p>
          </>
        )}

        {step === 4.5 && (
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

        {step === 5 && lead && (
          <>
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
              {lead.facts.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {adviceFor(exp, lead.id) && (
              <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-[13px] leading-relaxed text-amber-900">{adviceFor(exp, lead.id)}</p>
            )}
            {cta(lead, "mt-4 inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#0C4B75] px-6 text-[15.5px] font-bold text-white transition-colors hover:bg-[#093d61]")}
            <p className="mt-2 text-center text-[11.5px] text-gray-400">
              Prices verified on {lead.name}&rsquo;s site as of {verifiedOn}. Compounded medications are not FDA-approved.
            </p>
            <button
              type="button"
              onClick={() => { setExp(null); setMed(null); setPriority(null); setContact(null); setMatching(false); }}
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
