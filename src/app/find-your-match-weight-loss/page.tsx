"use client";

import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { ComparisonCard } from "@/components/comparison-card";
import type { SiteConfig, Provider, QuizConfig } from "@/lib/config";

interface ChatMessage {
  id: string;
  from: "bot" | "user";
  text: string;
}

interface QuizMatchedProvider extends Provider {
  rank: number;
  rating: number;
  ratingLabel: string;
  badge?: string;
  matchPct: number;
  reasons: string[];
}

function HideChrome() {
  useEffect(() => {
    const footer = document.querySelector("footer");
    const headerNav = document.querySelector("header nav");
    const hamburger = document.querySelector("header button");
    if (footer) (footer as HTMLElement).style.display = "none";
    if (headerNav) (headerNav as HTMLElement).style.display = "none";
    if (hamburger) (hamburger as HTMLElement).style.display = "none";
    return () => {
      if (footer) (footer as HTMLElement).style.display = "";
      if (headerNav) (headerNav as HTMLElement).style.display = "";
      if (hamburger) (hamburger as HTMLElement).style.display = "";
    };
  }, []);
  return null;
}

export default function ChatQuizPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(-1);
  const [typing, setTyping] = useState(false);
  const [activeOptions, setActiveOptions] = useState<{ questionId: string; options: { label: string; value: string }[]; type: "cards" | "dropdown" } | null>(null);
  const [phase, setPhase] = useState<"chat" | "loading" | "results">("chat");
  const [loadingPct, setLoadingPct] = useState(0);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [matchedProviders, setMatchedProviders] = useState<QuizMatchedProvider[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/config", {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("admin_token") || "topweight2026"}` },
    })
      .then((r) => r?.json())
      .then((d) => { if (d && !d.error) setConfig(d); })
      .catch(() => null);
  }, []);

  const quiz: QuizConfig | null = config?.quiz ?? null;
  const questions = quiz?.questions ?? [];
  const totalSteps = questions.length;
  const progress = totalSteps > 0 && currentStep >= 0 ? Math.round(((currentStep + 1) / totalSteps) * 100) : (totalSteps > 0 ? Math.round((1 / totalSteps) * 100) : 0);

  function scrollToBottom() {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }
    }, 80);
    // Second scroll to catch late-rendered content
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }
    }, 350);
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, activeOptions]);

  // Start chat
  useEffect(() => {
    if (config && quiz && messages.length === 0 && currentStep === -1) {
      pushBotThenQuestion(
        quiz.welcomeSubtitle || "Let me help you find the right provider.",
        0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  function pushBot(text: string, onDone?: () => void) {
    setTyping(true);
    setActiveOptions(null);
    const delay = 600 + Math.random() * 500;
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: `b-${Date.now()}-${Math.random()}`, from: "bot", text }]);
      if (onDone) setTimeout(onDone, 200);
    }, delay);
  }

  function pushBotThenQuestion(text: string, stepIdx: number) {
    pushBot(text, () => showQuestion(stepIdx));
  }

  function showQuestion(stepIdx: number) {
    const q = questions[stepIdx];
    if (!q) return;
    setCurrentStep(stepIdx);
    setTyping(true);
    setActiveOptions(null);
    const delay = 600 + Math.random() * 400;
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: `q-${stepIdx}`, from: "bot", text: q.title }]);
      setTimeout(() => {
        setActiveOptions({ questionId: q.id, options: q.options, type: q.type });
      }, 150);
    }, delay);
  }

  function handleSelect(value: string, label: string) {
    if (!activeOptions) return;
    const qId = activeOptions.questionId;
    setActiveOptions(null);
    // User bubble
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, from: "user", text: label }]);
    setAnswers((prev) => ({ ...prev, [qId]: value }));

    const nextStep = currentStep + 1;

    if (currentStep === 1 && quiz?.midFlowMessage) {
      pushBot(quiz.midFlowMessage, () => {
        if (nextStep < questions.length) {
          showQuestion(nextStep);
        } else {
          goToLoading();
        }
      });
    } else if (nextStep < questions.length) {
      showQuestion(nextStep);
    } else {
      goToLoading();
    }
  }

  function goToLoading() {
    pushBot("Finding your best matches...", () => {
      setTimeout(() => setPhase("loading"), 400);
    });
  }

  function startLoading() {
    setLoadingIdx(0);
    setLoadingPct(0);
    const msgs = quiz?.loadingMessages ?? [];
    const totalMs = 4300;
    const perMsg = totalMs / msgs.length;
    let i = 0;
    const pctInterval = setInterval(() => setLoadingPct((p) => Math.min(p + 1, 95)), totalMs / 95);
    const msgInterval = setInterval(() => {
      i++;
      if (i < msgs.length) { setLoadingIdx(i); }
      else { clearInterval(msgInterval); clearInterval(pctInterval); setLoadingPct(100); setTimeout(() => calculateResults(), 200); }
    }, perMsg);
  }

  useEffect(() => {
    if (phase === "loading") startLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function calculateResults() {
    if (!config || !quiz) return;
    const profiles = quiz.providerProfiles;
    const priority = answers["priority"] || "";
    const ranking = config.ranking;
    const scored = profiles.map((profile) => {
      const rankingIndex = ranking.providerOrder.indexOf(profile.providerId);
      let score = 10 - (rankingIndex >= 0 ? rankingIndex : 5);
      if (priority === "cost") score += profile.priceLevel === "low" ? 4 : profile.priceLevel === "mid" ? 2 : 0;
      if (profile.strengths.includes(priority)) score += 4;
      const reasons: string[] = [];
      if (profile.matchReasons[priority]) reasons.push(profile.matchReasons[priority]);
      const otherKeys = Object.keys(profile.matchReasons).filter((k) => k !== priority);
      if (otherKeys.length > 0) reasons.push(profile.matchReasons[otherKeys[0]]);
      return { providerId: profile.providerId, score, reasons };
    });
    scored.sort((a, b) => b.score - a.score);
    const maxScore = Math.max(...scored.map((s) => s.score));
    const results = scored.map((s, idx) => {
      const provider = config.providers.find((p) => p.id === s.providerId);
      if (!provider) return null;
      const matchPct = Math.min(98, Math.max(85, Math.round((s.score / maxScore) * 98)));
      const quizRatings = [9.8, 9.6, 9.4, 9.2, 9.0];
      const quizLabels = ["Exceptional", "Excellent", "Excellent", "Excellent", "Excellent"];
      return { ...provider, rank: idx + 1, rating: quizRatings[idx] ?? 8.0, ratingLabel: quizLabels[idx] ?? "Good", matchPct, reasons: s.reasons };
    }).filter(Boolean) as QuizMatchedProvider[];
    setMatchedProviders(results);
    setPhase("results");
  }

  if (!config || !quiz) {
    return (<><HideChrome /><div className="flex min-h-[60vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#0C4B75]" /></div></>);
  }

  // ========== LOADING ==========
  if (phase === "loading") {
    const msgs = quiz.loadingMessages;
    return (
      <><HideChrome /><div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-6 bg-[#F5F3EF]">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-[#D4A843]/20" style={{ animationDuration: "1.5s" }} />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D4A843] to-[#C49530] shadow-lg">
            <Check className="h-6 w-6 text-white" strokeWidth={2.5} />
          </div>
        </div>
        <div className="w-full max-w-[320px]">
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8E4DD]">
            <div className="h-full rounded-full bg-[#D4A843] transition-all duration-100" style={{ width: `${loadingPct}%` }} />
          </div>
          <p className="mt-1 text-right text-[12px] text-gray-400">{loadingPct}%</p>
        </div>
        <p className="text-center text-[16px] font-medium text-gray-600 sm:text-[18px]">{msgs[loadingIdx] || msgs[0]}</p>
      </div></>
    );
  }

  // ========== RESULTS ==========
  if (phase === "results" && matchedProviders.length > 0) {
    const featured = matchedProviders[0];
    const others = matchedProviders.slice(1);
    return (
      <><HideChrome /><div className="bg-[#F7F8FA] py-8 sm:py-14 overflow-x-hidden animate-[fadeSlideUp_0.5s_ease-out]">
        <div className="mx-auto max-w-[800px] px-4 overflow-hidden">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {quiz.trustStrip.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400 sm:text-[13px]">
                <Check className="h-3.5 w-3.5 text-[#0C4B75]" strokeWidth={2} />{item}
              </div>
            ))}
          </div>
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="text-[26px] font-extrabold text-[#191919] sm:text-[34px]">{quiz.resultsTitle}</h1>
            <p className="mt-2 text-[14px] text-gray-500 sm:text-[16px]">{quiz.resultsSubtitle}</p>
          </div>
          <div className="mb-3">
            <div className="mb-2 flex flex-wrap items-center gap-2 px-1">
              <span className="rounded-full bg-[#0C4B75] px-4 py-1 text-[12px] font-bold text-white sm:text-[13px]">{featured.matchPct}% Match</span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700 sm:text-[12px]">Top Recommendation</span>
            </div>
            <div className="rounded-xl shadow-md"><ComparisonCard product={featured} /></div>
            <div className="mt-2 flex flex-wrap gap-2 px-1">
              {featured.reasons.map((r, i) => (
                <span key={i} className="flex items-center gap-1 text-[12px] text-gray-500"><Check className="h-3 w-3 text-[#0C4B75]" strokeWidth={2} />{r}</span>
              ))}
            </div>
          </div>
          {others.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-4 text-[16px] font-bold text-gray-500 sm:text-[18px]">{quiz.resultsOthersTitle}</h2>
              <div className="space-y-3">
                {others.map((provider) => (
                  <div key={provider.id}>
                    <div className="mb-1 flex items-center gap-2 px-1">
                      <span className="rounded-full bg-gray-200 px-3 py-0.5 text-[11px] font-bold text-gray-600">{provider.matchPct}% Match</span>
                    </div>
                    <div className="opacity-90"><ComparisonCard product={provider} hideRank /></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div></>
    );
  }

  // ========== CHAT ==========
  return (
    <>
      <HideChrome />
      <div className="fixed inset-x-0 top-[64px] bottom-0 flex flex-col bg-[#F5F3EF]">
        {/* Header */}
        <div className="shrink-0 border-b border-[#E8E4DD] bg-[#F5F3EF] px-4 pb-5 pt-6 text-center sm:pb-6 sm:pt-8">
          <h1 className="text-[24px] font-extrabold leading-tight text-[#191919] sm:text-[32px]">
            {quiz.pageTitle || quiz.welcomeTitle}
          </h1>
          <p className="mx-auto mt-2 max-w-[440px] text-[14px] leading-relaxed text-gray-500 sm:text-[16px]">
            {quiz.pageSubtitle || quiz.welcomeSubtitle}
          </p>
        </div>

        {/* Chat area */}
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-[560px] space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-[fadeSlideUp_0.3s_ease-out]`}
              >
                <div
                  className={`${
                    msg.from === "user"
                      ? "rounded-2xl rounded-br-sm bg-[#D4A843] px-5 py-3.5 text-[16px] font-medium text-white sm:text-[17px]"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm bg-[#EDEAE4] px-5 py-4 text-[16px] text-[#191919] sm:text-[17px]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start animate-[fadeSlideUp_0.2s_ease-out]">
                <div className="rounded-2xl rounded-bl-sm bg-[#EDEAE4] px-5 py-5">
                  <div className="flex items-center gap-2">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="h-2.5 w-2.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Option pills */}
            {activeOptions && activeOptions.type === "cards" && (
              <div className="flex flex-wrap gap-2.5 animate-[fadeSlideUp_0.3s_ease-out]">
                {activeOptions.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value, opt.label)}
                    className="rounded-full border border-[#D9D5CE] bg-white px-6 py-3 text-[15px] font-medium text-[#191919] transition-all hover:border-[#D4A843] hover:bg-[#D4A843]/5 active:scale-[0.97] sm:text-[16px]"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Dropdown as pill select + send button */}
            {activeOptions && activeOptions.type === "dropdown" && (
              <div className="flex items-center gap-2.5 animate-[fadeSlideUp_0.3s_ease-out]">
                <div className="relative flex-1">
                  <select
                    id="chat-dropdown"
                    className="w-full appearance-none rounded-full border-2 border-[#D4A843]/50 bg-white px-6 py-3.5 pr-10 text-[15px] text-gray-700 focus:border-[#D4A843] focus:outline-none sm:text-[16px]"
                    defaultValue=""
                    onChange={() => {}}
                  >
                    <option value="" disabled>Select your state...</option>
                    {activeOptions.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
                <button
                  onClick={() => {
                    const select = document.getElementById("chat-dropdown") as HTMLSelectElement;
                    if (!select?.value) return;
                    const opt = activeOptions.options.find((o) => o.value === select.value);
                    if (opt) handleSelect(opt.value, opt.label);
                  }}
                  className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#D4A843] text-white shadow-sm transition-all hover:bg-[#C49530] active:scale-95"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="shrink-0 sticky bottom-0 border-t border-[#E8E4DD] bg-[#F5F3EF] px-4 py-3">
          <div className="mx-auto flex max-w-[560px] items-center gap-3">
            <div className="h-[10px] flex-1 overflow-hidden rounded-full bg-[#E8E4DD]">
              <div
                className="h-full rounded-full bg-[#D4A843] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="shrink-0 text-[14px] font-semibold text-gray-400">{progress}%</span>
          </div>
        </div>
      </div>
    </>
  );
}
