
# RestaurantOS Module System

Version: 1.0

---

# Goal

Every feature in RestaurantOS must be developed as an independent module.

A module can be:

Enabled

Disabled

Installed

Updated

Tested

Documented

Without affecting other modules.

---

# Definition

A module is a self-contained business feature.

Examples

Authentication

Products

Orders

Inventory

Kitchen

Reports

Customers

Website

QR Menu

---

# Module Rules

Every module must:

Have one responsibility.

Be independent.

Have its own API.

Have its own documentation.

Have its own tests.

Support Feature Toggle.

Never access another module's database directly.

---

# Standard Structure

modules/

module-name/

controller/

service/

repository/

dto/

entities/

validators/

events/

interfaces/

mappers/

constants/

tests/

README.md

index.ts

Every module must follow this structure.

No exceptions.

---

# Controller

Responsibilities

Receive Request

Validate Request

Call Service

Return Response

Controller must never contain business logic.

---

# Service

Responsibilities

Business Logic

Transactions

Workflow

Calling repositories

Publishing events

Service must never return HTTP responses.

---

# Repository

Responsibilities

Database Access

Queries

Filtering

Pagination

Repository must never contain business rules.

---

# DTO

Contains

Request DTO

Response DTO

Validation

Transformation

DTO must never access database.

---

# Entity

Represents database models.

No business logic.

---

# Validators

Contains custom validators.

No database queries.

---

# Events

Every important action publishes an event.

Examples

ProductCreated

ProductUpdated

OrderCreated

OrderCancelled

InventoryChanged

---

# Event Communication

Preferred

Module A

↓

Publish Event

↓

Event Bus

↓

Module B

↓

Module C

↓

Module D

Avoid direct service-to-service dependency whenever possible.

---

# Public API

Each module exposes only public services.

Internal implementation stays private.

---

# Feature Toggle

Every module must check

Feature Enabled?

If disabled

Return Feature Disabled response.

Never execute business logic.

---

# Dependencies

Allowed

Shared

Core

Database

Cache

Events

Forbidden

Products importing Orders Service

Orders importing Inventory Repository

Reports importing Kitchen Controller

Always communicate through interfaces or events.

---

# Configuration

Every module owns its own configuration.

Example

Products

Max Images

Barcode Enabled

Variants Enabled

Stock Tracking

---

# Database Ownership

Every table belongs to exactly one module.

Examples

products

Products Module

orders

Orders Module

customers

Customers Module

No shared ownership.

---

# API Ownership

Every endpoint belongs to one module.

Examples

/api/v1/products

Products Module

/api/v1/orders

Orders Module

Never mix resources.

---

# Testing

Each module contains

Unit Tests

Integration Tests

Mock Data

Every critical business flow must be tested.

---

# Documentation

Every module must include README.md

Contents

Purpose

Responsibilities

Dependencies

Events

Database Tables

API Endpoints

Configuration

Future Plans

---

# Logging

Modules log only important business actions.

Examples

Product Created

Order Cancelled

Inventory Adjusted

Avoid excessive logging.

---

# Performance

Maximum API Calls

5 per screen

Maximum Query Time

100ms

Use pagination.

Use cache where appropriate.

Avoid duplicate queries.

---

# Error Handling

Every module returns standardized errors.

Never expose stack traces.

Never expose SQL errors.

---

# Security

Permission Check

Tenant Check

Feature Check

Validation

Must happen before business logic.

---

# Development Rules

One Pull Request per module.

One feature at a time.

Small commits.

Readable code.

No duplicated logic.

---

# AI Rules

Claude Code must:

Never create modules outside this structure.

Never merge two business modules.

Never bypass Feature Manager.

Never bypass Tenant validation.

Never duplicate DTOs.

Never place business logic inside Controllers.

Never place SQL inside Services.

Never create circular dependencies.

If a module does not follow this document,

it must be refactored before adding new features.

---

# Future Ready

New modules can be added without changing existing modules.

Examples

Loyalty

CRM

Marketing

Accounting Integration

Marketplace

AI Assistant

Business Intelligence

The architecture must remain unchanged.
