import { BookOpen } from "lucide-react";

// Authoritative outgoing citations, per vertical. Every entry is a real,
// verifiable source (FDA pages, peer-reviewed trials via DOI, NIH/MedlinePlus)
// - never invent or approximate a citation. Rendered as a "Sources" section on
// articles, reviews and comparisons so YMYL pages visibly ground their claims.
export interface MedicalSource {
  label: string;
  publisher: string;
  href: string;
}

export const SOURCES_BY_VERTICAL: Record<string, MedicalSource[]> = {
  "weight-loss": [
    {
      label: "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1 trial)",
      publisher: "New England Journal of Medicine, 2021",
      href: "https://doi.org/10.1056/NEJMoa2032183",
    },
    {
      label: "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1 trial)",
      publisher: "New England Journal of Medicine, 2022",
      href: "https://doi.org/10.1056/NEJMoa2206038",
    },
    {
      label: "FDA Approves New Drug Treatment for Chronic Weight Management (semaglutide / Wegovy)",
      publisher: "U.S. Food & Drug Administration, 2021",
      href: "https://www.fda.gov/news-events/press-announcements/fda-approves-new-drug-treatment-chronic-weight-management-first-2014",
    },
    {
      label: "FDA Approves New Medication for Chronic Weight Management (tirzepatide / Zepbound)",
      publisher: "U.S. Food & Drug Administration, 2023",
      href: "https://www.fda.gov/news-events/press-announcements/fda-approves-new-medication-chronic-weight-management",
    },
    {
      label: "FDA's Concerns with Unapproved GLP-1 Drugs Used for Weight Loss",
      publisher: "U.S. Food & Drug Administration",
      href: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
    },
    {
      label: "Human Drug Compounding (503A pharmacy standards)",
      publisher: "U.S. Food & Drug Administration",
      href: "https://www.fda.gov/drugs/human-drug-compounding",
    },
    {
      label: "Semaglutide Injection - drug information",
      publisher: "MedlinePlus, U.S. National Library of Medicine (NIH)",
      href: "https://medlineplus.gov/druginfo/meds/a618008.html",
    },
  ],
};

// Compact citation list for the bottom of YMYL content pages. Renders nothing
// for verticals without a curated source list yet.
export function MedicalSources({ vertical }: { vertical: string }) {
  const sources = SOURCES_BY_VERTICAL[vertical];
  if (!sources || sources.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-[#0C4B75]" strokeWidth={2} />
        <h2 className="text-[15px] font-bold uppercase tracking-[0.05em] text-[#191919]">
          Sources &amp; medical references
        </h2>
      </div>
      <p className="mb-4 text-[13px] leading-relaxed text-gray-500">
        Treatment facts on this page are grounded in regulatory guidance and peer-reviewed research.
        Pricing and plan details come from each provider&apos;s published information.
      </p>
      <ol className="space-y-2">
        {sources.map((s, i) => (
          <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed">
            <span className="shrink-0 font-semibold text-gray-300">{i + 1}.</span>
            <span className="text-gray-600">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#0C4B75] underline underline-offset-2 hover:text-[#093d61]"
              >
                {s.label}
              </a>{" "}
              <span className="text-gray-400">- {s.publisher}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

// One-line affiliate + medical disclosure for the top of review/comparison
// pages: transparent about compensation, explicit that nothing here is medical
// advice. Sits under the byline, above the content.
export function TrustDisclosure({ disclaimerHref }: { disclaimerHref: string }) {
  return (
    <p className="mt-2.5 max-w-[720px] rounded-lg bg-gray-50 px-3 py-2 text-[11.5px] leading-[1.55] text-gray-500 sm:mt-3 sm:px-3.5 sm:py-2.5 sm:text-[12.5px] sm:leading-relaxed">
      We may earn a commission when you visit providers through links on this page - it never
      affects our rankings (
      <a href={disclaimerHref} className="font-medium text-[#0C4B75] hover:underline">
        how we stay objective
      </a>
      ). This content is for information only and is not medical advice - always consult a licensed
      clinician before starting treatment.
    </p>
  );
}
