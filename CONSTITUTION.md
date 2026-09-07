# CONSTITUTION.md — RestaurantOS Project Constitution

> **Permanent laws of the project. Non-negotiable. Every agent, human, and automation must obey.**
> Changes require an Architecture Decision Record (ADR) and explicit approval.
> This file mirrors `.specify/memory/constitution.md` (Spec-Kit) — keep them in sync.

Version: 2.0 | Ratified: 2026-09-07 | Last Amended: 2026-09-07

---

## Preamble

This constitution exists to solve a single problem: **AI-generated projects that look complete but are missing critical parts** — backend, database, API, auth, validation, tests, and deployment.

The constitution makes completeness **mechanically verifiable**, not a matter of opinion.

**Core Principle:** No feature is complete because its UI exists. A feature is complete only when its entire traceability chain is green:
`Requirement → Acceptance Criteria → UI → Component → API → Backend → Database → Tests → QA`

---

## Article I — Architecture Principles

### I.1 Clean Architecture + DDD + Modular Monolith + Event-Driven

- Four layers, strict dependency direction: `Presentation → Application → Domain → Infrastructure`
- No layer may depend on a layer above it.
- Business rules live ONLY in Domain. Never in controllers, DTOs, or UI.
- Each business domain is an independent module with its own controller, service, domain, infrastructure, DTOs, and events.
- Modules communicate via Application Services and Domain Events — never by direct DB access to another module's tables.

### I.2 Module Independence

- Every module MUST be: independently testable, independently documentable, toggleable via Feature Manager.
- A module that cannot be disabled without breaking another module is incorrectly coupled.

### I.3 Multi-Tenancy

- Every business record belongs to exactly one `tenant_id`.
- Every query MUST filter by `tenant_id`. No exceptions. This is a security invariant.
- Cross-tenant data leakage is a P0 defect.

### I.4 API-First & Contract-First

- API contracts (OpenAPI) are written BEFORE implementation.
- Frontend and Backend develop against the same contract in parallel.
- Breaking changes require a new API version (`/api/v2`).

---

## Article II — Coding Principles

### II.1 TypeScript Strict

- `strict: true` in every `tsconfig.json`.
- No `any`. No `// @ts-ignore` without ADR.
- Prefer `readonly`, explicit return types, and exhaustive switches.
- Small functions, small classes, Single Responsibility.

### II.2 No Placeholders

- Never generate `TODO`, `FIXME`, `throw new Error("Not implemented")`, dummy data, or mock business logic as final code.
- If you cannot implement something, STOP and report it as a risk — do not fake it.

### II.3 SOLID & DRY

- Dependency Injection everywhere (NestJS providers).
- Repository Pattern for data access.
- No duplicated business logic. No dead code.

### II.4 Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Files | kebab-case | `create-order.dto.ts` |
| Classes | PascalCase | `CreateOrderUseCase` |
| Interfaces | PascalCase with `I` prefix | `IOrderRepository` |
| Variables/Functions | camelCase | `calculateTotal` |
| Constants | SCREAMING_SNAKE | `MAX_RETRY_COUNT` |
| DB Tables | snake_case plural | `order_items` |
| DB Columns | snake_case | `tenant_id`, `created_at` |
| API Routes | kebab-case plural | `/api/v1/order-items` |
| Env Variables | SCREAMING_SNAKE | `DATABASE_URL` |

### II.5 File Structure (Immutable)

```
backend/src/modules/<domain>/
  ├── controllers/
  ├── services/          # Application services / use cases
  ├── domain/            # Entities, VOs, Aggregates, Events, Policies
  ├── infrastructure/    # Repositories, mappers, ORM models
  ├── dto/               # Request/Response DTOs + validation
  └── events/            # Domain events + handlers

frontend/src/
  ├── app/               # Next.js App Router routes
  ├── components/
  │   ├── ui/            # shadcn/ui primitives (do not modify directly)
  │   └── features/<domain>/  # Domain components
  ├── features/<domain>/ # Hooks, services, stores, types
  ├── lib/               # api-client, utils, validators
  └── hooks/             # Shared hooks
```

- Never create files outside this structure without an ADR.
- Never move or rename modules without explicit request.

---

## Article III — Component & State Rules

### III.1 Component Rules

- One component, one responsibility.
- Props must be explicitly typed (no `any`).
- Components receive data via props or hooks — never by importing stores directly in deeply nested children (prop-drilling vs. context is decided per feature in `plan.md`).
- Every user-facing component MUST handle: **Loading, Empty, Error, Success** states.

### III.2 State Management

- Server state: **TanStack Query** (caching, refetching, optimistic updates).
- Client state: **Zustand** (UI state, ephemeral state).
- Never duplicate server state in Zustand.
- Never use `useState` for data that comes from an API.

### III.3 Styling

- TailwindCSS only. No inline `style={}` objects. No CSS modules without ADR.
- Use `shadcn/ui` primitives. Do not reinvent Button, Input, Dialog, etc.
- Design tokens from `.ai/design-system/tokens.json` are the only source for spacing, colors, typography, shadows, and radii.

---

## Article IV — Error Handling

- Global exception filters handle all errors. Controllers never try/catch business errors.
- Never swallow exceptions. Never return `null` where an error should be thrown.
- Every API error returns the standard envelope: `{ success: false, message, errors, meta }`.
- Frontend: every API call has `onError` handling with user-facing messages (never raw stack traces).
- Log every error with structured logging (no `console.log`).

---

## Article V — Security

- Never hardcode secrets, passwords, or API keys. Everything via `process.env` + `.env.example`.
- Every protected endpoint validates: **Authentication + Tenant + Permissions**.
- Passwords: Argon2. JWT: Access (15m) + Refresh (30d) via Redis.
- Validate every input (client + server). Never trust client input.
- No sensitive data in logs, URLs, or client bundles.
- Security review is a mandatory gate before Production (Phase 10).

---

## Article VI — Accessibility

- WCAG 2.1 AA is the minimum.
- Every interactive element: keyboard accessible, focus visible, ARIA labels where needed.
- Color contrast ≥ 4.5:1 for text.
- Tested with keyboard-only navigation and screen reader spot-checks.

---

## Article VII — Performance

- Budgets (enforced in CI):
  - Frontend: Lighthouse Performance ≥ 90, LCP < 2.5s, CLS < 0.1
  - Backend: p95 latency < 300ms, no N+1 queries
- Avoid N+1 (Prisma `include` batching, DataLoader where needed).
- Lazy-load routes and heavy components.
- Cache expensive operations (Redis).

---

## Article VIII — SEO

- Every public page has: `<title>`, `<meta description>`, canonical URL, Open Graph, structured data (JSON-LD) where applicable.
- Semantic HTML (`<main>`, `<nav>`, `<article>`, headings in order).
- No client-only rendering for SEO-critical content.

---

## Article IX — Testing

- **Pyramid:** Many Unit Tests → Fewer Integration Tests → Few E2E Tests (but E2E for every critical user journey).
- Critical business logic REQUIRES tests before merge.
- Tests must be deterministic. No flaky tests.
- Coverage gates: Domain/Application ≥ 80%, overall ≥ 60% (enforced in CI).
- Every bug fix includes a regression test that reproduces the bug before the fix.

---

## Article X — Git Conventions

- Branches: `feat/<domain>-<short-desc>`, `fix/<domain>-<short-desc>`, `chore/<desc>`
- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`)
- PRs: Must reference spec/phase, include traceability checklist, and pass all gates.
- Never commit `.env`, `node_modules`, or generated files.

---

## Article XI — Definition of Done (Constitutional)

A feature is DONE only when ALL gates pass. No exceptions, no "almost done":

1. Requirement exists in `specs/<feature>/spec.md`
2. Acceptance Criteria are written and unambiguous
3. UI built per Design System + Responsive + A11y
4. Loading / Empty / Error / Success states implemented
5. API contract (OpenAPI) written and reviewed
6. Backend implements contract with validation + tenant isolation
7. Database schema migrated with indexes + constraints
8. Authentication/Authorization verified (if protected)
9. Validation on client AND server
10. Error handling (global filter + user-facing messages)
11. Unit tests + Integration tests (+ E2E if user-facing)
12. Security review passed
13. Performance budget met
14. Documentation updated
15. No critical TODO/FIXME
16. Build + Lint + Tests green
17. Traceability Matrix row fully green
18. QA Agent sign-off

See `.ai/checklists/definition-of-done.md` for the operational checklist.

---

## Article XII — Amendments

- Amendments require an ADR in `docs/adr/<id>-<title>.md`.
- The constitution and `.specify/memory/constitution.md` must stay in sync.
- No agent may amend the constitution without human approval.

---

*Ratified by: Project Owner + AI Operating System v2.0*
