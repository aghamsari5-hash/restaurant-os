
# RestaurantOS Waiter Management Module

Version: 1.0

---

# Goal

The Waiter Module manages restaurant service staff throughout the entire customer journey.

It connects:

Tables

Orders

Customers

Kitchen

POS

Notifications

Reports

The module must reduce service time, improve order accuracy and increase customer satisfaction.

---

# Business Scope

Supported Businesses

Restaurant

Cafe

Food Court

Coffee Shop

VIP Lounge

Hotel Restaurant

Future Concepts

---

# Waiter Information

Employee ID

First Name

Last Name

Display Name

Phone Number

Profile Image

Status

Assigned Branch

Assigned Shift

Role

Permissions

---

# Waiter Status

Offline

Available

Serving

Busy

Break

Clock Out

Suspended

Status updates in real time.

---

# Responsibilities

Manage Tables

Create Orders

Edit Orders

Transfer Orders

Request Bill

Receive Payment

Customer Assistance

Reservation Support

---

# Business Workflow

Customer Seated

↓

Assign Waiter

↓

Create Order

↓

Send To Kitchen

↓

Kitchen Preparing

↓

Serve Customer

↓

Request Payment

↓

Complete Order

↓

Table Cleaning

↓

Available

---

# State Machine

Available

↓

Serving

↓

Busy

↓

Available

↓

Break

↓

Available

↓

Clock Out

Invalid transitions must be rejected.

---

# Event Flow

Table Assigned

↓

Waiter Assigned

↓

Order Created

↓

Kitchen Accepted

↓

Order Ready

↓

Customer Served

↓

Payment Completed

↓

Table Released

Every event is logged.

---

# Table Assignment

Manual Assignment

Automatic Assignment (Future)

Round Robin (Future)

Zone Based Assignment

VIP Assignment

Unlimited tables per waiter configurable.

---

# Order Management

Create Order

Update Order

Cancel Order

Transfer Order

Split Order

Merge Order

Apply Discount (Permission Based)

Add Customer Notes

Request Kitchen Priority

---

# Kitchen Integration

Receive Kitchen Status

Preparing

Ready

Completed

Kitchen Delay

Rejected

Real-time updates required.

---

# Customer Integration

Customer Information

VIP Status

Allergy Notes

Special Requests

Order History

Loyalty Status

Wallet Balance (Optional)

---

# Notification Integration

New Order Ready

Kitchen Delay

Customer Waiting

Reservation Arrived

Manager Message

Shift Reminder

Notifications configurable.

---

# POS Integration

Table Selection

Customer Selection

Order Entry

Payment

Receipt

Order History

Instant synchronization required.

---

# Reservation Integration

View Reservations

Assign Table

Seat Customer

Cancel Reservation

Mark No Show

---

# Shift Management

Clock In

Clock Out

Break Start

Break End

Shift Transfer

Shift Summary

---

# Performance Metrics

Orders Served

Average Service Time

Average Table Time

Tips Earned

Customer Rating

Sales Value

Cancelled Orders

Transferred Orders

---

# Dashboard

Active Waiters

Busy Waiters

Available Waiters

Average Response Time

Pending Tables

Performance Ranking

---

# Search

Search By

Name

Employee ID

Phone

Assigned Table

Current Order

Fast response required.

---

# Filters

Status

Shift

Branch

Zone

Performance

Availability

---

# Permissions

View Orders

Create Orders

Edit Orders

Transfer Orders

Close Orders

Receive Payments

View Customers

View Reservations

Manager Override

---

# API

GET Waiters

GET Waiter

POST Waiter

PATCH Waiter

DELETE Waiter (Soft Delete)

Assign Table

Assign Order

Update Status

Clock In

Clock Out

---

# Database Requirements

Tables

waiters

waiter_status_history

waiter_assignments

waiter_shifts

waiter_performance

waiter_notifications

All tables include

tenant_id

created_at

updated_at

deleted_at

---

# Performance Requirements

Status Update

<100ms

Order Assignment

<150ms

Maximum

5 API Calls

Per Screen

Real-time synchronization required.

---

# Security Requirements

Authentication Required

Tenant Validation

Permission Validation

Feature Validation

Soft Delete Only

Audit Logging Required

---

# Audit

Waiter Created

Waiter Updated

Status Changed

Table Assigned

Order Assigned

Shift Started

Shift Ended

Permission Changed

Every action must be recorded.

---

# Error Handling

Order Already Assigned

Table Occupied

Permission Denied

Kitchen Offline

POS Offline

Friendly recovery messages required.

---

# AI Ready

Smart Waiter Assignment

Performance Prediction

Table Load Balancing

Service Time Prediction

Customer Satisfaction Prediction

Peak Hour Staffing

Future Support

---

# AI Rules

Claude Code must never

Assign one table to multiple waiters unless configuration allows.

Lose waiter assignment history.

Allow unauthorized order modifications.

Skip audit logging.

Skip tenant validation.

Create synchronous communication between modules.

Modules communicate using events whenever possible.

---

# Module Integration

Tables

Orders

POS

Kitchen Display

Customers

Reservations

Notifications

Reports

Dashboard

All integrations must use service boundaries.

No direct database access between modules.

---

# Future Ready

Waiter Mobile App

Smart Watch Support

Voice Commands

Indoor Positioning

AI Assistant

Wearable Devices

No architecture changes required.

---

# Final Rule

A waiter is an operational actor.

Every action performed by a waiter must be traceable, measurable and synchronized across the entire RestaurantOS platform.
