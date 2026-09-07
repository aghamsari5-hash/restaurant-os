# Prompt Architecture — RestaurantOS

> Never use one mega-prompt. Compose prompts in layers. This document defines how.

---

## Why Layered Prompts?

- **One mega-prompt** is fragile: hard to maintain, hard to debug, easy to drift, and wastes context.
- **Layered prompts** are modular: each layer has one responsibility, layers compose deterministically, and changes are isolated.

---

## The 8 Layers

```
┌──────────────────────────────────────────────────────────────┐
│  LAYER 1 — MASTER_SYSTEM_PROMPT                              │
│  Who the agent is, globally. Rarely changes.                 │
│  File: .ai/prompts/master-system.md                          │
├──────────────────────────────────────────────────────────────┤
│  LAYER 2 — PROJECT_CONTEXT                                   │
│  What RestaurantOS is. Stable per project.                   │
│  File: .ai/prompts/project-context.md                        │
├──────────────────────────────────────────────────────────────┤
│  LAYER 3 — PHASE_SPEC                                        │
│  What to build in this phase. Changes per phase.             │
│  File: specs/<phase>/spec.md                                 │
├──────────────────────────────────────────────────────────────┤
│  LAYER 4 — DESIGN_REFERENCE                                  │
│  What it should look like. Changes per UI feature.           │
│  File: specs/<phase>/design-reference/*.png + ui-spec.md     │
├──────────────────────────────────────────────────────────────┤
│  LAYER 5 — TECHNICAL_REQUIREMENTS                            │
│  How to build it. Stable (Constitution + Skills).            │
│  Files: CONSTITUTION.md + .ai/skills/<skill>/SKILL.md        │
├──────────────────────────────────────────────────────────────┤
│  LAYER 6 — ACCEPTANCE_CRITERIA                               │
│  How to know it is done. Per feature.                        │
│  File: specs/<feature>/spec.md §6                            │
├──────────────────────────────────────────────────────────────┤
│  LAYER 7 — SKILLS                                            │
│  Domain expertise. Loaded on demand.                         │
│  Files: .ai/skills/<skill>/SKILL.md                          │
├──────────────────────────────────────────────────────────────┤
│  LAYER 8 — VALIDATION_RULES                                  │
│  How to verify completeness. Stable.                         │
│  Files: .ai/checklists/definition-of-done.md + traceability  │
└──────────────────────────────────────────────────────────────┘
```

---

## Composition Rules

### Rule 1 — Always Include Layers 1, 2, 5, 8

Every prompt — no matter how small — includes:

- Layer 1 (who you are)
- Layer 2 (what the project is)
- Layer 5 (how to build — at least CONSTITUTION.md)
- Layer 8 (how to verify — at least the relevant DoD section)

### Rule 2 — Add Layers 3, 4, 6, 7 Per Task

| Task | Add Layers |
|------|------------|
| Implement a feature | 3 (spec) + 6 (AC) + 7 (relevant skills) |
| Implement UI | 3 + 4 (design) + 7 (ui-design, frontend, responsive, a11y) |
| Implement backend | 3 + 6 + 7 (backend, database, api, auth) |
| Fix a bug | 3 (bug spec) + 7 (debugging) |
| Review code | 3 + 7 (code-review) + 8 |
| QA | 3 + 6 + 8 (full DoD + QA checklist) |

### Rule 3 — Reference Files, Don't Paste Entire Files

- For small files (< 100 lines): paste inline.
- For large files (CONSTITUTION.md, spec.md): reference path + key excerpts. The agent reads the file via `read_file`.
- Example: "Read CONSTITUTION.md Article I-IV" is better than pasting 500 lines.

### Rule 4 — Order Matters

Layers are ordered by priority. If instructions conflict, earlier layers win:

```
MASTER_SYSTEM_PROMPT > PROJECT_CONTEXT > CONSTITUTION > PHASE_SPEC > SKILL
```

### Rule 5 — No Layer Duplication

If Layer 5 already says "tenant isolation on every query," don't repeat it in Layer 3. Keep each fact in one layer.

---

## How to Compose a Prompt (Step-by-Step)

### Example: "Implement Products CRUD — Phase 5 (Backend)"

```markdown
# Composed Prompt

## Layer 1 — MASTER_SYSTEM_PROMPT
(Read .ai/prompts/master-system.md — 10 lines)

## Layer 2 — PROJECT_CONTEXT
(Read .ai/prompts/project-context.md — 15 lines)

## Layer 3 — PHASE_SPEC
Phase: Phase 5 — Products Backend
Spec: specs/products/spec.md
Plan: specs/products/plan.md

## Layer 5 — TECHNICAL_REQUIREMENTS
Constitution: Articles I, II, IV, V (Architecture, Coding, Error Handling, Security)
Skills: backend, database, api, security

## Layer 6 — ACCEPTANCE_CRITERIA
(from specs/products/spec.md §6)
- AC-01.1: Given valid data, when POST /api/v1/products, then 201
- AC-01.2: Given missing name, when POST, then 400
- AC-03.1: Given tenant A creates product, when tenant B lists, then not visible

## Layer 7 — SKILLS
Read: .ai/skills/backend/SKILL.md, .ai/skills/database/SKILL.md, .ai/skills/api/SKILL.md

## Layer 8 — VALIDATION_RULES
DoD sections: §4 (Database), §5 (API), §6 (Backend), §8 (Auth), §9 (Validation), §11 (Security)
Traceability: Update specs/products/traceability.md

## TASK
Execute Phase 5 per .ai/workflows/phase-workflow.md Phase 5 steps.
Start with domain layer, then application, then presentation.
Validate with: npm run build && npm run lint && npx prisma validate
```

---

## Prompt Templates by Task

| Task | Template File |
|------|---------------|
| Implement a phase | `.ai/prompts/phases/implement-phase.md` |
| Design UI from reference | `.ai/prompts/phases/design-ui.md` |
| Review code | `.ai/prompts/phases/review-code.md` |
| QA | `.ai/prompts/phases/qa.md` |
| Fix bug | `.ai/prompts/phases/fix-bug.md` |
| Google AI Studio flow | `.ai/workflows/google-ai-studio.md` § Step 5 |

---

## Token Budget Guidance

| Layer | Typical Size | Budget |
|-------|-------------|--------|
| Layer 1 (Master) | ~500 tokens | Fixed — always included |
| Layer 2 (Project) | ~800 tokens | Fixed — always included |
| Layer 3 (Spec) | 1,000-3,000 tokens | Per feature — reference path if large |
| Layer 4 (Design) | Images + ~500 tokens | Per UI feature |
| Layer 5 (Constitution + Skills) | 1,000-2,000 tokens | Reference paths, key excerpts |
| Layer 6 (AC) | ~500 tokens | Per feature — paste inline |
| Layer 7 (Skills) | 500-1,500 per skill | Load only needed skills |
| Layer 8 (DoD) | ~500 tokens | Relevant sections only |

**Total per prompt:** Aim for 3,000-6,000 tokens of instructions + file reads. The agent reads additional files via tools.

---

## Anti-Patterns

- ❌ Pasting CONSTITUTION.md + all 16 SKILL.md + full spec into one prompt (wastes context, hard to maintain).
- ❌ Writing a new mega-prompt per feature (not reusable).
- ❌ Omitting Layer 8 (validation) — without it, the agent doesn't know when it's done.
- ❌ Putting feature-specific details in Layer 1 or 2 (those layers are stable).

---

*Version 2.0. Updated: 2026-09-07.*
