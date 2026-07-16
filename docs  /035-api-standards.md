# RestaurantOS API Standards

Version: 1.0

---

# Purpose

This document defines the API standards for RestaurantOS.

Every API endpoint must follow these rules.

Consistency is more important than personal preference.

---

# API Style

REST API

JSON

HTTPS Only

OpenAPI 3.x

Versioned APIs

Stateless

---

# Base URL

/api/v1

Example

/api/v1/products

/api/v1/orders

/api/v1/customers

---

# Resource Naming

Use plural nouns.

Correct

/products

/orders

/customers

/payments

Wrong

/getProducts

/createOrder

/customerList

---

# HTTP Methods

GET

Read

POST

Create

PATCH

Partial Update

PUT

Full Replace (Rare)

DELETE

Soft Delete Only

---

# Content Type

Request

application/json

Response

application/json

UTF-8

---

# Authentication

Bearer Token (JWT)

Authorization

Bearer <token>

Authentication required unless endpoint is public.

---

# API Versioning

Version in URL

/api/v1

Future

/api/v2

Never break previous versions.

---

# Standard Success Response

{
  "success": true,
  "data": {},
  "meta": {},
  "timestamp": "2026-01-01T10:00:00Z"
}

---

# Standard Error Response

{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product not found"
  },
  "timestamp": "2026-01-01T10:00:00Z",
  "correlationId": "uuid"
}

---

# HTTP Status Codes

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

429 Too Many Requests

500 Internal Server Error

---

# Pagination

Query

?page=1

&pageSize=20

Response

page

pageSize

totalItems

totalPages

hasNext

hasPrevious

---

# Sorting

?sort=name

?sort=-createdAt

Multiple sorting supported.

---

# Filtering

Examples

?status=ACTIVE

?category=pizza

?branch=main

?customer=uuid

Multiple filters supported.

---

# Searching

?q=burger

?q=john

?q=pepperoni

Full-text search future ready.

---

# Field Selection

Optional

?fields=id,name,price

Reduces payload size.

---

# Includes

Optional

?include=category

?include=customer

?include=payments

Prevent unnecessary requests.

---

# Idempotency

POST

Supports Idempotency-Key

Required for

Payments

Refunds

Purchases

Prevent duplicate operations.

---

# Validation

All requests validated.

DTO Validation

Business Validation

Permission Validation

Tenant Validation

Validation occurs before business logic.

---

# Correlation ID

Every request receives

Correlation ID

Returned in response headers.

Used for tracing.

---

# Headers

Authorization

Content-Type

Accept

X-Correlation-ID

X-Tenant-ID (Internal)

Idempotency-Key

---

# Rate Limiting

Authentication

100 requests/minute

Public APIs

20 requests/minute

Configurable.

---

# File Upload

Multipart Form Data

Metadata stored in database.

Files stored externally.

---

# Date Format

ISO-8601 UTC

Example

2026-05-12T14:30:00Z

---

# Money

Decimal

Currency separated.

Never use floating-point.

---

# UUID

Every resource uses UUID.

Sequential IDs forbidden.

---

# Error Codes

Validation Error

Authentication Error

Authorization Error

Business Rule Error

Conflict Error

Unexpected Error

Standardized across all modules.

---

# Documentation

Every endpoint documented.

OpenAPI required.

Examples required.

Request schema required.

Response schema required.

---

# API Security

JWT

HTTPS

Permission Validation

Tenant Isolation

Input Validation

Output Filtering

Audit Logging

---

# Performance

Target Response

<200ms

Heavy endpoints

Background processing

Caching where applicable.

---

# API Lifecycle

Design

↓

Review

↓

Implementation

↓

Testing

↓

Documentation

↓

Release

↓

Monitoring

---

# Logging

Every request logs

Method

URL

Duration

Status

Tenant

User

Correlation ID

Errors

---

# AI Development Rules

Claude Code must

Follow REST conventions.

Use consistent responses.

Validate every request.

Never expose internal errors.

Never expose stack traces.

Always document endpoints.

Always use DTOs.

Always include tenant validation.

Always include authorization.

---

# Future Ready

GraphQL

gRPC

Public API

Webhook API

SDK Generation

API Gateway

No redesign required.

---

# Final Rule

Every API must be predictable, secure, versioned and fully documented.

Consistency across all endpoints is mandatory.
