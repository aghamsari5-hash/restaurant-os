# RestaurantOS Table Management Module

Version: 1.0

---

# Goal

The Table Management Module controls all restaurant tables.

It provides real-time table status, reservations, order assignment,
QR ordering and waiter management.

The module must support restaurants of any size without changing the architecture.

---

# Supported Businesses

Restaurant

Cafe

Food Court

Coffee Shop

VIP Lounge

Outdoor Area

Future

Hotel Restaurant

Beach Club

---

# Table Status

Available

Occupied

Reserved

Cleaning

Out Of Service

Merged

Disabled

Status updates in real time.

---

# Table Information

Table Number

Table Name

Area

Floor

Capacity

Minimum Guests

Maximum Guests

Description

QR Code

Display Order

Status

---

# Restaurant Areas

Indoor

Outdoor

VIP

Family

Smoking

Non-Smoking

Private Room

Custom Areas

Unlimited areas supported.

---

# Floors

Support multiple floors.

Example

Ground Floor

First Floor

Roof Garden

Basement

Unlimited floors.

---

# Capacity

Each table defines

Minimum Guests

Maximum Guests

Recommended Capacity

---

# QR Code

Every table owns one QR Code.

QR opens

Digital Menu

Customer Orders

Call Waiter (Future)

Bill Request (Future)

Feedback (Future)

QR never changes unless regenerated.

---

# Reservations

Reservation Number

Customer

Phone

Guests

Date

Time

Duration

Notes

Status

---

# Reservation Status

Pending

Confirmed

Seated

Completed

Cancelled

No Show

---

# Table Assignment

One Order

↓

One Table

One Table

↓

Multiple Orders

(Configurable)

---

# Merge Tables

Supported.

Example

Table 5

+

Table 6

↓

VIP Table

Merged tables maintain history.

---

# Split Tables

Merged tables can be restored.

History preserved.

---

# Transfer Table

Move order

Table A

↓

Table B

Without losing order history.

---

# Waiter Assignment

Assign Waiter

Change Waiter

Multiple Waiters (Optional)

History preserved.

---

# Order Integration

Every table shows

Current Order

Guest Count

Order Value

Elapsed Time

Waiter

Kitchen Status

---

# Guest Count

Current Guests

Maximum Capacity

Children (Future)

Special Needs (Future)

---

# Cleaning

After checkout

↓

Cleaning

↓

Available

Cleaning duration configurable.

---

# Table Lock

Prevent accidental edits.

Manager override supported.

---

# Table Timeline

Reservation

Guest Seated

Order Started

Order Completed

Cleaning Started

Cleaning Finished

Available

---

# Search

Search by

Table Number

Area

Floor

Status

Waiter

Customer

Fast response required.

---

# Filters

Area

Floor

Status

Capacity

Waiter

Reservation

QR Enabled

---

# Dashboard

Available Tables

Occupied Tables

Reserved Tables

Cleaning Tables

Average Occupancy

Average Stay Time

Table Utilization

---

# Reports

Occupancy Rate

Average Stay Duration

Revenue Per Table

Most Used Tables

Least Used Tables

Reservation Statistics

Peak Hours

---

# API

GET Tables

GET Table

POST Table

PATCH Table

DELETE Table (Soft Delete)

Merge Tables

Split Tables

Transfer Table

Assign Waiter

Reserve Table

---

# Database Requirements

Tables

restaurant_tables

table_areas

table_floors

table_reservations

table_histories

table_qr_codes

All tables include

tenant_id

created_at

updated_at

deleted_at

---

# Performance Requirements

Table Status Update

<100ms

Reservation

<200ms

Maximum

5 API Calls

Per Screen

Real-time updates via WebSocket.

---

# Security Requirements

Authentication Required

Tenant Validation

Permission Validation

Feature Validation

Soft Delete Only

Audit Logging Required

---

# Permissions

View Tables

Manage Tables

Merge Tables

Split Tables

Transfer Tables

Manage Reservations

Assign Waiters

Generate QR Codes

---

# Audit

Table Created

Table Updated

Reservation Created

Reservation Cancelled

Table Merged

Table Split

Table Transferred

QR Regenerated

Waiter Changed

---

# AI Ready

Table Occupancy Prediction

Reservation Optimization

Automatic Table Assignment

Peak Hour Prediction

Wait Time Estimation

Future Support

---

# AI Rules

Claude Code must never:

Hard delete tables.

Allow duplicate table numbers in the same branch.

Lose reservation history.

Break order-table relationships.

Skip tenant validation.

Skip audit logging.

---

# Future Ready

Self-Service Ordering

Customer Call Waiter

Bill Request

Table Sensors

Smart Reservation

Table Heatmap

Indoor Navigation

No architecture changes required.

---

# Final Rule

A table is a live operational resource.

Every status change must be tracked in real time.

No table activity should ever be lost.
