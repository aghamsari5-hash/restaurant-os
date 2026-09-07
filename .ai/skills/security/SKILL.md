# Skill — Security

---
name: security
description: Enforce security invariants across every feature — always active as a reviewer
when: Every feature (mandatory reviewer). Explicitly triggered on auth, payments, PII, file uploads, and any external input
version: 2.0
---

## Purpose

Security is not a phase — it is a continuous invariant. This skill is both a builder (when implementing security features) and a reviewer (for every feature).

## Security Invariants (Never Violate)

| # | Invariant | Severity |
|---|-----------|----------|
| 1 | No hardcoded secrets, passwords, API keys | P0 |
| 2 | Every query filters by `tenantId` | P0 |
| 3 | Every protected endpoint checks Auth + Tenant + Permissions | P0 |
| 4 | Every input validated (client + server) | P0 |
| 5 | No sensitive data in logs, URLs, or client bundles | P0 |
| 6 | Passwords hashed with Argon2, never plain text | P0 |
| 7 | No stack traces or internal errors exposed to client | P1 |
| 8 | Rate limiting on auth + public endpoints | P1 |
| 9 | CORS, Helmet, and security headers configured | P1 |
| 10 | Dependencies scanned for vulnerabilities | P1 |

## Workflow — As Builder

### Step 1 — Threat Model (for the feature)

- What are the assets? (user data, payments, tenant data)
- What are the threats? (injection, XSS, CSRF, IDOR, tenant leakage, brute force)
- What are the mitigations? (validation, guards, rate limiting, parameterized queries)

Document in `specs/<feature>/security-notes.md` if the feature is high-risk (auth, payments, file uploads).

### Step 2 — Implementation Checklist

- [ ] Input validation: `class-validator` / Zod on every DTO, plus domain invariants
- [ ] SQL injection: Prisma parameterized queries only, no raw SQL without review
- [ ] XSS: No `dangerouslySetInnerHTML` without sanitization (DOMPurify), CSP headers
- [ ] CSRF: SameSite cookies, CSRF tokens if using cookies for auth
- [ ] IDOR: Every resource access checks ownership + tenant
- [ ] Auth: JWT validation, tenant guard, permission guard
- [ ] Secrets: `ConfigService` + env vars, `.env.example` updated, `.env` in `.gitignore`
- [ ] Headers: `helmet` middleware, `HSTS`, `X-Frame-Options`, `X-Content-Type-Options`
- [ ] Rate limiting: `ThrottlerModule` on auth + sensitive endpoints
- [ ] Logging: No PII/secrets in logs, structured logger

## Workflow — As Reviewer

For EVERY feature (even non-security features), review:

1. Does any query miss `tenantId` filter? → **BLOCK**
2. Does any endpoint miss validation? → **BLOCK**
3. Does any protected endpoint miss auth/tenant/permission? → **BLOCK**
4. Are secrets hardcoded? → **BLOCK**
5. Is user input interpolated into queries/HTML? → **BLOCK**
6. Are errors exposing internals? → **REQUEST CHANGES**

Produce `specs/<feature>/security-review.md` with: `PASS` / `PASS WITH NOTES` / `BLOCK`.

## Rules

1. **Tenant isolation is P0.** Missing `tenantId` filter is always a blocking issue.
2. **Never trust client input.** Validate at the boundary (DTO) and in the domain.
3. **Fail closed.** If auth/tenant check fails, deny access. Never default to allow.
4. **Least privilege.** Permissions are deny-by-default; grant explicitly.
5. **Defense in depth.** Client validation + server validation + domain invariants + DB constraints.

## Output

- Security notes in `specs/<feature>/security-notes.md` (for high-risk features)
- Security review in `specs/<feature>/security-review.md` (for every feature)
- Code changes to fix blocking issues

## Definition of Done

- [ ] All P0 invariants satisfied
- [ ] Security review produced with `PASS` or `PASS WITH NOTES`
- [ ] No blocking issues remaining
- [ ] Traceability Matrix updated (Security column green)
