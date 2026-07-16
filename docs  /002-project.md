# RestaurantOS Architecture

Version: 1.0

---

# Architecture Style

Clean Architecture

Modular Monolith

API First

Multi Tenant

Backend First

Cloud Native

---

# Why Modular Monolith?

RestaurantOS is expected to support hundreds of restaurants.

A Modular Monolith provides:

- Faster development
- Easier debugging
- Lower server costs
- Easier deployment
- Future migration to Microservices if needed

Microservices are NOT allowed in Version 1.

---

# Layers

Presentation Layer

↓

Application Layer

↓

Domain Layer

↓

Infrastructure Layer

Each layer must have only one responsibility.

---

# Modules

Core

Authentication

Tenant

Users

Roles

Permissions

Feature Manager

Products

Categories

Inventory

Orders

POS

Tables

Kitchen (KDS)

Customers

Reports

Accounting

Delivery

Drivers

QR Menu

Website

Notifications

Printers

Dashboard

Settings

Files

Audit

Backup

---

# Module Rules

Every module must be independent.

Every module has:

Controller

Service

Repository

DTO

Entity

Validation

Events

Documentation

Tests

No module may access another module's database directly.

---

# Communication

Preferred:

Event Driven

Example:

Order Created

↓

Inventory Module

↓

Kitchen Module

↓

Printer Module

↓

Reports Module

Modules react to events.

Modules should not call each other directly unless absolutely necessary.

---

# Shared Core

Shared contains:

Logger

Cache

Config

Database

Utilities

Constants

Base Classes

Exceptions

Validation

Nothing business-specific belongs here.

---

# API

REST API

JSON only

Versioned API

/api/v1

Future:

/api/v2

Never break previous versions.

---

# Database

One PostgreSQL instance.

Every table MUST contain:

id

tenant_id

created_at

updated_at

deleted_at

No table is allowed without tenant_id except system tables.

---

# Authentication

JWT

Refresh Token

Role Based Access

Permission Based Access

Tenant Isolation

---

# Feature Toggle

Every module can be enabled or disabled.

Examples:

Online Ordering

Inventory

Delivery

Accounting

Kitchen Display

QR Menu

Waiter

Reports

Disabling a module must not require code changes.

---

# Storage

Images

Invoices

Attachments

Stored in Object Storage.

Database stores only file paths.

---

# Cache

Redis

Use for:

Sessions

OTP

Dashboard

Reports

Frequently requested data

Never cache sensitive information.

---

# Logging

Every important action must generate a log.

Examples:

Login

Logout

Order Created

Order Cancelled

Inventory Updated

Price Changed

User Deleted

Logs are immutable.

---

# Background Jobs

Use Queue for:

SMS

Email

Push Notifications

Report Generation

Backup

Image Processing

No long-running task may block an API request.

---

# Security

JWT

HTTPS

Rate Limit

Input Validation

SQL Injection Protection

XSS Protection

CSRF Protection (where applicable)

Soft Delete

Audit Trail

---

# Performance Rules

Maximum 5 API requests per page.

Pagination is mandatory.

Lazy Loading is mandatory.

Database indexing required.

Avoid N+1 queries.

Target response time:

Average < 200ms

---

# Scalability

The architecture must support:

1 Restaurant

10 Restaurants

100 Restaurants

1000 Restaurants

Without redesign.

---

# Future Ready

The following should be possible without rewriting the project:

Mobile App

Multiple Languages

Multiple Currencies

Multiple Branches

Franchise Management

Online Payment

AI Assistant

Business Intelligence

Marketplace Integration

Third-party APIs

