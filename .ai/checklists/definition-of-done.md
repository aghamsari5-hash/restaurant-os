# Definition of Done — RestaurantOS

> **A feature is NOT complete until EVERY item below is checked.**
> This checklist is enforced by the QA Agent (Phase 9) and Code Review Agent.
> No feature may be marked Done with unchecked items — no exceptions, no "almost done."

---

## How to Use

1. Copy this checklist into `specs/<feature>/dod-checklist.md` at feature start.
2. Check items as they are completed (with evidence: file paths, test results, screenshots).
3. QA Agent verifies every item before sign-off.
4. If ANY item is unchecked, the Traceability Matrix row for that feature stays RED.

---

## 1. Specification

- [ ] `specs/<feature>/spec.md` exists and is Approved
- [ ] All Functional Requirements have Acceptance Criteria (Given/When/Then or checklist)
- [ ] All AC are testable and unambiguous
- [ ] Non-Goals and Out-of-Scope explicitly listed
- [ ] No `TODO` or `TBD` remaining in spec

## 2. Design (if user-facing)

- [ ] `specs/<feature>/ui-spec.md` exists (or N/A with justification for non-UI features)
- [ ] Design reference analyzed (if provided) → `.ai/design-system/analysis/<feature>-analysis.md`
- [ ] All components have typed props, variants, and state specs
- [ ] All design values map to `tokens.json` (no arbitrary values)
- [ ] Responsive behavior specified for `sm`/`md`/`lg`/`xl`
- [ ] A11y notes present (contrast, keyboard, ARIA)

## 3. Architecture

- [ ] `specs/<feature>/plan.md` exists (tech stack, module boundaries, dependencies)
- [ ] Module boundaries respected (no cross-module DB access)
- [ ] No new dependencies without justification in plan.md

## 4. Database (if data is persisted)

- [ ] `specs/<feature>/database-schema.md` exists and is reviewed
- [ ] All business tables have `id`, `tenantId`, `createdAt`, `updatedAt`, `deletedAt`, `createdBy`, `updatedBy`
- [ ] PK is UUID, `tenantId` indexed, soft delete via `deletedAt`
- [ ] Unique constraints correctly scoped to tenant
- [ ] Foreign keys with deliberate `onDelete`
- [ ] Indexes for every query pattern
- [ ] Migration generated: `npx prisma migrate dev --name add-<feature>`
- [ ] `npx prisma validate` green
- [ ] Seed data idempotent (if applicable)

## 5. API

- [ ] `specs/<feature>/api-contract.md` exists and is reviewed (Contract-First)
- [ ] Every endpoint has: method + path + auth + request validation + success response + error responses with examples
- [ ] All routes versioned (`/api/v1/...`)
- [ ] Resource naming uses plural nouns
- [ ] Consistent envelope: `{ success, message, data, meta, errors }`
- [ ] Error codes are stable and machine-readable
- [ ] Swagger decorators present, Swagger UI at `/api/docs` verified

## 6. Backend

- [ ] All endpoints from `api-contract.md` implemented
- [ ] DTOs match contract schemas exactly, with `class-validator` decorators
- [ ] Domain logic in `domain/` layer, not controllers
- [ ] Controllers are thin (validate → delegate → return)
- [ ] Every query filters by `tenantId` (tenant isolation)
- [ ] Domain events published where specified
- [ ] Error handling via global `ExceptionFilter` (no swallowed exceptions)
- [ ] Structured logging (no `console.log`, no secrets in logs)
- [ ] `npm run build` green, `npm run lint` green, `npx prisma validate` green

## 7. Frontend (if user-facing)

- [ ] UI matches `ui-spec.md` + `tokens.json`
- [ ] All data-driven components have: Loading (Skeleton) + Empty (EmptyState) + Error (ErrorState + retry) + Success
- [ ] Forms validated with Zod + React Hook Form, server errors mapped to fields
- [ ] Server state via TanStack Query (no duplication in Zustand/useState)
- [ ] API calls via `lib/api-client.ts` (no hardcoded URLs, no bare `fetch` without states)
- [ ] Responsive at 375px, 768px, 1024px, 1280px — no horizontal scroll, no overlap
- [ ] No `any`, no `console.log`, no inline `style={}`, no arbitrary Tailwind values
- [ ] `npm run build` green, `npm run lint` green

## 8. Authentication & Authorization (if protected)

- [ ] Every protected endpoint has `JwtAuthGuard` + `TenantGuard` + permission check
- [ ] `tenantId` from JWT, never from client input
- [ ] Tests for 401 (no token), 403 (wrong tenant), 403 (missing permission)

## 9. Validation

- [ ] Every input validated on client (Zod) AND server (class-validator + domain invariants)
- [ ] No endpoint without `ValidationPipe`
- [ ] Business rules enforced at DTO + domain + DB levels (defense in depth)

## 10. Error Handling

- [ ] Global exception filter handles all errors
- [ ] No swallowed exceptions
- [ ] User-facing errors are meaningful (no raw stack traces to client)
- [ ] Every API error returns the standard envelope with `errors` array

## 11. Security

- [ ] No hardcoded secrets, passwords, or API keys
- [ ] No sensitive data in logs, URLs, or client bundles
- [ ] Security review produced: `specs/<feature>/security-review.md` with `PASS` or `PASS WITH NOTES`
- [ ] No BLOCK security issues remaining
- [ ] Rate limiting on auth + sensitive endpoints (if applicable)
- [ ] CORS, Helmet, security headers configured (if applicable)

## 12. Accessibility (if user-facing)

- [ ] `eslint-plugin-jsx-a11y` clean (0 errors)
- [ ] Axe (or equivalent) — 0 violations at WCAG 2.1 AA
- [ ] Keyboard navigation verified (Tab through entire page, no traps)
- [ ] Focus visible on every interactive element
- [ ] No `<div onClick>` without `role` + `tabIndex` + keyboard handlers

## 13. Performance

- [ ] Frontend: Lighthouse Performance ≥ 90, LCP < 2.5s, CLS < 0.1 (if applicable)
- [ ] Backend: p95 < 300ms, no N+1 queries
- [ ] All list endpoints paginated (`page`, `limit`, `total` in `meta`)
- [ ] Images optimized via `next/image` (if applicable)
- [ ] No unbounded `findMany` without `take`/`skip`

## 14. SEO (if public page)

- [ ] `<title>` + `<meta description>` + canonical + Open Graph + Twitter Card
- [ ] Structured data (JSON-LD) where applicable
- [ ] Semantic HTML (`<main>`, `<nav>`, headings in order)
- [ ] Sitemap + robots (if new public routes)

## 15. Testing

- [ ] Unit tests for entities, VOs, use cases, utils
- [ ] Integration tests for every endpoint: success + validation error + auth error + tenant isolation
- [ ] API contract compliance verified (response shape matches contract)
- [ ] Frontend tests for critical components (if applicable)
- [ ] E2E tests for critical user journeys (if user-facing and critical)
- [ ] No flaky tests (3 runs green)
- [ ] Coverage: Domain/Application ≥ 80%, Overall ≥ 60%
- [ ] Regression test for every bug fix
- [ ] `npm run test` green (backend + frontend)

## 16. Documentation

- [ ] `specs/<feature>/spec.md` updated to reflect as-built (if spec changed during implementation)
- [ ] Swagger docs complete and verified at `/api/docs`
- [ ] `.env.example` updated (if new env vars)
- [ ] No critical `TODO`/`FIXME` remaining in code
- [ ] Traceability Matrix updated (`specs/<feature>/traceability.md` or `.ai/checklists/traceability-matrix.md`)

## 17. Build & Deployment

- [ ] `npm run build` green (backend + frontend)
- [ ] `npm run lint` green (backend + frontend)
- [ ] `npx prisma validate` green
- [ ] `docker compose up --build` works from clean clone (or documented why not yet)
- [ ] Health endpoint (`GET /health`) returns correctly
- [ ] No secrets in repo (scanned)

## 18. QA & Review

- [ ] Code Review produced: `specs/<feature>/code-review.md` with `APPROVE` or `APPROVE WITH NOTES`
- [ ] QA Agent sign-off: `specs/<feature>/qa-report.md` with `PASS`
- [ ] No BLOCK or REQUEST CHANGES remaining
- [ ] Traceability Matrix row fully green (all columns)

---

## Verdict

| Field | Value |
|-------|-------|
| Feature | {{FEATURE_NAME}} |
| Date Checked | {{DATE}} |
| Checked By | {{AGENT/HUMAN}} |
| Result | ⬜ PASS — All items checked, feature is DONE |
| | ⬜ FAIL — {{N}} items unchecked, feature is NOT DONE |
| Remaining Items | {{LIST}} |

**If FAIL, the feature is NOT Done. Do not mark it complete. Do not start the next feature's final QA until this one passes.**

---

*This checklist is versioned with CONSTITUTION.md v2.0. Amendments require ADR.*
