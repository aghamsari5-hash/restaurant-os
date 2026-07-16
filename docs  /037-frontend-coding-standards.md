# RestaurantOS Frontend Coding Standards

Version: 1.0

---

# Purpose

This document defines frontend development standards for RestaurantOS.

Every frontend component must be consistent, maintainable and scalable.

All developers and AI assistants must follow these standards.

---

# Technology Stack

Framework

Next.js

Language

TypeScript

UI Library

React

Styling

Tailwind CSS

Component Library

shadcn/ui

Icons

Lucide

State Management

Zustand

Data Fetching

TanStack Query

Forms

React Hook Form

Validation

Zod

Realtime

Socket.IO Client

Charts

Recharts

---

# Architecture

Feature-Based Architecture

Component Driven

Atomic Design Principles

Reusable UI

Clean Separation

Presentation Logic Only

---

# Folder Structure

src/

app/

components/

features/

hooks/

lib/

services/

stores/

types/

styles/

config/

assets/

---

# Feature Structure

feature/

components/

hooks/

services/

types/

schemas/

pages/

utils/

---

# Components

Components must be

Reusable

Small

Pure

Composable

Testable

Maximum

200 Lines

---

# Component Types

UI Components

Layout Components

Feature Components

Shared Components

Page Components

---

# Naming Convention

Components

PascalCase

Hooks

useCamelCase

Files

kebab-case

Variables

camelCase

Constants

UPPER_SNAKE_CASE

---

# State Management

Global State

↓

Zustand

Server State

↓

TanStack Query

Local State

↓

useState

Never mix responsibilities.

---

# API Communication

Only through

/services

Never call fetch()

inside components.

---

# Forms

React Hook Form

+

Zod Validation

Validation occurs

Client

↓

Server

---

# Styling

Tailwind CSS only.

Avoid inline styles.

Avoid CSS duplication.

Reusable utility classes preferred.

---

# Theme

Light Mode

Dark Mode

System Mode

Theme switching dynamic.

---

# Routing

App Router

Lazy Loading

Code Splitting

Protected Routes

Role-Based Navigation

---

# Authentication

JWT

Secure Cookies (Future)

Automatic Token Refresh

Protected Layouts

Permission Guards

---

# Error Handling

Global Error Boundary

Loading States

Empty States

Retry States

Friendly Error Messages

---

# Loading UX

Skeletons

Progress Bars

Spinners

Optimistic UI

Avoid blank pages.

---

# Data Fetching

TanStack Query

Caching

Background Refresh

Retry

Invalidation

Never duplicate requests.

---

# Performance

Lazy Loading

Memoization

Virtual Lists

Dynamic Imports

Optimized Images

Bundle Splitting

---

# Accessibility

Keyboard Navigation

ARIA Labels

Focus Management

Color Contrast

Screen Reader Support

WCAG Ready

---

# Responsive Design

Mobile

Tablet

Desktop

Large Screens

POS Touch Screens

---

# Realtime

Socket.IO

Order Updates

Kitchen Updates

Notifications

Dashboard Metrics

Automatic Reconnection

---

# Tables

Pagination

Sorting

Filtering

Column Visibility

Export Ready

---

# Dashboard

Widgets

Charts

Cards

KPIs

Realtime Updates

---

# Notifications

Popup

Toast

Sound

Badge

Priority Colors

Realtime

---

# Internationalization

Multi Language Ready

RTL Ready

Localization Ready

No hardcoded text.

---

# Security

Input Validation

Output Escaping

Permission Checks

Route Guards

Sensitive Data Protection

---

# Testing

Component Tests

Integration Tests

E2E Tests

Critical UI tested.

---

# Code Quality

SOLID

DRY

KISS

Reusable Components

Avoid duplication.

---

# Comments

Explain WHY.

Avoid unnecessary comments.

Prefer readable code.

---

# AI Development Rules

Claude Code must

Generate reusable components.

Never duplicate UI.

Never call APIs directly inside components.

Separate business logic.

Reuse shared components.

Follow design system.

Use TypeScript strictly.

Use Zod validation.

Use React Hook Form.

Use TanStack Query.

---

# Future Ready

PWA

Offline Mode

Desktop App

Mobile App

White Label

Plugin System

Micro Frontends

No redesign required.

---

# Final Rule

Frontend must be fast, responsive, accessible and consistent.

Every screen must follow the same design language and architectural principles.
