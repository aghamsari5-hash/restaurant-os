# Prompt Template — Fix Bug

> For bug fixes — uses the Debugging Skill's structured workflow.

---

Read `AGENTS.md`, `CONSTITUTION.md`.

## Context

- **Bug:** {{BUG_ID}} — {{BUG_TITLE}}
- **Report:** {{BUG_DESCRIPTION + REPRO_STEPS}}
- **Severity:** P0 / P1 / P2 / P3

## Skills to Activate

- `debugging` — `.ai/skills/debugging/SKILL.md`
- Relevant domain skill (e.g., `backend`, `frontend`, `database`, `auth`)

## Task

Per `.ai/skills/debugging/SKILL.md`:

1. **Reproduce** — Create minimal reproduction, classify as CONFIRMED / CANNOT-REPRODUCE / PARTIAL. Write a failing test FIRST.
2. **Root Cause** — Trace execution path, classify category, document in PR or root-cause.md
3. **Fix** — Minimal diff, only the bug — no refactoring
4. **Regression Test** — Reproduction test now passes, full suite green
5. **Impact** — Check sibling modules for same pattern, update checklist/skill if systemic

## Constraints

- No fix without reproduction (test or documented steps)
- Minimal diff — bugfix PR changes only the bug
- Regression test stays — never delete it
- Check siblings for same pattern

## Validation

```bash
cd backend && npm run test && npm run test:e2e
cd frontend && npm run test  # if frontend bug
```

Report: Root cause, fix summary, regression test, sibling check results.
