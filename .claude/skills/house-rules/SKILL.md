---
name: house-rules
description: The standing rules for every agent working on treatmentshub.com (data integrity, medical wording, reviewers, provider fairness, shipping workflow). Load before any content, SEO, QA or social task on this repository.
---

# Treatments Hub house rules

These rules override convenience. Every agent on this repository (Harper, Atlas, Sloane, Felix, Rio) loads them first. When a rule and a task conflict, stop and say so instead of bending the rule.

## 1. Data integrity (non-negotiable)
- Never fabricate prices, Trustpilot ratings, statistics, Reddit or Facebook content, testimonials, or medical claims. Operator-verified data only.
- Every external fact carries a dated, linked primary source (label on DailyMed, FDA page, guideline PDF, journal article, provider's own page) and the date it was read.
- Prices appear only from the verified index (`src/lib/price-index.ts`, `src/lib/ed-price-index.ts`) or from a provider page read and dated. Never from memory.
- No invented social proof, no named customer testimonials, no "medically reviewed" bylines that were not logged.
- If a figure cannot be verified, leave it out and say that it was left out.

## 2. Medical wording
- Compounded medicines: say they are not FDA-approved wherever relevant.
- Semaglutide and tirzepatide trial figures are averages measured at the trial's assessment point (STEP 68 weeks, SURMOUNT 72 weeks), never a universal timeline. Never promise a week when weight loss begins or stops.
- Tirzepatide is a dual GIP/GLP-1 receptor agonist. Name the product and formulation when making an approval claim (Wegovy injection, Wegovy tablets, Zepbound injection).
- Doses increase only under prescriber supervision. Compounded instructions must state mg, concentration and volume; "units" alone is a red flag.
- Nothing on the site is medical advice; say so where a reader could mistake it.

## 3. Reviewers
- Medical reviewers: Francheska Capistrano, RMT, MPH (spelled exactly) and Dr. B. Dolapihilla, MBBS (never "MD", no psychology mention).
- A review date is logged in `src/data/reviewers.ts` only when a review actually happened. Never backfill.
- Only the research team writes: author is "Treatments Hub Research Team" (an Organization in schema, never a Person).

## 4. Providers and commerce
- Do not harm the providers: report complaints factually and in proportion, emphasise verified positives, never editorialise against a partner.
- Affiliate links go through `ProviderCta` (rel="sponsored nofollow"). No link exchanges, no bought links.
- Trustpilot widgets are hidden sitewide (`SHOW_TRUSTPILOT_WIDGETS=false`); the one allowed exception is listed in `TRUSTPILOT_WIDGET_ARTICLE_SLUGS`. Keep Trustpilot out of videos and social content.
- Never publish the operator's private research percentages or Bing/GSC exports verbatim.

## 5. Site conventions
- Read `node_modules/next/dist/docs/` before touching Next.js APIs; this is a modified Next 16.
- Article images: generated with `scripts/article-image.mjs`, varied scenes, AI-generated people of different body sizes, no before/after, no text, no logos; shown in the grid card and floated beside the first section, never in the masthead.
- Don't delete files; add alongside (WebP next to PNG, etc.).
- No sitewide "last updated" floor; dates come from the record that changed.
- No model identifiers in commits, PR bodies, code or content.

## 6. Shipping workflow (every site change)
1. Edit on branch `claude/weight-loss-rifgr-0mgcit`.
2. `npx tsc --noEmit -p .` then `npm run build`.
3. Restart the local server: `pkill -f '^next-server'; (PORT=4201 nohup npm start > server.log 2>&1 &)`.
4. Verify with curl (`-H 'Host: www.treatmentshub.com'`) and Playwright screenshots at 1440px and 390px. Look at them.
5. `AUDIT_BASE=http://localhost:4201 node scripts/seo-audit.mjs` must PASS. For structural changes also run `scripts/deep-seo-audit.mjs`.
6. Commit with the conversation's attribution trailers, push with `--force-with-lease`, open a PR with the standard footer, and follow the agent's merge permission (see each agent file).
7. After merge: `git fetch origin main && git checkout -B claude/weight-loss-rifgr-0mgcit origin/main && git push -u origin claude/weight-loss-rifgr-0mgcit --force-with-lease`.

## 7. Hand-offs
Work passes between agents as files, not chat:
- `ops/briefs/YYYY-MM-DD-<slug>.md` (Harper → Atlas/Sloane)
- `ops/research/<slug>.md` (Atlas → Sloane)
- `ops/qa/<slug>.md` (Felix → operator)
- `ops/social/YYYY-MM-DD-<slug>.md` (Rio → operator)
Each file starts with: date, author agent, status (draft / ready / approved), and the request it answers.

## 8. Language
Answer the operator in the language they used (English or Hebrew). Content on the site is US English.
