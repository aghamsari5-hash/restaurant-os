# Skill — Frontend

---
name: frontend
description: Build production-ready Next.js/React frontend from UI specs and API contracts
when: Phase 6 (Frontend) and any task that creates or modifies frontend code
version: 2.0
---

## Purpose

Build frontend that is complete, not just visually complete. Every component must be wired to real APIs, handle all states, and pass quality gates.

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| `specs/<feature>/ui-spec.md` | Yes | Component + layout specification |
| `specs/<feature>/api-contract.md` | Yes | API contract (endpoints, request/response, errors) |
| `.ai/design-system/tokens.json` | Yes | Design tokens |
| `frontend/src/` existing code | Yes | To enable reuse |

## Workflow

### Step 1 — Scaffold Check

- Verify `frontend/` follows the constitution's file structure.
- Identify reusable components in `components/ui/` and `components/features/`.
- Decide: reuse existing vs. create new (document decision in `plan.md`).

### Step 2 — Build Components (Bottom-Up)

1. **Primitives** — Use `shadcn/ui` (Button, Input, Card, Dialog, etc.). Never reinvent.
2. **Domain Components** — Build in `components/features/<domain>/` (e.g., `OrderCard`, `ProductGrid`).
3. **Pages/Routes** — Compose in `app/<route>/page.tsx` (App Router).

Rules per component:

- Typed props (no `any`), `readonly` where applicable.
- All four states: `loading` (Skeleton), `empty` (EmptyState), `error` (ErrorState + retry), `success`.
- Responsive (see Responsive Skill), Accessible (see A11y Skill).
- No inline `style={}` — Tailwind + tokens only.

### Step 3 — Data Layer

- Server state → **TanStack Query** (`useQuery`, `useMutation`, `queryClient`).
- Client state → **Zustand** (only for ephemeral UI state).
- Never duplicate server state in Zustand or `useState`.
- API calls via `lib/api-client.ts` (centralized, typed, with interceptors for auth + errors).
- Forms → **React Hook Form + Zod** (validation schema colocated with component).

### Step 4 — Wiring & Validation

- Wire every component to its API endpoint per `api-contract.md`.
- Validate every form field (client-side Zod + server errors mapped to fields).
- Handle every error state from the contract's `errors` section.

### Step 5 — Quality Gates

```bash
cd frontend && npm run lint
cd frontend && npm run build
cd frontend && npm run test  # if tests exist
```

- No TypeScript errors, no lint errors, build succeeds.
- Lighthouse check (if applicable): Performance ≥ 90.

## Rules

1. **App Router only.** No `pages/` directory. Server Components by default, `"use client"` only when needed (state, effects, browser APIs).
2. **No `any`, no `console.log`.** Use structured logger if needed.
3. **No hardcoded API URLs.** Use `lib/api-client.ts` + env vars.
4. **No business logic in components.** Logic goes in `features/<domain>/hooks/` or `lib/`.
5. **Every API call has loading/error handling.** No bare `fetch` without states.
6. **Abstraction rule:** Create a new component only if it is used ≥2 times OR is a domain concept. Otherwise, keep it inline. Never over-abstract.
7. **Dependency rule:** New npm packages require justification in `plan.md`. Prefer existing deps.

## Output

- Components in `frontend/src/components/features/<domain>/`
- Routes in `frontend/src/app/<route>/`
- Hooks/services in `frontend/src/features/<domain>/`
- All wired to real APIs, all states handled

## Definition of Done

- [ ] UI matches `ui-spec.md` + tokens
- [ ] Responsive on `sm`/`md`/`lg`/`xl`
- [ ] Loading / Empty / Error / Success states for every data-driven component
- [ ] Forms validated (Zod) + server errors mapped
- [ ] TanStack Query for server state, no duplication
- [ ] `npm run build` + `npm run lint` green
- [ ] No `any`, no `console.log`, no hardcoded URLs
- [ ] Traceability Matrix row updated

## Anti-Patterns (Never Do)

- ❌ `useState` for API data
- ❌ Fetching in `useEffect` without TanStack Query
- ❌ Inline styles or arbitrary Tailwind values
- ❌ Copy-pasting a component instead of reusing
- ❌ Marking UI "done" before API wiring
