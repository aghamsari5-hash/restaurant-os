# Constitution — RestaurantOS (Spec-Kit Memory)

> This file mirrors `CONSTITUTION.md` at the repository root.
> Spec-Kit reads this file as `.specify/memory/constitution.md`.
> Keep both files in sync — changes to one must be reflected in the other.
> See `CONSTITUTION.md` for the full text.

---

## Principles (Summary)

1. **Clean Architecture + DDD + Modular Monolith + Event-Driven** — Four layers, strict dependency direction.
2. **Multi-Tenancy** — Every query filters by `tenantId`. No exceptions.
3. **API-First & Contract-First** — OpenAPI contracts before implementation.
4. **Schema-First** — Database schemas before backend code.
5. **TypeScript Strict** — No `any`, no placeholders, no TODOs.
6. **No Feature is Done Until Its Traceability Chain is Green** — Requirement → AC → UI → Component → API → Backend → Database → Tests → QA
7. **Security by Design** — Every protected endpoint: Auth + Tenant + Permissions.
8. **Testing Pyramid** — Unit (many) → Integration → E2E (critical journeys).
9. **Definition of Done** — 18 gates, all must pass (see CONSTITUTION.md Article XI).
10. **Amendments via ADR** — No silent constitution changes.

---

## Spec-Kit Commands

| Command | Purpose |
|---------|---------|
| `/speckit.constitution` | Create/update this file |
| `/speckit.specify` | Write `specs/<feature>/spec.md` |
| `/speckit.clarify` | Resolve ambiguities (mandatory before plan) |
| `/speckit.plan` | Write `specs/<feature>/plan.md` |
| `/speckit.tasks` | Break plan into `specs/<feature>/tasks.md` |
| `/speckit.analyze` | Cross-artifact consistency check |
| `/speckit.implement` | Execute tasks one by one |

---

## Full Text

See `CONSTITUTION.md` at the repository root for the complete constitution (Articles I-XII).

---

*Synced with CONSTITUTION.md v2.0 — 2026-09-07*
