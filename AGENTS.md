# AGENTS.md — RestaurantOS AI Operating System

> **This file is the single entry point for every AI coding agent working on this repository.**
> It is read by 30+ tools: Claude Code, GitHub Copilot, Cursor, OpenAI Codex, Gemini CLI, Windsurf, Devin, Aider, Factory, and more.
> CLAUDE.md and GEMINI.md extend it with tool-specific overrides — but AGENTS.md is the source of truth.

---

## 1. What Is This Repository?

**RestaurantOS** is a production-ready, enterprise-grade Restaurant Management Platform.

- **Architecture:** Clean Architecture + DDD + Modular Monolith + Event-Driven
- **Backend:** NestJS + TypeScript (strict) + Prisma + PostgreSQL + Redis
- **Frontend:** Next.js 15 (App Router) + React + TypeScript + TailwindCSS + shadcn/ui + TanStack Query + Zustand
- **Infra:** Docker + Docker Compose (Kubernetes-ready)

This repository is also a **Reusable AI Development System** — a set of rules, skills, templates, workflows, and checklists that let any AI agent build any feature end-to-end without leaving gaps.

---

## 2. How This OS Works (Read This First)

```
┌─────────────────────────────────────────────────────────┐
│                    LAYER 0 — Entry                      │
│  AGENTS.md (you are here) → CLAUDE.md / GEMINI.md       │
├─────────────────────────────────────────────────────────┤
│              LAYER 1 — Constitution (Laws)              │
│  CONSTITUTION.md + .ai/constitution/*.md                │
│  Permanent, non-negotiable rules                        │
├─────────────────────────────────────────────────────────┤
│                LAYER 2 — Skills (Capabilities)          │
│  .ai/skills/<skill>/SKILL.md  (16 skills)               │
│  Each skill has: trigger, inputs, workflow, DoD         │
├─────────────────────────────────────────────────────────┤
│              LAYER 3 — Design System (Tokens)           │
│  .ai/design-system/tokens.json + components/*.md        │
│  Deterministic UI rules AI can execute                  │
├─────────────────────────────────────────────────────────┤
│           LAYER 4 — Templates & Checklists              │
│  .ai/templates/*.md  +  .ai/checklists/*.md             │
├─────────────────────────────────────────────────────────┤
│              LAYER 5 — Workflows (Orchestration)        │
│  .ai/workflows/*.md  +  .ai/prompts/*.md                │
│  Phase workflow, Feature workflow, Google AI Studio      │
└─────────────────────────────────────────────────────────┘
```

**Execution order for every task:**

1. Read `AGENTS.md` (this file) → understand where you are.
2. Read `CONSTITUTION.md` → understand the laws you cannot break.
3. Identify the **Phase** and **Skill(s)** required → load only those `SKILL.md` files.
4. Read the relevant **Template** → fill it before coding.
5. Execute the **Workflow** step-by-step.
6. Validate against **Definition of Done** → no feature is complete until all gates pass.
7. Update **Traceability Matrix** → prove completeness.

---

## 3. Mandatory Pre-Flight Checklist

Before writing a single line of code, you MUST:

- [ ] Read `CONSTITUTION.md`
- [ ] Read `docs/031-architecture-overview.md` and `docs/034-database-design.md`
- [ ] Read the current Sprint/Phase spec in `specs/<phase>/spec.md`
- [ ] Read `specs/<phase>/plan.md` and `specs/<phase>/tasks.md`
- [ ] Check `.ai/checklists/traceability-matrix.md` for the feature's current state
- [ ] Confirm which Skill(s) apply and load their `SKILL.md`

If any of the above files do not exist, **STOP and ask for clarification**. Do not invent architecture.

---

## 4. Project Structure (Where Things Go)

```
restaurant-os/
├── AGENTS.md                    # ← You are here (cross-tool OS)
├── CLAUDE.md                    # Claude Code overrides + @imports
├── GEMINI.md                    # Gemini CLI overrides
├── CONSTITUTION.md              # Permanent laws
├── PROJECT_RULES.md             # Business rules
├── .ai/                         # AI Operating System
│   ├── constitution/            # Layer 1 — Laws
│   ├── skills/                  # Layer 2 — 16 Skills
│   ├── design-system/           # Layer 3 — Tokens & Components
│   ├── templates/               # Layer 4 — Spec/Contract templates
│   ├── checklists/              # Layer 4 — DoD, QA, Traceability
│   ├── workflows/               # Layer 5 — Phase & Feature workflows
│   ├── prompts/                 # Layer 5 — Reusable prompt architecture
│   └── agents/                  # Agent role definitions
├── .specify/                    # Spec-Kit (Spec-Driven Development)
│   ├── memory/constitution.md   # Spec-Kit constitution (mirrors CONSTITUTION.md)
│   └── templates/               # Spec-Kit templates
├── .claude/
│   ├── skills/                  # Claude-native skills (mirrors .ai/skills)
│   └── agents/                  # Claude subagents
├── specs/                       # Per-feature/phase specs (spec.md, plan.md, tasks.md)
├── docs/                        # Business + Technical documentation (40 files, source of truth)
├── backend/                     # NestJS application
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── config/
│   │   ├── common/              # Guards, filters, interceptors, decorators
│   │   ├── modules/<domain>/    # Each domain is independent
│   │   │   ├── controllers/
│   │   │   ├── services/        # Application services
│   │   │   ├── domain/          # Entities, VOs, Aggregates, Events
│   │   │   ├── infrastructure/  # Repositories, mappers
│   │   │   ├── dto/
│   │   │   └── events/
│   │   └── shared/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── test/
├── frontend/                    # Next.js 15 App Router
│   ├── src/
│   │   ├── app/                 # Routes (App Router)
│   │   ├── components/
│   │   │   ├── ui/              # shadcn/ui primitives
│   │   │   └── features/<domain>/ # Domain components
│   │   ├── features/<domain>/   # Hooks, services, stores, types
│   │   ├── lib/                 # Utils, api-client, validators
│   │   └── hooks/
│   └── public/
├── docker/
├── scripts/
└── prompts/                     # Sprint prompts (legacy, being migrated to specs/)
```

**Rules:**
- Never create files outside this structure without updating `CONSTITUTION.md`.
- Never move folders unless explicitly requested.
- `backend/src/modules/<domain>/` owns its domain completely — no cross-module DB access.
- `frontend/src/features/<domain>/` mirrors backend domains.

---

## 5. Available Skills (Load On Demand)

| # | Skill | Path | When to Activate |
|---|-------|------|-----------------|
| 1 | UI Design | `.ai/skills/ui-design/SKILL.md` | Before any frontend work; when given a screenshot/reference |
| 2 | Frontend | `.ai/skills/frontend/SKILL.md` | Building React/Next.js components, pages, hooks |
| 3 | Backend | `.ai/skills/backend/SKILL.md` | Building NestJS controllers, services, domain logic |
| 4 | Database | `.ai/skills/database/SKILL.md` | Any schema, migration, query, or seed work |
| 5 | API | `.ai/skills/api/SKILL.md` | Defining or implementing any endpoint |
| 6 | Authentication | `.ai/skills/auth/SKILL.md` | Login, JWT, RBAC, permissions, sessions |
| 7 | Security | `.ai/skills/security/SKILL.md` | Every feature (always active as reviewer) |
| 8 | Testing | `.ai/skills/testing/SKILL.md` | Unit + Integration + API tests |
| 9 | E2E Testing | `.ai/skills/e2e/SKILL.md` | Playwright/Cypress flows |
| 10 | Responsive | `.ai/skills/responsive/SKILL.md` | Every UI component |
| 11 | Accessibility | `.ai/skills/a11y/SKILL.md` | Every UI component |
| 12 | SEO | `.ai/skills/seo/SKILL.md` | Public pages, meta, structured data |
| 13 | Performance | `.ai/skills/performance/SKILL.md` | Every feature (budgets enforced) |
| 14 | Deployment | `.ai/skills/deployment/SKILL.md` | Docker, env, CI/CD, production checks |
| 15 | Code Review | `.ai/skills/code-review/SKILL.md` | Before every PR/merge |
| 16 | Debugging | `.ai/skills/debugging/SKILL.md` | When fixing bugs (reproduce → root cause → fix → regression test) |

**How to load:** Read only the `SKILL.md` files you need for the current task. Do not load all 16 at once.

---

## 6. Workflow Summary

### Spec-Driven Development (GitHub Spec Kit compatible)

```
/speckit.constitution  →  .specify/memory/constitution.md
/speckit.specify       →  specs/<feature>/spec.md
/speckit.clarify       →  Resolve ambiguities (MANDATORY before plan)
/speckit.plan          →  specs/<feature>/plan.md
/speckit.tasks         →  specs/<feature>/tasks.md
/speckit.analyze       →  Cross-artifact consistency check
/speckit.implement     →  Execute tasks one by one
```

### Phase Workflow (10 Phases)

```
Phase 0  Discovery  →  Phase 1  Specification  →  Phase 2  UX/UI Design
→ Phase 3  Architecture  →  Phase 4  Database  →  Phase 5  Backend
→ Phase 6  Frontend  →  Phase 7  Integration  →  Phase 8  Testing
→ Phase 9  QA  →  Phase 10  Production
```

Each phase has: **Entry Criteria → Tasks → Exit Criteria → Validation Gate**.
You may NOT start Phase N+1 until Phase N's exit criteria are met.
See `.ai/workflows/phase-workflow.md` for the full definition.

### Feature Workflow (Traceability Chain)

```
Requirement → Acceptance Criteria → UI → Component → API → Backend → Database → Tests → QA
```

If ANY link is missing, the feature is **NOT complete**. See `.ai/checklists/traceability-matrix.md`.

### Google AI Studio Workflow

```
Define Phase → Design UI in AI Studio → Screenshot/Reference → Spec → AI implements ONLY that phase → AI validates → Next phase
```

See `.ai/workflows/google-ai-studio.md`.

---

## 7. Prompt Architecture

Never use one mega-prompt. Compose prompts in layers:

```
MASTER_SYSTEM_PROMPT      (.ai/prompts/master-system.md)
  + PROJECT_CONTEXT       (.ai/prompts/project-context.md)
  + PHASE_SPEC            (specs/<phase>/spec.md)
  + DESIGN_REFERENCE      (screenshot / Figma / AI Studio export)
  + TECHNICAL_REQUIREMENTS(.ai/constitution/*.md + relevant SKILL.md)
  + ACCEPTANCE_CRITERIA   (specs/<phase>/spec.md § Acceptance Criteria)
  + SKILLS                (.ai/skills/<skill>/SKILL.md)
  + VALIDATION_RULES      (.ai/checklists/definition-of-done.md)
```

See `.ai/prompts/README.md` for composition rules.

---

## 8. Definition of Done (Summary)

A feature is **NOT complete** until ALL of these pass:

- [ ] UI built + Responsive + Loading/Empty/Error states
- [ ] API contract defined (OpenAPI) + implemented + validated
- [ ] Backend logic + DB integration + tenant isolation
- [ ] Auth/AuthZ checked (if protected)
- [ ] Validation on every input (client + server)
- [ ] Error handling (global filter, no swallowed exceptions)
- [ ] Unit tests + Integration tests + E2E (if user-facing)
- [ ] Security review passed
- [ ] Accessibility check (WCAG 2.1 AA)
- [ ] Performance budget met
- [ ] Documentation updated
- [ ] No critical TODO/FIXME
- [ ] Build + Lint + Tests green
- [ ] Traceability Matrix row is fully green

Full checklist: `.ai/checklists/definition-of-done.md`

---

## 9. Commands

```bash
# Backend
cd backend && npm run start:dev     # Dev server
cd backend && npm run build         # Build
cd backend && npm run lint          # Lint
cd backend && npm run test          # Unit tests
cd backend && npm run test:e2e      # E2E tests
cd backend && npx prisma migrate dev # Migrate
cd backend && npx prisma generate   # Generate client

# Frontend
cd frontend && npm run dev          # Dev server (Next.js)
cd frontend && npm run build        # Build
cd frontend && npm run lint         # Lint
cd frontend && npm run test         # Tests

# Infra
docker compose up --build           # Full stack
docker compose down

# Verification (run before marking any feature done)
npm run build && npm run lint && npm run test
```

---

## 10. Rules for AI Agents

1. **Documentation is law.** Never invent architecture. If docs and prompt conflict, follow docs.
2. **No placeholders.** Never generate TODO, FIXME, dummy, or mock business logic.
3. **TypeScript strict.** No `any`. Explicit types. `readonly` where possible.
4. **Tenant isolation.** Every query MUST filter by `tenant_id`. No exceptions.
5. **No business logic in controllers or DTOs.**
6. **One feature at a time.** Complete the traceability chain before starting the next.
7. **No phase skipping.** Respect the 10-phase workflow gates.
8. **Tests are not optional.** Critical business logic requires tests before merge.
9. **Security by default.** Validate every input, check every permission, never log secrets.
10. **Ask, don't guess.** If documentation is missing or ambiguous, STOP and ask.

---

## 11. File Reading Priority

When instructions conflict, this priority applies:

1. `docs/` (business + technical source of truth)
2. `CONSTITUTION.md` (permanent laws)
3. `AGENTS.md` (this file)
4. Current Phase Spec (`specs/<phase>/spec.md`)
5. Skill files (`.ai/skills/<skill>/SKILL.md`)
6. Existing source code

---

## 12. Where to Go Next

- **New to the project?** → Read `CONSTITUTION.md`, then `docs/031-architecture-overview.md`
- **Starting a feature?** → Read `.ai/workflows/feature-workflow.md`
- **Starting a phase?** → Read `.ai/workflows/phase-workflow.md`
- **Working with Google AI Studio?** → Read `.ai/workflows/google-ai-studio.md`
- **Need a prompt?** → Read `.ai/prompts/README.md`
- **Checking if done?** → Read `.ai/checklists/definition-of-done.md`
- **Finding gaps?** → Read `.ai/checklists/traceability-matrix.md`

---

*This file is versioned. Last updated: 2026-09-07. Changes require ADR.*
