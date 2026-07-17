# ACoolPHONE

> Centralized orchestration platform for mobile automation, device management, and multi-tenant operations — part of the **ACoolECOSYSTEM**.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-0.44-brightgreen)](https://orm.drizzle.team)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://typescriptlang.org)
[![MIT License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## Overview

ACoolPHONE is a high-performance Next.js 15 application that provides:

- **Device Manager** — real-time monitoring and control of Android/iOS emulator instances with proxy rotation via GenRouter
- **Task Engine** — no-code automation script scheduling across device groups with priority queuing
- **Telemetry Sync** — automation performance and ROI metrics piped into a PostgreSQL/Drizzle database
- **Multi-Tenant Architecture** — isolated workspaces per tenant with subdomain or custom-domain routing, RBAC, and configurable branding

---

## Tech Stack

| Layer        | Technology                                   |
|--------------|----------------------------------------------|
| Framework    | [Next.js 15](https://nextjs.org) (App Router) |
| Language     | TypeScript 5                                 |
| Database ORM | [Drizzle ORM](https://orm.drizzle.team) + PostgreSQL (`pg`) |
| Styling      | [Tailwind CSS 3](https://tailwindcss.com)    |
| Deployment   | Google Cloud Run / Vercel                    |

---

## Project Structure

```
ACoolPHONE/
├── app/                        # Next.js App Router
│   ├── (dashboard)/            # Dashboard route group (layout + pages)
│   │   ├── layout.tsx
│   │   └── dashboard/page.tsx
│   ├── api/health/route.ts     # Health-check endpoint
│   ├── globals.css
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # Base UI: Button, Card, Input, Badge
│   ├── layout/                 # Header, Sidebar
│   └── tenant/                 # TenantProvider, TenantSwitcher
├── lib/
│   ├── db/
│   │   ├── index.ts            # Drizzle connection (pg Pool)
│   │   ├── schema.ts           # Table definitions & relations
│   │   └── migrations/         # Generated SQL migrations
│   ├── tenant/index.ts         # Server-side tenant resolution
│   └── utils.ts                # cn(), formatDate(), capitalize()
├── types/index.ts              # Drizzle-inferred & app-level types
├── middleware.ts               # Multi-tenant subdomain/custom-domain routing
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- PostgreSQL ≥ 14 (local or remote)
- `pnpm` / `npm` / `yarn`

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
# Edit .env.local and set DATABASE_URL
```

### 3. Push the database schema

```bash
npm run db:push          # quick dev push (no migration files)
# or
npm run db:generate      # generate SQL migrations
npm run db:migrate       # apply migrations
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page, or [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the dashboard.

---

## Database Scripts

| Command              | Description                                |
|----------------------|--------------------------------------------|
| `npm run db:generate`| Generate SQL migration files from schema   |
| `npm run db:migrate` | Apply pending migrations                   |
| `npm run db:push`    | Push schema directly (dev only)            |
| `npm run db:studio`  | Open Drizzle Studio (visual DB browser)    |

---

## Multi-Tenant Routing

Tenant resolution is handled in `middleware.ts` and `lib/tenant/index.ts`:

1. **Subdomain** — `acme.acoolphone.com` sets `x-tenant-slug: acme`
2. **Custom domain** — any unrecognised host is looked up in the `tenants.domain` column
3. **Header override** — clients may pass `x-tenant-slug` directly (useful for internal API calls)

---

## Environment Variables

| Variable              | Description                          | Required |
|-----------------------|--------------------------------------|----------|
| `DATABASE_URL`        | PostgreSQL connection string         | ✅       |
| `NEXT_PUBLIC_APP_URL` | Public base URL of the application   | ✅       |
| `NEXT_PUBLIC_APP_NAME`| Display name (default: ACoolPHONE)   | ✅       |

---

## License

[MIT](LICENSE) © ACoolNerd