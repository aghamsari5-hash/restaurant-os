# Prompt Template — Design UI

> For Phase 2 (UX/UI Design) — produces ui-spec.md from spec + design reference.

---

Read `AGENTS.md`, `CONSTITUTION.md`, and `.ai/design-system/tokens.json`.

## Context

- **Phase:** {{PHASE_ID}} — {{PHASE_NAME}} (UI Design)
- **Spec:** `specs/{{PHASE_ID}}/spec.md` §7 (UI Requirements)
- **Design Reference:** `specs/{{PHASE_ID}}/design-reference/*.png` ({{N}} screenshots)
  - Or: "No design reference — spec-driven wireframe"

## Skills to Activate

- `ui-design` — `.ai/skills/ui-design/SKILL.md`
- `responsive` — `.ai/skills/responsive/SKILL.md`
- `a11y` — `.ai/skills/a11y/SKILL.md`

## Task

Per `.ai/skills/ui-design/SKILL.md`:

1. If design reference exists: analyze each screenshot → produce `.ai/design-system/analysis/{{PHASE_ID}}-analysis.md` (layout, components, colors, typography, spacing, missing states, a11y)
2. Produce `specs/{{PHASE_ID}}/ui-spec.md` using `.ai/templates/ui-spec-template.md`:
   - Routes & pages
   - Layout (with ASCII diagram)
   - Component inventory (props, variants, states, tokens, responsive, a11y)
   - All four states per data component (loading/empty/error/success)
   - Token mapping (every value → tokens.json)
   - Responsive spec per breakpoint
   - A11y notes

## Constraints

- No code — only specs (ui-spec.md + analysis)
- Every design value must map to `tokens.json` — no arbitrary values
- Reuse existing components: check `frontend/src/components/ui/` and `frontend/src/components/features/` first

## Validation

- [ ] All routes specified
- [ ] All components have typed props + variants + states
- [ ] All four states for data components
- [ ] All tokens mapped
- [ ] Responsive + A11y notes present
