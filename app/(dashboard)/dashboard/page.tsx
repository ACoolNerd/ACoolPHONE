import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/marketing/Icons";

export const metadata: Metadata = { title: "Product Preview" };

const stats = [
  { label: "Managed devices", value: "24", note: "22 reporting healthy", icon: "phone" },
  { label: "Workflow runs", value: "1,284", note: "+14% over last period", icon: "workflow" },
  { label: "Approval queue", value: "7", note: "2 priority reviews", icon: "shield" },
  { label: "Successful runs", value: "99.2%", note: "+1.8 points", icon: "chart" },
] as const;

const activity = [
  { name: "New lead qualification", channel: "Inbound webhook", status: "Human review", time: "2m ago", tone: "amber" },
  { name: "Appointment reminder", channel: "WhatsApp Business", status: "Delivered", time: "5m ago", tone: "green" },
  { name: "Device policy scan", channel: "Fleet · East", status: "Complete", time: "12m ago", tone: "green" },
  { name: "Payment reconciliation", channel: "Stripe", status: "Adapter planned", time: "Preview", tone: "slate" },
] as const;

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            Demonstration workspace
          </div>
          <h1 className="text-3xl font-black tracking-[-.04em] text-white">Operations overview</h1>
          <p className="mt-2 text-sm text-zinc-500">A realistic product preview using illustrative data—not a live tenant.</p>
        </div>
        <Link href="/#pricing" className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-black text-white transition hover:bg-brand-400">
          Scope a pilot
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-3xl border border-white/[.08] bg-[#15181c] p-5">
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold text-zinc-500">{stat.label}</p>
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/[.05] text-brand-300">
                <Icon name={stat.icon} className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-5 text-3xl font-black tracking-[-.04em] text-white">{stat.value}</p>
            <p className="mt-1 text-[10px] font-semibold text-zinc-600">{stat.note}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
        <article className="rounded-3xl border border-white/[.08] bg-[#15181c] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-black text-white">Execution pulse</h2>
              <p className="mt-1 text-xs text-zinc-600">Successful and reviewed workflow runs</p>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black text-emerald-300">Healthy</span>
          </div>
          <div className="mt-8 flex h-52 items-end gap-2 border-b border-l border-white/[.07] px-3 pt-6">
            {[36, 52, 41, 63, 58, 76, 61, 85, 74, 92, 82, 96].map((height, index) => (
              <div key={index} className="group relative flex h-full flex-1 items-end">
                <div className="w-full rounded-t bg-gradient-to-t from-brand-600/40 to-brand-400 transition group-hover:to-brand-200" style={{ height: `${height}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[9px] font-bold uppercase tracking-wider text-zinc-700">
            <span>08:00</span><span>12:00</span><span>16:00</span><span>Now</span>
          </div>
        </article>

        <article className="rounded-3xl border border-white/[.08] bg-[#15181c] p-5 sm:p-6">
          <h2 className="font-black text-white">Control posture</h2>
          <p className="mt-1 text-xs text-zinc-600">Guardrails expected in a production tenant</p>
          <div className="mt-6 space-y-3">
            {[
              ["Tenant boundary", "Enforced", "green"],
              ["Consent state", "Required", "green"],
              ["High-impact actions", "Approval gate", "amber"],
              ["Provider credentials", "Vault reference", "green"],
              ["Audit events", "Recorded", "green"],
            ].map(([label, value, tone]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-white/[.06] bg-black/20 px-4 py-3">
                <span className="text-xs font-semibold text-zinc-400">{label}</span>
                <span className={`text-[10px] font-black ${tone === "green" ? "text-emerald-300" : "text-amber-300"}`}>{value}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="overflow-hidden rounded-3xl border border-white/[.08] bg-[#15181c]">
        <div className="flex items-center justify-between border-b border-white/[.07] px-5 py-4 sm:px-6">
          <div>
            <h2 className="font-black text-white">Recent workflow activity</h2>
            <p className="mt-1 text-xs text-zinc-600">Illustrative events across the control plane</p>
          </div>
          <Link href="/dashboard/tasks" className="text-xs font-black text-brand-300 hover:text-brand-200">View tasks</Link>
        </div>
        <div className="divide-y divide-white/[.06]">
          {activity.map((item) => (
            <div key={item.name} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_190px_140px_70px] sm:items-center sm:px-6">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-brand-400" />
                <span className="text-sm font-bold text-zinc-100">{item.name}</span>
              </div>
              <span className="text-xs text-zinc-600">{item.channel}</span>
              <span className={`w-fit rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${item.tone === "green" ? "bg-emerald-400/10 text-emerald-300" : item.tone === "amber" ? "bg-amber-400/10 text-amber-300" : "bg-white/[.05] text-zinc-500"}`}>{item.status}</span>
              <span className="text-right text-[10px] font-semibold text-zinc-700">{item.time}</span>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
