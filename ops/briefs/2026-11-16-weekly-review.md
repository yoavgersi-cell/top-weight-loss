# Weekly SEO review, 2026-11-16

- Date: 2026-11-16 · Author: Cleo · Status: ready
- Answers: operator request for the weekly review ("SEO pro mindset"), windows Nov 2 to 13 (A) vs Oct 19 to Nov 1 (B).
- Data: GSC exports for both properties (via Windsor, pulled by Dashiell 2026-11-16; GSC lags two days, last day Nov 13); Bing Webmaster queries for www.treatmentshub.com, Oct 19 to Nov 15. Figures below are rounded aggregates of a private export; the row-level file is not committed.
- Not connected this session: GSC and Bing live connectors, GA4, Bing for the legacy host, GSC query-level for the legacy host, Copilot/AI-citation export. No estimates made for any of them.
- Ahrefs: Free plan (0 workspace units; API key cap 200,000, usage 0, reset Nov 18). Only `public-domain-rating-free` answers. DR read 2026-11-16: treatmentshub.com 8, topweightloss.io 0, wellmedr.com 28, ro.co 77, healthline.com 92. No keyword, SERP or Brand Radar data available; none estimated.

## Three actions this week (ranked, one line each)
1. Felix: verify the topweightloss.io move end to end from outside this sandbox (section 1 checklist). Expected effect: the only lever that moves Google clicks this quarter; the legacy host still carries roughly 50x the hub's impressions and about 3,400 of them in window A.
2. Felix (one-line code) then Sloane: add `welludr` and `is-welludr-legit` as slug aliases to `/weight-loss/reviews/wellmedr` and `/weight-loss/articles/is-wellmedr-legit`; both welludr URLs 404 today while "welludr" is the one Bing query that converts. Expected effect: protects the ~30 Bing clicks/4 weeks the brand cluster already earns and lets the brand-name URL rank.
3. Sloane: refresh the embody review per the brief `ops/briefs/2026-11-16-embody-review-refresh.md` (title to carry "reviews and complaints", Trustpilot figure re-verified, complaint taxonomy). Expected effect: roughly 1,000 Bing impressions/4 weeks across five embody queries currently return 2 clicks.

## 1. The headline: legacy host vs hub (GSC, windows A vs B)
- www.treatmentshub.com: 0 clicks / ~70 impressions in A vs 1 / ~80 in B. Flat and tiny.
- www.topweightloss.io: 7 clicks / ~3,460 impressions in A vs 16 / ~2,880 in B. Impressions up about a fifth, clicks down by half.
- Why the gap is expected but still must be checked: `WEIGHT_LOSS_MIGRATED` flipped to `true` in the commit dated 2026-11-09 (`src/lib/site-context.ts:21`), so the legacy 301 has existed in code for one week and window A straddles the flip. Google keeps attributing impressions to a redirecting URL until it recrawls it and accepts the target as canonical; that takes weeks, not days. The two biggest legacy days (Nov 2 and 3) came before the flip.
- What is not explained by timing: legacy pages still render at positions 7 to 9 for comparison queries (medvi-vs-trimrx ~570 impressions, noom-vs-glp1-providers ~400, embody-vs-ro-weight-loss ~130) and several of those legacy URLs 301 not to an equivalent page but to the consolidated `/weight-loss/best-online-weight-loss-programs` (noom-vs-glp1-providers, noom-vs-altrx, shed-vs-embody, see audit Appendix A). Google treats a many-to-one redirect as a soft signal and may keep the old URL indexed. Decision for the operator: accept the consolidation (slower transfer, cleaner site) or restore 1:1 targets for the five legacy URLs with the most impressions.
- Weak positive signal: Ahrefs reports DR 0 for topweightloss.io and 8 for treatmentshub.com (2026-11-16). Ahrefs zeroes DR on a domain whose pages redirect site-wide, which is consistent with the 301 being live from its crawler's vantage. Not proof.
- Verify (Felix, from a network that can reach the legacy host; this sandbox cannot, see audit section 4): (a) `https://www.topweightloss.io/<path>` and the bare apex answer a single 301 to `https://www.treatmentshub.com/weight-loss/<path>` for `/`, `/medvi-vs-trimrx`, `/articles/glp1-weight-loss-medications-guide`, `/reviews/eden`, `/best-online-weight-loss-programs`, and `http://` upgrades; (b) legacy `/robots.txt` 200 and not blocking, legacy `/sitemap.xml` still served and listing the OLD URLs so Google recrawls them (the matcher excludes dotted paths, so confirm what it actually returns); (c) Search Console Change of Address submitted for topweightloss.io to treatmentshub.com, and Bing Webmaster Site Move; (d) URL Inspection on three legacy URLs reads "Page with redirect" with the hub URL as Google-selected canonical; (e) no `noindex` or canonical pointing back at the legacy host anywhere in the hub HTML. Report in `ops/qa/`.

## 2. Bing is the only engine sending clicks: what it says about titles
- Bing, Oct 19 to Nov 15, www.treatmentshub.com: ~44 clicks on ~4,700 impressions across the queries with 5+ impressions. Google sent 0 in window A.
- The demand is brand and provider names: altrx (~1,300 impressions, 0 clicks), welludr (~600, ~20 clicks), wellmedr (~450, 2), embody and its variants (~1,030 across five queries, 2), trimrx alternatives (~200, 0), ro weight loss (~140, 0).
- Two kinds of query are mixed here. Bare brand queries ("altrx", "embody", "welludr") are navigational: the searcher wants the provider's site, and a third-party review gets single-digit CTR at best. Modifier queries ("altrx reviews and complaints", "embody weight loss reviews", "is welludr.com a scam", "welludr reviews") are ours to win, and that is exactly where the clicks are: the "scam" query converts at roughly one click in four, the "reviews" queries at a few percent, the bare brands at zero.
- Implications: (1) keep "Legit or a Scam?" on every legit page; it is the measured winner and already in place for altRx, embody and welludr/wellmedr. (2) Review-page titles should carry the words searchers type: "<brand> Reviews" first, and "Complaints" where the query shows it (embody, altRx, ro all have a "reviews and complaints" query). The altRx review title ("What $89 Really Buys") and the embody review title ("$49 Semaglutide in 1-2 Days?") lead with price, not with the review-and-complaints intent. (3) The wellmedr pages already say "welludr" in the title but live at `/wellmedr` URLs and `/welludr` 404s (checked live 2026-11-16); the brand-name URL should exist as an alias (action 2). (4) Do not chase bare brand queries with title changes; measure the modifier queries instead.
- Missing to act properly: Bing page x query (which URL shows for "altrx" and at what position). Ask Dashiell.

## 3. Movers (GSC)
- Hub: no page has clicks in either window; nothing to rank. Pages with 10+ impressions Nov 2 to 15: `/`, `/ed` (avg pos ~2), `/hair-loss` (~6), `/weight-loss` (~6), `/uk/weight-loss` (~8, a URL that now 301s to `/weight-loss`), `/weight-loss/tirzepatide` (~8), `/weight-loss/weight-loss-pills` (pos ~94 for "weight loss pills/tablets", not a real position).
- Legacy host: the clicks that remain come from `/articles/embody-vs-ro-weight-loss` (pos ~7), `/articles/glp1-weight-loss-medications-guide` (~19), `/reviews/eden` (~47), `/trimrx-vs-directmeds` (~7). Impressions concentrate on `/best-online-weight-loss-programs` (~750, pos ~23) and `/medvi-vs-trimrx` (~570, pos ~9). These are the URLs whose redirect targets matter most (section 1).

## 4. CTR gaps (impressions >= 500 in range)
- Bing "altrx" ~1,300 impressions, 0 clicks: page unknown (no page dimension in the export). Bing "welludr" ~600, ~20 clicks: already the best performer; protect it. Legacy GSC `/best-online-weight-loss-programs` ~750 impressions at pos ~23 and `/medvi-vs-trimrx` ~570 at pos ~9 with 0 clicks: both legacy URLs, so the fix is the redirect, not the title.
- No hub page reaches 500 impressions on Google.

## 5. Positions 4 to 15 with volume
- Hub, Google (tiny volumes, Oct 19 to Nov 15): "embody vs wellmed" at pos ~4 on `/weight-loss/embody-vs-wellmedr`; "ro vs wellmedr" at pos ~3 on `/weight-loss/ro-vs-wellmedr`; "glp 1 tablets" at pos ~4-5 on `/weight-loss/wegovy-providers`. Single-digit impressions each; note them, do not act yet.
- Legacy, Google: `/medvi-vs-trimrx` pos ~9 (~570 impressions), `/articles/noom-vs-glp1-providers` ~9 (~400), `/articles/embody-vs-ro-weight-loss` ~7 (~130), `/shed-vs-embody` ~8-9 (~60), `/articles/best-ro-alternatives` ~6-7 (~60), `/trimrx-vs-directmeds` ~7 (~40), `/noom-vs-altrx` ~4 (~30). Four of these 301 to the consolidated programs page or to `trimrx-alternatives`. What would move them: a 1:1 target where one exists (medvi-vs-trimrx and embody-vs-ro exist on the hub; check they are the redirect targets), and patience on the rest.

## 6. Cannibalisation
- embody: `/weight-loss/reviews/embody` ("embody Reviews 2026..."), `/weight-loss/review-analysis/embody` ("What 96 embody Reviews Say: Trustpilot Analysis", indexable, in the sitemap) and `/weight-loss/articles/is-embody-legit` all target "embody reviews" wording. The brief resolves the split: review owns "reviews and complaints", legit owns "legit or a scam", review-analysis should be checked for noindex or a canonical to the review (operator decision; it may be the page Bing shows).
- welludr/wellmedr: review and legit page both lead with "welludr Reviews" wording; keep the legit page on "Legit or a Scam? Reviews Checked" (fine) and let the review own "welludr reviews and complaints".
- Cannot confirm which URL Bing shows per query without the page dimension (Dashiell).

## 7. AI citations
- Not pulled this session (no Copilot/Bing AI export, Ahrefs Brand Radar unavailable on the Free plan). No share-by-page reported. Request the Bing AI-citation export for the next review.

## 8. Freshness
- embody: live review states Trustpilot 3.8 across 10,689 reviews (price index, `src/lib/price-index.ts:52`, verified 2026-10-25) and the $49/$99 sale "seen Oct 28, 2026" with a price-increase countdown noted Nov 3. Web search snippets on 2026-11-16 show Trustpilot aggregates in the 3.3 to 3.6 range on country pages; the Trustpilot host could not be fetched from this sandbox, so this is a verification request, not a finding. Atlas to re-read the US page and the sale banner.
- Articles `embody-cost` and `embody-alternatives` carry `updatedAt` 2026-09-15 while prices moved on Oct 28 (price index change log); refresh their price lines from the index.
- Legacy-host comparison pages that still rank (`medvi-vs-trimrx`, `noom-vs-glp1-providers`) cannot be checked for aged data from here; irrelevant once they redirect.

## Baseline note
- The only prior numbers in the repo are the Nov 12 CTR pass (#595) and the Nov 11 Bing pass (#591) in git history; neither recorded click or impression figures, so this review is the baseline for both engines. Next review compares Nov 16 to 29 against window A.
