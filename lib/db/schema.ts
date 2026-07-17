import { pgTable, uuid, varchar, text, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";
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
// Relations
// ---------------------------------------------------------------------------

export const tenantsRelations = relations(tenants, ({ many }) => ({
  users:          many(users),
  devices:        many(devices),
  automationTasks: many(automationTasks),
  automationLogs:  many(automationLogs),
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
