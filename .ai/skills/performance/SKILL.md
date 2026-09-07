# Skill — Performance

---
name: performance
description: Enforce performance budgets and optimization patterns for frontend and backend
when: Every feature (budgets enforced in CI); explicitly on any feature with lists, images, queries, or real-time requirements
version: 2.0
---

## Purpose

Performance is a feature. Slow is broken.

## Budgets (Enforced)

### Frontend

| Metric | Budget | Tool |
|--------|--------|------|
| Lighthouse Performance | ≥ 90 | Lighthouse CI |
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse / Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| INP (Interaction to Next Paint) | < 200ms | Web Vitals |
| Bundle size (per route) | < 200KB gzipped | `next build` output |
| Image weight (per image) | < 150KB | Manual / next/image |

### Backend

| Metric | Budget | Tool |
|--------|--------|------|
| p95 latency | < 300ms | k6 / Artillery / logs |
| p99 latency | < 1s | k6 / Artillery |
| No N+1 queries | 0 | Prisma query log + review |
| DB query time | < 100ms (p95) | Prisma + pg_stat |

## Workflow

### Frontend Optimization

- [ ] **Images:** `next/image` with `sizes`, `priority` for LCP image, lazy for below-fold.
- [ ] **Code splitting:** Dynamic `import()` for heavy components, route-based splitting (Next.js automatic).
- [ ] **Fonts:** `next/font` with `display: swap`, subset to required chars.
- [ ] **Lists:** Virtualize long lists (`@tanstack/react-virtual` for > 50 items).
- [ ] **Memoization:** `React.memo`, `useMemo`, `useCallback` only where profiling shows need — not prematurely.
- [ ] **Bundle analysis:** `ANALYZE=true npm run build` — check for large deps.

### Backend Optimization

- [ ] **No N+1:** Use Prisma `include` batching, `findMany` with `include`, or DataLoader. Verify via query log.
- [ ] **Indexes:** Every filtered/sorted/searched column has an index (see Database Skill).
- [ ] **Pagination:** Every list endpoint paginated (`page`, `limit`, `total` in `meta`). Never return unbounded arrays.
- [ ] **Caching:** Redis for expensive queries, with TTL and invalidation strategy documented.
- [ ] **Connection pooling:** Prisma `connection_limit` configured per environment.

### Verification

```bash
# Frontend
cd frontend && npm run build  # check bundle sizes in output
npx lighthouse http://localhost:3000 --only-categories=performance

# Backend
# Enable Prisma query logging: log: ['query'] in PrismaClient
# Check for N+1: count queries per request, should be O(1) not O(N)
```

## Rules

1. **Every list is paginated.** No `findMany` without `take`/`skip` on user-facing endpoints.
2. **No N+1.** One query per request pattern, not N queries for N items.
3. **Images always optimized.** Never raw `<img>` for content images — use `next/image`.
4. **Budgets are gates.** If Lighthouse < 90 or p95 > 300ms, feature is not done — fix or document ADR exception.

## Definition of Done

- [ ] Frontend budgets met (Lighthouse ≥ 90, LCP < 2.5s, CLS < 0.1)
- [ ] Backend budgets met (p95 < 300ms, no N+1)
- [ ] All lists paginated
- [ ] Images optimized
- [ ] Bundle size within budget
