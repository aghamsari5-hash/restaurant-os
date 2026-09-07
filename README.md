# RestaurantOS — AI-Native Restaurant Management Platform

> Production-ready, enterprise-grade Restaurant Management Platform + **Reusable AI Development System** — an operating system for AI coding agents.

---

## What Is This?

**Two things in one repository:**

1. **RestaurantOS** — A cloud-native Restaurant Management Platform (POS, Orders, Kitchen, Inventory, Customers, Reports, and more).
2. **AI Development OS** — A reusable system of rules, skills, templates, checklists, workflows, and prompt architectures that lets any AI agent build any feature end-to-end without leaving gaps.

The AI Development OS is designed to solve the core problem with AI-generated projects: **"UI looks done but backend, database, API, auth, tests, and deployment are missing or incomplete."**

---

## Quick Start (Human)

```bash
git clone https://github.com/aghamsari5-hash/restaurant-os.git
cd restaurant-os
docker compose up --build
# Frontend: http://localhost:3000
# Backend:  http://localhost:3001
# Swagger:  http://localhost:3001/api/docs
# Health:   http://localhost:3001/health
```

---

## Quick Start (AI Agent)

**Read these files in order before writing any code:**

1. [`AGENTS.md`](./AGENTS.md) — AI Operating System entry point (start here)
2. [`CONSTITUTION.md`](./CONSTITUTION.md) — Permanent laws
3. [`docs/031-architecture-overview.md`](./docs%20%20/031-architecture-overview.md) — Architecture
4. Current phase spec — `specs/<phase>/spec.md`

Then follow the **Phase Workflow** (`.ai/workflows/phase-workflow.md`) gate by gate.

---

## Architecture

- **Clean Architecture** + **DDD** + **Modular Monolith** + **Event-Driven** + **API-First** + **Multi-Tenant**
- **Backend:** NestJS + TypeScript (strict) + Prisma + PostgreSQL + Redis + Swagger
- **Frontend:** Next.js 15 (App Router) + React + TypeScript + TailwindCSS + shadcn/ui + TanStack Query + Zustand
- **Infra:** Docker + Docker Compose (Kubernetes-ready)

See [`docs/031-architecture-overview.md`](./docs%20%20/031-architecture-overview.md) and [`CONSTITUTION.md`](./CONSTITUTION.md) for full details.

---

## Repository Structure

```
restaurant-os/
├── AGENTS.md                    # AI OS entry point (cross-tool: Claude, Copilot, Cursor, Gemini, etc.)
├── CLAUDE.md                    # Claude Code extensions
├── GEMINI.md                    # Gemini CLI extensions
├── CONSTITUTION.md              # Permanent laws (12 articles)
├── PROJECT_RULES.md             # Business rules
│
├── .ai/                         # AI Operating System
│   ├── constitution/            # Layer 1 — Laws (mirrors CONSTITUTION.md)
│   ├── skills/                  # Layer 2 — 16 Skills (ui-design, frontend, backend, database, api, auth, ...)
│   ├── design-system/           # Layer 3 — tokens.json + component rules
│   ├── templates/               # Layer 4 — Spec, API contract, DB schema, UI spec, ADR templates
│   ├── checklists/              # Layer 4 — Definition of Done, QA Checklist, Traceability Matrix
│   ├── workflows/               # Layer 5 — Phase Workflow (10 phases), Feature Workflow, Google AI Studio
│   ├── prompts/                 # Layer 5 — Prompt Architecture (8 layers) + reusable templates
│   ├── agents/                  # Agent role definitions (Product Analyst, Architect, QA, etc.)
│   └── scripts/                 # Validation scripts (tokens, traceability, security)
│
├── .specify/                    # Spec-Kit (Spec-Driven Development)
│   ├── memory/constitution.md   # Spec-Kit constitution (mirrors CONSTITUTION.md)
│   └── templates/               # Spec-Kit templates
│
├── .claude/
│   ├── skills/                  # Claude-native skill mirrors
│   └── agents/                  # Claude subagents (architect, qa-agent, code-reviewer, security)
│
├── specs/                       # Per-feature/phase specs
│   ├── _template/               # Template for new features
│   └── <feature>/               # spec.md, plan.md, api-contract.md, database-schema.md, ui-spec.md
│
├── docs/                        # Business + Technical docs (40 files, source of truth)
│   └── adr/                     # Architecture Decision Records
│
├── backend/                     # NestJS application
│   ├── src/modules/<domain>/    # Domain modules (controllers, services, domain, infrastructure, dto)
│   ├── prisma/                  # schema.prisma + migrations + seeds
│   └── test/                    # E2E tests
│
├── frontend/                    # Next.js 15 App Router
│   ├── src/app/                 # Routes
│   ├── src/components/          # ui/ (shadcn) + features/<domain>/
│   ├── src/features/            # Hooks, services, stores per domain
│   └── e2e/                     # Playwright E2E tests
│
├── docker/                      # Docker configs
├── scripts/                     # Utility scripts
└── prompts/                     # Sprint prompts (legacy, migrated to specs/)
```

---

## AI Development System — How It Works

### The Problem It Solves

When you build a project with AI, typically:
- ✅ UI looks complete
- ❌ Backend is missing validation, tenant isolation, error handling
- ❌ Database is missing constraints, indexes, migrations
- ❌ API has no contract, no versioning, inconsistent errors
- ❌ Tests don't exist
- ❌ No one checks if the feature is actually complete

### The Solution: Traceability Chain

Every feature must complete this chain — if ANY link is missing, the feature is **NOT Done**:

```
Requirement → Acceptance Criteria → UI → Component → API → Backend → Database → Tests → QA
```

Enforced by:

- **Traceability Matrix** (`.ai/checklists/traceability-matrix.md`) — one row per feature, all columns must be green
- **Definition of Done** (`.ai/checklists/definition-of-done.md`) — 18 gates, all must pass
- **QA Agent** (`.ai/agents/qa-agent.md`) — independent, adversarial verification
- **Validation Scripts** (`.ai/scripts/`) — automated checks for tokens, traceability, security

### 10-Phase Workflow

```
Discovery → Specification → UX/UI Design → Architecture → Database → Backend → Frontend → Integration → Testing → QA → Production
```

Each phase has **Entry Criteria → Tasks → Exit Criteria → Gate**. No phase starts until the previous gate passes.

See [`.ai/workflows/phase-workflow.md`](./.ai/workflows/phase-workflow.md).

### Google AI Studio Workflow

Design UI in Google AI Studio → Screenshot → Spec → Agent implements ONLY that phase → Agent validates → Next phase.

See [`.ai/workflows/google-ai-studio.md`](./.ai/workflows/google-ai-studio.md).

### Prompt Architecture

Never one mega-prompt. Compose in 8 layers:

```
MASTER_SYSTEM_PROMPT + PROJECT_CONTEXT + PHASE_SPEC + DESIGN_REFERENCE + TECHNICAL_REQUIREMENTS + ACCEPTANCE_CRITERIA + SKILLS + VALIDATION_RULES
```

See [`.ai/prompts/README.md`](./.ai/prompts/README.md).

---

## 16 Skills

| # | Skill | When |
|---|-------|------|
| 1 | UI Design | Before any frontend work |
| 2 | Frontend | Building React/Next.js |
| 3 | Backend | Building NestJS |
| 4 | Database | Any schema/migration/query |
| 5 | API | Any endpoint |
| 6 | Authentication | Auth, RBAC, permissions |
| 7 | Security | Every feature (reviewer) |
| 8 | Testing | Unit + Integration + API tests |
| 9 | E2E Testing | Critical user journeys |
| 10 | Responsive | Every UI component |
| 11 | Accessibility | Every UI component |
| 12 | SEO | Public pages |
| 13 | Performance | Every feature |
| 14 | Deployment | Docker, env, production |
| 15 | Code Review | Before every PR |
| 16 | Debugging | Bug fixes |

Each skill has: purpose, inputs, workflow, rules, output, and Definition of Done.

See [`.ai/skills/`](./.ai/skills/).

---

## Design System

Deterministic, token-driven design. Every color, spacing, font-size, radius, and shadow comes from [`tokens.json`](./.ai/design-system/tokens.json).

- No arbitrary Tailwind values (`w-[347px]` is forbidden)
- Every component has Loading / Empty / Error / Success states
- Responsive: mobile-first, tested at 375/768/1024/1280
- A11y: WCAG 2.1 AA

See [`.ai/design-system/README.md`](./.ai/design-system/README.md).

---

## Commands

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
cd frontend && npm run dev          # Dev server
cd frontend && npm run build        # Build
cd frontend && npm run lint         # Lint

# Infra
docker compose up --build           # Full stack

# Validation (run before marking any feature done)
node .ai/scripts/validate-tokens.mjs --path frontend/src
node .ai/scripts/check-traceability.mjs --feature <name>
node .ai/scripts/check-security.mjs --path backend/src
```

---

## Documentation

| Doc | Purpose |
|-----|---------|
| `AGENTS.md` | AI OS entry point |
| `CONSTITUTION.md` | Permanent laws |
| `PROJECT_RULES.md` | Business rules |
| `docs/` | 40 technical + business docs (source of truth) |
| `docs/adr/` | Architecture Decision Records |
| `.ai/` | AI Development System (skills, templates, workflows, prompts) |
| `.specify/` | Spec-Kit (spec-driven development) |

---

## Contributing

1. Read `AGENTS.md` and `CONSTITUTION.md`.
2. Pick a phase from the Phase Workflow.
3. Write `specs/<feature>/spec.md` and get it Approved.
4. Follow the Feature Workflow chain.
5. Pass Definition of Done and QA before marking complete.

---

## License

Private Project — All rights reserved.

---

*Built with the Reusable AI Development System v2.0 — 2026-09-07*
