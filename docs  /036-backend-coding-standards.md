# RestaurantOS Backend Coding Standards

Version: 1.0

---

# Purpose

This document defines backend coding standards for RestaurantOS.

Every developer and AI assistant must follow these rules.

Consistency is mandatory.

---

# Technology Stack

Framework

NestJS

Language

TypeScript

ORM

Prisma

Database

PostgreSQL

Cache

Redis

Realtime

Socket.IO

Validation

class-validator

Documentation

OpenAPI

---

# Architecture

Clean Architecture

DDD

Modular Monolith

Dependency Injection

Repository Pattern

CQRS Ready

Event Driven

---

# Folder Structure

src/

modules/

shared/

application/

domain/

infrastructure/

presentation/

config/

main.ts

No business logic outside modules.

---

# Module Structure

module/

controllers/

services/

use-cases/

dto/

entities/

repositories/

events/

exceptions/

validators/

mappers/

interfaces/

tests/

---

# Controllers

Responsibilities

Receive Request

Validate Input

Call Use Case

Return Response

Controllers never contain business logic.

Maximum

100 Lines

---

# Services

Application Services coordinate use cases.

Never contain infrastructure code.

Maximum

300 Lines

---

# Use Cases

Each business operation

↓

One Use Case

Examples

CreateOrderUseCase

CancelOrderUseCase

ReceivePaymentUseCase

Use Cases contain business flow.

---

# Domain

Contains

Entities

Value Objects

Domain Services

Policies

Specifications

Events

No framework dependencies.

---

# Infrastructure

Contains

Prisma

Redis

Email

Storage

Logging

Notification

Third-party integrations

---

# DTO Rules

Every request uses DTO.

Every response uses DTO.

Validation required.

Never expose entities directly.

---

# Validation

Use

class-validator

Business validation

Application Layer

Framework validation

Presentation Layer

---

# Naming Convention

Classes

PascalCase

Variables

camelCase

Methods

camelCase

Interfaces

Prefix I forbidden

Files

kebab-case

Constants

UPPER_SNAKE_CASE

---

# Dependency Injection

Constructor Injection only.

No Service Locator.

No Singleton pattern.

---

# Repository Rules

One Repository

↓

One Aggregate

Repositories never contain business rules.

Repositories access database only.

---

# Error Handling

Business Exceptions

Validation Exceptions

Infrastructure Exceptions

Central Exception Filter required.

---

# Logging

Structured Logging

Every error logged.

Every business operation logged when necessary.

No console.log()

Use Logger Service.

---

# Transactions

Transactions only inside Application Layer.

Never inside Controllers.

---

# Async

Always

async/await

Never

.then()

Never block event loop.

---

# Configuration

Environment Variables

Configuration Service

Feature Flags

No hardcoded values.

---

# Security

Authorization

Authentication

Tenant Validation

Permission Validation

Input Validation

Output Filtering

SQL Injection Protection

---

# Database Access

Only through Prisma.

Raw SQL only if justified.

All queries tenant-aware.

---

# Events

Business actions publish events.

No direct module communication.

Subscribers independent.

---

# API

REST

DTO

Swagger

Pagination

Filtering

Sorting

Consistent responses.

---

# Performance

Avoid N+1 Queries.

Use pagination.

Use indexes.

Use caching.

Profile expensive operations.

---

# Caching

Redis

Read-heavy operations only.

Never cache sensitive user-specific data without proper isolation.

---

# Code Quality

SOLID

DRY

KISS

YAGNI

Composition over inheritance.

---

# Comments

Explain WHY.

Never explain WHAT obvious code does.

Self-documenting code preferred.

---

# Testing

Unit Tests

Integration Tests

E2E Tests

Business-critical code requires tests.

---

# File Size

Controller

≤100 lines

Service

≤300 lines

Use Case

≤250 lines

Split when necessary.

---

# Function Size

Target

20–40 lines

Maximum

60 lines

---

# Class Size

Single Responsibility.

Avoid God Classes.

---

# Imports

Absolute imports preferred.

No circular dependencies.

Unused imports forbidden.

---

# Git Rules

Small commits.

Meaningful commit messages.

One feature per PR.

---

# Code Review Checklist

Architecture respected

No duplicated logic

Validation exists

Authorization exists

Tenant validation exists

Tests pass

Swagger updated

Events published

Audit logging verified

---

# AI Development Rules

Claude Code must

Generate modular code.

Never duplicate business logic.

Never place business logic inside controllers.

Never bypass repositories.

Never bypass authorization.

Never bypass tenant validation.

Never hardcode configuration.

Generate readable code.

Prefer composition.

Follow Clean Architecture.

---

# Final Rule

Readable code is more valuable than clever code.

Every backend component must be testable, maintainable and follow the architecture without exception.
