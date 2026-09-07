# CLAUDE.md — Claude Code Extensions for RestaurantOS

> Extends `AGENTS.md` with Claude-specific instructions.
> Claude Code reads this file natively (with @import support). Keep shared rules in `AGENTS.md`; put only Claude-specific overrides here.

---

## 1. Imports

```
@AGENTS.md
@CONSTITUTION.md
```

Claude Code will auto-load `AGENTS.md` as fallback if `CLAUDE.md` is missing — but this repo has both. Treat `AGENTS.md` as the primary OS and this file as the Claude adapter.

---

## 2. Claude-Specific Configuration

### Permissions

- Allow: `Read`, `Glob`, `Grep`, `Bash(npm:*)`, `Bash(npx:*)`, `Bash(git:*)`, `Bash(docker:*)`
- Ask before: `Bash(rm:*)`, `Bash(DROP:*)`, `Bash(git push:*)`
- Deny: direct edits to `docs/` without explicit request (docs are stable)

### MCP Servers (if configured)

- `db-readonly` — for schema questions (never query prod directly)
- `github` — for PR/issue operations
- Reference MCP tools by name in AGENTS.md instructions

### Skills Loading

Claude Code loads skills from `.claude/skills/<skill>/SKILL.md` (mirrors `.ai/skills/`).
Each skill uses progressive disclosure — the SKILL.md frontmatter declares `when` and the body declares `how`.

```yaml
---
name: backend-skill
description: NestJS backend development
when: Building controllers, services, domain logic
---
```

### Subagents

Specialized subagents live in `.claude/agents/<agent>.md`:

| Agent | File | When to Use |
|-------|------|-------------|
| architect | `architect.md` | Phase 3 — system design |
| db-engineer | `db-engineer.md` | Phase 4 — schema & migrations |
| code-reviewer | `code-reviewer.md` | Before every PR |
| security-reviewer | `security-reviewer.md` | Phase 9 + every auth change |
| qa-agent | `qa-agent.md` | Phase 9 — holistic QA |

See `.ai/agents/README.md` for the full role matrix and when multi-agent is worth the complexity.

---

## 3. Plan Mode (Default)

- Start every non-trivial task in **plan mode** (read-only, no edits).
- Produce `plan.md` and get approval before writing code.
- The approved plan is committed as `specs/<feature>/plan.md` — later phases check against it.

---

## 4. Output Requirements

At the end of every sprint/phase, output:

- **Files Created** — list with one-line purpose each
- **Files Modified** — list with change summary
- **Breaking Changes** — or "None"
- **Remaining Risks** — known gaps, assumptions, follow-ups

Then **STOP**. Wait for the next sprint. Never continue into the next phase uninvited.

---

## 5. When Documentation Is Missing

Do not guess. STOP. Ask for clarification. This is a constitutional requirement (Article XII).

---

*Mirrors AGENTS.md v2.0. Last updated: 2026-09-07.*
