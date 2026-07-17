"use client";

import { useTenant } from "./TenantProvider";
import { Badge } from "@/components/ui/Badge";

/**
 * Displays the current tenant name and status badge.
 * Intended for placement in headers or sidebars.
 */
export function TenantSwitcher() {
  const { tenant } = useTenant();

  if (!tenant) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
        <span className="text-slate-400">No tenant selected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
      {tenant.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={tenant.logoUrl} alt={tenant.name} className="h-5 w-5 rounded-full object-cover" />
      ) : (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
          {tenant.name.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="font-medium text-slate-800 dark:text-slate-100">{tenant.name}</span>
      <Badge variant={tenant.isActive ? "success" : "error"}>
        {tenant.isActive ? "Active" : "Inactive"}
      </Badge>
    </div>
  );
}
