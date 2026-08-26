import { ShieldCheck } from "lucide-react";

// Green "Licensed US telehealth" pill. True for every ranked provider in the
// telehealth verticals - a licensed-prescriber gate is a condition of being
// listed at all (see /how-we-rank). Callers must NOT render it for the
// hearing-aids vertical, whose providers sell OTC devices, not telehealth care.
export function LicensedTelehealthBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-700 ${className}`.trim()}
    >
      <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
      Licensed US telehealth
    </span>
  );
}
