# ADR-002 — Adopt the Reusable AI Development System (AI OS)

| Field | Value |
|-------|-------|
| Status | Accepted |
| Date | 2026-09-07 |
| Deciders | Project Owner, AI OS Architect |
| Tags | architecture, ai, process, workflow |

---

## Context

AI-assisted development suffers from incomplete features: UI looks done but backend, database, API, auth, validation, tests, and deployment are missing or broken. This is the primary problem this repository must solve.

Industry research (2024-2026) shows several patterns that address this:

- **Spec-Driven Development** (GitHub Spec Kit) — specs before code, with clarify/plan/tasks/implement workflow
- **AGENTS.md** — cross-tool standard (60k+ repos, 30+ tools) for AI agent instructions
- **Skills (SKILL.md)** — reusable, progressive-disclosure capabilities for AI agents
- **Contract-First / Schema-First** — API and DB contracts before implementation
- **Traceability Matrix** — mechanical proof that no feature is "UI-only complete"

No single existing solution covers all aspects (spec → design → architecture → database → backend → frontend → integration → testing → QA → production) with enforcement.

---

## Decision

We will adopt a **Reusable AI Development System (AI OS)** with 5 layers:

1. **Constitution** — Permanent laws (CONSTITUTION.md, 12 articles)
2. **Skills** — 16 domain skills (ui-design, frontend, backend, database, api, auth, security, testing, e2e, responsive, a11y, seo, performance, deployment, code-review, debugging)
3. **Design System** — Deterministic tokens (tokens.json) + component rules
4. **Templates & Checklists** — Spec, contract, schema, UI spec, ADR templates + DoD, QA, traceability checklists
5. **Workflows** — 10-phase workflow, feature workflow, Google AI Studio workflow + 8-layer prompt architecture

The system is documented in `AGENTS.md` (entry point), `CONSTITUTION.md` (laws), and `.ai/` (all layers).

---

## Alternatives Considered

| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|-------------|
| Use only GitHub Spec Kit | Proven, minimal | Only covers spec→plan→tasks→implement; no design system, no traceability, no DoD enforcement | Too narrow |
| Use only AGENTS.md + CLAUDE.md | Simple, cross-tool | Only covers agent instructions; no skills, no workflows, no traceability | Too shallow |
| Build custom from scratch without research | Fully tailored | Reinvents the wheel, no proven patterns | Risky |
| No system, just prompts | Fast to start | Features incomplete, no enforcement, not reusable | Solves nothing |

---

## Consequences

### Positive

- Every feature's completeness is mechanically verifiable (traceability matrix + DoD).
- The system is reusable across projects — new projects copy `.ai/` and adapt.
- AI agents know exactly what to build, how to build it, and when it's done.
- Google AI Studio integration enables phase-by-phase UI-driven development.

### Negative

- Initial setup is large (~50 files) — but it is a one-time cost.
- Agents must read multiple files — mitigated by layered prompt architecture (load only needed skills).

### Neutral

- The system requires discipline: phases must be followed, gates must pass. This is intentional.

---

## Compliance

- Entry point: `AGENTS.md`
- Constitution: `CONSTITUTION.md` + `.specify/memory/constitution.md`
- Skills: `.ai/skills/<skill>/SKILL.md`
- Workflows: `.ai/workflows/`
- Validation: `.ai/scripts/` + `.ai/checklists/`
