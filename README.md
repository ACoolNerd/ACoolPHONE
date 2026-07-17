# ACoolPHONE

> Business operations, orchestrated: a consent-first, multi-tenant command center for official messaging APIs, company-controlled devices, governed workflows, and evidence of every outcome.

[![CI](https://github.com/ACoolNerd/ACoolPHONE/actions/workflows/ci.yml/badge.svg)](https://github.com/ACoolNerd/ACoolPHONE/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-0.44-C5F74F)](https://orm.drizzle.team)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-E8520F)](LICENSE)

## What is in this repository

ACoolPHONE combines three things in one versioned system:

1. **A public sales experience** explaining the platform, delivery process, integration maturity, working launch pricing, disclosures, and technical structure.
2. **A product preview** demonstrating the intended tenant console for devices, workflows, integrations, controls, and audit evidence.
3. **A full-stack foundation** built on Next.js, PostgreSQL, and Drizzle with tenant resolution, signed webhook intake, idempotent event storage, integration authorization metadata, subscription limits, and audit records.

The operating rule is **Rights → Disclosure → Proof**:

- **Rights:** verify ownership, authority, consent, credentials, and provider permission.
- **Disclosure:** state the workflow, operator role, pricing, provider usage, and limits.
- **Proof:** preserve approvals, attempts, failures, costs, and outcomes.

## Product maturity

This is an honest foundation release, not a claim that every third-party provider is already live.

| Capability | Repository status | Production requirement |
|---|---|---|
| Public sales site | Implemented | Set the canonical URL and sales contact |
| Responsive product preview | Implemented with illustrative data | Connect authenticated tenant data |
| PostgreSQL/Drizzle data layer | Implemented | Provision managed PostgreSQL and apply migration |
| Tenant resolution | Implemented | Add authentication, authorization, and row-level enforcement |
| Signed generic webhook receiver | Implemented | Use a secret manager, gateway rate limits, and provider-specific verification |
| Integration registry | Schema implemented | Implement and acceptance-test each provider adapter |
| Task/log/device model | Schema implemented | Add a durable queue, isolated workers, and provider drivers |
| WhatsApp, Twilio, Stripe, Google, OpenAI, GitHub | Documented adapter plan | Client authorization, credentials, scope, tests, and provider approval |

The `/dashboard` experience is explicitly marked **Demonstration workspace**. Its metrics and activity are illustrative.

## Sales and service structure

The site presents three working launch offers. Final scope and terms belong in a signed proposal and statement of work.

| Offer | Working price | Intended result |
|---|---:|---|
| Blueprint Sprint | $2,500 fixed fee | A buildable architecture, risk map, phased estimate, and acceptance plan |
| Pilot Build | Starting at $9,500 | One tenant, one approved provider adapter, and one controlled production workflow |
| Managed Operations | From $1,500/month + $3,500 onboarding | Monitoring, incident triage, usage reconciliation, and improvement stewardship |

Hardware, carrier plans, cloud hosting, taxes, and third-party provider usage are separate unless a proposal expressly includes them. See [Service Catalog](docs/SERVICE_CATALOG.md).

## Architecture

```mermaid
flowchart TD
    A["Approved channels & owned devices"] --> B["Edge verification"]
    B --> C["Tenant + authorization context"]
    C --> D["Policy-aware workflow engine"]
    D --> E["Bounded workers & provider adapters"]
    E --> F["PostgreSQL + audit evidence"]
    F --> G["Operator dashboard & reporting"]
    D --> H["Human approval gate"]
    H --> E
```

The provider boundary and the control plane are deliberately separate. Credentials stay in a production secret manager; database records contain only references, authorization metadata, scopes, and health state.

Read the full [Architecture](docs/ARCHITECTURE.md), [Integration Contract](docs/INTEGRATIONS.md), and [Security Baseline](docs/SECURITY.md).

## Stack

| Layer | Technology | Responsibility |
|---|---|---|
| Web application | Next.js 15 App Router + React 19 | Sales site, tenant console, API routes, metadata |
| Language | TypeScript 5, strict mode | Shared application and data contracts |
| Styling | Tailwind CSS 3 | Responsive ACoolECOSYSTEM interface |
| Database | PostgreSQL 14+ | Tenant-scoped operational records and evidence |
| ORM/migrations | Drizzle ORM + Drizzle Kit | Typed schema, relations, SQL migration generation |
| Event ingress | Next.js Node runtime + HMAC-SHA256 | Signed generic webhook intake and idempotency |
| Deployment | Vercel or OCI container | Web/control plane; durable workers remain a separate production service |
| CI | GitHub Actions | Lint, type-check, and production build |

## Repository map

```text
ACoolPHONE/
├── app/
│   ├── (dashboard)/dashboard/       # Demonstration console and section previews
│   ├── api/health/                  # Liveness metadata
│   ├── api/webhooks/[provider]/     # Signed foundation webhook receiver
│   ├── globals.css                  # Global tokens, grid, motion accessibility
│   ├── layout.tsx                   # Metadata and viewport
│   └── page.tsx                     # Public sales experience
├── components/
│   ├── layout/                      # Dashboard chrome
│   ├── marketing/                   # Reusable SVG icon system
│   ├── tenant/                      # Tenant context components
│   └── ui/                          # Base controls
├── docs/
│   ├── ARCHITECTURE.md
│   ├── INTEGRATIONS.md
│   ├── SECURITY.md
│   └── SERVICE_CATALOG.md
├── lib/
│   ├── db/schema.ts                 # Operational and evidence data model
│   ├── tenant/                      # Request-to-tenant resolution
│   ├── product.ts                   # Shared sales/product truth
│   └── utils.ts
├── .github/workflows/ci.yml
├── docker-compose.yml               # Local PostgreSQL
├── Dockerfile                       # Standalone production image
├── middleware.ts                    # Subdomain/custom-domain headers
└── drizzle.config.ts
```

## Quick start

### Requirements

- Node.js 20 or newer
- npm 10 or newer
- PostgreSQL 14 or newer, or Docker with Compose

### 1. Install

```bash
git clone https://github.com/ACoolNerd/ACoolPHONE.git
cd ACoolPHONE
npm ci
```

### 2. Configure

```bash
cp .env.example .env.local
```

Use development-only values locally. Do not commit `.env.local`.

```dotenv
DATABASE_URL=postgresql://acoolphone:change-me@localhost:5432/acoolphone
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=ACoolPHONE
NEXT_PUBLIC_SALES_EMAIL=
WEBHOOK_SIGNING_SECRET=replace-with-a-random-development-secret
```

Generate a local webhook secret with `openssl rand -hex 32`. Production values belong in the deployment platform’s secret manager.

### 3. Start PostgreSQL

```bash
docker compose up -d postgres
```

Or point `DATABASE_URL` to an existing PostgreSQL database.

### 4. Apply the schema

```bash
npm run db:migrate
```

For throwaway local development only, `npm run db:push` can synchronize the schema without migration history.

### 5. Run

```bash
npm run dev
```

- Sales site: [http://localhost:3000](http://localhost:3000)
- Product preview: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- Health endpoint: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## Environment contract

| Variable | Visibility | Required | Purpose |
|---|---|---:|---|
| `DATABASE_URL` | Secret | Yes for data/API routes | PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | Public | Yes in production | Canonical application URL and metadata base |
| `NEXT_PUBLIC_APP_NAME` | Public | No | Display name; defaults conceptually to ACoolPHONE |
| `NEXT_PUBLIC_SALES_EMAIL` | Public | No | Activates the email proposal CTA; otherwise links to ACoolNERD GitHub |
| `WEBHOOK_SIGNING_SECRET` | Secret | Yes for generic webhook intake | Foundation HMAC verification secret |

Never store provider access tokens, refresh tokens, signing secrets, private keys, or database credentials in tenant JSON, source control, task payloads, or logs.

## Database model

| Table | Purpose |
|---|---|
| `tenants` | Workspace identity, domain, branding, and settings |
| `users` | Tenant membership and role metadata |
| `devices` | Company-controlled device inventory and health |
| `automation_tasks` | Scheduled/event-driven execution state |
| `automation_logs` | Task- and device-level run messages |
| `integrations` | Provider status, scopes, authorization, and secret-manager reference |
| `webhook_events` | Signed inbound events with tenant/provider idempotency |
| `subscriptions` | Plan, provider IDs, limits, and billing state mirror |
| `audit_events` | Append-oriented actor/action/resource/outcome evidence |

Generate a migration after an intentional schema change:

```bash
npm run db:generate
git diff -- lib/db/migrations
npm run db:migrate
```

Never rewrite a migration that has already been applied to a shared environment. Create a new forward migration.

## Multi-tenant routing

Tenant selection is request context, not authorization by itself.

Resolution order:

1. Trusted `x-tenant-slug` header for internal/gateway traffic.
2. Subdomain, such as `client.acoolphone.example`.
3. Custom domain lookup against `tenants.domain`.

Before production, add authenticated membership verification to every tenant-scoped read/write and enforce the tenant boundary in queries or database row-level security. Never trust a browser-provided tenant header directly at the public edge.

## API

### `GET /api/health`

Returns liveness metadata without querying PostgreSQL.

```json
{
  "status": "ok",
  "service": "ACoolPHONE",
  "version": "0.2.0",
  "maturity": "foundation",
  "timestamp": "2026-07-17T00:00:00.000Z"
}
```

### `POST /api/webhooks/:provider`

Foundation provider-neutral event intake. Required headers:

| Header | Value |
|---|---|
| `content-type` | `application/json` |
| `x-acoolphone-tenant` | Active tenant slug |
| `x-acoolphone-event-id` | Provider event identifier, unique inside tenant + provider |
| `x-acoolphone-signature` | `sha256=<hex HMAC of the exact raw body>` |

The route rejects invalid provider identifiers, missing headers, invalid HMAC, bodies over 1 MB, non-object JSON, and unknown tenants. Duplicate identifiers return `202` with `duplicate: true` and are not inserted twice.

Provider-specific adapters must implement the provider’s own signature, replay-window, challenge, and delivery semantics instead of assuming the generic contract is sufficient.

## Integration policy

An adapter is not “connected” until all of these are evidenced:

1. The client owns or controls the account and authorizes the scope.
2. Required provider approvals, templates, phone numbers, apps, or webhooks exist.
3. Credentials are stored in a production secret manager with least privilege.
4. Signature verification, replay protection, idempotency, retry behavior, and failure handling pass tests.
5. Opt-in, opt-out, retention, and human-handoff behavior are accepted where applicable.
6. Provider pricing and pass-through usage are disclosed.
7. A rollback and credential-revocation path is rehearsed.

See [INTEGRATIONS.md](docs/INTEGRATIONS.md).

## Security baseline

- Official APIs and company-controlled environments only.
- Authentication and tenant membership before tenant data access.
- Least privilege and short-lived credentials where providers support them.
- Provider signatures plus replay windows at event ingress.
- Idempotent writes and bounded retries.
- Human approval gates for high-impact actions.
- Redaction of secrets and sensitive content from logs.
- Append-oriented audit events exported to immutable storage when required.
- Data retention and deletion defined by contract, not guessed in code.
- Dependency, container, and infrastructure scanning in the production pipeline.

This repository does not yet include a complete production identity provider, database row-level security policy, durable queue, WAF/rate limiter, provider-specific adapters, or immutable audit archive. Those are explicit launch gates, not hidden assumptions.

## Quality commands

```bash
npm run lint       # ESLint
npm run typecheck  # strict TypeScript, no emit
npm run build      # Next.js production build
npm run check      # all three in sequence
```

CI runs the same lint, type-check, and build gates on pushes and pull requests to `main`.

## Container deployment

Build the standalone image:

```bash
docker build -t acoolphone:local .
docker run --rm -p 3000:3000 \
  -e DATABASE_URL='postgresql://...' \
  -e NEXT_PUBLIC_APP_URL='https://phone.example.com' \
  -e WEBHOOK_SIGNING_SECRET='managed-secret-value' \
  acoolphone:local
```

For Vercel or Cloud Run:

- use managed PostgreSQL with encrypted transport;
- inject runtime secrets from the platform secret manager;
- place rate limiting and request-size enforcement at the edge;
- run database migrations as a controlled release step;
- deploy durable task workers separately from the web/control-plane process;
- configure health, logs, alerts, rollback, backups, and restore testing.

## Roadmap

### Foundation — current

- [x] Sales site and pricing disclosure
- [x] Responsive demonstration console
- [x] Tenant/device/task/log schema
- [x] Integration, webhook, subscription, and audit schema
- [x] Signed, idempotent generic webhook intake
- [x] Architecture, security, integration, and service documentation
- [x] Docker and CI foundation

### Controlled pilot

- [ ] Identity provider, session management, and tenant membership checks
- [ ] PostgreSQL row-level security or equivalent repository enforcement
- [ ] Durable queue, isolated workers, retries, dead-letter handling, and replay controls
- [ ] One provider-specific adapter selected by the pilot client
- [ ] Consent ledger and suppression/opt-out enforcement where messaging is used
- [ ] Encrypted provider credential broker backed by a secret manager
- [ ] End-to-end tests, observability, backups, and incident runbooks

### Operated platform

- [ ] Stripe subscription and metered-usage reconciliation
- [ ] Custom-domain verification and tenant branding administration
- [ ] Immutable audit export and client reporting
- [ ] SSO, SCIM, granular permissions, and approval policies
- [ ] Multi-region/residency options based on validated demand

## Contributing

1. Create a branch from the current default branch.
2. Keep provider claims aligned with implemented and tested behavior.
3. Add a forward migration for schema changes.
4. Run `npm run check`.
5. Explain security, privacy, tenant-boundary, pricing, and migration impact in the pull request.

Do not submit code intended to bypass provider controls, automate accounts without authority, evade platform detection, or operate unmanaged personal devices.

## License

[MIT](LICENSE) © 2026 ACoolNERD.
