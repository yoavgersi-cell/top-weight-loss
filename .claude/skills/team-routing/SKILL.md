---
name: team-routing
description: How Dashiell delegates to the Treatments Hub specialists as subagents, briefs them, chains the content pipeline, posts to Slack, and keeps the task ledger. Load when coordinating more than one agent.
---

# Team routing

## Operating model (token discipline — read first)
Approved by the operator 2026-11-19. The agents exist to save the operator's time, not to spend tokens freely.
1. **Triage before delegating.** Sort each request into: (a) Dashiell does it directly — repo facts, status, a one-file edit, a title change, a small mechanical fix, reading a figure out of the index; (b) one specialist, one brief; (c) a full chain. Default to (a). Delegate only when the work needs a skill Dashiell should not shortcut (research, writing, QA verdict, social render). Never auto-chain from one specialist to the next without checking the chain is actually required.
2. **Specialists run on Sonnet.** Pass `model: "sonnet"` to the Agent tool for cleo, atlas, sloane, felix, rio. Dashiell stays on the coordinator model. This halves specialist cost and avoids the premium-model rate cap. Raise a specialist to a stronger model only when a task visibly needs it and say why.
3. **No git ceremony for ops files.** Only a change to the live site (`src/`, `public/`, config) gets a branch + PR + the operator's merge. Ops files (`ops/ledger.md`, `ops/briefs/`, `ops/research/`, `ops/qa/`, `ops/social/*.md`) are committed straight to the working branch in one commit — no PR, no per-file worktree. Batch ops writes into the fewest commits.
4. **Status is the ledger, not a conversation.** Keep `ops/ledger.md` current as the single source of truth. When the operator asks "where are we", reply with only the rows that changed since they last looked (3–4 lines), never a re-derivation.
5. **Daily vs weekly.** Measure daily (audit script PASS/FAIL + indexed-page count, baseline 180 on 2026-11-13), act weekly. Do not launch research on a daily cadence. Organic traffic only: no paid-channel work.

## Delegating
Use the Agent tool with `subagent_type` set to the specialist's name (`cleo`, `atlas`, `sloane`, `felix`, `rio`). In a Slack (Claude Tag) session the agents folder may not be loaded; then use `subagent_type: general-purpose` and begin the prompt with the full text of `.claude/agents/<name>.md`, then "Load the skills named above", then the brief. Run independent work in parallel; run dependent steps in sequence and read the output file between them. Prefer `run_in_background: false` for a step the next step depends on.

A good brief contains, in this order:
1. Who they are and which files to load ("You are Atlas. Read .claude/agents/atlas.md and load house-rules and research-method.").
2. The goal in one sentence, and the request it comes from.
3. Input paths (the brief, the research file, the PR number).
4. Output path and format (the template from their skill).
5. What is already decided (title, angle, provider block) and what they must not do.
6. "Report back in under ten lines: what you produced, the path, what you could not do."

## The content pipeline
```
request → ops/briefs/<date>-<slug>.md (Cleo)
        → ops/research/<slug>.md (Atlas)
        → article file + PR (Sloane)            ← gate: operator merges
        → ops/qa/<slug>.md + PR review (Felix)
        → ops/social/<date>-<slug>.md (Rio)     ← gate: operator approves each draft
```
Skip a stage only when its output already exists and is marked `ready`. Never skip Felix.

## Weekly cadence (when the operator asks for it or a schedule fires)
- Monday: Cleo's weekly review → three recommended actions; the operator picks.
- Wednesday: Felix's technical audit; mechanical fixes shipped, the rest recommended.
- Friday: Rio's performance note.

## Slack
Post to channel `C0CHQUTCVGV` with the Slack `slack_send_message` tool: one message per completed step or decision needed. Format: bold one-line headline, then at most six lines, then the link. Use threads (`thread_ts`) for follow-ups on the same task. Never post exports, private percentages, credentials or anything that should not be public if the workspace is shared.

## Ledger (`ops/ledger.md`)
```
| Date | Task | Owner | Status | Link |
```
Statuses: `queued`, `in-progress`, `awaiting-operator`, `done`, `dropped (reason)`. Update it on every state change; read it first in every new conversation so nothing is asked twice.

## When a subagent fails
Read its report, decide whether the fix is a better brief (re-run once) or a blocker (operator). Never paper over a failure with your own work in that specialist's domain.
