# Skill — SEO

---
name: seo
description: Ensure public pages are discoverable, performant, and correctly indexed
when: Any public-facing page (marketing, menu, QR menu, landing); not for authenticated dashboard pages
version: 2.0
---

## Purpose

SEO is not an afterthought for public pages. This skill ensures every public page has the metadata and structure to rank and share correctly.

## Workflow

### Step 1 — Per-Page SEO Spec

For each public page, specify in `specs/<feature>/seo-spec.md` or inline in `spec.md`:

| Field | Required | Example |
|-------|----------|---------|
| `<title>` | Yes | `Menu — Bella Vista Restaurant` (≤ 60 chars) |
| `<meta description>` | Yes | `Explore our fresh Italian menu...` (≤ 160 chars) |
| Canonical URL | Yes | `https://bellavista.com/menu` |
| Open Graph | Yes | `og:title`, `og:description`, `og:image`, `og:url`, `og:type` |
| Twitter Card | Yes | `twitter:card`, `twitter:title`, etc. |
| Structured Data | If applicable | JSON-LD (`Restaurant`, `Menu`, `Product`) |
| `robots` | Yes | `index, follow` or `noindex` for non-public |
| `lang` | Yes | `<html lang="fa">` or `en` |

### Step 2 — Implementation (Next.js App Router)

```typescript
// app/menu/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu — Bella Vista Restaurant',
  description: 'Explore our fresh Italian menu with wood-fired pizzas and handmade pasta.',
  openGraph: {
    title: 'Menu — Bella Vista Restaurant',
    description: 'Explore our fresh Italian menu...',
    url: 'https://bellavista.com/menu',
    images: [{ url: '/og/menu.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://bellavista.com/menu' },
};

// Structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Bella Vista',
  servesCuisine: 'Italian',
  menu: 'https://bellavista.com/menu',
};
```

### Step 3 — Technical SEO

- [ ] Semantic HTML: `<main>`, `<nav>`, `<article>`, headings in order.
- [ ] Images: `alt` text, `width`/`height` to prevent CLS, `next/image` with `sizes`.
- [ ] Performance: LCP < 2.5s, CLS < 0.1 (see Performance Skill).
- [ ] Sitemap: `app/sitemap.ts` (Next.js generates `/sitemap.xml`).
- [ ] Robots: `app/robots.ts`.
- [ ] No client-only rendering for SEO-critical content (use Server Components).

## Rules

1. **Every public page has title + description + canonical + OG.** No exceptions.
2. **No `noindex` on public pages.** Dashboard/admin pages should have `noindex`.
3. **Structured data for restaurants/menus/products** where applicable.
4. **Semantic HTML mandatory** for SEO pages.
5. **Images optimized** via `next/image`.

## Definition of Done

- [ ] Title + description + canonical on every public page
- [ ] Open Graph + Twitter Card
- [ ] Structured data (JSON-LD) where applicable
- [ ] Sitemap + robots
- [ ] Semantic HTML
- [ ] Lighthouse SEO score ≥ 90
