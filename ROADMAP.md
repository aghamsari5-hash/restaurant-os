# Roadmap — RestaurantOS

> High-level project roadmap. Detailed phase specs live in `specs/<phase>/spec.md`.

---

## Phases

| Phase | Name | Status | Spec |
|-------|------|--------|------|
| 0 | Discovery | Done | `docs/001-project.md` |
| 1 | Bootstrap | Done | `prompts/001-sprint-bootstrap.md` |
| 2 | Identity Foundation | In Progress | `prompts/Sprint 002 — Identity Foundation` |
| 3 | Authentication | Planned | — |
| 4 | Products & Categories | Planned | `specs/products/spec.md` (example) |
| 5 | Orders & POS | Planned | `docs/016-orders.md`, `docs/017-pos.md` |
| 6 | Tables & Waiters | Planned | `docs/022-tables.md`, `docs/023-waiters.md` |
| 7 | Kitchen (KDS) | Planned | `docs/018-kds.md` |
| 8 | Inventory & Recipes | Planned | `docs/024-inventory.md`, `docs/025-recipes.md` |
| 9 | Customers & Loyalty | Planned | `docs/021-customers.md` |
| 10 | Reports & Dashboard | Planned | `docs/028-reports.md`, `docs/020-dashboard.md` |
| 11 | Notifications | Planned | `docs/029-notifications.md` |
| 12 | Settings & Multi-Tenant | Planned | `docs/030-settings.md` |

---

## AI Development System

| Milestone | Status |
|-----------|--------|
| AI OS v2.0 — Constitution + 16 Skills + Design System + Templates + Workflows | ✅ Done (2026-09-07) |
| Spec-Kit integration (`.specify/`) | ✅ Done |
| CI pipeline (`.github/workflows/ci.yml`) | ✅ Done |
| Example spec (`specs/products/`) | ✅ Done |
| Validation scripts (`.ai/scripts/`) | ✅ Done |

---

## How to Use This Roadmap

1. Pick the next phase with status `Planned`.
2. Create `specs/<phase>/spec.md` from `.ai/templates/feature-spec-template.md`.
3. Follow `.ai/workflows/phase-workflow.md` gate by gate.
4. Update this file when a phase moves to Done.
