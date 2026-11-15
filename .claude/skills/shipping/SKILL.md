---
name: shipping
description: The exact build, verify, screenshot, audit, commit, PR, merge and branch-reset commands for treatmentshub.com in this environment. Use for any change that touches the site.
---

# Shipping a change

Branch: **one per task, named for the agent and the task**, e.g. `claude/sloane-ro-cost-refresh` or `claude/felix-audit-2026-11-20`, created from the latest `origin/main`. Several agents work at the same time, so a shared branch name causes rejected pushes and stale-info errors; never reuse another agent's branch. Vercel deploys `main`. Scratch files go in the session scratchpad, never the repo.

```bash
git fetch origin main && git checkout -B claude/<agent>-<task> origin/main
```

## 1. Type-check and build
```bash
cd /home/user/top-weight-loss
npx tsc --noEmit -p . && npm run build > /tmp/build.log 2>&1; grep -ci ' error' /tmp/build.log   # must print 0
```
If `node_modules` is missing (fresh container): `npm ci` first.

## 2. Serve the production build locally
```bash
pkill -f '^next-server'; sleep 1; (PORT=4201 nohup npm start > /tmp/server.log 2>&1 &); sleep 7
curl -s -o /dev/null -w '%{http_code}\n' -H 'Host: www.treatmentshub.com' http://localhost:4201/<path>
```
Always send the `Host` header; the app routes on it.

## 3. Screenshots (desktop 1440 and phone 390, always both)
```js
// /tmp/shot.mjs
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({ args: ['--host-resolver-rules=MAP www.treatmentshub.com 127.0.0.1:4201', '--proxy-server=direct://'] });
for (const [name, w] of [['desk', 1440], ['phone', 390]]) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 }, deviceScaleFactor: 1 });
  await p.goto('http://www.treatmentshub.com/<path>', { waitUntil: 'networkidle' });
  await p.screenshot({ path: `/tmp/${name}.png` });          // add scrollIntoViewIfNeeded for sections
  await p.close();
}
await b.close();
```
Run with `node /tmp/shot.mjs`, then open the PNGs with the Read tool and look at them. Check: nothing truncated, tables readable on the phone, images placed, provider block present.

## 4. Audits
```bash
AUDIT_BASE=http://localhost:4201 node scripts/seo-audit.mjs | tail -3      # must end with RESULT: PASS
AUDIT_BASE=http://localhost:4201 node scripts/deep-seo-audit.mjs            # for structural changes; compare counts
```

## 5. Commit and push
Commit message: what changed and why, sources and dates for content, then the attribution trailers given in the conversation. Never a model identifier in the body.
```bash
git add -A <paths>
git commit -F msg.txt
for i in 1 2 3 4; do git push -u origin claude/<agent>-<task> && break; sleep $((i*15)); done
```
If the push is rejected because `main` moved, `git fetch origin main && git rebase origin/main`, re-run tsc, then push again.

## 6. Pull request
Use the GitHub MCP tool `create_pull_request` (owner `yoavgersi-cell`, repo `top-weight-loss`, base `main`). Body: Summary, Verification (tsc, build, screenshots, audit result), then the footer:
```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

<session URL>
```
Merge with `merge_pull_request` (squash) only if your agent file allows it. Otherwise post the PR link and stop.

## 7. After a merge
Delete the task branch (`git push origin --delete claude/<agent>-<task>`) and start the next task from a fresh `origin/main`. Do not keep a long-lived personal branch.
GitHub occasionally answers 503 on push or fetch; retry with backoff, do not change anything else.

## Environment notes
- Node fetch needs the proxy: `NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt`.
- Image work uses `sharp` from the project's `node_modules` (Python PIL is broken here).
- Image dimensions table: regenerate with the dims script in the scratchpad or re-create it from `src/lib/image-dims.ts`'s comment after adding files under `public/`.
