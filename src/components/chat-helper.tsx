"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, RotateCcw, Star, X } from "lucide-react";
import { ProviderCta } from "./provider-cta";
import { trackEvent } from "@/lib/analytics";
import { useNavPrefix } from "@/lib/nav-prefix";
import { CHATBOT_NAME, CHAT_FLOWS, type ChatFlow, type ChatMatch, type ChatOption } from "@/lib/chatbot";

// ───── Chat helper ─────
// A small, friendly guide in the corner: a smiling launcher bubble that opens
// a chat-style panel. One question at a time, tap-to-answer chips, and a
// provider match at the end with verified prices (see src/lib/chatbot.ts).
//   Mobile: a bottom sheet (85% of the screen), scroll-locked page behind.
//   Desktop: a 384px card above the launcher, page stays usable.
// Quiet by design: a single teaser bubble once per session after a few
// seconds, dismissible; nothing opens by itself. Sits above the review
// pages' sticky CTA (z-30) and below promo modals (z-70).

const NOT_WEIGHT_LOSS = new Set(["hub", "reviewers", "medical-review-policy", "uk"]);
// Pages that already are a matching flow.
const EXCLUDED_FIRST = new Set(["find-your-match", "find-your-match-weight-loss"]);
const TEASER_KEY = "chatHelperTeaserSeen";

type MsgBody =
  | { from: "bot" | "user"; text: string }
  | { from: "match"; matchId: string; med: string }
  | { from: "tip"; text: string; href?: string; linkLabel?: string };
type Msg = MsgBody & { id: number };

// ── The mascot: a round, smiling face with a little sprout ──
export function HelperFace({ className = "" }: { className?: string }) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`pip-g-${gid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2E93CF" />
          <stop offset="1" stopColor="#0C4B75" />
        </linearGradient>
      </defs>
      <path d="M32 13c0-5 4-8.5 9.5-8.5-.4 5.4-4.3 8.5-9.5 8.5Z" fill="#5BD59A" />
      <path d="M32 13c0-4-3-6.5-7-6.5.3 4 3.2 6.5 7 6.5Z" fill="#3FBF80" />
      <circle cx="32" cy="36" r="25" fill={`url(#pip-g-${gid})`} />
      <g className="pip-eyes">
        <ellipse cx="23.5" cy="33" rx="3.4" ry="4" fill="#fff" />
        <ellipse cx="40.5" cy="33" rx="3.4" ry="4" fill="#fff" />
        <circle cx="24.3" cy="34" r="1.7" fill="#0B2F4A" />
        <circle cx="41.3" cy="34" r="1.7" fill="#0B2F4A" />
      </g>
      <circle cx="17" cy="42" r="3.6" fill="#FF9AAE" opacity=".6" />
      <circle cx="47" cy="42" r="3.6" fill="#FF9AAE" opacity=".6" />
      <path d="M23 42.5c5 6 13 6 18 0" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function useFlowForPath(): { flow: ChatFlow | null; isReview: boolean; prefix: string } {
  const prefix = useNavPrefix();
  const segs = (usePathname() || "/").split("/").filter(Boolean);
  const rest = segs[0] === "weight-loss" ? segs.slice(1) : segs;
  const first = rest[0];
  const isWeightLoss = prefix === "/weight-loss" || (prefix === "" && !!first && !NOT_WEIGHT_LOSS.has(first));
  const flow = isWeightLoss && !(first && EXCLUDED_FIRST.has(first)) ? CHAT_FLOWS["weight-loss"] : null;
  return { flow, isReview: first === "reviews" && rest.length > 1, prefix: prefix || "/weight-loss" };
}

function MatchCard({ m, med }: { m: ChatMatch; med: string }) {
  const rows = med === "unsure" ? Object.values(m.prices) : m.prices[med] ? [m.prices[med]] : [];
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={m.logo} alt={`${m.name} logo`} className="max-h-[28px] max-w-[130px] object-contain object-left" />
        {m.rank && (
          <span className="shrink-0 rounded-full bg-[#EAF6EF] px-2.5 py-1 text-[12px] font-bold text-[#17804B]">
            #{m.rank} in our ranking
          </span>
        )}
      </div>
      <div className="space-y-3 px-4 py-3">
        {m.trustpilot && (
          <p className="flex items-center gap-1.5 text-[13px] text-gray-700">
            <Star className="h-4 w-4 fill-[#00B67A] text-[#00B67A]" strokeWidth={0} />
            <span className="font-bold text-[#191919]">{m.trustpilot.rating}</span> on Trustpilot · {m.trustpilot.count} reviews
          </p>
        )}
        {rows.length > 0 ? (
          <div className="space-y-1.5">
            {rows.map((r) => (
              <div key={r.label} className="rounded-xl bg-[#F4F8FB] px-3 py-2">
                <p className="text-[14px] text-[#191919]">
                  <span className="font-semibold">{r.label}</span>{" "}
                  <span className="text-[17px] font-extrabold text-[#0C4B75]">{r.price}</span>
                  <span className="text-gray-600">/month</span>
                </p>
                <p className="mt-0.5 text-[12px] leading-snug text-gray-600">{r.note}</p>
              </div>
            ))}
          </div>
        ) : (
          m.priceNote && <p className="rounded-xl bg-[#F4F8FB] px-3 py-2 text-[13px] leading-snug text-gray-700">{m.priceNote}</p>
        )}
        <ul className="space-y-1.5">
          {m.why.map((w) => (
            <li key={w} className="flex gap-2 text-[13.5px] leading-snug text-gray-800">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#17804B]" strokeWidth={3} />
              {w}
            </li>
          ))}
        </ul>
        {m.external ? (
        <ProviderCta
          href={m.href}
          providerName={m.name}
          providerSlug={m.id}
          position={m.rank}
          pageType="quiz_results"
          sourceFlow="chat_helper"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0C4B75] text-[15px] font-bold text-white transition-colors hover:bg-[#093d61] active:bg-[#093d61]"
        >
          Visit {m.name}
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </ProviderCta>
        ) : (
          <Link
            href={m.href}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0C4B75] text-[15px] font-bold text-white transition-colors hover:bg-[#093d61]"
          >
            See {m.name}&rsquo;s review
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        )}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[13px]">
          <Link href={m.reviewHref} className="font-semibold text-[#0C4B75] hover:underline">
            Read our {m.name} review
          </Link>
          {m.alt && (
            <Link href={m.alt.compareHref} className="text-gray-600 hover:text-[#0C4B75] hover:underline">
              Compare with {m.alt.name}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function ChatHelper({ matches, verifiedLabel }: { matches: Record<string, ChatMatch>; verifiedLabel: string }) {
  const { flow, isReview, prefix } = useFlowForPath();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [stepId, setStepId] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);
  const [typing, setTyping] = useState(false);
  const answers = useRef<Record<string, string>>({});
  const timers = useRef<number[]>([]);
  const nextId = useRef(1);
  const started = useRef(false);
  const scroller = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  // Bot messages arrive one by one, each after a short "typing" pause.
  const say = useCallback((items: MsgBody[], done?: () => void) => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let at = 0;
    setTyping(true);
    items.forEach((item, i) => {
      const len = "text" in item ? item.text.length : 120;
      at += reduce ? 120 : Math.min(1100, 380 + len * 9);
      timers.current.push(
        window.setTimeout(() => {
          setMsgs((m) => [...m, { ...item, id: nextId.current++ } as Msg]);
          if (i === items.length - 1) {
            setTyping(false);
            done?.();
          }
        }, at),
      );
    });
    if (items.length === 0) {
      setTyping(false);
      done?.();
    }
  }, []);

  const begin = useCallback(() => {
    if (!flow) return;
    clearTimers();
    answers.current = {};
    setMsgs([]);
    setEnded(false);
    setStepId(null);
    const s = flow.steps[flow.start];
    say(
      s.say.map((text) => ({ from: "bot" as const, text })),
      () => setStepId(s.id),
    );
  }, [flow, say]);

  const openPanel = useCallback(() => {
    setOpen(true);
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {
      // storage unavailable: the teaser may show again, harmless
    }
    trackEvent("QuizStep", { flow: "chat_helper", vertical: flow?.vertical ?? "", step: "open" });
    if (!started.current) {
      started.current = true;
      begin();
    }
  }, [begin, flow]);

  const choose = (opt: ChatOption) => {
    if (!flow || !stepId) return;
    const step = stepId;
    answers.current[step] = opt.id;
    setStepId(null);
    setMsgs((m) => [...m, { id: nextId.current++, from: "user", text: opt.label }]);
    trackEvent("QuizStep", { flow: "chat_helper", vertical: flow.vertical, step, answer: opt.id });
    const reply: MsgBody[] = opt.reply ? [{ from: "bot", text: opt.reply }] : [];
    if (opt.next.startsWith("match:")) {
      const wanted = opt.next.slice(6);
      const matchId = matches[wanted] ? wanted : Object.keys(matches)[0];
      if (!matchId) {
        say([...reply, { from: "bot", text: "Sorry, I couldn't load the providers just now. You can see them all on our ranking." }], () => setEnded(true));
        return;
      }
      const med = answers.current.med ?? "unsure";
      const tip = flow.tips.byAnswer[answers.current[flow.tips.stepId] ?? ""];
      trackEvent("QuizStep", { flow: "chat_helper", vertical: flow.vertical, step: "match", provider: matchId });
      say(
        [
          ...reply,
          { from: "bot", text: `Here's my pick for you, ${matches[matchId].name}! 🎉` },
          { from: "match", matchId, med },
          ...(tip ? [{ from: "tip" as const, ...tip }] : []),
        ],
        () => setEnded(true),
      );
      return;
    }
    const next = flow.steps[opt.next];
    say([...reply, ...next.say.map((text) => ({ from: "bot" as const, text }))], () => setStepId(next.id));
  };

  // Teaser: once per session, a few seconds in, never over an open panel.
  useEffect(() => {
    if (!flow) return;
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(TEASER_KEY);
    } catch {
      seen = false;
    }
    if (seen) return;
    const t = window.setTimeout(() => setTeaser(true), 7000);
    return () => window.clearTimeout(t);
  }, [flow]);

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {
      // ignore
    }
  };

  // Keep the newest message in view.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, stepId, ended]);

  // Esc closes; on mobile the page behind the sheet doesn't scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const mobile = window.matchMedia("(max-width: 639px)").matches;
    const prev = document.body.style.overflow;
    if (mobile) document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!flow) return null;
  const step = stepId ? flow.steps[stepId] : null;
  const bottom = isReview ? "bottom-[calc(84px+env(safe-area-inset-bottom))] sm:bottom-6" : "bottom-[calc(16px+env(safe-area-inset-bottom))] sm:bottom-6";

  return (
    <>
      {/* Launcher + teaser */}
      <div className={`fixed right-4 z-[60] flex items-end gap-2 sm:right-6 ${bottom} ${open ? "max-sm:hidden" : ""}`}>
        {teaser && !open && (
          <div className="pip-pop relative mb-2 max-w-[230px] rounded-2xl rounded-br-md border border-gray-200 bg-white py-2.5 pl-3.5 pr-8 text-[13.5px] leading-snug text-[#191919] shadow-lg">
            <button type="button" onClick={openPanel} className="text-left">
              {flow.teaser}
            </button>
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="Hide message"
              className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => (open ? setOpen(false) : openPanel())}
          aria-label={open ? `Close ${CHATBOT_NAME}` : `Chat with ${CHATBOT_NAME}, our GLP-1 match helper`}
          aria-expanded={open}
          className="pip-launch group relative flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_24px_rgba(12,75,117,0.28)] ring-1 ring-black/5 transition-transform hover:scale-105 active:scale-95"
        >
          {open ? <X className="h-6 w-6 text-[#0C4B75]" strokeWidth={2.5} /> : <HelperFace className="h-[50px] w-[50px]" />}
        </button>
      </div>

      {/* Backdrop (mobile) */}
      {open && <div className="fixed inset-0 z-[60] bg-black/30 sm:hidden" onClick={() => setOpen(false)} aria-hidden />}

      {/* Panel */}
      {open && (
        <div
          ref={panel}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="pip-panel fixed inset-x-0 bottom-0 z-[61] flex h-[85dvh] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl outline-none sm:inset-x-auto sm:bottom-[100px] sm:right-6 sm:h-[min(620px,calc(100dvh-130px))] sm:w-[384px] sm:rounded-3xl sm:border sm:border-gray-200"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-b from-[#EEF5FB] to-white px-4 py-3">
            <HelperFace className="h-11 w-11 shrink-0" />
            <div className="min-w-0 flex-1">
              <p id={titleId} className="text-[16px] font-extrabold text-[#191919]">
                {CHATBOT_NAME}
              </p>
              <p className="truncate text-[12.5px] text-gray-600">{flow.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={begin}
              aria-label="Start over"
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
            >
              <RotateCcw className="h-[18px] w-[18px]" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
            >
              <X className="h-5 w-5" strokeWidth={2.25} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scroller} className="flex-1 space-y-2.5 overflow-y-auto overscroll-contain bg-[#FAFBFC] px-4 py-4" aria-live="polite">
            {msgs.map((m) => {
              if (m.from === "user")
                return (
                  <div key={m.id} className="pip-in flex justify-end">
                    <p className="max-w-[80%] rounded-2xl rounded-br-md bg-[#0C4B75] px-3.5 py-2 text-[14.5px] leading-snug text-white">{m.text}</p>
                  </div>
                );
              if (m.from === "match")
                return (
                  <div key={m.id} className="pip-in">
                    {matches[m.matchId] && <MatchCard m={matches[m.matchId]} med={m.med} />}
                  </div>
                );
              if (m.from === "tip")
                return (
                  <div key={m.id} className="pip-in rounded-2xl border border-[#0C4B75]/10 bg-[#F4F8FB] px-3.5 py-2.5 text-[13.5px] leading-snug text-gray-800">
                    {m.text}
                    {m.href && (
                      <>
                        {" "}
                        <Link href={m.href} className="font-semibold text-[#0C4B75] underline underline-offset-2">
                          {m.linkLabel}
                        </Link>
                      </>
                    )}
                  </div>
                );
              return (
                <div key={m.id} className="pip-in flex items-end gap-2">
                  <HelperFace className="h-7 w-7 shrink-0" />
                  <p className="max-w-[82%] rounded-2xl rounded-bl-md border border-gray-200 bg-white px-3.5 py-2 text-[14.5px] leading-snug text-[#191919]">{m.text}</p>
                </div>
              );
            })}
            {typing && (
              <div className="flex items-end gap-2" aria-label={`${CHATBOT_NAME} is typing`}>
                <HelperFace className="h-7 w-7 shrink-0" />
                <span className="flex gap-1 rounded-2xl rounded-bl-md border border-gray-200 bg-white px-3.5 py-3">
                  <span className="pip-dot h-1.5 w-1.5 rounded-full bg-gray-400" />
                  <span className="pip-dot h-1.5 w-1.5 rounded-full bg-gray-400 [animation-delay:150ms]" />
                  <span className="pip-dot h-1.5 w-1.5 rounded-full bg-gray-400 [animation-delay:300ms]" />
                </span>
              </div>
            )}
          </div>

          {/* Answers */}
          <div className="border-t border-gray-100 bg-white px-4 pt-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
            {step && !typing && (
              <div className="pip-in flex flex-wrap justify-end gap-2">
                {step.options.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => choose(o)}
                    className="min-h-[44px] rounded-full border-2 border-[#0C4B75]/25 bg-white px-4 py-2 text-[14.5px] font-semibold text-[#0C4B75] transition-colors hover:border-[#0C4B75] hover:bg-[#F4F8FB] active:bg-[#E8F1F8]"
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}
            {ended && !typing && (
              <div className="pip-in flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={begin}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border-2 border-[#0C4B75]/25 bg-white px-4 py-2 text-[14.5px] font-semibold text-[#0C4B75] hover:border-[#0C4B75] hover:bg-[#F4F8FB]"
                >
                  <RotateCcw className="h-4 w-4" strokeWidth={2.5} /> Start over
                </button>
                <Link
                  href={flow.allHref === "/weight-loss" ? prefix || "/weight-loss" : flow.allHref}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-[44px] items-center rounded-full border-2 border-[#0C4B75]/25 bg-white px-4 py-2 text-[14.5px] font-semibold text-[#0C4B75] hover:border-[#0C4B75] hover:bg-[#F4F8FB]"
                >
                  See all providers
                </Link>
              </div>
            )}
            <p className="mt-2.5 text-center text-[11.5px] leading-snug text-gray-500">
              A guide, not medical advice. We may earn a commission from providers. {verifiedLabel}.{" "}
              <Link href={`${prefix || "/weight-loss"}/how-we-rank`} className="underline underline-offset-2">
                How we rank
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
