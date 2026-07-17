# Integration Contract

## Maturity labels

- **Foundation:** repository code or schema exists and is covered by the current build gate.
- **Planned adapter:** desired integration contract is documented; the provider is not represented as connected.
- **Pilot connected:** client-authorized credentials, provider approval, provider-specific verification, end-to-end tests, monitoring, and rollback have passed acceptance.
- **Production operated:** the adapter additionally has an owner, service objectives, alerting, incident response, usage reconciliation, credential rotation, and periodic access review.

## Current registry

| Provider | Category | Current maturity | Primary controls |
|---|---|---|---|
| PostgreSQL | Data | Foundation | Tenant IDs, typed schema, migrations, encrypted production connection |
| Generic webhook | Events | Foundation | HMAC-SHA256, exact-body verification, 1 MB limit, tenant/provider idempotency |
| WhatsApp Business | Messaging | Planned adapter | Official Cloud API, opt-in, approved templates, opt-out, delivery callbacks, handoff |
| Twilio | Messaging/voice | Planned adapter | Consent, number ownership, signature validation, delivery state, usage reconciliation |
| Stripe | Billing | Planned adapter | Provider signature, replay tolerance, event idempotency, invoice/subscription reconciliation |
| Google Workspace | Productivity | Planned adapter | User-scoped OAuth, least privilege, refresh-token protection, revocation |
| OpenAI | Intelligence | Planned adapter | Data minimization, structured output, redaction, policy gates, human confirmation |
| GitHub | Engineering | Planned adapter | GitHub App permissions, installation scope, signature verification, audit context |

## Adapter interface

Each provider adapter should expose a consistent internal interface:

```ts
interface ProviderAdapter<TCommand, TResult> {
  authorize(input: AuthorizationInput): Promise<AuthorizationResult>;
  verifyEvent(request: RawEventRequest): Promise<VerifiedProviderEvent>;
  normalizeEvent(event: VerifiedProviderEvent): NormalizedEvent;
  execute(command: TCommand, context: ExecutionContext): Promise<TResult>;
  healthCheck(context: TenantProviderContext): Promise<ProviderHealth>;
  revoke(context: TenantProviderContext): Promise<void>;
}
```

The concrete contract should add provider-specific types. Do not hide provider differences inside untyped payloads.

## Event envelope

A normalized event should carry:

- tenant ID and integration ID;
- provider and external event ID;
- event type and provider timestamp;
- received timestamp;
- verified signature method;
- safe correlation identifiers;
- replay/idempotency key;
- minimal normalized payload;
- reference to encrypted/raw evidence only where retention is authorized.

## Generic webhook foundation

`POST /api/webhooks/:provider` accepts the exact raw JSON body and requires:

```text
x-acoolphone-tenant: <active tenant slug>
x-acoolphone-event-id: <provider event ID>
x-acoolphone-signature: sha256=<hex HMAC-SHA256(raw body, WEBHOOK_SIGNING_SECRET)>
```

This is suitable for controlled internal testing. Production public adapters should use each provider’s documented signature scheme, timestamp/replay window, verification challenge, IP/edge controls where relevant, and response timing requirements.

## Credential rules

1. Credentials belong to the client/provider account that authorized them.
2. Store production secrets in a secret manager, not PostgreSQL or source code.
3. Store only a secret reference and non-secret scope/health metadata in `integrations`.
4. Prefer short-lived credentials and scoped applications.
5. Separate development, staging, and production accounts.
6. Record authorization, rotation, and revocation as audit events.
7. Revoke credentials during tenant offboarding and verify revocation.

## Acceptance checklist

- [ ] Account ownership and operator authority documented
- [ ] Provider terms and required approvals reviewed
- [ ] Data classes and retention approved
- [ ] Scopes minimized and recorded
- [ ] Secret stored outside the database
- [ ] Signature and replay protection tested
- [ ] Duplicate, out-of-order, and delayed events tested
- [ ] Provider timeouts and rate limits tested
- [ ] Bounded retry and dead-letter behavior tested
- [ ] Consent, opt-out, and human handoff tested where applicable
- [ ] Usage and pass-through pricing disclosed
- [ ] Monitoring, alerts, runbook, rollback, and revocation tested
