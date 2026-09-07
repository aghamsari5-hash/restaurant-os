# Feature Workflow — RestaurantOS

> The workflow for building a single feature end-to-end. Every feature follows this chain — no shortcuts.

---

## The Chain

```
Requirement → Acceptance Criteria → UI → Component → API → Backend → Database → Tests → QA
     │               │               │       │        │       │         │         │      │
     └───────────────┴───────────────┴───────┴────────┴───────┴─────────┴─────────┴──────┘
                              ALL must be green for the feature to be Done
```

If ANY link is missing, the feature is **NOT Done** — regardless of how complete the UI looks.

---

## Step-by-Step

### Step 1 — Requirement

**Artifact:** `specs/<feature>/spec.md` § Requirements (FRs)

- Write each requirement as: "System MUST ..." with priority (P0/P1/P2).
- Every requirement has a unique ID (FR-01, FR-02, ...).
- Every requirement maps to at least one User Story.

**Done when:** All FRs written, prioritized, and linked to stories.

---

### Step 2 — Acceptance Criteria

**Artifact:** `specs/<feature>/spec.md` § Acceptance Criteria (ACs)

- Every FR has ≥1 AC.
- Each AC is testable: Given/When/Then or checklist.
- Each AC declares its test type: Unit / Integration / E2E / Manual.

| FR | AC | Criterion | Test Type |
|----|----|-----------|-----------|
| FR-01 | AC-01.1 | Given valid data, when POST /api/v1/products, then 201 with product | Integration |
| FR-01 | AC-01.2 | Given missing name, when POST, then 400 with field error | Integration |

**Done when:** Every FR has testable AC, no ambiguous AC.

**Gate:** Run `/speckit.clarify` — resolve ambiguities. Ambiguous AC → BLOCK.

---

### Step 3 — UI (if user-facing)

**Artifacts:** `specs/<feature>/ui-spec.md` + `.ai/design-system/analysis/<feature>-analysis.md` (if reference)

**Skills:** `ui-design`, `responsive`, `a11y`

- If design reference exists: analyze it first.
- Produce `ui-spec.md`: routes, layout, component inventory, props, states, token mapping.
- All four states per data component: Loading, Empty, Error, Success.

**Done when:** `ui-spec.md` reviewed, tokens validated, all states specified.

**Skip condition:** Non-UI features (e.g., background jobs, cron) — mark UI columns as N/A with justification in traceability.

---

### Step 4 — Component (Frontend)

**Artifacts:** `frontend/src/components/features/<domain>/*` + `frontend/src/app/<route>/*`

**Skills:** `frontend`, `responsive`, `a11y`

- Build components per `ui-spec.md` + `tokens.json`.
- Wire to API contract (may use mocked contract initially, but must switch to real in Step 7).
- All four states implemented.

**Done when:** Components built, states handled, responsive, a11y, build green.

---

### Step 5 — API

**Artifact:** `specs/<feature>/api-contract.md`

**Skills:** `api`

- Contract-First: write contract BEFORE backend code.
- Every endpoint: method + path + auth + request validation + success response + error responses with examples.
- Contract review gate before Step 6.

**Done when:** `api-contract.md` reviewed and approved.

---

### Step 6 — Backend Logic

**Artifacts:** `backend/src/modules/<domain>/` (domain, services, controllers, DTOs, events)

**Skills:** `backend`, `auth` (if protected), `security` (reviewer)

- Domain layer first (entities, VOs, events).
- Application layer (use cases, DTOs, mappers).
- Presentation layer (controllers, guards, Swagger).
- Tenant isolation on every query.

**Done when:** All endpoints from contract implemented, tenant isolation verified, build green.

---

### Step 7 — Database

**Artifacts:** `specs/<feature>/database-schema.md` + `backend/prisma/schema.prisma` + migration

**Skills:** `database`

> **Note:** In the Phase Workflow, Database is Phase 4 (before Backend). In the Feature Workflow, it is listed here for traceability completeness — but chronologically, database design happens before backend implementation. Both orderings are valid; the traceability chain checks that ALL links exist regardless of order.

- Schema spec → Prisma schema → migration → `prisma validate` green.

**Done when:** Schema reviewed, migration generated, `prisma validate` green.

---

### Step 8 — Tests

**Artifacts:** `*.spec.ts`, `*.e2e-spec.ts`, `frontend/e2e/specs/*.spec.ts`

**Skills:** `testing`, `e2e`

- Unit tests: entities, VOs, use cases.
- Integration tests: every endpoint (success + validation + auth + tenant).
- E2E: critical user journeys (if applicable).
- Coverage gates met.

**Done when:** Tests written, no flaky tests, coverage gates met, `npm run test` green.

---

### Step 9 — QA

**Artifacts:** `specs/<feature>/qa-report.md` + `code-review.md` + `security-review.md`

**Skills:** `code-review`, `security`, QA Agent

- QA Agent runs holistic checklist (`.ai/checklists/qa-checklist.md`).
- Code Review + Security Review.
- Traceability Matrix row verified.

**Done when:** All reviews PASS (or PASS WITH NOTES), no BLOCK, traceability row green.

---

## Traceability Update

After each step, update the feature's traceability:

**File:** `specs/<feature>/traceability.md` (or project-level `.ai/checklists/traceability-matrix.md`)

| Requirement | AC | UI Spec | UI Impl | API Contract | API Impl | Backend | DB | Tests | QA |
|-------------|----|---------|---------|-------------|----------|---------|----|-------|----|
| FR-01 | AC-01.1 | 🟢 | 🟡 | 🟢 | 🟢 | 🟢 | 🟢 | ⬜ | ⬜ |

Legend: ⬜ Not Started · 🟡 In Progress · 🟢 Done · 🔴 Blocked · ⬛ N/A

---

## Enforcement

- **No step skipping.** You cannot mark Backend as Done if API Contract is ⬜.
- **QA checks the chain.** If any cell is not 🟢/⬛, QA verdict is FAIL.
- **DoD enforces the chain.** `.ai/checklists/definition-of-done.md` has a checklist item per link.

---

## Example: "Create Product" Feature

| Step | Artifact | Status |
|------|----------|--------|
| Requirement | FR-01: System MUST allow creating a product | 🟢 spec.md |
| AC | AC-01.1: Given valid data, when POST, then 201 | 🟢 spec.md |
| UI | ProductForm with validation, loading, error states | 🟢 ui-spec.md + product-form.tsx |
| Component | ProductForm, ProductCard | 🟢 components/features/products/ |
| API | POST /api/v1/products contract | 🟢 api-contract.md |
| Backend | CreateProductUseCase, ProductsController | 🟢 backend/src/modules/products/ |
| Database | Product table with tenantId, indexes | 🟢 schema.prisma + migration |
| Tests | Unit + integration (success, 400, 401, tenant) | 🟢 products.spec.ts |
| QA | QA report PASS, code review APPROVE | 🟢 qa-report.md |

All green → Feature is Done. ✅

---

*Version 2.0. Updated: 2026-09-07.*
