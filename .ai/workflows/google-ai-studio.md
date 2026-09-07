# Google AI Studio Workflow — RestaurantOS

> Workflow for building features phase-by-phase using Google AI Studio for UI design and an AI coding agent for implementation.

---

## Philosophy

- **One phase at a time.** AI implements ONLY the specified phase — never jumps ahead.
- **Design before code.** UI is designed in Google AI Studio, then given to the agent as a reference.
- **Spec before code.** Every phase has a spec that the agent must follow.
- **Validate before next phase.** Agent validates its own work before the next phase starts.

---

## The 7-Step Workflow

```
Step 1 → Step 2 → Step 3 → Step 4 → Step 5 → Step 6 → Step 7
Define   Design   Capture  Specify  Implement Validate Next
Phase    UI       Reference  Phase    Phase    Phase    Phase
```

### Step 1 — Define Phase

**Who:** Human (Product Owner)

**Action:**

1. Pick the next phase from the Phase Workflow (`.ai/workflows/phase-workflow.md`).
2. Define the phase scope: which features, which routes, which data.
3. Create `specs/<phase>/spec.md` from `.ai/templates/feature-spec-template.md` or `.ai/templates/phase-template.md`.

**Output:** `specs/<phase>/spec.md` (Draft)

**Prompt Template:**

```
You are the Product Analyst for RestaurantOS.

Phase: {{PHASE_ID}} — {{PHASE_NAME}}

Context:
- Project: RestaurantOS (see AGENTS.md and CONSTITUTION.md)
- Previous phase: {{PREV_PHASE}} (status: Done)
- This phase goal: {{ONE_PARAGRAPH_GOAL}}

Task: Write specs/<phase>/spec.md for this phase.

Requirements:
- Use .ai/templates/feature-spec-template.md as structure
- Every FR must have testable AC (Given/When/Then)
- Define UI requirements, API requirements, and data model summaries
- Mark out-of-scope explicitly

Do not start implementation. Only write the spec.
```

---

### Step 2 — Design UI in Google AI Studio

**Who:** Human (Designer or Product Owner with AI Studio)

**Action:**

1. Open [Google AI Studio](https://aistudio.google.com) (or your preferred AI design tool).
2. Prompt AI Studio to generate the UI for the phase's features.

**AI Studio Prompt Template:**

```
Design a UI for RestaurantOS — {{FEATURE_NAME}}.

Context:
- Product: Restaurant Management Platform (clean, fast, minimal — like Snapp)
- Design System: Inter/Vazirmatn font, orange primary (#F97316), neutral grays, 4px spacing scale, rounded-lg cards, shadow-sm
- Page: {{ROUTE}} (e.g., /products)
- Features: {{BULLET_LIST_OF_FEATURES}}
- Requirements:
  - Responsive: mobile (single column) → tablet (2-col) → desktop (3-col + sidebar)
  - States: Show loading skeleton, empty state, and error state variations
  - Components: Use card-based layout, consistent spacing (p-6, gap-4), Tailwind-like styling
  - Tokens: Primary orange for CTAs, neutral for text/borders, danger red for destructive actions

Generate a high-fidelity mockup for:
1. {{SCREEN_1}} (e.g., Product List — grid with search and filters)
2. {{SCREEN_2}} (e.g., Product Form — create/edit with validation)
3. {{SCREEN_3}} (e Arten, e.g., Product Detail)

Style: Modern, clean, professional. RestaurantOS branding.
```

3. Iterate in AI Studio until the design looks correct.
4. Export or screenshot the result.

---

### Step 3 — Capture Design Reference

**Who:** Human

**Action:**

1. Take screenshots of the AI Studio output (one per screen/route).
2. Or export the AI Studio project (if export is available).
3. Save to `specs/<phase>/design-reference/`:

```
specs/<phase>/
  ├── spec.md
  ├── design-reference/
  │   ├── product-list.png      # Screenshot of product list
  │   ├── product-form.png      # Screenshot of product form
  │   └── product-detail.png    # Screenshot of product detail
  └── ui-spec.md                # (created by agent in Step 5)
```

4. Optionally, also save the AI Studio prompt and share link for reproducibility.

---

### Step 4 — Specify Phase (Finalize Spec)

**Who:** Human + AI Agent (collaborative)

**Action:**

1. Ensure `specs/<phase>/spec.md` is complete and Approved.
2. If needed, ask the agent to clarify or expand the spec:

**Prompt Template:**

```
You are the Product Analyst for RestaurantOS.

Review specs/<phase>/spec.md for Phase {{PHASE_ID}} — {{PHASE_NAME}}.

Task:
1. Check every FR has testable AC
2. Run /speckit.clarify mentally — list any ambiguities or missing edge cases
3. Propose fixes for any gaps
4. Do not start implementation

Spec to review: (paste spec.md or reference file path)
Design reference: specs/<phase>/design-reference/ ({{N}} screenshots)
```

3. Approve the spec (status: Approved).

---

### Step 5 — Implement Phase (AI Agent)

**Who:** AI Coding Agent

**Action:** Implement ONLY the specified phase, following the full Phase Workflow gates.

**Prompt Template (Master Prompt for Implementation):**

```
You are the RestaurantOS AI Developer.

## PROJECT CONTEXT
Read: AGENTS.md, CONSTITUTION.md, docs/031-architecture-overview.md

## PHASE SPEC
Phase: {{PHASE_ID}} — {{PHASE_NAME}}
Spec: specs/<phase>/spec.md
Plan: specs/<phase>/plan.md (if exists, otherwise create per Phase 3)

## DESIGN REFERENCE
Screenshots: specs/<phase>/design-reference/*.png
- Analyze each screenshot per .ai/skills/ui-design/SKILL.md
- Produce .ai/design-system/analysis/<phase>-analysis.md
- Then produce specs/<phase>/ui-spec.md

## TECHNICAL REQUIREMENTS
- Architecture: Clean Architecture + DDD + Modular Monolith (see CONSTITUTION.md Article I)
- Design System: .ai/design-system/tokens.json — no arbitrary values
- File Structure: See AGENTS.md §4

## ACCEPTANCE CRITERIA
(from specs/<phase>/spec.md §6)
{{COPY_AC_TABLE}}

## SKILLS TO ACTIVATE
{{LIST_SKILLS_FOR_THIS_PHASE}}
(e.g., Phase 2: ui-design, responsive, a11y)
(e.g., Phase 4: database)
(e.g., Phase 5: backend, api, auth, security)
(e.g., Phase 6: frontend, responsive, a11y)

## VALIDATION RULES
See .ai/checklists/definition-of-done.md — the relevant sections for this phase.
For this phase, the following DoD sections apply: {{LIST_SECTIONS}}

## CONSTRAINTS
- Implement ONLY Phase {{PHASE_ID}} — do not start Phase {{NEXT_PHASE}}
- Follow the Phase Workflow gates: Entry Criteria → Tasks → Exit Criteria → Gate
- Contract-First: api-contract.md before backend code
- Schema-First: database-schema.md before backend code
- No TODO, no placeholders, no mock business logic
- Every query must filter by tenantId

## TASK
Execute Phase {{PHASE_ID}} step by step per .ai/workflows/phase-workflow.md.

Start with: {{FIRST_TASK_FOR_THIS_PHASE}}
```

**Phase-to-Skills Mapping:**

| Phase | Skills to Activate |
|-------|-------------------|
| Phase 2 (Design) | `ui-design`, `responsive`, `a11y` |
| Phase 3 (Architecture) | `api` (contract) |
| Phase 4 (Database) | `database` |
| Phase 5 (Backend) | `backend`, `api`, `auth`, `security` |
| Phase 6 (Frontend) | `frontend`, `responsive`, `a11y`, `seo`, `performance` |
| Phase 7 (Integration) | `frontend`, `backend`, `api` |
| Phase 8 (Testing) | `testing`, `e2e` |
| Phase 9 (QA) | `code-review`, `security` |
| Phase 10 (Production) | `deployment`, `security`, `performance` |

---

### Step 6 — Validate Phase

**Who:** AI Agent (self-validation) + Human (review)

**Action:**

1. Agent runs the phase's Exit Criteria checklist (from `.ai/workflows/phase-workflow.md`).
2. Agent runs validation commands:

```bash
# For every phase that touches code:
cd backend && npm run build && npm run lint && npx prisma validate
cd frontend && npm run build && npm run lint

# For phases with tests:
cd backend && npm run test
cd frontend && npm run test  # if applicable

# For UI phases — visual check:
# Compare implementation screenshots vs design-reference screenshots

# Traceability:
node .ai/scripts/check-traceability.mjs --phase {{PHASE_ID}}
```

3. Agent produces validation report:

```markdown
# Phase {{PHASE_ID}} Validation Report

## Exit Criteria
- [x] Criterion 1 — Evidence: file:line
- [x] Criterion 2 — Evidence: ...
- [ ] Criterion 3 — FAIL: reason

## Build & Tests
- backend build: PASS/FAIL
- frontend build: PASS/FAIL
- tests: PASS/FAIL (coverage: X%)

## Traceability
- Row for {{FEATURE}}: 🟢/🟡/🔴

## Verdict
- PASS — Ready for next phase
- FAIL — Issues to fix: (list)
```

4. Human reviews the report + does a quick manual check of the UI vs design reference.
5. If PASS → proceed to Step 7. If FAIL → agent fixes, re-validates.

---

### Step 7 — Next Phase

**Who:** Human

**Action:**

1. Mark current phase as Done in `specs/<phase>/spec.md` (status: Done) and Traceability Matrix.
2. Return to Step 1 for the next phase.

**Rule:** Never start the next phase until the current phase's validation is PASS.

---

## Prompt Templates — Quick Copy

### Template A: Full Phase Implementation (most common)

Copy-paste this, fill the `{{VARIABLES}}`, and send to the agent:

```
Read AGENTS.md and CONSTITUTION.md.

Phase: {{PHASE_ID}} — {{PHASE_NAME}}
Spec: specs/{{PHASE_ID}}/spec.md
Design Reference: specs/{{PHASE_ID}}/design-reference/*.png ({{N}} screenshots)

Activate skills: {{SKILLS}}

Implement this phase per .ai/workflows/phase-workflow.md.
Follow the Entry → Tasks → Exit → Gate for Phase {{PHASE_ID}}.
Validate per .ai/checklists/definition-of-done.md (sections {{SECTIONS}}).

Constraints:
- Only Phase {{PHASE_ID}}, not next phases
- Contract-First / Schema-First where applicable
- No TODOs, tenant isolation on every query, no hardcoded secrets
```

### Template B: UI-Only Phase (Phase 2)

```
Read AGENTS.md, CONSTITUTION.md, .ai/design-system/tokens.json.

Phase: {{PHASE_ID}} — {{PHASE_NAME}} (UI Design)
Spec: specs/{{PHASE_ID}}/spec.md
Design Reference: specs/{{PHASE_ID}}/design-reference/*.png

Activate skills: ui-design, responsive, a11y

Task: Analyze design references → produce analysis + ui-spec.md per .ai/skills/ui-design/SKILL.md.
No code yet — only specs.
```

### Template C: Validation Only

```
Validate Phase {{PHASE_ID}} — {{PHASE_NAME}}.

Check:
1. Exit Criteria from .ai/workflows/phase-workflow.md Phase {{PHASE_ID}}
2. DoD sections {{SECTIONS}} from .ai/checklists/definition-of-done.md
3. Traceability Matrix row for {{FEATURE}}

Run: npm run build, npm run lint, npx prisma validate, npm run test
Produce a validation report with PASS/FAIL per criterion.
```

---

## Tips for Google AI Studio

1. **Be specific in AI Studio prompts** — mention the design system tokens (colors, spacing, typography) to get consistent output.
2. **Generate all states** — ask AI Studio for loading, empty, and error variations, not just the happy path.
3. **One phase, one AI Studio project** — keep designs organized per phase.
4. **Screenshot at multiple widths** — capture mobile (375px) and desktop (1280px) if AI Studio supports responsive preview.
5. **Save the AI Studio prompt** — put it in `specs/<phase>/design-reference/README.md` for reproducibility.

---

*Version 2.0. Updated: 2026-09-07.*
