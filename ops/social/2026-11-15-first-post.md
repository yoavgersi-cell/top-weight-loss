2026-11-15 · Author: Rio · Status: published (2026-11-15 14:53 UTC, on operator instruction) · Source page: https://www.treatmentshub.com/weight-loss/how-we-rank (section "How we verify prices", read 2026-11-15; page states "Last updated: Sep 1, 2026", medically reviewed Oct 30, 2026)

Request: operator asked for the first Instagram post of the new cycle; reference account top10.com; keep the tone, vibe and theme of the three existing posts; informative, not clickbait; purpose is an active owned asset for SEO/GEO/AEO. Input file: ops/social/2026-11-15-account-snapshot.md.

---

## Study 1: visual style of the three existing @treatmentshub posts

Viewed the downloaded JPEGs (post1-2026-11-12-1355, post2-2026-11-13-1308, post3-2026-11-13-1313). All three are square.

Shared system
- Wordmark "TreatmentsHub.com" top-left, navy "Treatments", blue "Hub", small ".com". It matches the site header asset `public/treatmentshub.webp`, so that asset is the verified source for the wordmark.
- Palette: very pale blue gradient background (around #e8f1fc to #d6e6fa), soft curved shapes in slightly deeper blue, a blue wave band across the bottom, navy headline text (around #0f1e3d), medium blue accents (around #2f6fe4 to #3b82f6), grey body copy.
- Typography: heavy geometric sans for the headline (Inter-like), regular weight for body. Headline is 2 to 3 short lines, body is 1 to 3 short lines.
- Structure: small pill label above the headline, headline, a thin curved blue underline "swoosh" under the headline, then body copy. Text on the image is a shortened variant of the caption's hook, not the caption itself.
- No logos of third parties, no prices, no product names, no Trustpilot, no bodies.

Per post
- Post 1 (Nov 12, "popular option" caption): text-only. Light-blue pill "Pro Tip" in blue text. Headline "The "best" option isn't always the most popular." Swoosh. Three-line grey body.
- Post 2 (Nov 13 13:08, "not all providers" caption): photo-led. AI-style image of a smiling woman holding a tablet in a bright office (faces visible, blurred colleagues), masked by a curved shape in the upper two thirds; pale-blue lower third with headline "Not all options are created equal.", swoosh, one body line.
- Post 3 (Nov 13 13:13, "more features" caption): text-only. Solid-blue pill "Fun fact:" with three small accent strokes, three-line headline "Most people only use a fraction of a product's features.", swoosh, two-line body, two wave bands at the bottom.

Decision for this post: follow the text-only system of posts 1 and 3 (two of three posts, and it needs no stock or AI people). Rendered at 1080x1350 as the skill specifies; the slightly taller canvas gets more breathing room above the bottom wave.

Note for the operator (not blocking): post 3's "Fun fact" headline is a statistic-shaped claim with no source on any of our pages. Under house rule 1 I would not repeat that pattern; every headline from here on is a statement we can point to on a page.

## Study 2: what top10.com does (reference account)

What I could and could not retrieve
- Instagram: not retrievable in this session. `instagram.com/top10.com/embed/` (and the `top10com` and `top10` variants) return Instagram's error shell (`PolarisErrorRoot` / `httpErrorPage`, title "Instagram", no captions or media). The profile page returns the logged-out app shell with no og: tags, and the `web_profile_info` endpoint returns 404 without a session. Both allowed CDN hosts (scontent-fra3-1 and scontent-fra5-1) are refused by the proxy with 403 on CONNECT. So I have no captions, hashtags or images from their account; the notes below on caption length and hashtags are not observed and are left out rather than guessed. Saved copies: scratchpad `ig-top10-embed.html`, `ig-top10-profile.html`.
- top10.com website (fetched 2026-11-15, 200): used for voice.

Voice on top10.com (verbatim phrases)
- Positioning: "Top10.com is a comparison platform that brings you useful top 10 lists ... that can help you save time and money"; "Find the Right Products & Services for Your Needs"; "Our experts evaluate and review the best solutions".
- Promise language: "without the guesswork", "choose with confidence", "We research, vet, and rank top providers, making it easier for you to find what you need", "We simplify complex buying choices by breaking down features, pricing, and real-world performance so you can save time, money, and headaches."
- Disclosure is up front and plain: "We earn commissions from brands listed on this site, which influences how listings are presented."
- Credibility signals: named experts with bios, round proof numbers ("500+ Comparison Lists", "5,000+ Hours of Research", "16M+ Decisions made with Top10.com"), a short FAQ in plain second person.
- Tone: calm, service-minded, second person, short declarative sentences, no exclamation marks, no scare language.

What that means for @treatmentshub
- The three existing posts already sit in this register ("Less guesswork. Easier comparisons." mirrors "without the guesswork"). Keep it.
- The one thing top10.com does that our posts do not yet: every statement is backed by something concrete (an expert, a method, a count). So the small improvement I propose is to anchor each post in one checkable rule from a live page, rather than a general principle. This post does that with the price-verification rule from How We Rank. It is still brand-level, no price, no medication, no provider.
- Hashtags: kept five, #TreatmentsHub first. Swapped one generic tag (#SmartChoices) for a topical one (#PriceTransparency) because the post is about that specific subject; the other four match the existing set.

---

## Channel and format
Instagram feed, single image (1080x1350 JPEG, 4:5). Account @treatmentshub (id 17841474421406954). Connector: Windsor.ai `instagram` / `create_image_post`. Not published, not scheduled; no connector write action has been called.

## Visual(s)
- File: /home/user/top-weight-loss/public/social/2026-11-15-first-post-1.jpg (1080x1350, about 84 KB, rendered with sharp from an SVG layer plus the site wordmark `public/treatmentshub.webp`; render script kept in the scratchpad, `render/first-post.mjs`).
- Public URL once deployed: https://www.treatmentshub.com/social/2026-11-15-first-post-1.jpg (must return 200 before publishing; the file is in the working tree only, not committed).
- What it shows: pale blue gradient background with a soft curve top-right and two wave bands at the bottom; wordmark top-left; light-blue pill "Good to know"; three-line navy headline "A price only means something with its condition attached."; blue swoosh underline; three-line grey body "Headline rate, regular rate, plan condition, shipping terms. We record all four before a number is published." No photo, no people, no logos other than our own wordmark, no numbers.
- Alt text for the post: "Text graphic from Treatments Hub: A price only means something with its condition attached. Headline rate, regular rate, plan condition, shipping terms. We record all four before a number is published."

## Caption (final text)
```
A price only means something with its condition attached.

The same monthly number can be a first-month rate or the regular rate, a 12-month plan or a prepaid term, and it may or may not include shipping. Comparing headline numbers alone can hide those differences.

At Treatments Hub, every price we publish records four things: the headline rate, the regular rate behind any promotion, the condition attached, and the shipping terms. A number is never published without its condition.

Our full method is on the How We Rank page.

🔗 treatmentshub.com

#TreatmentsHub #CompareProviders #PriceTransparency #CompareSmart #HealthAndWellness
```
(approx. 640 characters)

Fact trace (every sentence that states something about us):
- "every price we publish records four things: the headline rate, the regular rate behind any promotion, the condition attached, and the shipping terms" → How We Rank, "How we verify prices": "every entry records four things: the headline rate, the regular rate behind any promotion, the condition attached (plan length, first-month rate, prepaid term), and the shipping terms."
- "A number is never published without its condition." → same section, verbatim.
- "first-month rate ... 12-month plan ... prepaid term" → same section's examples of conditions ("plan length, first-month rate, prepaid term") and the Methodology FAQ ("first-month rates roll to the regular price from month two, plan-locked rates are labeled with their commitment, and prepaid plans show the checkout amount"). "12-month plan" appears on the page as a listed condition.
- "Our full method is on the How We Rank page." → the source page itself.
- Paragraph 2's first sentence is general reasoning, not a claim about any provider or figure.

## Alternative caption (same theme, different hook)
```
Four things to check before you trust a monthly price.

Is it the regular rate or a promotional one? What plan length or prepaid term is attached? Are shipping terms included? The headline number rarely answers all of that on its own.

At Treatments Hub, each price we publish records the headline rate, the regular rate behind any promotion, the condition attached, and the shipping terms. A number is never published without its condition.

Our full method is on the How We Rank page.

🔗 treatmentshub.com

#TreatmentsHub #CompareProviders #PriceTransparency #CompareSmart #HealthAndWellness
```
Same image works for both. If the operator picks this one, I would change the pill label on the image from "Good to know" to "Checklist" (one-line change in the render script).

## Hashtags
#TreatmentsHub #CompareProviders #PriceTransparency #CompareSmart #HealthAndWellness

## Proposed time
Monday 2026-11-17, 14:00 UTC (09:00 ET). The three existing posts went out at 13:08 to 13:55 UTC on weekdays and all show 0 likes and 0 comments, so there is no performance signal to optimise against yet; a weekday morning US slot keeps the cadence and gives the first data point. If the operator prefers to post today, the same caption and image stand.

## Compliance check
- facts traced ✓ (all to /weight-loss/how-we-rank, read 2026-11-15; no price figures, no medication names, no provider names, no clinical statements)
- compounded wording: n/a, no compounded product mentioned ✓
- "as of" dates: n/a, no price quoted ✓
- no testimonials / Trustpilot ✓ (none in caption or image; the How We Rank page itself discusses Trustpilot, none of that is carried over)
- disclosure: no provider named, so the "we may earn a commission" line is not required; the linked site carries the disclosure on every page with provider links ✓
- no medical advice, no before/after, no weight numbers ✓
- no hype, no "click now", emoji only on the link line (matches the existing three posts) ✓
- Instagram limits: caption under 2,200 chars, 5 hashtags, JPEG under 8 MB, 4:5 ✓

## After publishing
media id: 18136733377780556
time: 2026-11-15 14:53:55 UTC
link: https://www.instagram.com/p/DfxCpDKjdYo/
(published via Windsor.ai create_image_post; image URL verified 200 before publishing)

story: media id 18154831816468483, published 2026-11-16 (operator asked for a story the same day; image /social/2026-11-15-first-post-1-story.jpg)
