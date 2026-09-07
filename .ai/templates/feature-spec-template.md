# Feature Spec — {{FEATURE_NAME}}

> Template for `specs/<feature>/spec.md`. Fill every section. No section may be left as TODO.
> This spec is the single source of truth for the feature — code must match it.

---

## 1. Overview

| Field | Value |
|-------|-------|
| Feature | {{FEATURE_NAME}} |
| Phase | {{PHASE_ID}} — {{PHASE_NAME}} |
| Owner | {{OWNER}} |
| Status | Draft / In Review / Approved / Implemented |
| Created | {{DATE}} |
| Related Docs | {{LINKS TO docs/*.md}} |

**Summary (2-3 sentences):** What does this feature do and why does it matter?

---

## 2. Goals & Non-Goals

### Goals

- [ ] G1: ...
- [ ] G2: ...

### Non-Goals (explicitly out of scope)

- NG1: ... (e.g., "Payment processing — handled in Phase X")
- NG2: ...

---

## 3. Users & Personas

| Persona | Description | Needs |
|---------|-------------|-------|
| Manager | Restaurant manager | ... |
| Waiter | Floor staff | ... |
| Customer | End customer (if applicable) | ... |

---

## 4. User Stories

Format: As a [persona], I want [action], so that [benefit].

| ID | Story | Priority | Phase |
|----|-------|----------|-------|
| US-01 | As a manager, I want to create products with variants, so that I can manage my menu | P0 | This phase |
| US-02 | ... | P1 | This phase |
| US-03 | ... | P2 | Future |

---

## 5. Requirements

### Functional Requirements

| ID | Requirement | Priority | Source Story |
|----|-------------|----------|--------------|
| FR-01 | System MUST allow creating a product with name, price, category, and optional image | P0 | US-01 |
| FR-02 | System MUST validate that price is positive and category exists | P0 | US-01 |
| FR-03 | System MUST scope all products to the current tenant | P0 | — (constitutional) |
| ... | ... | ... | ... |

### Non-Functional Requirements

| ID | Requirement | Metric |
|----|-------------|--------|
| NFR-01 | Product list must load in < 500ms for 100 items | p95 < 500ms |
| NFR-02 | Product images must be optimized | < 150KB per image |
| NFR-03 | Product CRUD must be auditable | Audit log per action |

---

## 6. Acceptance Criteria

> Each FR maps to one or more AC. AC must be testable (Given/When/Then or checklist).

| FR | AC ID | Criterion | Test Type |
|----|-------|-----------|-----------|
| FR-01 | AC-01.1 | Given valid product data, when POST /api/v1/products, then 201 with product in response and DB | Integration |
| FR-01 | AC-01.2 | Given missing name, when POST /api/v1/products, then 400 with `errors[0].field == "name"` | Integration |
| FR-02 | AC-02.1 | Given negative price, when POST /api/v1/products, then 400 | Integration |
| FR-03 | AC-03.1 | Given tenant A creates a product, when tenant B lists products, then product not visible | Integration (tenant isolation) |
| ... | ... | ... | ... |

---

## 7. UI Requirements (if user-facing)

| Screen/Component | Description | States Required |
|-----------------|-------------|-----------------|
| Product List | Grid of product cards with search + filter | Loading, Empty, Error, Success |
| Product Form | Create/edit form with validation | Default, Validating, Submitting, Error, Success |
| Product Detail | Single product view | Loading, Error, Success |

- Design Reference: {{LINK OR "None — wireframe from this spec"}}
- Design System: tokens.json v2.0
- Responsive: Must work at 375, 768, 1024, 1280
- A11y: WCAG 2.1 AA

Detailed UI spec → `specs/<feature>/ui-spec.md` (via UI Design Skill).

---

## 8. API Requirements (summary — detail in api-contract.md)

| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| POST | /api/v1/products | Create product | Bearer + `products:create` |
| GET | /api/v1/products | List products (paginated) | Bearer + `products:read` |
| GET | /api/v1/products/:id | Get product | Bearer + `products:read` |
| PATCH | /api/v1/products/:id | Update product | Bearer + `products:update` |
| DELETE | /api/v1/products/:id | Soft delete | Bearer + `products:delete` |

Full contract → `specs/<feature>/api-contract.md` (via API Skill).

---

## 9. Data Model (summary — detail in database-schema.md)

| Entity | Key Fields | Relations |
|--------|-----------|-----------|
| Product | id, tenantId, name, price, categoryId, imageUrl | N:1 Category, 1:N ProductVariant |
| Category | id, tenantId, name, sortOrder | 1:N Product |
| ProductVariant | id, tenantId, productId, name, priceDelta | N:1 Product |

Full schema → `specs/<feature>/database-schema.md` (via Database Skill).

---

## 10. Business Rules

| ID | Rule | Enforcement |
|----|------|-------------|
| BR-01 | Product name must be unique per tenant + category | DB unique constraint + domain validation |
| BR-02 | Price must be > 0 | DTO validation + domain invariant |
| BR-03 | Deleting a category with products must fail with 409 | Application service check |
| BR-04 | All queries must filter by tenantId | Repository + TenantGuard |

---

## 11. Dependencies

| Dependency | Type | Status |
|-----------|------|--------|
| Categories must exist | Data | Must be implemented before products |
| Auth (JWT + RBAC) | Infra | Must be in place |
| File upload (for images) | Infra | Optional — can be deferred to Phase X |

---

## 12. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Large product catalog slows list endpoint | Medium | High | Pagination + indexes + caching |
| Image upload increases storage cost | Low | Medium | Compress + limit size (5MB) + CDN |

---

## 13. Out of Scope (for this phase)

- Bulk import (deferred to Phase X)
- Product recommendations (deferred)
- Multi-language product names (deferred)

---

## 14. Traceability

> Updated as implementation progresses. See `.ai/checklists/traceability-matrix.md`.

| Requirement | AC | UI | API | Backend | DB | Tests | QA |
|-------------|----|----|----|---------|----|-------|----|
| FR-01 | AC-01.1 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| FR-02 | AC-02.1 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

Legend: ⬜ Not Started · 🟡 In Progress · 🟢 Done · 🔴 Blocked

---

## 15. Approvals

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | | | ⬜ |
| Architect | | | ⬜ |
| Design (if UI) | | | ⬜ |

**Do not start implementation until status is `Approved`.**
