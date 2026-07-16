# RestaurantOS Recipe Management Module

Version: 1.0

---

# Goal

The Recipe Module defines how products are produced.

Every sellable product may consume one or more inventory items.

Recipes provide automatic inventory deduction,
food cost calculation and production management.

This module must support restaurants of any size.

---

# Business Scope

Recipes are connected to:

Products

Inventory

Purchases

Suppliers

Orders

Reports

Production

Future Accounting

---

# Recipe Types

Simple Recipe

Composite Recipe

Semi Finished Recipe

Production Recipe

Custom Recipe

Future Dynamic Recipe

---

# Examples

Coffee

↓

Coffee Beans

Milk

Sugar

Cup

----------------

Pizza

↓

Dough

Cheese

Tomato Sauce

Pepperoni

Box

----------------

Burger

↓

Bread

Patty

Cheese

Sauce

Vegetables

---

# Recipe Status

Draft

Active

Inactive

Archived

Deleted (Soft Delete)

---

# Recipe Information

Recipe Name

Recipe Code

Linked Product

Description

Version

Status

Preparation Time

Yield Quantity

Default Unit

Notes

---

# Ingredients

Each recipe contains

Inventory Item

Quantity

Unit

Waste Percentage

Optional Flag

Substitution Allowed

---

# Ingredient Rules

Required

Optional

Alternative Ingredient

Minimum Quantity

Maximum Quantity

Automatic Validation

---

# Units

Gram

Kilogram

Milliliter

Liter

Piece

Bottle

Pack

Box

Custom Unit

Automatic unit conversion supported.

---

# Yield

Recipe may produce

One Unit

Multiple Units

Fractional Units

Example

1 Batch Dough

↓

10 Pizza Bases

---

# Production

Recipe

↓

Production Order

↓

Consume Ingredients

↓

Produce Finished Goods

↓

Inventory Updated

---

# Cost Calculation

Ingredient Cost

Packaging Cost

Waste Cost

Preparation Cost (Future)

Labor Cost (Future)

Energy Cost (Future)

Total Cost

Gross Profit

Profit Margin

Calculated automatically.

---

# Waste

Each ingredient may define

Preparation Waste

Cooking Waste

Serving Waste

Waste tracked separately.

---

# Substitutions

Allowed only if configured.

Example

Mozzarella

↓

Cheddar

Manager approval optional.

---

# Availability

Recipe Active

Recipe Inactive

Automatic validation before selling.

---

# Versioning

Recipes support version history.

Previous versions remain available for reporting.

No historical recipe is deleted.

---

# Business Workflow

Create Recipe

↓

Assign Ingredients

↓

Calculate Cost

↓

Approve Recipe

↓

Activate

↓

Sell Product

↓

Consume Inventory

↓

Update Reports

---

# State Machine

Draft

↓

Active

↓

Inactive

↓

Archived

Deleted only through Soft Delete.

---

# Event Flow

Recipe Created

↓

Recipe Approved

↓

Product Sold

↓

Inventory Reduced

↓

Cost Updated

↓

Reports Updated

---

# Validation

Every ingredient must exist.

Negative quantities forbidden.

Duplicate ingredients forbidden.

Recipe without product forbidden.

Unit validation required.

---

# Search

Search By

Recipe Name

Product

Ingredient

Recipe Code

Category

---

# Filters

Status

Category

Preparation Time

Food Cost

Branch

Product

---

# Dashboard

Active Recipes

Inactive Recipes

Highest Cost Recipes

Lowest Margin Recipes

Recently Updated

Missing Ingredients

---

# Reports

Food Cost Report

Recipe Cost Breakdown

Ingredient Usage

Profit Margin

Most Used Recipes

Least Used Recipes

Waste Analysis

Recipe Version History

---

# API

GET Recipes

GET Recipe

POST Recipe

PATCH Recipe

DELETE Recipe (Soft Delete)

Calculate Cost

Approve Recipe

Duplicate Recipe

Version History

---

# Database Requirements

Tables

recipes

recipe_items

recipe_versions

recipe_costs

recipe_waste_rules

recipe_substitutions

production_orders

All tables include

tenant_id

created_at

updated_at

deleted_at

---

# Performance Requirements

Recipe Lookup

<150ms

Cost Calculation

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

---

# Audit

Recipe Created

Recipe Updated

Recipe Approved

Ingredient Changed

Cost Recalculated

Version Created

Recipe Archived

Every modification permanently recorded.

---

# Error Handling

Missing Ingredient

Invalid Unit

Duplicate Ingredient

Negative Quantity

Inactive Inventory Item

Calculation Failure

Friendly messages only.

---

# AI Ready

Automatic Recipe Optimization

Ingredient Cost Prediction

Suggested Substitutions

Waste Reduction

Profit Optimization

Seasonal Recipe Suggestions

Future Support

---

# AI Rules

Claude Code must never

Modify historical recipe versions.

Delete recipe history.

Consume inventory without a valid recipe.

Skip food cost calculation.

Skip audit logging.

Skip tenant validation.

Recipe calculations must always use current inventory cost rules.

---

# Module Integration

Products

Inventory

Orders

Purchases

Suppliers

Reports

Dashboard

Accounting (Future)

Modules communicate through events.

---

# Future Ready

Central Recipe Library

Franchise Recipe Distribution

Nutrition Facts

Calories

Allergens

Recipe Images

AI Chef Assistant

No architecture changes required.

---

# Final Rule

A recipe is the single source of truth for product production.

Every inventory consumption and food cost calculation must originate from an approved recipe.
