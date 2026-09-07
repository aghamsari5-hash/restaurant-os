# Skill — Code Review

---
name: code-review
description: Review code for correctness, architecture, security, and completeness before merge
when: Before every PR/merge; after every feature implementation; as a subagent in Phase 9 (QA)
version: 2.0
---

## Purpose

An AI that reviews its own code without a structured checklist will miss the same gaps it created. This skill provides that checklist.

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| PR diff | Yes | `git diff main...HEAD` |
| `specs/<feature>/spec.md` | Yes | What was supposed to be built |
| `specs/<feature>/api-contract.md` | Yes | Contract to verify against |
| `CONSTITUTION.md` | Yes | Laws to enforce |

## Workflow

### Step 1 — Automated Checks (run first)

```bash
cd backend && npm run lint && npm run build && npm run test
cd frontend && npm run lint && npm run build
npx prisma validate
```

If any fail, return `BLOCK` immediately — no manual review needed.

### Step 2 — Checklist Review

#### Architecture

- [ ] No business logic in controllers or DTOs?
- [ ] No cross-module DB access?
- [ ] No missing `tenantId` filter?
- [ ] Module boundaries respected?
- [ ] No `any`, no `console.log`, no hardcoded secrets?

#### Correctness

- [ ] Does implementation match `spec.md` acceptance criteria?
- [ ] Does implementation match `api-contract.md` (request/response/errors)?
- [ ] Are all validation rules enforced?
- [ ] Are all error states handled?
- [ ] Are edge cases covered?

#### Completeness (Traceability)

- [ ] Requirement → AC → UI → API → Backend → DB → Tests — all links present?
- [ ] Loading / Empty / Error states for UI?
- [ ] Tests for success + validation + auth + tenant?

#### Security (see Security Skill)

- [ ] No hardcoded secrets?
- [ ] Every protected endpoint has Auth + Tenant + Permission?
- [ ] No injection/XSS/IDOR vulnerabilities?

#### Maintainability

- [ ] No duplicated logic?
- [ ] Functions/classes small and single-responsibility?
- [ ] No dead code or unused imports?
- [ ] Naming follows conventions?

### Step 3 — Verdict

| Verdict | Meaning | Action |
|---------|---------|--------|
| `APPROVE` | No issues or only minor nits | Merge allowed |
| `APPROVE WITH NOTES` | Minor issues, non-blocking | Merge allowed, notes for follow-up |
| `REQUEST CHANGES` | Issues that should be fixed but not blocking architecture | Fix before merge |
| `BLOCK` | P0 violation (tenant leak, missing auth, hardcoded secret, build fails) | Must fix, re-review required |

### Step 4 — Output

Produce `specs/<feature>/code-review.md`:

```markdown
# Code Review — <Feature>

**Reviewer:** Code Review Agent
**Date:** 2026-09-07
**Verdict:** APPROVE / REQUEST CHANGES / BLOCK

## Automated Checks
- Build: PASS/FAIL
- Lint: PASS/FAIL
- Tests: PASS/FAIL

## Findings
### BLOCK (must fix)
- ...

### REQUEST CHANGES (should fix)
- ...

### NOTES (minor)
- ...

## Traceability
- Requirement → ... → Tests: GREEN / YELLOW / RED

## Recommendation
...
```

## Rules

1. **No self-approval.** If the same agent wrote and reviews, it must still run the full checklist mechanically — not from memory.
2. **BLOCK is not optional.** P0 violations block merge regardless of schedule pressure.
3. **Traceability is part of review.** A feature with passing tests but missing tenant isolation is BLOCK, not APPROVE.
4. **Review the contract, not just the code.** Code that works but diverges from `api-contract.md` is a defect.

## Definition of Done

- [ ] Automated checks green
- [ ] Checklist fully evaluated
- [ ] `code-review.md` produced with verdict
- [ ] No BLOCK issues remaining before merge
