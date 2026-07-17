import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Multi-tenant middleware.
 *
 * Responsibilities:
 * 1. Extract the tenant slug from the subdomain or a custom domain.
 * 2. Attach it as the `x-tenant-slug` request header for use in Server Components.
 * 3. Redirect bare domain → /dashboard for authenticated paths.
 */
export function middleware(request: NextRequest) {
  const { hostname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);

  // Extract subdomain: "acme.acoolphone.com" → "acme"
  const parts = hostname.split(".");
  const isSubdomain = parts.length >= 3 && parts[0] !== "www" && parts[0] !== "app";

  if (isSubdomain) {
    requestHeaders.set("x-tenant-slug", parts[0]);
  } else {
    // Try to resolve by full domain (custom domain tenants)
    requestHeaders.set("x-tenant-domain", hostname);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
