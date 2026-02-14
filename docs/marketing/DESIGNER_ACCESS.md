# Designer Access Policy (Build in Public)

Purpose: make design collaboration easy, safe, and transparent for both humans and AI assistants.

## Default Access Model
- Start with least privilege.
- Give designers access to marketing/design scope first.
- Expand access only if their role requires repo-wide contribution.

## Recommended Levels

### Level 1: Asset Contributor (Default)
- Scope:
  - `docs/marketing/assets/HUMAN_ONLY`
  - `docs/marketing/assets/DJ_Style`
  - `docs/marketing/assets/Astra_Inspo`
  - `docs/marketing/assets/concepts`
- Use when designer only needs to create/edit visuals.

### Level 2: Marketing Contributor
- Scope:
  - All of `docs/marketing/`
- Use when designer also updates campaign docs and copy artifacts.

### Level 3: Full Repo Contributor
- Scope:
  - Entire repository
- Use only when designer must work across engineering/business docs and PR workflows.

## HUMAN_ONLY Rule
- `docs/marketing/assets/HUMAN_ONLY` is strict no-AI content.
- AI can be used for exploration in non-HUMAN_ONLY folders.
- Final approval is always human.

## Onboarding Checklist
1. Add contact to `docs/business/REPO_ACCESS_CONTACTS.md`.
2. Assign access level (1/2/3).
3. Share folder scope + naming convention.
4. Confirm whether AI is allowed for their task.
5. Review first submission before expanding permissions.

## Build-in-Public Metadata (for each final design)
Include in filename or accompanying note:
- Owner
- Date
- Access level used
- AI used: `yes/no`
- Final approver
