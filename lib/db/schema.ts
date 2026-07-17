import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  jsonb,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Tenants
// ---------------------------------------------------------------------------

export const tenants = pgTable("tenants", {
  id:        uuid("id").primaryKey().defaultRandom(),
  slug:      varchar("slug", { length: 64 }).notNull().unique(),
  name:      varchar("name", { length: 128 }).notNull(),
  domain:    varchar("domain", { length: 253 }).unique(),
  logoUrl:   text("logo_url"),
  settings:  jsonb("settings").$type<Record<string, unknown>>().default({}),
  isActive:  boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export const users = pgTable("users", {
  id:        uuid("id").primaryKey().defaultRandom(),
  tenantId:  uuid("tenant_id").notNull().references(() => tenants.id, { onDelete: "cascade" }),
  email:     varchar("email", { length: 320 }).notNull(),
  name:      varchar("name", { length: 128 }),
  role:      varchar("role", { length: 32 }).notNull().default("member"),
  avatarUrl: text("avatar_url"),
  isActive:  boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Devices  (core ACoolPHONE resource)
// ---------------------------------------------------------------------------

export const devices = pgTable("devices", {
  id:           uuid("id").primaryKey().defaultRandom(),
  tenantId:     uuid("tenant_id").notNull().references(() => tenants.id, { onDelete: "cascade" }),
  name:         varchar("name", { length: 128 }).notNull(),
  identifier:   varchar("identifier", { length: 128 }).notNull(),
  platform:     varchar("platform", { length: 32 }).notNull().default("android"),
  status:       varchar("status", { length: 32 }).notNull().default("offline"),
  proxyUrl:     text("proxy_url"),
  metadata:     jsonb("metadata").$type<Record<string, unknown>>().default({}),
  lastSeenAt:   timestamp("last_seen_at"),
  createdAt:    timestamp("created_at").notNull().defaultNow(),
  updatedAt:    timestamp("updated_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Automation Tasks
// ---------------------------------------------------------------------------

export const automationTasks = pgTable("automation_tasks", {
  id:          uuid("id").primaryKey().defaultRandom(),
  tenantId:    uuid("tenant_id").notNull().references(() => tenants.id, { onDelete: "cascade" }),
  deviceId:    uuid("device_id").references(() => devices.id, { onDelete: "set null" }),
  name:        varchar("name", { length: 128 }).notNull(),
  scriptName:  varchar("script_name", { length: 128 }).notNull(),
  status:      varchar("status", { length: 32 }).notNull().default("pending"),
  priority:    integer("priority").notNull().default(0),
  payload:     jsonb("payload").$type<Record<string, unknown>>().default({}),
  result:      jsonb("result").$type<Record<string, unknown>>(),
  scheduledAt: timestamp("scheduled_at"),
  startedAt:   timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt:   timestamp("created_at").notNull().defaultNow(),
  updatedAt:   timestamp("updated_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Automation Logs
// ---------------------------------------------------------------------------

export const automationLogs = pgTable("automation_logs", {
  id:        uuid("id").primaryKey().defaultRandom(),
  tenantId:  uuid("tenant_id").notNull().references(() => tenants.id, { onDelete: "cascade" }),
  taskId:    uuid("task_id").references(() => automationTasks.id, { onDelete: "cascade" }),
  deviceId:  uuid("device_id").references(() => devices.id, { onDelete: "set null" }),
  level:     varchar("level", { length: 16 }).notNull().default("info"),
  message:   text("message").notNull(),
  metadata:  jsonb("metadata").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Integrations
// Stores authorization metadata and secret-manager references, never secrets.
// ---------------------------------------------------------------------------

export const integrations = pgTable(
  "integrations",
  {
    id:              uuid("id").primaryKey().defaultRandom(),
    tenantId:        uuid("tenant_id").notNull().references(() => tenants.id, { onDelete: "cascade" }),
    provider:        varchar("provider", { length: 64 }).notNull(),
    displayName:     varchar("display_name", { length: 128 }).notNull(),
    status:          varchar("status", { length: 32 }).notNull().default("pending"),
    credentialRef:   text("credential_ref"),
    scopes:          jsonb("scopes").$type<string[]>().default([]),
    settings:        jsonb("settings").$type<Record<string, unknown>>().default({}),
    authorizedBy:    uuid("authorized_by").references(() => users.id, { onDelete: "set null" }),
    authorizedAt:    timestamp("authorized_at"),
    lastHealthAt:    timestamp("last_health_at"),
    createdAt:       timestamp("created_at").notNull().defaultNow(),
    updatedAt:       timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [uniqueIndex("integrations_tenant_provider_idx").on(table.tenantId, table.provider)],
);

// ---------------------------------------------------------------------------
// Webhook Events
// Provider event inbox with idempotency and retry state.
// ---------------------------------------------------------------------------

export const webhookEvents = pgTable(
  "webhook_events",
  {
    id:            uuid("id").primaryKey().defaultRandom(),
    tenantId:      uuid("tenant_id").notNull().references(() => tenants.id, { onDelete: "cascade" }),
    integrationId: uuid("integration_id").references(() => integrations.id, { onDelete: "set null" }),
    provider:      varchar("provider", { length: 64 }).notNull(),
    externalId:    varchar("external_id", { length: 255 }).notNull(),
    eventType:     varchar("event_type", { length: 128 }).notNull(),
    status:        varchar("status", { length: 32 }).notNull().default("received"),
    payload:       jsonb("payload").$type<Record<string, unknown>>().notNull(),
    attempts:      integer("attempts").notNull().default(0),
    lastError:     text("last_error"),
    receivedAt:    timestamp("received_at").notNull().defaultNow(),
    processedAt:   timestamp("processed_at"),
  },
  (table) => [
    uniqueIndex("webhook_events_tenant_provider_external_idx").on(
      table.tenantId,
      table.provider,
      table.externalId,
    ),
  ],
);

// ---------------------------------------------------------------------------
// Subscriptions and usage boundaries
// Provider billing records remain the source of truth for money movement.
// ---------------------------------------------------------------------------

export const subscriptions = pgTable("subscriptions", {
  id:                     uuid("id").primaryKey().defaultRandom(),
  tenantId:               uuid("tenant_id").notNull().references(() => tenants.id, { onDelete: "cascade" }).unique(),
  plan:                   varchar("plan", { length: 64 }).notNull().default("pilot"),
  status:                 varchar("status", { length: 32 }).notNull().default("trialing"),
  billingProvider:        varchar("billing_provider", { length: 32 }).default("stripe"),
  providerCustomerId:     varchar("provider_customer_id", { length: 255 }),
  providerSubscriptionId: varchar("provider_subscription_id", { length: 255 }),
  deviceLimit:            integer("device_limit").notNull().default(5),
  monthlyTaskLimit:       integer("monthly_task_limit").notNull().default(1000),
  currentPeriodEndsAt:    timestamp("current_period_ends_at"),
  createdAt:              timestamp("created_at").notNull().defaultNow(),
  updatedAt:              timestamp("updated_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Audit Events
// Append-only application evidence; production deployments may additionally
// export this stream to immutable/WORM storage.
// ---------------------------------------------------------------------------

export const auditEvents = pgTable("audit_events", {
  id:           uuid("id").primaryKey().defaultRandom(),
  tenantId:     uuid("tenant_id").notNull().references(() => tenants.id, { onDelete: "cascade" }),
  actorUserId:  uuid("actor_user_id").references(() => users.id, { onDelete: "set null" }),
  action:       varchar("action", { length: 128 }).notNull(),
  resourceType: varchar("resource_type", { length: 64 }).notNull(),
  resourceId:   varchar("resource_id", { length: 255 }),
  outcome:      varchar("outcome", { length: 32 }).notNull().default("recorded"),
  ipAddress:    varchar("ip_address", { length: 64 }),
  metadata:     jsonb("metadata").$type<Record<string, unknown>>().default({}),
  createdAt:    timestamp("created_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

export const tenantsRelations = relations(tenants, ({ many }) => ({
  users:          many(users),
  devices:        many(devices),
  automationTasks: many(automationTasks),
  automationLogs:  many(automationLogs),
  integrations:    many(integrations),
  webhookEvents:   many(webhookEvents),
  subscriptions:   many(subscriptions),
  auditEvents:     many(auditEvents),
}));

export const usersRelations = relations(users, ({ one }) => ({
  tenant: one(tenants, { fields: [users.tenantId], references: [tenants.id] }),
}));

export const devicesRelations = relations(devices, ({ one, many }) => ({
  tenant:          one(tenants, { fields: [devices.tenantId], references: [tenants.id] }),
  automationTasks: many(automationTasks),
  automationLogs:  many(automationLogs),
}));

export const automationTasksRelations = relations(automationTasks, ({ one, many }) => ({
  tenant:  one(tenants, { fields: [automationTasks.tenantId], references: [tenants.id] }),
  device:  one(devices, { fields: [automationTasks.deviceId], references: [devices.id] }),
  logs:    many(automationLogs),
}));

export const automationLogsRelations = relations(automationLogs, ({ one }) => ({
  tenant: one(tenants, { fields: [automationLogs.tenantId], references: [tenants.id] }),
  task:   one(automationTasks, { fields: [automationLogs.taskId], references: [automationTasks.id] }),
  device: one(devices, { fields: [automationLogs.deviceId], references: [devices.id] }),
}));

export const integrationsRelations = relations(integrations, ({ one, many }) => ({
  tenant: one(tenants, { fields: [integrations.tenantId], references: [tenants.id] }),
  authorizer: one(users, { fields: [integrations.authorizedBy], references: [users.id] }),
  webhookEvents: many(webhookEvents),
}));

export const webhookEventsRelations = relations(webhookEvents, ({ one }) => ({
  tenant: one(tenants, { fields: [webhookEvents.tenantId], references: [tenants.id] }),
  integration: one(integrations, { fields: [webhookEvents.integrationId], references: [integrations.id] }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  tenant: one(tenants, { fields: [subscriptions.tenantId], references: [tenants.id] }),
}));

export const auditEventsRelations = relations(auditEvents, ({ one }) => ({
  tenant: one(tenants, { fields: [auditEvents.tenantId], references: [tenants.id] }),
  actor: one(users, { fields: [auditEvents.actorUserId], references: [users.id] }),
}));
