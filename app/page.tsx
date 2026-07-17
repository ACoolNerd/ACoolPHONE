import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-8 text-center">
        {/* Hero */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            ACool<span className="text-brand-500">PHONE</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Centralized orchestration platform for mobile automation &amp; device management.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="mb-3 text-3xl">{feature.icon}</div>
              <h2 className="mb-1 text-lg font-semibold text-slate-800 dark:text-slate-100">
                {feature.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-brand-500 px-6 py-3 font-semibold text-white shadow hover:bg-brand-600 transition"
          >
            Open Dashboard
          </Link>
          <a
            href="https://github.com/ACoolNerd/ACoolPHONE"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </main>
  );
}

const features = [
  {
    icon: "📱",
    title: "Device Manager",
    description:
      "Monitor, control, and proxy-route unlimited Android & iOS emulator instances in real time.",
  },
  {
    icon: "⚙️",
    title: "Task Engine",
    description:
      "Schedule and run no-code automation scripts across device groups with priority queuing.",
  },
  {
    icon: "🏢",
    title: "Multi-Tenant",
    description:
      "Isolated tenant workspaces with custom domains, branding, and role-based access control.",
  },
] as const;
