# Follow-up: code copy where stored copy shadows welludr price edits  ·  2026-11-26 · Felix
Branch claude/felix-code-newer-followup-1126 (= origin/main 85899cf + this evidence). Not merged. No source change: see result.

## Result: nothing to add
The 8 candidate articles and reviews/collective are NOT shadowed by the stored copy. The live site already serves the code copy for all of them.
- Fresh live snapshot after #675 (followup.live.public-config.json, followup.live.crawl.json, 477 URLs). Stand-in Blob API serving it: unmodified main reproduces live exactly (config JSON byte-identical, 0 differences on 477 URLs).
- Proof, per slug: the live article equals the code-only article (blob unreachable, same normalisation) on every field, today (8/8 NONE) and, using the pre-#675 snapshot against the pre-#675 code (8f382dd), before #675 as well (8/8 NONE). The pre-#675 live copy held $41/$71 only because the code then held $41/$71; it moved to $39/$69 with the code. These slugs are not in the stored blob (they come from the "new seed articles append" path), so the stored copy cannot shadow them.
- The earlier "stored copy shadows 8 articles + collective" note in README.md came from the stand-in itself: serving the pre-#675 live JSON as the blob made code-served items look stored. It was an artefact, not a finding.
- Test of adding the 8 slugs anyway: branch build vs control, 477 URLs: 0 status, canonical, H1, title, description, word, affiliate, internal or external link changes. A pure no-op, so not committed.
- reviews/collective: live review equals the code review on every field; no hook needed.

## What really differs from code on live (live vs code-only, all collections)
- Articles: best-noom-alternatives (kept store-served on purpose, noom battle links); author spelling only on is-embody-legit, embody-cost, embody-alternatives, menopause-weight-gain, ozempic-hair-loss (kept as stored by design); 5 store-only articles.
- Reviews: noom, ro, wellorithm, skinnyrx (store-owned, as before).
- Landing pages: semaglutide, tirzepatide (kept store-served, editorial block).
- Battles: 16 store-only.

## Self-consistency scan (followup.selfconsistency-scan.txt)
Pages with welludr $39/$69 and an undated $41/$71/$492/$852 (no nearby "previously/was/before/date"): 6 pages, none store-served; all come from code files, outside this task's scope (slug lists only).
1. /weight-loss/healthrx-vs-embody-vs-wellmedr: src/lib/three-way.ts ("$41 rate locks on a 12-month plan", table "$41/mo (12-month plan)").
2. /weight-loss/reviews/wellmedr: src/components/pages/review-page.tsx:621 ("$41/mo on 12-month plans - for life") plus three-way card titles.
3. /weight-loss/articles/embody-vs-ro-weight-loss: code-authoritative article, $71 and $41/12-month framing in a dated Oct comparison; needs its date or update.
4. /weight-loss/articles/glp1-weight-loss-medications-guide: "$71 (welludr, sale)".
5. /weight-loss/reviews/medvi and 6. /weight-loss/reviews: only the three-way card title "embody vs Medvi vs welludr: $49, $99 or $41?" (three-way.ts:208, also the metaTitle line 209, 180).
No $492 or $852 left undated on any page that also shows $39/$69.

## Checks
tsc 0 errors, next build ok, seo-audit PASS (0 fails, 2 warns, 477 pages).
