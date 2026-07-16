
# RestaurantOS Product Module

Version: 1.0

---

# Goal

The Product Module is the heart of RestaurantOS.

Every item that can be sold, displayed or managed
must be represented as a Product.

The module must support:

Restaurant

Cafe

Fast Food

Bakery

Coffee Shop

Dessert Shop

Food Court

Without changing the architecture.

---

# Product Types

Simple Product

Variable Product

Combo Product

Service

Digital Product (Future)

Gift Card (Future)

Subscription (Future)

---

# Examples

Simple

Water

Coffee

Tea

---

Variable

Pizza

Small

Medium

Large

---

Combo

Burger Combo

Burger

Fries

Drink

---

# Product Status

Draft

Active

Inactive

Out Of Stock

Hidden

Archived

Deleted (Soft Delete)

---

# Product Visibility

POS

Website

QR Menu

Mobile App

API

Marketplace (Future)

Each visibility can be enabled independently.

---

# Temporary Hide

A product can be hidden.

Hidden products

Not shown

Cannot be ordered

Remain in database

Remain in reports

No data loss.

---

# Out Of Stock

Product remains visible.

Order button disabled.

Label

Out Of Stock

Customer can still see product details.

---

# Product Information

Name

Short Name

Description

Short Description

Category

Barcode

SKU

Brand

Tags

Preparation Time

Sort Order

Image

Gallery

---

# Pricing

Base Price

Sale Price

Cost Price

Tax

Service Charge

Discount

Future Price

Scheduled Price

---

# Multiple Prices

Support

Dine In

Takeaway

Delivery

Online

Wholesale

VIP

Each price independent.

---

# Product Images

Main Image

Gallery

Thumbnail

Optimized

WebP Preferred

Lazy Loading

---

# Categories

One Primary Category

Multiple Secondary Categories

Unlimited Depth

---

# Product Options

Size

Flavor

Cooking Level

Temperature

Sugar Level

Ice Level

Any custom option.

---

# Modifiers

Extra Cheese

Extra Sauce

Extra Meat

No Onion

No Salt

No Ice

Unlimited modifiers.

---

# Modifier Rules

Required

Optional

Minimum Selection

Maximum Selection

Extra Price

Default Selection

---

# Addons

Linked products.

Examples

Drink

Dessert

Sauce

Bread

Can increase average order value.

---

# Related Products

Recommended products.

Examples

Pizza

↓

Drink

Dessert

Garlic Bread

Displayed automatically.

---

# Availability

Every Day

Specific Days

Specific Hours

Example

Breakfast

06:00

11:00

Automatically unavailable outside schedule.

---

# Branch Support

Each branch can have:

Different Price

Different Availability

Different Stock

Different Status

---

# Inventory

Track Inventory

Do Not Track

Unlimited Stock

Low Stock Alert

Minimum Stock

Maximum Stock

---

# Barcode

One Barcode

Multiple Barcodes (Future)

QR Support

Scanner Support

---

# SKU

Unique per Tenant.

Automatically generated if empty.

---

# Tax

Tax Included

Tax Excluded

Tax Exempt

---

# Kitchen

Kitchen Category

Preparation Station

Preparation Time

Printer Mapping

KDS Mapping

---

# Printing

Kitchen Printer

Bar Printer

Receipt Printer

Unlimited printers.

---

# Product Notes

Internal Notes

Kitchen Notes

Customer Notes

Displayed according to permissions.

---

# Search

Name

Barcode

SKU

Tags

Category

Fast Search Required.

---

# Sorting

Name

Price

Newest

Best Selling

Manual

Alphabetical

---

# Product Labels

New

Popular

Chef Choice

Hot

Spicy

Vegetarian

Vegan

Halal

Gluten Free

Custom Labels

---

# Product Badges

Discount

Limited Time

Recommended

Best Seller

Seasonal

---

# Reviews

Rating

Comment

Images (Future)

Owner Reply

Average Rating

Can be disabled per tenant.

---

# Favorites

Customers can bookmark products.

Future recommendation engine.

---

# SEO

Slug

Meta Title

Meta Description

Open Graph Image

Schema.org

---

# QR Menu

Display

Image

Description

Price

Options

Modifiers

Availability

Rating

Out Of Stock Status

---

# Website

Product URL

Gallery

Reviews

Related Products

Recommendations

Share Button

---

# POS

Large Buttons

Image Optional

Fast Search

Barcode Scan

Keyboard Shortcut

Touch Friendly

---

# Dashboard

Show

Top Selling

Lowest Selling

Highest Profit

Lowest Profit

Out Of Stock

Low Stock

Recently Added

Hidden Products

Inactive Products

---

# Reports

Sales

Revenue

Profit

Quantity Sold

Cancellation

Refund

Average Rating

Most Viewed

Least Viewed

---

# API

GET Products

GET Product

POST Product

PATCH Product

DELETE Product (Soft Delete)

Bulk Update

Bulk Delete

Bulk Status

Bulk Price

---

# Validation

Product Name Required

Category Required

Price Required

Duplicate SKU Forbidden

Negative Price Forbidden

---

# Performance

Search

<300ms

Create

<200ms

Update

<200ms

Maximum 5 API calls per page.

---

# AI Rules

Claude Code must never:

Hard delete products.

Mix inventory logic inside product logic.

Store product images in database.

Create duplicate SKUs.

Ignore branch-specific settings.

Bypass feature validation.

---

# Future Ready

Nutrition Facts

Calories

Allergens

AI Recommendations

Dynamic Pricing

Subscriptions

Marketplace

Multi Vendor

Recipe Cost Calculation

Product Bundles

Seasonal Menus

No architecture changes required.
