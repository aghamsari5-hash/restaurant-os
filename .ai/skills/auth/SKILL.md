# Skill — Authentication & Authorization

---
name: auth
description: Implement secure, multi-tenant authentication and permission-based authorization
when: Any feature that requires login, registration, JWT, RBAC, permissions, sessions, or tenant-scoped access
version: 2.0
---

## Purpose

Authentication and authorization are security-critical and must never be left incomplete. This skill ensures every protected resource has correct auth, tenant, and permission checks.

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| `docs/005-auth.md` | Yes | Auth architecture |
| `docs/034-database-design.md` | Yes | Tenant isolation rules |
| `specs/<feature>/api-contract.md` | Yes | Which endpoints need auth + which permissions |

## Workflow

### Step 1 — Authentication

- **Strategy:** JWT Access Token (15m) + Refresh Token (30d, stored in Redis + httpOnly cookie or secure storage).
- **Password hashing:** Argon2 (never bcrypt without ADR, never plain text).
- **Login methods:** Email / Phone / Username (per `docs/005-auth.md`).
- **Token payload:** `{ sub: userId, tenantId, roles, permissions, iat, exp }` — never put secrets in JWT.
- **Refresh flow:** `POST /api/v1/auth/refresh` — validates refresh token in Redis, issues new access token, rotates refresh token.

### Step 2 — Authorization (RBAC + Permissions)

- **Roles:** e.g., `admin`, `manager`, `waiter`, `kitchen`, `cashier` — defined per tenant.
- **Permissions:** e.g., `orders:create`, `orders:read`, `products:delete` — granular, checked per endpoint.
- **Guards:**
  ```typescript
  @UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
  @RequirePermissions('orders:create')
  @Controller('orders')
  ```
- **TenantGuard:** Validates `tenantId` from JWT matches the requested resource's `tenantId`. Rejects cross-tenant access with 403.

### Step 3 — Every Protected Endpoint Must

1. Validate JWT (401 if missing/invalid/expired).
2. Validate tenant (403 if `tenantId` mismatch).
3. Validate permissions (403 if missing permission).
4. Audit log the action (who, what, when, tenant).

### Step 4 — Security Hardening

- Passwords: min 8, max 64, require upper + lower + number + special (validated via Zod/class-validator).
- Rate limit auth endpoints (login, refresh, register) — e.g., 5 req/min per IP.
- Lockout after N failed attempts (configurable, e.g., 5 in 15 min).
- Never return whether email exists on login failure (generic "Invalid credentials").
- Secrets via `ConfigService` + env vars. Never hardcoded.
- HTTPS only in production.

### Step 5 — Validation

```bash
# Manual checks
# 1. Login → get tokens → access protected route → success
# 2. Access protected route without token → 401
# 3. Access with wrong tenant → 403
# 4. Access without permission → 403
# 5. Expired token → 401, refresh → new token
# 6. Logout → refresh token invalidated in Redis
```

## Rules

1. **Every protected endpoint has 3 checks:** Auth + Tenant + Permissions. Missing one is a P0 defect.
2. **Tenant isolation is mandatory.** Every query filters by `tenantId` from JWT — never from client input.
3. **Never trust client-provided `tenantId`.** Always from JWT.
4. **Passwords never in logs, responses, or JWT.**
5. **Refresh tokens in Redis** (or DB with TTL), not in JWT alone.
6. **Audit every auth event:** login, logout, permission change, failed attempt.

## Output

- `backend/src/modules/auth/` — Strategies, guards, services, controllers
- `backend/src/common/guards/` — `JwtAuthGuard`, `RolesGuard`, `TenantGuard`
- `backend/src/common/decorators/` — `@CurrentUser()`, `@RequirePermissions()`, `@TenantId()`
- Prisma models: `User`, `Role`, `Permission`, `UserRole`, `RolePermission`, `Session`/`RefreshToken`

## Definition of Done

- [ ] JWT access + refresh flow working
- [ ] Password hashing with Argon2
- [ ] Every protected endpoint has JwtAuthGuard + TenantGuard + permission check
- [ ] Tenant isolation on every query
- [ ] Rate limiting on auth endpoints
- [ ] Audit logging for auth events
- [ ] No secrets hardcoded
- [ ] Tests for: login, refresh, 401, 403 (tenant), 403 (permission), logout
- [ ] Traceability Matrix updated
