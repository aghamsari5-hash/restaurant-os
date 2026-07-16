# RestaurantOS Purchase Management Module

Version: 1.0

---

# Goal

The Purchase Module manages the complete procurement lifecycle.

It covers supplier selection, purchase requests,
purchase orders, receiving goods and inventory updates.

Every purchase must be traceable.

No inventory increase may occur without a valid purchase or approved adjustment.

---

# Business Scope

The Purchase Module integrates with:

Inventory

Suppliers

Recipes

Reports

Dashboard

Notifications

Future Accounting

---

# Purchase Types

Purchase Request

Purchase Order

Direct Purchase

Emergency Purchase

Recurring Purchase

Inter-Branch Purchase (Future)

---

# Purchase Status

Draft

Pending Approval

Approved

Ordered

Partially Received

Received

Completed

Cancelled

Closed

---

# Purchase Information

Purchase Number

Supplier

Branch

Warehouse

Purchase Type

Status

Expected Delivery Date

Currency

Payment Terms

Notes

Reference Number

---

# Purchase Items

Each item contains

Inventory Item

Quantity

Unit

Unit Cost

Discount

Tax

Total Cost

Received Quantity

Remaining Quantity

---

# Approval Workflow

Create Purchase

↓

Manager Approval

↓

Purchase Order Issued

↓

Supplier Confirmation

↓

Receive Goods

↓

Inventory Updated

↓

Purchase Closed

Approval levels configurable.

---

# Receiving Goods

Receive All

Receive Partial

Reject Item

Reject Shipment

Record Damaged Quantity

Every receiving action updates inventory.

---

# Partial Receiving

Supported.

Example

Ordered

100 KG

↓

Received

60 KG

↓

Remaining

40 KG

---

# Cost Calculation

Subtotal

Discount

Tax

Shipping Cost

Additional Charges

Final Total

Automatic calculation required.

---

# Currency

Base Currency

Foreign Currency

Exchange Rate

Future Multi-Currency Support

---

# Purchase Requests

Staff may create requests.

Managers approve requests.

Approved requests become Purchase Orders.

---

# Purchase Orders

Unique Number

Supplier

Items

Approval Status

Delivery Status

Payment Status

Attachments (Future)

---

# Returns

Return to Supplier

Partial Return

Full Return

Reason Required

Inventory updated automatically.

---

# Search

Search By

Purchase Number

Supplier

Inventory Item

Reference Number

Branch

Warehouse

---

# Filters

Status

Supplier

Branch

Warehouse

Purchase Type

Date Range

Pending Approval

---

# Dashboard

Pending Purchases

Overdue Deliveries

Today's Receipts

Purchase Value

Top Suppliers

Open Purchase Orders

---

# Reports

Purchase History

Supplier Performance

Purchase Costs

Pending Purchases

Delivery Delays

Returned Purchases

Inventory Cost

---

# Business Workflow

Purchase Request

↓

Approval

↓

Purchase Order

↓

Goods Received

↓

Inventory Increased

↓

Reports Updated

↓

Purchase Closed

---

# State Machine

Draft

↓

Pending Approval

↓

Approved

↓

Ordered

↓

Received

↓

Completed

Cancelled allowed before completion.

---

# Event Flow

Purchase Created

↓

Approved

↓

Order Sent

↓

Goods Received

↓

Inventory Increased

↓

Notification Sent

↓

Reports Updated

---

# API

GET Purchases

GET Purchase

POST Purchase

PATCH Purchase

DELETE Purchase (Soft Delete)

Approve Purchase

Receive Purchase

Return Purchase

Close Purchase

---

# Database Requirements

Tables

purchases

purchase_items

purchase_receipts

purchase_returns

purchase_approvals

purchase_status_history

All tables include

tenant_id

created_at

updated_at

deleted_at

---

# Performance Requirements

Purchase Lookup

<200ms

Goods Receiving

<300ms

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

Soft Delete Only

Audit Logging Required

Approval permissions configurable.

---

# Audit

Purchase Created

Purchase Updated

Purchase Approved

Goods Received

Purchase Returned

Purchase Closed

Approval Changed

Every event permanently recorded.

---

# Error Handling

Supplier Not Found

Inventory Item Not Found

Duplicate Purchase Number

Invalid Quantity

Over Receiving

Permission Denied

Friendly messages only.

---

# AI Ready

Automatic Purchase Suggestions

Demand Forecast

Supplier Recommendation

Price Trend Analysis

Delivery Delay Prediction

Smart Reorder Points

Future Support

---

# AI Rules

Claude Code must never

Increase inventory without a valid receiving event.

Delete purchase history.

Modify completed purchases.

Skip approval workflow when enabled.

Skip audit logging.

Skip tenant validation.

---

# Module Integration

Inventory

Suppliers

Recipes

Reports

Dashboard

Notifications

Accounting (Future)

Modules communicate through events.

---

# Future Ready

Electronic Purchase Orders

Supplier Portal

EDI Integration

Automatic Reordering

Contract Management

Multi-Currency Purchasing

No architecture changes required.

---

# Final Rule

Every inventory increase must originate from a valid purchase, approved adjustment or authorized production process.

Purchase records are immutable after completion.
