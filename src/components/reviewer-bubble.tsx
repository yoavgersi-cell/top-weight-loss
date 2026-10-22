"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

// ───── Reviewer bubble ─────
// Oct 22, 2026 (operator decision): clicking the medical reviewer's name in
// the review bar used to navigate to her profile page, and readers who went
// there did not come back to the content. The name (and portrait) now open an
// in-page bubble instead - on hover on desktop, on tap on phones - with a
// full, well-written account of who reviews the page and what the review
// covers. The profile page still exists for search engines and the Person
// schema; the bubble ends on a quiet link to it for readers who want more.

export interface ReviewerBubbleData {
  name: string;
  credentials: string[];
  jobTitle: string;
  headline: string;
  paragraphs: string[];
  scope: string;
  qualifications: string[];
  specialties: string[];
  since: string; // YYYY-MM
  image: { thumb: string; webp: string };
  profileHref: string;
  linkedin?: string;
  reviewedAt?: string; // YYYY-MM-DD when this page is in the review log
  reviewedLabel?: string; // pre-formatted date for display
}

function formatSince(ym: string): string {
  const d = new Date(ym + "-01T00:00:00Z");
  return isNaN(d.getTime()) ? ym : d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

export function ReviewerBubble({
  reviewer,
  trigger,
  portrait,
  className = "",
}: {
  reviewer: ReviewerBubbleData;
  /** The inline name element that opens the bubble. */
  trigger: React.ReactNode;
  /** Optional portrait element rendered before the text; also opens the bubble. */
  portrait?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  // Desktop placement: fixed coordinates under the trigger, so the bubble
  // escapes the hero band's overflow clipping (it is portalled to <body>).
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const rootRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | null>(null);
  const id = useId();

  const clearTimer = () => {
    if (hoverTimer.current) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };
  // Desktop: open on hover after a short pause, close a little after the
  // pointer leaves (so moving from the name into the bubble keeps it open).
  const onEnter = useCallback(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    clearTimer();
    hoverTimer.current = window.setTimeout(() => setOpen(true), 120);
  }, []);
  const onLeave = useCallback(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    clearTimer();
    hoverTimer.current = window.setTimeout(() => setOpen(false), 260);
  }, []);

  const place = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const width = Math.min(460, window.innerWidth - 32);
    const left = Math.max(16, Math.min(r.left, window.innerWidth - width - 16));
    setPos({ top: r.bottom + 10, left });
  }, []);
  useLayoutEffect(() => {
    if (!open) return;
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (rootRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  const toggle = () => {
    clearTimer();
    setOpen((v) => !v);
  };

  const creds = reviewer.credentials.length > 0 ? `, ${reviewer.credentials.join(", ")}` : "";

  return (
    <span ref={rootRef} className={`relative inline ${className}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {portrait && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`About ${reviewer.name}, ${reviewer.jobTitle}`}
          aria-expanded={open}
          aria-controls={id}
          className="mr-2.5 inline-block shrink-0 cursor-pointer rounded-full align-middle"
        >
          {portrait}
        </button>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={id}
        className="cursor-pointer font-bold text-[#191919] underline decoration-dotted decoration-gray-400 underline-offset-[3px] hover:text-[#0C4B75] hover:decoration-[#0C4B75]"
      >
        {trigger}
      </button>

      {open && pos && createPortal(
        <div
          ref={panelRef}
          id={id}
          role="dialog"
          aria-label={`About ${reviewer.name}`}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          style={typeof window !== "undefined" && window.innerWidth >= 640 ? { top: pos.top, left: pos.left } : undefined}
          className="fixed inset-x-3 bottom-3 z-[70] max-h-[80vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-[0_18px_50px_-12px_rgba(0,0,0,0.28)] sm:inset-auto sm:w-[460px] sm:max-w-[calc(100vw-2rem)] sm:p-6"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>

          <div className="flex items-start gap-3.5 pr-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={reviewer.image.webp}
              alt={`${reviewer.name}, ${reviewer.jobTitle}`}
              width={60}
              height={60}
              style={{ width: 60, height: 60 }}
              className="shrink-0 rounded-full object-cover ring-1 ring-gray-200"
              loading="lazy"
              decoding="async"
            />
            <div className="min-w-0">
              <p className="text-[15px] font-bold leading-snug text-[#191919]">
                {reviewer.name}
                {creds}
              </p>
              <p className="mt-0.5 text-[12.5px] font-medium text-[#0C4B75]">{reviewer.jobTitle} at Treatments Hub</p>
              <p className="mt-1 text-[12.5px] leading-snug text-gray-500">{reviewer.headline}</p>
            </div>
          </div>

          <div className="mt-4 space-y-3 text-[13.5px] leading-[1.6] text-gray-700">
            {reviewer.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5">
            <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.25} />
              What the medical review covers
            </p>
            <p className="text-[13px] leading-[1.6] text-gray-700">{reviewer.scope}</p>
            {reviewer.reviewedAt && reviewer.reviewedLabel && (
              <p className="mt-1.5 text-[12.5px] text-gray-600">
                This page was reviewed on <time dateTime={reviewer.reviewedAt}>{reviewer.reviewedLabel}</time>.
              </p>
            )}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">Qualifications</p>
              <ul className="space-y-1 text-[12.5px] leading-snug text-gray-700">
                {reviewer.qualifications.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">Areas of focus</p>
              <ul className="space-y-1 text-[12.5px] leading-snug text-gray-700">
                {reviewer.specialties.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-4 border-t border-gray-100 pt-3 text-[12px] leading-relaxed text-gray-500">
            Reviewer at Treatments Hub since {formatSince(reviewer.since)}.{" "}
            <Link href="/medical-review-policy" className="font-medium text-[#0C4B75] hover:underline">
              How we review
            </Link>
            {reviewer.linkedin && (
              <>
                {" · "}
                <a href={reviewer.linkedin} target="_blank" rel="noopener noreferrer me" className="font-medium text-[#0C4B75] hover:underline">
                  LinkedIn
                </a>
              </>
            )}
            {" · "}
            <Link href={reviewer.profileHref} className="text-gray-500 underline-offset-2 hover:text-[#0C4B75] hover:underline">
              Full profile
            </Link>
          </p>
        </div>,
        document.body,
      )}
    </span>
  );
}
