"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useNavPrefix, navHref } from "@/lib/nav-prefix";
import { TreatmentsHubWordmark } from "@/components/treatments-hub-wordmark";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const prefix = useNavPrefix();

  // Umbrella-brand navigation. "Treatments" points at the hub front door (which
  // exposes the categories); the rest resolve within the current category.
  const nav = [
    { label: "Treatments", href: "/" },
    { label: "Reviews", href: navHref(prefix, "/reviews") },
    { label: "Comparisons", href: `${navHref(prefix, "/articles")}#comparisons` },
    { label: "Guides", href: navHref(prefix, "/articles") },
  ];

  return (
    <header className="border-b-2 border-[#D5D5D5] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Brand — TopWeightLoss on the legacy domain, TreatmentsHub on the hub.
            Only one is shown; the swap is driven by the data-hub attribute. */}
        <Link href={navHref(prefix, "/")} className="legacy-brand flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="TopWeightLoss.io" className="h-[36px] sm:h-[42px] w-auto" />
        </Link>
        <Link href="/" className="hub-brand items-center">
          <TreatmentsHubWordmark />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-7 text-[14px] font-medium text-[#191919]">
          {nav.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-[#0C4B75] transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-[#191919]"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" strokeWidth={1.5} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="sm:hidden border-t border-[#E5E5E5] bg-white px-4 py-3 space-y-3">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-[15px] font-medium text-[#191919] hover:text-[#0C4B75]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
