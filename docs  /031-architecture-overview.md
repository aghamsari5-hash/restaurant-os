# RestaurantOS Architecture Overview

Version: 1.0

---

# Purpose

This document defines the overall architecture of RestaurantOS.

It is the single source of truth for all architectural decisions.

Every developer, AI assistant and contributor must follow this architecture.

No module may violate these principles.

---

# Architecture Style

RestaurantOS follows

Domain Driven Design (DDD)

+

Clean Architecture

+

Modular Monolith (V1)

+

Event Driven Architecture

+

API First Design

The architecture is intentionally prepared for Microservices in future versions.

---

# Core Principles

Business First

Domain Separation

Loose Coupling

High Cohesion

Scalability

Maintainability

Observability

Security by Design

Configuration Driven

Cloud Ready

---

# System Layers

Presentation Layer

↓

Application Layer

↓

Domain Layer

↓

Infrastructure Layer

---

## Presentation Layer

Responsibilities

REST API

Authentication

Validation

Serialization

OpenAPI

No business logic allowed.

---

## Application Layer

Responsibilities

Use Cases

Application Services

Command Handlers

Query Handlers

DTO Mapping

Transactions

Coordinates domain operations.

---

## Domain Layer

Responsibilities

Business Rules

Entities

Aggregates

Value Objects

Domain Events

Policies

Specifications

No framework dependencies.

---

## Infrastructure Layer

Responsibilities

Database

Redis

RabbitMQ (Future)

File Storage

Email

Logging

Notifications

External APIs

Framework-specific code belongs here.

---

# Module Architecture

Each business module is independent.

Example

Products

Orders

Inventory

Customers

Kitchen

Payments

Reports

Notifications

Settings

Modules communicate through contracts.

Never through database access.

---

# Folder Structure

src/

application/

domain/

infrastructure/

presentation/

shared/

modules/

config/

---

# Shared Components

Authentication

Authorization

Configuration

Logging

Caching

Auditing

Exceptions

Utilities

Common DTOs

Shared Kernel must remain small.

---

# Communication Rules

Preferred

Domain Events

Application Services

REST APIs

Forbidden

Direct Database Access

Shared Mutable State

Circular Dependencies

---

# Event Driven Design

Every important business action generates an event.

Example

Order Created

↓

Kitchen Notification

↓

Inventory Consumption

↓

Dashboard Update

↓

Reports Update

Events reduce coupling.

---

# Multi Tenant

Every request contains

Tenant Context

Every table contains

tenant_id

Tenant isolation is mandatory.

Cross tenant access forbidden.

---

# Security

JWT Authentication

Role Based Access

Permission Based Authorization

Audit Logging

Soft Delete

Input Validation

Output Filtering

Encryption for sensitive data

---

# Scalability

Stateless APIs

Horizontal Scaling Ready

Cache Support

Background Jobs

Read Model Support

Future Microservices

---

# Data Access

Repository Pattern

Unit Of Work

Specifications

Read Models

CQRS Ready

Business logic never inside repositories.

---

# Database

Primary Database

PostgreSQL

Cache

Redis

Future

ElasticSearch

Object Storage

Message Broker

---

# API Design

REST First

OpenAPI

Versioned APIs

Consistent Error Format

Pagination

Filtering

Sorting

Idempotent Operations

---

# Observability

Structured Logging

Audit Logging

Health Checks

Metrics

Tracing Ready

Performance Monitoring

---

# Background Processing

Long running tasks

↓

Queue

↓

Worker

↓

Notification

↓

Completion

User requests should remain fast.

---

# Error Handling

Centralized Exception Handler

Standard Error Codes

Correlation ID

Validation Errors

Business Errors

Unexpected Errors

No stack traces exposed.

---

# Configuration

Environment Variables

Database Configuration

Feature Flags

Dynamic Settings

No hardcoded values.

---

# Deployment Strategy

Docker

Docker Compose

Cloud Ready

Kubernetes Ready

CI/CD Ready

---

# Technology Stack

Backend

NestJS

Frontend

Next.js

Database

PostgreSQL

ORM

Prisma

Cache

Redis

Realtime

Socket.IO

Authentication

JWT

Documentation

OpenAPI

---

# Quality Standards

SOLID

DRY

KISS

YAGNI

Clean Code

Clean Architecture

DDD

---

# Architectural Constraints

No business logic inside controllers.

No business logic inside database.

No direct module dependencies.

No shared mutable state.

No hardcoded business rules.

No tenant leakage.

No synchronous long-running operations.

---

# AI Development Rules

Claude Code must

Respect all module boundaries.

Generate modular code.

Follow Clean Architecture.

Use dependency injection.

Never bypass repositories.

Never bypass authorization.

Never bypass audit logging.

Never violate tenant isolation.

---

# Future Architecture

Microservices

Event Bus

GraphQL

gRPC

Plugin System

Marketplace

AI Services

Public API

No redesign required.

---

# Architecture Decision Records

Major architectural decisions must be documented.

Every breaking architectural change requires an ADR.

---

# Final Rule

Architecture is more important than implementation.

Every feature must conform to the architecture.

Architecture must never be sacrificed for short-term speed.
