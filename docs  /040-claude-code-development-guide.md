# RestaurantOS Claude Code Development Guide

Version: 1.0

---

# Purpose

This document defines how Claude Code must develop RestaurantOS.

It is the master instruction set for AI-assisted software development.

Every generated file, module and feature must follow this guide.

---

# Project Goal

RestaurantOS is an Enterprise-grade Restaurant Management Platform.

The system must be

Scalable

Maintainable

Secure

Multi-Tenant

Modular

Cloud Ready

AI Ready

Future Proof

---

# Development Philosophy

Architecture First

Business First

Documentation First

Testing First

Code Second

Implementation follows documentation.

Documentation is the source of truth.

---

# Required Documents

Claude Code must read every document before implementation.

001-040 are mandatory.

No implementation without documentation.

---

# Architecture Rules

Always follow

Clean Architecture

DDD

Modular Monolith

Event Driven Architecture

Repository Pattern

Dependency Injection

API First

Never violate architectural boundaries.

---

# Business Rules

Business rules belong only in

Domain Layer

Never inside

Controllers

Repositories

Database

Frontend

Infrastructure

---

# Module Independence

Every module owns

Entities

Use Cases

Repositories

Events

DTOs

No module accesses another module's database.

Communication occurs through

Application Services

or

Domain Events.

---

# Multi-Tenant Rules

Every query

↓

tenant_id

Every entity

↓

tenant_id

Every request validated.

Cross tenant access forbidden.

---

# Security Rules

Always implement

Authentication

Authorization

Permission Validation

Tenant Validation

Audit Logging

Input Validation

Output Filtering

No shortcuts.

---

# Database Rules

Prisma only.

UUID Primary Keys.

Soft Delete.

Optimistic Locking.

No raw SQL unless justified.

No business logic in database.

---

# API Rules

REST

Versioned

Swagger

DTO Validation

Consistent Responses

Pagination

Filtering

Sorting

Idempotency

---

# Event Rules

Every important business action publishes an event.

Events are immutable.

Subscribers independent.

Retries supported.

Idempotent processing required.

---

# Backend Rules

Use Cases

↓

Repositories

↓

Domain

↓

Infrastructure

Never bypass layers.

---

# Frontend Rules

Reusable Components

Feature-Based Structure

TanStack Query

Zustand

Tailwind

shadcn/ui

React Hook Form

Zod

No API calls inside components.

---

# Coding Standards

SOLID

DRY

KISS

YAGNI

Readable Code

Small Functions

Single Responsibility

Composition over inheritance.

---

# Performance Rules

Target API

<200ms

Realtime

<500ms

Heavy jobs

Background Workers

Caching where appropriate.

---

# Error Handling

Centralized

Friendly Messages

Standard Error Codes

Correlation ID

Never expose stack traces.

---

# Logging Rules

Structured Logging

Audit Logging

Correlation ID

Security Events

Business Events

No console.log() in production.

---

# Testing Rules

Unit Tests

Integration Tests

E2E Tests

Regression Tests

Critical business logic must be tested.

---

# Documentation Rules

Every Module

Swagger

README

Architecture Compliance

Meaningful Comments

Public APIs documented.

---

# Git Rules

Small Commits

Clear Commit Messages

Feature Branches

Code Review Required

Never commit secrets.

---

# AI Code Generation Rules

Claude Code must

Read documentation before coding.

Generate production-ready code.

Generate modular code.

Generate typed code.

Generate reusable code.

Generate secure code.

Generate tested code.

Generate documented code.

---

# Claude Code Must Never

Generate business logic inside controllers.

Access another module's database.

Hardcode configuration.

Skip validation.

Skip authorization.

Skip tenant validation.

Skip audit logging.

Ignore architecture.

Generate duplicated code.

Generate dead code.

Generate unused files.

Generate placeholder implementations unless explicitly requested.

---

# Preferred Development Order

1. Shared Infrastructure

2. Authentication

3. Organization

4. Products

5. Categories

6. Modifiers

7. Customers

8. Tables

9. Orders

10. Kitchen

11. Payments

12. Inventory

13. Recipes

14. Purchases

15. Suppliers

16. Notifications

17. Reports

18. Dashboard

19. Settings

20. Final Integration

---

# Completion Criteria

A feature is complete only if

Architecture respected

Business rules implemented

Validation complete

Authorization complete

Tenant isolation complete

Tests passing

Swagger updated

Events implemented

Audit logging implemented

Documentation updated

No TODOs remaining.

---

# Definition of Done

✓ Builds successfully

✓ Lint passes

✓ Tests pass

✓ Documentation updated

✓ Swagger updated

✓ No TypeScript errors

✓ No ESLint errors

✓ Performance targets met

✓ Security requirements met

---

# Future Ready

Plugin System

Marketplace

Microservices

Mobile Apps

Desktop Apps

AI Assistant

Public API

GraphQL

Event Streaming

No redesign required.

---

# Final Rule

Claude Code is an implementation engine, not an architecture engine.

Architecture is defined by the documentation.

If generated code conflicts with the documentation, the documentation always takes precedence.
