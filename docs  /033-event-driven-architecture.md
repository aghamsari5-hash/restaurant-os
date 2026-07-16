# RestaurantOS Event Driven Architecture

Version: 1.0

---

# Purpose

RestaurantOS uses Event Driven Architecture (EDA)
to decouple business modules.

Every important business action publishes an event.

Modules react to events instead of calling each other directly.

---

# Goals

Loose Coupling

High Scalability

High Maintainability

Extensibility

Real-Time Updates

Future Microservices Compatibility

---

# Architecture

Business Action

↓

Domain Event

↓

Event Bus

↓

Subscribers

↓

Business Processing

↓

Notifications

↓

Reports

↓

Dashboard

---

# Event Principles

Events describe something that already happened.

Events are immutable.

Events are never modified.

Events may be replayed.

Events are append-only.

---

# Event Categories

Business Events

System Events

Security Events

Integration Events

Audit Events

Notification Events

---

# Business Events

ProductCreated

ProductUpdated

ProductDeleted

CategoryCreated

CategoryUpdated

ModifierCreated

ModifierUpdated

OrderCreated

OrderUpdated

OrderCancelled

OrderCompleted

PaymentReceived

PaymentRefunded

CustomerCreated

CustomerUpdated

ReservationCreated

ReservationCancelled

InventoryIncreased

InventoryReduced

InventoryAdjusted

PurchaseCreated

PurchaseApproved

PurchaseReceived

SupplierCreated

RecipeCreated

RecipeUpdated

KitchenOrderCreated

KitchenOrderReady

KitchenOrderCompleted

TableAssigned

TableReleased

NotificationCreated

SettingsUpdated

Unlimited events supported.

---

# System Events

UserLoggedIn

UserLoggedOut

PermissionChanged

BackupCompleted

SystemStarted

SystemStopped

CacheCleared

DatabaseMigrated

HealthCheckFailed

PrinterOffline

InternetOffline

---

# Event Structure

Every Event contains

Event ID

Event Name

Tenant ID

Aggregate ID

Aggregate Type

Version

Occurred At

User ID

Correlation ID

Payload

Metadata

---

# Event Naming

Past Tense

Examples

OrderCreated

PaymentCompleted

InventoryReduced

Never

CreateOrder

UpdateInventory

ProcessPayment

Commands are not Events.

---

# Event Lifecycle

Business Action

↓

Validation

↓

Transaction

↓

Commit

↓

Publish Event

↓

Subscribers Execute

---

# Event Bus

Current Version

In Process Event Dispatcher

Future Versions

RabbitMQ

Kafka

NATS

Azure Service Bus

AWS EventBridge

Architecture remains unchanged.

---

# Event Subscribers

Inventory

Reports

Dashboard

Notifications

Kitchen

Audit

Analytics

Each subscriber is independent.

---

# Event Processing Rules

Subscribers

Must Be Idempotent

Must Retry Failures

Must Log Errors

Must Never Block Publisher

Must Be Independent

---

# Event Ordering

Ordering guaranteed

Per Aggregate

Global ordering not required.

---

# Retry Policy

Immediate Retry

↓

5 Seconds

↓

30 Seconds

↓

2 Minutes

↓

Dead Letter Queue (Future)

---

# Dead Letter Events

Failed Events

↓

Dead Letter Queue

↓

Manual Review

↓

Replay

No event is lost.

---

# Event Replay

Supported.

Replay allows

Cache Rebuild

Reports Rebuild

Analytics Rebuild

System Recovery

---

# Correlation

Every request has

Correlation ID

Every event inherits it.

Allows complete request tracing.

---

# Idempotency

Subscribers must safely process duplicate events.

Repeated events must not create duplicate business actions.

---

# Event Versioning

Events are versioned.

Breaking changes create

New Event Version

Old versions remain supported.

---

# Event Security

Tenant Validation

Permission Validation

Sensitive Data Filtering

Encrypted Payloads (Future)

---

# Event Monitoring

Published Events

Failed Events

Retry Count

Processing Time

Subscriber Health

Queue Size

Real-Time Dashboard

---

# Event Performance

Publishing

<50ms

Subscriber Processing

<300ms

Notification Delivery

<500ms

Events should never block user requests.

---

# Integration Rules

Modules never call databases of other modules.

Modules publish events.

Modules subscribe to events.

Business logic remains inside owning domain.

---

# Event Examples

Order Created

↓

Kitchen Ticket

↓

Inventory Reduction

↓

Dashboard Update

↓

Notification

↓

Audit Log

↓

Reports

--------------------------------

Payment Completed

↓

Receipt

↓

Customer Wallet

↓

Loyalty Points

↓

Dashboard

↓

Reports

---

# AI Development Rules

Claude Code must

Always publish business events.

Never bypass Event Bus.

Never create synchronous module dependencies.

Never duplicate event processing.

Always implement idempotency.

Always implement retries.

Always preserve event history.

---

# Future Ready

RabbitMQ

Kafka

CQRS

Event Sourcing

Distributed Events

Saga Pattern

Workflow Engine

No redesign required.

---

# Final Rule

Every important business action produces an event.

Events are the communication backbone of RestaurantOS.

Modules communicate through events, never direct dependencies.
