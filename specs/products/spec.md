# Feature Spec — Products CRUD

> **Example spec** — Demonstrates the full spec format. Copy `specs/_template/spec.md` for new features.
> This spec is intentionally realistic and complete — it shows what "Approved" looks like.

---

## 1. Overview

| Field | Value |
|-------|-------|
| Feature | Products CRUD |
| Phase | Phase 3 — Menu Management |
| Owner | RestaurantOS Team |
| Status | Approved (Example) |
| Created | 2026-09-07 |
| Related Docs | docs/013-products.md, docs/034-database-design.md, docs/035-api-standards.md |

**Summary:** Restaurant managers need to create, read, update, and delete products (menu items) with names, prices, categories, and optional images. Products are tenant-scoped and support availability toggling.

---

## 2. Goals & Non-Goals

### Goals

- [ ] G1: Managers can CRUD products with full validation
- [ ] G2: Products are always tenant-isolated
- [ ] G3: Product list is paginated, searchable, and filterable
- [ ] G4: UI handles all states (loading, empty, error, success) and is responsive

### Non-Goals

- NG1: Bulk import — deferred to Phase 6
- NG2: Product variants/modifiers — deferred to Phase 4
- NG3: Multi-language names — deferred to Phase 8

---

## 3. Users & Personas

| Persona | Description | Needs |
|---------|-------------|-------|
| Manager | Restaurant manager/owner | Manage menu items efficiently |
| Staff | Waiter/kitchen viewing menu | Browse available products |

---

## 4. User Stories

| ID | Story | Priority | Phase |
|----|-------|----------|-------|
| US-01 | As a manager, I want to create a product with name, price, and category, so that customers can order it | P0 | This phase |
| US-02 | As a manager, I want to view a paginated list of products with search and filters, so that I can manage my menu | P0 | This phase |
| US-03 | As a manager, I want to update a product's details, so that I can keep the menu current | P0 | This phase |
| US-04 | As a manager, I want to delete a product (soft delete), so that I can remove discontinued items | P0 | This phase |
| US-05 | As a manager, I want to toggle product availability, so that I can temporarily hide items | P1 | This phase |

---

## 5. Requirements

### Functional Requirements

| ID | Requirement | Priority | Source Story |
|----|-------------|----------|--------------|
| FR-01 | System MUST allow creating a product with name (1-100 chars), price (>0), categoryId, optional description (max 1000), optional imageUrl, and isAvailable (default true) | P0 | US-01 |
| FR-02 | System MUST validate all inputs and return field-level errors | P0 | US-01 |
| FR-03 | System MUST scope all products to the current tenant (tenantId from JWT) | P0 | — (constitutional) |
| FR-04 | System MUST support paginated listing with search (name/description), filter by category and availability, and sort by name/price/createdAt | P0 | US-02 |
| FR-05 | System MUST allow updating any product field (partial update) | P0 | US-03 |
| FR-06 | System MUST soft-delete products (set deletedAt, not hard delete) | P0 | US-04 |
| FR-07 | System MUST enforce unique product name per tenant + category | P0 | US-01 |
| FR-08 | System MUST return 409 when deleting a category that has products (handled in Categories feature, but products must respect the FK) | P1 | US-04 |

### Non-Functional Requirements

| ID | Requirement | Metric |
|----|-------------|--------|
| NFR-01 | Product list must load in < 500ms for 100 items | p95 < 500ms |
| NFR-02 | Product images must be optimized | < 150KB per image, via next/image |
| NFR-03 | Product mutations must be auditable | Audit log per create/update/delete |

---

## 6. Acceptance Criteria

| FR | AC ID | Criterion | Test Type |
|----|-------|-----------|-----------|
| FR-01 | AC-01.1 | Given valid product data, when POST /api/v1/products, then 201 with product in response and row in DB | Integration |
| FR-01 | AC-01.2 | Given missing name, when POST /api/v1/products, then 400 with errors[0].field == "name" | Integration |
| FR-01 | AC-01.3 | Given price <= 0, when POST, then 400 with field error on price | Integration |
| FR-01 | AC-01.4 | Given invalid categoryId, when POST, then 404 | Integration |
| FR-02 | AC-02.1 | Given name > 100 chars, when POST, then 400 | Integration |
| FR-02 | AC-02.2 | Given description > 1000 chars, when POST, then 400 | Integration |
| FR-03 | AC-03.1 | Given tenant A creates a product, when tenant B lists products, then product not visible | Integration (tenant) |
| FR-03 | AC-03.2 | Given tenant A creates a product, when tenant B GETs it by ID, then 404 | Integration (tenant) |
| FR-04 | AC-04.1 | Given 25 products, when GET /api/v1/products?page=1&limit=10, then 10 items + meta.total == 25 | Integration |
| FR-04 | AC-04.2 | Given products "Pizza" and "Pasta", when GET ?search=Pizza, then only Pizza returned | Integration |
| FR-04 | AC-04.3 | Given products in categories C1 and C2, when GET ?categoryId=C1, then only C1 products | Integration |
| FR-05 | AC-05.1 | Given existing product, when PATCH with new name, then 200 with updated name | Integration |
| FR-05 | AC-05.2 | Given PATCH with duplicate name in same category, then 409 | Integration |
| FR-06 | AC-06.1 | Given existing product, when DELETE, then 200 and product not in list but has deletedAt in DB | Integration |
| FR-06 | AC-06.2 | Given soft-deleted product, when GET by ID, then 404 | Integration |
| FR-07 | AC-07.1 | Given product "Pizza" in category C1 for tenant T1, when creating another "Pizza" in C1 for T1, then 409 | Integration |
| FR-07 | AC-07.2 | Given "Pizza" in C1 for T1, when creating "Pizza" in C1 for T2, then 201 (different tenant, allowed) | Integration |

---

## 7. UI Requirements

| Screen/Component | Description | States Required |
|-----------------|-------------|-----------------|
| Product List | Grid of product cards with search + category filter + availability filter + pagination | Loading, Empty, Error, Success |
| Product Form | Create/edit form: name, price, category select, description, image upload, availability toggle | Default, Validating, Submitting, Error, Success |
| Product Detail | Single product view with edit/delete actions | Loading, Error, Success |
| Delete Confirm | Confirmation dialog for delete | Default, Confirming |

- Design Reference: `specs/products/design-reference/` (or spec-driven if no reference yet)
- Design System: tokens.json v2.0
- Responsive: 1 col mobile → 2 col tablet → 3 col desktop
- A11y: WCAG 2.1 AA

Detailed UI spec → `specs/products/ui-spec.md`

---

## 8. API Requirements

| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| POST | /api/v1/products | Create product | Bearer + products:create |
| GET | /api/v1/products | List (paginated, searchable, filterable) | Bearer + products:read |
| GET | /api/v1/products/:id | Get by ID | Bearer + products:read |
| PATCH | /api/v1/products/:id | Partial update | Bearer + products:update |
| DELETE | /api/v1/products/:id | Soft delete | Bearer + products:delete |

Full contract → `specs/products/api-contract.md`

---

## 9. Data Model

| Entity | Key Fields | Relations |
|--------|-----------|-----------|
| Product | id, tenantId, name, price, categoryId, description, imageUrl, isAvailable, deletedAt | N:1 Category, N:1 Tenant |
| Category | id, tenantId, name, sortOrder | 1:N Product |

Full schema → `specs/products/database-schema.md`

---

## 10. Business Rules

| ID | Rule | Enforcement |
|----|------|-------------|
| BR-01 | Name unique per tenant + category | DB unique constraint + domain check |
| BR-02 | Price > 0 | DTO validation + domain invariant + DB CHECK |
| BR-03 | Category must exist and belong to same tenant | Application service check |
| BR-04 | All queries filter by tenantId | Repository + TenantGuard |
| BR-05 | Soft delete only | Repository (never hard delete) |

---

## 11. Dependencies

| Dependency | Type | Status |
|-----------|------|--------|
| Categories CRUD | Data | Must exist before products (FK) |
| Auth (JWT + RBAC) | Infra | Must be in place |
| File upload (images) | Infra | Optional — imageUrl can be URL string for now |

---

## 12. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Large catalog (1000+ products) slows list | Medium | High | Pagination + indexes + caching |
| Duplicate name confusion | Low | Medium | Clear error messages with field mapping |

---

## 13. Out of Scope

- Bulk import/export
- Variants, modifiers, recipes
- Product recommendations
- Multi-language

---

## 14. Traceability

| Requirement | AC | UI Spec | UI Impl | API Contract | API Impl | Backend | DB | Tests | QA |
|-------------|----|---------|---------|-------------|----------|---------|----|-------|----|
| FR-01 | AC-01.1 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| FR-02 | AC-02.1 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| FR-03 | AC-03.1 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| FR-04 | AC-04.1 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| FR-05 | AC-05.1 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| FR-06 | AC-06.1 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| FR-07 | AC-07.1 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

Legend: ⬜ Not Started · 🟡 In Progress · 🟢 Done · 🔴 Blocked

---

## 15. Approvals

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | Example | 2026-09-07 | ✅ Approved |
| Architect | Example | 2026-09-07 | ✅ Approved |

---

*This is an EXAMPLE spec. For new features, copy `specs/_template/spec.md`.*
