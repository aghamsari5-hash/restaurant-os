# Security Rules — RestaurantOS

> Detailed security rules. Summary in `CONSTITUTION.md` Articles V and invariants in Security Skill.

---

## 1. Authentication

- JWT Access (15m) + Refresh (30d, Redis).
- Argon2 for passwords.
- Rate limiting on auth endpoints (5 req/min/IP).

## 2. Authorization

- Every protected endpoint: `JwtAuthGuard` + `TenantGuard` + `RolesGuard` / `@RequirePermissions()`.
- Deny by default, grant explicitly.

## 3. Tenant Isolation (P0)

- Every business table has `tenantId`.
- Every query filters by `tenantId` from JWT.
- Cross-tenant access is a P0 defect — always BLOCK.

## 4. Input Validation

- Every input validated: DTO (`class-validator`) + domain invariants + DB constraints.
- Never trust client input.

## 5. Secrets

- Never hardcoded. Always via `ConfigService` + env vars.
- `.env` in `.gitignore`, `.env.example` always up-to-date.
- Scan before every PR (`gitleaks` / `trufflehog`).

## 6. Headers & Transport

- `helmet` middleware (HSTS, X-Frame-Options, etc.).
- HTTPS only in production.
- CORS configured for production domain.

## 7. Logging

- No secrets, PII, or sensitive fields in logs.
- No stack traces to client — generic error messages.

## 8. Dependencies

- `npm audit` in CI.
- Update vulnerable deps promptly.
