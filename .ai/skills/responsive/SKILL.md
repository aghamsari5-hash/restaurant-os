# Skill — Responsive Design

---
name: responsive
description: Ensure every UI component and page works correctly across all breakpoints
when: Every UI component and page (always active alongside UI Design and Frontend skills)
version: 2.0
---

## Purpose

A UI that only works on desktop is not complete. This skill makes responsiveness mechanically verifiable.

## Breakpoints (from tokens.json)

| Token | Width | Target |
|-------|-------|--------|
| `sm` | 640px | Large phones / small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Extra large |

Mobile-first: base styles are mobile, then `sm:`, `md:`, `lg:`, `xl:` overrides.

## Workflow

### Step 1 — Design Review

- For each page/component in `ui-spec.md`, verify responsive behavior is specified.
- If not specified, define it: How does the layout change at each breakpoint?
  - Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
  - Sidebar: hidden on mobile → drawer, visible on `lg`
  - Table: horizontal scroll on mobile → full table on `lg`

### Step 2 — Implementation

- **Mobile-first Tailwind:**
  ```tsx
  // Correct: mobile base, then overrides
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-xl md:text-2xl lg:text-3xl">
  ```
- **Container:** Use `container` with `max-width` per breakpoint (from tokens).
- **Images:** `w-full h-auto`, `object-cover`, `sizes` attribute for Next.js Image.
- **Tables:** Wrap in `overflow-x-auto` for mobile.
- **Navigation:** Hamburger/drawer on mobile, full nav on `lg`.

### Step 3 — Testing

- Manual: Resize browser through all breakpoints, verify no horizontal scroll, no overlapping, no clipped content.
- Automated (if Playwright): Viewport matrix test.

```typescript
for (const viewport of [{ w: 375, h: 812 }, { w: 768, h: 1024 }, { w: 1280, h: 800 }]) {
  test(`responsive at ${viewport.w}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/products');
    await expect(page.locator('[data-testid="product-grid"]')).toBeVisible();
  });
}
```

## Rules

1. **Mobile-first.** Base = mobile. Never desktop-first with `max-*` overrides as primary.
2. **No fixed widths** that break on mobile (`w-[1200px]` without responsive override is forbidden).
3. **No horizontal scroll** on any breakpoint (except intentional table scroll).
4. **Touch targets ≥ 44×44px** on mobile.
5. **Every page tested at 375px, 768px, 1024px, 1280px** before marking responsive complete.

## Definition of Done

- [ ] Layout adapts at `sm`/`md`/`lg`/`xl`
- [ ] No horizontal scroll (except tables)
- [ ] No overlapping or clipped content at any breakpoint
- [ ] Touch targets ≥ 44px on mobile
- [ ] Tested at 375, 768, 1024, 1280
