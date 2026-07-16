# RestaurantOS Feature Manager

Version: 1.0

---

# Goal

RestaurantOS must support different business types without changing the source code.

Every feature can be enabled or disabled independently.

No deployment is required.

No code modification is required.

---

# Philosophy

The software is built once.

Each restaurant chooses which features to use.

RestaurantOS adapts automatically.

---

# Examples

Restaurant A

✓ POS

✓ Inventory

✓ Online Ordering

✓ Kitchen Display

✗ Waiter

✗ Delivery

--------------------------------

Restaurant B

✓ POS

✓ Waiter

✓ Tables

✗ Inventory

✗ Website

✗ QR Menu

--------------------------------

Restaurant C

✓ Digital Menu

✓ Website

✓ QR Menu

✗ POS

✗ Inventory

✗ Accounting

---

# Feature Categories

Core

Commerce

Operations

Finance

Marketing

Website

Integrations

AI

---

# Core Features

Authentication

Users

Roles

Permissions

Tenant

Settings

These features cannot be disabled.

---

# Commerce Features

Products

Categories

Product Variants

Modifiers

Discounts

Coupons

Online Ordering

QR Menu

Shopping Cart

Customer Website

---

# Operations Features

POS

Tables

Waiter

Kitchen Display (KDS)

Printers

Reservations

Delivery

Drivers

Order Tracking

---

# Inventory Features

Inventory

Recipes

Warehouse

Purchase Orders

Suppliers

Waste Management

Stock Transfer

---

# Finance Features

Accounting

Expenses

Income

Cashbox

Shift Management

Tax Management

Reports

---

# Customer Features

Customers

Customer Groups

Wallet

Cashback

Loyalty Points

Membership

Gift Cards

Reviews

Survey

Referral System

---

# Marketing Features

SMS

Email

Push Notification

Campaigns

Coupons

Birthday Messages

Promotions

---

# Website Features

Restaurant Website

Landing Page

Blog

Gallery

Banners

SEO

Custom Domain

Online Reservation

---

# AI Features

Sales Prediction

Demand Forecast

Suggested Products

Price Recommendation

Inventory Prediction

Customer Insights

---

# Integration Features

Payment Gateway

SMS Provider

WhatsApp

Telegram

Accounting Software

CRM

Delivery Companies

Marketplace

API Access

---

# Feature States

Enabled

Disabled

Hidden

Beta

Deprecated

---

# Disabled

Feature exists

UI hidden

API blocked

Permissions ignored

Menu hidden

Database preserved

---

# Hidden

Feature is enabled

Accessible only by direct URL or permission

Not visible in navigation

---

# Beta

Available only for selected tenants.

---

# Dependency Rules

Example

Delivery

depends on

Orders

--------------------------------

Website

depends on

Products

--------------------------------

Inventory

independent

--------------------------------

Kitchen

depends on

Orders

--------------------------------

Waiter

depends on

Tables

---

# Dependency Validation

Claude Code must validate dependencies.

Example

Enable Delivery

↓

Orders Required

↓

If Orders Disabled

↓

Reject Activation

---

# Runtime

Features can be changed without restarting the server.

---

# UI Rules

Disabled features:

No Menu

No Button

No Dashboard Card

No API Call

No Notification

---

# Backend Rules

Every request validates

Tenant

Permission

Feature

Only then execute business logic.

---

# Database

Feature settings stored per Tenant.

Example

tenant_features

tenant_id

feature_key

enabled

created_at

updated_at

---

# API

GET

/features

GET

/features/enabled

PATCH

/features/{id}

---

# Caching

Enabled features cached in Redis.

Cache refresh after every change.

---

# Performance

Feature validation

Maximum

5ms

Cache First

Database Second

---

# Security

Only Owner and Manager can change features.

Every change is logged.

---

# Audit

Log

Old Value

New Value

User

Date

IP

Device

---

# AI Rules

Claude Code must never:

Hardcode feature availability.

Hide features using frontend only.

Skip backend validation.

Assume a feature is enabled.

Every module must ask Feature Manager before execution.

---

# Future Ready

New features can be added without changing existing modules.

Only register the feature.

Everything else should work automatically.
