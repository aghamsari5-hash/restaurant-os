# RestaurantOS Authentication & Authorization

Version: 1.0

---

# Goal

The authentication system must be:

- Secure
- Fast
- Stateless
- Multi Tenant
- Scalable
- Easy to maintain

---

# Authentication Method

JWT Access Token

JWT Refresh Token

---

# Login Methods

Email

Phone Number

Username

Future:

Google

Apple

Microsoft

---

# Password Rules

Minimum 8 Characters

Maximum 64 Characters

Must contain:

Uppercase

Lowercase

Number

Special Character

Passwords are hashed using bcrypt.

Passwords are NEVER stored in plain text.

---

# Session

Stateless

Redis stores refresh sessions.

---

# Token Lifetime

Access Token

15 Minutes

Refresh Token

30 Days

Configurable.

---

# Logout

Single Device Logout

Logout All Devices

Invalidate Refresh Token

---

# Tenant Isolation

Every authenticated request contains:

tenant_id

user_id

role_id

Every API validates tenant ownership.

Cross-tenant access is forbidden.

---

# User Status

ACTIVE

INACTIVE

SUSPENDED

PENDING

DELETED

Inactive users cannot login.

---

# Roles

Owner

Manager

Cashier

Waiter

Kitchen

Inventory

Accountant

Customer

Developer

Custom Role

---

# Permissions

Permission Based Access Control (RBAC)

Example:

products.view

products.create

products.update

products.delete

orders.view

orders.create

orders.cancel

reports.view

inventory.manage

dashboard.view

settings.manage

Every permission is stored in the database.

No permission is hardcoded.

---

# Feature Permission

If a module is disabled,

its permissions are automatically ignored.

Example:

Inventory Disabled

↓

Inventory Menu Hidden

↓

Inventory APIs Disabled

---

# Login Flow

User

↓

Validate Credentials

↓

Validate Tenant

↓

Validate Status

↓

Generate JWT

↓

Generate Refresh Token

↓

Return User Profile

---

# Refresh Flow

Refresh Token

↓

Validate

↓

Issue New Access Token

↓

Return New Token

---

# Password Reset

OTP

SMS

Email

Future:

Authenticator App

---

# OTP

Length

6 Digits

Expiration

120 Seconds

Stored in Redis

Maximum Attempts

5

---

# Failed Login

Maximum Failed Attempts

5

After:

Temporary Lock

30 Minutes

Repeated attacks trigger security logs.

---

# Security Headers

HTTPS Required

Helmet

CORS

Rate Limiting

Input Validation

SQL Injection Protection

XSS Protection

---

# Audit Log

Every authentication action must be logged.

Examples:

Login

Logout

Password Change

Password Reset

Role Change

Permission Change

Failed Login

Token Revoked

---

# Device Management

Each login creates a device session.

Fields

Device Name

Browser

Operating System

IP Address

Last Activity

Users can remove devices.

---

# Multi Device

Supported

Unlimited Devices

Configurable.

---

# API Security

Every protected endpoint requires:

Authorization Bearer Token

Tenant Validation

Permission Validation

Feature Validation

---

# Public APIs

Website

Menu

QR Menu

Restaurant Information

Customer Registration

These APIs require rate limiting.

---

# Internal APIs

Accessible only by authenticated staff.

---

# Owner Rules

Each Tenant has one Owner.

Owner cannot be deleted.

Owner always has full permissions.

---

# Super Admin

System Level Only.

Can manage all tenants.

Cannot perform restaurant operations.

---

# Future Authentication

Two Factor Authentication

Passkeys

Biometric Login

Magic Link

Single Sign-On

---

# Development Rules

Never trust frontend validation.

Always validate permissions in backend.

Never expose sensitive user data.

Never return password hashes.

Never log passwords.

Never store tokens in database.

Never bypass tenant validation.

---

# Performance Rules

Authentication Response

Target < 150ms

Permission Check

Target < 20ms

Redis must be used whenever possible.

---

# AI Rules

Claude Code must never bypass authentication.

Every new API must define:

Authentication Required?

Permission Required?

Feature Required?

Tenant Validation?

If any answer is missing,

the API implementation is rejected.
