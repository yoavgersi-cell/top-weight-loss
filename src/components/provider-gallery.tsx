"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { ProviderGallery as Gallery } from "@/data/provider-gallery";

// ───── "See it for yourself" provider-site gallery ─────
// Desktop: a snap carousel showing three slides with arrow buttons.
// Mobile: one slide at a time with a peek of the next, swipe + dots.
// Any slide opens full size in a lightbox (Esc / arrows / swipe-friendly).
// Each slide carries a step title, a caption that attributes the page's
// claims to the provider, and a dated source line. ImageObject structured
// data is emitted for every slide so search engines read each screenshot
// with its caption, credit and capture date.

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export function ProviderGallery({
  providerName,
  gallery,
  pageUrl,
  siteUrl = "https://www.treatmentshub.com",
}: {
  providerName: string;
  gallery: Gallery;
  pageUrl: string;
  siteUrl?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const n = gallery.slides.length;
  const captured = longDate(gallery.capturedOn);

  // Which slide is in view (drives the dots and arrow states).
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const w = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? el.clientWidth;
      setActive(Math.min(n - 1, Math.round(el.scrollLeft / (w + 16))));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [n]);

  const scrollTo = useCallback((i: number) => {
    const el = track.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (el && item) el.scrollTo({ left: item.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  // Lightbox keys + scroll lock.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % n));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + n) % n));
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, n]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${providerName}'s website, step by step`,
    itemListElement: gallery.slides.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "ImageObject",
        contentUrl: `${siteUrl}${s.src}`,
        name: `${providerName}: ${s.title}`,
        caption: s.caption,
        description: s.alt,
        width: s.width,
        height: s.height,
        dateCreated: gallery.capturedOn,
        creditText: providerName,
        copyrightNotice: `Screenshot of ${gallery.source}`,
        isPartOf: { "@type": "WebPage", "@id": pageUrl },
      },
    })),
  };

  const arrow =
    "hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#0C4B75] shadow-sm transition-colors hover:bg-[#F4F8FB] disabled:cursor-default disabled:opacity-40 sm:flex";

  return (
    <section className="mb-8" aria-labelledby="provider-gallery-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 id="provider-gallery-title" className="text-[20px] font-bold text-[#191919] sm:text-[22px]">
            See it for yourself: {providerName}&rsquo;s site, step by step
          </h2>
          <p className="mt-1 text-[13.5px] text-gray-600">
            Screenshots of {gallery.source}, captured {captured}. Claims shown are {providerName}&rsquo;s own.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" className={arrow} onClick={() => scrollTo(Math.max(0, active - 1))} disabled={active === 0} aria-label="Previous screenshots">
            <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
          </button>
          <button type="button" className={arrow} onClick={() => scrollTo(Math.min(n - 1, active + 1))} disabled={active >= n - 1} aria-label="Next screenshots">
            <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        aria-label={`${providerName} website screenshots`}
      >
        {gallery.slides.map((s, i) => (
          <li key={s.src} className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-2rem)/3)]">
            <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block aspect-[16/10] w-full bg-[#F4F6F8]"
                aria-label={`Open full size: ${s.title}`}
              >
                <Image src={s.src} alt={s.alt} fill sizes="(min-width: 640px) 33vw, 86vw" className="object-contain p-2" loading="lazy" />
                <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#0C4B75] opacity-90 shadow-sm group-hover:opacity-100">
                  <Expand className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </button>
              <figcaption className="flex flex-1 flex-col p-4">
                <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#0C4B75]">Step {i + 1}</p>
                <p className="mt-0.5 text-[15.5px] font-bold text-[#191919]">{s.title}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-gray-700">{s.caption}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {/* Dots (mobile) */}
      <div className="mt-3 flex justify-center gap-1.5 sm:hidden" aria-hidden>
        {gallery.slides.map((s, i) => (
          <span key={s.src} className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-[#0C4B75]" : "w-1.5 bg-gray-300"}`} />
        ))}
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={gallery.slides[open].title}
          className="fixed inset-0 z-50 flex flex-col bg-black/95 p-3 sm:p-8"
          onClick={() => setOpen(null)}
        >
          <div className="flex items-center justify-between text-white">
            <p className="text-[14px] font-semibold">
              {open + 1} / {n} · {gallery.slides[open].title}
            </p>
            <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative my-3 flex-1" onClick={(e) => e.stopPropagation()}>
            <Image src={gallery.slides[open].src} alt={gallery.slides[open].alt} fill sizes="100vw" className="object-contain" />
            {n > 1 && (
              <>
                <button type="button" onClick={() => setOpen((open - 1 + n) % n)} aria-label="Previous" className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button type="button" onClick={() => setOpen((open + 1) % n)} aria-label="Next" className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
          <p className="mx-auto max-w-[760px] text-center text-[14px] leading-relaxed text-white/90" onClick={(e) => e.stopPropagation()}>
            {gallery.slides[open].caption}
          </p>
        </div>
      )}
    </section>
  );
}
