# Prompt Template — Implement Phase

> Copy, fill {{VARIABLES}}, and send to the agent.

---

Read `AGENTS.md` and `CONSTITUTION.md` first.

## Context

- **Phase:** {{PHASE_ID}} — {{PHASE_NAME}}
- **Spec:** `specs/{{PHASE_ID}}/spec.md`
- **Plan:** `specs/{{PHASE_ID}}/plan.md` (if not exists, create per Phase 3 of the Phase Workflow)
- **Design Reference:** `specs/{{PHASE_ID}}/design-reference/*.png` ({{N}} screenshots, if UI phase)
- **Previous Phase:** {{PREV_PHASE}} — status: Done

## Skills to Activate

{{SKILLS}}
<!-- e.g., backend, database, api, auth, security -->
<!-- See .ai/workflows/google-ai-studio.md § Step 5 for phase-to-skills mapping -->

Read the relevant SKILL.md files:
{{SKILL_PATHS}}
<!-- e.g., .ai/skills/backend/SKILL.md, .ai/skills/database/SKILL.md -->

## Acceptance Criteria (from spec.md §6)

```
{{COPY_AC_TABLE}}
```

## Validation Rules

Relevant DoD sections: {{DOD_SECTIONS}}
<!-- e.g., §4 Database, §5 API, §6 Backend, §11 Security -->
See `.ai/checklists/definition-of-done.md`

Traceability: Update `specs/{{PHASE_ID}}/traceability.md` and `.ai/checklists/traceability-matrix.md`

## Constraints

- Implement ONLY Phase {{PHASE_ID}} — do not start Phase {{NEXT_PHASE}}
- Follow the Phase Workflow gates: Entry Criteria → Tasks → Exit Criteria → Gate (see `.ai/workflows/phase-workflow.md` Phase {{PHASE_ID}})
- Contract-First: `api-contract.md` before backend code
- Schema-First: `database-schema.md` before backend code
- No TODO, no placeholders, no mock business logic
- Every query must filter by `tenantId`
- No hardcoded secrets

## Task

Execute Phase {{PHASE_ID}} step by step per `.ai/workflows/phase-workflow.md`.

Start with: {{FIRST_TASK}}
<!-- e.g., "Domain layer: entities and value objects" for Phase 5 -->

Validate with:
```bash
cd backend && npm run build && npm run lint && npx prisma validate
cd frontend && npm run build && npm run lint  # if frontend phase
```

Report at the end: Files Created, Files Modified, Breaking Changes, Remaining Risks.
