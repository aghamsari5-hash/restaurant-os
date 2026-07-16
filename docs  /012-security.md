
# RestaurantOS Security Standards

Version: 1.0

---

# Goal

RestaurantOS must protect:

Customer Data

Business Data

Financial Data

Employee Data

System Availability

Security is mandatory.

Performance must never replace security.

---

# Security Principles

Least Privilege

Zero Trust

Defense in Depth

Fail Secure

Secure by Default

---

# Authentication

JWT Access Token

JWT Refresh Token

Refresh Token Rotation

Password Hash

bcrypt

Future

Passkey

2FA

OAuth

---

# Authorization

RBAC

Role Based Access Control

Permission Based Access Control

Every request validates:

Authentication

Tenant

Permission

Feature

Resource Ownership

---

# Multi Tenant Security

Tenant isolation is mandatory.

Every database query must include:

tenant_id

Cross-tenant access is forbidden.

---

# Password Policy

Minimum

8 Characters

Maximum

64 Characters

Must contain

Uppercase

Lowercase

Number

Special Character

Never store plain text passwords.

---

# Password Storage

bcrypt

Configurable Work Factor

Never encrypt passwords.

Always hash.

---

# Session Security

Refresh Token

Stored securely.

Support:

Logout

Logout All Devices

Token Revocation

Device Management

---

# Rate Limiting

Public APIs

60 Requests / Minute

Authenticated APIs

300 Requests / Minute

Login Endpoint

10 Requests / Minute

Redis Based

---

# Input Validation

Every request must be validated.

Reject:

Invalid Types

Unknown Fields

Unexpected Values

Oversized Payloads

Never trust frontend validation.

---

# SQL Injection

Use Prisma ORM only.

Never concatenate SQL strings.

Always use parameterized queries.

---

# XSS Protection

Escape user-generated content.

Sanitize HTML.

Never trust browser input.

---

# CSRF

Enable where required.

Use SameSite Cookies when applicable.

---

# CORS

Whitelist Origins

No wildcard in production.

---

# Security Headers

Helmet

Content Security Policy

X-Frame-Options

X-Content-Type-Options

Referrer Policy

Permissions Policy

---

# HTTPS

Production must use HTTPS.

HTTP automatically redirects to HTTPS.

---

# Sensitive Data

Never expose:

Password

Hash

Refresh Token

Secret Keys

Internal IDs

Database Errors

Stack Traces

---

# File Upload

Allowed Types

Images

PDF

CSV

Maximum Size Configurable

Scan uploaded files.

Rename uploaded files.

Store outside public directory.

---

# API Security

Every endpoint defines:

Authentication Required

Permission Required

Feature Required

Tenant Validation

Swagger documentation required.

---

# Logging

Never log:

Passwords

JWT

Refresh Tokens

Credit Card Data

Sensitive Personal Data

---

# Audit Log

Record:

Login

Logout

Password Change

Permission Change

Role Change

Feature Change

Price Change

Inventory Change

Order Cancellation

Refund

Delete

Logs are immutable.

---

# Soft Delete

Never permanently delete business data.

Use:

deleted_at

---

# Backup Security

Encrypted Backup

Daily Backup

Point-in-Time Recovery

Restricted Access

---

# Secrets

Never hardcode secrets.

Use Environment Variables.

Examples

JWT Secret

Database Password

Redis Password

API Keys

SMS Keys

Payment Gateway Keys

---

# Error Messages

User

Friendly Message

Developer

Detailed Log

Never expose internal implementation.

---

# Monitoring

Monitor:

Failed Logins

Rate Limit Violations

Permission Violations

Unexpected Errors

Server Health

Database Health

Queue Health

---

# Device Tracking

Store

Browser

Operating System

IP Address

Device Name

Last Activity

---

# Fraud Protection

Detect:

Repeated Failed Login

Brute Force

Token Abuse

Suspicious Requests

Repeated Payment Attempts

---

# Data Encryption

Encrypt:

Sensitive Configuration

API Keys

Backup Files

Do not encrypt searchable business fields.

---

# Security Testing

Run:

Dependency Scan

Static Analysis

Unit Tests

Penetration Testing

Before production deployment.

---

# Dependency Management

Update packages regularly.

Avoid deprecated libraries.

Remove unused packages.

---

# Production Rules

Debug Mode Disabled

Swagger Protected

Source Maps Disabled

Verbose Errors Disabled

Secure Cookies Enabled

---

# AI Rules

Claude Code must never:

Hardcode Secrets

Disable Authentication

Skip Permission Checks

Skip Tenant Validation

Return Stack Traces

Log Sensitive Data

Store Passwords

Create Public Endpoints Without Documentation

---

# Final Rule

If security and convenience conflict,

Security wins.

No exception.
