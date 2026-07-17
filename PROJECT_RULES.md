# PROJECT_RULES.md

# RestaurantOS Project Rules

This document contains permanent project decisions.

Unlike CLAUDE.md, these rules define the software itself rather than how the AI should work.

These rules are considered permanent unless explicitly changed.

---

# Project Vision

RestaurantOS is an enterprise-grade Restaurant Management Platform.

The project must be suitable for:

- Single Restaurant
- Restaurant Chain
- Cloud SaaS
- Self Hosted
- White Label

---

# Core Principles

The project must always prioritize:

- Maintainability
- Scalability
- Security
- Performance
- Reliability

Never sacrifice architecture for speed.

---

# Multi Tenant

Multi-Tenant is mandatory.

Every business record belongs to exactly one tenant.

Tenant isolation is required at every layer.

Cross-tenant access is forbidden.

---

# Architecture

Mandatory Architecture:

- Clean Architecture
- DDD
- Modular Monolith
- Event Driven

Modules must remain independent.

---

# Module Communication

Modules communicate through:

- Application Services
- Domain Events

Never access another module's database directly.

---

# Database

Single PostgreSQL database.

Prisma ORM.

Migration based.

No schema synchronization.

---

# Authentication

JWT Access Token

Refresh Token

Role Based Access Control

Permission Based Authorization

Session Audit

Tenant Validation

---

# Authorization

Every protected endpoint must validate:

- Authentication
- Tenant
- Permissions

---

# Audit

Every critical action must be auditable.

Examples:

Login

Logout

Delete

Refund

Inventory Change

Permission Change

Configuration Change

---

# Notifications

Notification system must be event driven.

Supported channels:

- In-App
- Email
- SMS (future)
- Push (future)
- WhatsApp (future)

Notification providers must be replaceable.

---

# API

REST API.

Versioned endpoints.

Swagger documentation required.

Consistent response format.

---

# Error Handling

Use centralized exception handling.

Never expose internal stack traces.

---

# Validation

Every request must be validated.

Never trust client input.

---

# Orders

Order is the heart of the system.

Every order must belong to:

Tenant

Branch

Customer (optional)

Table (optional)

Order Type

Status

Payment Status

Created By

---

# Payments

Support multiple payment methods.

Payment history must never be deleted.

Refunds must remain traceable.

---

# Inventory

Inventory changes are immutable.

Use stock movement history.

Never overwrite stock history.

---

# Kitchen

Kitchen receives events.

Kitchen never directly changes orders.

Kitchen updates workflow through application layer.

---

# Customers

Customer history must remain permanent.

Soft delete only.

---

# Products

Products may contain:

Variants

Modifiers

Recipes

Categories

Images

Availability Rules

---

# Reports

Reports are read-only.

Never calculate historical values from modified data.

Historical accuracy is mandatory.

---

# Security

Passwords:

Argon2

JWT secrets from environment variables.

HTTPS required in production.

No hardcoded secrets.

---

# Logging

Structured logging.

Every error logged.

Sensitive information must never be logged.

---

# Docker

Entire system must run through Docker Compose.

No manual setup required.

---

# Testing

Critical business logic requires tests.

Infrastructure code may have lighter coverage.

---

# Performance

Optimize database queries.

Avoid N+1.

Use caching where appropriate.

---

# Definition of Production Ready

Production Ready means:

No TODO

No placeholder

No mock business logic

No hardcoded secrets

No TypeScript errors

No lint errors

Successful build

Docker works

Swagger works

Health endpoint works

Environment variables documented

---

# Future Compatibility

Architecture must support future modules without breaking existing ones.

Examples:

CRM

Loyalty

Accounting

Delivery

POS Hardware

AI

Marketplace

Mobile Apps

---

# Golden Rule

If implementation conflicts with these rules:

Follow PROJECT_RULES.md

If PROJECT_RULES.md conflicts with documentation:

Follow documentation.

Documentation remains the source of truth.

End of File
