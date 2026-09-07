# Phase Workflow — RestaurantOS

> The 10-phase workflow that governs every project. No phase may be skipped. No phase may start until the previous phase's exit criteria are met.

---

## Overview

```
Phase 0  Discovery
  → Phase 1  Product Specification
    → Phase 2  UX/UI Design
      → Phase 3  Architecture
        → Phase 4  Database
          → Phase 5  Backend
            → Phase 6  Frontend
              → Phase 7  Integration
                → Phase 8  Testing
                  → Phase 9  QA
                    → Phase 10  Production
```

Each phase has: **Purpose → Entry Criteria → Tasks → Skills → Exit Criteria → Validation Gate**.

If the gate fails, the phase is NOT complete — fix and re-validate.

---

## Phase 0 — Discovery

**Purpose:** Understand the idea, users, constraints, and scope before writing any spec.

| Field | Value |
|-------|-------|
| Inputs | Raw idea, stakeholder interviews, market context |
| Outputs | `specs/<phase>/discovery.md` — problem statement, personas, constraints, scope boundaries |
| Skills | None (human + Product Analyst Agent) |

**Entry Criteria:**

- [ ] Idea or request exists (even if vague)

**Tasks:**

1. Define the problem (what pain, for whom, why now)
2. Identify personas and their goals
3. List constraints (time, budget, tech, regulatory)
4. Define scope boundaries (what is NOT this project)
5. Identify risks and unknowns

**Exit Criteria:**

- [ ] `discovery.md` exists with problem, personas, constraints, scope
- [ ] Stakeholder (or Product Owner) confirms understanding

**Gate:** Human review of `discovery.md`. No gate → no Phase 1.

---

## Phase 1 — Product Specification

**Purpose:** Convert the idea into testable Requirements and Acceptance Criteria.

| Field | Value |
|-------|-------|
| Inputs | `discovery.md` |
| Outputs | `specs/<feature>/spec.md` (per feature, using `feature-spec-template.md`) |
| Skills | None directly — but spec must be written to enable all downstream skills |

**Entry Criteria:**

- [ ] Phase 0 done

**Tasks:**

1. Write `spec.md` per feature (Overview, Goals, User Stories, FRs, NFRs, ACs, Business Rules, Dependencies, Risks, Out of Scope)
2. Every FR has at least one AC in Given/When/Then or checklist form
3. Every AC is testable (a tester can verify it without asking questions)
4. Run `/speckit.clarify` — resolve all ambiguities before Phase 2

**Exit Criteria:**

- [ ] All `spec.md` files are Approved (reviewed by Product Owner + Architect)
- [ ] No `TODO`/`TBD` remaining
- [ ] `specs/<feature>/spec.md` has no ambiguous AC

**Gate:** `spec.md` review + `/speckit.analyze` (cross-artifact consistency). Spec with ambiguous AC → BLOCK.

**Spec-Kit Commands:**

```
/speckit.specify  →  specs/<feature>/spec.md
/speckit.clarify  →  Resolve ambiguities (MANDATORY)
/speckit.analyze  →  Consistency check
```

---

## Phase 2 — UX/UI Design

**Purpose:** Design the UI before coding it. Every screen specified, every state designed, every token mapped.

| Field | Value |
|-------|-------|
| Inputs | `spec.md` + optional `DESIGN_REFERENCE` (screenshot/Figma/AI Studio) |
| Outputs | `specs/<feature>/ui-spec.md` + `.ai/design-system/analysis/<feature>-analysis.md` (if reference) |
| Skills | `ui-design`, `responsive`, `a11y` |

**Entry Criteria:**

- [ ] Phase 1 done (specs Approved)
- [ ] For Google AI Studio flow: UI designed in AI Studio, screenshot/reference available

**Tasks:**

1. If `DESIGN_REFERENCE` provided: analyze it → `analysis/<feature>-analysis.md` (layout, components, colors, typography, missing states)
2. Produce `ui-spec.md` (routes, layout, component inventory, props, variants, states, token mapping, responsive, a11y)
3. Token compliance: every value maps to `tokens.json`
4. All four states per data component: Loading, Empty, Error, Success

**Exit Criteria:**

- [ ] `ui-spec.md` exists and is reviewed
- [ ] All tokens validated (no arbitrary values)
- [ ] All four states specified
- [ ] Responsive + A11y notes present
- [ ] No duplicate components (reuse checked)

**Gate:** Design review of `ui-spec.md` against `tokens.json` and `spec.md`. Missing states → BLOCK.

---

## Phase 3 — Architecture

**Purpose:** Define the technical approach before building.

| Field | Value |
|-------|-------|
| Inputs | `spec.md` + `ui-spec.md` |
| Outputs | `specs/<feature>/plan.md` + `specs/<feature>/api-contract.md` (draft) + ADRs (if needed) |
| Skills | `api` (contract draft) |

**Entry Criteria:**

- [ ] Phase 1 done (and Phase 2 done if UI feature)

**Tasks:**

1. Write `plan.md`: tech stack choices, module boundaries, dependencies, file creation plan, risk assessment
2. Draft `api-contract.md` (Contract-First): every endpoint with request/response/errors/auth
3. Create ADRs for significant decisions
4. Run `/speckit.plan` + `/speckit.analyze`

**Exit Criteria:**

- [ ] `plan.md` exists and is reviewed
- [ ] `api-contract.md` drafted and reviewed (contract review gate)
- [ ] ADRs created (if needed)
- [ ] No unresolved technical risks

**Gate:** Architecture review + contract review. Unreviewed contract → BLOCK (no Phase 4/5 until contract approved).

**Spec-Kit Commands:**

```
/speckit.plan     →  specs/<feature>/plan.md
/speckit.analyze  →  Consistency check
```

---

## Phase 4 — Database

**Purpose:** Design and migrate the database before building features that depend on it.

| Field | Value |
|-------|-------|
| Inputs | `spec.md` § Data Model + `plan.md` |
| Outputs | `specs/<feature>/database-schema.md` + `backend/prisma/schema.prisma` + migration |
| Skills | `database` |

**Entry Criteria:**

- [ ] Phase 3 done (plan + contract approved)

**Tasks:**

1. Write `database-schema.md` (entities, columns, relations, indexes, constraints, query patterns)
2. Update `schema.prisma` + generate migration (`npx prisma migrate dev`)
3. Validate (`npx prisma validate`, `npx prisma format`)
4. Seed data (if needed, idempotent)

**Exit Criteria:**

- [ ] `database-schema.md` reviewed and approved
- [ ] All business tables have `id`, `tenantId`, `createdAt`, `updatedAt`, `deletedAt`
- [ ] Migration generated and `prisma validate` green
- [ ] Indexes for every query pattern

**Gate:** Schema review + `prisma validate`. Missing `tenantId` or `deletedAt` → BLOCK (P0).

---

## Phase 5 — Backend

**Purpose:** Implement backend per database schema and API contract.

| Field | Value |
|-------|-------|
| Inputs | `database-schema.md` + `api-contract.md` + `spec.md` (business rules) |
| Outputs | `backend/src/modules/<domain>/` (controllers, services, domain, infrastructure, DTOs, events) |
| Skills | `backend`, `api`, `auth` (if protected), `security` (reviewer) |

**Entry Criteria:**

- [ ] Phase 4 done (schema migrated)
- [ ] `api-contract.md` approved

**Tasks:**

1. Domain layer: entities, VOs, events, repository interfaces
2. Application layer: use cases, DTOs (class-validator), mappers
3. Infrastructure: repository implementations, Prisma delegates
4. Presentation: controllers (thin), guards, Swagger
5. Cross-cutting: tenant isolation, error handling, logging, events

**Exit Criteria:**

- [ ] All endpoints from `api-contract.md` implemented
- [ ] DTOs match contract schemas exactly
- [ ] Tenant isolation on every query
- [ ] Swagger at `/api/docs` verified
- [ ] `npm run build` + `npm run lint` + `prisma validate` green

**Gate:** Build + lint + contract compliance check. Missing tenant filter → BLOCK (P0).

---

## Phase 6 — Frontend

**Purpose:** Implement frontend per UI spec and API contract.

| Field | Value |
|-------|-------|
| Inputs | `ui-spec.md` + `api-contract.md` |
| Outputs | `frontend/src/app/` + `frontend/src/components/features/` + `frontend/src/features/` |
| Skills | `frontend`, `responsive`, `a11y`, `seo` (if public), `performance` |

**Entry Criteria:**

- [ ] Phase 2 done (ui-spec approved)
- [ ] Phase 5 done or API contract stable (frontend can develop against contract in parallel with backend if contract is approved)

**Tasks:**

1. Components bottom-up: primitives (shadcn/ui) → domain components → pages
2. Data layer: TanStack Query for server state, Zustand for client state, React Hook Form + Zod for forms
3. Wire to real APIs via `lib/api-client.ts` (no mocks as final)
4. All four states per data component

**Exit Criteria:**

- [ ] UI matches `ui-spec.md` + tokens
- [ ] All states (loading/empty/error/success) implemented
- [ ] Forms validated (Zod) + server errors mapped
- [ ] Responsive + A11y verified
- [ ] `npm run build` + `npm run lint` green

**Gate:** Build + lint + visual check + responsive check. Missing states → BLOCK.

---

## Phase 7 — Integration

**Purpose:** Connect Frontend, Backend, and Database — prove the chain works.

| Field | Value |
|-------|-------|
| Inputs | Phase 5 + Phase 6 outputs |
| Outputs | Verified end-to-end flows, `specs/<feature>/integration-notes.md` (if needed) |
| Skills | `frontend`, `backend`, `api`, `database` (as needed to fix gaps) |

**Entry Criteria:**

- [ ] Phase 5 done + Phase 6 done

**Tasks:**

1. Wire every frontend component to its real API endpoint (no mocks remaining)
2. Verify every API endpoint hits the real DB (no mock data remaining)
3. Test each AC end-to-end: UI action → API → Backend → DB → UI update
4. Fix contract mismatches (update contract first, then code)
5. Verify tenant isolation end-to-end

**Exit Criteria:**

- [ ] Every UI action hits a real endpoint
- [ ] Every endpoint hits the real DB
- [ ] No mock data remaining in the chain
- [ ] Every AC verified end-to-end (at least manually, ideally via integration test)
- [ ] No broken connections

**Gate:** Integration checklist. Any mock in the chain → BLOCK. Any broken connection → BLOCK.

---

## Phase 8 — Testing

**Purpose:** Prove correctness with automated tests.

| Field | Value |
|-------|-------|
| Inputs | All prior phases |
| Outputs | `*.spec.ts`, `*.e2e-spec.ts`, `frontend/e2e/specs/*.spec.ts`, coverage reports |
| Skills | `testing`, `e2e` |

**Entry Criteria:**

- [ ] Phase 7 done (integration verified)

**Tasks:**

1. Unit tests: entities, VOs, use cases, utils
2. Integration tests: every endpoint (success + validation + auth + tenant)
3. API contract tests: response shape matches contract
4. E2E tests: critical user journeys (if applicable)
5. Coverage gates: Domain/Application ≥ 80%, Overall ≥ 60%

**Exit Criteria:**

- [ ] Unit tests for domain + application layers
- [ ] Integration tests for every endpoint (success + 400 + 401 + 403 + tenant)
- [ ] E2E for critical journeys (if applicable)
- [ ] No flaky tests (3 runs green)
- [ ] Coverage gates met
- [ ] `npm run test` green

**Gate:** Test results + coverage. Missing tenant isolation test → BLOCK. Flaky tests → BLOCK.

**Spec-Kit Commands:**

```
/speckit.tasks    →  specs/<feature>/tasks.md (task breakdown for implementation)
```

---

## Phase 9 — QA

**Purpose:** Independent, adversarial quality assurance — find what the developer missed.

| Field | Value |
|-------|-------|
| Inputs | All prior phases + `dod-checklist.md` + Traceability Matrix |
| Outputs | `specs/<feature>/qa-report.md` + `specs/<feature>/code-review.md` + `specs/<feature>/security-review.md` |
| Skills | `code-review`, `security` (reviewer), QA Agent |

**Entry Criteria:**

- [ ] Phase 8 done (tests green)
- [ ] Developer claims DoD is complete

**Tasks:**

1. QA Agent runs holistic checklist (`.ai/checklists/qa-checklist.md`): functional, UI, API, security, integration, build
2. Code Review Agent produces `code-review.md` (verdict: APPROVE / REQUEST CHANGES / BLOCK)
3. Security Review produces `security-review.md` (verdict: PASS / PASS WITH NOTES / BLOCK)
4. Verify Traceability Matrix — every cell green

**Exit Criteria:**

- [ ] `qa-report.md` with `PASS` or `PASS WITH NOTES`
- [ ] `code-review.md` with `APPROVE` or `APPROVE WITH NOTES`
- [ ] `security-review.md` with `PASS` or `PASS WITH NOTES`
- [ ] No BLOCK verdicts remaining
- [ ] Traceability Matrix row fully green

**Gate:** All three reviews must be non-BLOCK. Any BLOCK → return to developer, fix, re-QA.

---

## Phase 10 — Production

**Purpose:** Verify production readiness and deploy.

| Field | Value |
|-------|-------|
| Inputs | All prior phases + Phase 9 sign-off |
| Outputs | Deployed application, `specs/<feature>/production-checklist.md` (if needed) |
| Skills | `deployment`, `security`, `performance` |

**Entry Criteria:**

- [ ] Phase 9 done (all reviews PASS)

**Tasks:**

1. Environment variables: `.env.example` complete, no secrets in repo
2. Docker: `docker compose up --build` works from clean clone
3. Build: `npm run build` + `npm run lint` + `prisma validate` green
4. Health + Swagger verified
5. Security headers, CORS, rate limiting configured
6. Logging, monitoring, backup, rollback documented
7. CI/CD green (if configured)

**Exit Criteria:**

- [ ] Production checklist (`.ai/checklists/definition-of-done.md` §17) all green
- [ ] `docker compose up --build` works from clean clone
- [ ] Health endpoint returns correctly
- [ ] No secrets in repo
- [ ] Deployment successful (or deployment plan documented)

**Gate:** Production checklist + deployment verification. Any unchecked item → BLOCK.

---

## Enforcement

- **No phase skipping.** Phase N+1 may not start until Phase N's exit criteria are met.
- **Gates are binary.** PASS or BLOCK — no "almost done."
- **Traceability Matrix** is checked at Phase 9 — any non-green row blocks the phase.
- **Spec-Kit integration:** `/speckit.analyze` runs at Phase 1, 3, and 9 to catch drift.

---

## Visual Summary

```
Discovery ──► Spec ──► Design ──► Architecture ──► Database ──► Backend ──► Frontend ──► Integration ──► Testing ──► QA ──► Production
   │           │         │            │              │            │           │             │             │         │         │
   Gate        Gate      Gate         Gate           Gate         Gate        Gate          Gate          Gate      Gate      Gate
  discovery  spec +   ui-spec +    plan +        schema +     build +     build +      chain     tests +    reviews   deploy
    .md     clarify   tokens      contract      migration    contract    states      verified   coverage   PASS     verified
```

---

*Version 2.0. Updated: 2026-09-07.*
