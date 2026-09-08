import Link from "next/link";

// UK-region chrome. Deliberately minimal and compliance-safe: it never carries
// the US weight-loss drug links (Cheapest GLP-1, Ozempic Alternatives, etc.) or
// any medicine reference. Service-level wording only.

export function UkHeader() {
  return (
    <header className="border-b-2 border-[#D5D5D5] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/uk/weight-loss" className="flex items-center gap-2">
          <span className="text-[19px] font-extrabold tracking-[-0.02em] text-[#0C4B75]">TreatmentsHub</span>
          <span className="rounded bg-[#0C4B75]/10 px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#0C4B75]">UK</span>
        </Link>
      </div>
    </header>
  );
}

export function UkFooter() {
  return (
    <footer className="mt-auto border-t border-[#E5E5E5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="max-w-[640px] text-[13px] leading-relaxed text-gray-500">
          <span className="font-bold text-[#191919]">TreatmentsHub UK</span> is an independent
          comparison publisher. We compare UK treatment services to help you choose; we are not a
          medical provider, and eligibility and treatment are decided by a licensed clinician.
        </p>
        <div className="mt-6 border-t border-gray-100 pt-5">
          <p className="text-[12px] text-gray-400">
            &copy; {new Date().getFullYear()} TreatmentsHub. All rights reserved. This site is for
            information only and is not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
