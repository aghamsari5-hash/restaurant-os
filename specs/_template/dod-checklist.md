# DoD Checklist — [FEATURE_NAME]

> Copy from `.ai/checklists/definition-of-done.md` — check items as completed.

## 1. Specification

- [ ] spec.md exists and is Approved
- [ ] All FRs have AC

## 2. Design

- [ ] ui-spec.md exists (or N/A)
- [ ] Tokens validated

## 3. Architecture

- [ ] plan.md exists

## 4. Database

- [ ] database-schema.md reviewed
- [ ] Migration generated, prisma validate green

## 5. API

- [ ] api-contract.md reviewed
- [ ] Swagger at /api/docs verified

## 6. Backend

- [ ] All endpoints implemented
- [ ] Tenant isolation on every query
- [ ] Build + lint green

## 7. Frontend

- [ ] UI matches ui-spec + tokens
- [ ] All states (loading/empty/error/success)
- [ ] Responsive + A11y
- [ ] Build + lint green

## 8. Auth

- [ ] Guards on protected endpoints (or N/A)

## 9-17. (See full DoD)

## 18. QA

- [ ] Code review APPROVE
- [ ] QA PASS
- [ ] Traceability row green

---

**Verdict:** ⬜ PASS / ⬜ FAIL — Remaining: [list]
