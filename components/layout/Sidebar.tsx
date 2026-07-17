"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/marketing/Icons";
import { cn } from "@/lib/utils";

const navItems: { href: string; label: string; icon: IconName }[] = [
  { href: "/dashboard", label: "Overview", icon: "chart" },
  { href: "/dashboard/devices", label: "Devices", icon: "phone" },
  { href: "/dashboard/tasks", label: "Workflows", icon: "workflow" },
  { href: "/dashboard/integrations", label: "Integrations", icon: "link" },
  { href: "/dashboard/logs", label: "Audit log", icon: "shield" },
  { href: "/dashboard/settings", label: "Settings", icon: "building" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-white/[.07] bg-[#0e1114] lg:flex">
      <Link href="/" className="flex h-16 items-center gap-2.5 border-b border-white/[.07] px-5 font-black tracking-[-.04em] text-white">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-500">
          <Icon name="phone" className="h-4 w-4" />
        </span>
        <span>ACool<span className="text-brand-400">PHONE</span></span>
      </Link>

      <div className="mx-3 mt-4 rounded-2xl border border-white/[.06] bg-white/[.025] p-3">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/[.06] text-[10px] font-black text-zinc-300">DE</div>
          <div className="min-w-0">
            <p className="truncate text-xs font-black text-white">Demo environment</p>
            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">Preview mode</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Product preview">
        <p className="mb-3 px-3 text-[9px] font-black uppercase tracking-[.18em] text-zinc-700">Command center</p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition",
                    isActive ? "bg-brand-500/12 text-brand-300" : "text-zinc-500 hover:bg-white/[.04] hover:text-zinc-200",
                  )}
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/[.07] p-4">
        <div className="rounded-2xl bg-brand-500/10 p-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-brand-300">Product status</p>
          <p className="mt-1 text-[11px] leading-4 text-zinc-500">Foundation build · v0.2.0</p>
        </div>
      </div>
    </aside>
  );
}
