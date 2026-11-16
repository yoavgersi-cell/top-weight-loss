# Migration check: topweightloss.io to treatmentshub.com

- Date: 2026-11-16 · Author: Felix · Status: ready
- Answers: Cleo's weekly review 2026-11-16, section 1 checklist and actions 1 and 2.
- Method: curl from this sandbox against the live hosts (https only; plain http is not reachable through the proxy), hub HTML read live, `src/proxy.ts` read on origin/main 51c490e.

## Verdict
The move is live and correct from www: every checked legacy www URL answers a single 301 to its hub target and the target returns 200. The bare apex adds one hop (Vercel 308 apex to www, then the 301), legacy robots and sitemap still serve the old URLs for recrawl, and the hub HTML carries nothing pointing back at the legacy host. Three items need the operator (GSC/Bing consoles, plain-http, the many-to-one decision).

## Redirect hops (https, read 2026-11-16)
| Legacy path | www.topweightloss.io | topweightloss.io (apex) | Final |
|---|---|---|---|
| `/` | 301 -> /weight-loss | 308 -> www, 301 -> /weight-loss | 200 |
| `/medvi-vs-trimrx` | 301 -> /weight-loss/medvi-vs-trimrx | 308, 301 same | 200 |
| `/articles/glp1-weight-loss-medications-guide` | 301 -> /weight-loss/articles/… (1:1) | 308, 301 same | 200 |
| `/reviews/eden` | 301 -> /weight-loss/reviews/eden | 308, 301 same | 200 |
| `/best-online-weight-loss-programs` | 301 -> /weight-loss/best-online-weight-loss-programs | 308, 301 same | 200 |
| `/articles/noom-vs-glp1-providers` | 301 -> /weight-loss/best-online-weight-loss-programs (many-to-one) | 308, 301 same | 200 |
| `/noom-vs-altrx` | 301 -> …/best-online-weight-loss-programs (many-to-one) | 308, 301 same | 200 |
| `/shed-vs-embody` | 301 -> …/best-online-weight-loss-programs (many-to-one) | 308, 301 same | 200 |
| `/articles/embody-vs-ro-weight-loss` | 301 -> /weight-loss/articles/embody-vs-ro-weight-loss (1:1) | 308, 301 same | 200 |

All targets are `https://www.treatmentshub.com/...`. The apex 308 is Vercel's domain-level apex-to-www redirect, not the proxy; two hops is within what Google follows, but a single hop would need the apex attached to the deployment without the Vercel redirect so the proxy's own 301 fires first (operator/Vercel setting, not code).

## robots.txt and sitemap.xml on the legacy host
- `/robots.txt`: www 200 (apex 308 to www). `Allow: /`, `Disallow: /admin`, `/api/`; not blocking. `Sitemap:` points at `https://www.topweightloss.io/sitemap.xml`.
- `/sitemap.xml`: www 200, `application/xml`, 183 URLs, all on `https://www.topweightloss.io` (the OLD URLs, so Google keeps recrawling them into the 301s), lastmod 2026-09-01/02/15. Contains 9 of the 10 ranking legacy URLs in Cleo's list; `/articles/noom-vs-glp1-providers` is not in it.
- Matches the proxy: the matcher `/((?!_next/|api/|admin|.*\..*).*)` excludes dotted paths, so both files are served by the legacy routes, not redirected.

## Hub HTML
`/weight-loss`, `/weight-loss/medvi-vs-trimrx`, `/weight-loss/reviews/eden`: canonical is the own www.treatmentshub.com URL, `robots: index, follow`, no `topweightloss.io` string anywhere in the HTML, feeds point at the hub. Nothing points back at the legacy host.

## src/proxy.ts, legacy-host handling (lines 220 to 245)
`host.includes("topweightloss") && WEIGHT_LOSS_MIGRATED` (flag true, `src/lib/site-context.ts:21`): protocol https, host www.treatmentshub.com, then in one pass: `PATH_REDIRECTS` full-path match, else `ROOT_PAGES`, else `SLUG_ALIASES` on the last segment, then prefix `/weight-loss` (bare `/` becomes `/weight-loss`). One 301 for every case. Observation (not changed): a legacy request that already starts with `/weight-loss/` would be double-prefixed to `/weight-loss/weight-loss/...`; the legacy site never served such URLs, so no live impact seen.

## Many-to-one redirects (operator decision: accept consolidation or restore 1:1)
| Legacy URL (GSC impressions, window A) | Redirects to | 1:1 hub page exists? |
|---|---|---|
| `/articles/noom-vs-glp1-providers` (~400, pos ~9) | `/weight-loss/best-online-weight-loss-programs` | No (`PATH_REDIRECTS`, path-redirects.ts:39; no article data) |
| `/noom-vs-altrx` (~30, pos ~4) | same programs page | No (`SLUG_ALIASES`, slug-aliases.ts:32; no battle data) |
| `/shed-vs-embody` (~60, pos ~8-9) | same programs page | No (slug-aliases.ts:36) |
| `/trimrx-vs-directmeds` (~40, pos ~7) | `/weight-loss/articles/trimrx-alternatives` | No (path-redirects.ts:48; `/weight-loss/trimrx-alternatives` bare form 404s, the `/articles/` target 200s) |
Already 1:1 and live (200): `/medvi-vs-trimrx` (~570), `/best-online-weight-loss-programs` (~750), `/articles/embody-vs-ro-weight-loss` (~130), `/articles/glp1-weight-loss-medications-guide`, `/reviews/eden`, `/articles/best-ro-alternatives` (hub page 200; legacy hop follows the default prefix rule, not curled). Restoring 1:1 for the four above means new content (a Noom-vs-GLP1 guide, three battle pages), which is Sloane/operator work, not a redirect fix.

## Cannot be checked from here (operator)
1. Search Console: Change of Address submitted for topweightloss.io to treatmentshub.com; URL Inspection on `/medvi-vs-trimrx`, `/best-online-weight-loss-programs`, `/articles/embody-vs-ro-weight-loss` should read "Page with redirect" with the hub URL as Google-selected canonical.
2. Bing Webmaster: Site Move submitted.
3. Plain `http://` upgrade on both legacy hosts (the sandbox proxy answers 405 to non-TLS requests).

## Shipped
- PR #626 (squash-merged): `/weight-loss/reviews/welludr` and `/weight-loss/articles/is-welludr-legit` 301 once to the wellmedr pages via `PATH_REDIRECTS` (`src/lib/path-redirects.ts`), on the hub and on the legacy host. `SLUG_ALIASES` was not usable (it drops the `/reviews` and `/articles` segments). tsc clean, build 0 errors, seo-audit PASS (0 fails, 2 warns, 479 pages). Verified live 2026-11-16 ~07:32 UTC: both welludr URLs 301 once to the wellmedr pages (200), and `https://www.topweightloss.io/reviews/welludr` 301s once to the hub wellmedr review. Vercel deploy of e36bbcb succeeded; IndexNow workflow fired on it.
