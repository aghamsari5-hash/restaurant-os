# ADR-001 — Record Architecture Decisions

| Field | Value |
|-------|-------|
| Status | Accepted |
| Date | 2026-09-07 |
| Deciders | Project Owner, AI OS Architect |
| Tags | architecture, process |

---

## Context

RestaurantOS needs a way to document significant architectural decisions so that future developers (human and AI) understand why choices were made, what alternatives were considered, and what consequences follow.

Without ADRs, decisions live in chat history or commit messages and are lost.

---

## Decision

We will record Architecture Decision Records (ADRs) in `docs/adr/<id>-<title>.md` using the template at `.ai/templates/adr-template.md`.

- One ADR per significant decision (tech stack, patterns, conventions, infra).
- ADRs are immutable once Accepted — superseded decisions get a new ADR that references the old one.
- Every agent must check relevant ADRs before making architectural changes.

---

## Alternatives Considered

| Alternative | Why Rejected |
|-------------|-------------|
| No ADRs, only code comments | Not discoverable, not searchable, lost in refactors |
| ADRs in Notion/Confluence | Not versioned with code, not accessible to AI agents |
| ADRs in GitHub Discussions | Not colocated with code, harder for agents to read |

---

## Consequences

### Positive

- Decisions are versioned, searchable, and agent-readable.
- New contributors (human/AI) can onboard by reading ADRs.

### Negative

- Small overhead per decision (one markdown file).

---

## Compliance

- Template: `.ai/templates/adr-template.md`
- Location: `docs/adr/`
- Numbering: sequential, zero-padded (001, 002, ...)
