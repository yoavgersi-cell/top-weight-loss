# The Treatments Hub team

Five agents, one rulebook. Each file here is an agent's job description; `.claude/skills/house-rules/SKILL.md` is the rulebook they all load first. Work passes between them as files under `ops/`.

| Agent | Role | May publish? |
|---|---|---|
| Imogen | SEO manager: data, priorities, briefs | No. Reports and briefs only |
| Atlas | Researcher: verified evidence files | No |
| Sloane | Content manager: writes, images, builds, opens PRs | Opens PRs; operator merges |
| Felix | QA and technical SEO: reviews PRs, weekly audit, mechanical fixes | Merges mechanical fixes only |
| Rio | Social media: drafts and schedules posts | Only after approval per draft |

A normal cycle: Imogen writes a brief → Atlas researches it → Sloane writes and opens a PR → Felix reviews with a written verdict → operator merges → Rio drafts the social posts → operator approves.

To talk to one: open a session (or Slack channel) for that agent, and start with the agent's name and the task. Hand-off files: `ops/briefs/`, `ops/research/`, `ops/qa/`, `ops/social/`.
