import Link from "next/link";

export function Header() {
  const mobileLinks = [
    ["Overview", "/dashboard"],
    ["Devices", "/dashboard/devices"],
    ["Workflows", "/dashboard/tasks"],
    ["Integrations", "/dashboard/integrations"],
    ["Audit log", "/dashboard/logs"],
    ["Settings", "/dashboard/settings"],
  ] as const;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[.07] bg-[#0b0d10]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <Link href="/" className="font-black tracking-[-.04em] text-white lg:hidden">
        ACool<span className="text-brand-400">PHONE</span>
      </Link>
      <div className="hidden items-center gap-2 text-xs text-zinc-600 lg:flex">
        <span>Workspace</span><span>/</span><span className="font-bold text-zinc-300">Demo tenant</span>
      </div>
      <div className="flex items-center gap-3">
        <details className="group relative lg:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-white/10 px-3.5 py-2 text-xs font-bold text-zinc-300 transition hover:bg-white/[.05] hover:text-white">
            Navigate
          </summary>
          <nav className="absolute right-0 mt-3 w-52 rounded-2xl border border-white/10 bg-[#15181c] p-2 shadow-2xl" aria-label="Mobile product preview">
            {mobileLinks.map(([label, href]) => (
              <Link key={href} href={href} className="block rounded-xl px-3 py-2.5 text-xs font-bold text-zinc-400 hover:bg-white/[.05] hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
        </details>
        <Link href="/" className="hidden rounded-full border border-white/10 px-3.5 py-2 text-xs font-bold text-zinc-300 transition hover:bg-white/[.05] hover:text-white sm:inline-flex">
          Sales site
        </Link>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-500 text-xs font-black text-white" aria-label="Demo operator">
          AN
        </div>
      </div>
    </header>
  );
}
