---
name: research-method
description: How Atlas builds a verified evidence file: source hierarchy, the fetch techniques that work in this environment (DailyMed, FDA, PDFs, PubMed via BioC), the evidence-file template and the verification rules.
---

# Research method

Load `house-rules` first. Output: `ops/research/<slug>.md`.

## 1. Source hierarchy
1. Regulator and label: FDA labels on DailyMed, FDA alerts and guidance pages, EMA, MHRA.
2. Guidelines: AUA, Endocrine Society, ADA, NICE, specialty societies (PDF or journal version).
3. Primary studies: the journal article or the PubMed abstract; the NEJM/Lancet page for trial figures.
4. Provider's own page, read and dated, for anything about a provider.
5. Trade press and news only to locate 1 to 4, labelled "secondary" if quoted.
Never: vendor blogs, AI summaries, forums (except as the verbatim quoted content they are), memory.

## 2. Fetching in this environment
- **DailyMed**: find the setid with `https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?drug_name=<name>&pagesize=5`, then fetch `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=<setid>`. Long labels need a second fetch with `offset: 100000` to reach sections 12 and 14.
- **PDFs** (guidelines, accessdata labels): WebFetch returns binary; download with `curl -sS -o file.pdf <url>` and run `pdftotext -layout file.pdf file.txt`, then grep. Some accessdata.fda.gov PDFs are blocked (420-byte response): use the DailyMed version.
- **PubMed**: the abstract page refuses the fetcher. Use NCBI BioC: `https://www.ncbi.nlm.nih.gov/research/bionlp/RESTful/pubmed.cgi/BioC_json/<PMID>/unicode` (retry on 429). Search with `https://pubmed.ncbi.nlm.nih.gov/?term=…` which does work for result lists.
- **Blocked hosts seen so far**: uroweb.org (EAU), eutils.ncbi.nlm.nih.gov, drugcentral.org. Name them in the file so the operator can allow them; do not substitute silently.
- **FDA pages** sometimes 301 to a new path; follow the redirect URL WebFetch returns.
- Provider sites: headless Chromium through the proxy (`proxy: { server: process.env.HTTPS_PROXY }`), screenshot the pricing page and record the date.

## 3. Evidence-file template
```
# <slug> — research
Date: YYYY-MM-DD · Author: Atlas · Status: draft|ready · Brief: ops/briefs/<file>

## Question and scope
## Verified facts
| Fact | Exact figure / quote | Source (link) | Doc date | Read | Confidence |
## Numbers for tables (with arithmetic shown)
## Competitor read (top 5 for the target query: covers / misses / our edge)
## Could not verify (left out)
## Safety and wording notes (time points, compounded wording, dose language)
## Blocked hosts
```
Confidence: `verbatim` (quoted from the document), `derived` (computed from verbatim figures, arithmetic shown), `secondary` (only a non-primary source found).

## 4. Rules of evidence
- Quote the population and the time point with every result ("−14.9% at 68 weeks, STEP 1, n=1,961").
- Keep the document's revision date and your read date separate.
- When sources disagree, record both and say which is primary and why.
- A figure that cannot be sourced is listed under "Could not verify", never estimated.
- Reuse links already verified elsewhere in the repo (grep `src/data` and `src/lib/seeds` for the URL) and note where they came from.
