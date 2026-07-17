"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard",         label: "Overview",   icon: "🏠" },
  { href: "/dashboard/devices", label: "Devices",    icon: "📱" },
  { href: "/dashboard/tasks",   label: "Tasks",      icon: "⚙️" },
  { href: "/dashboard/logs",    label: "Logs",       icon: "📋" },
  { href: "/dashboard/settings",label: "Settings",   icon: "🔧" },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-slate-200 px-5 dark:border-slate-700">
        <span className="text-base font-bold text-slate-900 dark:text-slate-100">
          ACool<span className="text-brand-500">PHONE</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                  )}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-700">
        <p className="text-xs text-slate-400">v0.1.0</p>
      </div>
    </aside>
  );
}
