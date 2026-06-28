"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Send } from "lucide-react";
import { ComparisonCard } from "@/components/comparison-card";
import type { SiteConfig, Provider, QuizConfig } from "@/lib/config";

interface ChatMessage {
  id: string;
  from: "bot" | "user";
  text: string;
  options?: { label: string; value: string }[];
  type?: "text" | "options" | "dropdown";
}

interface QuizMatchedProvider extends Provider {
  rank: number;
  rating: number;
  ratingLabel: string;
  badge?: string;
  matchPct: number;
  reasons: string[];
}

// Hide header nav and footer extras on quiz pages
function HideChrome() {
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const disclosure = footer.querySelector("p:has(strong)");
    const footerNav = footer.querySelector("nav");
    const headerNav = document.querySelector("header nav");
    const hamburger = document.querySelector("header button");
    if (disclosure) (disclosure as HTMLElement).style.display = "none";
    if (footerNav) (footerNav as HTMLElement).style.display = "none";
    if (headerNav) (headerNav as HTMLElement).style.display = "none";
    if (hamburger) (hamburger as HTMLElement).style.display = "none";
    return () => {
      if (disclosure) (disclosure as HTMLElement).style.display = "";
      if (footerNav) (footerNav as HTMLElement).style.display = "";
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

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // Start chat with welcome message
  useEffect(() => {
    if (config && quiz && messages.length === 0 && currentStep === -1) {
      addBotMessage(
        quiz.welcomeTitle || "Hi! I'll help you find the best weight loss provider.",
        undefined,
        undefined,
        () => {
          addBotMessage(
            quiz.welcomeSubtitle || "Let me ask you a few quick questions.",
            undefined,
            undefined,
            () => startQuestion(0)
          );
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  function addBotMessage(
    text: string,
    options?: { label: string; value: string }[],
    type?: "text" | "options" | "dropdown",
    onDone?: () => void
  ) {
    setTyping(true);
    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      setTyping(false);
      const msg: ChatMessage = {
        id: `bot-${Date.now()}-${Math.random()}`,
        from: "bot",
        text,
        options,
        type: type || (options ? "options" : "text"),
      };
      setMessages((prev) => [...prev, msg]);
      if (onDone) setTimeout(onDone, 300);
    }, delay);
  }

  function startQuestion(stepIdx: number) {
    const q = questions[stepIdx];
    if (!q) return;
    setCurrentStep(stepIdx);
    addBotMessage(
      q.title,
      q.options,
      q.type === "dropdown" ? "dropdown" : "options"
    );
  }

  function handleSelect(questionId: string, value: string, label: string) {
    // Add user response bubble
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      from: "user",
      text: label,
    };
    setMessages((prev) => {
      // Remove options from the last bot message
      const updated = prev.map((m, i) =>
        i === prev.length - 1 && m.from === "bot"
          ? { ...m, options: undefined, type: "text" as const }
          : m
      );
      return [...updated, userMsg];
    });
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    const nextStep = currentStep + 1;

    // Mid-flow message after step 2
    if (currentStep === 1 && quiz?.midFlowMessage) {
      addBotMessage(quiz.midFlowMessage, undefined, undefined, () => {
        if (nextStep < questions.length) {
          startQuestion(nextStep);
        } else {
          startLoading();
        }
      });
    } else if (nextStep < questions.length) {
      startQuestion(nextStep);
    } else {
      // Transition to loading
      addBotMessage(
        "Finding your best matches...",
        undefined,
        undefined,
        () => startLoading()
      );
    }
  }

  function startLoading() {
    setPhase("loading");
    setLoadingIdx(0);
    setLoadingPct(0);
    const msgs = quiz?.loadingMessages ?? [];
    const totalMs = 4300;
    const perMsg = totalMs / msgs.length;
    let i = 0;

    const pctInterval = setInterval(() => {
      setLoadingPct((prev) => Math.min(prev + 1, 95));
    }, totalMs / 95);

    const msgInterval = setInterval(() => {
      i++;
      if (i < msgs.length) {
        setLoadingIdx(i);
      } else {
        clearInterval(msgInterval);
        clearInterval(pctInterval);
        setLoadingPct(100);
        setTimeout(() => calculateResults(), 200);
      }
    }, perMsg);
  }

  function calculateResults() {
    if (!config || !quiz) return;
    const profiles = quiz.providerProfiles;
    const priority = answers["priority"] || "";
    const ranking = config.ranking;

    const scored = profiles.map((profile) => {
      const rankingIndex = ranking.providerOrder.indexOf(profile.providerId);
      let score = 10 - (rankingIndex >= 0 ? rankingIndex : 5);
      if (priority === "cost") {
        score += profile.priceLevel === "low" ? 4 : profile.priceLevel === "mid" ? 2 : 0;
      }
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
      const quizRatings = [9.8, 9.6, 9.4, 9.2, 9.0, 8.8, 8.6, 8.4, 8.2, 8.0];
      const quizLabels = ["Exceptional", "Excellent", "Excellent", "Excellent", "Excellent", "Very Good", "Very Good", "Very Good", "Good", "Good"];
      return {
        ...provider,
        rank: idx + 1,
        rating: quizRatings[idx] ?? 8.0,
        ratingLabel: quizLabels[idx] ?? "Good",
        matchPct,
        reasons: s.reasons,
      };
    }).filter(Boolean) as QuizMatchedProvider[];

    setMatchedProviders(results);
    setPhase("results");
  }

  if (!config || !quiz) {
    return (
      <>
        <HideChrome />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#0C4B75]" />
        </div>
      </>
    );
  }

  // ========== LOADING ==========
  if (phase === "loading") {
    const msgs = quiz.loadingMessages;
    return (
      <>
        <HideChrome />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-6">
          <div className="relative flex h-14 w-14 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#0C4B75]/10" style={{ animationDuration: "1.5s" }} />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0C4B75] to-[#1a7ab5] shadow-lg">
              <Check className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="w-full max-w-[320px]">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[#0C4B75] transition-all duration-100"
                style={{ width: `${loadingPct}%` }}
              />
            </div>
            <p className="mt-1 text-right text-[12px] text-gray-400">{loadingPct}%</p>
          </div>
          <p className="text-center text-[16px] font-medium text-gray-600 sm:text-[18px]">
            {msgs[loadingIdx] || msgs[0]}
          </p>
        </div>
      </>
    );
  }

  // ========== RESULTS ==========
  if (phase === "results" && matchedProviders.length > 0) {
    const featured = matchedProviders[0];
    const others = matchedProviders.slice(1);

    return (
      <>
        <HideChrome />
        <div className="bg-[#F7F8FA] py-8 sm:py-14 overflow-x-hidden animate-[fadeSlideUp_0.5s_ease-out]">
          <div className="mx-auto max-w-[800px] px-4 overflow-hidden">
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {quiz.trustStrip.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400 sm:text-[13px]">
                  <Check className="h-3.5 w-3.5 text-[#0C4B75]" strokeWidth={2} />
                  {item}
                </div>
              ))}
            </div>

            <div className="mb-6 text-center sm:mb-8">
              <h1 className="text-[26px] font-extrabold text-[#191919] sm:text-[34px]">{quiz.resultsTitle}</h1>
              <p className="mt-2 text-[14px] text-gray-500 sm:text-[16px]">{quiz.resultsSubtitle}</p>
            </div>

            <div className="mb-3">
              <div className="mb-2 flex flex-wrap items-center gap-2 px-1">
                <span className="rounded-full bg-[#0C4B75] px-4 py-1 text-[12px] font-bold text-white sm:text-[13px]">
                  {featured.matchPct}% Match
                </span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700 sm:text-[12px]">
                  Top Recommendation
                </span>
              </div>
              <div className="rounded-xl shadow-md">
                <ComparisonCard product={featured} />
              </div>
              <div className="mt-2 flex flex-wrap gap-2 px-1">
                {featured.reasons.map((r, i) => (
                  <span key={i} className="flex items-center gap-1 text-[12px] text-gray-500">
                    <Check className="h-3 w-3 text-[#0C4B75]" strokeWidth={2} />
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {others.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-4 text-[16px] font-bold text-gray-500 sm:text-[18px]">
                  {quiz.resultsOthersTitle}
                </h2>
                <div className="space-y-3">
                  {others.map((provider) => (
                    <div key={provider.id}>
                      <div className="mb-1 flex items-center gap-2 px-1">
                        <span className="rounded-full bg-gray-200 px-3 py-0.5 text-[11px] font-bold text-gray-600">
                          {provider.matchPct}% Match
                        </span>
                      </div>
                      <div className="opacity-90">
                        <ComparisonCard product={provider} hideRank />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // ========== CHAT ==========
  return (
    <>
      <HideChrome />
      <div className="flex min-h-[calc(100vh-130px)] flex-col bg-[#F7F8FA]">
        {/* Chat messages area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
        >
          <div className="mx-auto max-w-[600px] space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-[fadeSlideUp_0.3s_ease-out]`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] ${
                    msg.from === "user"
                      ? "rounded-2xl rounded-br-md bg-[#0C4B75] px-4 py-3 text-[15px] text-white"
                      : "rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[15px] text-[#191919] shadow-sm border border-gray-100"
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Option buttons */}
                  {msg.options && msg.type === "options" && (
                    <div className="mt-3 space-y-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            const q = questions[currentStep];
                            if (q) handleSelect(q.id, opt.value, opt.label);
                          }}
                          className="flex w-full items-center rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-2.5 text-left text-[14px] font-medium text-gray-700 transition-all hover:border-[#0C4B75] hover:bg-[#0C4B75]/5 hover:text-[#0C4B75] active:scale-[0.98]"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Dropdown options */}
                  {msg.options && msg.type === "dropdown" && (
                    <div className="mt-3">
                      <select
                        className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-2.5 text-[14px] text-gray-700 focus:border-[#0C4B75] focus:outline-none"
                        defaultValue=""
                        onChange={(e) => {
                          const opt = msg.options?.find((o) => o.value === e.target.value);
                          if (opt) {
                            const q = questions[currentStep];
                            if (q) handleSelect(q.id, opt.value, opt.label);
                          }
                        }}
                      >
                        <option value="" disabled>Select your state...</option>
                        {msg.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start animate-[fadeSlideUp_0.2s_ease-out]">
                <div className="rounded-2xl rounded-bl-md bg-white px-5 py-3.5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
