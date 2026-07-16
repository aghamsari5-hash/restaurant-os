
# RestaurantOS Folder Structure

Version: 1.0

---

# Goal

The project structure must remain stable.

Claude Code must always create files inside this structure.

No developer may create arbitrary folders.

---

# Root

restaurant-os/

README.md

CLAUDE.md

ROADMAP.md

.env.example

.gitignore

docker-compose.yml

---

# Main Directories

backend/

frontend/

docs/

docker/

scripts/

.github/

---

# Backend

backend/

src/

prisma/

test/

docs/

package.json

tsconfig.json

nest-cli.json

Dockerfile

README.md

---

# Backend Source

src/

main.ts

app.module.ts

config/

common/

core/

modules/

shared/

database/

events/

queue/

cache/

middlewares/

guards/

decorators/

filters/

interceptors/

pipes/

utils/

types/

interfaces/

constants/

---

# Modules

Every business feature lives inside

modules/

Example

modules/

auth/

users/

roles/

permissions/

tenant/

products/

categories/

inventory/

orders/

customers/

tables/

waiters/

kds/

reports/

accounting/

delivery/

drivers/

website/

notifications/

settings/

dashboard/

files/

audit/

feature-manager/

---

# Module Structure

Every module MUST use this structure.

module-name/

controller/

service/

repository/

dto/

entities/

interfaces/

events/

validators/

mappers/

constants/

tests/

README.md

index.ts

No exceptions.

---

# DTO

Only request and response models.

No business logic.

---

# Service

Business logic only.

No database queries.

---

# Repository

Database access only.

No business logic.

---

# Controller

Receive Request

Validate

Call Service

Return Response

Nothing else.

---

# Events

One file per event.

Example

order-created.event.ts

product-updated.event.ts

customer-created.event.ts

---

# Shared

Shared contains reusable code only.

Logger

Cache

Helpers

Validators

Exceptions

Config

Base Classes

No restaurant logic allowed.

---

# Config

config/

database.config.ts

redis.config.ts

jwt.config.ts

storage.config.ts

app.config.ts

feature.config.ts

---

# Database

database/

migrations/

seed/

factories/

repositories/

---

# Prisma

prisma/

schema.prisma

migrations/

seed.ts

---

# Frontend

frontend/

app/

components/

hooks/

services/

stores/

types/

utils/

public/

styles/

assets/

config/

middleware/

---

# Frontend Components

components/

ui/

layout/

dashboard/

forms/

tables/

cards/

charts/

dialogs/

modals/

buttons/

inputs/

---

# API Layer

services/

auth/

products/

orders/

inventory/

reports/

dashboard/

customers/

settings/

Each module has its own API client.

---

# State

stores/

auth.store.ts

cart.store.ts

settings.store.ts

tenant.store.ts

---

# Documentation

docs/

001-project.md

002-architecture.md

003-tech-stack.md

004-database.md

005-auth.md

006-api.md

007-folder-structure.md

008-module-system.md

009-feature-manager.md

...

---

# Docker

docker/

development/

production/

nginx/

postgres/

redis/

backup/

---

# Scripts

scripts/

backup/

restore/

deploy/

seed/

lint/

test/

---

# GitHub

.github/

workflows/

ISSUE_TEMPLATE/

PULL_REQUEST_TEMPLATE.md

---

# Naming Rules

Folders

kebab-case

Files

kebab-case

Classes

PascalCase

Variables

camelCase

Constants

UPPER_SNAKE_CASE

Database

snake_case

---

# Import Rules

Always use absolute imports.

Never use long relative imports.

Bad

../../../../service

Good

@modules/orders

---

# File Size

Maximum

300 Lines

Preferred

150 Lines

Large files must be split.

---

# Function Size

Maximum

50 Lines

Preferred

25 Lines

---

# AI Rules

Claude Code must never:

Create folders outside this document.

Move modules without documentation.

Duplicate modules.

Create generic "helpers" folders inside modules.

Mix business logic with infrastructure.

---

# Future Modules

Loyalty

CRM

Marketing

Campaigns

AI Assistant

Business Intelligence

Marketplace

POS Devices

Accounting Integrations

Can be added without changing folder structure.

---

# Final Rule

Folder structure is part of the architecture.

Changing it requires updating the documentation before changing the code.
