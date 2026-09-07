# Design System — RestaurantOS

> Single source of truth for all visual decisions. AI agents MUST read `tokens.json` and this guide before generating any UI.

---

## 1. Philosophy

- **Tokens are law.** Every color, spacing, font-size, radius, and shadow comes from `tokens.json`. No arbitrary values.
- **Deterministic.** Two agents given the same spec must produce visually identical output.
- **Mobile-first.** Base styles are mobile; breakpoints override upward (`sm:` → `md:` → `lg:` → `xl:`).

---

## 2. Quick Reference

### Colors

| Usage | Token | Tailwind Class | Example |
|-------|-------|---------------|---------|
| Primary action | `primary.600` | `bg-primary-600` | Buttons, links, active states |
| Primary hover | `primary.700` | `hover:bg-primary-700` | |
| Text primary | `foreground.DEFAULT` | `text-neutral-900` | Headings, body |
| Text muted | `foreground.muted` | `text-neutral-600` | Descriptions, captions |
| Border | `border.DEFAULT` | `border-neutral-200` | Cards, inputs, dividers |
| Background | `background.DEFAULT` | `bg-white` | Page background |
| Background muted | `background.muted` | `bg-neutral-50` | Section backgrounds |
| Success | `success.600` | `bg-success-600` | Confirmations, badges |
| Danger | `danger.600` | `bg-danger-600` | Errors, destructive actions |

### Typography

| Element | Size | Weight | Class |
|---------|------|--------|-------|
| H1 | 30px | bold | `text-3xl font-bold` |
| H2 | 24px | semibold | `text-2xl font-semibold` |
| H3 | 20px | semibold | `text-xl font-semibold` |
| Body | 16px | regular | `text-base font-normal` |
| Body small | 14px | regular | `text-sm text-neutral-600` |
| Caption | 12px | regular | `text-xs text-neutral-400` |
| Label | 14px | medium | `text-sm font-medium` |

### Spacing

4px base. Common values: `p-4` (16px), `p-6` (24px), `gap-4` (16px), `gap-6` (24px).

Page container: `container mx-auto px-4 md:px-6 lg:px-8` (max 1280px).

### Breakpoints

`sm:640` `md:768` `lg:1024` `xl:1280` `2xl:1536`

### Border Radius

`rounded-md` (8px) default, `rounded-lg` (12px) cards, `rounded-full` pills/avatars.

### Shadows

`shadow-sm` cards, `shadow-md` dropdowns, `shadow-lg` modals.

---

## 3. Component Catalog

All components use `shadcn/ui` primitives + tokens. Never reinvent.

| Component | File | Tokens Used |
|-----------|------|-------------|
| Button | `components/ui/button.tsx` | `primary`, `danger`, `neutral`, `borderRadius`, `typography` |
| Input | `components/ui/input.tsx` | `border`, `shadows`, `typography` |
| Card | `components/ui/card.tsx` | `border`, `shadows`, `borderRadius`, `spacing` |
| Dialog/Modal | `components/ui/dialog.tsx` | `shadows.lg`, `zIndex.modal`, `borderRadius.lg` |
| Table | `components/ui/table.tsx` | `border`, `typography`, `spacing` |
| Badge | `components/ui/badge.tsx` | `colors`, `borderRadius.full`, `typography.xs` |
| Alert | `components/ui/alert.tsx` | `colors.*.50`, `border` |
| Skeleton | `components/ui/skeleton.tsx` | `neutral.200`, `borderRadius` |
| EmptyState | `components/features/shared/empty-state.tsx` | `neutral`, `typography` |
| ErrorState | `components/features/shared/error-state.tsx` | `danger`, `typography` |

---

## 4. State Patterns (Mandatory for Every Component)

Every data-driven component MUST implement:

| State | Component | Example |
|-------|-----------|---------|
| Loading | `Skeleton` / `Spinner` | `<Skeleton className="h-20 w-full" />` |
| Empty | `EmptyState` | `<EmptyState title="No orders" action={<Button>Add Order</Button>} />` |
| Error | `ErrorState` | `<ErrorState message={error.message} onRetry={refetch} />` |
| Success | Actual content | `<OrderCard order={order} />` |

```tsx
// Pattern — every data component follows this
function OrderList() {
  const { data, isLoading, isError, error, refetch } = useOrders();

  if (isLoading) return <OrderListSkeleton />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;
  if (!data?.length) return <EmptyState title="No orders yet" description="Create your first order" action={<CreateOrderButton />} />;
  return <div className="grid gap-4">{data.map(o => <OrderCard key={o.id} order={o} />)}</div>;
}
```

---

## 5. Validation

```bash
# Token compliance — no arbitrary values
node .ai/scripts/validate-tokens.mjs --path frontend/src

# A11y
cd frontend && npx eslint . --ext .tsx --rule 'jsx-a11y/alt-text: error'
```

---

## 6. Adding a New Token

1. Propose via ADR in `docs/adr/`.
2. Add to `tokens.json`.
3. Update this README's Quick Reference.
4. No agent may add arbitrary Tailwind values without updating tokens first.
