# RestaurantOS Database Design

Version: 1.0

---

# Goal

The database must support:

- Multi Tenant
- High Performance
- Scalability
- Data Integrity
- Easy Backup
- AI Friendly Development

---

# Database Engine

PostgreSQL

ORM

Prisma ORM

---

# Global Rules

Every business table MUST contain:

id

tenant_id

created_at

updated_at

deleted_at

created_by

updated_by

---

# Primary Key

UUID

Never use incremental IDs for public APIs.

---

# Soft Delete

Every business table uses:

deleted_at

No physical delete.

---

# Audit

Important changes must be stored.

Examples

Create

Update

Delete

Login

Logout

Permission Change

Price Change

Inventory Change

---

# Tenant Isolation

Every query MUST filter by

tenant_id

No exception.

---

# Core Tables

tenants

users

roles

permissions

role_permissions

user_roles

settings

feature_flags

audit_logs

files

notifications

---

# Restaurant Tables

branches

tables

table_sections

waiters

kitchens

printers

devices

---

# Product Tables

categories

products

product_images

product_prices

product_variants

addons

addon_groups

modifier_groups

modifier_items

---

# Inventory Tables

warehouses

inventory_items

inventory_transactions

stock_adjustments

suppliers

purchase_orders

recipes

recipe_items

waste_records

---

# Customer Tables

customers

customer_addresses

customer_wallets

customer_points

customer_groups

customer_feedback

---

# Order Tables

orders

order_items

order_status_history

order_payments

discounts

taxes

coupons

delivery_orders

drivers

---

# Accounting Tables

cashboxes

transactions

expenses

income

payment_methods

shift_reports

---

# Reporting Tables

daily_reports

monthly_reports

dashboard_cache

---

# Website Tables

website_pages

website_banners

website_sliders

website_settings

menus

qr_codes

---

# Index Rules

Create indexes for:

tenant_id

created_at

status

order_number

phone

barcode

sku

email

Never leave frequently searched fields without indexes.

---

# Foreign Keys

Always use Foreign Keys.

Never store duplicated relations.

---

# Money

Use DECIMAL.

Never FLOAT.

---

# Dates

Always use UTC.

Frontend converts timezone.

---

# Images

Database stores only:

file_path

file_name

mime_type

size

Never store binary images.

---

# Order Number

Readable.

Example

100001

100002

100003

UUID is internal only.

---

# Transactions

Required for:

Order Creation

Inventory Update

Payment

Refund

Purchase

Stock Transfer

---

# Backup

Daily Full Backup

Hourly Incremental Backup

Point-in-Time Recovery Ready

---

# Archive

Old logs

Old reports

Old notifications

Can be archived.

Business data must remain accessible.

---

# Performance Rules

Maximum query time:

100ms

Avoid N+1 Queries

Use Pagination

Limit SELECT *

Load only required columns

Use Cache where appropriate

---

# Naming Convention

Tables

snake_case

Columns

snake_case

Indexes

idx_table_column

Foreign Keys

fk_table_reference

Unique

uq_table_column

---

# AI Rules

Claude Code must:

Never create tables outside this document.

Never rename tables without documentation.

Never remove columns automatically.

Every schema change requires Prisma Migration.

---

# Versioning

All schema changes must be tracked.

Every migration requires documentation.

Rollback must always be possible.

---

# Future Support

Multi Branch

Multi Currency

Multi Language

Franchise

Marketplace

Business Intelligence

External API Integration

Without redesigning the database.
