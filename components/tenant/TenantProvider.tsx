"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Tenant } from "@/types";

interface TenantContextValue {
  tenant: Tenant | null;
}

const TenantContext = createContext<TenantContextValue>({ tenant: null });

interface TenantProviderProps {
  tenant: Tenant | null;
  children: ReactNode;
}

/**
 * Provides the current tenant to the React component tree via context.
 * Should be rendered as close to the root as possible (e.g. in a layout).
 */
export function TenantProvider({ tenant, children }: TenantProviderProps) {
  return (
    <TenantContext.Provider value={{ tenant }}>
      {children}
    </TenantContext.Provider>
  );
}

/** Returns the current tenant from the nearest TenantProvider. */
export function useTenant(): TenantContextValue {
  return useContext(TenantContext);
}
