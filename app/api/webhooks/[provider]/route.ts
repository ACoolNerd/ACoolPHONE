import { createHmac, timingSafeEqual } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { integrations, tenants, webhookEvents } from "@/lib/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 1_000_000;
const PROVIDER_PATTERN = /^[a-z0-9][a-z0-9_-]{1,62}[a-z0-9]$/;

function validSignature(rawBody: string, supplied: string, secret: string) {
  const expected = `sha256=${createHmac("sha256", secret).update(rawBody).digest("hex")}`;
  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(supplied);

  return expectedBuffer.length === suppliedBuffer.length && timingSafeEqual(expectedBuffer, suppliedBuffer);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const tenantSlug = request.headers.get("x-acoolphone-tenant")?.trim();
  const externalId = request.headers.get("x-acoolphone-event-id")?.trim();
  const signature = request.headers.get("x-acoolphone-signature")?.trim();
  const secret = process.env.WEBHOOK_SIGNING_SECRET;

  if (!PROVIDER_PATTERN.test(provider)) {
    return NextResponse.json({ error: "Unsupported provider identifier" }, { status: 400 });
  }

  if (!tenantSlug || !externalId || !signature) {
    return NextResponse.json({ error: "Required webhook headers are missing" }, { status: 400 });
  }

  if (!secret) {
    return NextResponse.json({ error: "Webhook receiver is not configured" }, { status: 503 });
  }

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  if (!validSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Expected object");
    payload = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Webhook body must be a JSON object" }, { status: 400 });
  }

  const [connection] = await db
    .select({ tenantId: tenants.id, integrationId: integrations.id })
    .from(tenants)
    .leftJoin(
      integrations,
      and(eq(integrations.tenantId, tenants.id), eq(integrations.provider, provider)),
    )
    .where(and(eq(tenants.slug, tenantSlug), eq(tenants.isActive, true)))
    .limit(1);

  if (!connection) {
    return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
  }

  const eventType =
    typeof payload.type === "string"
      ? payload.type.slice(0, 128)
      : typeof payload.event === "string"
        ? payload.event.slice(0, 128)
        : "unclassified";

  const inserted = await db
    .insert(webhookEvents)
    .values({
      tenantId: connection.tenantId,
      integrationId: connection.integrationId,
      provider,
      externalId: externalId.slice(0, 255),
      eventType,
      payload,
    })
    .onConflictDoNothing({
      target: [webhookEvents.tenantId, webhookEvents.provider, webhookEvents.externalId],
    })
    .returning({ id: webhookEvents.id });

  return NextResponse.json(
    { accepted: true, duplicate: inserted.length === 0 },
    { status: 202 },
  );
}
