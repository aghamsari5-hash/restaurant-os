# PROJECT_CONTEXT — RestaurantOS

> Layer 2 of the prompt architecture. Stable per project.
> This prompt defines WHAT the project is.

---

## Project: RestaurantOS

**Vision:** A cloud-native, enterprise-grade Restaurant Management Platform for single restaurants, chains, and SaaS — suitable for self-hosted and white-label deployments.

**Architecture:** Clean Architecture + DDD + Modular Monolith + Event-Driven + API-First + Multi-Tenant

**Tech Stack:**

| Layer | Stack |
|-------|-------|
| Backend | NestJS + TypeScript (strict) + Prisma + PostgreSQL + Redis + Swagger |
| Frontend | Next.js 15 (App Router) + React + TypeScript + TailwindCSS + shadcn/ui + TanStack Query + Zustand |
| Infra | Docker + Docker Compose (Kubernetes-ready) |

**Key Invariants:**

- Every business record belongs to exactly one `tenantId` — every query filters by it.
- Business logic lives ONLY in the Domain layer — never in controllers, DTOs, or UI.
- Modules are independent — they communicate via Application Services and Domain Events, never by direct DB access.
- API contracts are written BEFORE implementation (Contract-First).
- Database schemas are designed BEFORE backend code (Schema-First).
- No feature is complete until its traceability chain is fully green.

**File Structure:**

```
backend/src/modules/<domain>/  — controllers, services, domain, infrastructure, dto, events
frontend/src/app/              — Next.js App Router routes
frontend/src/components/       — ui/ (shadcn) + features/<domain>/
frontend/src/features/         — hooks, services, stores per domain
backend/prisma/                — schema.prisma + migrations
specs/<feature>/               — spec.md, plan.md, api-contract.md, database-schema.md, ui-spec.md
docs/                          — 40 files, source of truth for business + technical decisions
```

**Source of Truth Priority:**

1. `docs/` (business + technical)
2. `CONSTITUTION.md` (permanent laws)
3. `AGENTS.md` (AI OS entry point)
4. Current Phase Spec (`specs/<phase>/spec.md`)
5. Skill files (`.ai/skills/<skill>/SKILL.md`)
6. Existing source code

---

*Layer 2 — PROJECT_CONTEXT v2.0*
