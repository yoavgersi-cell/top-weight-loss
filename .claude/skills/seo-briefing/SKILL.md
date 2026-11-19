---
name: seo-briefing
description: How Cleo turns search data into priorities and briefs: where the data is, how to score opportunities, the weekly-review and content-brief templates, and the title/description rules that convert on this site.
---

# SEO briefing

Load `house-rules` first. Outputs go to `ops/briefs/`.

## 1. Data sources, in order of trust
- **Google Search Console** and **Bing Webmaster** when connected; otherwise the operator's latest CSV exports (ask for: queries, pages, AI/Copilot citation report). Never estimate traffic. If nothing is connected and no export is at hand, the review says "no fresh data" and stops at qualitative work.
- **Site inventory**: `src/data/articles.ts`, `src/lib/seeds/*`, `src/lib/price-index.ts`, `src/lib/ed-price-index.ts`, sitemaps at `/sitemap-*.xml`, `/llms.txt`.
- **Competitors**: read the top 5 results for the target query directly (WebFetch); note what each covers, its sources, its tables, its dates.
- **Ahrefs** (MCP server `Ahrefs`, tools `mcp__Ahrefs__*`): the standard source for keyword demand, difficulty, SERP shape, competitor pages and backlinks, and Brand Radar for AI-answer citations. Rules: run `mcp__Ahrefs__doc` for a tool before its first call (it holds the real input schema); run `subscription-info-limits-and-usage` once per session and write the plan and remaining units at the top of the brief; monetary fields are USD cents; when a result says `render_with`, call that render tool. Useful calls: `site-explorer-organic-keywords` and `site-explorer-top-pages` (ours and a competitor's), `site-explorer-organic-competitors`, `keywords-explorer-overview` / `-matching-terms` / `-related-terms`, `serp-overview`, `site-explorer-referring-domains`, `brand-radar-*`. On the Free plan only `public-domain-rating-free` answers for arbitrary domains; say "Ahrefs: free plan, no data" rather than estimating.
- **Keyword Tool** (MCP server `Keyword_Tool_Free_SEO_Keyword_Research`, guest plan): question and phrasing mining per seed keyword, country "United States". For every brief: run `questions` and `prepositions` on Google for the target query, `questions` on Bing, and `rising` on Google Trends; put the 10 most relevant questions into the brief's structure (H2s phrased as questions, FAQ). It returns keyword strings; volume appears only on the first 5 cached rows, so quote a volume only when the row carries one and say "Keyword Tool, cached". Quota 60/hour, 120/day: budget 5 to 8 calls per brief, check `keywordtool-quota-guest` first.
- **Keyword tools fallback**: DataForSEO when connected; WebSearch as the last fallback for demand signals, labelled as such.
- Past baselines live in the repo history and earlier briefs; compare before calling anything a trend.

## 1a. Coverage map
`coverage-map.md` in this folder is the operator's 14-folder SEO map with the owner and known gap for each. Every weekly review ends with a one-line-per-folder status (checked / not measured / gap unchanged) so nothing is silently skipped. Update the gap column when something ships.

## 1b. Content cadence (operator rule, 2026-11-19)
**One to two articles a week, total, across all six verticals combined** — not one to two per vertical. Rotate so weight loss, ED, TRT, HRT, online therapy and hair loss all get turns over a month; weight loss does not monopolise. Track the rotation in `ops/briefs/content-calendar.md` (week, vertical, slug, the edge, status) and pick the next vertical from demand and gap, not blind round-robin.
**Value bar — the gate before any article is commissioned.** Write it only if it clears at least one verifiable edge no ranking competitor has: a dated verified price/comparison table, a time-point or unit correction, a counted complaint or outcome table, a primary-source quote (FDA letter, label, guideline) read and dated, or a calculation (cost per usable dose). If a candidate cannot clear the bar this week, **skip it and ship nothing rather than filler** — one strong page beats two weak ones. State the specific edge in the brief; if Atlas cannot verify it, the article does not proceed.
Each Monday Cleo proposes the week's one or two candidates (vertical, query, the edge, why now) from the weekly review and the trend research; the operator picks; the pipeline runs. A refresh of an existing page counts as the week's article when its data has aged or its intent shifted.

## 2. Scoring an opportunity
Score each candidate 1 to 5 on: demand (impressions or clear intent), position (4 to 15 is the sweet spot), authority fit (do we already rank for neighbours?), data edge (can Atlas get primary numbers competitors lack?), commercial fit (does it lead to a provider decision without forcing it?), **and the vertical's turn in the rotation**. Rank by the sum; write up the top two or three only.

## 3. Weekly review template (`ops/briefs/YYYY-MM-DD-weekly-review.md`)
```
Date · Author: Cleo · Data: <source, date range>
## Three actions this week (ranked, one line each, expected effect)
## Movers: pages up / down in clicks (top 5 each, with the query behind the move)
## CTR gaps: impressions ≥ 500, CTR below position average (page, query, current title)
## Positions 4–15 with volume (page, query, what would move it)
## Cannibalisation (two pages, one query)
## AI citations (Copilot/other share by page; new cited URLs; apex vs www)
## Freshness: pages whose prices or labels aged (what changed, source)
```

## 4. Content brief template (`ops/briefs/YYYY-MM-DD-<slug>.md`)
```
Date · Author: Cleo · Status: ready · Next: Atlas|Sloane
## Target: query, intent, the real question behind it
## Why now: data (impressions, position, citation gap) or event (label change, price move)
## What ranks today: top 5, each in one line (covers / misses / sources quality)
## Our edge: the one thing this page will have that none of them has
## Must-have figures and tables (what Atlas should verify, with likely primary sources)
## Structure: proposed H2s (≥2 phrased as questions), the short answer, the edge section
## Internal links in (which strong pages link here) and out
## Provider block: which rule applies (top-2 picks / vertical top-2 / none)
## Title and description candidates (≤60 / ≤160 chars; for legit pages keep "Legit or a Scam?")
```

## 5. Title and description rules that have measured well here
- "Is <brand> Legit or a Scam?" phrasing converts at 50 to 100% on Bing; keep it on legit pages.
- A specific number in the title or description ("$41/mo", "56 of 100") beats adjectives.
- Year in the title for anything price- or label-dependent.
- Descriptions answer the question, then name the proof ("verified on each provider's site").
