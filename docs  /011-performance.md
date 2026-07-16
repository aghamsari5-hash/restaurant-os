# RestaurantOS Performance Standards

Version: 1.0

---

# Goal

RestaurantOS must feel fast under all conditions.

Performance is a core feature.

New features must never reduce system speed.

---

# Performance Philosophy

Speed over complexity.

Simple solutions are preferred.

Avoid unnecessary processing.

Every millisecond matters.

---

# Response Time Targets

Authentication

< 150 ms

CRUD Operations

< 200 ms

Dashboard

< 2 Seconds

Search

< 300 ms

Reports

< 5 Seconds

Large Reports

Run as Background Job

---

# API Rules

Maximum

5 API Requests

per page.

If more data is required,

the backend must provide a combined endpoint.

Never create multiple requests for the same data.

---

# Database Rules

Never use

SELECT *

Always request required columns.

Always use indexes.

Always paginate.

Avoid nested queries.

Avoid duplicate queries.

---

# Pagination

Required for every list.

Default

20 Records

Maximum

100 Records

Infinite scrolling is optional.

---

# Search

Debounce

300 ms

Use indexed columns.

Never search inside JSON fields.

Future support:

Full Text Search

Meilisearch

---

# Caching

Redis First

Database Second

Cache:

Dashboard

Products

Categories

Feature Flags

Settings

Website

QR Menu

Do NOT cache:

Passwords

JWT

Permissions

Sensitive Financial Data

---

# Cache Expiration

Dashboard

60 Seconds

Products

300 Seconds

Categories

300 Seconds

Settings

600 Seconds

Feature Flags

60 Seconds

Configurable.

---

# Images

Use WebP

Generate Thumbnails

Lazy Loading

Compression Required

Maximum Upload Size configurable.

---

# Frontend Performance

Lazy Load Pages

Lazy Load Images

Lazy Load Charts

Virtual Lists

Code Splitting

Prefetch Important Pages

---

# Dashboard

Load summary first.

Charts load after summary.

Heavy calculations must never run on page load.

---

# Reports

Generate asynchronously.

Notify user when ready.

Never block the UI.

---

# Background Jobs

Move heavy tasks to Queue.

Examples

Backup

Report Generation

SMS

Email

Image Processing

Inventory Recalculation

---

# Queue

BullMQ

Redis

Retry Supported

Priority Supported

Dead Letter Queue Supported

---

# Database Transactions

Use transactions only when required.

Avoid long-running transactions.

Keep transaction time minimal.

---

# Logging

Log only important events.

Never log every request in production.

Support log levels:

Error

Warning

Info

Debug

Production default:

Warning

Error

---

# Monitoring

Health Endpoint

CPU Usage

Memory Usage

Database Connections

Redis Status

Queue Status

Disk Usage

Response Time

---

# Memory Usage

Avoid loading large datasets.

Stream large exports.

Release unused objects.

Prevent memory leaks.

---

# File Processing

Use streaming.

Avoid loading entire files into memory.

Support large CSV imports.

---

# Printing

Printing must not block POS.

Failed printers must not stop order processing.

Print jobs handled asynchronously.

---

# Website Performance

Google Lighthouse

Minimum Score

90

First Contentful Paint

< 2 Seconds

Largest Contentful Paint

< 2.5 Seconds

---

# Mobile Performance

Cold Start

< 3 Seconds

Navigation

Instant

Offline cache where applicable.

---

# Feature Manager

Disabled features must not:

Load APIs

Consume Memory

Initialize Services

Register Events

Hidden feature = Zero overhead.

---

# Event System

Use events instead of direct module calls whenever possible.

Avoid synchronous chains.

---

# Database Index Rules

Index:

tenant_id

status

created_at

phone

barcode

sku

email

order_number

Foreign Keys

Review indexes regularly.

---

# N+1 Query Prevention

Always eager load only required relations.

Never execute queries inside loops.

---

# Compression

Enable Gzip/Brotli.

Compress JSON responses.

Compress static assets.

---

# Security Performance

Rate Limiting

Redis Based

Permission Cache

Redis Based

Feature Cache

Redis Based

JWT Validation

Stateless

---

# Scalability

Support:

1 Restaurant

10 Restaurants

100 Restaurants

1000 Restaurants

Without architecture changes.

---

# Deployment

Docker

Nginx

PostgreSQL

Redis

Object Storage

Horizontal scaling supported.

---

# Performance Budget

API

< 200 ms

Search

< 300 ms

Dashboard

< 2 s

Database Query

< 100 ms

Cache Lookup

< 10 ms

Feature Check

< 5 ms

Permission Check

< 20 ms

---

# AI Rules

Claude Code must never:

Create endpoints causing N+1 queries.

Use SELECT *.

Skip pagination.

Load unnecessary relations.

Perform expensive calculations during requests.

Block requests with long-running operations.

Ignore Redis caching opportunities.

Exceed 5 API requests per page.

---

# Final Rule

Every new feature must be benchmarked against these standards.

If a feature reduces performance,

it must be optimized before merging into the project.
