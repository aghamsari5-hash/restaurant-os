# Skill — E2E Testing

---
name: e2e
description: Implement end-to-end tests that verify critical user journeys through the real UI, API, and database
when: Phase 8 (Testing) for critical journeys; any user-facing feature that needs journey validation
version: 2.0
---

## Purpose

E2E tests prove that the whole chain works: UI → API → Backend → Database → UI. They are the final proof that a feature is not just "UI complete."

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| `specs/<feature>/spec.md` § User Stories | Yes | Journeys to automate |
| `specs/<feature>/api-contract.md` | Yes | API behavior |
| Running app | Yes | `docker compose up` or dev servers |

## Workflow

### Step 1 — Identify Critical Journeys

Not every feature needs E2E. E2E is for:

- Auth: login → dashboard → logout
- Orders: create order → pay → view in kitchen → complete
- Products: create product → view in menu → add to order
- Any flow where UI + API + DB must all work together

Document journeys in `specs/<feature>/e2e-plan.md`.

### Step 2 — Tool Selection

- **Playwright** (recommended) — `frontend/e2e/` — for Next.js. Supports parallel, headed/headless, trace viewer.
- **Cypress** — alternative, if already in the project.
- Never both. Pick one and stay consistent.

### Step 3 — Test Structure

```
frontend/e2e/
  ├── fixtures/        # Test data, auth helpers
  ├── pages/           # Page Object Models (POM)
  └── specs/
      ├── auth.spec.ts
      ├── orders.spec.ts
      └── products.spec.ts
```

**Page Object Model (mandatory for maintainability):**

```typescript
// pages/login.page.ts
export class LoginPage {
  constructor(private page: Page) {}
  async login(email: string, password: string) {
    await this.page.fill('[data-testid="email"]', email);
    await this.page.fill('[data-testid="password"]', password);
    await this.page.click('[data-testid="login-button"]');
  }
}
```

### Step 4 — Test Implementation

```typescript
test('user can create an order', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('test@restaurant.com', 'Test123!');

  await page.goto('/orders/new');
  await page.click('[data-testid="add-product"]');
  await page.click('[data-testid="product-1"]');
  await page.click('[data-testid="submit-order"]');

  await expect(page.locator('[data-testid="order-success"]')).toBeVisible();
  // Verify in DB or via API that order was persisted with correct tenant
});
```

### Step 5 — Data & Isolation

- Each test creates its own data (via API or seed) and cleans up after.
- Tests must be independent — no shared state, no order dependency.
- Use `data-testid` attributes (never CSS selectors or text that changes with i18n).

### Step 6 — Execution

```bash
cd frontend && npx playwright test
cd frontend && npx playwright test --headed  # debug
cd frontend && npx playwright show-report
```

- E2E tests run in CI on every PR (or nightly if too slow).
- On failure: trace viewer + screenshots + video are artifacts.

## Rules

1. **E2E is for journeys, not edge cases.** Edge cases belong in unit/integration tests. E2E verifies the happy path + one critical error path per journey.
2. **Page Object Model mandatory.** No raw selectors scattered in test files.
3. **`data-testid` only.** Never select by CSS class, text, or nth-child.
4. **Independent tests.** No test depends on another. Each sets up and tears down its data.
5. **Real backend, real DB.** E2E hits the real API and DB (test environment), not mocks.
6. **Keep E2E lean.** If E2E suite takes > 5 min, you have too many E2E tests — move edge cases to integration.

## Output

- `frontend/e2e/specs/<feature>.spec.ts`
- `frontend/e2e/pages/<page>.page.ts`
- `frontend/e2e/fixtures/` — helpers
- `playwright.config.ts` — configured

## Definition of Done

- [ ] Critical journeys identified and documented
- [ ] Page Objects created
- [ ] E2E tests for happy path + one error path per journey
- [ ] Tests independent and use `data-testid`
- [ ] Tests pass against real backend + DB
- [ ] CI configured (or documented for CI)
- [ ] Traceability Matrix updated
