---
name: article-writing
description: How to write a Treatments Hub article that beats what ranks: structure, file template for each vertical, registration, image, provider blocks, schema and the SEO/AEO checklist. Use for every new article or major refresh.
---

# Writing an article

Load `house-rules` first. Inputs: a brief (`ops/briefs/`) and a research file (`ops/research/`). Every number in the article must exist in the research file or in an already-verified repo citation.

## 1. The shape that wins
1. **Short answer first.** Open with `<div class="qa"><strong>The short answer</strong>…</div>`: the direct answer in under 80 words, with the single strongest number and its source.
2. **One table per comparison.** Anything with three or more comparable numbers becomes a table with a named metric per column and the source line under it. Tables are what AI engines quote.
3. **Question headings.** Headings that end with "?" are emitted as FAQ schema automatically. Use the real questions people type (at least two, ideally five).
4. **Numbers with provenance.** Each figure names the document, its revision date and the read date the first time it appears ("Viagra label, revised 12/2017, read Nov 15, 2026").
5. **The edge section.** One section the competitors do not have: a conversion table, a time-point correction, a cost-per-usable-dose calculation, a labelled side-by-side.
6. **Honest limits.** A short "what we could not verify" or "what this page is not" line builds more trust than a confident gap.
7. **Internal links.** Three or more to sibling articles plus the relevant review or comparison page, in prose, with descriptive anchors.
8. **Close with where providers fit**, factually; the provider block renders by code (see §4).

Length follows the question: 1,800 to 3,500 words is typical. Short sentences, US English, no em-dashes, no hype adjectives, "not FDA-approved" wherever compounded products appear.

## 2. File templates
**Weight loss** (`src/data/<slug>.ts`, registered in `src/data/articles.ts`):
```ts
import type { Article } from "./articles";
const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
const S = { label: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=…" };
export const mySlugArticle: Article = {
  slug: "my-slug",
  title: "Title Under 60 Characters (2026)",
  description: "120 to 160 characters, the searcher's question answered with one number.",
  category: "Guide", readTime: "12 min read",
  publishedAt: "YYYY-MM-DD", updatedAt: "YYYY-MM-DD",
  heroColor: "#EEF3F8", author: "Treatments Hub Research Team",
  keyTakeaways: ["Four takeaways, each with a number and its source."],
  sections: [{ heading: "Question people type?", body: `<div class="qa"><strong>The short answer</strong>…</div><p>…</p>` }],
};
```
Then add the import and the entry in the `articles` array in `src/data/articles.ts`.

**Other verticals** (`src/lib/seeds/<vertical>-articles/<slug>.ts`, type `ArticleData` from `../../config`), registered in the vertical seed's `articles: [...]` list (for ED: `src/lib/seeds/ed.ts`). Use `heroColor` from a sibling article in that vertical.

HTML allowed in `body`: `p, strong, em, ul, ol, li, table/thead/tbody/tr/th/td, a, div.qa`. No inline styles.

## 3. Image
```bash
NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt node scripts/article-image.mjs \
  --slug <slug> --data <path-to-article-file> \
  --scene "a specific, varied scene with an AI-generated person of any body size, no text, no before/after" \
  --alt "descriptive alt text"
```
It writes `public/article-images/<slug>.webp` and inserts `image`/`imageAlt`. Open the image and check it. Regenerate the dims table afterwards (see `shipping`).

## 4. Provider blocks
- Weight-loss guides render "Our top 2 picks" after section 1 automatically, except `-cost` and `is-*-legit` slugs.
- Other verticals render the vertical's top 3 after section 2; to show a top-2 block instead, add the slug to `TOP_TWO_SLUGS_BY_VERTICAL` in `src/components/pages/article-page.tsx`.
- Legit and cost pages have their own blocks; do not add CTAs in the body HTML.

## 5. Pre-PR checklist
- Title 50 to 60 chars, description 120 to 160, one H1 (the title), no heading skips, at least two "?" headings.
- Every table cell traceable; every external link opens and says what the text claims.
- `rel="noopener noreferrer"` on external links; internal links relative.
- Schema check in the rendered HTML: Article with `image`, `datePublished`, author as Organization; FAQPage present.
- Then follow `shipping` (build, both screenshots, audit PASS, PR). Hand to Felix.
