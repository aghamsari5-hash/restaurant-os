# Tasks Template (Spec-Kit Compatible)

> This template is used by `/speckit.tasks`.

When `/speckit.tasks` is invoked, the agent should:

1. Read `specs/<feature>/spec.md` and `specs/<feature>/plan.md`.
2. Break the plan into atomic, testable tasks in `specs/<feature>/tasks.md`.
3. Each task: ID, title, description, files to create/modify, acceptance criteria, dependencies.
4. Tasks ordered by dependency (database before backend, contract before implementation).
5. Each task small enough that one agent can complete it in one session.

## Task Format

```markdown
## Tasks — {{FEATURE_NAME}}

| # | Task | Files | Depends On | AC |
|---|------|-------|------------|----|
| T-01 | Create Product entity and VO | backend/src/modules/products/domain/product.entity.ts | — | FR-01 |
| T-02 | Create Prisma model + migration | backend/prisma/schema.prisma | T-01 | FR-01 |
| T-03 | Create DTOs with validation | backend/src/modules/products/dto/ | T-02 | FR-01, FR-02 |
| T-04 | Implement CreateProductUseCase | backend/src/modules/products/services/ | T-01, T-02, T-03 | AC-01.1 |
| T-05 | Implement ProductsController | backend/src/modules/products/controllers/ | T-04 | AC-01.1, AC-01.2 |
| T-06 | Build ProductForm component | frontend/src/components/features/products/ | T-05 (contract) | FR-01 |
| T-07 | Write integration tests | backend/test/products.e2e-spec.ts | T-05 | AC-01.1, AC-01.2, AC-03.1 |
```

## Rules

- One task = one logical unit (one entity, one endpoint, one component).
- Tasks that modify > 3 files should be split.
- Every task references its AC.
- Tasks include test tasks — testing is not a separate phase tacked on at the end.
