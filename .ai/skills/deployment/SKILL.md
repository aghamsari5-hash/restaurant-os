# Skill — Deployment

---
name: deployment
description: Ensure the application builds, configures, and deploys correctly across all environments
when: Phase 10 (Production) and any task that touches Docker, env vars, CI/CD, or production readiness
version: 2.0
---

## Purpose

A feature that works locally but fails in production is not done. This skill ensures deployment is deterministic and verified.

## Workflow

### Step 1 — Environment Variables

- Every config value comes from `process.env` via `ConfigService` (backend) or `process.env.NEXT_PUBLIC_*` (frontend).
- No hardcoded URLs, secrets, or feature flags.
- `.env.example` is always up-to-date and documents every variable:

```env
# .env.example
DATABASE_URL=postgresql://user:pass@localhost:5432/restaurantos
REDIS_URL=redis://localhost:6379
JWT_SECRET=change-me-in-production-min-32-chars
JWT_REFRESH_SECRET=change-me-too
NEXT_PUBLIC_API_URL=http://localhost:3000
```

- Validate env at startup (e.g., `Joi` or `zod` schema in `ConfigModule`).

### Step 2 — Docker

```yaml
# docker-compose.yml — must work with one command
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: restaurantos
    volumes: [postgres_data:/var/lib/postgresql/data]
  redis:
    image: redis:7-alpine
  backend:
    build: ./backend
    depends_on: [postgres, redis]
    environment:
      DATABASE_URL: postgresql://...
  frontend:
    build: ./frontend
    depends_on: [backend]
```

- `docker compose up --build` must start the entire stack with no manual steps.
- Health checks for every service.
- Multi-stage Dockerfiles for minimal production images.

### Step 3 — Build Verification

```bash
# Must all pass before any deployment
cd backend && npm run build && npm run lint && npx prisma validate
cd frontend && npm run build && npm run lint
docker compose up --build -d && curl http://localhost:3000/health && docker compose down
```

### Step 4 — Production Checklist (Phase 10 Gate)

- [ ] `.env.example` complete and accurate
- [ ] No secrets in repo (scan: `gitleaks` or `trufflehog`)
- [ ] `docker compose up --build` works from clean clone
- [ ] Health endpoint (`GET /health`) returns `{ status, database, redis, version, uptime }`
- [ ] Swagger at `/api/docs` accessible
- [ ] Prisma migrations applied (`npx prisma migrate deploy`)
- [ ] Security headers (Helmet) enabled
- [ ] CORS configured for production domain
- [ ] Logging: structured, no PII/secrets, aggregated (ready for ELK/Datadog)
- [ ] Monitoring: health checks, uptime, error tracking (Sentry or equivalent — configured or documented)
- [ ] Backup strategy documented (DB dumps, retention)
- [ ] Rollback plan documented

### Step 5 — CI/CD (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: cd backend && npm ci && npm run lint && npm run build && npm run test
      - run: cd frontend && npm ci && npm run lint && npm run build
      - run: docker compose up --build -d && sleep 10 && curl -f http://localhost:3000/health
```

## Rules

1. **One-command startup.** `docker compose up --build` is the only setup required. No manual DB creation, no manual migrations.
2. **No secrets in repo.** Ever. Scan before every PR.
3. **Build must be green before merge.** No exceptions.
4. **Health endpoint mandatory.** Every deployment has `/health`.
5. **Migrations via `migrate deploy`** in production, never `migrate dev` or `db push`.

## Definition of Done

- [ ] `.env.example` complete
- [ ] `docker compose up --build` works from clean clone
- [ ] Build + Lint + Tests green
- [ ] Health + Swagger verified
- [ ] No secrets in repo
- [ ] Production checklist passed
- [ ] CI pipeline green (if configured)
