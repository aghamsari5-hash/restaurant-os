
# RestaurantOS Category Module

Version: 1.0

---

# Goal

The Category Module organizes products into logical groups.

Categories improve:

Navigation

Product Discovery

Reporting

Filtering

Website SEO

QR Menu

POS Speed

A category is a business object, not only a visual grouping.

---

# Rules

Every product belongs to at least one category.

Every category belongs to one tenant.

Categories are reusable.

Categories support unlimited hierarchy.

Categories never contain inventory information.

---

# Category Types

Main Category

Sub Category

Collection

Seasonal Category

Virtual Category

Future Smart Category

---

# Examples

Main

Pizza

Burger

Drink

Dessert

Coffee

---

Sub Category

Hot Coffee

Cold Coffee

Energy Drink

Italian Pizza

American Pizza

---

Collection

Chef Special

Popular

New Products

Recommended

Best Seller

---

Seasonal

Ramadan

Christmas

Nowruz

Summer

Winter

Breakfast

Lunch

Dinner

---

# Category Status

Draft

Active

Inactive

Hidden

Archived

Deleted (Soft Delete)

---

# Visibility

POS

Website

QR Menu

Mobile App

API

Marketplace

Each visibility is configurable.

---

# Category Information

Name

Short Name

Description

Image

Banner

Icon

Slug

Sort Order

Color (Optional)

SEO Title

SEO Description

---

# Parent Category

Unlimited nesting.

Example

Food

↓

Pizza

↓

Italian Pizza

↓

Special Pizza

No architecture limit.

---

# Sorting

Manual

Alphabetical

Newest

Best Selling

Highest Revenue

Most Viewed

Custom

---

# Empty Categories

Configurable

Hide Empty Categories

or

Show Empty Categories

---

# Product Assignment

One product

↓

One primary category

↓

Unlimited secondary categories

---

# Availability

Every Day

Specific Days

Specific Hours

Example

Breakfast

06:00

11:00

Category automatically hides outside schedule.

---

# Branch Support

Each branch can:

Hide Category

Change Sort Order

Enable

Disable

No duplicated categories.

---

# Images

Thumbnail

Banner

Mobile Banner

Optimized

WebP Preferred

---

# POS

Large Category Buttons

Icon Optional

Fast Switching

Touch Friendly

Maximum 2 Clicks to Products

---

# Website

SEO Friendly URL

Breadcrumb

Banner

Description

Featured Products

Popular Products

Related Categories

---

# QR Menu

Category Image

Category Description

Product Count

Available Products Only

Out Of Stock Products Optional

---

# Reports

Sales Per Category

Profit Per Category

Orders Per Category

Views Per Category

Conversion Rate

Top Categories

Worst Categories

---

# Dashboard

Today's Best Category

Weekly Best Category

Monthly Best Category

Hidden Categories

Inactive Categories

Empty Categories

---

# Search

Search By

Name

Slug

Description

Product Name

Fast Search Required

---

# Filters

Status

Visibility

Branch

Schedule

Parent Category

Empty

Product Count

---

# API

GET Categories

GET Category

POST Category

PATCH Category

DELETE Category (Soft Delete)

Bulk Update

Bulk Status

Bulk Sort

---

# Validation

Category Name Required

Unique Name Per Parent

Circular Parent Forbidden

Deleted Parent Forbidden

---

# Performance

Maximum Depth

Unlimited

Recommended

5 Levels

Search

<300ms

Category List

<200ms

Maximum 5 API Calls Per Screen

---

# Security

Tenant Validation

Permission Validation

Feature Validation

Soft Delete Only

Audit Log Required

---

# AI Rules

Claude Code must never:

Hard delete categories.

Create circular category trees.

Duplicate category names under the same parent.

Store products inside category records.

Mix category logic with product logic.

Ignore tenant isolation.

---

# Future Ready

Smart Categories

AI Generated Categories

Automatic Product Classification

Dynamic Collections

Marketing Categories

Campaign Categories

Marketplace Categories

No architecture changes required.

---

# Final Rule

Categories organize products.

They never replace products.

Every screen in RestaurantOS must use the same category structure.
