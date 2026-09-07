# Prompt Template — QA

> For Phase 9 (QA) — QA Agent (holistic, adversarial).

---

Read `AGENTS.md`, `CONSTITUTION.md`.

## Context

- **Feature/Phase:** {{FEATURE_OR_PHASE}}
- **Spec:** `specs/{{FEATURE}}/spec.md` (AC to verify)
- **DoD Checklist:** `specs/{{FEATURE}}/dod-checklist.md` (developer's claims)
- **Traceability:** `specs/{{FEATURE}}/traceability.md` + `.ai/checklists/traceability-matrix.md`
- **Running App:** `docker compose up` or dev servers (for manual/E2E QA)

## Skills to Activate

- QA Agent — `.ai/agents/qa-agent.md`
- Checklists: `.ai/checklists/qa-checklist.md`, `.ai/checklists/definition-of-done.md`

## Task

You are the **QA Agent** — independent, adversarial, thorough. Your job is to find what the developer missed.

Per `.ai/checklists/qa-checklist.md`, verify:

1. **Functional QA** — Every AC (happy path + sad paths + edge cases + tenant isolation + data integrity)
2. **UI QA** — Visual, states, interaction, responsive, a11y
3. **API QA** — Every endpoint, validation, response shape, pagination, Swagger
4. **Security QA** — Auth, tenant, permissions, no secrets, no stack traces
5. **Integration QA** — Frontend → API → Backend → DB chain, no mocks, no broken connections
6. **Build QA** — build, lint, prisma validate, docker

Produce `specs/{{FEATURE}}/qa-report.md` with verdict:
- `PASS` — No blocking issues, feature is ready
- `PASS WITH NOTES` — Minor issues, non-blocking
- `FAIL` — Blocking issues found, feature is NOT Done (return to developer)

Be thorough. Be adversarial. Find the gaps.
