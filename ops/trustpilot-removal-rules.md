# Trustpilot removal: content rules (Nov 16, 2026)

Trustpilot sent the operator a removal notice. The site must present no Trustpilot data at all: no ratings, no review counts, no transcribed or quoted reviews, no theme counts derived from those reviews, no profile links, and no mention of the name in rendered text. The code switch `TRUSTPILOT_DATA_REMOVED` already strips the structured fields; this pass fixes the prose.

## Rules
1. **Delete, do not replace.** Remove any sentence or clause whose content is a Trustpilot rating, count, profile, quote, or a theme/complaint count derived from Trustpilot reviews. Do not substitute other social proof. Reddit and Facebook material that is already on the page stays.
2. **Quotes from Trustpilot reviewers go entirely** (for example "Ann was a great help", "the pricing ended up being the deciding factor"), including the surrounding sentence that introduces them.
3. **Bullets** (pros, cons, keyFeatures, trustBadges, supportingPoints, keyTakeaways) that are only about Trustpilot: remove the bullet. A con such as "No Trustpilot profile" is removed, not reworded.
4. **Comparison categories or table columns** built on Trustpilot (for example "Customer reviews" scored by rating): remove the column or row; if a verdict sentence leans on it, rephrase on facts already in the same record (prices, terms, shipping, refund policy). Never invent a new fact.
5. **Titles, meta descriptions, SEO overrides**: rewrite without Trustpilot, keeping the strongest remaining fact (usually a price); titles ≤60 characters, descriptions ≤160.
6. **Methodology and policy text** ("how we rank", "how we collect customer reviews", the about page): describe the sources that remain (provider pages, labels, Reddit and Facebook community posts, our own testing) and remove the Trustpilot steps.
7. **Grammar must survive.** Read each edited sentence aloud in your head. No dangling "and", no "rated across reviews". US English, no em-dashes.
8. **Do not change** prices, dates, rankings, provider facts, or any code logic. Strings only. Comments that mention Trustpilot may stay, but update one-line comments where it is cheap.
9. **Stay in your assigned directory.** Another agent owns the others.
10. **Finish with** `npx tsc --noEmit -p .` (must pass) and `grep -rci trustpilot <your files>` and report, per file, the remaining count and whether each remaining hit is a comment or a type/field name (acceptable) or rendered text (not acceptable).
