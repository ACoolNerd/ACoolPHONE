"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
          ACool<span className="text-brand-500">PHONE</span>
        </span>
      </div>

      <nav className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/devices"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          Devices
        </Link>
        <Link
          href="/dashboard/tasks"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          Tasks
        </Link>
      </nav>
    </header>
  );
}
