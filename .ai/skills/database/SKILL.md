# Skill — Database

---
name: database
description: Design and implement database schemas that are multi-tenant, normalized, indexed, and migration-safe
when: Phase 4 (Database) and any task that touches schema, migrations, queries, or seed data
version: 2.0
---

## Purpose

Prevent the #1 AI failure: "Backend looks done but database is missing constraints, indexes, tenant isolation, or migrations."

Database is designed BEFORE backend. No feature's backend starts until its schema is reviewed and migrated.

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| `specs/<feature>/spec.md` § Data Model | Yes | Entities, relationships, business rules |
| `docs/034-database-design.md` | Yes | Global DB principles |
| `backend/prisma/schema.prisma` | Yes | Current schema |

## Workflow

### Step 1 — Entity Modeling

List every entity for the feature:

- Entity name, purpose, owner module
- Fields: name, type, nullable, default, constraints
- Relationships: 1-1, 1-N, N-N (with join tables)
- Indexes: which queries need them (filter, sort, search, tenant)
- Unique constraints

Output table in `specs/<feature>/database-schema.md` (template: `.ai/templates/database-schema-template.md`).

### Step 2 — Schema Design Rules

Every business table MUST have:

```prisma
model EntityName {
  id         String   @id @default(uuid()) @db.Uuid
  tenantId   String   @map("tenant_id") @db.Uuid
  createdAt  DateTime @default(now()) @map("created_at") @db.Timestamptz
  updatedAt  DateTime @updatedAt @map("updated_at") @db.Timestamptz
  deletedAt  DateTime? @map("deleted_at") @db.Timestamptz
  createdBy  String?  @map("created_by") @db.Uuid
  updatedBy  String?  @map("updated_by") @db.Uuid

  tenant     Tenant   @relation(fields: [tenantId], references: [id])

  @@index([tenantId])
  @@index([tenantId, deletedAt])
  @@map("entity_names")
}
```

Additional rules:

- **PK:** UUID (`@default(uuid())`), never auto-increment for public APIs.
- **Soft delete:** `deletedAt` on every business table. No `DELETE` without soft delete.
- **Tenant isolation:** `tenantId` + index on every business table.
- **Timestamps:** `createdAt`, `updatedAt` (Prisma `@updatedAt`), `deletedAt`.
- **Naming:** `snake_case` for tables/columns (via `@map`), `@@map` for Prisma model → table.
- **Indexes:** `@@index([tenantId])` minimum. Add composite indexes for common query patterns. Add `@@unique` where business requires uniqueness (scoped to `tenantId` where applicable).
- **Foreign keys:** Always explicit `@relation`, with `onDelete: Restrict` or `Cascade` deliberately chosen (document choice).
- **No business logic in DB:** No triggers, no stored procedures without ADR.

### Step 3 — Migration

```bash
npx prisma migrate dev --name add-<feature>-tables
npx prisma generate
npx prisma validate
```

- One migration per feature/phase. Never edit an applied migration.
- Migration must be reversible in reasoning (even if Prisma doesn't auto-rollback, document rollback steps).
- Never `db push` in production. Always `migrate`.

### Step 4 — Seed Data (if needed)

- Seed file: `backend/prisma/seed/<feature>.ts`
- Seeds must be idempotent (upsert, not create).
- Seeds must include `tenantId`.

### Step 5 — Validation

```bash
npx prisma validate
npx prisma format
npm run build  # ensure backend still compiles
```

- [ ] `prisma validate` passes
- [ ] `prisma format` clean
- [ ] No missing `tenantId` or `deletedAt`
- [ ] Indexes present for tenant-scoped queries
- [ ] Unique constraints scoped correctly
- [ ] Migration generated and reviewed

## Rules

1. **Schema-first.** No backend code until `database-schema.md` is approved and migrated.
2. **Tenant isolation is a security invariant.** Missing `tenantId` is a P0 defect.
3. **Soft delete always.** No hard deletes on business tables.
4. **UUID PKs.** No integer IDs in public APIs.
5. **Indexes are not optional.** Every `tenantId` filter needs an index. Every foreign key needs an index.
6. **No raw SQL** without ADR.

## Output

- `specs/<feature>/database-schema.md` — Full schema spec
- `backend/prisma/schema.prisma` — Updated
- `backend/prisma/migrations/<timestamp>_add_<feature>/migration.sql` — Migration
- `backend/prisma/seed/<feature>.ts` — Seed (if needed)

## Definition of Done

- [ ] `database-schema.md` reviewed and approved
- [ ] All tables have `id`, `tenantId`, `createdAt`, `updatedAt`, `deletedAt`
- [ ] Indexes on `tenantId` and query patterns
- [ ] Unique constraints correctly scoped
- [ ] Foreign keys with deliberate `onDelete`
- [ ] Migration generated, `prisma validate` green
- [ ] Seed data idempotent (if applicable)
- [ ] No raw SQL without ADR
- [ ] Traceability Matrix updated
