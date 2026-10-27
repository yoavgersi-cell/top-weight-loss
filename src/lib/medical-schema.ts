import { pageReviewSchema } from "@/data/reviewers";

// ───── MedicalWebPage schema helpers ─────
// Every content page (article, review, comparison, three-way, keyword landing,
// vertical home) describes its page entity as a schema.org MedicalWebPage
// rather than a plain WebPage, with:
//   - medicalAudience: who the page is written for (patients and the public,
//     not clinicians);
//   - about: the MedicalCondition the vertical's treatments address, with a
//     stable public reference for the entity;
//   - reviewedBy / lastReviewed: only when REVIEW_LOG holds an entry for the
//     page (pageReviewSchema returns {} otherwise - never a fabricated review).
// The Article node that Google's rich results read is kept alongside; this
// node is the page entity it points at via mainEntityOfPage, or the top-level
// node on pages that have no Article. Added Oct 27, 2026.

export const MEDICAL_CONDITION_BY_VERTICAL: Record<string, { name: string; sameAs: string }> = {
  "weight-loss": { name: "Obesity", sameAs: "https://en.wikipedia.org/wiki/Obesity" },
  "hair-loss": { name: "Androgenetic alopecia", sameAs: "https://en.wikipedia.org/wiki/Pattern_hair_loss" },
  trt: { name: "Male hypogonadism", sameAs: "https://en.wikipedia.org/wiki/Hypogonadism" },
  hrt: { name: "Menopause", sameAs: "https://en.wikipedia.org/wiki/Menopause" },
  ed: { name: "Erectile dysfunction", sameAs: "https://en.wikipedia.org/wiki/Erectile_dysfunction" },
  "online-therapy": { name: "Mental disorder", sameAs: "https://en.wikipedia.org/wiki/Mental_disorder" },
  "hearing-aids": { name: "Hearing loss", sameAs: "https://en.wikipedia.org/wiki/Hearing_loss" },
};

export const MEDICAL_AUDIENCE = {
  "@type": "MedicalAudience",
  audienceType: "Patient",
  name: "Patients and the general public comparing treatment options",
} as const;

export function medicalConditionNode(vertical: string) {
  const c = MEDICAL_CONDITION_BY_VERTICAL[vertical];
  return c ? { "@type": "MedicalCondition", name: c.name, sameAs: c.sameAs } : undefined;
}

/**
 * The MedicalWebPage fields shared by every content page. Spread into a
 * top-level node (`{"@context", ...medicalWebPageFields(...)}`) or into the
 * `mainEntityOfPage` of an Article node.
 *
 * @param vertical  the hub vertical the page belongs to
 * @param url       the page's canonical URL (becomes @id)
 * @param reviewPath the content path used as the REVIEW_LOG key
 */
export function medicalWebPageFields(vertical: string, url: string, reviewPath: string) {
  const about = medicalConditionNode(vertical);
  return {
    "@type": "MedicalWebPage",
    "@id": url,
    url,
    medicalAudience: MEDICAL_AUDIENCE,
    ...(about && { about }),
    ...pageReviewSchema(reviewPath),
  };
}
