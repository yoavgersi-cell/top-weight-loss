import type { ArticleData } from "../config";
import { edPillarSectionsA } from "./ed-pillar-2026-10/sections-a";
import { edPillarSectionsB } from "./ed-pillar-2026-10/sections-b";
import { edPillarSectionsC } from "./ed-pillar-2026-10/sections-c";

// ───── Pillar guide: erectile dysfunction treatment (2026) ─────
// The long-form reference for the ED vertical, written for treatmentshub.com
// on Oct 27, 2026. Every clinical statement links a primary source inline
// with the date it was checked (the AUA guideline, the Princeton IV
// consensus, NIDDK pages, MedlinePlus drug monographs, the Viagra label and
// FDA consumer pages); figures from studies are reported as those studies
// reported them and named. No prices appear - cost questions point to the
// dated ED cost index - and no rating, statistic or claim is ours.
//
// Sections live in ./ed-pillar-2026-10/ (three files). The question-form
// headings near the end double as the FAQ the article template turns into
// FAQPage schema.

export const ED_PILLAR_2026_10: ArticleData = {
  slug: "erectile-dysfunction-treatment-complete-guide",
  title: "Erectile Dysfunction Treatment in 2026: The Complete Guide",
  description:
    "What erectile dysfunction is, how common it is, every treatment from the four PDE5 pills to implants, what to do when pills fail, and how to get treated online.",
  category: "Guide",
  readTime: "50 min read",
  publishedAt: "2026-10-27",
  updatedAt: "2026-10-27",
  heroColor: "#102A43",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Erectile dysfunction (ED) is the persistent inability to get or keep an erection firm enough for sex. The Massachusetts Male Aging Study found some degree of it in 52% of men aged 40 to 70, and the NIDDK is explicit that it is not an inevitable part of ageing.",
    "The four FDA-approved oral PDE5 inhibitors (sildenafil, tadalafil, vardenafil, avanafil) are the usual first treatment; the AUA guideline gives informing men about them its strongest recommendation. Trials report improved erections in roughly 65% to 82% of men on sildenafil against 18% to 26% on placebo.",
    "The one dangerous interaction is with nitrates (and riociguat), which the Viagra label lists as contraindications; alpha-blockers call for caution. A sudden loss of vision or hearing, or an erection over four hours, means stop and seek care.",
    "ED is an independent predictor of cardiac events: the Princeton IV consensus recommends that sexual-function history be part of every man's cardiovascular evaluation, and that lifestyle change comes first because it improves both.",
    "When pills fail, the usual reasons are no stimulation, wrong timing or an untitrated dose. After that, alprostadil injections, the urethral pellet, vacuum devices and implants work for most men the pills do not. Shockwave therapy is investigational and PRP experimental under the AUA guideline.",
  ],
  sections: [...edPillarSectionsA, ...edPillarSectionsB, ...edPillarSectionsC],
};
