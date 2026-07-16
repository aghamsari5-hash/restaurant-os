# RestaurantOS Domain Model

Version: 1.0

---

# Purpose

This document defines the business domains of RestaurantOS.

The Domain Model is the foundation of the application.

Every business rule belongs to exactly one domain.

No domain may own another domain's business logic.

---

# Core Domains

RestaurantOS consists of the following domains

Identity

Organization

Products

Orders

Customers

Tables

Kitchen

Payments

Inventory

Recipes

Purchases

Suppliers

Reports

Notifications

Settings

Audit

Dashboard

---

# Identity Domain

Responsibilities

Authentication

Authorization

Users

Roles

Permissions

Sessions

Tokens

Never contains business logic.

---

# Organization Domain

Responsibilities

Tenant

Organization

Branch

Department

Working Hours

Business Configuration

---

# Product Domain

Entities

Category

Product

Modifier

Modifier Group

Product Image

Price

Tax Rule

Business Rules

Product availability

Pricing

Visibility

Catalog

---

# Order Domain

Entities

Order

Order Item

Order Discount

Order Tax

Order Status

Order Note

Business Rules

Create Order

Update Order

Cancel Order

Split Order

Merge Order

Transfer Order

---

# Payment Domain

Entities

Payment

Payment Method

Refund

Transaction

Receipt

Business Rules

Receive Payment

Refund

Split Payment

Payment Validation

---

# Customer Domain

Entities

Customer

Address

Wallet

Loyalty

Customer Group

Notes

Business Rules

Customer Registration

Wallet

Cashback

Loyalty

Customer History

---

# Table Domain

Entities

Restaurant Table

Reservation

Area

Floor

QR Code

Business Rules

Reservation

Merge Tables

Split Tables

Transfer Tables

Occupancy

---

# Kitchen Domain

Entities

Kitchen Order

Kitchen Ticket

Kitchen Station

Kitchen Queue

Business Rules

Preparation

Cooking

Ready

Completed

Priority

---

# Inventory Domain

Entities

Inventory Item

Warehouse

Batch

Movement

Reservation

Adjustment

Business Rules

Stock Movement

Reservation

Consumption

Transfers

Inventory Count

---

# Recipe Domain

Entities

Recipe

Recipe Item

Recipe Version

Production

Business Rules

Food Cost

Production

Consumption

Yield

Substitution

---

# Purchase Domain

Entities

Purchase

Purchase Item

Purchase Approval

Receiving

Returns

Business Rules

Approval

Receiving

Returns

Supplier Integration

---

# Supplier Domain

Entities

Supplier

Supplier Contact

Supplier Address

Supplier Performance

Business Rules

Supplier Rating

Purchase History

Performance

Relationship

---

# Notification Domain

Entities

Notification

Notification Rule

Notification Channel

Notification History

Business Rules

Delivery

Retry

Escalation

Acknowledgement

---

# Reports Domain

Entities

Report

Saved Report

Report Schedule

Dashboard Widget

Business Rules

Aggregation

Caching

Export

Analytics

---

# Settings Domain

Entities

Setting

Feature Flag

Configuration Profile

Business Rules

Configuration

Inheritance

Validation

Versioning

---

# Audit Domain

Entities

Audit Log

Login History

Activity Log

Security Event

Business Rules

Tracking

Compliance

History

---

# Dashboard Domain

Entities

Widget

Metric

Chart

Business Rules

Real-time KPIs

Aggregation

Visualization

---

# Domain Relationships

Identity

↓

Organization

↓

Business Domains

↓

Reports

↓

Dashboard

Notifications listen to all domains.

Audit listens to all domains.

Settings affect all domains.

---

# Aggregate Rules

Each Aggregate has

Single Root

Business Invariants

Transactional Boundary

Internal Consistency

External communication only through events.

---

# Entity Rules

Every Entity has

UUID

Tenant ID

Created At

Updated At

Deleted At

Audit Information

Soft Delete

---

# Value Objects

Money

Quantity

Address

Phone

Email

Tax

Percentage

Date Range

Currency

Immutable.

---

# Domain Services

Use Domain Services only when

Business logic spans multiple entities.

Never place infrastructure code here.

---

# Domain Events

Examples

OrderCreated

PaymentCompleted

InventoryReduced

KitchenOrderReady

CustomerRegistered

PurchaseApproved

TableReserved

Events are immutable.

---

# Repository Rules

One Repository

↓

One Aggregate Root

Repositories never contain business logic.

---

# Cross Domain Rules

Domains communicate

↓

Events

↓

Application Services

Never by direct database access.

---

# Multi Tenant Rules

Every Aggregate belongs to one Tenant.

Cross Tenant operations forbidden.

---

# AI Development Rules

Claude Code must

Never mix domains.

Never duplicate business rules.

Never access another domain database.

Always publish domain events.

Always respect aggregate boundaries.

---

# Future Domains

Accounting

CRM

Delivery

Franchise

Marketing

Marketplace

AI Assistant

Plugin System

No architectural redesign required.

---

# Final Rule

Business rules belong to domains.

Domains own their data.

Domains communicate only through contracts and events.
