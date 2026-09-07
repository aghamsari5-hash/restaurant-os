# Architecture Principles — RestaurantOS

> Detailed architecture principles. Summary in `CONSTITUTION.md` Article I.

---

## 1. Layers

```
Presentation (Controllers, DTOs, Guards)
    ↓ depends on
Application (Services, Use Cases, Mappers)
    ↓ depends on
Domain (Entities, VOs, Aggregates, Events, Policies)
    ↓ depends on nothing
Infrastructure (Repositories, Prisma, Redis, External APIs)
    ↑ implements Domain interfaces
```

- No layer depends on a layer above it.
- Domain has zero framework imports (`@nestjs/*`, `prisma`, etc.) — pure TypeScript.

## 2. Modules

- Each domain is an independent NestJS module.
- Module owns: controllers, services, domain, infrastructure, DTOs, events.
- Module communicates via:
  - **Application Services** — direct calls for synchronous, same-transaction operations.
  - **Domain Events** — for cross-module, eventually-consistent operations.

```
modules/products/
  ├── controllers/products.controller.ts
  ├── services/create-product.usecase.ts
  ├── domain/product.entity.ts
  ├── domain/events/product-created.event.ts
  ├── infrastructure/product.repository.ts
  ├── dto/create-product.dto.ts
  └── products.module.ts
```

## 3. Module Communication Rules

- ✅ `ProductsModule` publishes `ProductCreatedEvent` → `InventoryModule` subscribes.
- ❌ `ProductsModule` directly queries `inventory_movements` table.

## 4. Multi-Tenancy

- Every business table has `tenantId`.
- Every query filters by `tenantId` from JWT (never from client input).
- `TenantGuard` validates tenant at the controller level.
- Base repository enforces tenant filter at the data layer (defense in depth).

## 5. Event-Driven

- Domain events are immutable, append-only, and describe what already happened.
- Events are published after successful transaction (outbox pattern for reliability — future).
- Subscribers are idempotent (handle duplicate events safely).

## 6. API-First

- OpenAPI contract before implementation.
- Frontend and backend develop against the same contract.
- Breaking changes require new version (`/api/v2`).
