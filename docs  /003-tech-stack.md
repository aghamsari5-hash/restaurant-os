
# RestaurantOS Technology Stack

Version: 1.0

---

# Goal

Choose technologies that are:

- Stable
- Scalable
- AI Friendly
- Easy to Maintain
- Low Cost
- High Performance

---

# Backend

Framework

NestJS

Language

TypeScript

Runtime

Node.js LTS

---

# Frontend

Framework

Next.js 15

Language

TypeScript

UI

TailwindCSS

Components

shadcn/ui

Icons

Lucide Icons

Forms

React Hook Form

Validation

Zod

---

# Mobile

Future Version

Flutter

All communication through Backend API.

---

# Database

PostgreSQL

Rules:

- Relational Data
- ACID
- Transactions
- Indexing Required

---

# ORM

Prisma ORM

Reasons

- Type Safe
- Migration Support
- AI Friendly
- Excellent TypeScript Integration

---

# Cache

Redis

Used For

- Session
- OTP
- Dashboard Cache
- Feature Cache
- Rate Limiting

Never store permanent business data.

---

# Authentication

JWT

Refresh Token

Password Hash

bcrypt

Future

Two Factor Authentication

Google Login

Apple Login

---

# API

REST API

JSON

Versioning

/api/v1

Swagger Documentation Required

---

# Storage

Object Storage

Examples

MinIO

Cloudflare R2

AWS S3

Database stores only file path.

---

# Images

WebP Preferred

Lazy Loading

Compression Required

Thumbnail Generation

---

# Search

Version 1

PostgreSQL Search

Future

Meilisearch

Elasticsearch

---

# Queue

BullMQ

Redis Based

Used For

SMS

Email

Push

Reports

Backup

Image Processing

---

# Notifications

SMS

Email

Push Notification

WhatsApp (Future)

Telegram (Future)

---

# Printing

Network Printer

USB Printer

Windows Printer

Bluetooth Printer (Future)

Unlimited printers supported.

---

# Deployment

Docker

Docker Compose

Nginx

Linux Server

Ubuntu LTS

---

# Monitoring

Health Check API

Application Logs

Server Metrics

Database Monitoring

Future

Prometheus

Grafana

---

# CI/CD

GitHub

GitHub Actions

Automatic Testing

Automatic Deployment

---

# Testing

Unit Test

Integration Test

E2E Test

Critical modules must have tests.

---

# Security

Helmet

Rate Limit

Input Validation

Parameterized Queries

HTTPS

JWT

RBAC

Tenant Isolation

Audit Log

---

# Performance Targets

API Response

Average < 200ms

Dashboard

< 2 seconds

Website

Google Lighthouse > 90

Maximum API Calls Per Screen

5

---

# Coding Standards

TypeScript Strict Mode

ESLint

Prettier

Conventional Commits

Small Files

Small Functions

Reusable Components

No Duplicate Logic

---

# AI Development Rules

Project structure must remain predictable.

Module names must never change without documentation.

Every feature must include documentation.

Every API must include Swagger.

Every database change must be done using Prisma Migration.

Claude Code must never generate code outside the defined architecture.

---

# Future Integrations

SnapFood

ZarinPal

IDPay

PayPing

SMS Providers

Accounting Software

CRM

BI Tools

Open API
