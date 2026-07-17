import type { tenants, users, devices, automationTasks, automationLogs } from "@/lib/db/schema";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Drizzle inferred types
// ---------------------------------------------------------------------------

export type Tenant          = InferSelectModel<typeof tenants>;
export type NewTenant       = InferInsertModel<typeof tenants>;

export type User            = InferSelectModel<typeof users>;
export type NewUser         = InferInsertModel<typeof users>;

export type Device          = InferSelectModel<typeof devices>;
export type NewDevice       = InferInsertModel<typeof devices>;

export type AutomationTask  = InferSelectModel<typeof automationTasks>;
export type NewAutomationTask = InferInsertModel<typeof automationTasks>;

export type AutomationLog   = InferSelectModel<typeof automationLogs>;
export type NewAutomationLog = InferInsertModel<typeof automationLogs>;

// ---------------------------------------------------------------------------
// Application-level types
// ---------------------------------------------------------------------------

export type UserRole = "owner" | "admin" | "member";

export type DeviceStatus = "online" | "offline" | "busy" | "error";

export type TaskStatus = "pending" | "running" | "completed" | "failed" | "cancelled";

export type LogLevel = "debug" | "info" | "warn" | "error";

/** Context object available in Server Components and API routes. */
export interface TenantContext {
  tenant: Tenant;
  user?: User;
}

/** Generic paginated response wrapper. */
export interface PaginatedResponse<T> {
  data:       T[];
  total:      number;
  page:       number;
  pageSize:   number;
  totalPages: number;
}

/** Standard API error shape. */
export interface ApiError {
  code:    string;
  message: string;
  details?: Record<string, unknown>;
}
