import { headers } from "next/headers";
import { db } from "@/lib/db";
import { tenants } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import type { Tenant } from "@/types";

/**
 * Resolves the current tenant from the incoming request.
 * Resolution order:
 *   1. `x-tenant-slug` header  (set by middleware / reverse proxy)
 *   2. Subdomain extracted from the `host` header
 *   3. Custom domain match
 */
export async function getCurrentTenant(): Promise<Tenant | null> {
  const headersList = await headers();

  // 1. Explicit header (highest priority – useful for API clients)
  const slugHeader = headersList.get("x-tenant-slug");
  if (slugHeader) {
    return getTenantBySlug(slugHeader);
  }

  // 2. Subdomain: e.g. "acme.acoolphone.com" → slug = "acme"
  const host = headersList.get("host") ?? "";
  const subdomain = extractSubdomain(host);
  if (subdomain && subdomain !== "www" && subdomain !== "app") {
    const bySlug = await getTenantBySlug(subdomain);
    if (bySlug) return bySlug;
  }

  // 3. Custom domain
  const domain = host.split(":")[0];
  return getTenantByDomain(domain);
}

export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  const results = await db
    .select()
    .from(tenants)
    .where(eq(tenants.slug, slug))
    .limit(1);

  return (results[0] as Tenant) ?? null;
}

export async function getTenantByDomain(domain: string): Promise<Tenant | null> {
  const results = await db
    .select()
    .from(tenants)
    .where(or(eq(tenants.domain, domain), eq(tenants.slug, domain)))
    .limit(1);

  return (results[0] as Tenant) ?? null;
}

function extractSubdomain(host: string): string | null {
  // Strip port
  const hostname = host.split(":")[0];
  const parts = hostname.split(".");
  // e.g. ["acme", "acoolphone", "com"] → "acme"
  if (parts.length >= 3) {
    return parts[0];
  }
  return null;
}
