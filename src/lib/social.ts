// ───── Treatments Hub's own social profiles ─────
// One list, used by the Organization schema (sameAs) in the root layout and the
// About page, the footer's Company column and its icon row, and the About
// page's "Follow" strip. Add a profile here and every surface picks it up.
// Operator-supplied: LinkedIn (Oct 2026), Instagram (Nov 12, 2026).

export type SocialProfile = { id: "linkedin" | "instagram"; label: string; href: string; handle: string };

export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/treatmentshub", handle: "@treatmentshub" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/treatments-hub", handle: "Treatments Hub" },
];

/** sameAs list for Organization schema. */
export const ORG_SAME_AS: string[] = SOCIAL_PROFILES.map((p) => p.href);
