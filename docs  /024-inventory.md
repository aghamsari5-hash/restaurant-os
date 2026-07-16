# RestaurantOS Inventory Module

Version: 1.0

---

# Goal

The Inventory Module manages all stock movements across RestaurantOS.

Every stock change must be traceable.

Every movement must have a reason.

No inventory operation may occur without history.

The module supports:

Restaurant

Cafe

Bakery

Coffee Shop

Fast Food

Multi Branch

Future Warehouse Networks

---

# Business Scope

Inventory is shared by:

Products

Recipes

Purchases

Waste

Production

Sales

Returns

Transfers

Manual Adjustments

---

# Inventory Types

Raw Material

Ingredient

Finished Product

Semi Finished Product

Packaging

Disposable Items

Cleaning Supplies

Future Assets

---

# Stock Status

Available

Low Stock

Out Of Stock

Reserved

Damaged

Expired

Inactive

---

# Inventory Item

Item Name

SKU

Barcode

Category

Unit

Cost Price

Average Cost

Minimum Stock

Maximum Stock

Current Stock

Reserved Stock

Available Stock

Supplier

Warehouse

Branch

Status

---

# Units

Piece

Gram

Kilogram

Milliliter

Liter

Bottle

Can

Pack

Box

Custom Unit

Unlimited units supported.

---

# Warehouses

Main Warehouse

Kitchen Warehouse

Bar Warehouse

Branch Warehouse

Temporary Warehouse

Unlimited warehouses supported.

---

# Multi Branch

Each branch has independent inventory.

Optional central warehouse.

Inter-branch transfers supported.

---

# Inventory Movements

Purchase

Sale

Recipe Consumption

Waste

Return

Transfer

Manual Adjustment

Production

Opening Balance

Closing Balance

Every movement is immutable.

---

# Movement Information

Movement Number

Movement Type

Reference

Reason

Source

Destination

Quantity

Unit

User

Date

Notes

---

# Business Workflow

Purchase

↓

Receive Stock

↓

Warehouse

↓

Recipe Consumption

↓

Sale

↓

Stock Reduced

↓

Reports Updated

---

# State Machine

Available

↓

Reserved

↓

Consumed

↓

Completed

OR

Available

↓

Damaged

↓

Disposed

Invalid transitions rejected.

---

# Event Flow

Purchase Received

↓

Inventory Increased

↓

Recipe Consumed

↓

Inventory Reduced

↓

Low Stock Triggered

↓

Notification Sent

↓

Purchase Recommendation

---

# Reservation

Stock can be reserved.

Reservation expires automatically if unused.

Reserved stock is unavailable for other orders.

---

# Stock Adjustment

Increase

Decrease

Correction

Inventory Count

Manager approval optional.

---

# Waste Management

Spoiled

Broken

Expired

Kitchen Waste

Customer Return Waste

Waste reason required.

---

# Expiration

Batch Number

Production Date

Expiration Date

FIFO

FEFO (Future)

Automatic expiration alerts.

---

# Batch Tracking

Supported.

Each batch stores

Quantity

Cost

Expiration

Supplier

Purchase Reference

---

# Barcode

Single Barcode

Future Multiple Barcodes

Scanner Supported

QR Supported

---

# Cost Calculation

Average Cost

FIFO

Future

LIFO

Weighted Average

Configurable.

---

# Inventory Count

Full Count

Partial Count

Cycle Count

Variance Report

Adjustment Approval

---

# Low Stock

Configurable thresholds.

Automatic notification.

Purchase suggestion generated.

---

# Search

Search By

Name

SKU

Barcode

Supplier

Category

Warehouse

Batch

---

# Filters

Warehouse

Category

Status

Supplier

Low Stock

Out Of Stock

Expired

Branch

---

# Dashboard

Inventory Value

Low Stock

Out Of Stock

Expiring Soon

Today's Consumption

Today's Adjustments

Warehouse Health

---

# Reports

Stock Movement

Inventory Valuation

Consumption Report

Waste Report

Adjustment Report

Batch Report

Expiration Report

Supplier Report

---

# API

GET Inventory

GET Inventory Item

POST Inventory Item

PATCH Inventory Item

DELETE Inventory Item (Soft Delete)

Stock Adjustment

Transfer Stock

Reserve Stock

Release Reservation

Inventory Count

---

# Database Requirements

Tables

inventory_items

inventory_movements

inventory_batches

inventory_adjustments

inventory_reservations

warehouses

warehouse_transfers

inventory_counts

All tables include

tenant_id

created_at

updated_at

deleted_at

---

# Performance Requirements

Inventory Lookup

<150ms

Stock Adjustment

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

Soft Delete Only

Audit Logging Required

---

# Audit

Item Created

Item Updated

Stock Increased

Stock Reduced

Transfer Completed

Adjustment Approved

Inventory Count Completed

Waste Recorded

Every movement logged permanently.

---

# Error Handling

Negative Stock

Invalid Unit

Expired Batch

Duplicate SKU

Warehouse Not Found

Reservation Conflict

Friendly messages only.

---

# AI Ready

Demand Forecast

Automatic Purchase Suggestion

Waste Prediction

Consumption Prediction

Inventory Optimization

Seasonal Forecast

Future Support

---

# AI Rules

Claude Code must never

Allow negative inventory unless configuration permits.

Delete movement history.

Modify historical inventory records.

Skip audit logging.

Skip tenant validation.

Calculate stock directly from product tables.

Inventory is event-driven.

---

# Module Integration

Products

Recipes

Orders

Purchases

Suppliers

Reports

Notifications

Dashboard

Accounting (Future)

Modules communicate through events.

---

# Future Ready

RFID

IoT Sensors

Smart Shelves

Warehouse Robots

Multi Warehouse Network

Predictive Inventory

No architecture changes required.

---

# Final Rule

Inventory is the single source of truth for stock.

Every quantity change must generate an inventory movement.

Inventory history can never be lost.
