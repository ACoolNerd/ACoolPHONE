export const capabilities = [
  {
    icon: "message",
    eyebrow: "Communications",
    title: "One operational inbox",
    description:
      "Coordinate approved messaging channels, assignments, templates, escalation rules, and customer context without losing the human handoff.",
    points: ["Consent and opt-out state", "Assignment and escalation", "Reusable approved templates"],
  },
  {
    icon: "workflow",
    eyebrow: "Automation",
    title: "Workflows with guardrails",
    description:
      "Turn repeatable operating procedures into scheduled or event-driven tasks with approvals, retries, timeouts, and complete execution history.",
    points: ["Priority task queue", "Human approval gates", "Structured run logs"],
  },
  {
    icon: "phone",
    eyebrow: "Device operations",
    title: "A visible, managed fleet",
    description:
      "Maintain an inventory of company-controlled devices and approved emulator environments with health, ownership, status, and task visibility.",
    points: ["Device health and ownership", "Group-based assignment", "Policy-aware controls"],
  },
  {
    icon: "building",
    eyebrow: "Multi-tenant control",
    title: "Every client stays isolated",
    description:
      "Give each operating company or client a dedicated workspace, domain, data boundary, roles, branding, and provider configuration.",
    points: ["Tenant-scoped data model", "Role-based access design", "Custom domain resolution"],
  },
  {
    icon: "chart",
    eyebrow: "Proof",
    title: "Outcomes you can audit",
    description:
      "Trace the path from trigger to task to outcome with event logs and operational metrics designed for review, reconciliation, and improvement.",
    points: ["Run-level telemetry", "Failure and retry visibility", "Export-ready reporting model"],
  },
  {
    icon: "shield",
    eyebrow: "Governance",
    title: "Rights → Disclosure → Proof",
    description:
      "Verify authority and consent, disclose the workflow and costs, then preserve evidence of what the system actually did.",
    points: ["Least-privilege credentials", "Usage and fee disclosure", "Immutable audit-event design"],
  },
] as const;

export const integrations = [
  {
    name: "PostgreSQL",
    category: "Data",
    status: "Foundation",
    description: "Tenant, user, device, task, log, integration, billing, and audit records through Drizzle ORM.",
  },
  {
    name: "Generic Webhooks",
    category: "Events",
    status: "Foundation",
    description: "Provider-neutral event envelope, idempotency fields, processing state, and retry metadata.",
  },
  {
    name: "WhatsApp Business",
    category: "Messaging",
    status: "Planned adapter",
    description: "Official Meta Cloud API path for opted-in messaging, templates, delivery events, and handoff.",
  },
  {
    name: "Twilio",
    category: "Messaging",
    status: "Planned adapter",
    description: "SMS and voice adapter with consent state, delivery callbacks, and provider usage reconciliation.",
  },
  {
    name: "Stripe",
    category: "Billing",
    status: "Planned adapter",
    description: "Subscriptions, metered usage, invoices, payment state, and webhook-driven account provisioning.",
  },
  {
    name: "Google Workspace",
    category: "Productivity",
    status: "Planned adapter",
    description: "Calendar, Drive, and approved Workspace operations with user-scoped OAuth authorization.",
  },
  {
    name: "OpenAI",
    category: "Intelligence",
    status: "Planned adapter",
    description: "Structured AI assistance with policy gates, redaction, observability, and human confirmation.",
  },
  {
    name: "GitHub",
    category: "Engineering",
    status: "Planned adapter",
    description: "Repository events, release workflows, issues, and delivery evidence for implementation teams.",
  },
] as const;

export const deliverySteps = [
  {
    number: "01",
    title: "Discover",
    detail: "Map users, channels, device ownership, consent, data boundaries, risks, and the measurable operating outcome.",
    proof: "Signed requirements and authority matrix",
  },
  {
    number: "02",
    title: "Architect",
    detail: "Define tenant boundaries, integration contracts, workflow states, failure paths, security controls, and acceptance tests.",
    proof: "Architecture and implementation blueprint",
  },
  {
    number: "03",
    title: "Build",
    detail: "Configure the platform, implement approved adapters and workflows, migrate scoped data, and instrument every run.",
    proof: "Tested staging environment and runbook",
  },
  {
    number: "04",
    title: "Launch",
    detail: "Train operators, complete user acceptance testing, rehearse rollback, and release against agreed success criteria.",
    proof: "Acceptance record and production checklist",
  },
  {
    number: "05",
    title: "Operate",
    detail: "Monitor service health, resolve failures, reconcile provider usage, review outcomes, and improve the workflow backlog.",
    proof: "Monthly operating and improvement report",
  },
] as const;

export const offers = [
  {
    name: "Blueprint Sprint",
    price: "$2,500",
    cadence: "fixed fee",
    duration: "10 business days",
    description: "For a team that needs a buildable plan before committing to implementation.",
    featured: false,
    inclusions: [
      "Workflow and stakeholder discovery",
      "Integration and data-flow map",
      "Security and compliance issue-spotting",
      "Phased scope, estimate, and acceptance plan",
    ],
    cta: "Plan the system",
  },
  {
    name: "Pilot Build",
    price: "$9,500",
    cadence: "starting at",
    duration: "typically 4–6 weeks",
    description: "For one high-value workflow, one tenant, and a controlled production pilot.",
    featured: true,
    inclusions: [
      "Everything in Blueprint Sprint",
      "Tenant workspace and operator dashboard",
      "One approved provider integration",
      "One end-to-end automated workflow",
      "Deployment, training, and 30-day warranty",
    ],
    cta: "Build the pilot",
  },
  {
    name: "Managed Operations",
    price: "$1,500",
    cadence: "per month, from",
    duration: "$3,500 onboarding",
    description: "For teams that want ongoing platform monitoring and workflow stewardship.",
    featured: false,
    inclusions: [
      "Platform and workflow monitoring",
      "Incident triage and monthly review",
      "Provider-usage reconciliation",
      "Up to 8 improvement hours monthly",
      "Quarterly roadmap and control review",
    ],
    cta: "Operate with us",
  },
] as const;

export const faqs = [
  {
    question: "Is ACoolPHONE a finished SaaS product today?",
    answer:
      "It is an active product foundation and implementation service. The multi-tenant application, data model, dashboard, and documented integration architecture are in place; third-party adapters are connected per client scope and credentials. The site labels foundation work and planned adapters separately.",
  },
  {
    question: "Does it automate personal phones or bypass platform rules?",
    answer:
      "No. Production work is limited to company-controlled devices, authorized accounts, official provider APIs, documented user consent, and the applicable provider terms. High-impact actions can require human approval.",
  },
  {
    question: "What is included in the posted pricing?",
    answer:
      "The listed professional-service scope is included. Hardware, carrier plans, cloud hosting, taxes, and third-party provider usage are separate and disclosed in the statement of work before authorization. Custom data migration or additional integrations are quoted separately.",
  },
  {
    question: "Can each client have its own branding and domain?",
    answer:
      "Yes. The architecture resolves tenants by subdomain, custom domain, or trusted internal header and supports workspace-level branding and settings. Production authorization and row-level data controls are completed as part of the launch scope.",
  },
  {
    question: "Where can the application run?",
    answer:
      "The Next.js application is designed for Vercel or container deployment such as Google Cloud Run, with managed PostgreSQL. The final topology depends on residency, security, scale, and provider requirements.",
  },
] as const;

export const architectureLayers = [
  {
    label: "Channels",
    items: ["Official messaging APIs", "Owned devices", "Business systems", "Signed webhooks"],
  },
  {
    label: "Control plane",
    items: ["Tenant context", "Authorization", "Workflow engine", "Policy gates"],
  },
  {
    label: "Execution",
    items: ["Priority tasks", "Provider adapters", "Retries and timeouts", "Human approvals"],
  },
  {
    label: "Proof layer",
    items: ["PostgreSQL", "Audit events", "Usage records", "Operational reporting"],
  },
] as const;
