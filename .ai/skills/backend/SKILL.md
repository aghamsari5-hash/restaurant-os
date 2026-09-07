# Skill — Backend

---
name: backend
description: Build production-ready NestJS backend from API contracts and database schemas
when: Phase 5 (Backend) and any task that creates or modifies backend code
version: 2.0
---

## Purpose

Build backend that is complete — not just endpoints that return mock data. Every endpoint must have validation, auth, tenant isolation, domain logic, DB integration, and tests.

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| `specs/<feature>/api-contract.md` | Yes | Endpoints, request/response, validation, auth, errors |
| `specs/<feature>/database-schema.md` | Yes | Tables, columns, relations, indexes, constraints |
| `specs/<feature>/spec.md` | Yes | Business rules + acceptance criteria |
| `backend/src/` existing code | Yes | To respect module boundaries |

## Workflow

### Step 1 — Module Check

- Verify `backend/src/modules/<domain>/` exists or scaffold it per constitution.
- Module structure:
  ```
  modules/<domain>/
    ├── controllers/       # Thin: validate → call service → return
    ├── services/          # Application services / use cases
    ├── domain/            # Entities, VOs, Aggregates, Events, Policies
    ├── infrastructure/    # Repositories, mappers, Prisma delegates
    ├── dto/               # Request/Response DTOs + class-validator
    └── events/            # Domain events + handlers
  ```
- Never place business logic in controllers or DTOs.

### Step 2 — Domain Layer First

1. **Entities & Value Objects** — Pure TypeScript, no framework imports. Business invariants enforced in constructors/factories.
2. **Domain Events** — `OrderCreatedEvent`, `StockAdjustedEvent`, etc. Immutable, append-only.
3. **Repository Interfaces** — `IOrderRepository` in `domain/`, implementation in `infrastructure/`.

### Step 3 — Application Layer

- **Use Cases / Services** — One service per use case (e.g., `CreateOrderUseCase`). Coordinates domain + infrastructure. Handles transactions.
- **DTOs** — `class-validator` + `class-transformer`, strict validation. Swagger decorators (`@ApiProperty`).
- **Mappers** — Domain ↔ Persistence ↔ DTO.

### Step 4 — Presentation Layer

- **Controllers** — Thin. Validate request (ValidationPipe), call use case, return standard envelope `{ success, message, data, meta, errors }`.
- **Guards** — `JwtAuthGuard`, `RolesGuard`, `TenantGuard` — every protected route.
- **Versioning** — `/api/v1/<resource>` (never break v1).

### Step 5 — Cross-Cutting

- **Tenant isolation:** Every query includes `where: { tenantId }`. Enforced via Prisma middleware or base repository.
- **Error handling:** Throw domain exceptions → global `ExceptionFilter` maps to HTTP responses. Never swallow.
- **Logging:** Structured logger, no `console.log`. Never log secrets/PII.
- **Validation:** Every input validated (DTO + domain invariants). Never trust client input.

### Step 6 — Quality Gates

```bash
cd backend && npm run lint
cd backend && npm run build
cd backend && npx prisma validate
cd backend && npm run test
```

## Rules

1. **No business logic in controllers.** Controllers: validate → delegate → return. Nothing else.
2. **No raw SQL** unless justified in ADR. Use Prisma.
3. **No `any`.** Strict TypeScript.
4. **Every query filters by `tenant_id`.** No exceptions.
5. **Every endpoint has:** validation, auth check (if protected), tenant check, error handling, Swagger docs.
6. **Event-driven:** Publish domain events for cross-module communication. Never import another module's repository.
7. **No hardcoded secrets.** All config via `ConfigService` + env vars.

## Output

- Domain entities, VOs, events in `domain/`
- Use cases in `services/`
- Controllers in `controllers/`
- DTOs in `dto/`
- Repository implementations in `infrastructure/`
- All endpoints documented in Swagger (`/api/docs`)

## Definition of Done

- [ ] All endpoints from `api-contract.md` implemented
- [ ] Request/response validation (class-validator)
- [ ] Auth + tenant + permission checks (if protected)
- [ ] Domain logic in domain layer, not controllers
- [ ] Tenant isolation on every query
- [ ] Domain events published where specified
- [ ] Error handling via global filter
- [ ] Swagger docs complete
- [ ] `npm run build` + `npm run lint` + `npx prisma validate` green
- [ ] Unit tests for domain + application layers
- [ ] Traceability Matrix updated

## Anti-Patterns

- ❌ Business logic in controllers
- ❌ Direct DB access from another module
- ❌ Missing tenant filter
- ❌ Returning raw Prisma models (always map via DTO)
- ❌ Swallowing exceptions
