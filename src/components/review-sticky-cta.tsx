"use client";

import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { ProviderCta } from "./provider-cta";

// Mobile-only sticky bar for provider review pages: the provider's logo and
// one classic CTA. Deliberately quiet (operator brief, Nov 4, 2026: "not
// aggressive"):
//   - hidden until the reader starts scrolling (about 280px, roughly past
//     the hero's own CTA);
//   - steps aside near the end of the page, where the closing CTA and the
//     footer take over;
//   - one tap on the X hides it for the rest of the session on that review;
//   - a plain white bar, no animation beyond a short slide, no countdowns,
//     badges or urgency copy; it sits under any modal (z-30).
export function ReviewStickyCta({
  providerId,
  name,
  logo,
  href,
  position,
}: {
  providerId: string;
  name: string;
  logo: string;
  href: string;
  position?: number;
}) {
  const key = `reviewStickyDismissed:${providerId}`;
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(key)) setDismissed(true);
    } catch {
      // storage unavailable: the bar still works, it just won't remember a dismiss
    }
    const onScroll = () => {
      const pastHero = window.scrollY > 280;
      const nearEnd = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 900;
      setShow(pastHero && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);

  if (dismissed) return null;
  const visible = show;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(key, "1");
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 transition-transform duration-300 ease-out sm:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="border-t border-gray-200 bg-white px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-3">
          <div className="flex h-[34px] min-w-0 flex-1 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt={`${name} logo`} className="max-h-[30px] max-w-[120px] object-contain object-left" loading="lazy" />
          </div>
          <ProviderCta
            href={href}
            providerName={name}
            providerSlug={providerId}
            position={position}
            pageType="review"
            sourceFlow="provider_review"
            className="flex h-[42px] shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#0C4B75] px-5 text-[14px] font-bold text-white transition-colors active:bg-[#093d61]"
          >
            Visit {name}
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </ProviderCta>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Hide this bar"
            className="-mr-1 flex h-[34px] w-[30px] shrink-0 items-center justify-center rounded-md text-gray-400 active:bg-gray-100"
          >
            <X className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </div>
  );
}
