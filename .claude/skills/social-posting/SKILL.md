---
name: social-posting
description: How Rio drafts, renders and publishes social content for Treatments Hub: formats and specs per channel, the caption structure, compliance checklist, how to produce publicly hosted JPEGs, and the exact Windsor.ai action flow for Instagram.
---

# Social posting

Load `house-rules` first. Nothing publishes without the operator's explicit yes on that specific draft.

## 1. Source of truth
A post is drawn from one published page. Open the live page, take facts only from it (and prices only with their "as of" date). If the page lacks a number you want, the post goes without it.

## 2. Formats and specs
| Channel / format | Spec | Best use |
|---|---|---|
| Instagram single image | JPEG ≤8 MB, aspect 4:5 to 1.91:1 (use 1080×1350) | One verified fact + the page |
| Instagram carousel | 2 to 10 JPEGs, same spec, shown in order | A table or checklist, one row per slide, last slide = CTA |
| Instagram story | JPEG or MP4 (3 to 60 s), 9:16 (1080×1920), no caption | Price-verified stamps, new-article alerts |
| Instagram video (published as a Reel) | MP4/MOV ≤1 GB, 3 s to 15 min, 9:16 | Explainers from the YouTube repo |
| YouTube | Title ≤60 chars, description with timestamps and the article link, tags | Long-form explainers (repo: treatments-hub-youtube) |
| Facebook page / LinkedIn company | Text + image | Same content, longer caption allowed |

## 3. Rendering visuals
Start from the article image (`public/article-images/<slug>.webp`) or the OG image. Use `sharp` from the project's `node_modules` to crop/compose and export JPEG:
```js
import sharp from '/home/user/top-weight-loss/node_modules/sharp/lib/index.js';
await sharp('public/article-images/<slug>.webp').resize(1080, 1350, { fit: 'cover' }).jpeg({ quality: 88 }).toFile('public/social/<date>-<slug>-1.jpg');
```
Text on slides: short, large, high contrast; never a weight number presented as typical, never a before/after body, never a Trustpilot element. Instagram needs **publicly accessible URLs**, so commit the JPEGs under `public/social/` and use `https://www.treatmentshub.com/social/<file>.jpg` after the deploy is live (check it returns 200 first).

## 4. Caption structure (≤2,200 chars)
1. The one fact, with its "as of" date if it is a price.
2. One line of why it matters.
3. "Not FDA-approved" when compounded products are involved; "not medical advice, ask a licensed clinician" when dosing or treatment is discussed.
4. The link (profile link or page URL) and the affiliate disclosure line when a provider is named: "We may earn a commission from provider links."
5. 3 to 6 specific hashtags. No emojis inside medical statements.

## 5. Publish flow (Instagram via Windsor.ai)
1. `get_connectors` to confirm the Instagram account is connected (if not: stop, tell the operator).
2. `list_actions` for `instagram` and read the schema of the action you need (`create_image_post`, `create_carousel_post`, `create_story`, `create_video_post`).
3. Only after the operator's yes: `execute_action` with the public URL(s) and caption. Record the returned media id, time and URL in `ops/social/<file>.md`, status `published`.
4. Comments: reply only with pointers to the article or "please ask a licensed clinician"; never medical guidance. Hide, do not delete, unless the operator says so.

## 6. Draft file (`ops/social/YYYY-MM-DD-<slug>.md`)
```
Date · Author: Rio · Status: draft|approved|published · Source page: <url>
## Channel and format
## Visual(s): file paths, what each slide shows
## Caption (final text)
## Hashtags
## Proposed time
## Compliance check: facts traced ✓ · compounded wording ✓ · no testimonials/Trustpilot ✓ · disclosure ✓
## After publishing: media id, time, link
```
## 7. Weekly note
`ops/social/YYYY-MM-DD-weekly.md`: what was posted, reach/saves/clicks from the connector's read endpoints, what to repeat, what to drop.
