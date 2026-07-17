import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon, type IconName } from "@/components/marketing/Icons";

type Section = {
  title: string;
  description: string;
  icon: IconName;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
  note: string;
};

const sections: Record<string, Section> = {
  devices: {
    title: "Managed devices",
    description: "Company-controlled device and approved emulator inventory.",
    icon: "phone",
    columns: ["Device", "Environment", "State", "Last heartbeat"],
    rows: [
      ["AP-East-01", "Android · Production", "Healthy", "31 seconds ago"],
      ["AP-East-02", "Android · Production", "Busy", "44 seconds ago"],
      ["AP-Test-01", "iOS · Staging", "Healthy", "1 minute ago"],
      ["AP-Reserve-01", "Android · Standby", "Offline", "Maintenance window"],
    ],
    note: "Production enrollment requires verified ownership, a device policy, and approved operator access.",
  },
  tasks: {
    title: "Workflow queue",
    description: "Event-driven and scheduled operations with bounded execution.",
    icon: "workflow",
    columns: ["Workflow", "Trigger", "State", "Next action"],
    rows: [
      ["Lead qualification", "New inbound lead", "Needs review", "Operator approval"],
      ["Appointment reminder", "24 hours before", "Running", "Delivery callback"],
      ["Device policy scan", "Every 30 minutes", "Complete", "Next scheduled run"],
      ["Usage reconciliation", "Daily at 02:00", "Planned", "Connect billing adapter"],
    ],
    note: "The preview illustrates workflow state. A production task engine adds a queue provider, worker isolation, signed events, and run-level idempotency.",
  },
  integrations: {
    title: "Integration registry",
    description: "Every provider connection has an owner, authorization state, and test gate.",
    icon: "link",
    columns: ["Provider", "Category", "Maturity", "Authorization"],
    rows: [
      ["PostgreSQL", "Data", "Foundation", "Environment secret"],
      ["Generic webhooks", "Events", "Foundation", "Signature required"],
      ["WhatsApp Business", "Messaging", "Planned adapter", "Client approval required"],
      ["Stripe", "Billing", "Planned adapter", "Client approval required"],
    ],
    note: "Planned does not mean connected. Credentials never belong in tenant settings or source control; only secret-manager references are stored.",
  },
  logs: {
    title: "Audit events",
    description: "A proof-oriented view of authorization, changes, and execution outcomes.",
    icon: "shield",
    columns: ["Event", "Actor", "Resource", "Result"],
    rows: [
      ["workflow.approval.requested", "System", "Lead qualification", "Pending"],
      ["message.delivery.updated", "WhatsApp adapter", "Reminder #10482", "Delivered"],
      ["device.health.checked", "Fleet worker", "AP-East-01", "Healthy"],
      ["integration.scope.changed", "Tenant owner", "Google Workspace", "Recorded"],
    ],
    note: "Illustrative events use the planned audit model. Production retention, export, and tamper-evidence controls are set in the client security plan.",
  },
  settings: {
    title: "Tenant controls",
    description: "Workspace identity, routing, roles, and policy defaults.",
    icon: "building",
    columns: ["Control", "Current preview", "Production rule", "Status"],
    rows: [
      ["Tenant domain", "demo.localhost", "Verified DNS", "Preview"],
      ["Default approval", "High-impact actions", "Owner-defined", "Enabled"],
      ["Data retention", "30 days", "Contract-defined", "Draft"],
      ["Operator access", "Demo user", "SSO + least privilege", "Planned"],
    ],
    note: "Authentication, authorization, row-level enforcement, retention, and incident contacts must be accepted before production launch.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  return { title: sections[section]?.title ?? "Product Preview" };
}

export default async function DashboardSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const content = sections[section];
  if (!content) notFound();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500/12 text-brand-300">
          <Icon name={content.icon} className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.16em] text-brand-400">Product preview</p>
          <h1 className="mt-1 text-3xl font-black tracking-[-.04em] text-white">{content.title}</h1>
          <p className="mt-2 text-sm text-zinc-500">{content.description}</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-white/[.08] bg-[#15181c]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[.07] bg-black/15">
                {content.columns.map((column) => (
                  <th key={column} className="px-5 py-4 text-[10px] font-black uppercase tracking-[.12em] text-zinc-600">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[.06]">
              {content.rows.map((row) => (
                <tr key={row.join("-")} className="transition hover:bg-white/[.02]">
                  {row.map((cell, index) => (
                    <td key={cell} className={`px-5 py-4 text-sm ${index === 0 ? "font-bold text-zinc-100" : "text-zinc-500"}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-3 border-t border-white/[.07] bg-brand-500/[.04] px-5 py-4 text-xs leading-5 text-zinc-500">
          <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
          {content.note}
        </div>
      </div>
    </div>
  );
}
