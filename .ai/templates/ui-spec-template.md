# UI Spec — {{FEATURE_NAME}}

> Template for `specs/<feature>/ui-spec.md`. Produced by UI Design Skill.

---

## 1. Design Reference

| Source | Link / File |
|--------|-------------|
| Reference | {{Screenshot / Figma URL / AI Studio export / "None — spec-driven"}} |
| Analysis | `.ai/design-system/analysis/{{feature}}-analysis.md` (if reference exists) |

---

## 2. Routes & Pages

| Route | Page Component | Purpose | Auth |
|-------|---------------|---------|------|
| /products | `app/products/page.tsx` | Product list | Bearer |
| /products/:id | `app/products/[id]/page.tsx` | Product detail | Bearer |
| /products/new | `app/products/new/page.tsx` | Create product | Bearer + products:create |

---

## 3. Layout

**Page layout for /products:**

```
┌─────────────────────────────────────────────┐
│ Header (sticky, h-16, border-b)             │
├──────────┬──────────────────────────────────┤
│ Sidebar  │ Main Content (container)         │
│ w-64     │  ┌──────────────────────────┐    │
│ lg:block │  │ Search + Filters (card)  │    │
│ hidden   │  ├──────────────────────────┤    │
│ on mobile│  │ Product Grid             │    │
│          │  │ grid-cols-1 md:grid-cols-2│  │
│          │  │ lg:grid-cols-3 gap-4     │    │
│          │  ├──────────────────────────┤    │
│          │  │ Pagination               │    │
│          │  └──────────────────────────┘    │
└──────────┴──────────────────────────────────┘
```

- Container: `container mx-auto px-4 md:px-6 lg:px-8` (max 1280px)
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6`
- Sidebar: `hidden lg:block w-64` + mobile `Sheet` drawer

---

## 4. Component Inventory

### 4.1 ProductCard

| Field | Value |
|-------|-------|
| File | `components/features/products/product-card.tsx` |
| Reuse? | New — no existing card matches |
| Props | `{ product: Product, onEdit?: () => void, onDelete?: () => void }` |
| Variants | `default` (grid), `compact` (list) |
| States | See §5 |
| Tokens | `card` (rounded-lg, shadow-sm, border), `typography` (h3 for name, sm for price) |
| Responsive | Full width on mobile, 1/2 on md, 1/3 on lg |
| A11y | `role="article"`, image `alt={product.name}`, buttons with `aria-label` |

### 4.2 ProductForm

| Field | Value |
|-------|-------|
| File | `components/features/products/product-form.tsx` |
| Reuse? | New |
| Props | `{ product?: Product, onSubmit: (data: ProductFormData) => void, isSubmitting: boolean }` |
| Validation | Zod schema: name (1-100), price (>0), categoryId (UUID) |
| States | Default, Validating (inline errors), Submitting (button spinner), Error (alert), Success (toast + redirect) |
| Tokens | `input` (h-10, border, focus ring), `button` (primary for submit) |
| A11y | Labels for every input, `aria-invalid` + `aria-describedby` for errors, `aria-busy` on submit |

### 4.3 (additional components...)

---

## 5. States (Mandatory for Every Data Component)

| State | Component | Design |
|-------|-----------|--------|
| Loading | `ProductCardSkeleton` | `Skeleton` * 6 in grid, `h-48` each |
| Empty | `EmptyState` | Icon + "No products yet" + "Create Product" button |
| Error | `ErrorState` | Alert with message + "Retry" button (`onRetry={refetch}`) |
| Success | `ProductCard` / `ProductGrid` | Actual data |

```tsx
// Reference implementation pattern
function ProductList() {
  const { data, isLoading, isError, error, refetch } = useProducts();
  if (isLoading) return <ProductListSkeleton />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;
  if (!data?.length) return <EmptyState title="No products" action={<CreateButton />} />;
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{data.map(p => <ProductCard key={p.id} product={p} />)}</div>;
}
```

---

## 6. Token Mapping

| Design Value | Token | Tailwind Class |
|-------------|-------|----------------|
| Primary button bg | `primary.600` | `bg-primary-600` |
| Card shadow | `shadows.sm` | `shadow-sm` |
| Card radius | `borderRadius.lg` | `rounded-lg` |
| Section gap | `spacing.6` | `gap-6` |
| Body text | `typography.body` | `text-base` |

No arbitrary values. Every value above maps to `tokens.json`.

---

## 7. Responsive Spec

| Breakpoint | Layout Change |
|------------|---------------|
| base (mobile) | Single column, hamburger nav, stacked filters |
| md (768) | 2-column grid, filters in row |
| lg (1024) | 3-column grid, sidebar visible, full nav |
| xl (1280) | Same as lg, container max-width |

---

## 8. Accessibility Notes

- [ ] All images have `alt`
- [ ] All inputs have `label` + `aria-describedby` for errors
- [ ] All icon buttons have `aria-label`
- [ ] Focus ring visible (`focus-visible:ring-2`)
- [ ] Color not sole signal for errors (icon + text)
- [ ] Headings in order (h1 → h2 → h3)

---

## 9. Checklist

- [ ] Every route specified
- [ ] Every component has typed props + variants + states
- [ ] All four states (loading/empty/error/success) for data components
- [ ] All tokens mapped, no arbitrary values
- [ ] Responsive behavior per breakpoint
- [ ] A11y notes present
- [ ] Reuse checked (no duplicate components)
