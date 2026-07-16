# RestaurantOS Product Options Module

Version: 1.0

---

# Goal

The Product Options Module allows a single product to have configurable choices
without creating duplicate products.

Examples:

Pizza

→ Size

→ Dough

→ Cheese

Coffee

→ Size

→ Sugar

→ Ice

Burger

→ Cooking Level

→ Bread Type

→ Sauce

This module must support unlimited option combinations.

---

# Business Rules

A Product can have:

Zero Options

One Option

Unlimited Options

Each option belongs to one product.

Options are reusable when configured by administrators.

---

# Option Types

Single Choice

Multiple Choice

Text Input

Number Input

Boolean

Date (Future)

Color (Future)

Image Selection (Future)

---

# Examples

Pizza

Size

○ Small

○ Medium

○ Large

----------------

Coffee

Sugar

○ No Sugar

○ Low

○ Normal

○ Extra

----------------

Burger

Extras

☑ Cheese

☑ Bacon

☑ Mushroom

---

# Option Groups

Examples

Size

Sauce

Bread

Temperature

Sugar

Cooking Level

Each group contains one or more option values.

---

# Selection Rules

Required

Optional

Minimum Selection

Maximum Selection

Default Selection

Unlimited configuration.

---

# Pricing

Every option value can modify price.

Examples

Large Pizza

+80,000

Extra Cheese

+30,000

No Onion

+0

---

# Inventory

Configurable.

Option values may:

Track Inventory

Ignore Inventory

Example

Extra Cheese

↓

Inventory Tracked

Example

Cooking Level

↓

Inventory Ignored

---

# Availability

Option values may have:

Start Date

End Date

Specific Days

Specific Hours

Branch Availability

---

# Visibility

POS

Website

QR Menu

Mobile App

API

Independent visibility supported.

---

# Display Order

Manual

Alphabetical

Price

Popularity

Custom

---

# Product Images

Option values may override product image.

Example

Pizza

↓

Large Pizza Image

Medium Pizza Image

---

# Kitchen

Selected options must appear in:

Kitchen Receipt

Kitchen Display (KDS)

Kitchen Printer

---

# Receipt

Customer receipt must include:

Product Name

Selected Options

Extra Prices

Notes

---

# Validation

Required groups must be selected.

Maximum selections enforced.

Duplicate selections forbidden.

Price adjustments validated.

---

# Search

Search by:

Option Group

Option Value

Product

Fast response required.

---

# Reports

Most Selected Options

Least Selected Options

Extra Revenue

Popular Combinations

Unused Options

---

# API

GET Product Options

GET Option Groups

POST Option Group

PATCH Option Group

DELETE Option Group

GET Option Values

POST Option Value

PATCH Option Value

DELETE Option Value

---

# Database Requirements

Tables

option_groups

option_values

product_option_groups

product_option_values

All tables must support:

tenant_id

created_at

updated_at

deleted_at

---

# UI Requirements

Large touch-friendly controls.

Clear grouping.

Price changes visible instantly.

Selections must require minimal taps.

Support keyboard navigation.

---

# Performance Requirements

Maximum response time

200 ms

Maximum API calls per page

5

Cache frequently used option groups.

---

# Security Requirements

Tenant validation required.

Permission validation required.

Feature validation required.

Soft delete only.

Audit every modification.

---

# AI Rules

Claude Code must never:

Duplicate option groups.

Mix option logic with product logic.

Hardcode option values.

Ignore validation rules.

Ignore tenant isolation.

Store calculated prices permanently.

---

# Future Ready

AI Suggested Options

Smart Recommendations

Dynamic Pricing

Seasonal Options

Location-Based Options

Time-Based Options

Personalized Options

No architecture changes required.

---

# Final Rule

A Product Option changes how a product is ordered.

It never creates a new product unless explicitly configured as a Product Variant.
