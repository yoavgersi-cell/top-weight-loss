# Code-authoritative merge for stale stored copy  ·  2026-11-26 · Felix · branch claude/felix-code-authoritative-1126
Status: ready for operator review. Not merged.

## Files here
- before.public-config.json, before.crawl.json: LIVE snapshot taken 2026-11-26 (https://www.treatmentshub.com/api/public-config; 477 sitemap URLs: status, title, meta description, canonical, h1, words, sponsored-link count, internal-link count, external-link count). This is the rollback reference and a copy of what the store contributes today.
- after.public-config.json, after.crawl.json: local production build of this branch.
- before-simulated-local.crawl.json: local build of main run against the same data (control).
- diff-affected-pages.tsv: per affected page, before/after words, links, titles.

## How it was tested without the blob
The raw blob is unreachable here (proxy blocks the blob host, no token). The CMS writes the merged config into the blob, so the live /api/public-config JSON is the stored copy. A local stand-in for the Blob API (env VERCEL_BLOB_API_URL, throw-away token) served that JSON as site-config.json; the unmodified main build against it reproduced live byte for byte (config JSON identical, crawl identical on all 477 URLs), then this branch was built and crawled the same way. Caveat: if the real blob differs from the merged JSON in a field the merge overwrites anyway, the result is the same; if it holds a stored-only field not exposed by the config API, it is preserved by construction (codeOverStored starts from the stored item).

## The change (src/lib/config-store.ts only, +~118 lines, nothing removed)
codeOverStored(stored, code): start from the stored item, overwrite a field only when the code value is non-empty (not "", "#", [], {}, null). author and publishedAt always stay as stored. Applied only to explicit slug lists: 40 articles, 5 landing pages, 18 battles (the 41/7/18 stored-older set, minus the exclusions below). updatedAt is the newer of the two. Everything else is untouched: providers (affiliate URLs, logos, images), hero, faqs, quiz, testimonials, sidebars, reviews, the 5 store-only articles, the 16 store-only battles (incl. noom-vs-found, noom-vs-shed, shed-vs-sprout), uploaded images.

## Result, 477 URLs, control vs branch
- Status changes 0. Canonical changes 0. H1 changes 0.
- Sponsored (affiliate) link count drops 0 on any page (714 on the affected pages before and after). Internal link drops 0. External link drops 0.
- Articles (40): 92,237 -> 103,205 words, every article +60 or more, 6 titles and 15 meta descriptions change to the code copy.
- Landing pages (5): +84 to +141 words each, 5 titles and 1 description change to the #672 versions.
- Battles (17 in the sitemap; found-vs-embody is a 301 alias): net +153 words; three lose a few words (sprout-vs-wellmedr -25, embody-vs-sprout -11, altrx-vs-sprout -8, wording tightened, not content removed). No battle title tag changes; the footer "Popular Comparisons" anchor on every page shows the code label (e.g. "altRx vs embody").
- Non-affected pages: only the footer anchor text and related-card titles/descriptions that point at the changed pages (largest: /weight-loss/articles index -43 words of card text on 5,261).

## Kept store-served (would get worse), for the operator
1. Landing pages semaglutide and tirzepatide: stored copy renders the shared ~2,000-word editorial block; code copy swaps it for ~300 words (-2,000 words, -18 internal links, -5 external). Needs Sloane to carry the block into code first. Option: a title-only overlay (the #672 title).
2. Article best-noom-alternatives: its stored copy is the only content page linking to the store-only battles noom-vs-found and noom-vs-shed; the code copy drops both links, leaving them without a content inbound link. Needs those links re-added in code (or the battles ported/redirected) first.
3. Not in scope, still store-owned: 4 reviews (noom, ro, skinnyrx, wellorithm), site-level hero, testimonials, faqs, quiz.

## Open items
- Author spelling ("TreatmentsHub Staff" stored vs "Treatments Hub Staff" code) left as stored on 5 articles; house rule says author should be the research team organization; operator decision.
- /admin password default and public default in code: still open from the plan.
- After deploy: check the Vercel deploy, IndexNow ping, and spot check 5 pages in GSC URL inspection.
