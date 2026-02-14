# Multi-Agent Protocol

Purpose: let multiple AI assistants and students work in parallel without stepping on each other.

## Core Rule
One issue = one active owner at a time.

## Ownership Lock
Before any work starts on an issue:
1. Comment on the issue: `LOCK: @name taking this issue`
2. Add label: `in-progress`
3. Start branch: `<subsystem>/<short-task-name>`

If issue is already locked by someone else, do not start coding. Pick another issue.

## Allowed Parallelism
- Different issues: allowed
- Same issue: only with explicit split, e.g.:
  - Agent A: docs
  - Agent B: code
- Same file at the same time: not allowed

## Anti-Collision Rules
- Do not force-push shared branches.
- Do not edit unrelated files.
- Do not open "mega PRs" with multiple issues.
- Do not resolve review comments you did not create unless asked.

## Handoff Protocol
When pausing or finishing, post this in the issue:

```text
HANDOFF
- Status: done | blocked | partial
- Branch: <branch-name>
- Files touched: <paths>
- Next step: <one concrete action>
- Risk/notes: <optional>
```

## Blocked Task Rule
If blocked for more than 20 minutes:
1. Post blocker in issue
2. Remove `in-progress` label
3. Add `blocked` label
4. Handoff cleanly

## Priority Arbitration
If two agents compete for the same urgent task:
1. Human lead decides owner.
2. Other agent switches to next unblocked issue.

## PR Readiness Rule
Do not open PR unless all are true:
- Issue is linked (`Closes #...`)
- Evidence section is filled
- Scope is one issue only

## Fast Start
1. Read `.ai/START_HERE.md`
2. Pick unlocked issue
3. Lock it
4. Execute max 3 actions
5. Open PR
