# Live check-ups, 2026-11-22: internal links (A) and mobile (B)
Report only. No code changed, nothing committed. Live site https://www.treatmentshub.com. Scripts and screenshots: /tmp/claude-0/-home-user-top-weight-loss/4a32294e-162f-523e-a384-3c3ef37eaab2/scratchpad/ (crawl.mjs, an.mjs, an2.mjs, mob.cjs, shot-*.png).

## Verdicts
- A. Internal links: NEEDS WORK (mild). Plumbing is clean: no broken links, no orphans, max depth 3. The weakness is quality and distribution, not reachability. It is unlikely to be the main cause of 287 "discovered, not indexed".
- B. Mobile: NEEDS WORK. No overflow, viewport correct, CLS 0, fast lab LCP. But cost-page tables are clipped with no scroll, and tap targets and text sizes are small site-wide.

## Ranked fix list
1. Cost-template tables clipped on phones (wellmedr-cost: both tables, 3rd column cut off at the right edge, no scroll container). Probably all 13 weight-loss cost pages, unverified for the other 12. Hides price data from users. Effort S. Mechanical (wrap in overflow-x-auto), but it touches design, so confirm with operator.
2. Repoint the 102 internal links that hit 301s (66 in body, 38 source pages, 18 targets). Top patterns:
   - /weight-loss/articles/best-embody-alternatives -> /weight-loss/articles/embody-alternatives (13)
   - /weight-loss/articles/noom-vs-glp1-providers -> /weight-loss/best-online-weight-loss-programs (13)
   - /weight-loss/articles/embody-weight-loss-review -> /weight-loss/reviews/embody (12)
   - /weight-loss/articles/altrx-vs-ro -> /weight-loss/altrx-vs-ro (10)
   - /weight-loss/articles/glp1-weight-loss-pcos -> glp1-weight-loss-for-women (9)
   Twelve of these come from the /weight-loss/articles listing. Effort S. Mechanical, ships alone if only hrefs change (check that the destination fits the anchor; two target a generic page). Small SEO effect: it saves crawl hops and consolidates link equity.
3. Four weight-loss reviews are linked only from the /weight-loss/reviews listing: bodybuildinghealth, livbody, skinnyrx, yucca. They are in the sitemap with zero editorial inbound links. Add contextual links, or noindex/drop them if they are thin. Best candidates for "discovered, not indexed". Effort S. Needs operator (content/IA).
4. 14 pages sit at 1-2 editorial body links (listing pages excluded), e.g. weight-loss reviews calibrate and sequence (linked only from their vs pages), trt reviews marek/fountain/medvi-quad and 2 trt vs pages, 3 hair-loss pages, in-person-vs-online-weight-loss. Add links from the matching legit/cost/hub pages. Effort S-M. Needs operator.
5. Text and tap-target sizes. In body copy of review, legit, cost and vs pages, about 55-96% of characters render below 16px (typically 12-15px). Chrome nav links (TRT, HRT, About, Guides) are 16-18px tall. 52-99 non-inline controls per page are under 44px, and 28-52 close pairs are under 8px apart. Effort M. Design change, needs operator. Indirect SEO effect (mobile usability, engagement).
6. Floating chat widget (60x60, bottom-right) is present on 9 of the 13 URLs tested and overlaps body text where seen (cost page key-takeaways box); overlap not checked on the others. Effort S. Design call, needs operator.
7. Sticky "Visit ..." CTA bar on the review and vs pages is 63-124px tall (up to 15% of the viewport) and appears on scroll. It is not intrusive on load, but combined with the chat button it crowds the bottom. Effort S. Design call, operator decides.
8. Calculator table (720px, scrolls inside its container) cuts off the Condition column with no visible scroll hint. Effort S. Design.
9. Copy typo on the cost calculator intro: "What 12online providers charge". Effort S. Content, send to Sloane. I did not touch it.
10. Hygiene: pages linked but not in the sitemap are only utility pages (/weight-loss/disclaimer, privacy, terms, find-your-match), Noom pages (intentional per the seo-audit allow-list) and assets. No action needed.

## A. Supporting numbers
- Sitemap: index plus 7 child sitemaps, 475 unique URLs (site 4, weight-loss 183, hair-loss 71, trt 87, hrt 43, online-therapy 34, ed 53). All 475 return 200, canonicals self-match, none noindex. 45,955 internal link instances extracted from server HTML. 40 distinct targets are outside the sitemap.
- Broken internal links (404/5xx): 0. One transient fetch failure on glp1-microdosing-complete-guide on the first pass; retried, 200 with canonical.
- Redirecting links: 102 (see fix 2). Raw trailing-slash or query mismatches: 0.
- In-body definition: links inside `<main>` and not inside nav/header/footer. Related-article cards inside `<main>` count as in-body, so I cannot separate editorial prose from related-card modules. Listing pages (hubs, /articles, /reviews) are also counted unless noted.
- Orphans: 0 with any link. 0 with zero in-body links (homepage is only nav-linked, as expected). Excluding listing/hub sources, 10 URLs have none: the 6 hub/listing pages and the 4 reviews in fix 3.
- Weakly linked (1-2 in-body inbound, excluding listing/hub sources): 14 URLs. By section: weight-loss 5 (reviews calibrate, sequence; articles in-person-vs-online-weight-loss, weight-loss-medication-that-works-fast; noom-vs-found), trt 5 (3 vs, reviews marek and medvi-quad), hair-loss 3 (keeps-vs-ro, women, reviews listing), online-therapy 1 (reviews listing). None in weight-loss legit/cost/vs templates; hair-loss/online-therapy hits are listing pages with a single editorial link. Counting listing pages as sources, the weak set is the same size but includes the 4 listing-only weight-loss reviews.
- Distribution of in-body inbound counts: 0: 1, 1-2: 14, 3-5: 49, 6-10: 158, 11+: 253.
- Click depth from home, all links: 0: 1, 1: 51, 2: 423, deeper than 3: 0. Excluding nav/footer: depth 1: 24, 2: 402, 3: 48, deeper than 3: 0.
- Generic body anchors ("click here", "read more", "learn more", etc., exact match): 0 of 14,806 body links. 559 body links have empty text (image or icon links); alt and aria-label not checked.
- Money pages, inbound in-body source pages (any-link count in brackets). Your paths were wrong for the articles; the sitemap paths are below:
  - /weight-loss: 139 [474]
  - /weight-loss/articles/is-wellmedr-legit: 19 [22] (/weight-loss/is-wellmedr-legit returns 404)
  - /weight-loss/reviews/wellmedr: 60 [182]
  - /weight-loss/articles/wellmedr-cost: 13 [19]
  - /weight-loss/articles/is-embody-legit: 20 [20]
  - /weight-loss/articles/is-altrx-legit: 17 [23]
  - /weight-loss/articles/best-tirzepatide-online: 44 [51]
  - /weight-loss/glp1-price-changes: 27 [474]
  - Extra: /weight-loss/glp1-cost-calculator: 26 [26]
  Excluding listing/hub sources, the counts drop by only 0-4 each. Legit and cost pages sit at 13-20, far below the reviews.
- Not measured: JS-rendered links (server HTML only), external links, and which links are visually prominent.

## B. Supporting numbers
URLs tested (13 plus a 360px pass): /, /weight-loss, /trt, /weight-loss/reviews/wellmedr, /weight-loss/articles/is-wellmedr-legit, /weight-loss/articles/wellmedr-cost, /weight-loss/embody-vs-wellmedr, /weight-loss/embody-vs-altrx-vs-wellmedr, /weight-loss/articles/glp1-microdosing-complete-guide, /trt/articles/trt-cost, /hair-loss/articles/is-maximus-legit, /weight-loss/glp1-price-changes, /weight-loss/glp1-cost-calculator. No state pages exist in the sitemap.
- Viewport meta: `width=device-width, initial-scale=1` on all.
- Horizontal overflow at 390 and 360: none on any page (scrollWidth = clientWidth). No offending elements. Caveat: clipped table text (fix 1) does not register as overflow.
- Tables: hub (3 of 4) and the calculator (2) scroll inside their container, as do vs and 3-way vs tables. Cost-page tables (2) and one vs and one hub table have no scroll container; the cost ones are visibly clipped (screenshot-checked), the others fit at 356-358px.
- Tap targets under 44px (non-inline): 58-147 per page. Under 24px: 43-99 per page. Close pairs: 3-52. Worst: nav links "TRT" 22x17, "HRT" 25x17, "About" 36x17, "Guides" 38x16. Inline text links excluded.
- Text: body text below 16px on most templates (see fix 5). Only long-form article body is 16px (microdosing guide: 147 of about 200 `<p>` at 16px). Text under 12px: 12-161 characters per page: "OUT OF 10" and "/ 10" score labels (9px), "VERIFIED PRICES" (10.5px), "Compounded" tag (10.5px), Reddit "r/" badge (10px).
- Fixed/sticky: chat button on 9 of 13 pages (not on home, trt-cost, hair article, /trt hub); CTA bar (fixed, off-screen at load) on review and vs. No dialogs or interstitials on load.
- Images above the fold without width/height: 0 on all 13. Across the whole page: 1-7 without dims on home (4/32), review (7/16), legit, cost, microdosing, hair article and hub.
- Lab values, not field data (Chromium, 360/390 wide, 4x CPU, 1.6 Mbps / 150 ms): CLS 0.000 everywhere. LCP 0.9-1.3 s, except price tracker 2.3 s at 390 (1.2 s at 360, so possibly noise; one run each). Nothing was captured past the first 3.5 s of load, so scroll-time shifts are not covered.
- Screenshots viewed at 390: home, cost, vs, tracker, calculator. Review, legit, hubs and the other articles were not viewed visually, only by script. Visible issues: clipped cost tables, chat button over text, calculator columns cut off, typo "12online".
