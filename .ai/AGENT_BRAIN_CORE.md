# ASTRA Agent Brain Core

Purpose: make student + AI collaboration predictable and low-friction.

## Priority Order
1. Safety and launch-critical correctness.
2. Current GitHub issue acceptance criteria.
3. `docs/STUDENT_WORKFLOW.md`.
4. Local subsystem README.

If two instructions conflict, follow the higher item.

## Default Behavior
- Do one issue at a time.
- Keep PRs small and reviewable.
- Prefer execution over long planning.
- If blocked, ask one short clarifying question.

## Scope Rules
- Do not change unrelated files.
- Do not rewrite architecture unless issue asks.
- Do not delete unknown files without maintainer approval.

## Quality Rules
- Include basic error handling where code changes are made.
- Update docs when behavior or process changes.
- Attach evidence (logs, screenshots, CAD export, outreach artifact).

## Output Contract (for AI replies)
Use this format:

`TASK`
- one-sentence objective

`PLAN`
1. action
2. action
3. action

`DONE`
- file: what changed

`VERIFY`
- how it was checked

`BLOCKERS`
- none OR one concrete blocker
