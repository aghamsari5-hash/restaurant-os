# Skill — Testing

---
name: testing
description: Implement unit, integration, and API tests that are deterministic and enforce quality gates
when: Phase 8 (Testing) and after every feature's backend/frontend implementation
version: 2.0
---

## Purpose

Tests are not optional. Critical business logic requires tests before merge. This skill ensures tests are written, deterministic, and actually verify behavior.

## Testing Pyramid

```
        E2E (few, critical journeys)
      ───────────────────
     Integration (API + DB)
  ─────────────────────────
 Unit (many — entities, VOs, use cases, utils)
```

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| `specs/<feature>/spec.md` § Acceptance Criteria | Yes | What to verify |
| `specs/<feature>/api-contract.md` | Yes | Endpoints to test |
| `specs/<feature>/database-schema.md` | Yes | Data to set up |
| Existing test setup | Yes | `jest.config`, `test/` folder |

## Workflow

### Step 1 — Unit Tests

**Target:** Entities, Value Objects, Domain Services, Use Cases, Utils.

- Mock infrastructure (repositories, external APIs).
- Test business invariants, edge cases, and error paths.
- Location: `backend/src/modules/<domain>/__tests__/` or colocated `*.spec.ts`.

```typescript
// Example: domain entity test
describe('Order', () => {
  it('should not allow empty items', () => {
    expect(() => Order.create({ items: [] })).toThrow(EmptyOrderError);
  });
  it('should calculate total correctly', () => {
    const order = Order.create({ items: [{ price: 100, qty: 2 }] });
    expect(order.total).toBe(200);
  });
});
```

### Step 2 — Integration Tests

**Target:** API endpoints + DB interaction.

- Use real DB (test containers or dedicated test DB), not mocks for the DB layer.
- Test: success path, validation errors (400), auth errors (401/403), not found (404), tenant isolation.
- Location: `backend/test/<domain>.e2e-spec.ts` or `backend/src/modules/<domain>/__tests__/integration/`.

```typescript
describe('POST /api/v1/orders', () => {
  it('should create order with valid data', async () => {
    const res = await request(app).post('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(validPayload);
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id');
  });
  it('should reject without tenant', async () => {
    // cross-tenant test
  });
  it('should return 400 for invalid payload', async () => {
    // validation test
  });
});
```

### Step 3 — API Contract Tests

- Every endpoint in `api-contract.md` has at least: 1 success + 1 validation error + 1 auth error test.
- Response shape matches the contract's envelope.

### Step 4 — Frontend Tests (if applicable)

- **Unit:** Component rendering, hooks, utils (Vitest / Jest + React Testing Library).
- **Integration:** Component + TanStack Query + mocked API (MSW).

### Step 5 — Quality Gates

```bash
cd backend && npm run test          # Unit
cd backend && npm run test:e2e      # Integration / E2E
cd backend && npm run test:cov      # Coverage
```

- Domain/Application coverage ≥ 80%
- Overall coverage ≥ 60%
- No flaky tests (run 3x, all green)

## Rules

1. **No flaky tests.** If a test is non-deterministic, fix it or delete it — flaky tests are worse than no tests.
2. **Test behavior, not implementation.** Test what the user/domain expects, not internal method calls.
3. **Every bug fix includes a regression test** that fails before the fix and passes after.
4. **Tenant isolation tests are mandatory** for every multi-tenant endpoint.
5. **Validation tests are mandatory** for every endpoint with input.
6. **Keep tests fast.** Unit < 100ms, Integration < 1s. Mock what is slow, but not the DB for integration tests.

## Output

- `backend/src/modules/<domain>/**/*.spec.ts` — Unit tests
- `backend/test/**/*.e2e-spec.ts` — Integration/API tests
- `frontend/src/**/*.test.tsx` — Frontend tests
- Coverage report

## Definition of Done

- [ ] Unit tests for entities, VOs, use cases
- [ ] Integration tests for every endpoint (success + validation + auth + tenant)
- [ ] API contract compliance verified
- [ ] No flaky tests (3 runs green)
- [ ] Coverage gates met
- [ ] Regression test for every bug fix
- [ ] `npm run test` green
- [ ] Traceability Matrix updated
