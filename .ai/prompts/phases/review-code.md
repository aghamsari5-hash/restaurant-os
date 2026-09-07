# Prompt Template — Code Review

> For Phase 9 (QA) — Code Review Agent.

---

Read `AGENTS.md`, `CONSTITUTION.md`.

## Context

- **Feature/Phase:** {{FEATURE_OR_PHASE}}
- **Spec:** `specs/{{FEATURE}}/spec.md`
- **API Contract:** `specs/{{FEATURE}}/api-contract.md`
- **PR Diff:** `git diff main...HEAD` (or provided diff)

## Skills to Activate

- `code-review` — `.ai/skills/code-review/SKILL.md`
- `security` — `.ai/skills/security/SKILL.md` (reviewer mode)

## Task

Per `.ai/skills/code-review/SKILL.md`:

1. Run automated checks:
   ```bash
   cd backend && npm run lint && npm run build && npm run test
   cd frontend && npm run lint && npm run build
   npx prisma validate
   ```

2. Checklist review: Architecture, Correctness, Completeness (Traceability), Security, Maintainability

3. Produce `specs/{{FEATURE}}/code-review.md` with verdict:
   - `APPROVE` — No issues or only minor nits
   - `APPROVE WITH NOTES` — Minor issues, non-blocking
   - `REQUEST CHANGES` — Should fix before merge
   - `BLOCK` — P0 violation, must fix, re-review required

## Verdict Criteria

- BLOCK if: build/lint/test fails, missing tenant filter, hardcoded secret, missing auth, P0 security issue
- REQUEST CHANGES if: contract mismatch, missing validation, missing states, significant maintainability issue
- APPROVE otherwise
