# Sprint 001 — Project Bootstrap

## Goal

Initialize the RestaurantOS project foundation.

Do NOT implement any business modules.

Read first:

docs/031-architecture-overview.md

docs/034-database-design.md

docs/035-api-standards.md

docs/036-backend-coding-standards.md

docs/037-frontend-coding-standards.md

docs/039-deployment-architecture.md

docs/040-claude-code-development-guide.md

Architecture documentation has priority over this prompt.

---

# General Rules

- Production Ready Code
- No TODO
- No Placeholder
- No Fake Code
- TypeScript Strict
- Clean Architecture
- DDD
- Modular Structure
- Docker Ready
- Multi Tenant Ready

---

# Task 1

Create project folders.

Create:

backend/

frontend/

packages/

docker/

infra/

.github/

scripts/

---

# Task 2

Initialize Backend.

Requirements

NestJS latest

TypeScript

ESLint

Prettier

Swagger

Jest

Strict mode enabled

Do not create business modules.

---

# Task 3

Initialize Frontend.

Requirements

Next.js latest

App Router

TypeScript

Tailwind

ESLint

Prettier

shadcn/ui ready

TanStack Query installed

Zustand installed

Do not create application pages.

---

# Task 4

Create Docker infrastructure.

Required files

docker-compose.yml

Dockerfile (backend)

Dockerfile (frontend)

.env.example

Containers

postgres

redis

backend

frontend

Volumes configured.

---

# Task 5

Initialize Prisma.

Database

PostgreSQL

Generate initial schema.

Do not create business tables.

Only infrastructure.

---

# Task 6

Create Shared Infrastructure.

Backend folders

config/

common/

logger/

exceptions/

guards/

decorators/

middlewares/

interceptors/

filters/

health/

No business logic.

---

# Task 7

Configure Swagger.

Swagger endpoint

/api/docs

Title

RestaurantOS API

Version

v1

---

# Task 8

Create Health Check.

Endpoint

GET /health

Response

status

database

redis

version

uptime

---

# Task 9

Configure Environment.

Create

.env.example

Configuration Service

Environment validation

No hardcoded values.

---

# Task 10

Verify Project.

Ensure

Backend builds successfully

Frontend builds successfully

Docker starts

Swagger works

Health endpoint works

Prisma generates successfully

No lint errors

No TypeScript errors

No failing tests

---

# Output

Modify only necessary files.

Generate production-ready code.

When finished, stop.

Do not continue with Authentication.

Do not continue with Users.

Wait for the next Sprint.
