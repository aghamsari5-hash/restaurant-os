# Skill — UI Design

---
name: ui-design
description: Transform requirements and design references into deterministic, token-driven UI specifications before any code is written
when: Before any frontend work; when a screenshot, Figma link, or Google AI Studio export is provided; during Phase 2 (UX/UI Design)
version: 2.0
---

## Purpose

Ensure every pixel is specified before a single component is coded. This skill prevents the classic AI failure: "UI looks done but is inconsistent, non-responsive, and missing states."

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| `spec.md` § UI Requirements | Yes | User stories + acceptance criteria for the UI |
| `DESIGN_REFERENCE` | If exists | Screenshot, Figma URL, or Google AI Studio export |
| `tokens.json` | Yes | Design tokens (`.ai/design-system/tokens.json`) |
| `target routes` | Yes | Which routes/pages this UI covers |

## Workflow

### Step 1 — Analyze Design Reference (if provided)

Produce `.ai/design-system/analysis/<feature>-analysis.md`:

- Layout structure (header, sidebar, grid, sections)
- Component inventory (buttons, cards, forms, tables, etc.)
- Color usage (map to tokens, flag non-token colors)
- Typography usage (map to type scale)
- Spacing and sizing (map to spacing scale)
- Responsive behavior (breakpoint changes)
- Missing states (loading, empty, error — are they in the reference?)

If no design reference: produce a wireframe description from `spec.md` alone.

### Step 2 — Token Compliance Check

- Every color, spacing, font-size, radius, and shadow MUST map to a token in `tokens.json`.
- If the design uses a non-token value, either: (a) map to the closest token, or (b) propose a token addition via ADR — never use arbitrary values.

### Step 3 — Component Specification

For each component identified, specify:

- Component name (PascalCase, e.g., `OrderCard`)
- Props interface (typed)
- Variants (e.g., `variant: 'default' | 'outline' | 'ghost'`)
- States: `default`, `hover`, `active`, `disabled`, `loading`, `error`, `empty`
- Responsive rules (see Responsive Skill)
- Accessibility notes (see A11y Skill)

Output: `specs/<feature>/ui-spec.md` using `.ai/templates/ui-spec-template.md`.

### Step 4 — Validation

- [ ] Every screen has Loading, Empty, Error, and Success states designed
- [ ] Every color/spacing/typography value maps to a token
- [ ] Responsive behavior specified for `sm`, `md`, `lg`, `xl`
- [ ] A11y notes present (contrast, keyboard, ARIA)
- [ ] Component inventory has no duplicates (reuse existing components first)

## Rules

1. **Never code before spec.** UI code without `ui-spec.md` is not allowed.
2. **Tokens are law.** No arbitrary Tailwind values (`w-[347px]`, `text-[#ff00ff]`). Use only token-derived classes.
3. **Reuse first.** Check `frontend/src/components/ui/` and `frontend/src/components/features/` before proposing a new component.
4. **States are not optional.** A component without loading/empty/error states is incomplete.
5. **Deterministic output.** Two agents given the same inputs must produce the same spec.

## Output

- `specs/<feature>/ui-spec.md` — Component specs + layout specs + token mapping
- `.ai/design-system/analysis/<feature>-analysis.md` — Design reference analysis (if applicable)

## Definition of Done

- [ ] `ui-spec.md` exists and is reviewed
- [ ] All tokens validated
- [ ] All four states specified for every user-facing component
- [ ] No arbitrary values
- [ ] Responsive and A11y notes present

## Validation Command

```bash
# No build command — this is a design skill. Validation is checklist-based.
# Reviewer checks ui-spec.md against tokens.json manually or via:
node .ai/scripts/validate-tokens.mjs --spec specs/<feature>/ui-spec.md
```
