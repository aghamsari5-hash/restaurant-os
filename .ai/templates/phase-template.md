# Phase {{PHASE_ID}} — {{PHASE_NAME}}

> Template for `specs/<phase>/spec.md` when the feature IS a full phase.
> For smaller features within a phase, use `feature-spec-template.md`.

---

## 1. Phase Overview

| Field | Value |
|-------|-------|
| Phase | {{PHASE_ID}} — {{PHASE_NAME}} |
| Status | Not Started / In Progress / In Review / Done |
| Depends On | Phase {{PREV}} (must be Done) |
| Estimated Scope | {{N}} features, {{M}} endpoints, {{K}} tables |

**Goal:** One paragraph — what does this phase deliver and why?

---

## 2. Features in This Phase

| # | Feature | Spec File | Priority |
|---|---------|-----------|----------|
| 1 | {{Feature A}} | `specs/{{phase}}/features/feature-a/spec.md` | P0 |
| 2 | {{Feature B}} | `specs/{{phase}}/features/feature-b/spec.md` | P0 |
| 3 | {{Feature C}} | `specs/{{phase}}/features/feature-c/spec.md` | P1 |

Each feature has its own `spec.md` + `api-contract.md` + `database-schema.md` + `ui-spec.md` (if UI).

---

## 3. Architecture Decisions for This Phase

| Decision | Choice | ADR |
|----------|--------|-----|
| Auth for new endpoints | JWT + RBAC | docs/adr/003-jwt.md |
| DB tables | See database-schema.md | — |
| Frontend routes | /products, /products/:id | — |

---

## 4. Entry Criteria (must be true before starting)

- [ ] Previous phase is Done (all DoD gates passed)
- [ ] All feature specs for this phase are Approved
- [ ] API contracts reviewed
- [ ] Database schemas reviewed
- [ ] UI specs reviewed (if applicable)
- [ ] No blocking risks

---

## 5. Exit Criteria (must be true before moving to next phase)

- [ ] All features' Traceability Matrix rows are green
- [ ] All Definition of Done gates passed for every feature
- [ ] Integration between features in this phase verified
- [ ] No P0/P1 bugs open
- [ ] QA Agent sign-off
- [ ] Code Review: APPROVE

---

## 6. Risks

| Risk | Mitigation |
|------|------------|
| ... | ... |

---

## 7. Timeline

| Feature | Start | End | Owner |
|---------|-------|-----|-------|
| Feature A | ... | ... | ... |

---

*This phase may not start until Entry Criteria are met. Next phase may not start until Exit Criteria are met.*
