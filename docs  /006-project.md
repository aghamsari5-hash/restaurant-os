
# RestaurantOS API Standards

Version: 1.0

---

# Goal

Every API in RestaurantOS must be:

- Fast
- Predictable
- Secure
- Versioned
- Documented
- AI Friendly

---

# API Style

REST API

JSON Only

UTF-8

HTTPS Only

---

# Base URL

/api/v1

Examples

/api/v1/products

/api/v1/orders

/api/v1/customers

---

# Versioning

Current

v1

Future

v2

Never break previous API versions.

---

# HTTP Methods

GET

Read

POST

Create

PUT

Replace

PATCH

Partial Update

DELETE

Soft Delete Only

---

# Response Format

Every API returns:

success

message

data

meta

errors

Example

{
  "success": true,
  "message": "Product created successfully.",
  "data": {},
  "meta": {},
  "errors": null
}

---

# Error Format

Example

{
  "success": false,
  "message": "Validation failed.",
  "data": null,
  "errors": [
    {
      "field": "price",
      "message": "Price is required."
    }
  ]
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

# Authentication

Bearer Token

Authorization:

Bearer JWT_TOKEN

---

# Tenant Validation

Every authenticated request validates:

tenant_id

No exception.

---

# Permission Validation

Every endpoint must define:

Permission Required

Feature Required

Authentication Required

Public or Private

---

# Pagination

Mandatory.

Example

?page=1&limit=20

Response

page

limit

total

total_pages

---

# Sorting

Example

?sort=name

?sort=-price

Ascending

Descending

---

# Filtering

Example

?status=ACTIVE

?category=Pizza

?available=true

Multiple filters allowed.

---

# Search

Example

?q=burger

Full Text Search Ready.

---

# Field Selection

Example

?fields=id,name,price

Avoid unnecessary data transfer.

---

# Include Relations

Example

?include=category

?include=customer

?include=items

Only requested relations should be loaded.

---

# Bulk Operations

Supported

Bulk Update

Bulk Delete

Bulk Status Change

Must use database transaction.

---

# Upload

Multipart

Maximum Size configurable.

Allowed

Images

PDF

CSV

Future

Excel

---

# Download

CSV

Excel

PDF

Streaming preferred.

---

# Idempotency

Required for:

Payment

Refund

Order Creation

Prevent duplicate requests.

---

# Rate Limiting

Public APIs

60 requests/minute

Authenticated APIs

300 requests/minute

Configurable.

---

# Caching

Allowed

Products

Categories

Website

QR Menu

Dashboard

Never cache:

JWT

Permissions

Sensitive Information

---

# Validation

Backend validation mandatory.

Frontend validation is optional.

---

# Logging

Log

Execution Time

Status Code

Endpoint

User

Tenant

IP

Errors

Never log passwords or tokens.

---

# Documentation

Every endpoint must have Swagger documentation.

Required

Summary

Description

Parameters

Request Body

Response

Errors

Permission

Feature Dependency

---

# Naming Rules

Plural Resources

/products

/orders

/customers

English Only

snake_case for query parameters

---

# API Performance

Maximum response time

200ms

Maximum page API calls

5

Pagination always required.

---

# Events

After successful operations publish events.

Examples

ProductCreated

OrderCreated

OrderCancelled

InventoryUpdated

CustomerCreated

Modules communicate through events whenever possible.

---

# AI Rules

Claude Code must never:

Create undocumented endpoints.

Return inconsistent response formats.

Skip validation.

Skip permission checks.

Skip tenant validation.

Create endpoints without Swagger.

---

# Future

GraphQL

Public API Keys

Webhook Support

Partner API

Marketplace API

Mobile SDK
