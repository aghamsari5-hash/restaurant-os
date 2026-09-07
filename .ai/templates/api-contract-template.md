# API Contract — {{FEATURE_NAME}}

> Template for `specs/<feature>/api-contract.md`. Contract-First: this file is written BEFORE any code.
> Frontend and Backend develop against this contract in parallel.

Base URL: `/api/v1`
Version: `v1`
Auth: `Bearer JWT` (unless marked Public)

---

## 1. Resources

| Resource | Path Prefix | Description |
|----------|-------------|-------------|
| {{Resource}} | /api/v1/{{resources}} | {{Description}} |

---

## 2. Endpoints

### 2.1 POST /api/v1/{{resources}}

**Summary:** Create a new {{resource}}

**Auth:** `Bearer JWT` + Permission `{{resources}}:create` + Tenant validation

**Request Headers:**

| Header | Required | Description |
|--------|----------|-------------|
| Authorization | Yes | `Bearer <access_token>` |
| Content-Type | Yes | `application/json` |
| Idempotency-Key | No | UUID for idempotent creation (if supported) |

**Request Body:**

```json
{
  "name": "Margherita Pizza",
  "price": 12.99,
  "categoryId": "uuid-of-category",
  "description": "Classic pizza with tomato and mozzarella",
  "imageUrl": "https://cdn.example.com/pizza.jpg",
  "isAvailable": true
}
```

**Field Validation:**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| name | string | Yes | 1-100 chars, trimmed, unique per tenant+category |
| price | number | Yes | > 0, max 99999.99, 2 decimal places |
| categoryId | UUID | Yes | Must exist and belong to same tenant |
| description | string | No | max 1000 chars |
| imageUrl | string (URL) | No | Valid URL, max 2048 chars |
| isAvailable | boolean | No | Default true |

**Success Response — 201 Created:**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "uuid",
    "tenantId": "uuid",
    "name": "Margherita Pizza",
    "price": 12.99,
    "categoryId": "uuid-of-category",
    "description": "Classic pizza...",
    "imageUrl": "https://cdn.example.com/pizza.jpg",
    "isAvailable": true,
    "createdAt": "2026-09-07T10:00:00.000Z",
    "updatedAt": "2026-09-07T10:00:00.000Z"
  },
  "meta": null,
  "errors": null
}
```

**Error Responses:**

| Status | Code | Condition | Body |
|--------|------|-----------|------|
| 400 | `VALIDATION_ERROR` | Invalid fields | `{ success: false, message: "Validation failed", errors: [{ field: "price", message: "Price must be positive", code: "POSITIVE_REQUIRED" }] }` |
| 401 | `UNAUTHORIZED` | Missing/invalid JWT | `{ success: false, message: "Unauthorized", errors: [{ code: "UNAUTHORIZED" }] }` |
| 403 | `FORBIDDEN` | Missing permission `products:create` | `{ success: false, message: "Forbidden", errors: [{ code: "FORBIDDEN" }] }` |
| 403 | `TENANT_MISMATCH` | categoryId belongs to different tenant | `{ success: false, message: "Category not found", errors: [{ code: "NOT_FOUND" }] }` (do not leak tenant info) |
| 404 | `NOT_FOUND` | categoryId not found | `{ success: false, message: "Category not found", errors: [{ code: "NOT_FOUND" }] }` |
| 409 | `CONFLICT` | Duplicate name per tenant+category | `{ success: false, message: "Product already exists", errors: [{ field: "name", code: "DUPLICATE" }] }` |
| 422 | `UNPROCESSABLE` | Business rule violation | `{ success: false, message: "...", errors: [{ code: "BUSINESS_RULE_VIOLATION" }] }` |
| 429 | `RATE_LIMITED` | Too many requests | `{ success: false, message: "Too many requests", errors: [{ code: "RATE_LIMITED" }] }` |

---

### 2.2 GET /api/v1/{{resources}}

**Summary:** List {{resources}} (paginated, tenant-scoped)

**Auth:** `Bearer JWT` + Permission `{{resources}}:read`

**Query Parameters:**

| Param | Type | Required | Default | Rules |
|-------|------|----------|---------|-------|
| page | integer | No | 1 | >= 1 |
| limit | integer | No | 20 | 1-100 |
| search | string | No | — | 1-100 chars, searches name/description |
| categoryId | UUID | No | — | Filter by category |
| isAvailable | boolean | No | — | Filter by availability |
| sortBy | string | No | createdAt | One of: name, price, createdAt |
| sortOrder | string | No | desc | asc \| desc |

**Success Response — 200 OK:**

```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [ { /* product */ }, { /* product */ } ],
  "meta": { "page": 1, "limit": 20, "total": 45, "totalPages": 3 },
  "errors": null
}
```

**Error Responses:** 400 (invalid query), 401, 403

---

### 2.3 GET /api/v1/{{resources}}/:id

**Summary:** Get single {{resource}} by ID

**Auth:** `Bearer JWT` + Permission `{{resources}}:read` + Tenant check

**Path Params:**

| Param | Type | Required | Rules |
|-------|------|----------|-------|
| id | UUID | Yes | Must exist and belong to caller's tenant |

**Success Response — 200 OK:** Single resource in `data`

**Error Responses:** 400 (invalid UUID), 401, 403 (tenant mismatch → 404 to avoid leakage), 404

---

### 2.4 PATCH /api/v1/{{resources}}/:id

**Summary:** Partial update

**Auth:** `Bearer JWT` + Permission `{{resources}}:update`

**Request Body:** Same fields as POST, all optional, at least one required

**Success Response — 200 OK:** Updated resource

**Error Responses:** 400, 401, 403, 404, 409 (duplicate), 422

---

### 2.5 DELETE /api/v1/{{resources}}/:id

**Summary:** Soft delete

**Auth:** `Bearer JWT` + Permission `{{resources}}:delete`

**Success Response — 200 OK:**

```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null,
  "meta": null,
  "errors": null
}
```

**Error Responses:** 400, 401, 403, 404, 409 (if has dependent records that prevent deletion)

---

## 3. Common Headers

| Header | Direction | Description |
|--------|-----------|-------------|
| Authorization | Request | `Bearer <token>` |
| X-Request-Id | Both | Request correlation ID (UUID) |
| X-Tenant-Id | Response | Tenant ID (from JWT, echoed for debugging) |
| RateLimit-Limit | Response | Max requests per window |
| RateLimit-Remaining | Response | Remaining requests |

---

## 4. Pagination

All list endpoints use:

```
GET /api/v1/resources?page=1&limit=20&sortBy=createdAt&sortOrder=desc
```

Response `meta`: `{ page, limit, total, totalPages }`

---

## 5. Error Envelope (All Endpoints)

```json
{
  "success": false,
  "message": "Human-readable summary",
  "data": null,
  "meta": null,
  "errors": [
    { "field": "name", "message": "Name is required", "code": "REQUIRED" },
    { "field": "price", "message": "Price must be positive", "code": "POSITIVE_REQUIRED" },
    { "code": "UNAUTHORIZED", "message": "Invalid or expired token" }
  ]
}
```

Error codes are machine-readable and stable (never change without version bump).

---

## 6. Rate Limiting

| Endpoint Group | Limit | Window |
|---------------|-------|--------|
| Auth (login, refresh) | 5 req | 1 min per IP |
| Mutations (POST/PATCH/DELETE) | 60 req | 1 min per user |
| Reads (GET) | 120 req | 1 min per user |

---

## 7. Versioning

- Current: `/api/v1`
- Breaking changes → `/api/v2` (never break v1)
- Deprecation: `Sunset` header + Swagger `deprecated: true` + 6-month notice

---

## 8. Swagger

Every endpoint must have:

```typescript
@ApiOperation({ summary: 'Create a new product' })
@ApiBearerAuth()
@ApiResponse({ status: 201, type: CreateProductResponseDto })
@ApiResponse({ status: 400, description: 'Validation error' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
```

Swagger UI at `/api/docs`.

---

## 9. Checklist

- [ ] Every endpoint has request validation table
- [ ] Every endpoint has success response with example
- [ ] Every endpoint has error responses (400/401/403/404/409/422 where applicable)
- [ ] Auth + tenant + permission declared per endpoint
- [ ] Pagination on every list endpoint
- [ ] Rate limiting specified
- [ ] Error codes are stable and machine-readable
- [ ] Swagger decorators planned
