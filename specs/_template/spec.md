# Feature Spec — [FEATURE_NAME]

> Copy this template to `specs/<feature>/spec.md` and fill every section.
> Template source: `.ai/templates/feature-spec-template.md`

---

## 1. Overview

| Field | Value |
|-------|-------|
| Feature | [FEATURE_NAME] |
| Phase | Phase [N] — [Phase Name] |
| Owner | [Name] |
| Status | Draft |
| Created | 2026-09-07 |
| Related Docs | [Links] |

**Summary:** [2-3 sentences]

---

## 2. Goals & Non-Goals

### Goals

- [ ] G1: ...

### Non-Goals

- NG1: ...

---

## 3. Users & Personas

| Persona | Description | Needs |
|---------|-------------|-------|
| ... | ... | ... |

---

## 4. User Stories

| ID | Story | Priority | Phase |
|----|-------|----------|-------|
| US-01 | As a ..., I want ..., so that ... | P0 | This phase |

---

## 5. Requirements

### Functional Requirements

| ID | Requirement | Priority | Source Story |
|----|-------------|----------|--------------|
| FR-01 | System MUST ... | P0 | US-01 |

### Non-Functional Requirements

| ID | Requirement | Metric |
|----|-------------|--------|
| NFR-01 | ... | ... |

---

## 6. Acceptance Criteria

| FR | AC ID | Criterion | Test Type |
|----|-------|-----------|-----------|
| FR-01 | AC-01.1 | Given ..., when ..., then ... | Integration |

---

## 7. UI Requirements

| Screen/Component | Description | States Required |
|-----------------|-------------|-----------------|
| ... | ... | Loading, Empty, Error, Success |

---

## 8. API Requirements

| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| POST | /api/v1/... | ... | Bearer + permission |

---

## 9. Data Model

| Entity | Key Fields | Relations |
|--------|-----------|-----------|
| ... | ... | ... |

---

## 10. Business Rules

| ID | Rule | Enforcement |
|----|------|-------------|
| BR-01 | ... | ... |

---

## 11. Dependencies

| Dependency | Type | Status |
|-----------|------|--------|
| ... | ... | ... |

---

## 12. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| ... | ... | ... | ... |

---

## 13. Out of Scope

- ...

---

## 14. Traceability

| Requirement | AC | UI | API | Backend | DB | Tests | QA |
|-------------|----|----|----|---------|----|-------|----|
| FR-01 | AC-01.1 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

---

## 15. Approvals

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | | | ⬜ |
| Architect | | | ⬜ |
