# Live check: internal links (A) and mobile (B), with fixes, 2026-11-25
Date: 2026-11-25 · Author: Felix · Status: ready for operator · Request: "internal links perfect, mobile good; full pass on the live site, fix what is safely fixable".
Live site https://www.treatmentshub.com (crawled Nov 25). Branch `claude/felix-links-mobile-1125`, three commits, no PR. Scratch data and all screenshots: `/tmp/claude-0/-home-user-top-weight-loss/4a32294e-162f-523e-a384-3c3ef37eaab2/scratchpad/f/` (`live/<key>-390.png` per URL, `local-before/`, `local-final/`, `desk-before/`, `desk-after/`).

## Verdicts
- **A. Internal links: HEALTHY on plumbing, NEEDS WORK on distribution.** 477 sitemap URLs, 46,188 internal link instances: 0 redirecting, 0 broken, 0 orphans, max depth 3, no http/case/slash/query variants, no nofollow, no unnamed anchors. What is weak is how many pages are linked from prose, and 9 of #668's 34 links are not live yet (CMS copies).
- **B. Mobile: NEEDS WORK, now better.** No horizontal overflow on any of 39 URLs at 390 and 360, viewport meta correct, CLS 0, no overlay on load. Open items: chat launcher/teaser still floats over prose, header price strip rows are 36px, small card text (12.5-13.5px) and 9-10.5px labels.

## Part A: internal links (crawl of 477 sitemap URLs, server HTML, concurrency 8)
Method: curl each sitemap URL (index plus 6 child sitemaps), parse every `<a href>`, resolve to our host, check status, canonical and robots of each target (sitemap targets from the crawl itself, 21 non-sitemap targets fetched separately). "Prose" link = anchor inside p/li/td/dd/blockquote in `<main>`, outside header/nav/footer and outside any element whose class contains card/related/grid, whose container has more than 25 characters beyond the anchor. "Body" = in `<main>` outside nav/header/footer (cards included). "Any" = all links incl. nav/footer. Counts are distinct source pages. The prose rule is conservative: a link in a prose-looking block inside a grid wrapper counts as a card. Not measured: JS-rendered links, external links.

| # | Check | Result |
|---|---|---|
| 1 | Internal 3xx / 4xx / 5xx | 0 / 0 / 0 (Nov 22: 102 redirecting; Nov 24: 0) |
| 2 | Links to noindex targets | 18 links, all to 2 Noom articles (`noom-weight-loss-review`, `noom-subscription-cost`: noindex,follow, self-canonical, deliberately outside the sitemap; linked from /weight-loss/articles, noom-vs-found, noom-vs-shed, reviews/noom and 6 cost/guide pages) |
| 2 | Links to non-canonical targets, trailing-slash / case / query variants, `http://` or non-www internal links, nofollow | 0 each |
| 2 | Empty anchors, image-only anchors without alt | 0 (every anchor has text, aria-label or alt) |
| 3 | Sitemap URLs non-200 / canonical elsewhere / noindex / H1 count not 1 | 0 / 0 / 0 / 0 |
| 3 | Orphans (no link at all) / unreachable without nav+footer links | 0 / 0 |
| 3 | Click depth from home, all links | 0:1, 1:51, 2:425, deeper 0 |
| 3 | Click depth excluding nav/footer | 1:24, 2:405, 3:47, deeper than 3: 0 |
| 3 | Linked but not in sitemap (21) | /weight-loss/disclaimer, /privacy, /terms (indexable, by design, #sitemap crawl-budget note), **/weight-loss/find-your-match (indexable, linked from 116 pages, not in sitemap)**, the 2 Noom pages, 6 csv/xml feeds, 9 `/verification/*.webp` images. All 200. |

### A4. Inbound links, money pages and new pages (distinct source pages: prose / body / any)
| Page | prose | body | any |
|---|---|---|---|
| /weight-loss | 20 | 142 | 476 |
| articles/is-wellmedr-legit | 6 | 19 | 23 |
| reviews/wellmedr | 31 | 61 | 184 |
| articles/wellmedr-cost | 3 | 14 | 20 |
| articles/is-embody-legit | 9 | 22 | 26 |
| articles/is-altrx-legit | 5 | 19 | 25 |
| articles/best-tirzepatide-online | 5 | 43 | 50 |
| glp1-price-changes | 13 | 31 | 476 |
| articles/is-trimrx-legit | **1** | 16 | 23 |
| reviews/trimrx | 7 | 49 | 184 |
| reviews/eden | 6 | 29 | 185 |
| medvi-vs-trimrx | **2** | 16 | 24 |
| articles/is-eden-legit (new, #669) | **2** | 32 | 39 |
| articles/how-to-cancel-telehealth-glp1-subscription (new) | 8 | 33 | 40 |

Body counts are healthy everywhere (14-142). Prose counts are the thin part: **is-trimrx-legit (1), is-eden-legit (2), medvi-vs-trimrx (2), wellmedr-cost (3)** are linked mostly by template cards. The cancel guide gained 6 prose links since Nov 24.

Pages with fewer than 3 in-body links:
- **Body (cards included) under 3: 11 pages.** 7 listing pages (/ed/articles, /hair-loss/articles, /hrt/articles, /hrt/reviews, /online-therapy/articles, /online-therapy/reviews, /trt/articles: 1-2 each, nav-fed by design) and the four weight-loss reviews **bodybuildinghealth, livbody, skinnyrx, yucca** (1 each, only from /weight-loss/reviews; unchanged since Nov 22, operator decision pending).
- **Prose under 3: 238 of 477 pages**, grouped below as `path (prose/body/any)`. By template: weight-loss vs 34, articles 40, reviews 13, legit 8; trt vs 27, articles 14; hair-loss articles 25, vs 12; online-therapy articles 12; hrt articles 11; ed 16. Most are reachable only through related-card modules. This is the real distribution gap; the cheapest lever is one pointing sentence per page from the matching hub or legit page (Sloane, content).

**ed** (16)

- /ed/articles (1/1/476)
- /ed/articles/ed-treatment-options-compared (1/19/26)
- /ed/articles/erectile-dysfunction-statistics (1/34/90)
- /ed/articles/fastest-acting-ed-treatments (1/12/19)
- /ed/articles/glp1-and-erectile-dysfunction (2/34/34)
- /ed/articles/sildenafil-not-working (0/16/23)
- /ed/directmeds-vs-rexmd (2/6/12)
- /ed/dudemeds-vs-braverx (1/8/11)
- /ed/ed-price-changes (0/33/476)
- /ed/hims-vs-braverx (0/7/10)
- /ed/hims-vs-dudemeds (1/8/11)
- /ed/quad-vs-braverx (1/9/11)
- /ed/quad-vs-directmeds (2/9/12)
- /ed/quad-vs-dudemeds (1/10/12)
- /ed/reviews/rexmd (2/5/52)
- /ed/reviews/rugiet (1/32/40)

**hair-loss** (44)

- /hair-loss/articles (0/1/476)
- /hair-loss/articles/best-online-hair-loss-treatment (2/10/17)
- /hair-loss/articles/breezula-clascoterone-hair-loss (2/6/13)
- /hair-loss/articles/can-stress-cause-hair-loss (2/10/16)
- /hair-loss/articles/dht-and-hair-loss (2/13/18)
- /hair-loss/articles/do-hair-loss-shampoos-work (1/10/16)
- /hair-loss/articles/does-creatine-cause-hair-loss (1/6/13)
- /hair-loss/articles/does-finasteride-lower-testosterone (1/6/12)
- /hair-loss/articles/does-minoxidil-work (1/6/13)
- /hair-loss/articles/dutasteride-online (2/7/13)
- /hair-loss/articles/glp1-hair-loss (1/11/17)
- /hair-loss/articles/happyhead-alternatives (1/12/17)
- /hair-loss/articles/happyhead-cost (1/10/17)
- /hair-loss/articles/hims-alternatives (1/12/18)
- /hair-loss/articles/how-to-get-finasteride-online (2/7/13)
- /hair-loss/articles/is-happyhead-legit (1/11/18)
- /hair-loss/articles/is-maximus-legit (1/13/20)
- /hair-loss/articles/is-petermd-legit (1/8/14)
- /hair-loss/articles/keeps-alternatives (1/10/16)
- /hair-loss/articles/maximus-alternatives (2/17/23)
- /hair-loss/articles/maximus-cost (1/12/19)
- /hair-loss/articles/menopause-hair-loss (2/7/13)
- /hair-loss/articles/microneedling-for-hair-loss (1/5/12)
- /hair-loss/articles/new-hair-loss-treatments-pipeline (2/12/19)
- /hair-loss/articles/online-hair-loss-treatment-guide (0/12/19)
- /hair-loss/articles/petermd-alternatives (1/11/16)
- /hair-loss/articles/petermd-cost (1/14/18)
- /hair-loss/articles/saw-palmetto-hair-loss (1/5/12)
- /hair-loss/articles/veradermics-vdphl01 (2/7/11)
- /hair-loss/happyhead-vs-petermd (1/11/17)
- /hair-loss/hims-vs-happy-head (1/14/17)
- /hair-loss/hims-vs-keeps (1/9/17)
- /hair-loss/hims-vs-maximus (1/16/19)
- /hair-loss/hims-vs-nutrafol (1/5/14)
- /hair-loss/hims-vs-ro (1/7/15)
- /hair-loss/keeps-vs-happy-head (1/12/17)
- /hair-loss/keeps-vs-maximus (2/15/19)
- /hair-loss/keeps-vs-ro (1/5/15)
- /hair-loss/maximus-vs-nutrafol (1/10/16)
- /hair-loss/reviews (2/3/476)
- /hair-loss/reviews/nutrafol (2/6/12)
- /hair-loss/reviews/ro (2/7/13)
- /hair-loss/ro-vs-happy-head (1/11/16)
- /hair-loss/ro-vs-maximus (1/13/17)

**hrt** (14)

- /hrt/articles (1/1/476)
- /hrt/articles/does-hrt-cause-weight-gain (1/9/16)
- /hrt/articles/estrogen-patch-shortage (1/6/13)
- /hrt/articles/how-long-can-you-stay-on-hrt (2/6/13)
- /hrt/articles/hrt-and-hair-thinning (1/10/14)
- /hrt/articles/hrt-and-libido (1/8/14)
- /hrt/articles/hrt-for-menopause-guide (0/12/17)
- /hrt/articles/hrt-side-effects (2/6/13)
- /hrt/articles/hrt-vs-birth-control (1/5/12)
- /hrt/articles/is-gala-legit (2/10/16)
- /hrt/articles/is-hrt-the-same-as-trt (2/10/16)
- /hrt/articles/menopause-hormone-therapy-2026-what-changed (2/7/13)
- /hrt/articles/when-to-start-hrt (2/8/14)
- /hrt/reviews (1/1/476)

**online-therapy** (17)

- /online-therapy/articles (0/1/476)
- /online-therapy/articles/ai-therapy-chatbots-vs-online-therapy (1/9/15)
- /online-therapy/articles/cbt-online (2/9/12)
- /online-therapy/articles/does-online-therapy-work (2/10/17)
- /online-therapy/articles/does-talkspace-take-insurance (2/9/14)
- /online-therapy/articles/how-much-does-betterhelp-cost (2/9/15)
- /online-therapy/articles/is-betterhelp-legit (1/10/17)
- /online-therapy/articles/is-talkiatry-legit (2/9/15)
- /online-therapy/articles/online-couples-therapy (1/9/14)
- /online-therapy/articles/online-therapy-for-anxiety (2/6/13)
- /online-therapy/articles/online-therapy-for-depression (2/5/12)
- /online-therapy/articles/online-therapy-psychiatry-guide (0/11/17)
- /online-therapy/articles/online-therapy-reddit (1/4/11)
- /online-therapy/articles/online-therapy-vs-in-person (2/6/11)
- /online-therapy/articles/types-of-therapy (2/8/14)
- /online-therapy/headspace-vs-betterhelp (2/8/9)
- /online-therapy/reviews (1/2/476)

**reviewers** (1)

- /reviewers/buddhini-dolapihilla (2/5/476)

**trt** (47)

- /trt/articles (1/1/476)
- /trt/articles/best-online-trt-clinics-compared (2/10/17)
- /trt/articles/does-trt-cause-hair-loss (2/7/14)
- /trt/articles/does-trt-increase-libido (1/6/12)
- /trt/articles/easiest-way-to-get-trt-online (1/6/12)
- /trt/articles/how-low-testosterone-is-diagnosed (2/32/37)
- /trt/articles/is-trt-covered-by-insurance (1/8/15)
- /trt/articles/online-doctors-that-prescribe-testosterone (2/5/12)
- /trt/articles/online-trt-dea-deadline-2026 (1/20/27)
- /trt/articles/online-trt-guide (0/22/28)
- /trt/articles/testosterone-cypionate-vs-enanthate (1/5/12)
- /trt/articles/testosterone-levels-by-age (1/7/14)
- /trt/articles/trt-for-bodybuilding (2/4/11)
- /trt/articles/trt-results-timeline (2/7/14)
- /trt/articles/what-is-medvi-quad (0/4/11)
- /trt/dudemeds-vs-brightmeds (0/3/14)
- /trt/dudemeds-vs-fridays (0/8/17)
- /trt/dudemeds-vs-petermd (0/10/19)
- /trt/fountain-trt-vs-petermd (0/3/14)
- /trt/fridays-vs-brightmeds (0/4/15)
- /trt/hims-vs-male-excel (0/10/19)
- /trt/hone-health-vs-maximus (1/12/21)
- /trt/hone-vs-brightmeds (0/11/19)
- /trt/hone-vs-dudemeds (1/15/20)
- /trt/hone-vs-fridays (0/13/19)
- /trt/hone-vs-maleexcel (1/16/22)
- /trt/hone-vs-taurus (1/15/23)
- /trt/hone-vs-tmates (2/17/26)
- /trt/maleexcel-vs-brightmeds (0/7/14)
- /trt/maleexcel-vs-dudemeds (0/11/19)
- /trt/maleexcel-vs-fridays (0/9/17)
- /trt/maleexcel-vs-taurus (0/11/19)
- /trt/marek-health-vs-dudemeds (0/6/15)
- /trt/maximus-vs-hims (1/6/16)
- /trt/reviews/brightmeds (1/9/21)
- /trt/reviews/fountain (2/4/16)
- /trt/reviews/hims (2/6/18)
- /trt/reviews/medvi-quad (2/3/16)
- /trt/reviews/petermd (0/5/17)
- /trt/taurus-vs-brightmeds (0/6/15)
- /trt/taurus-vs-dudemeds (0/10/18)
- /trt/taurus-vs-fridays (0/7/16)
- /trt/tmates-vs-brightmeds (0/8/16)
- /trt/tmates-vs-dudemeds (1/13/20)
- /trt/tmates-vs-fridays (0/9/17)
- /trt/tmates-vs-maleexcel (1/14/21)
- /trt/tmates-vs-taurus (0/11/21)

**weight-loss** (99)

- /weight-loss/altrx-vs-eden (2/102/110)
- /weight-loss/altrx-vs-ro-vs-sprout (0/6/6)
- /weight-loss/altrx-vs-sprout (1/9/18)
- /weight-loss/altrx-vs-wellmedr (1/9/476)
- /weight-loss/articles/altrx-alternatives (0/15/21)
- /weight-loss/articles/altrx-cost (1/19/26)
- /weight-loss/articles/best-mounjaro-alternatives (1/6/11)
- /weight-loss/articles/best-noom-alternatives (0/10/16)
- /weight-loss/articles/best-ozempic-alternatives (1/11/17)
- /weight-loss/articles/best-ro-alternatives (1/11/18)
- /weight-loss/articles/best-wegovy-alternatives (1/5/12)
- /weight-loss/articles/can-you-get-ozempic-without-doctor (2/8/13)
- /weight-loss/articles/directmeds-alternatives (0/5/12)
- /weight-loss/articles/directmeds-cost (0/4/11)
- /weight-loss/articles/embody-alternatives (1/21/22)
- /weight-loss/articles/embody-tirzepatide-review (1/14/21)
- /weight-loss/articles/embody-vs-ro-weight-loss (0/8/15)
- /weight-loss/articles/emotional-eating-and-weight-loss (1/5/11)
- /weight-loss/articles/glp1-and-alcohol (1/5/11)
- /weight-loss/articles/glp1-and-mental-health (2/11/18)
- /weight-loss/articles/glp1-coverage-2027-employers-dropping (1/11/74)
- /weight-loss/articles/glp1-weight-loss-for-women (1/4/68)
- /weight-loss/articles/glp1-weight-loss-medications-guide (0/11/17)
- /weight-loss/articles/healthrx-alternatives (0/11/16)
- /weight-loss/articles/healthrx-cost (0/6/13)
- /weight-loss/articles/in-person-vs-online-weight-loss (0/3/10)
- /weight-loss/articles/is-directmeds-legit (1/8/15)
- /weight-loss/articles/is-eden-legit (2/32/39)
- /weight-loss/articles/is-healthrx-legit (2/11/16)
- /weight-loss/articles/is-medvi-legit (1/15/18)
- /weight-loss/articles/is-ro-legit (2/13/20)
- /weight-loss/articles/is-shed-legit (0/7/13)
- /weight-loss/articles/is-sprout-legit (0/9/16)
- /weight-loss/articles/is-trimrx-legit (1/16/23)
- /weight-loss/articles/medvi-alternatives (0/17/20)
- /weight-loss/articles/medvi-cost (1/13/16)
- /weight-loss/articles/medvi-tirzepatide-cost (2/15/21)
- /weight-loss/articles/menopause-weight-gain (2/5/12)
- /weight-loss/articles/next-generation-weight-loss-drugs (1/4/11)
- /weight-loss/articles/ozempic-face (2/5/12)
- /weight-loss/articles/ozempic-hair-loss (1/6/13)
- /weight-loss/articles/shed-alternatives (0/7/13)
- /weight-loss/articles/shed-cost (0/7/14)
- /weight-loss/articles/sprout-alternatives (0/10/16)
- /weight-loss/articles/sprout-cost (0/12/19)
- /weight-loss/articles/testosterone-and-weight-loss (1/4/11)
- /weight-loss/articles/trimrx-alternatives (1/15/22)
- /weight-loss/articles/trimrx-cost (0/14/21)
- /weight-loss/articles/weight-loss-medication-that-works-fast (0/4/11)
- /weight-loss/articles/weight-loss-medication-without-insurance (2/8/15)
- /weight-loss/articles/wellmedr-alternatives (0/12/17)
- /weight-loss/articles/zepbound-vs-wegovy-vs-ozempic (1/9/15)
- /weight-loss/best-online-weight-loss-programs (2/28/476)
- /weight-loss/best-weight-loss-injections (0/20/476)
- /weight-loss/calibrate-vs-embody (0/9/17)
- /weight-loss/calibrate-vs-medvi (0/8/16)
- /weight-loss/cheapest-weight-loss-medication (2/26/476)
- /weight-loss/eden-vs-embody (2/100/110)
- /weight-loss/eden-vs-ro (1/11/19)
- /weight-loss/embody-vs-altrx-vs-medvi (0/7/7)
- /weight-loss/embody-vs-altrx-vs-wellmedr (1/102/102)
- /weight-loss/embody-vs-medvi (0/18/23)
- /weight-loss/embody-vs-medvi-vs-wellmedr (0/7/7)
- /weight-loss/embody-vs-sprout (0/13/20)
- /weight-loss/embody-vs-trimrx (1/16/24)
- /weight-loss/found-vs-trimrx (0/6/16)
- /weight-loss/healthrx-vs-embody-vs-wellmedr (0/5/5)
- /weight-loss/healthrx-vs-medvi (2/9/19)
- /weight-loss/medvi-vs-altrx (0/14/24)
- /weight-loss/medvi-vs-healthrx-vs-directmeds (0/5/5)
- /weight-loss/medvi-vs-ro (0/15/22)
- /weight-loss/medvi-vs-trimrx (2/16/24)
- /weight-loss/medvi-vs-trimrx-vs-shed (0/5/5)
- /weight-loss/medvi-vs-wellmedr (0/12/476)
- /weight-loss/noom-vs-found (1/4/14)
- /weight-loss/noom-vs-shed (1/6/15)
- /weight-loss/ozempic-alternatives (1/21/476)
- /weight-loss/reviews/bmimd (2/9/184)
- /weight-loss/reviews/bodybuildinghealth (0/1/25)
- /weight-loss/reviews/calibrate (0/3/27)
- /weight-loss/reviews/found (2/6/30)
- /weight-loss/reviews/livbody (0/1/25)
- /weight-loss/reviews/luvo (0/9/33)
- /weight-loss/reviews/medgm (0/5/29)
- /weight-loss/reviews/noom (1/7/31)
- /weight-loss/reviews/sequence (0/3/27)
- /weight-loss/reviews/skinnyrx (0/1/25)
- /weight-loss/reviews/sunlight (0/5/29)
- /weight-loss/reviews/wellorithm (0/5/29)
- /weight-loss/reviews/yucca (0/1/25)
- /weight-loss/ro-vs-wellmedr (0/9/17)
- /weight-loss/sequence-vs-medvi (0/7/15)
- /weight-loss/sequence-vs-trimrx (0/5/14)
- /weight-loss/shed-vs-sprout (0/7/16)
- /weight-loss/sprout-vs-trimrx (0/5/15)
- /weight-loss/sprout-vs-wellmedr (1/9/18)
- /weight-loss/trimrx-vs-ro (0/13/21)
- /weight-loss/trimrx-vs-wellmedr (1/10/19)
- /weight-loss/wellmedr-vs-embody-vs-trimrx (1/8/8)

### A5. #668's 34 links: 25 live, 9 NOT visible live
The 9 below exist in the repo (seed copies in `src/lib/config-store.ts`, `src/data/articles.ts`) but the live pages are served from the CMS snapshot (`site-config.json` blob), which still holds the old bodies. They go live when the operator re-seeds or edits those CMS records.

| Source page (live) | Missing href |
|---|---|
| /weight-loss/articles/choosing-telehealth-weight-loss-provider | /weight-loss/articles/in-person-vs-online-weight-loss |
| /weight-loss/articles/stopping-glp1-medication-what-happens | /weight-loss/articles/how-to-cancel-telehealth-glp1-subscription |
| /weight-loss/articles/best-noom-alternatives | /weight-loss/reviews/calibrate |
| /weight-loss/articles/best-noom-alternatives | /weight-loss/reviews/sequence |
| /weight-loss/articles/is-embody-legit | /weight-loss/articles/how-to-cancel-telehealth-glp1-subscription |
| /weight-loss/best-online-weight-loss-programs | /weight-loss/articles/in-person-vs-online-weight-loss |
| /weight-loss/best-online-weight-loss-programs | /weight-loss/reviews/calibrate |
| /weight-loss/best-online-weight-loss-programs | /weight-loss/reviews/sequence |
| /weight-loss/cheapest-weight-loss-medication | /weight-loss/articles/weight-loss-medication-that-works-fast |

Live and confirmed: the cancel-guide links from is-altrx/is-directmeds/is-healthrx-legit, best-tirzepatide-online, reviews/embody; the guide's four review links; works-fast from best-tirzepatide-online; hair-loss/women, keeps-vs-ro, hair reviews, TRT marek and medvi-quad (3), the seven "See also" pins.

### A6. Breadcrumbs (visible `nav[aria-label=Breadcrumb]` vs BreadcrumbList JSON-LD, 22 templates)
Consistent (same trail, same hrefs, last item unlinked) on review, legit, cost, alternatives, vs, three-way, article (all verticals), tracker, calculator, how-we-rank*, cancel guide, is-eden-legit, ED tracker. Defects, not fixed (each needs a design or schema decision):
1. **JSON-LD without a visible trail**: /weight-loss/about, /weight-loss/articles and /weight-loss/reviews (and the other vertical listings) emit BreadcrumbList but render no breadcrumb. Google wants markup to match visible content.
2. **Visible trail without JSON-LD**: /medical-review-policy.
3. How-we-rank and reviewer pages: visible "Home" links to `/`, JSON-LD "Home" points at /weight-loss (how-we-rank) or the site root (reviewer): trail roots differ by template. The vertical pages use "Home" for the vertical hub by design.

## Part B: mobile (live, Playwright chromium, 390x844 and 360x800, 39 URLs, every template)
Lab only: Chromium, 4x CPU and 1.6 Mbps / 150 ms throttle, two runs in parallel on a shared machine, one run per URL. Not field data. Screenshots at deviceScaleFactor 1, top 1700px, all 39 viewed (`live/<key>-390.png`).

Findings (live, 390 unless stated):
- **Viewport meta** `width=device-width, initial-scale=1` on 39/39. **Horizontal overflow: none on 39/39 at 390 and at 360** (scrollWidth = clientWidth). No clipped tables: the 30+ tables on 20 pages either fit or scroll inside their own box (hubs 1-3 per page, calculator 2, dose 1, vs 1, how-we-rank, policy, ed tracker). **No overlay or dialog on load**; no interstitial.
- **Images without width/height:** none above the fold on any URL. Below the fold: 57 images on 17 pages (logos 0x0 lazy images, one Medium-hosted Ro logo, product shots). CLS is 0 on every URL, so the layout does not move.
- **Lab LCP 0.8-2.7 s** (worst: articles listing 2.7, tracker 2.5 s, BMI 2.3, quiz 2.3; rest 0.8-1.7), **CLS 0.000 everywhere**, TBT 140-510 ms, INP-proxy (longest event during one tap on the menu/first button) 590-1130 ms under 4x CPU: slow-phone lab number, not a field INP.
- **Quiz /weight-loss/find-your-match** shows only a spinner for the first 3.5 s on the throttled profile (the H1 is `sr-only` and the quiz is client-loaded; LCP 2.3 s, CLS 0.128 once it paints). Unthrottled it renders at once. See `live/quiz-wl-390.png`.
- **Text under 12px** (chars across 39 URLs): 9px "out of 10" rating label (633), 10.5px "Verified prices" strip label (345), 10.5px "Compounded" chips (164), 10px "r/" Reddit badge (110), 10.5px landing-page disclosure (142, fixed). **Body copy under 16px** (prose paragraphs): 14-15px in review, vs, tracker, about, how-we-rank, policy; 12.5-13.5px in card descriptions and Reddit excerpts (cards, left as designed).
- **Tap targets under 44px** (non-inline, summed over 39 URLs): footer 1,799 (49 per page, 17px tall), header-nav bucket 329 (brand link 38px, page-internal "In this article" lists 19-22px), other links 835 (the 36px price-strip rows 24+ per page, card links 18px, source links), breadcrumbs 41 (30px), card links 58, in-table links 19, buttons 60 ("Advertising Disclosure" 27px, "Read more" 19px, sticky-bar close 30x34), CTA buttons 25 (42px "Visit" buttons). Pairs closer than 8px: 525 other-link (price-strip rows touch), 109 footer.
- **Fixed/sticky:** chat launcher 60x60 on 20 of 39 URLs (weight-loss only), review sticky bar 390x63, vs sticky bar 390x124. The launcher covers prose at some scroll position on 19 URLs, plus a 298x67 teaser bubble ("Hi! Looking for a GLP-1 provider?") that appears 5 s in on 11 and covers body text (screenshots `live/cost-390.png`, `live/new-eden-390.png`, `live/hub-wl-390.png`). **On vs pages the launcher covered the right-hand "Visit welludr" button on 29 of 33 scroll steps** (`vp-vs.png`). Fixed in C2.

Per-URL table (live):

| Key | Path | Ovf 390/360 | Tables (scroll/n, clipped) | Taps <44 (close pairs) | Body copy <16px | Chars <12px | Fixed | LCP s / CLS / INP-proxy ms / TBT ms |
|---|---|---|---|---|---|---|---|---|
| home | / | no/no | 0/0, 0 | 58 (3) | 52.3% | 12 | - | 0.8 / 0 / 600 / 145 |
| hub-wl | /weight-loss | no/no | 3/4, 0 | 108 (28) | 79.2% | 161 | 60x60 | 1.3 / 0 / 1048 / 361 |
| hub-trt | /trt | no/no | 2/2, 0 | 75 (4) | 51.7% | 90 | - | 1.0 / 0 / 752 / 195 |
| hub-hair | /hair-loss | no/no | 2/2, 0 | 65 (4) | 38.8% | 27 | - | 1.2 / 0 / 880 / 192 |
| hub-hrt | /hrt | no/no | 2/2, 0 | 61 (4) | 44.4% | 59 | - | 1.0 / 0 / 776 / 205 |
| hub-ed | /ed | no/no | 2/2, 0 | 86 (18) | 57.4% | 87 | - | 1.1 / 0 / 856 / 259 |
| hub-ot | /online-therapy | no/no | 1/1, 0 | 63 (4) | 58% | 36 | - | 1.3 / 0 / 776 / 182 |
| review | /weight-loss/reviews/wellmedr | no/no | 0/0, 0 | 124 (28) | 67.2% | 29 | 390x63, 60x60 | 1.1 / 0 / 848 / 348 |
| review-trt | /trt/reviews/hone | no/no | 0/0, 0 | 71 (4) | 94.4% | 0 | 390x63 | 1.0 / 0 / 768 / 211 |
| legit | /weight-loss/articles/is-wellmedr-legit | no/no | 0/1, 0 | 120 (41) | 37.6% | 38 | 60x60 | 1.2 / 0 / 928 / 404 |
| legit-embody | /weight-loss/articles/is-embody-legit | no/no | 0/0, 0 | 113 (33) | 81.8% | 42 | 60x60 | 1.1 / 0 / 784 / 294 |
| cost | /weight-loss/articles/wellmedr-cost | no/no | 0/2, 0 | 105 (32) | 69.5% | 58 | 60x60 | 1.2 / 0 / 784 / 199 |
| alt | /weight-loss/articles/embody-alternatives | no/no | 0/0, 0 | 117 (31) | 87.5% | 80 | 60x60 | 1.3 / 0 / 784 / 247 |
| vs | /weight-loss/embody-vs-wellmedr | no/no | 1/3, 0 | 146 (34) | 96.8% | 47 | 390x124, 60x60 | 1.1 / 0 / 848 / 261 |
| vs-trt | /trt/dudemeds-vs-fridays | no/no | 0/2, 0 | 73 (4) | 94.5% | 0 | 390x124 | 1.1 / 0 / 896 / 321 |
| vs-hair | /hair-loss/hims-vs-ro | no/no | 0/2, 0 | 71 (4) | 93% | 0 | 390x124 | 0.9 / 0 / 688 / 274 |
| vs3 | /weight-loss/embody-vs-altrx-vs-wellmedr | no/no | 1/1, 0 | 83 (28) | 79.5% | 15 | 60x60 | 1.1 / 0 / 688 / 140 |
| art-wl | /weight-loss/articles/glp1-microdosing-complete-guide | no/no | 0/0, 0 | 117 (51) | 9.6% | 53 | 60x60 | 1.4 / 0 / 1128 / 508 |
| art-trt | /trt/articles/trt-cost | no/no | 0/0, 0 | 75 (8) | 63.4% | 27 | - | 0.9 / 0 / 672 / 145 |
| art-hair | /hair-loss/articles/is-maximus-legit | no/no | 0/0, 0 | 81 (10) | 65.9% | 36 | - | 1.0 / 0 / 776 / 196 |
| art-hrt | /hrt/articles/perimenopause-vs-menopause | no/no | 0/0, 0 | 70 (4) | 80.4% | 59 | - | 0.9 / 0 / 696 / 151 |
| art-ot | /online-therapy/articles/types-of-therapy | no/no | 0/0, 0 | 75 (7) | 64.4% | 27 | - | 1.0 / 0 / 736 / 170 |
| art-ed | /ed/articles/sildenafil-doses-explained | no/no | 0/0, 0 | 91 (23) | 61.9% | 42 | - | 1.1 / 0 / 776 / 211 |
| tracker | /weight-loss/glp1-price-changes | no/no | 0/0, 0 | 92 (28) | 96.5% | 15 | 60x60 | 2.5 / 0 / 880 / 475 |
| calc | /weight-loss/glp1-cost-calculator | no/no | 2/2, 0 | 93 (28) | 88% | 15 | 60x60 | 0.9 / 0 / 592 / 351 |
| bmi | /weight-loss/glp1-bmi-calculator | no/no | 0/0, 0 | 82 (28) | 81.4% | 15 | 60x60 | 2.3 / 0 / 800 / 317 |
| dose | /weight-loss/glp1-dose-schedule | no/no | 1/1, 0 | 82 (28) | 80.6% | 15 | 60x60 | 1.0 / 0 / 752 / 342 |
| quiz-wl | /weight-loss/find-your-match | no/no | 0/0, 0 | 56 (25) | 0% | 15 | - | 2.3 / 0 / 712 / 315 |
| articles-list | /weight-loss/articles | no/no | 0/0, 0 | 77 (28) | 77.9% | 15 | 60x60 | 2.7 / 0 / 840 / 292 |
| reviews-list | /weight-loss/reviews | no/no | 0/0, 0 | 77 (28) | 97.5% | 15 | 60x60 | 0.9 / 0 / 704 / 173 |
| reviewer | /reviewers/francheska-capistrano | no/no | 0/0, 0 | 54 (3) | 69.9% | 0 | - | 1.0 / 0 / 720 / 166 |
| about-wl | /weight-loss/about | no/no | 0/0, 0 | 82 (28) | 65.3% | 15 | 60x60 | 1.0 / 0 / 800 / 314 |
| how-we-rank | /weight-loss/how-we-rank | no/no | 1/1, 0 | 80 (28) | 78.2% | 15 | 60x60 | 1.1 / 0 / 832 / 388 |
| policy | /medical-review-policy | no/no | 1/1, 0 | 58 (3) | 96.1% | 0 | - | 1.3 / 0 / 800 / 245 |
| new-eden | /weight-loss/articles/is-eden-legit | no/no | 0/7, 0 | 108 (40) | 27.6% | 24 | 60x60 | 1.2 / 0 / 896 / 340 |
| new-cancel | /weight-loss/articles/how-to-cancel-telehealth-glp1-subscription | no/no | 0/3, 0 | 102 (35) | 29.8% | 53 | 60x60 | 1.0 / 0 / 776 / 201 |
| go-glp1 | /weight-loss/go/glp1 | no/no | 0/1, 0 | 5 (0) | 95.6% | 142 | - | 1.1 / 0 / 808 / 245 |
| go-top5 | /weight-loss/go/top-5 | no/no | 0/0, 0 | 4 (1) | 76.7% | 0 | - | 1.0 / 0 / 792 / 200 |
| ed-tracker | /ed/ed-price-changes | no/no | 1/1, 0 | 76 (18) | 98.9% | 15 | - | 1.0 / 0 / 792 / 295 |
## Part C: fixes shipped on the branch
Commits (each verified: tsc clean, build 0 errors, seo-audit PASS 0 fails / 2 warns / 474 pages on the local build):

**C1 `97d99ae` Dates.** There were no link defects to fix (A1-A3 are all zero), so C1 is the three date mismatches, page side only:
- Retatrutide: visible "Last updated" came from the shared floor (Sep 1) while Article schema said Aug 9. Both now read one page constant, the page's own Aug 9 (no content edit is logged after it; bump if a review happened).
- Cost calculator: visible and schema Oct 27, but every row is built from the price index, which changed Nov 18, 20 and 22. Both now use `PRICE_DATA_UPDATED` (Nov 22, same record the tracker uses); the sitemap lastmod follows. BMI calculator and dose schedule show no prices and their label data did not change on Nov 18, so they stay Oct 27 (as the brief allowed).
- Six vertical hubs: WebPage `dateModified` was the Sep 1 floor while the page says "Last Updated: November 2026" and lists guides updated to Nov 24. Now the newest review/article/comparison date of that vertical, the same value its sitemap lastmod carries. Local build: /weight-loss Nov 24, /trt Nov 9. Live will show the CMS dates after deploy.

**C2 `ee52b08` Mobile (shared CSS and components), `41b1e55` LP disclosure.**
- Chat launcher clears the vs-page CTA bar (`battle-sticky-cta.tsx` publishes `--battle-cta-h`, `chat-helper.tsx` adds it to its bottom offset, existing safe-area kept). Verified: bar 720-844, launcher 632-692. Overlap with the "Visit" button on the vs page: 29 -> 0 scroll steps.
- Hit areas by padding with an equal negative margin (inline padding for inline links), phones only: brand link 38 -> 44, breadcrumb links 30 -> 44, footer links 17 -> 44 (49 -> 4 small per page; the 4 left are the "TRT" and "HRT" labels, 38-41px wide, and the two 36px social icons), footer "Advertising Disclosure" 27 -> 44, mobile menu rows 23 -> 44, in-table text links 18 -> about 38 (capped: more padding makes the table box scroll vertically, which I tested and reverted). Footer height identical to live (1195.3px); home, hubs and all non-prose pages have identical document height before and after.
- Body copy 14 / 14.5 / 15px prose -> 16px under 640px in 32 files (`sm:` keeps the desktop size). Body-copy share below 16px: review 67 -> 49%, vs 96 -> 75%, tracker 96 -> 52%, calculator 88 -> 63%, BMI 81 -> 55%, dose 81 -> 55%, about 65 -> 31%, how-we-rank 78 -> 57%, policy 96 -> 74%. Page height +2 to +5% on those (review +551px, vs +473, tracker +1068, about +337); prose only, no grid, hero or table moved.
- Disclosure bar 11.5 -> 12px, landing-page disclosure 10.5 -> 12px.

Before/after (local build, 390): small targets per page 4-145 -> 2-97 (home 58 -> 11, review 124 -> 75, vs 145 -> 97, reviewer 54 -> 5); footer 49 -> 4; breadcrumb 2 -> 0; in-table 10 -> 2 (calculator); overflow 0 pages before and after (390 and 360, 39 URLs); no new vertical scroll in any table (15 pages tested). Pairs-closer-than-8px rose by about 3 per page because padded boxes now touch; the visible spacing is unchanged. Lab LCP/CLS were not re-compared (the local run shared the CPU with a second run, numbers are not comparable).

Desktop pixel check at 1440, full page, before vs after: home, weight-loss hub, review, cost, vs, calculator, TRT article, legit: 0 differing pixels and identical heights on all eight (`desk-before/`, `desk-after/`).

## Not fixed (and why)
1. **Chat launcher and teaser over body text.** A fixed element covers prose at some scroll position wherever it sits; no offset prevents that. Options for the operator: hide the teaser on phones, hide the launcher while scrolling and bring it back after 1.5 s, or shrink it to 44px. All are behaviour or design changes. Evidence: `live/cost-390.png`, `live/new-eden-390.png`, `live/hub-wl-390.png`.
2. **Price strip rows (36px, touching) and the 12px "In this article" / related lists.** Making the strip rows 44px adds 8px to the header on every phone page; the lists are block links in spaced stacks. Layout changes, left for a design call.
3. **9px "out of 10" and 10.5px labels** inside rating badges and chips: enlarging them reflows the card header.
4. **Small card text (12.5-13.5px)** in provider cards and Reddit excerpts: card reflow.
5. **Breadcrumb schema vs visible mismatches (A6)**, **9 #668 links not live (A5)**, **prose-link distribution (A4)**: CMS or content decisions.
6. **Quiz page** loads client-side; first paint is a spinner on slow phones. Product change.
7. **Missing space defects** (same toolchain bug as the "12online" fix of Nov 22: a text node after an element loses its leading space): `glp1-dose-schedule/page.tsx:129` renders "Wegovysteps up every 4 weeks" (`live/dose-390.png`); `sources-methodology.tsx:63` and `glp1-pills-vs-injections/page.tsx:441` as before. One-line `{" "}` fixes; not mine to ship under this brief.
8. **Hotlinked Ro logo** `https://miro.medium.com/1*4gA6EVXzmJcXUby3SBRlZg.png` is in the CMS provider record and rendered on every page's payload and as an `<img>` on /weight-loss/go/top-5 (alt text showed in my sandbox, which cannot reach Medium). `public/logos/ro.svg` exists. Repoint it in the CMS.
9. Observation for house rules: the /weight-loss hub shows "34,284 people visited this site this month" under the top card. I did not trace its source; confirm it comes from real analytics or remove it.

## After deploy, check on the live site
1. /weight-loss/retatrutide-weight-loss shows "Last updated: Aug 9, 2026" and the JSON-LD says Aug 9; /weight-loss/glp1-cost-calculator shows Nov 22 (or newer); view-source on /weight-loss and /trt: WebPage dateModified follows the newest guide (not 2026-09-01).
2. On a phone-width window, /weight-loss/embody-vs-wellmedr: scroll 600px, the "Visit welludr" button is fully tappable and the chat launcher sits above the bar.
3. Footer links, breadcrumb and menu rows tap cleanly (no mis-taps between footer rows); open the mobile menu.
4. Body copy reads at 16px on review, vs, tracker, about; nothing overflows sideways at 360px.
5. 1440px: nothing moved on home, hub, review, cost, vs.
6. Re-run the crawl: still 0 redirecting/broken links; A5 count of live #668 links after the CMS re-seed (expect 34).
