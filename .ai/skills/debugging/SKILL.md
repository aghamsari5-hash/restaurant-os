# Skill — Debugging

---
name: debugging
description: Systematically reproduce, diagnose, fix, and prevent regression of bugs
when: Any bug report, failing test, production incident, or unexpected behavior
version: 2.0
---

## Purpose

Random fixes create new bugs. This skill enforces a discipl structed debugging workflow that prevents regressions.

## Workflow

### Step 1 — Reproduce

- Create a minimal reproduction: script, test, or manual steps.
- Classify the reproduction:

| Verdict | Meaning |
|---------|---------|
| `CONFIRMED` | Reproduced with clear steps |
| `CANNOT-REPRODUCE` | Could not reproduce with given info — request more details |
| `PARTIAL` | Reproduced intermittently — likely race/timing |

- For `CONFIRMED`: write a failing test FIRST that reproduces the bug. This test must fail before the fix and pass after.

```typescript
// regression test — written BEFORE fix
it('should not allow cross-tenant order access (BUG-123)', async () => {
  const order = await createOrder({ tenantId: 'tenant-a' });
  const res = await request(app)
    .get(`/api/v1/orders/${order.id}`)
    .set('Authorization', `Bearer ${tokenForTenantB}`);
  expect(res.status).toBe(403);
});
```

### Step 2 — Root Cause Analysis

- Trace the execution path: Where does the bug originate?
- Classify:

| Category | Example |
|----------|---------|
| Logic error | Wrong condition, off-by-one |
| Missing validation | No tenant check, no input sanitization |
| Race condition | Concurrent writes without locking |
| Data error | Wrong migration, missing index, stale cache |
| Integration error | Frontend sends wrong shape, API contract mismatch |
| Environment | Missing env var, wrong Docker config |

- Document root cause in `specs/<bug>/root-cause.md` or inline in the fix PR.

### Step 3 — Fix

- Minimal fix: change only what is needed to address the root cause.
- No refactoring or feature additions in a bugfix PR.
- Fix must make the reproduction test pass.

### Step 4 — Regression Test

- The reproduction test from Step 1 is now the regression test — keep it.
- Run full test suite to ensure no new failures:

```bash
cd backend && npm run test && npm run test:e2e
cd frontend && npm run test
```

### Step 5 — Impact & Prevention

- What other features could have the same bug? (e.g., if tenant check was missing in orders, check all other modules)
- Should a new checklist item or Skill rule be added to prevent recurrence?
- Update `.ai/checklists/` or `CONSTITUTION.md` via ADR if systemic.

## Rules

1. **Reproduce before fix.** No fix without a reproduction (test or documented steps).
2. **Test-first fix.** Write the failing test before changing code.
3. **Minimal diff.** Bugfix PRs change only the bug — no unrelated refactoring.
4. **Regression test stays.** Never delete the reproduction test.
5. **Check siblings.** If the bug pattern could exist elsewhere, check and fix all occurrences.

## Output

- Failing → passing regression test
- Minimal fix commit
- Root cause note (in PR or `root-cause.md`)
- Sibling check results

## Definition of Done

- [ ] Bug reproduced (test or steps) — `CONFIRMED`
- [ ] Root cause identified and documented
- [ ] Failing test written before fix
- [ ] Fix applied, test now passes
- [ ] Full test suite green
- [ ] Sibling modules checked for same pattern
- [ ] Prevention: checklist/skill updated if systemic
