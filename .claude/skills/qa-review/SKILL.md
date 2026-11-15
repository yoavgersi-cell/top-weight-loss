---
name: qa-review
description: Felix's review procedure for content PRs and the weekly technical audit: fact verification, house-rules check, rendering screenshots, schema and SEO checks, audit scripts, and the verdict template.
---

# QA review

Load `house-rules` and `shipping` first. Output: `ops/qa/<slug>.md` (content PR) or `ops/qa/YYYY-MM-DD-technical-audit.md` (weekly).

## 1. Content PR review
Check out the PR branch, build, serve (see `shipping`), then:
1. **Facts.** Open every external link in the article. For each figure confirm value, unit, population, time point and document date match the research file and the source. One mismatch blocks.
2. **House rules.** Compounded wording present; trial time points framed as assessment points; reviewer names exact; author is the research team; no testimonials; no prices outside the verified index; no model identifiers.
3. **Rendering.** Your own screenshots at 1440 and 390: masthead, first table, provider block, FAQ section. Tables must scroll or wrap on the phone, never overflow the page.
4. **SEO and schema.** `curl` the page and check: one `<h1>`, title ≤60, description ≤160, no heading skips, `?` headings present, JSON-LD parses, Article has `image`, `datePublished`, `dateModified`, author `@type: Organization`, FAQPage present, canonical absolute, internal links return 200.
5. **Audit.** `scripts/seo-audit.mjs` PASS on the branch build.
6. **Diff hygiene.** Only the files the change needs; no stray scratch files; `image-dims.json` regenerated if images were added.

Verdict file:
```
# QA: <slug>  ·  Date · Reviewer: Felix · PR: <link>
Verdict: approve | approve with notes | block
## Blockers (file:line, what, why, the fix)
## Notes (non-blocking)
## Verified sources (count opened / count matching)
## Screenshots checked (paths)
## Audit: PASS/FAIL (warnings)
```
Post the verdict as a PR review with the attribution footer. You do not merge content PRs.

## 2. Weekly technical audit
1. Build `main`, serve, run both audit scripts; save the deep report JSON next to the previous one and diff the counts.
2. Spot-check in the rendered HTML: robots.txt, sitemap index lastmods, `/llms.txt` links, `/feed.xml`, OG image on three page types, 404 status for a bogus URL, JSON-LD on one page per template (article, review, battle, index, hub).
3. External signals when connected: Search Console coverage and enhancement reports (Datasets, FAQ, breadcrumbs), PageSpeed/CrUX for the hub and one article, IndexNow workflow runs in GitHub Actions.
4. **Mechanical fixes you may ship yourself**: missing schema fields, wrong `rel`, missing dims or alt, og tags, duplicate sitemap URLs, heading levels, broken internal links, title/description length. Branch, fix, build, both screenshots, audits PASS, PR, squash-merge, reset.
5. **Recommend, do not change**: anything that alters content meaning, prices, rankings, design, or provider presentation.
Report leads with "what changed since last week", then fixed, then recommended.
