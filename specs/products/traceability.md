# Traceability — Products CRUD

> Example traceability for the Products feature. Project-level matrix: `.ai/checklists/traceability-matrix.md`

| Requirement | AC | UI Spec | UI Impl | API Contract | API Impl | Backend | DB | Unit Tests | Integration Tests | QA | Notes |
|-------------|----|---------|---------|-------------|----------|---------|----|------------|-------------------|----|-------|
| FR-01: Create product | AC-01.1 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | |
| FR-02: Validation | AC-02.1, AC-02.2 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | |
| FR-03: Tenant isolation | AC-03.1, AC-03.2 | ⬛ | ⬛ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | N/A for UI — backend concern |
| FR-04: Paginated list | AC-04.1, AC-04.2, AC-04.3 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | |
| FR-05: Update product | AC-05.1, AC-05.2 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | |
| FR-06: Soft delete | AC-06.1, AC-06.2 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | |
| FR-07: Unique name | AC-07.1, AC-07.2 | ⬛ | ⬛ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | N/A for UI — DB constraint |

Legend: ⬜ Not Started · 🟡 In Progress · 🟢 Done · 🔴 Blocked · ⬛ N/A
