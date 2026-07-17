# CLAUDE.md

# RestaurantOS Development Rules

This document defines the mandatory development rules for every AI agent working on this repository.

The documentation inside the `/docs` directory is the single source of truth.

Never ignore project documentation.

---

# Project Goal

Build a production-ready Restaurant Management Platform.

This project is intended for real-world commercial use.

Code quality is more important than speed.

---

# Source of Truth

Always read documentation before implementation.

Priority:

1. docs/
2. Current Sprint Prompt
3. Existing Source Code

Never invent architecture.

---

# Architecture

Mandatory:

- Clean Architecture
- Domain Driven Design (DDD)
- Modular Monolith
- Event Driven Architecture
- SOLID
- Dependency Injection
- Repository Pattern
- CQRS Ready
- Multi Tenant Ready

Never violate architecture.

---

# Technology Stack

Backend

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Redis

Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- TanStack Query
- Zustand

Infrastructure

- Docker
- Docker Compose

---

# General Rules

Always generate production-ready code.

Never generate:

- TODO
- FIXME
- Placeholder
- Dummy implementation
- Mock business logic

Everything must compile.

---

# TypeScript

Always use strict mode.

No "any".

Prefer explicit types.

Use readonly whenever possible.

---

# Clean Code

Small functions.

Small classes.

Single Responsibility Principle.

Meaningful names.

No duplicated logic.

No dead code.

---

# Folder Structure

Respect existing project structure.

Never move folders unless explicitly requested.

Never rename modules.

---

# Documentation

Do not modify documentation unless requested.

Documentation is considered stable.

---

# Business Logic

Never implement business logic outside domain/application layers.

No business logic inside controllers.

No business logic inside DTOs.

---

# Controllers

Controllers should only:

- Validate request
- Call application service
- Return response

Nothing else.

---

# Services

Application services coordinate use cases.

Do not place infrastructure code here.

---

# Domain

Domain contains:

Entities

Value Objects

Aggregates

Domain Services

Domain Events

Business Rules

---

# Infrastructure

Infrastructure contains:

Database

Redis

Mail

Notifications

External APIs

Storage

Logging

Nothing else.

---

# Database

Use Prisma.

No raw SQL unless required.

Always use migrations.

Never drop production tables.

---

# API

REST API.

Swagger required.

Versioned endpoints.

Consistent response format.

Validation required.

---

# Validation

Validate every input.

Never trust client input.

---

# Authentication

JWT

Refresh Token

RBAC

Permission Based Authorization

Audit Logging

Tenant Validation

---

# Security

Never expose secrets.

Never hardcode passwords.

Never hardcode API keys.

Always validate permissions.

Always validate tenant.

---

# Multi Tenant

Tenant isolation is mandatory.

Never leak data across tenants.

Every query must respect tenant context.

---

# Logging

Structured logging.

No console.log.

Errors must contain enough diagnostic information.

---

# Error Handling

Use global exception filters.

Never swallow exceptions.

Return meaningful errors.

---

# Notifications

Notification system must be event-driven.

Never tightly couple modules.

---

# Frontend

App Router.

Server Components where appropriate.

Client Components only when required.

Reusable components.

Responsive UI.

Accessible UI.

---

# UI

No inline styles.

Use Tailwind.

Use shadcn/ui.

Consistent spacing.

Consistent typography.

---

# Performance

Avoid unnecessary queries.

Avoid N+1 queries.

Lazy load where appropriate.

Cache expensive operations.

---

# Testing

Generate tests whenever practical.

Keep tests deterministic.

No flaky tests.

---

# Docker

Project must run using Docker Compose.

No manual setup required.

---

# Environment Variables

Never hardcode configuration.

Everything configurable through environment variables.

Provide .env.example.

---

# Git

Keep changes focused.

Never modify unrelated files.

Prefer small logical commits.

---

# Sprint Rules

Only execute the current sprint.

Never continue into the next sprint.

Stop after completing assigned work.

---

# When Documentation Is Missing

Do not guess.

Stop.

Ask for clarification.

---

# Output Requirements

At the end of every sprint provide:

- Files created
- Files modified
- Breaking changes
- Remaining risks

Then stop.

Wait for the next sprint.

---

# Definition of Done

A task is complete only if:

- Builds successfully
- No TypeScript errors
- No lint errors
- Docker works
- Prisma works
- Swagger works
- Tests pass (if applicable)
- Documentation remains valid

Otherwise the task is NOT complete.

---

End of CLAUDE.md
