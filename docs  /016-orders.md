# RestaurantOS Order Module

Version: 1.0

---

# Goal

The Order Module is the core business engine of RestaurantOS.

Every sale, regardless of its source, must be processed as an Order.

Supported order sources:

POS

Website

QR Menu

Mobile App

Phone Order

Delivery

API

Marketplace (Future)

---

# Order Types

Dine In

Takeaway

Delivery

Pickup

Online

Phone

Future

Drive Thru

Self Service Kiosk

Marketplace

---

# Order Status

Draft

Pending

Confirmed

Preparing

Ready

Served

Completed

Cancelled

Refunded

---

# Order Flow

Create Order

↓

Validate

↓

Reserve Inventory

↓

Send To Kitchen

↓

Print

↓

Prepare

↓

Ready

↓

Serve

↓

Complete

---

# Order Number

Readable

Sequential

Unique Per Tenant

Example

100001

100002

100003

UUID is internal only.

---

# Order Information

Order Number

Customer

Branch

Table

Waiter

Cashier

Order Type

Source

Status

Created Time

Completed Time

Notes

---

# Order Items

Every item contains

Product

Quantity

Unit Price

Discount

Tax

Modifiers

Options

Notes

Kitchen Status

---

# Split Orders

Supported

Example

One table

↓

Split into

2 Bills

3 Bills

Unlimited

---

# Merge Orders

Supported

Example

Table 5

+

Table 6

↓

One Bill

---

# Table Transfer

Supported

Move

Order

Table

Waiter

Without losing history.

---

# Customer Notes

Examples

No Onion

Extra Crispy

Birthday

All notes visible in KDS and Kitchen Printer.

---

# Kitchen

Automatic KDS

Automatic Printing

Kitchen Status Tracking

Preparation Time

Station Assignment

---

# Inventory

Inventory deducted

Only after confirmation.

Cancelled orders restore stock automatically.

---

# Pricing

Base Price

Modifiers

Addons

Discount

Coupon

Tax

Service Charge

Delivery Fee

Tip

Final Total

---

# Discounts

Percentage

Fixed Amount

Coupon

Promotion

Manual

Manager Approval (Optional)

---

# Payments

Cash

Card

Wallet

Online

Split Payment

Future

Crypto

Gift Card

---

# Split Payment

Supported

Example

Cash

+

Card

+

Wallet

Unlimited combinations.

---

# Customer

Guest Order

Registered Customer

VIP

Membership

Wallet

Loyalty

---

# Delivery

Driver

Address

Estimated Time

Tracking

Delivery Fee

Status

---

# QR Orders

Customer scans QR

↓

Places Order

↓

Kitchen Receives

↓

Waiter Notification

↓

Serve

---

# Website Orders

Customer

↓

Cart

↓

Checkout

↓

Payment

↓

Kitchen

↓

Delivery

---

# POS Orders

Large Touch UI

Barcode Support

Fast Search

Keyboard Shortcut

Touch Friendly

---

# Printing

Receipt

Kitchen

Bar

Customer Copy

Invoice

Unlimited printers supported.

---

# Notifications

SMS

Push

Email

WhatsApp (Future)

Telegram (Future)

---

# Reports

Sales

Cancelled Orders

Refunds

Average Order

Peak Hours

Top Customers

Top Products

Order Sources

Payment Methods

---

# Dashboard

Today's Orders

Pending

Preparing

Completed

Cancelled

Average Ticket

Revenue

---

# API

GET Orders

GET Order

POST Order

PATCH Order

Cancel Order

Refund Order

Split Order

Merge Order

Transfer Table

Change Status

---

# Database Requirements

Tables

orders

order_items

order_status_history

order_payments

order_notes

order_discounts

order_taxes

All tables include

tenant_id

created_at

updated_at

deleted_at

---

# Performance Requirements

Create Order

<200ms

Search

<300ms

Maximum

5 API Calls

Per Screen

---

# Security Requirements

Authentication Required

Tenant Validation

Permission Validation

Feature Validation

Audit Required

Soft Delete Only

---

# Audit

Log

Order Created

Order Updated

Status Changed

Cancelled

Refunded

Payment Added

Payment Removed

---

# Offline Mode

Future Support

POS can continue creating orders offline.

Automatic synchronization when connection returns.

---

# AI Ready

Predict Preparation Time

Predict Busy Hours

Recommend Addons

Detect Fraud

Suggest Discounts

Sales Forecast

---

# AI Rules

Claude Code must never

Hard delete orders.

Modify completed orders.

Skip inventory synchronization.

Skip audit logs.

Skip tenant validation.

Skip permission validation.

---

# Final Rule

Every sale is an Order.

Every Order must be traceable from creation to completion.

No Order data may be permanently lost.
