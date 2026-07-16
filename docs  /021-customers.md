# RestaurantOS Customer Module

Version: 1.0

---

# Goal

The Customer Module manages all customer information across RestaurantOS.

Every customer interaction should be recorded to improve service,
increase loyalty and support business growth.

The module must support:

Restaurant

Cafe

Fast Food

Bakery

Coffee Shop

Delivery

Online Ordering

Without changing the architecture.

---

# Customer Types

Guest

Registered Customer

VIP Customer

Corporate Customer

Loyalty Member

Future

Wholesale Customer

Franchise Customer

---

# Customer Status

New

Active

Inactive

Blocked

Archived

Deleted (Soft Delete)

---

# Customer Information

First Name

Last Name

Display Name

Phone Number

Email

Birthday

Gender

Profile Image

National ID (Optional)

Tax Number (Optional)

Notes

Tags

---

# Contact Information

Primary Phone

Secondary Phone

Email

Preferred Contact Method

Language

Timezone

---

# Addresses

Unlimited Addresses

Home

Work

Other

Each address contains

Province

City

Street

Postal Code

Latitude

Longitude

Description

Default Address

---

# Customer Groups

Regular

VIP

Gold

Silver

Corporate

Custom Groups

Customers may belong to multiple groups.

---

# Loyalty

Loyalty Enabled

Loyalty Disabled

Future

Level System

Point System

Reward System

---

# Wallet

Wallet Balance

Recharge

Payment

Refund

Cashback

Transaction History

---

# Cashback

Percentage

Fixed Amount

Campaign Based

Category Based

Product Based

Configurable.

---

# Customer Statistics

Total Orders

Completed Orders

Cancelled Orders

Refunded Orders

Total Spending

Average Order

Last Order

Favorite Product

Favorite Category

Visit Frequency

---

# Customer Preferences

Favorite Products

Favorite Categories

Preferred Payment Method

Preferred Order Type

Preferred Branch

Dietary Preferences (Future)

---

# Customer Notes

Internal Notes

Visible only to authorized staff.

Customer cannot view internal notes.

---

# Tags

VIP

Frequent Buyer

Birthday Campaign

Inactive

High Value

Custom Tags

Unlimited tags supported.

---

# Marketing

SMS

Email

Push Notification

WhatsApp (Future)

Telegram (Future)

Marketing permissions configurable.

---

# Reviews

Customer Rating

Customer Reviews

Restaurant Reply

Review History

---

# Surveys

Post Order Survey

Manual Survey

Campaign Survey

Results stored in customer profile.

---

# Referrals

Referral Code

Invited Friends

Rewards

Referral Statistics

Future Support

---

# Customer Timeline

Registration

Orders

Payments

Refunds

Wallet Activity

Loyalty Activity

Campaign Activity

Support Requests

Complete chronological history.

---

# Search

Search By

Name

Phone

Email

Customer Code

Order Number

Fast search required.

---

# Filters

Group

Status

Branch

Total Spending

Last Visit

Birthday

Tags

Loyalty Level

Wallet Balance

---

# Dashboard

New Customers

Returning Customers

VIP Customers

Birthdays Today

Inactive Customers

Top Customers

Customer Growth

---

# Reports

Customer Growth

Lifetime Value

Retention Rate

Average Spending

Most Loyal Customers

Top Referrals

Wallet Usage

Campaign Performance

---

# API

GET Customers

GET Customer

POST Customer

PATCH Customer

DELETE Customer (Soft Delete)

GET Customer Orders

GET Wallet Transactions

GET Loyalty History

---

# Database Requirements

Tables

customers

customer_addresses

customer_groups

customer_wallets

customer_wallet_transactions

customer_tags

customer_notes

customer_preferences

customer_timelines

All tables include

tenant_id

created_at

updated_at

deleted_at

---

# Performance Requirements

Search

<300ms

Customer Profile

<200ms

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

# Permissions

View Customers

Create Customers

Edit Customers

Delete Customers

Manage Wallet

Manage Loyalty

View Reports

Export Customers

---

# Audit

Customer Created

Customer Updated

Wallet Changed

Group Changed

Tag Added

Tag Removed

Address Updated

Customer Blocked

Customer Deleted

---

# AI Ready

Customer Segmentation

Customer Lifetime Value Prediction

Churn Prediction

Product Recommendations

Campaign Suggestions

Personalized Offers

Future Support

---

# AI Rules

Claude Code must never:

Hard delete customers.

Duplicate customer records.

Ignore phone number uniqueness.

Skip tenant validation.

Skip audit logging.

Expose sensitive customer data.

---

# Future Ready

CRM Integration

Marketing Automation

Customer Support Tickets

Membership Cards

Family Accounts

Subscription Plans

No architectural changes required.

---

# Final Rule

Every customer interaction must strengthen the customer relationship.

Customer history is a business asset and must never be lost.
