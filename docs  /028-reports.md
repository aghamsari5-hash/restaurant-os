# RestaurantOS Reports Module

Version: 1.0

---

# Goal

The Reports Module provides complete business intelligence for RestaurantOS.

It transforms operational data into actionable insights.

Reports must be fast, accurate, customizable and exportable.

---

# Business Scope

Reports collect data from

Orders

POS

Payments

Customers

Inventory

Recipes

Purchases

Suppliers

Tables

Waiters

Kitchen

Dashboard

Notifications

Future Accounting

---

# Report Categories

Sales Reports

Financial Reports

Order Reports

Customer Reports

Inventory Reports

Recipe Reports

Purchase Reports

Supplier Reports

Employee Reports

Kitchen Reports

Table Reports

System Reports

Audit Reports

---

# Time Filters

Today

Yesterday

This Week

Last Week

This Month

Last Month

This Year

Custom Date Range

Comparison Period

---

# Branch Filters

Current Branch

Selected Branches

All Branches

---

# Sales Reports

Gross Sales

Net Sales

Tax

Discounts

Refunds

Average Order Value

Orders Count

Hourly Sales

Daily Sales

Monthly Sales

Yearly Sales

Sales Trend

---

# Financial Reports

Revenue

Expenses

Profit

Profit Margin

Taxes

Cash Flow

Outstanding Payments

Payment Breakdown

---

# Order Reports

Completed Orders

Cancelled Orders

Refunded Orders

Pending Orders

Average Preparation Time

Average Completion Time

Order Sources

Order Types

---

# Customer Reports

New Customers

Returning Customers

VIP Customers

Lifetime Value

Visit Frequency

Average Spending

Birthdays

Wallet Usage

Loyalty Statistics

---

# Inventory Reports

Current Stock

Inventory Value

Low Stock

Out Of Stock

Expired Items

Waste

Consumption

Stock Movement

Inventory Turnover

---

# Recipe Reports

Food Cost

Profit Margin

Ingredient Consumption

Recipe Usage

Most Profitable Items

Least Profitable Items

---

# Purchase Reports

Purchase Volume

Purchase Cost

Pending Purchases

Supplier Deliveries

Purchase Returns

Purchase Trends

---

# Supplier Reports

Supplier Performance

Delivery Time

Return Rate

Purchase Value

Quality Rating

Top Suppliers

Inactive Suppliers

---

# Employee Reports

Cashier Sales

Waiter Performance

Working Hours

Attendance

Average Service Time

Tips

Refund Activity

---

# Kitchen Reports

Preparation Time

Delayed Orders

Kitchen Load

Station Performance

Completed Orders

Rejected Orders

---

# Table Reports

Occupancy Rate

Average Stay Time

Revenue Per Table

Reservation Statistics

Peak Hours

Table Utilization

---

# Audit Reports

User Activities

Permission Changes

Login History

Configuration Changes

Deleted Records

Security Events

---

# Report Widgets

Summary Cards

Charts

Tables

Heat Maps (Future)

KPIs

Trend Indicators

---

# Export Formats

PDF

Excel (XLSX)

CSV

JSON

Future API Export

---

# Scheduling

Daily Reports

Weekly Reports

Monthly Reports

Custom Schedule

Automatic Email (Future)

---

# Search

Search Reports

Saved Reports

Recent Reports

Favorite Reports

---

# Saved Reports

Users may save

Filters

Columns

Sorting

Charts

Export Format

---

# Business Workflow

Collect Data

↓

Aggregate

↓

Cache

↓

Generate Report

↓

Display

↓

Export

---

# State Machine

Requested

↓

Generating

↓

Ready

↓

Exported

↓

Archived

Failed reports logged automatically.

---

# Event Flow

Business Event

↓

Data Updated

↓

Aggregation

↓

Cache Refresh

↓

Report Available

↓

Dashboard Updated

---

# Performance

Report List

<200ms

Cached Report

<500ms

Large Report

<5 Seconds

Heavy reports processed asynchronously.

---

# Caching

Summary Reports

60 Seconds

Charts

120 Seconds

Large Reports

Configurable

---

# API

GET Reports

GET Report

Generate Report

Export Report

Save Report

Delete Saved Report

---

# Database Requirements

Use Read Models

Use Aggregated Tables

Use Cache Layer

Never execute heavy queries on transactional tables.

---

# Security

Authentication Required

Tenant Validation

Permission Validation

Feature Validation

Audit Logging Required

Reports respect user permissions.

---

# Permissions

View Reports

Export Reports

Schedule Reports

Financial Reports

Audit Reports

Management Reports

---

# Audit

Report Generated

Report Exported

Report Scheduled

Saved Report Created

Saved Report Deleted

Every action logged.

---

# Error Handling

Invalid Filter

No Data

Timeout

Export Failed

Permission Denied

Friendly recovery required.

---

# AI Ready

Sales Forecast

Demand Prediction

Customer Segmentation

Inventory Forecast

Anomaly Detection

Business Health Score

Executive Summary

Future Support

---

# AI Rules

Claude Code must never

Run expensive queries directly on transactional tables.

Generate reports without permission validation.

Bypass cache for heavy reports.

Expose data across tenants.

Skip audit logging.

---

# Module Integration

Dashboard

Orders

Payments

Customers

Inventory

Recipes

Purchases

Suppliers

Employees

Kitchen

Tables

Notifications

Accounting (Future)

Communication must occur through services or events.

---

# Future Ready

Custom Report Builder

Drag & Drop Reports

Business Benchmarking

AI Insights

Scheduled Email Reports

Public API Reports

No architecture changes required.

---

# Final Rule

Reports are the primary decision-making tool.

Every report must be accurate, performant and generated from trusted business data.
