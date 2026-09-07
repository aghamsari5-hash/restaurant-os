# Design Analysis — {{FEATURE_NAME}}

> Produced by UI Design Skill when a DESIGN_REFERENCE (screenshot/Figma/AI Studio) is provided.
> Location: `.ai/design-system/analysis/{{feature}}-analysis.md`

---

## 1. Reference

| Field | Value |
|-------|-------|
| Source | {{Screenshot file / Figma URL / AI Studio export}} |
| Date Analyzed | {{DATE}} |
| Analyzer | UI Design Agent |

---

## 2. Layout Structure

Describe the overall layout:

- Header: ...
- Sidebar: ...
- Main content: ...
- Footer: ...

Grid/Container observed: ...

---

## 3. Component Inventory (from reference)

| # | Component | Count | Existing? | Action |
|---|-----------|-------|-----------|--------|
| 1 | Button (primary) | 3 | Yes — `components/ui/button.tsx` | Reuse |
| 2 | Product Card | 6 | No | Create new |
| 3 | Search Input | 1 | Yes — `components/ui/input.tsx` | Reuse |

---

## 4. Color Analysis

| Color in Reference | Hex | Token Match | Action |
|--------------------|-----|-------------|--------|
| Primary orange | #F97316 | `primary.500` | ✅ Use token |
| Dark text | #171717 | `neutral.900` | ✅ Use token |
| Custom purple | #8B5CF6 | No match | ⚠️ Map to closest or propose token via ADR |

---

## 5. Typography Analysis

| Text in Reference | Size/Weight Observed | Token Match |
|-------------------|---------------------|-------------|
| Page title | 30px bold | `text-3xl font-bold` ✅ |
| Card title | 18px semibold | `text-lg font-semibold` ✅ |
| Body | 14px regular | `text-sm` ✅ |

---

## 6. Spacing Analysis

| Spacing Observed | Token Match |
|------------------|-------------|
| Card padding 24px | `p-6` ✅ |
| Grid gap 16px | `gap-4` ✅ |

---

## 7. Responsive Observations

What happens at different widths (if reference shows multiple widths, or inferred):

| Breakpoint | Observed/Inferred Behavior |
|------------|---------------------------|
| Mobile | ... |
| Tablet | ... |
| Desktop | ... |

---

## 8. Missing States

| State | Present in Reference? | Action |
|-------|----------------------|--------|
| Loading | ❌ Missing | Design skeleton per tokens |
| Empty | ❌ Missing | Design EmptyState per tokens |
| Error | ❌ Missing | Design ErrorState per tokens |
| Success | ✅ Present | Use as-is |

---

## 9. A11y Observations

- Contrast: ...
- Focus states: ...
- Semantic structure: ...

---

## 10. Recommendations

1. ...
2. ...

---

*Next: Produce `specs/<feature>/ui-spec.md` incorporating this analysis.*
