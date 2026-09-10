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
  "hair-loss": [
    {
      label: "Finasteride - drug information",
      publisher: "MedlinePlus, U.S. National Library of Medicine (NIH)",
      href: "https://medlineplus.gov/druginfo/meds/a698016.html",
    },
    {
      label: "Minoxidil Topical - drug information",
      publisher: "MedlinePlus, U.S. National Library of Medicine (NIH)",
      href: "https://medlineplus.gov/druginfo/meds/a689003.html",
    },
    {
      label: "Hair Loss: Diagnosis and Treatment",
      publisher: "American Academy of Dermatology (AAD)",
      href: "https://www.aad.org/public/diseases/hair-loss",
    },
    {
      label: "Androgenetic Alopecia (pattern hair loss) - overview",
      publisher: "MedlinePlus Genetics, U.S. National Library of Medicine (NIH)",
      href: "https://medlineplus.gov/genetics/condition/androgenetic-alopecia/",
    },
  ],
  trt: [
    {
      label: "Testosterone Therapy in Men With Hypogonadism - Clinical Practice Guideline",
      publisher: "The Endocrine Society, 2018",
      href: "https://www.endocrine.org/clinical-practice-guidelines/testosterone-therapy",
    },
    {
      label: "FDA Drug Safety Communication: caution about using testosterone products for low testosterone",
      publisher: "U.S. Food & Drug Administration",
      href: "https://www.fda.gov/drugs/drug-safety-and-availability/fda-drug-safety-communication-fda-cautions-about-using-testosterone-products-low-testosterone-due",
    },
    {
      label: "Testosterone Levels Test",
      publisher: "MedlinePlus, U.S. National Library of Medicine (NIH)",
      href: "https://medlineplus.gov/lab-tests/testosterone-levels-test/",
    },
    {
      label: "Cardiovascular Safety of Testosterone-Replacement Therapy (TRAVERSE trial)",
      publisher: "New England Journal of Medicine, 2023",
      href: "https://doi.org/10.1056/NEJMoa2215025",
    },
  ],
  hrt: [
    {
      label: "The 2022 Hormone Therapy Position Statement of The North American Menopause Society",
      publisher: "The Menopause Society (NAMS)",
      href: "https://www.menopause.org/professional-resources/position-statements",
    },
    {
      label: "Hormone Therapy - patient guidance",
      publisher: "American College of Obstetricians and Gynecologists (ACOG)",
      href: "https://www.acog.org/womens-health/faqs/hormone-therapy",
    },
    {
      label: "Menopause: Medicines to Help You",
      publisher: "U.S. Food & Drug Administration",
      href: "https://www.fda.gov/consumers/free-publications-women/menopause-medicines-help-you",
    },
    {
      label: "Women's Health Initiative (WHI) - study overview",
      publisher: "National Heart, Lung, and Blood Institute (NIH)",
      href: "https://www.nhlbi.nih.gov/science/womens-health-initiative-whi",
    },
  ],
  "online-therapy": [
    {
      label: "Psychotherapies - overview of evidence-based approaches",
      publisher: "National Institute of Mental Health (NIMH), NIH",
      href: "https://www.nimh.nih.gov/health/topics/psychotherapies",
    },
    {
      label: "Understanding psychotherapy and how it works",
      publisher: "American Psychological Association (APA)",
      href: "https://www.apa.org/topics/psychotherapy/understanding",
    },
    {
      label: "Depression - symptoms, treatments and evidence",
      publisher: "National Institute of Mental Health (NIMH), NIH",
      href: "https://www.nimh.nih.gov/health/topics/depression",
    },
    {
      label: "SAMHSA National Helpline (free, confidential, 24/7 treatment referral)",
      publisher: "Substance Abuse and Mental Health Services Administration",
      href: "https://www.samhsa.gov/find-help/national-helpline",
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
        Pricing and plan details come from each provider&apos;s published information. This content
        is for information only and is not medical advice - always consult a licensed clinician
        before starting treatment.
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

// One-line affiliate disclosure under the byline, above the first affiliate
// link (FTC: clear, conspicuous, before the links). Deliberately compact - the
// "not medical advice" disclaimer lives once at the bottom of these pages
// (SourcesMethodology footer, or the MedicalSources intro below) instead of
// being repeated here.
export function TrustDisclosure({ disclaimerHref }: { disclaimerHref: string }) {
  return (
    <p className="mt-2.5 max-w-[720px] text-[11.5px] leading-[1.55] text-gray-400 sm:mt-3 sm:text-[12px]">
      We may earn a commission from links on this page - it never affects our rankings (
      <a href={disclaimerHref} className="font-medium text-[#0C4B75] hover:underline">
        how we stay objective
      </a>
      ).
    </p>
  );
}
