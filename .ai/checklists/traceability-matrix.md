# Traceability Matrix — RestaurantOS

> **The single view that proves no feature is "UI-only complete."**
> Every feature has one row. Every column must be green before the feature is Done.
> This file is the project-level matrix. Per-feature detail lives in `specs/<feature>/traceability.md`.

---

## How It Works

```
Requirement → Acceptance Criteria → UI → Component → API → Backend → Database → Tests → QA
     │               │               │       │        │       │         │         │      │
     └───────────────┴───────────────┴───────┴────────┴───────┴─────────┴─────────┴──────┘
                              ALL must be green for the feature to be Done
```

If ANY cell is ⬜ or 🔴, the feature is **NOT Done** — regardless of how complete the UI looks.

---

## Legend

| Symbol | Meaning | Action |
|--------|---------|--------|
| ⬜ | Not Started | Work not begun |
| 🟡 | In Progress | Work started, not yet verified |
| 🟢 | Done | Implemented + verified + reviewed |
| 🔴 | Blocked | Issue prevents completion — see Notes |
| ⬛ | N/A | Not applicable for this feature (with justification) |

---

## Project Matrix

| # | Feature | Req | AC | UI Spec | UI Impl | API Contract | API Impl | Backend | DB | Unit Tests | Integration Tests | E2E | Security Review | QA | DoD |
|---|---------|-----|----|---------|---------|-------------|----------|---------|----|------------|-------------------|-----|-----------------|----|-----|
| 1 | Auth — Login | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 2 | Auth — Register | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 3 | Products — CRUD | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 4 | Categories — CRUD | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 5 | Orders — Create | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 6 | Orders — List/Detail | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 7 | Tables — Management | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 8 | Customers — CRUD | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 9 | Inventory — Stock | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 10 | KDS — Kitchen Display | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 11 | Reports — Sales | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 12 | Settings — Tenant | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

> Add rows as features are specced. Never mark a feature Done until its entire row is 🟢/⬛.

---

## Per-Feature Detail Template

For each feature, create `specs/<feature>/traceability.md`:

```markdown
# Traceability — {{FEATURE_NAME}}

| Requirement | AC | UI Spec | UI Impl | API Contract | API Impl | Backend | DB | Tests | QA | Notes |
|-------------|----|---------|---------|-------------|----------|---------|----|-------|----|-------|
| FR-01: Create product | AC-01.1, AC-01.2 | ui-spec.md §4.1 | product-card.tsx | api-contract.md §2.1 | products.controller.ts | create-product.usecase.ts | schema.prisma: Product | products.spec.ts | qa-report.md | |
| FR-02: Price > 0 | AC-02.1 | — | product-form.tsx (Zod) | api-contract.md §2.1 validation | product.entity.ts invariant | products table CHECK | products.spec.ts (validation) | | |
| FR-03: Tenant isolation | AC-03.1 | — | — | api-contract.md §2.1 auth | TenantGuard + repo filter | products.tenantId + index | products.e2e-spec.ts (tenant) | security-review.md | P0 |

Legend: 🟢 Done | 🟡 In Progress | ⬜ Not Started | 🔴 Blocked
```

---

## Column Definitions

| Column | Artifact | Verified By |
|--------|----------|-------------|
| Req | `specs/<feature>/spec.md` § Requirements | Product Analyst |
| AC | `specs/<feature>/spec.md` § Acceptance Criteria | Product Analyst + Test Engineer |
| UI Spec | `specs/<feature>/ui-spec.md` | UI Design Skill |
| UI Impl | `frontend/src/...` | Frontend Skill + DoD §7 |
| API Contract | `specs/<feature>/api-contract.md` | API Skill |
| API Impl | `backend/src/modules/.../controllers/` | Backend Skill + DoD §5-6 |
| Backend | `backend/src/modules/.../services/` + `domain/` | Backend Skill |
| DB | `backend/prisma/schema.prisma` + migration | Database Skill |
| Unit Tests | `*.spec.ts` | Testing Skill |
| Integration Tests | `*.e2e-spec.ts` | Testing Skill |
| E2E | `frontend/e2e/specs/*.spec.ts` | E2E Skill |
| Security Review | `specs/<feature>/security-review.md` | Security Skill |
| QA | `specs/<feature>/qa-report.md` | QA Agent |
| DoD | `specs/<feature>/dod-checklist.md` | All — final gate |

---

## Enforcement

- **QA Agent (Phase 9)** checks this matrix before sign-off. Any non-green row blocks the phase.
- **Code Review Agent** checks that the PR's features have their rows updated.
- **CI** can optionally enforce: `node .ai/scripts/check-traceability.mjs --feature <name>` — fails if row not green.

---

## Anti-Pattern: "UI Complete" Fallacy

```
❌ WRONG: "Products page looks great, marking feature as done!"
   → UI Impl is 🟢 but API Impl is ⬜, DB is ⬜, Tests is ⬜ → Feature is NOT Done.

✅ CORRECT: Feature is Done only when the ENTIRE row is 🟢/⬛.
```

This matrix exists specifically to prevent the "UI Complete = Feature Complete" illusion that plagues AI-generated projects.

---

*Version 2.0. Updated: 2026-09-07.*
