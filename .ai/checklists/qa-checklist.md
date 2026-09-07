# QA Checklist — RestaurantOS

> Used by the QA Agent (Phase 9) to perform holistic, independent quality assurance.
> The QA Agent is NOT the developer — it approaches the feature as a user + tester + security reviewer.

---

## QA Agent Mandate

Find what the developer missed:

- Features that look complete but have broken connections
- Undefined behaviors (what happens when ...?)
- Missing states, missing validations, missing tenant checks
- Anything that would fail in production

---

## 1. Pre-Conditions

- [ ] Feature's `spec.md` is Approved
- [ ] Feature's `dod-checklist.md` claims all items are checked (QA verifies the claims)
- [ ] Traceability Matrix row claims to be green (QA verifies each cell)

---

## 2. Functional QA

### 2.1 Happy Path (per Acceptance Criteria)

For each AC in `spec.md`:

- [ ] AC-01.1: ... — Verified via: {{manual / integration test / E2E}} — Result: PASS/FAIL
- [ ] AC-01.2: ... — Verified via: ... — Result: PASS/FAIL
- [ ] (repeat for every AC)

### 2.2 Sad Paths & Edge Cases

- [ ] Invalid inputs return 400 with correct error codes and field mapping
- [ ] Missing required fields return 400 (not 500)
- [ ] Duplicate creation returns 409 (not 500 or silent overwrite)
- [ ] Not found returns 404 (not 500 or empty 200)
- [ ] Unauthorized returns 401 (not 403 or 200)
- [ ] Forbidden (wrong tenant/permission) returns 403 (or 404 to avoid leakage — consistent)
- [ ] Empty list returns 200 with `data: []` and correct `meta` (not 404)
- [ ] Pagination works: page 1, page 2, beyond last page, limit boundaries (1, 100, 101)

### 2.3 Tenant Isolation (P0)

- [ ] Tenant A creates resource → Tenant B cannot read it (GET returns 404 or 403)
- [ ] Tenant B cannot update Tenant A's resource (PATCH returns 404/403)
- [ ] Tenant B cannot delete Tenant A's resource (DELETE returns 404/403)
- [ ] List for Tenant A does not include Tenant B's resources
- [ ] Search for Tenant A does not leak Tenant B's data

### 2.4 Data Integrity

- [ ] Created resource persists correctly (GET after POST returns same data)
- [ ] Updated resource reflects changes (GET after PATCH)
- [ ] Soft deleted resource not in list, but still in DB with `deletedAt`
- [ ] Unique constraints enforced (duplicate returns 409)
- [ ] Foreign key constraints enforced (invalid categoryId returns 400/404)

---

## 3. UI QA (if user-facing)

### 3.1 Visual

- [ ] UI matches `ui-spec.md` and design reference (if provided)
- [ ] No visual regressions on existing pages

### 3.2 States

- [ ] Loading state visible while data fetches (skeleton/spinner)
- [ ] Empty state shown when no data (with correct message + action)
- [ ] Error state shown on API failure (with message + retry)
- [ ] Success state shows correct data

### 3.3 Interaction

- [ ] Forms validate inline (Zod errors shown per field)
- [ ] Server validation errors mapped to correct fields (not just a toast)
- [ ] Submit button disabled + spinner during submission (no double-submit)
- [ ] Success feedback (toast or redirect) after mutation
- [ ] Error feedback on failure (toast or inline)

### 3.4 Responsive

- [ ] Tested at 375px (mobile) — no horizontal scroll, no overlap
- [ ] Tested at 768px (tablet) — layout adapts correctly
- [ ] Tested at 1024px (desktop) — full layout visible
- [ ] Tested at 1280px (large) — container max-width respected
- [ ] Touch targets ≥ 44px on mobile

### 3.5 Accessibility

- [ ] Keyboard: Tab through entire page, no traps, all actions reachable
- [ ] Focus visible on every interactive element
- [ ] Screen reader spot-check for critical flows
- [ ] No `div onClick` without proper role/keyboard

---

## 4. API QA

- [ ] Every endpoint in `api-contract.md` is implemented and reachable
- [ ] Request validation matches contract (field types, required, constraints)
- [ ] Success response shape matches contract (envelope + data shape)
- [ ] Error responses match contract (status codes + error codes + field mapping)
- [ ] Pagination on every list endpoint (`page`, `limit`, `meta.total`)
- [ ] Swagger at `/api/docs` shows all endpoints with correct schemas

---

## 5. Security QA

- [ ] No secrets in repo or client bundle
- [ ] Every protected endpoint requires auth (401 without token)
- [ ] Every protected endpoint checks tenant (403 for cross-tenant)
- [ ] Every protected endpoint checks permissions (403 for missing permission)
- [ ] No stack traces or internal errors exposed to client
- [ ] Input validation on every endpoint (no unvalidated inputs)

---

## 6. Integration QA

- [ ] Frontend → API → Backend → DB chain works end-to-end (create via UI, verify in DB)
- [ ] API → DB: data persists correctly
- [ ] DB → API: API returns what is in DB
- [ ] No broken connections (every UI action hits a real endpoint, every endpoint hits real DB)

---

## 7. Build & Infra QA

- [ ] `npm run build` green (backend + frontend)
- [ ] `npm run lint` green (backend + frontend)
- [ ] `npx prisma validate` green
- [ ] `docker compose up --build` works (if applicable for this phase)
- [ ] Health endpoint (`GET /health`) returns correctly

---

## 8. QA Verdict

| Field | Value |
|-------|-------|
| Feature | {{FEATURE_NAME}} |
| QA Agent | {{NAME}} |
| Date | {{DATE}} |
| Verdict | ⬜ PASS — No blocking issues, feature is ready |
| | ⬜ PASS WITH NOTES — Minor issues, non-blocking (list below) |
| | ⬜ FAIL — Blocking issues found (list below), feature is NOT Done |
| Traceability | ⬜ Matrix row verified — all claims checked |

### Findings

#### BLOCK (must fix before Done)

| # | Finding | Severity | Location |
|---|---------|----------|----------|
| 1 | ... | P0 | file:line |

#### NOTES (non-blocking, for follow-up)

| # | Finding | Severity | Location |
|---|---------|----------|----------|
| 1 | ... | P2 | file:line |

---

### Checklist Summary

- Total checks: {{N}}
- Passed: {{N}}
- Failed (BLOCK): {{N}}
- Failed (NOTES): {{N}}

**If FAIL, the feature returns to the developer. QA re-runs after fixes.**

---

*QA Agent: Be thorough, be independent, be adversarial — your job is to find what others missed.*
