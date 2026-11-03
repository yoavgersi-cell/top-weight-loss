"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useNavPrefix } from "@/lib/nav-prefix";

// Pages under /weight-loss/* that the proxy rewrites to a bare route (the
// tracker, guides, about, tools) report the bare path here; everything bare
// except the hub landing and the site-level root pages is weight-loss content.
const NOT_WEIGHT_LOSS = new Set(["hub", "reviewers", "medical-review-policy", "uk"]);

// ───── Weight-loss price ticker ─────
// A thin strip under the header on every weight-loss page: each provider's
// verified starting price, in ranking order, from the same price index that
// feeds the tracker, its RSS feed and the CSV downloads (items are built on
// the server in the (main) layout). Shown only under /weight-loss.
//
// The server HTML carries the list once. The second copy that makes the loop
// seamless is added after hydration and is aria-hidden and untabbable, so
// crawlers and screen readers read each price a single time. Motion pauses on
// hover and focus, and is off entirely under prefers-reduced-motion (the strip
// then scrolls by hand).

export type TickerItem = { id: string; name: string; price: string; href: string };

function Items({ items, hidden = false }: { items: TickerItem[]; hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it) => (
        <li key={it.id} className="flex items-center">
          <Link
            href={it.href}
            tabIndex={hidden ? -1 : undefined}
            className="flex items-baseline gap-1.5 whitespace-nowrap px-4 py-2 text-[13px] text-gray-600 hover:text-[#0C4B75]"
          >
            <span className="font-medium">{it.name}</span>
            <span className="font-bold text-[#0C4B75] [font-variant-numeric:tabular-nums]">{it.price}/mo</span>
          </Link>
          <span className="text-gray-300" aria-hidden>·</span>
        </li>
      ))}
    </ul>
  );
}

export function PriceTicker({ items, verifiedLabel, trackerHref }: { items: TickerItem[]; verifiedLabel: string; trackerHref: string }) {
  const prefix = useNavPrefix();
  const first = (usePathname() || "/").split("/").filter(Boolean)[0];
  const [loop, setLoop] = useState(false);
  useEffect(() => setLoop(true), []);
  const isWeightLoss = prefix === "/weight-loss" || (prefix === "" && !!first && !NOT_WEIGHT_LOSS.has(first));
  if (!isWeightLoss || items.length === 0) return null;

  // ~7s per item: a slow, easy-to-read pace whatever the list length
  // (halved from 3.5s on operator request, Nov 3, 2026).
  const duration = `${Math.max(40, items.length * 7)}s`;

  return (
    <div className="border-b border-gray-200 bg-[#F5F8FB]" role="region" aria-label="Verified GLP-1 starting prices">
      <div className="mx-auto flex max-w-[1320px] items-stretch">
        <p className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 px-3 text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#0C4B75] sm:gap-2 sm:px-4 sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          Verified prices
          {/* Mobile shows the label alone; the disclosure bar above carries the commission note there. */}
          <span className="hidden font-semibold normal-case tracking-normal text-gray-500 sm:inline">· we may earn a commission</span>
        </p>
        <div className="price-ticker relative min-w-0 flex-1 overflow-hidden motion-reduce:overflow-x-auto">
          <div
            className={`price-ticker-track flex w-max ${loop ? "is-looping" : ""}`}
            style={{ ["--ticker-duration" as string]: duration }}
          >
            <Items items={items} />
            {loop && <Items items={items} hidden />}
          </div>
          {/* Edge fades */}
          <span className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#F5F8FB] to-transparent" aria-hidden />
          <span className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#F5F8FB] to-transparent" aria-hidden />
        </div>
        <Link
          href={trackerHref}
          className="relative flex shrink-0 items-center gap-1 border-l border-gray-200 px-3 text-[12px] font-semibold text-[#0C4B75] hover:underline sm:px-4"
        >
          <span className="hidden md:inline">{verifiedLabel}</span>
          <span className="sr-only md:hidden">All verified prices</span>
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
