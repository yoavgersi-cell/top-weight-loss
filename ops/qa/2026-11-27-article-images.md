# Article images audit, Nov 27, 2026

- Date: 2026-11-27
- Author: Felix (QA and technical SEO)
- Status: ready (operator decision needed on image generation cost)
- Request: "Make sure all images in the hub page treatmentshub.com all articles have the image" (article images only)

Method: crawled https://www.treatmentshub.com (live, main at 5b7268a), the home page, the six hubs, the six /articles indexes, and all 269 article URLs from the six vertical sitemaps. Each card's image URL was fetched and checked for HTTP 200 with an image content-type. Each article page was fetched for status, og:image, JSON-LD image and an article image in the page.

## Headline

| Measure | Count |
|---|---|
| Articles in sitemaps (all return 200) | 269 |
| Articles with a real image file, registered in code and dims | 23 |
| Articles with no image at all (no file, no `image` field in code) | 246 |
| Cards whose image URL is broken (non-200 or non-image) | 0 |
| Cards that show an image although the article has none | 0 |
| Cards missing an image although the article HAS one | 0 |
| Article pages with a working og:image | 269 of 269 |
| Article pages whose JSON-LD has an image | 269 of 269 |

Result: there is no mechanical bug. Every article that has an image shows it on every card that lists it, and none of the 23 image URLs is broken. The gap is content: 246 articles have no image file. That is more than the 10 allowed without operator approval, so nothing was generated.

## Cards per listing page

| Page | Article cards | With image | Without image | Broken image |
|---|---|---|---|---|
| / | 9 | 3 | 6 | 0 |
| /weight-loss | 6 | 2 | 4 | 0 |
| /hair-loss | 6 | 0 | 6 | 0 |
| /trt | 6 | 0 | 6 | 0 |
| /hrt | 6 | 0 | 6 | 0 |
| /ed | 6 | 1 | 5 | 0 |
| /online-therapy | 6 | 0 | 6 | 0 |
| /weight-loss/articles | 97 | 22 | 75 | 0 |
| /hair-loss/articles | 46 | 0 | 46 | 0 |
| /trt/articles | 39 | 0 | 39 | 0 |
| /hrt/articles | 34 | 0 | 34 | 0 |
| /ed/articles | 31 | 1 | 30 | 0 |
| /online-therapy/articles | 24 | 0 | 24 | 0 |

Notes: the /weight-loss/articles count of 97 includes the featured card plus the grid (95 articles, two repeated). Hub pages show 6 cards from the shared latest-guides component, the home page 9. In-prose links to articles inside hub editorial copy are not cards and were excluded (56 anchors).

## Where each problem sits (code, stored copy, or card mapping)

- Card component (src/components/latest-guides.tsx, src/components/pages/articles-index-page.tsx): both already render `image` when present and fall back to the heroColor gradient. No mapping problem found. image-dims.json has all 23 registered files.
- Code: 23 `image:` references under src, all 23 files exist in public/article-images, all 23 are in src/lib/image-dims.json. No wrong paths.
- Stored copy (src/lib/config-store.ts, merge at about line 5002): code image and imageAlt are overlaid onto every saved article, so a stored snapshot cannot hide a code image. Live output matches code exactly (23 and 23), which is consistent with that. The stored blob itself was not read (no token in this environment), so a stored article carrying its own image field for a slug with no code image cannot be ruled out, but none appears on the live site.
- The 246 articles below are missing in all three places: no file, no code field.

## Articles with an image (23)

- /ed/articles/sildenafil-not-working
- /weight-loss/articles/best-tirzepatide-online
- /weight-loss/articles/choosing-telehealth-weight-loss-provider
- /weight-loss/articles/compounded-semaglutide-going-away
- /weight-loss/articles/compounded-semaglutide-units-to-mg
- /weight-loss/articles/compounded-semaglutide-vs-brand-name
- /weight-loss/articles/exercise-while-on-glp1-medication
- /weight-loss/articles/first-month-weight-loss-medication
- /weight-loss/articles/glp1-and-mental-health
- /weight-loss/articles/glp1-weight-loss-online-complete-guide
- /weight-loss/articles/how-glp1-medications-work
- /weight-loss/articles/how-to-cancel-telehealth-glp1-subscription
- /weight-loss/articles/how-to-get-ozempic-online
- /weight-loss/articles/is-eden-legit
- /weight-loss/articles/mounjaro-vs-ozempic
- /weight-loss/articles/ozempic-vs-wegovy-differences
- /weight-loss/articles/semaglutide-side-effects-guide
- /weight-loss/articles/stopping-glp1-medication-what-happens
- /weight-loss/articles/tirzepatide-vs-semaglutide
- /weight-loss/articles/weight-loss-medication-cost-guide
- /weight-loss/articles/weight-loss-plateau-what-to-do
- /weight-loss/articles/what-to-eat-on-glp1-medication
- /weight-loss/articles/who-qualifies-for-glp1-weight-loss

## Fallback behaviour for articles without an image

Card: heroColor gradient with the category chip (not a photo). Article page: no body image; og:image and JSON-LD image use the generated dynamic opengraph-image route (article-page.tsx falls back to DEFAULT_OG_IMAGE in schema). These are the "generic fallback" articles; the list is the same as below.

## Articles with no image (246), by vertical

### weight-loss (73 of 95)

- /weight-loss/articles/503a-vs-503b-pharmacy-28-day-rule
- /weight-loss/articles/altrx-alternatives
- /weight-loss/articles/altrx-cost
- /weight-loss/articles/are-altrx-embody-welludr-same-company
- /weight-loss/articles/before-you-prepay-glp1
- /weight-loss/articles/best-glp1-for-weight-loss
- /weight-loss/articles/best-mounjaro-alternatives
- /weight-loss/articles/best-noom-alternatives
- /weight-loss/articles/best-ozempic-alternatives
- /weight-loss/articles/best-ro-alternatives
- /weight-loss/articles/best-wegovy-alternatives
- /weight-loss/articles/can-you-get-ozempic-without-doctor
- /weight-loss/articles/directmeds-alternatives
- /weight-loss/articles/directmeds-cost
- /weight-loss/articles/embody-alternatives
- /weight-loss/articles/embody-cost
- /weight-loss/articles/embody-tirzepatide-review
- /weight-loss/articles/embody-vs-ro-weight-loss
- /weight-loss/articles/emotional-eating-and-weight-loss
- /weight-loss/articles/foundayo-vs-wegovy-pill
- /weight-loss/articles/glp1-after-65-medicare
- /weight-loss/articles/glp1-and-alcohol
- /weight-loss/articles/glp1-coverage-2027-employers-dropping
- /weight-loss/articles/glp1-microdosing-complete-guide
- /weight-loss/articles/glp1-muscle-loss-how-to-protect-lean-mass
- /weight-loss/articles/glp1-true-cost-month-1-vs-year-one
- /weight-loss/articles/glp1-weight-loss-for-women
- /weight-loss/articles/glp1-weight-loss-medications-guide
- /weight-loss/articles/glp1-weight-loss-over-40
- /weight-loss/articles/glp1-weight-loss-results
- /weight-loss/articles/glp1-with-insurance
- /weight-loss/articles/healthrx-alternatives
- /weight-loss/articles/healthrx-cost
- /weight-loss/articles/how-long-for-semaglutide-to-work
- /weight-loss/articles/how-to-start-glp1-treatment-online
- /weight-loss/articles/in-person-vs-online-weight-loss
- /weight-loss/articles/is-altrx-legit
- /weight-loss/articles/is-directmeds-legit
- /weight-loss/articles/is-embody-legit
- /weight-loss/articles/is-healthrx-legit
- /weight-loss/articles/is-medvi-legit
- /weight-loss/articles/is-ro-legit
- /weight-loss/articles/is-shed-legit
- /weight-loss/articles/is-sprout-legit
- /weight-loss/articles/is-trimrx-legit
- /weight-loss/articles/is-wellmedr-legit
- /weight-loss/articles/lost-insurance-coverage-zepbound-wegovy
- /weight-loss/articles/medvi-alternatives
- /weight-loss/articles/medvi-cost
- /weight-loss/articles/medvi-tirzepatide-cost
- /weight-loss/articles/menopause-weight-gain
- /weight-loss/articles/next-generation-weight-loss-drugs
- /weight-loss/articles/ozempic-face
- /weight-loss/articles/ozempic-hair-loss
- /weight-loss/articles/ro-cost
- /weight-loss/articles/semaglutide-cost-per-month
- /weight-loss/articles/shed-alternatives
- /weight-loss/articles/shed-cost
- /weight-loss/articles/sprout-alternatives
- /weight-loss/articles/sprout-cost
- /weight-loss/articles/stopping-glp1-weight-regain-complete-guide
- /weight-loss/articles/testosterone-and-weight-loss
- /weight-loss/articles/trimrx-alternatives
- /weight-loss/articles/trimrx-cost
- /weight-loss/articles/wegovy-pill-price-online
- /weight-loss/articles/weight-loss-medication-that-works-fast
- /weight-loss/articles/weight-loss-medication-without-insurance
- /weight-loss/articles/wellmedr-alternatives
- /weight-loss/articles/wellmedr-cost
- /weight-loss/articles/what-100-to-200-a-month-gets-you-glp1
- /weight-loss/articles/zepbound-price-online
- /weight-loss/articles/zepbound-vs-wegovy
- /weight-loss/articles/zepbound-vs-wegovy-vs-ozempic

### hair-loss (46 of 46)

- /hair-loss/articles/best-online-hair-loss-treatment
- /hair-loss/articles/breezula-clascoterone-hair-loss
- /hair-loss/articles/can-stress-cause-hair-loss
- /hair-loss/articles/dht-and-hair-loss
- /hair-loss/articles/do-hair-loss-shampoos-work
- /hair-loss/articles/does-creatine-cause-hair-loss
- /hair-loss/articles/does-finasteride-lower-testosterone
- /hair-loss/articles/does-finasteride-work
- /hair-loss/articles/does-minoxidil-work
- /hair-loss/articles/dutasteride-online
- /hair-loss/articles/dutasteride-vs-finasteride
- /hair-loss/articles/finasteride-and-minoxidil-together
- /hair-loss/articles/finasteride-side-effects
- /hair-loss/articles/finasteride-vs-minoxidil
- /hair-loss/articles/glp1-hair-loss
- /hair-loss/articles/hair-loss-treatment-cost
- /hair-loss/articles/hair-loss-treatment-for-women
- /hair-loss/articles/hair-transplant-vs-medication
- /hair-loss/articles/happyhead-alternatives
- /hair-loss/articles/happyhead-cost
- /hair-loss/articles/hims-alternatives
- /hair-loss/articles/how-long-hair-loss-treatment-works
- /hair-loss/articles/how-to-get-finasteride-online
- /hair-loss/articles/how-to-stop-hair-loss
- /hair-loss/articles/iron-deficiency-hair-loss
- /hair-loss/articles/is-happyhead-legit
- /hair-loss/articles/is-maximus-legit
- /hair-loss/articles/is-petermd-legit
- /hair-loss/articles/keeps-alternatives
- /hair-loss/articles/male-pattern-baldness-explained
- /hair-loss/articles/maximus-alternatives
- /hair-loss/articles/maximus-cost
- /hair-loss/articles/menopause-hair-loss
- /hair-loss/articles/microneedling-for-hair-loss
- /hair-loss/articles/minoxidil-shedding-phase
- /hair-loss/articles/new-hair-loss-treatments-pipeline
- /hair-loss/articles/norwood-scale
- /hair-loss/articles/online-hair-loss-treatment-guide
- /hair-loss/articles/oral-minoxidil-online
- /hair-loss/articles/oral-minoxidil-vs-topical-minoxidil
- /hair-loss/articles/petermd-alternatives
- /hair-loss/articles/petermd-cost
- /hair-loss/articles/receding-hairline-treatment
- /hair-loss/articles/saw-palmetto-hair-loss
- /hair-loss/articles/topical-finasteride
- /hair-loss/articles/veradermics-vdphl01

### trt (39 of 39)

- /trt/articles/best-online-trt-clinics-compared
- /trt/articles/can-you-stop-trt
- /trt/articles/does-trt-cause-hair-loss
- /trt/articles/does-trt-increase-libido
- /trt/articles/easiest-way-to-get-trt-online
- /trt/articles/enclomiphene-vs-trt
- /trt/articles/free-vs-total-testosterone
- /trt/articles/how-low-testosterone-is-diagnosed
- /trt/articles/how-to-get-trt-online
- /trt/articles/is-trt-bad-for-you
- /trt/articles/is-trt-covered-by-insurance
- /trt/articles/is-trt-safe
- /trt/articles/low-testosterone-symptoms
- /trt/articles/natural-ways-to-boost-testosterone
- /trt/articles/normal-testosterone-levels-by-age
- /trt/articles/online-doctors-that-prescribe-testosterone
- /trt/articles/online-trt-dea-deadline-2026
- /trt/articles/online-trt-guide
- /trt/articles/signs-of-low-testosterone
- /trt/articles/testosterone-cypionate-vs-enanthate
- /trt/articles/testosterone-injections-vs-cream-vs-oral
- /trt/articles/testosterone-injections-vs-gel
- /trt/articles/testosterone-levels-by-age
- /trt/articles/trt-and-estrogen
- /trt/articles/trt-and-fertility
- /trt/articles/trt-benefits
- /trt/articles/trt-blood-work
- /trt/articles/trt-clinic-vs-online
- /trt/articles/trt-cost
- /trt/articles/trt-for-bodybuilding
- /trt/articles/trt-guide
- /trt/articles/trt-results-timeline
- /trt/articles/trt-side-effects
- /trt/articles/trt-vs-steroids
- /trt/articles/types-of-trt
- /trt/articles/weight-loss-testosterone-glp1-vs-trt
- /trt/articles/what-causes-low-testosterone
- /trt/articles/what-is-medvi-quad
- /trt/articles/what-is-trt

### hrt (34 of 34)

- /hrt/articles/best-online-hrt-providers-compared
- /hrt/articles/bioidentical-hormones-explained
- /hrt/articles/does-hrt-cause-weight-gain
- /hrt/articles/estrogen-patch-shortage
- /hrt/articles/estrogen-patch-vs-pill
- /hrt/articles/gala-cost
- /hrt/articles/how-long-can-you-stay-on-hrt
- /hrt/articles/how-to-get-hrt-online
- /hrt/articles/hrt-and-hair-thinning
- /hrt/articles/hrt-and-libido
- /hrt/articles/hrt-black-box-warning-removed
- /hrt/articles/hrt-for-menopause-guide
- /hrt/articles/hrt-for-perimenopause
- /hrt/articles/hrt-pros-and-cons
- /hrt/articles/hrt-side-effects
- /hrt/articles/hrt-vs-birth-control
- /hrt/articles/is-gala-legit
- /hrt/articles/is-hrt-safe
- /hrt/articles/is-hrt-the-same-as-trt
- /hrt/articles/is-midi-legit
- /hrt/articles/is-winona-legit
- /hrt/articles/menopause-complete-guide
- /hrt/articles/menopause-hormone-therapy-2026-what-changed
- /hrt/articles/midi-cost
- /hrt/articles/non-hormonal-menopause-treatment
- /hrt/articles/online-hrt-cost
- /hrt/articles/perimenopause-symptoms
- /hrt/articles/perimenopause-vs-menopause
- /hrt/articles/progesterone-side-effects
- /hrt/articles/testosterone-for-menopausal-women
- /hrt/articles/what-is-hrt
- /hrt/articles/when-to-start-hrt
- /hrt/articles/winona-cost
- /hrt/articles/winona-products

### ed (30 of 31)

- /ed/articles/alternatives-to-viagra-and-cialis
- /ed/articles/best-4-in-1-ed-medication
- /ed/articles/best-ed-medicine
- /ed/articles/best-ed-treatments-compared
- /ed/articles/buying-ed-medication-online-safely
- /ed/articles/can-low-testosterone-cause-ed
- /ed/articles/daily-vs-as-needed-tadalafil
- /ed/articles/ed-and-diabetes
- /ed/articles/ed-in-your-20s-and-30s
- /ed/articles/ed-medication-side-effects
- /ed/articles/ed-pills-and-blood-pressure-medication
- /ed/articles/ed-treatment-cost
- /ed/articles/ed-treatment-near-me
- /ed/articles/ed-treatment-options-compared
- /ed/articles/erectile-dysfunction-heart-disease-warning-sign
- /ed/articles/erectile-dysfunction-statistics
- /ed/articles/erectile-dysfunction-treatment-complete-guide
- /ed/articles/fastest-acting-ed-treatments
- /ed/articles/glp1-and-erectile-dysfunction
- /ed/articles/how-long-does-sildenafil-last
- /ed/articles/how-to-get-ed-treatment-online
- /ed/articles/latest-ed-treatments
- /ed/articles/natural-ed-remedies
- /ed/articles/over-the-counter-ed-treatment
- /ed/articles/quad-vs-bluechew
- /ed/articles/quad-vs-rugiet
- /ed/articles/sildenafil-doses-explained
- /ed/articles/sildenafil-vs-cialis
- /ed/articles/trimix-for-ed
- /ed/articles/what-causes-erectile-dysfunction

### online-therapy (24 of 24)

- /online-therapy/articles/ai-therapy-chatbots-vs-online-therapy
- /online-therapy/articles/cbt-online
- /online-therapy/articles/does-betterhelp-take-insurance
- /online-therapy/articles/does-medicare-cover-online-therapy
- /online-therapy/articles/does-online-therapy-work
- /online-therapy/articles/does-talkspace-take-insurance
- /online-therapy/articles/free-and-low-cost-therapy-options
- /online-therapy/articles/how-much-does-betterhelp-cost
- /online-therapy/articles/how-to-choose-an-online-therapy-platform
- /online-therapy/articles/is-betterhelp-legit
- /online-therapy/articles/is-talkiatry-legit
- /online-therapy/articles/online-couples-therapy
- /online-therapy/articles/online-psychiatry
- /online-therapy/articles/online-therapy-cost
- /online-therapy/articles/online-therapy-for-anxiety
- /online-therapy/articles/online-therapy-for-depression
- /online-therapy/articles/online-therapy-psychiatry-guide
- /online-therapy/articles/online-therapy-reddit
- /online-therapy/articles/online-therapy-that-takes-insurance
- /online-therapy/articles/online-therapy-vs-in-person
- /online-therapy/articles/online-therapy-with-medication
- /online-therapy/articles/telehealth-controlled-substances-dea-rules-2026
- /online-therapy/articles/therapy-vs-psychiatry
- /online-therapy/articles/types-of-therapy

## Decision needed

Generating 246 images with scripts/article-image.mjs is a paid API run (1600x900 WebP each, plus alt text and dims entry per article), above the 10-image limit, so it was not started. Options for the operator: approve all; approve a priority subset (suggest the ones surfaced on the home page and the six hub grids first, 6 cards each); or accept the gradient card as the intended fallback for the long tail. Per the house rules, images show in the grid card and float beside the first section, never in the masthead.

## What was changed

Nothing in code. No mechanical regressions found.

## Not confirmed

- The stored config blob (see above).
- Local build, tsc and screenshots were not run because no code changed; the live site is main at 5b7268a.
