# Agent Roles — RestaurantOS

> Should you use one agent or many? This document answers that question with evidence and prescribes what to do.

---

## Research Summary

Based on analysis of:

- **GitHub Spec Kit** (github/spec-kit) — Spec-Driven Development with slash commands, not multi-agent by default
- **Claude Academy: AI-Native SDLC Playbook** — Skills + subagents + plan mode, with parallel sessions for independent tasks
- **sdlc-skills** (arozumenko/sdlc-skills) — Role-based agent personas (BA, Tech Lead, PM, Dev, QA) with skills
- **Agentic SDLC** (gauravnotes.com) — Engineers shift from writing code to directing/reviewing AI; subagents for verification/simplification
- **AGENTS.md ecosystem** (60k+ repos, 30+ tools) — Single AGENTS.md + optional subdirectory overrides; Skills (SKILL.md) for reusable capabilities

**Key finding:** Multi-agent is powerful but has coordination overhead. The right choice depends on task complexity and team size.

---

## Recommendation

### For Solo Developer + AI (this project's primary mode):

**Use ONE main agent + on-demand subagents for review/QA.**

```
┌─────────────────────────────────────────┐
│           MAIN AGENT (Developer)        │
│  Implements features end-to-end         │
│  Loads Skills on demand                 │
│  Follows Phase Workflow gates           │
└──────────────┬──────────────────────────┘
               │ spawns when needed
       ┌───────┼───────────┐
       ▼       ▼           ▼
   Code     Security    QA
  Reviewer  Reviewer   Agent
  (Phase 9) (Phase 9)  (Phase 9)
```

- **Main agent** does everything: spec → plan → database → backend → frontend → integration → testing.
- **Subagents** are spawned ONLY for review/QA — they provide independent verification that the main agent cannot provide for itself.
- This avoids the complexity of coordinating multiple builder agents while still getting independent review.

### For Team or Large Feature (optional, future):

If a feature is large enough to split into independent modules (e.g., Products + Inventory + Orders in parallel), use parallel subagents:

```
Main Agent (Orchestrator)
  ├── Subagent: Products module
  ├── Subagent: Inventory module
  └── Subagent: Orders module
         │
         ▼
  Integration Agent (Phase 7)
         │
         ▼
  QA Agent (Phase 9)
```

---

## Role Definitions

| # | Role | Persona | Responsibility | When Needed | Complexity Worth It? |
|---|------|---------|---------------|-------------|---------------------|
| 1 | **Product Analyst** | Alex | Turns ideas into specs with AC, clarifies ambiguities | Phase 0-1, every feature | ✅ Yes — spec quality determines everything |
| 2 | **UI/UX Agent** | Aria | Analyzes design refs, produces ui-spec.md, ensures token compliance | Phase 2, every UI feature | ✅ Yes — prevents UI inconsistency |
| 3 | **Architect** | Rio | Designs system, writes plan.md, ADRs, API contracts | Phase 3, every feature | ✅ Yes — but can be the main agent in architect mode |
| 4 | **Database Engineer** | Dana | Designs schemas, migrations, indexes, seeds | Phase 4 | ⚠️ Conditional — main agent can do this with Database Skill for simple schemas |
| 5 | **Backend Engineer** | Blake | Implements domain, services, controllers, events | Phase 5 | ⚠️ Conditional — main agent with Backend Skill |
| 6 | **Frontend Engineer** | Finn | Implements components, pages, hooks, wiring | Phase 6 | ⚠️ Conditional — main agent with Frontend Skill |
| 7 | **Test Engineer** | Sage | Writes unit, integration, E2E tests | Phase 8 | ⚠️ Conditional — main agent with Testing Skill |
| 8 | **Security Reviewer** | Shield | Reviews every feature for security invariants | Every feature (reviewer) + Phase 9 | ✅ Yes — always as reviewer, never skipped |
| 9 | **Code Reviewer** | Clara | Reviews PRs for architecture, correctness, completeness | Every PR + Phase 9 | ✅ Yes — independent review is essential |
| 10 | **QA Agent** | Quinn | Holistic QA — functional, UI, API, integration, build | Phase 9 | ✅ Yes — the final gate before Production |
| 11 | **Deployment Agent** | Deployer | Verifies Docker, env, build, production readiness | Phase 10 | ⚠️ Conditional — main agent with Deployment Skill for simple deploys |

### Verdict

| Category | Roles | Recommendation |
|----------|-------|----------------|
| **Always as separate agent/subagent** | Product Analyst, UI/UX, Security Reviewer, Code Reviewer, QA Agent | These provide independent perspective that the builder cannot provide for itself |
| **Main agent with Skill** | Database, Backend, Frontend, Test, Deployment, Architect | Main agent loads the relevant Skill and executes — no need for separate agents unless parallelizing large features |
| **Unnecessary complexity** | Separate agents for every layer on small features | Don't create 6 agents for a simple CRUD — one agent + review subagents is faster and less error-prone |

---

## Agent Files

| Agent | File | Description |
|-------|------|-------------|
| Product Analyst | `.ai/agents/product-analyst.md` | Spec writing + clarification |
| UI/UX Agent | `.ai/agents/ui-ux-agent.md` | Design analysis + ui-spec |
| Architect | `.ai/agents/architect.md` | System design + planning |
| QA Agent | `.ai/agents/qa-agent.md` | Holistic QA |
| Code Reviewer | `.ai/agents/code-reviewer.md` | PR review |
| Security Reviewer | `.ai/agents/security-reviewer.md` | Security review |

Claude Code subagents mirror these in `.claude/agents/`:

| Subagent | File |
|----------|------|
| architect | `.claude/agents/architect.md` |
| qa-agent | `.claude/agents/qa-agent.md` |
| code-reviewer | `.claude/agents/code-reviewer.md` |
| security-reviewer | `.claude/agents/security-reviewer.md` |

---

## How to Use

### As Human (directing the main agent):

```
"Act as the Product Analyst and write specs/products/spec.md"
"Now act as the Backend Engineer and implement Phase 5 per the spec"
"Now spawn the QA Agent to verify the feature"
```

### As Agent (self-directing):

The main agent switches roles by loading the relevant Skill + Agent file:

1. For spec work: load `.ai/agents/product-analyst.md` + follow its workflow.
2. For implementation: load `.ai/skills/<skill>/SKILL.md` and execute.
3. For review: spawn a subagent with `.ai/agents/qa-agent.md` or `.ai/agents/code-reviewer.md` — the subagent reads the code fresh, without the builder's assumptions.

---

## Decision Matrix: When to Spawn a Subagent

| Condition | Spawn Subagent? | Why |
|-----------|----------------|-----|
| Simple CRUD, single module | No — main agent does all | Overhead not justified |
| Feature with UI + API + DB | No for building, Yes for review | Builder is one agent, reviewers are subagents |
| Large feature, 3+ independent modules | Yes — parallel builders | Speed via parallelism |
| Security-sensitive (auth, payments) | Yes — Security Reviewer | Independent security perspective |
| Before every merge | Yes — Code Reviewer | Independent correctness check |
| Phase 9 (QA) | Yes — QA Agent | Adversarial, independent QA |

---

*Version 2.0. Updated: 2026-09-07.*
