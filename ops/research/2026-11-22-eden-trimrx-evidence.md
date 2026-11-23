# eden-trimrx-evidence: research
Date: 2026-11-22 · Author: Atlas · Status: ready (partial: see section 5) · Brief: scratchpad/2026-11-22-eden-trimrx-visibility.md
Next: Sloane. Repo was read-only. No Trustpilot data used. All reads 2026-11-22 (UTC).

## 1. Question and scope
Verify from primary sources: TrimRx and Medvi current prices, terms, pharmacy and physician group, cancel/refund, state availability, LegitScript, BBB; FDA letters for Eden, TrimRx, Medvi; list what our five live TrimRx pages now get wrong. Eden price/pharmacy/refund: not verifiable today (tryeden.com blocked).

## 2. Verified facts
| # | Fact | Exact figure / quote | Source | Doc date | Read | Status |
|---|---|---|---|---|---|---|
| 1 | TrimRx pricing-page meta | title "Weight Loss Program Pricing \| Plans From $179/mo \| TrimRX"; description "Affordable weight loss plans starting at $179/mo. Includes GLP-1 medication and doctor consultations." | https://trimrx.com/pricing (raw HTML, `seoConfig` + og tags) | undated | Nov 22 | verbatim (meta only) |
| 2 | TrimRx home meta | "Free shipping, expert care from $179/mo." | https://trimrx.com/ (seoConfig) | undated | Nov 22 | verbatim (meta only) |
| 3 | TrimRx GLP-1 offer page, drug cards | Two cards: "Dual-Action GLP-1 +GIP Injections Starting at $179 / One simple injection per week." and "Most Affordable GLP-1 Injections Starting at $179 / One simple injection per week." Banner: "Exclusive Promotion Applied! $120 Off + Fast, Free Shipping". Fetched with no affiliate parameters. | https://trimrx.com/glp1 (server-rendered HTML) | undated (footer "© 2026") | Nov 22 | verbatim. A "Starting at" price, no per-drug or per-dose price, and the page does not say whether $179 is before or after the $120 promo |
| 4 | TrimRx cancel wording | "Cancel Before Your Next Billing Cycle"; also "No Surprise Fees", "$0 surprise fees", "No hidden fees" | https://trimrx.com/glp1 | undated | Nov 22 | verbatim, marketing line only. Not the terms; no steps, no refund wording |
| 5 | TrimRx pharmacy (generic) | "prepared and shipped by a state-licensed sterile compounding pharmacy. These compounded drugs are not FDA-approved." No pharmacy name | https://trimrx.com/glp1 (safety disclaimer) | undated | Nov 22 | verbatim. Pharmacy NOT named here |
| 6 | TrimRx role | "TrimRx does not practice medicine or prescribe medications." "Independent licensed providers"; "TrimRx does not sell, dispense, or ship any branded medications." Address: 12636 High Bluff Drive Ste 400, San Diego, California, 92130 | https://trimrx.com/glp1 | undated | Nov 22 | verbatim. Physician group NOT named here |
| 7 | Eden warning letter | MARCS-CMS 728279, issued June 8, 2026, to Eden Health International Inc. dba Eden, 110 16th St Ste 1431, Denver CO 80202; website https://www.tryeden.com, FEI 3044020039, reviewed "in March 2026"; issuing office CDER; signed Matthew J. Lash, JD, Acting Director, Office of Compounding Quality and Compliance. Posted 06/16/2026 (FDA "Content current as of" 06/16/2026) | https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/eden-health-international-inc-dba-eden-728279-06082026 | 2026-06-08 | Nov 22 | verbatim |
| 8 | Eden finding 1 | "The compounded semaglutide and tirzepatide products displayed on your website identify "Eden" on the pictured label, suggesting Eden is the compounder of those drugs when in fact it is not." | same | 2026-06-08 | Nov 22 | verbatim |
| 9 | Eden finding 2 | "Your website claims that the compounded drug products it offers are sourced from "FDA-licensed 503(a) outsourcing facilities." Compounding facilities, including pharmacies and outsourcing facilities, are not "FDA-approved" or "FDA-licensed" entities. The FD&C Act does not establish an "FDA-approved" or "FDA-licensed" designation for pharmacies or outsourcing facilities." | same | 2026-06-08 | Nov 22 | verbatim |
| 10 | Legal basis | Both findings: misbranded under FD&C Act 502(a) and 502(bb); introduction into interstate commerce violates 301(a). Letter: "this is not an all-inclusive list". No product-quality or sterility finding | same | 2026-06-08 | Nov 22 | verbatim |
| 11 | Response deadline | "within fifteen (15) business days of receipt of this letter", to compoundinginspections@fda.hhs.gov, ref. MARCS-CMS 728279. Requested steps: (1) identify the entities that produce the compounded products; (2) representative label sample; (3) address or remove other false/misleading claims | same | 2026-06-08 | Nov 22 | verbatim |
| 12 | Eden close-out / response | FDA database row for Eden (posted 06/16/2026, issued 06/08/2026): "Response Letter" and "Closeout Letter" columns both empty | FDA warning-letters list, filtered: https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/compliance-actions-and-activities/warning-letters?search_api_fulltext=eden%20health%20international (JS table, read via Playwright) | list live | Nov 22 | verbatim: no close-out or response letter posted as of Nov 22. Absence on the FDA page is not proof none exists |
| 13 | Medvi warning letter | MARCS-CMS 721455, Feb 20, 2026, to MEDVi, LLC dba MEDVi, Newark DE; site reviewed was https://medvi.io, December 2025; posted 03/03/2026. Findings: (a) labels show "MEDVi", "suggesting MEDVi is the compounder of those drugs when in fact it is not"; (b) claims "Same active ingredient as Wegovy® and Ozempic®." and "Same active ingredient as Mounjaro® and Zepbound®." are false or misleading ("Compounded drug products are not FDA-approved."). Response due "within fifteen (15) working days of receipt" | https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/medvi-llc-dba-medvi-721455-02202026 | 2026-02-20 | Nov 22 | verbatim |
| 14 | Medvi close-out | List row: Response Letter and Closeout Letter columns empty | FDA list, `?search_api_fulltext=medvi` | list live | Nov 22 | verbatim (same caveat as 12) |
| 15 | TrimRx FDA letter | Searches of the FDA warning-letters database (full-text) for "trimrx", "trim rx", "metafit pharma": no TrimRx or MetaFit letter. "trim rx" returns only Revive Rx LLC dba Revive Rx Pharmacy (unrelated) and Biomedical Research Laboratories | same list, `?search_api_fulltext=trimrx` etc. | list live | Nov 22 | verbatim: none found. Full-text search matches letter text, so a miss is strong but not proof |
| 16 | Same-day letter, altRx | Trinity Healthcare Supply LLC dba altRx 728236, 06/08/2026 exists on fda.gov (title and URL only seen, text NOT read) | https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/trinity-healthcare-supply-llc-dba-altrx-728236-06082026 | 2026-06-08 | Nov 22 | listing only. Read before citing content |

## 3. Numbers for tables
Deadline (derived): letter dated Mon June 8, 2026; receipt date not stated. 15 business days counted from June 8 as day 0: Jun 9 to 12 = 4, Jun 15 to 18 = 8, (Jun 19 Juneteenth federal holiday), Jun 22 to 26 = 13, Jun 29 = 14, Jun 30 = 15. Deadline about June 29 (no holiday) or June 30 (holiday skipped), assuming same-day receipt. State "about end of June 2026", not a date.

TrimRx vs Medvi 12-month table: CANNOT BE BUILT from primary sources today. TrimRx plan prices are in a JS app (bundle host blocked), only "Starting at $179" is readable and is not drug-specific. Medvi unreachable (see section 5). For reference only, NOT for publication (repo index, read Nov 3 and Nov 18, "from" prices, drug unspecified, now contradicted by trimrx.com on TrimRx): TrimRx $149 x 12 = $1,788; Medvi $99 x 12 = $1,188. If Sloane needs a number from the TrimRx page as read today: "from $179" x 12 = $2,148 is a derived floor on an unspecified product, not a plan total. Recommend no 12-month table until pricing is re-read by an operator with browser access.

## 4. Competitor read
Not requested in this job (Cleo's SERP list stands; shallow, titles only).

## 5. Could not verify (left out)
| Item | Status | Why |
|---|---|---|
| TrimRx semaglutide and tirzepatide price per drug | could not verify | Pricing page is a JS app loaded from d34xic2nofw0vx.cloudfront.net (proxy tunnel fails), page renders blank. Only meta and /glp1 "Starting at $179" readable |
| $149 (ours) vs $179 vs $259 | $149: contradicted as a current headline ("from $179" on two trimrx.com pages); $259: could not verify (no tirzepatide price visible anywhere); $179: verified as the published "starting at" figure only |
| TrimRx "$140 discount" (ours) | could not verify; /glp1 banner says "$120 Off" |
| TrimRx terms: pharmacy name, physician group name, cancel steps, refund, fees, state list | could not verify | https://trimrx.com/terms-and-conditions (and /terms, /terms-of-use, /faq, /faqs, /refund-policy etc.) all return the same 12 KB JS shell. Our pages cite trimrx.com/terms-and-conditions for "technology and administrative services platform ... independent, affiliated physician groups ... participating pharmacy"; /glp1 today is consistent in spirit ("does not practice medicine", "independent licensed providers", "state-licensed sterile compounding pharmacy") but names nobody |
| MetaFit Pharma Solutions LLC as operator | unverified lead (search summary only) |
| LegitScript directory entry | could not verify | www.legitscript.com: proxy 403. The trimrx.com page embeds a LegitScript seal script (static.legitscript.com/seals/31417191.js), which is the site's own claim, not a directory entry |
| BBB profile, "March 11, 2026 BBB request" | could not verify | www.bbb.org: proxy 403. Claim stays an unverified lead |
| State availability | could not verify | not on server-rendered pages |
| Medvi price, regular price, inclusions, cancel terms | could not verify | medvi.com and www.medvi.com: proxy returns 502 (tried 4 times, curl and Playwright; allowlisted but upstream failing). medvi.io (domain named in FDA letter): 403 |
| Eden $99/$129, pharmacy, 503A/503B, refund/"warranty", membership fee, shipping, LegitScript, BBB | could not verify today. Last read from repo: Eden price $99 sema / $129 tirz "Eden website, checked November 3, 2026" (src/lib/price-index.ts changelog 2026-11-03; "none, no membership"; shipping "not published"). Review page says "Checked September 2026". FDA letter last read Nov 15 per Cleo; re-read today (facts 7 to 12). The search-summary claim "refunds limited to membership fees in first six months" is an unverified lead conflicting with our "no membership" |

## 6. Wrong or at-risk claims on our live pages (read 2026-11-22 from www.treatmentshub.com/weight-loss/...)
Index (price-index.ts, verified Nov 18; changelog Nov 3) now lists TrimRx as "plans starting at $149" with no tirzepatide price; Medvi "start for just $99" with no tirzepatide price. trimrx.com itself says "from $179".

| Page | Claim as printed | Problem | Correct value |
|---|---|---|---|
| reviews/trimrx | Description/body/FAQ/table: "$259/month" tirzepatide (several places); "$149/month ... $140 discount applied"; strikethrough "$289" | $259 not in index since Nov 3 and not visible on trimrx.com. $149 and "$140 discount" contradicted by trimrx.com "starting at $179", "$120 Off". "$289" list price unsourced | Remove $259 and $289. Headline "from $179 (trimrx.com, read Nov 22)" or hold until rendered pricing is read |
| reviews/trimrx | "Checked September 2026", "Last updated Sep 15, 2026", banner "Prices verified Nov 18" | Internal dates disagree with each other | Dates must come from the record changed |
| articles/is-trimrx-legit | Meta and body "$149"; "$259/month for tirzepatide"; "there is no money-back or refund-if-not-approved guarantee"; "TrimRx terms" paraphrase; "$140 discount" | same price issues; refund claim cannot be verified (terms unreadable); terms paraphrase is from an earlier read, not re-confirmed | As above; drop or date the refund claim |
| articles/trimrx-cost | Title "$149 Dose-Flat Pricing"; "$259 for tirzepatide"; "beaten by $60/month at HealthRx"; "beaten by $112/month at DirectMeds"; table "DirectMeds ... Not published" vs text $112 | $259 gone; DirectMeds has no tirzepatide price in index (row says "Not published"), so $112 contradicts the page's own table and index; $60 is derived from $259 | Remove $259, $112 and $60 |
| articles/trimrx-alternatives | "the $259 tirzepatide is beatable"; "$720 less per year" HealthRx vs TrimRx; H2 "Tirzepatide is bleeding me -> DirectMeds" whose body recommends HealthRx; "$149 feels high" | $259 base gone; $720 = ($259-$199) x 12 depends on it; H2/body mismatch (DirectMeds has no tirzepatide) | Remove $259/$720; H2 should name HealthRx or drop |
| articles/medvi-vs-trimrx | Title "$99 vs $149"; TrimRx "$149 / $259"; Medvi "$89 (reg. $199)" in one place and "$99" in another; Medvi tirzepatide "$166 (reg. $299)"; "$99/$166 rates are promotional"; "Tirzepatide at $259 is undercut by altRx ($149), embody ($99), welludr ($71)" | Page contradicts itself ($89 vs $99). Index dropped Medvi's $166 on Nov 3, regular prices $199/$299 not in index. TrimRx figures as above. FDA letter to Medvi (Feb 20, 2026) not mentioned (fact 13) | Replace with sourced, dated figures only; Medvi price cannot be re-read today |
| all five | Header ticker "TrimRx plans from $149/mo" | Conflicts with trimrx.com "from $179" | Follow index decision |

## 7. Safety and wording notes
- Compounded wording: trimrx.com /glp1 itself says "Compounded medications are not FDA-approved and are not evaluated by the FDA for safety or efficacy". Keep that on every TrimRx/Medvi/Eden mention.
- FDA letters: both findings are labelling/advertising (misbranding under 502(a)/(bb)), not product quality or safety. Say "FDA warning letter, June 8, 2026, no response or close-out letter posted as of Nov 22", not "FDA action against products". Eden letter is a notice, not a finding of unsafe product. Keep proportionate (house rule 4).
- Do not call the FDA letter's "FDA-licensed 503(a) outsourcing facilities" wording proof of what pharmacy Eden uses; the letter says 503A or 503B and asks Eden to identify its producers.
- Medvi site named in its letter is medvi.io; our allowlisted domain is medvi.com. Confirm same operator before saying "Medvi received a letter" on a medvi.com page. The letter addressee is MEDVi, LLC dba MEDVi, help@medvi.io.
- Do not publish the "TrimRx and Medvi same company" idea: no primary evidence found.
- Trustpilot widget text appears on trimrx.com; ignored.

## 8. Blocked hosts (for the operator to allow if wanted)
- d34xic2nofw0vx.cloudfront.net (TrimRx app bundle; without it pricing, FAQ and terms never render)
- www.legitscript.com, static.legitscript.com (403)
- www.bbb.org (403)
- medvi.com / www.medvi.com (allowlisted but 502 from proxy on 4 attempts), medvi.io (403)
- tryeden.com (blocked per brief, not retried)
Working files: /tmp/claude-0/-home-user-top-weight-loss/4a32294e-162f-523e-a384-3c3ef37eaab2/scratchpad/pw/ (glp1.txt, eden_fda.txt, medvi_fda.txt, live_*.txt)
