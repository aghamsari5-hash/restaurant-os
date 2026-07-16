# RestaurantOS Database Design

Version: 1.0

---

# Purpose

This document defines the database architecture of RestaurantOS.

The database must be

Reliable

Scalable

Normalized

Multi-Tenant

Auditable

Future Microservice Ready

---

# Database Engine

Primary Database

PostgreSQL

Cache

Redis

Future

ElasticSearch

Object Storage

Message Queue

---

# Database Principles

Single Source Of Truth

Normalized Data

No Business Logic Inside Database

Soft Delete

Audit Ready

Tenant Isolation

UUID Primary Keys

Timezone Aware

---

# Naming Convention

Tables

snake_case

Example

products

order_items

inventory_movements

customer_wallets

Columns

snake_case

Example

created_at

tenant_id

product_name

Indexes

idx_table_column

Foreign Keys

fk_table_reference

---

# Primary Keys

Every table uses

UUID

Example

id UUID PRIMARY KEY

No incremental IDs.

---

# Required Columns

Every business table contains

id

tenant_id

created_at

updated_at

deleted_at

created_by

updated_by

deleted_by

version

---

# Soft Delete

Physical deletion forbidden.

Rows are marked

deleted_at

deleted_by

Queries ignore deleted records by default.

---

# Tenant Isolation

Every query includes

tenant_id

Cross tenant queries forbidden.

Database constraints enforce isolation.

---

# Relationships

One To One

One To Many

Many To Many

Through Junction Tables

Example

products

↓

product_categories

↓

categories

---

# Database Modules

identity

organization

products

orders

payments

customers

tables

kitchen

inventory

recipes

purchases

suppliers

notifications

reports

settings

audit

dashboard

Each module owns its tables.

---

# Cross Module Rules

Modules never modify another module's tables directly.

Communication occurs

↓

Application Layer

↓

Events

---

# Transactions

Use transactions for

Orders

Payments

Inventory

Purchases

Refunds

Multi-step business operations.

---

# Optimistic Locking

Every mutable table contains

version

Prevent concurrent updates.

---

# Index Strategy

Primary Keys

Foreign Keys

Search Columns

Status Columns

Created At

Tenant ID

Composite indexes where required.

---

# Search

Exact Search

Indexed

Partial Search

GIN Index

Future

Full Text Search

ElasticSearch

---

# JSON Usage

Allowed only for

Metadata

Configurations

Flexible Attributes

Never store business entities in JSON.

---

# Money

Use Decimal

Never Float

Currency stored separately.

---

# Date & Time

Always UTC

Display converted by application.

---

# File Storage

Database stores

Metadata

File URL

Checksum

Provider

Binary files never stored inside PostgreSQL.

---

# Audit

Business tables remain clean.

Audit stored separately.

Every change logged.

---

# Read Models

Heavy reports use

Read Models

Materialized Views

Aggregated Tables

Transactional tables remain optimized.

---

# Performance Rules

Maximum Query Time

200ms

Heavy reports

Background Jobs

Pagination mandatory.

---

# Constraints

NOT NULL

CHECK

FOREIGN KEY

UNIQUE

Business integrity enforced by schema.

---

# Migration Strategy

Prisma Migrations

Version Controlled

Rollback Supported

Never edit production schema manually.

---

# Backup Strategy

Daily Backup

Point In Time Recovery

Encrypted Storage

Restore Tested

---

# Security

Encrypted Connections

Least Privilege

Parameterized Queries

No Dynamic SQL

Sensitive fields encrypted when required.

---

# AI Development Rules

Claude Code must

Never bypass ORM.

Never hardcode SQL.

Always include tenant_id.

Never physically delete business records.

Never duplicate schema definitions.

Always create indexes for searchable fields.

---

# Future Ready

Read Replicas

Database Sharding

Partitioning

Event Store

CQRS

Microservices

No redesign required.

---

# Final Rule

The database stores business truth.

Business rules belong to the Domain Layer, not the database.
