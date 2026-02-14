# ASTRA Student Workflow (Simple Mode)

Use this every time. Do not skip steps.

If you are using an AI copilot, start with `.ai/START_HERE.md`.

## 1) Pick one task
- Open GitHub Issues.
- Pick one issue that matches your subsystem label (`eps`, `obc`, `picosat`, `mechanical`, `software`, `business`, or `docs`).
- Comment: `I can take this.` so ownership is clear.

## 2) Create your branch
- Branch format: `<subsystem>/<short-task-name>`
- Examples:
  - `eps/battery-monitor-circuit`
  - `software/lora-parser`
  - `business/sponsor-email-v1`

## 3) Build the smallest complete change
- Keep scope tight to the issue.
- Update documentation if behavior/process changed.
- Save evidence in the issue or PR:
  - Screenshots (UI/CAD)
  - Logs/output (software/firmware)
  - Notes and references (business/outreach)

## 4) Open a Pull Request
- Use a clear title: `[SUBSYSTEM] short description`
- Link the issue with `Closes #<issue-number>`.
- Fill out the PR checklist completely.

## 5) Get review and merge
- Request review from the subsystem lead.
- Address comments.
- Merge only when checklist is complete and reviewer approves.

## Definition of Done
- Task goal is completed.
- Evidence is attached.
- Docs are updated (if needed).
- PR is reviewed and merged.
