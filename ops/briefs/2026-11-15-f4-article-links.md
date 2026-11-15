# F4: six bare battle links in three live article bodies, plus one dead index entry

- Date: 2026-11-15
- Author: Sloane (content)
- Status: ready
- Answers: operator approval of finding F4 in Felix's technical audit (`ops/qa/2026-11-15-technical-audit.md`, row F4 and Appendix C). Scoping only. Nothing under `src/` or `public/` was edited, and no write endpoint was called. Live checks were made with `curl` against https://www.treatmentshub.com on 2026-11-15.

## 1. Summary

- The three article bodies are **not in the repo**. They are the CMS-saved copies in the weight-loss Blob (`site-config.json`, key `articles[]`, field `sections[].body`). The repo fallback copies of the same slugs already carry prefixed hrefs (and the Noom article in the repo has no battle links at all), so a code edit cannot fix the live page.
- Four of the six links only need a prefixed href; the sentence can stay. Two (`/altrx-vs-noom`, `/noom-vs-ro`) point at comparisons that do not exist and land on the programs ranking, so the sentence should change (wording proposed below, needs a yes).
- Apply path: **(b) the admin config API**, or equivalently **(a) the admin UI**. Both write the same Blob. (c) does not apply to the bodies. One optional mechanical safety net for Felix is listed at the end.
- The articles-index entry `best-weight-loss-telehealth-providers` is a **retired Blob-only article record**. It should be deleted in the CMS; Felix's index filter is the backstop.

## 2. Where the bodies live (evidence)

| Check | Result |
|---|---|
| `grep` of `src/` for `href="/altrx-vs-ro"`, `/altrx-vs-noom`, `/noom-vs-ro`, `/noom-vs-found`, `/noom-vs-shed`, `/altrx-vs-embody` | 0 matches. Every battle href in `src/data/articles.ts` is already `/weight-loss/...`. |
| Repo copy of `best-ro-alternatives` (`src/data/articles.ts:1101`) | links `/weight-loss/altrx-vs-ro` (prefixed). |
| Repo copy of `best-noom-alternatives` (`src/data/articles.ts:1551`) | no `-vs-` links at all; the live body has four. The live text is a different, CMS-saved version. |
| Repo copy of `embody-alternatives` (`src/data/articles.ts:1884`) | links `/weight-loss/altrx-vs-embody` (prefixed). |
| Live HTML of the three pages (fetched today) | exactly the six bare hrefs Felix listed, one each. |
| Loader: `src/lib/config-store.ts:4808-4857` | For weight-loss, `getConfig()` keeps the **saved** article for any slug the Blob has and only overlays `image`/`imageAlt` and the newer `updatedAt` from code. None of the three slugs is in `codeAuthoritativeGuides` or `brandClusterArticles`, so the Blob text wins. |
| Load-time link rewrite: `src/lib/config-store.ts:4083-4091` (`BARE_WL_LINK_RE`) | Rewrites bare `/reviews/...`, `/articles/...` and a fixed list of landing-page roots to `/weight-loss/...`. Battle slugs (`x-vs-y`) are not in the pattern, which is why these six survived the domain migration. |
| Save path: `src/app/admin/page.tsx:62-82` -> `PUT /api/config?vertical=weight-loss` (`src/app/api/config/route.ts:33-44`) -> `saveConfig()` (`src/lib/config-store.ts:4950`) | The admin saves the **whole merged config** as `site-config.json` (`allowOverwrite: true`). Auth is `Authorization: Bearer <ADMIN_PASSWORD>`. |

## 3. The six links

Live status checked hop by hop today. "Sentence" is quoted from the live page; the link text is in brackets.

| # | Page (live URL) | CMS section heading | Current href | Current sentence | Final live target (status) | Proposed href | Proposed sentence |
|---|---|---|---|---|---|---|---|
| 1 | `/weight-loss/articles/best-ro-alternatives` | "altRx - Best Overall Alternative" | `/altrx-vs-ro` | "If you want more medication options than ro provides, altRx is the strongest alternative. See our [full altRx vs ro comparison]." | 301 -> `/weight-loss/altrx-vs-ro` (200, "AltRx vs Ro (2026)") | `/weight-loss/altrx-vs-ro` | Unchanged. |
| 2 | `/weight-loss/articles/best-noom-alternatives` | "altRx - Best for Direct Medication Access" | `/altrx-vs-noom` | "See our [altRx vs Noom comparison] for a detailed breakdown." | 301 -> `/weight-loss/best-online-weight-loss-programs` (200). No altRx vs Noom page exists; `SLUG_ALIASES` sends it to the programs ranking because Noom is an app, not a GLP-1 provider (`src/lib/slug-aliases.ts:23-33`). | `/weight-loss/best-online-weight-loss-programs` | "See how altRx compares with Noom and the other programs in our [best online weight loss programs] ranking." |
| 3 | `/weight-loss/articles/best-noom-alternatives` | "ro - Best Established Telehealth Alternative" | `/noom-vs-ro` | "If brand trust matters to you, ro has served millions of patients across multiple health categories. See our [Noom vs ro comparison]." | 301 -> `/weight-loss/best-online-weight-loss-programs` (200). No Noom vs ro page exists (same alias rule). | `/weight-loss/best-online-weight-loss-programs` | "If brand trust matters to you, ro has served millions of patients across multiple health categories. See how ro's membership model compares with the other programs in our [best online weight loss programs] ranking." Alternative if two links to the same page in one article feels heavy: drop the second sentence entirely (the ro review is already linked at the start of the paragraph). |
| 4 | `/weight-loss/articles/best-noom-alternatives` | "Found - Best Insurance-Friendly Alternative" | `/noom-vs-found` | "If insurance coverage is important to you, check Found first. See our [Noom vs Found comparison]." | 301 -> `/weight-loss/noom-vs-found` (200, "Noom vs Found (2026)") | `/weight-loss/noom-vs-found` | Unchanged. |
| 5 | `/weight-loss/articles/best-noom-alternatives` | "SHED - Best for Personalized Treatment" | `/noom-vs-shed` | "Currently offering 30% off your first month. See our [Noom vs SHED comparison]." | 301 -> `/weight-loss/noom-vs-shed` (200, "Noom vs SHED (2026)") | `/weight-loss/noom-vs-shed` | Unchanged. |
| 6 | `/weight-loss/articles/embody-alternatives` | "altRx - broad selection, brand-name options" | `/altrx-vs-embody` | "See the head-to-head in our [altRx vs embody comparison]." | 301 -> `/weight-loss/altrx-vs-embody` (200, "AltRx vs Embody (2026)") | `/weight-loss/altrx-vs-embody` | Unchanged. |

Notes on the table:
- Rows 4 and 5 target battles that exist only in the Blob (`noom-vs-found`, `noom-vs-shed` are not in the repo seed, see audit F6). They answer 200 today; if either is ever retired in the CMS the link breaks again.
- Row 3 contains "ro has served millions of patients", and row 5 contains "Currently offering 30% off your first month". Neither is in scope for F4 and neither was checked against a source today. Flagging for a later content pass under house rule 1; not touching them here.
- `updatedAt`: recommend leaving the three dates alone. Four edits are href-only and two change one sentence each; this is link hygiene, not a content refresh. Operator can overrule.

## 4. The articles index entry (`best-weight-loss-telehealth-providers`)

- Live `/weight-loss/articles` shows one card: "Best Telehealth Providers for Weight Loss in 2026", Guide, 8 min read, description "Compare the top telehealth weight loss providers of 2026...". Its link 301s to `/weight-loss`.
- The slug does **not** exist in the repo seed (`grep 'slug: "best-weight-loss-telehealth-providers"' src/` returns nothing). It comes from the Blob `articles[]` list.
- Code retired it on purpose: `src/proxy.ts:92` (`PATH_REDIRECTS`, 301 to the vertical root), `src/components/pages/article-page.tsx:289-291` (page-level `permanentRedirect` fallback), and `src/lib/config.ts:453-456` (`NOINDEX_ARTICLE_SLUGS`, with the comment "the slug stays here so a blob-saved copy never re-enters the sitemap").
- Verdict: a retired article record the operator should **delete in the CMS** (Articles tab, the X button on that card, then Save). The index page (`src/components/pages/articles-index-page.tsx:52-53`) lists `config.articles` with no filter, so Felix's proposed mechanical filter (skip slugs in `NOINDEX_ARTICLE_SLUGS` / `PATH_REDIRECTS` keys) is the backstop, not a substitute.
- Before deleting, keep the GET output (step b1 below) as a rollback copy; the text of that article is otherwise lost.

## 5. How to apply

### Path (b), recommended: admin config API with a dry-run diff

Route: `GET` and `PUT` `https://www.treatmentshub.com/api/config?vertical=weight-loss` (`src/app/api/config/route.ts`). Auth: header `Authorization: Bearer <ADMIN_PASSWORD>` where `ADMIN_PASSWORD` is the Vercel environment variable. The route falls back to a hardcoded default when the env var is missing (`route.ts:5`); Felix should confirm the env var is set in Vercel production. I did not try any credential and did not call the route.

1. `GET` the config and save it unchanged to the scratchpad (rollback copy). The GET returns the merged config (same thing the admin UI edits).
2. Patch, in `articles[]`, the three slugs' `sections[].body` strings: the six `href` values from the table, plus the two sentences in rows 2 and 3. Optionally remove the `articles[]` entry whose slug is `best-weight-loss-telehealth-providers` (section 4).
3. Diff the patched JSON against the saved copy. Expected: exactly 6 `href` changes, 2 sentence changes, and (if approved) 1 removed article object. Anything else means stop.
4. Show the diff to the operator. Only after a yes: `PUT` the patched JSON back (whole `SiteConfig`, `Content-Type: application/json`).
5. Verify: `curl` the three article pages and `/weight-loss/articles`; `grep -c 'href="/[a-z]*-vs-'` must be 0 on each page and the telehealth card gone. Re-run Felix's live gate (`seo-audit.mjs` via the forwarder, audit Appendix E); the seven Appendix C FAIL lines should disappear. No deploy is needed; the site reads the Blob per request (audit F7).

Why (b) over (a): the diff in step 3 is the only way to prove that nothing else in the 2,300-field config changed, since a Save writes the whole config. It also runs from this environment through the proxy with `curl` or Node (`NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt`).

### Path (a), equivalent: admin UI

1. Open `https://www.treatmentshub.com/admin` (the proxy matcher excludes `/admin`, `src/proxy.ts:309`), enter the admin password. Vertical selector: weight-loss (default).
2. Tab **Articles**. Find the card by slug (shown under the title as `/best-ro-alternatives`, `/best-noom-alternatives`, `/embody-alternatives`).
3. Under **Content Sections**, open the section whose **Heading** matches the table above; edit the **Body** textarea (raw HTML) per the table.
4. Still in Articles, click the red X on the card "Best Telehealth Providers for Weight Loss in 2026" (slug `best-weight-loss-telehealth-providers`), if approved.
5. Click **Save** once (one PUT of the whole config). Verify as in (b) step 5.

Caution for both paths: do not edit anything else in the same session; the Save snapshots the entire config.

### Path (c): repo

Not applicable to the bodies or the index entry (neither lives in the repo). Two optional code follow-ups for Felix, outside this brief: (1) extend `BARE_WL_LINK_RE` in `src/lib/config-store.ts:4084` so bare `href="/<a>-vs-<b>"` strings are prefixed at load time (Felix's "mechanical safety net"); (2) the articles-index filter from F4. Side note for the backlog: because the Blob copy wins for these three slugs, any future edit to them in `src/data/articles.ts` will not ship unless the slug is added to `codeAuthoritativeGuides`. The repo and live versions of `best-noom-alternatives` have already drifted apart.

## 6. What I need from the operator

1. **CMS access**: either the `ADMIN_PASSWORD` value (so I run path (b) with the dry-run diff and show it before the PUT), or the operator applies path (a) themselves from the table.
2. **A yes on the two reworded sentences** (table rows 2 and 3), and a choice on row 3: new sentence, or drop the sentence.
3. **A yes to delete** the `best-weight-loss-telehealth-providers` article record in the CMS (section 4).
4. **`updatedAt`**: confirm leaving the three article dates unchanged (my recommendation), or say which date to set.

Hand-off after approval: Sloane applies (b) or the operator applies (a); Felix re-runs the live gate and ships the index filter and the link-rewrite safety net in his F4 code PR.
