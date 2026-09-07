# Skill — Accessibility (A11y)

---
name: a11y
description: Ensure every UI meets WCAG 2.1 AA and is usable via keyboard and screen reader
when: Every UI component and page (always active alongside UI Design and Frontend skills)
version: 2.0
---

## Purpose

Accessibility is not optional. An inaccessible feature is not complete.

## Standard

**WCAG 2.1 AA** — the minimum. Enforced via automated checks + manual spot-checks.

## Workflow

### Step 1 — Automated Checks

```bash
# Axe (via Playwright or eslint-plugin-jsx-a11y)
cd frontend && npx playwright test --grep @a11y
# Or ESLint
cd frontend && npx eslint . --ext .tsx --rule 'jsx-a11y/alt-text: error'
```

Recommended tooling:

- `eslint-plugin-jsx-a11y` — catches missing alt, aria, label issues at lint time.
- `@axe-core/playwright` — catches contrast, structure, ARIA issues at test time.

### Step 2 — Manual Checklist (per component/page)

- [ ] **Keyboard:** All interactive elements reachable via Tab, operable via Enter/Space, no keyboard traps.
- [ ] **Focus:** Visible focus ring on every focusable element (`focus-visible:ring-2`).
- [ ] **Labels:** Every `<input>` has `<label>` or `aria-label`. Every icon button has `aria-label`.
- [ ] **Headings:** `h1` → `h2` → `h3` in order, no skipped levels, one `h1` per page.
- [ ] **Contrast:** Text contrast ≥ 4.5:1, large text ≥ 3:1 (check via tokens — all token pairs are pre-validated).
- [ ] **Alt text:** Every `<img>` has `alt` (meaningful) or `alt=""` (decorative) + `role="presentation"`.
- [ ] **ARIA:** No redundant ARIA (`<button aria-role="button">` is wrong). Use ARIA only when HTML semantics insufficient.
- [ ] **Forms:** Errors announced via `aria-describedby`, `aria-invalid="true"` on invalid fields.
- [ ] **Modals/Dialogs:** Focus trapped, Escape closes, `aria-modal="true"`, focus returns on close.

### Step 3 — Screen Reader Spot-Check

- Test with VoiceOver (macOS) or NVDA (Windows) for critical flows: login, order creation, navigation.
- Verify: page title announced, landmarks navigable, form errors announced.

## Rules

1. **Semantic HTML first.** Use `<button>`, `<nav>`, `<main>`, `<table>` — not `<div onClick>`.
2. **No `<div onClick>` without `role="button"`, `tabIndex={0}`, and keyboard handlers.** Prefer `<button>`.
3. **Color is not the only signal.** Errors need icon + text, not just red color.
4. **Focus must always be visible.** Never `outline: none` without replacement.
5. **Tokens guarantee contrast.** If you use only token color pairs, contrast is pre-validated. Non-token colors must be checked.

## Definition of Done

- [ ] `eslint-plugin-jsx-a11y` clean
- [ ] Axe (or equivalent) — 0 violations at AA level
- [ ] Keyboard navigation verified (Tab through entire page)
- [ ] Focus visible on every interactive element
- [ ] Screen reader spot-check for critical flows
- [ ] No `div onClick` without proper role/keyboard
