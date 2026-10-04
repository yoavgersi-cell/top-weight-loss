// ───── Medical reviewers ─────
// Code-authoritative reviewer profiles and the page review log. Lives in code,
// not the CMS blob, so a CMS save can never blank a byline, and so the same
// Person entity (same @id) is emitted on every page that names the reviewer.
//
// House rules:
//   - Every credential, degree and employer is as supplied by the reviewer.
//     Nothing is added, upgraded or inferred. No credential letters that the
//     person does not hold.
//   - A page says "reviewed" and emits `reviewedBy` / `lastReviewed` ONLY when
//     REVIEW_LOG has an entry for it. Pages without an entry name the site's
//     medical reviewer as staff - never as having reviewed that page.
//   - The byline wording is "Reviewed for medical accuracy by", not "Medically
//     reviewed by a doctor": our reviewer is a medical laboratory scientist
//     with an MPH, and the wording must not imply a prescribing clinician.

export const HUB_ORIGIN = "https://www.treatmentshub.com";

export interface ReviewerCredential {
  title: string;
  issuer: string;
  detail?: string;
}

export interface ReviewerEducation {
  degree: string;
  school: string;
  location?: string;
  detail: string;
}

export interface ReviewerExperienceGroup {
  area: string;
  items: string[];
}

export interface ReviewerWork {
  title: string;
  outlet: string;
  url: string;
}

export interface Reviewer {
  slug: string;
  /** Plain name, no suffixes. */
  name: string;
  /** Post-nominal letters, in display order. */
  credentials: string[];
  /** Role as shown in bylines and schema jobTitle. */
  jobTitle: string;
  /** One line under the name: what the person is, in plain words. */
  headline: string;
  /** 40-60 words, third person. */
  shortBio: string;
  /** Long bio, one paragraph per entry. */
  longBio: string[];
  image: { src: string; webp: string; thumb: string; width: number; height: number };
  licensure: ReviewerCredential[];
  education: ReviewerEducation[];
  experience: ReviewerExperienceGroup[];
  specialties: string[];
  selectedWork: ReviewerWork[];
  /** Public profile URLs (LinkedIn etc.). Only real, supplied URLs. */
  sameAs: string[];
  linkedin?: string;
  /** What this reviewer checks on a page, in the reviewer's scope statement. */
  scope: string;
  /** Verticals this reviewer covers. */
  verticals: string[];
  /** Month the reviewer joined, YYYY-MM. */
  since: string;
}

export const REVIEWERS: Reviewer[] = [
  {
    slug: "francheska-capistrano",
    name: "Francheska Capistrano",
    credentials: ["RMT", "MPH"],
    jobTitle: "Medical Content Reviewer",
    headline: "Licensed Medical Laboratory Scientist (Registered Medical Technologist) and Master of Public Health graduate",
    shortBio:
      "Francheska Capistrano is a licensed Medical Laboratory Scientist with a Master of Public Health degree. She has coordinated international clinical trials, with a focus on protocol compliance, clinical documentation and data review, and writes and reviews evidence-based health content for patient and physician audiences.",
    longBio: [
      "Francheska Capistrano is a licensed Medical Laboratory Scientist (Registered Medical Technologist) with a Master of Public Health degree. She has experience coordinating international clinical trials, with a focus on protocol compliance, clinical documentation, and data review.",
      "Her medical writing experience includes evidence-based health articles, patient education materials, research summaries, and clinical research content. As a medical content reviewer, she combines scientific accuracy, critical appraisal, and clear communication to ensure content is credible and easy to understand.",
      "At Treatments Hub she reviews the medical and scientific statements in our guides, reviews and comparisons: how GLP-1 and other treatments work, what the cited trials and regulators actually say, and whether the terminology and claims match the evidence. She does not choose providers, set prices or rankings, or take part in commercial partnerships.",
    ],
    image: {
      src: "/reviewers/francheska-capistrano.jpg",
      webp: "/reviewers/francheska-capistrano.webp",
      thumb: "/reviewers/francheska-capistrano-160.webp",
      width: 800,
      height: 800,
    },
    licensure: [
      {
        title: "Licensed Medical Laboratory Scientist (Registered Medical Technologist)",
        issuer: "Professional licensure, Philippines",
        detail: "Formal training in clinical laboratory medicine, diagnostic testing, microbiology, hematology, immunology, clinical chemistry, pathology and disease processes.",
      },
    ],
    education: [
      {
        degree: "Master of Public Health (MPH)",
        school: "University of Essex",
        location: "United Kingdom",
        detail: "Advanced training in epidemiology, public health research, health promotion, biostatistics, disease prevention and evidence-based healthcare practice.",
      },
      {
        degree: "Bachelor of Science in Medical Laboratory Science",
        school: "Saint Louis University",
        location: "Baguio City, Philippines",
        detail: "Clinical laboratory medicine, diagnostic testing, microbiology, hematology, immunology, clinical chemistry and pathology.",
      },
    ],
    experience: [
      {
        area: "Clinical research",
        items: [
          "Supporting international clinical trials: protocol compliance monitoring, clinical documentation review, source data verification and data quality checks",
          "Regulatory and ethics documentation support; clinical data review and reconciliation",
          "Good Clinical Practice (GCP)-aligned research processes",
        ],
      },
      {
        area: "Medical writing and content review",
        items: [
          "Evidence-based health articles, patient education materials and clinical research summaries",
          "Medical blogs, healthcare content and SEO/AEO medical content",
          "Physician- and patient-facing educational materials",
        ],
      },
      {
        area: "Medical fact-checking and evidence appraisal",
        items: [
          "Evaluating health information for scientific accuracy, evidence alignment, clinical relevance and correct terminology",
          "Reviewing scientific literature, clinical studies and medical references to assess evidence quality and identify unsupported or outdated claims",
          "Consistency with published research and clinical guidelines; clear communication of complex concepts for general audiences",
        ],
      },
      {
        area: "Healthcare and digital health",
        items: [
          "Work with clinical research teams, telehealth platforms, digital health companies and healthcare content teams",
          "Collaboration with physicians, clinical researchers, healthcare providers, research coordinators and medical content teams",
        ],
      },
    ],
    specialties: [
      "Clinical trial coordination and GCP",
      "Clinical laboratory medicine",
      "Epidemiology and biostatistics",
      "Evidence appraisal and medical fact-checking",
      "Patient education and health communication",
    ],
    selectedWork: [
      { title: "The gap your recruitment forecast can't see", outlet: "83bar", url: "https://www.83bar.com/the-gap-your-recruitment-forecast-cant-see/" },
      { title: "Can AI accelerate patient recruitment?", outlet: "83bar", url: "https://www.83bar.com/can-ai-accelerate-patient-recruitment/" },
      { title: "Why are so many referrals lost before screening really begins?", outlet: "Antidote", url: "https://www.antidote.me/blog/why-are-so-many-referrals-lost-before-screening-really-begins" },
      { title: "Neurology enrollment: why sites miss dates even when willing patients are willing to enroll", outlet: "Antidote", url: "https://www.antidote.me/blog/neurology-enrollment-why-sites-miss-dates-even-if-willing-patients-are-willing-to-enroll" },
    ],
    sameAs: ["https://www.linkedin.com/in/francheskacapistrano/"],
    linkedin: "https://www.linkedin.com/in/francheskacapistrano/",
    scope:
      "Reviews the medical and scientific statements on a page: mechanism of action, clinical-trial figures, regulatory status, contraindications, side effects and terminology. Does not review prices, rankings, partner selection or provider descriptions, which are editorial.",
    verticals: ["weight-loss", "hair-loss", "trt", "hrt", "online-therapy"],
    since: "2026-10",
  },
];

/** The reviewer named sitewide as the site's medical reviewer. */
export const SITE_REVIEWER_SLUG = "francheska-capistrano";

// ───── Review log ─────
// Keyed by the hub's content path (e.g. "/weight-loss/articles/is-medvi-legit").
// An entry means the named reviewer actually reviewed that page on that date.
// Add entries only when a review happened; never backfill dates.
export interface PageReview {
  reviewer: string; // Reviewer.slug
  reviewedAt: string; // YYYY-MM-DD
}

export const REVIEW_LOG: Record<string, PageReview> = {};

export function getReviewer(slug: string = SITE_REVIEWER_SLUG): Reviewer | undefined {
  return REVIEWERS.find((r) => r.slug === slug);
}

export function reviewerDisplayName(r: Reviewer): string {
  return r.credentials.length ? `${r.name}, ${r.credentials.join(", ")}` : r.name;
}

export function reviewerUrl(r: Reviewer): string {
  return `${HUB_ORIGIN}/reviewers/${r.slug}`;
}

export function reviewerPath(r: Reviewer): string {
  return `/reviewers/${r.slug}`;
}

/** Normalize a path for the log: strip origin, query, trailing slash. */
function logKey(path: string): string {
  let p = path.replace(/^https?:\/\/[^/]+/, "").split("?")[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

export function getPageReview(path: string): (PageReview & { reviewerProfile: Reviewer }) | null {
  const entry = REVIEW_LOG[logKey(path)];
  if (!entry) return null;
  const reviewerProfile = getReviewer(entry.reviewer);
  if (!reviewerProfile) return null;
  return { ...entry, reviewerProfile };
}

/** Schema.org Person for a reviewer, with a stable @id reused on every page. */
export function reviewerPersonSchema(r: Reviewer) {
  const schema: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${reviewerUrl(r)}#person`,
    name: r.name,
    honorificSuffix: r.credentials.join(", "),
    jobTitle: r.jobTitle,
    description: r.shortBio,
    url: reviewerUrl(r),
    image: `${HUB_ORIGIN}${r.image.src}`,
    worksFor: { "@type": "Organization", name: "Treatments Hub", url: HUB_ORIGIN },
    knowsAbout: r.specialties,
    alumniOf: r.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
    hasCredential: [
      ...r.licensure.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: c.title,
        recognizedBy: { "@type": "Organization", name: c.issuer },
      })),
      ...r.education.map((e) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: e.degree,
        recognizedBy: { "@type": "CollegeOrUniversity", name: e.school },
      })),
    ],
  };
  if (r.sameAs.length) schema.sameAs = r.sameAs;
  return schema;
}

/**
 * Schema fragment for a content page: `reviewedBy` + `lastReviewed` when the
 * page is in the review log, nothing otherwise. Spread into Article/WebPage.
 */
export function pageReviewSchema(path: string): Record<string, unknown> {
  const review = getPageReview(path);
  if (!review) return {};
  return {
    reviewedBy: { "@id": `${reviewerUrl(review.reviewerProfile)}#person` },
    lastReviewed: review.reviewedAt,
  };
}
