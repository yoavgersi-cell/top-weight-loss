import { ShieldPlus, WalletCards, CircleSlash } from "lucide-react";

// ───── Verified insurance-coverage badges ─────
// Insurance is the single biggest cost factor in care-based verticals, so it
// earns a dedicated per-provider badge. Entries exist ONLY for providers whose
// insurance stance we verified from operator screenshots of the provider's own
// site - a provider absent from this registry renders no badge (unknown is
// not a status we invent). Tones:
//   covered - bills through insurance / broadly accepted
//   partial - insurance or pre-tax money applies to part of the offering
//   none    - explicitly does not accept insurance (still worth surfacing:
//             it's the honest answer to the first question buyers ask)
type InsuranceTone = "covered" | "partial" | "none";

const INSURANCE_COVERAGE: Record<string, { label: string; tone: InsuranceTone }> = {
  // online-therapy (verified Aug 2026)
  talkspace: { label: "Insurance & EAPs accepted", tone: "covered" },
  talkiatry: { label: "In-network insurance billing", tone: "covered" },
  headspace: { label: "Therapy accepts insurance · HSA/FSA", tone: "partial" },
  betterhelp: { label: "No insurance · financial aid available", tone: "none" },
  // hrt (verified Aug 2026)
  midi: { label: "Insurance accepted (many plans)", tone: "covered" },
  winona: { label: "Cash-pay · FSA/HSA eligible", tone: "partial" },
  nurx: { label: "HSA/FSA accepted", tone: "partial" },
};

const TONE_STYLES: Record<InsuranceTone, string> = {
  covered: "border-sky-200 bg-sky-50 text-sky-700",
  partial: "border-indigo-200 bg-indigo-50 text-indigo-700",
  none: "border-gray-200 bg-gray-50 text-gray-600",
};

export const hasInsuranceBadge = (providerId: string): boolean => providerId in INSURANCE_COVERAGE;

export function InsuranceBadge({ providerId, className = "" }: { providerId: string; className?: string }) {
  const entry = INSURANCE_COVERAGE[providerId];
  if (!entry) return null;
  const Icon = entry.tone === "covered" ? ShieldPlus : entry.tone === "partial" ? WalletCards : CircleSlash;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-semibold ${TONE_STYLES[entry.tone]} ${className}`.trim()}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      {entry.label}
    </span>
  );
}
