# Skill — API

---
name: api
description: Define and implement APIs using Contract-First / Design-First principles with OpenAPI as executable truth
when: Phase 3 (Architecture) for contract design; Phase 5 (Backend) for implementation; any task that creates or modifies an endpoint
version: 2.0
---

## Purpose

The API contract is the single source of truth that Frontend and Backend develop against in parallel. No endpoint is coded before its contract is written and reviewed.

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| `specs/<feature>/spec.md` | Yes | User stories + acceptance criteria |
| `specs/<feature>/database-schema.md` | Yes (for data endpoints) | Entity fields + relations |
| `docs/035-api-standards.md` | Yes | Global API standards |

## Workflow

### Step 1 — Contract Design (Before Any Code)

Create `specs/<feature>/api-contract.md` using `.ai/templates/api-contract-template.md`.

For EACH endpoint, specify:

| Field | Required | Example |
|-------|----------|---------|
| Method + Path | Yes | `POST /api/v1/orders` |
| Summary | Yes | "Create a new order" |
| Auth | Yes | `Bearer JWT` + `tenant` + `permissions: orders:create` |
| Request Body / Query / Params | Yes | Zod/JSON Schema + validation rules |
| Success Response | Yes | Status + body envelope + example |
| Error Responses | Yes | 400, 401, 403, 404, 409, 422 — with error codes |
| Rate Limit | If applicable | e.g., 60 req/min |
| Idempotency | If applicable | `Idempotency-Key` header |

**Response envelope (mandatory for all endpoints):**

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": { /* resource or array */ },
  "meta": { "page": 1, "limit": 20, "total": 100 },
  "errors": null
}
```

```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "meta": null,
  "errors": [{ "field": "items", "message": "At least one item required", "code": "REQUIRED" }]
}
```

### Step 2 — Contract Review Gate

- [ ] All endpoints have request validation rules
- [ ] All endpoints have auth/tenant/permission requirements
- [ ] All endpoints have success + error responses with examples
- [ ] No missing status codes (especially 400/401/403/404/422)
- [ ] Versioning: `/api/v1/...` (never unversioned)
- [ ] Resource naming: plural nouns (`/products`, not `/getProducts`)
- [ ] Contract reviewed by Frontend + Backend perspective (even if one agent does both, check both sides)

**Do not proceed to implementation until contract is approved.**

### Step 3 — Implementation (Backend Skill takes over, but API Skill governs the interface)

- DTOs must match the contract's request/response schemas exactly.
- Validation via `class-validator` must enforce every rule in the contract.
- Swagger (`@ApiOperation`, `@ApiResponse`, `@ApiBearerAuth`) must reflect the contract.
- Contract and implementation must stay in sync — if implementation diverges, update the contract first.

### Step 4 — Validation

```bash
# Swagger available at /api/docs — visually verify every endpoint appears
# Contract compliance: compare api-contract.md vs Swagger JSON
npx swagger-cli validate backend/swagger.json  # if exported
```

## Rules

1. **Contract-first, always.** No endpoint without a contract entry.
2. **Contract is executable truth.** Code must obey the contract, not the other way around.
3. **Versioned.** All routes under `/api/v1`. Breaking changes → `/api/v2`.
4. **Consistent envelope.** Every response uses `{ success, message, data, meta, errors }`.
5. **Validation on every input.** No endpoint without `ValidationPipe` + DTO decorators.
6. **Auth explicit.** Every endpoint declares its auth requirement (public vs. `Bearer` + permissions).
7. **Error codes.** Every error has a machine-readable `code` (e.g., `VALIDATION_ERROR`, `TENANT_MISMATCH`, `INSUFFICIENT_STOCK`).

## Output

- `specs/<feature>/api-contract.md` — Full contract (reviewed before code)
- Backend DTOs + Controllers matching the contract
- Swagger docs at `/api/docs`

## Definition of Done

- [ ] `api-contract.md` exists and is reviewed
- [ ] Every endpoint has request/response/error specs with examples
- [ ] DTOs match contract schemas exactly
- [ ] Validation decorators enforce every contract rule
- [ ] Swagger reflects the contract
- [ ] Auth/tenant/permission declared per endpoint
- [ ] Traceability Matrix updated
