import Link from "next/link";
import { Icon, type IconName } from "@/components/marketing/Icons";
import {
  architectureLayers,
  capabilities,
  deliverySteps,
  faqs,
  integrations,
  offers,
} from "@/lib/product";

const navItems = [
  ["Product", "#product"],
  ["Integrations", "#integrations"],
  ["Delivery", "#delivery"],
  ["Pricing", "#pricing"],
  ["Architecture", "#architecture"],
] as const;

const contactEmail = process.env.NEXT_PUBLIC_SALES_EMAIL;
const contactHref = contactEmail
  ? `mailto:${contactEmail}?subject=${encodeURIComponent("ACoolPHONE scoped proposal")}`
  : "https://github.com/ACoolNerd";

function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5 font-black tracking-[-0.04em] text-white">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-500 shadow-[0_0_30px_rgba(232,82,15,.35)]">
        <Icon name="phone" className="h-4 w-4" />
      </span>
      <span>
        ACool<span className="text-brand-400">PHONE</span>
      </span>
    </span>
  );
}

function ArrowLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_50px_rgba(232,82,15,.22)] transition hover:-translate-y-0.5 hover:bg-brand-400"
    >
      {children}
      <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-brand-400">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">{description}</p>
    </div>
  );
}

function DashboardPreview() {
  const runs = [
    ["Lead handoff", "Human review", "Awaiting approval", "text-amber-300"],
    ["Appointment reminder", "WhatsApp", "Delivered", "text-emerald-300"],
    ["Device health scan", "Fleet 01", "Complete", "text-emerald-300"],
  ] as const;

  return (
    <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
      <div className="absolute -inset-10 -z-10 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#111418] shadow-2xl shadow-black/60">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500">
              <Icon name="workflow" className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Operations console</p>
              <p className="text-[11px] text-zinc-500">ACoolNERD demo tenant</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            CONTROL PLANE ONLINE
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-b border-white/10 p-4">
          {[
            ["Workflow health", "99.2%", "+1.8%"],
            ["Runs today", "1,284", "+14%"],
            ["Needs review", "07", "Action"],
          ].map(([label, value, note]) => (
            <div key={label} className="rounded-2xl border border-white/[.07] bg-white/[.035] p-3">
              <p className="text-[10px] text-zinc-500">{label}</p>
              <p className="mt-2 text-xl font-black tracking-tight text-white">{value}</p>
              <p className="mt-1 text-[9px] font-bold text-brand-300">{note}</p>
            </div>
          ))}
        </div>

        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-white">Live workflow runs</p>
            <p className="text-[10px] text-zinc-500">Demo data</p>
          </div>
          <div className="space-y-2">
            {runs.map(([name, channel, status, color], index) => (
              <div
                key={name}
                className="grid grid-cols-[28px_1fr_auto] items-center gap-3 rounded-2xl border border-white/[.06] bg-black/20 px-3 py-3"
              >
                <div className="grid h-7 w-7 place-items-center rounded-lg bg-white/[.06] text-[10px] font-black text-zinc-400">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-100">{name}</p>
                  <p className="mt-0.5 text-[10px] text-zinc-600">{channel}</p>
                </div>
                <p className={`text-[10px] font-bold ${color}`}>{status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-7 -left-5 hidden w-44 rounded-2xl border border-white/10 bg-[#171a1f]/95 p-4 shadow-xl backdrop-blur sm:block">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
            <Icon name="shield" className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-white">Approval gate</p>
            <p className="text-[9px] text-zinc-500">Policy check passed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ACoolPHONE implementation and managed operations",
    serviceType: "Business communications and workflow orchestration",
    provider: { "@type": "Organization", name: "ACoolNERD" },
    areaServed: "US",
    offers: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      description: offer.description,
      priceCurrency: "USD",
      price: offer.price.replace(/[^0-9]/g, ""),
    })),
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0d10] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.07] bg-[#0b0d10]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="#top" aria-label="ACoolPHONE home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-semibold text-zinc-400 transition hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <Link href="/dashboard" className="px-3 py-2 text-sm font-bold text-zinc-300 transition hover:text-white">
              Product preview
            </Link>
            <Link href="#pricing" className="rounded-full bg-white px-4 py-2.5 text-sm font-black text-black transition hover:bg-brand-100">
              See the offers
            </Link>
          </div>
          <details className="group relative sm:hidden">
            <summary className="cursor-pointer list-none rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-white">
              Menu
            </summary>
            <nav className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-[#15181c] p-2 shadow-2xl" aria-label="Mobile navigation">
              {navItems.map(([label, href]) => (
                <Link key={href} href={href} className="block rounded-xl px-4 py-3 text-sm font-semibold text-zinc-300 hover:bg-white/5">
                  {label}
                </Link>
              ))}
              <Link href="/dashboard" className="mt-1 block rounded-xl bg-brand-500 px-4 py-3 text-sm font-bold text-white">
                Product preview
              </Link>
            </nav>
          </details>
        </div>
      </header>

      <section id="top" className="relative bg-grid pb-28 pt-36 sm:pt-44">
        <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_15%_10%,rgba(232,82,15,.20),transparent_38%),radial-gradient(circle_at_80%_30%,rgba(249,115,22,.08),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.04fr_.96fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-400/10 px-3.5 py-2 text-[11px] font-black uppercase tracking-[.16em] text-brand-300">
              <Icon name="spark" className="h-3.5 w-3.5" />
              Private pilot architecture · 2026
            </div>
            <h1 className="text-balance text-5xl font-black leading-[.95] tracking-[-0.065em] text-white sm:text-7xl lg:text-[78px]">
              Business operations,
              <span className="mt-2 block bg-gradient-to-r from-brand-300 via-brand-500 to-orange-600 bg-clip-text text-transparent">
                orchestrated.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
              ACoolPHONE is one tenant-isolated command center for official messaging channels, company-controlled devices, governed workflows, and proof of every outcome.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ArrowLink href="#pricing">See delivery options</ArrowLink>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[.04] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/[.08]"
              >
                Explore the product preview
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                ["Consent", "before contact"],
                ["Isolation", "by tenant"],
                ["Evidence", "after every run"],
              ].map(([value, label]) => (
                <div key={value}>
                  <p className="text-sm font-black text-white">{value}</p>
                  <p className="mt-1 text-xs text-zinc-600">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <DashboardPreview />
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-white/[.025]">
        <div className="mx-auto grid max-w-7xl divide-y divide-white/[.07] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
          {[
            ["01", "Rights", "Confirm ownership, authority, consent, and the provider rules."],
            ["02", "Disclosure", "State the workflow, operator role, pricing, usage, and limits."],
            ["03", "Proof", "Preserve run history, approvals, failures, costs, and outcomes."],
          ].map(([number, title, detail]) => (
            <div key={number} className="flex gap-4 py-7 sm:px-7 first:pl-0 last:pr-0">
              <span className="text-xs font-black text-brand-400">{number}</span>
              <div>
                <p className="font-black text-white">{title}</p>
                <p className="mt-1 text-sm leading-6 text-zinc-500">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="product" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <SectionHeading
          eyebrow="The platform"
          title="Run the workflow. Keep the human in control."
          description="The platform is designed around the operating system your team actually needs: governed connections, visible execution, clean handoffs, and evidence you can inspect."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              className="group rounded-[28px] border border-white/[.08] bg-white/[.025] p-7 transition hover:-translate-y-1 hover:border-brand-400/30 hover:bg-white/[.04]"
            >
              <div className="mb-8 grid h-11 w-11 place-items-center rounded-2xl border border-brand-400/20 bg-brand-400/10 text-brand-300">
                <Icon name={capability.icon as IconName} className="h-5 w-5" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-zinc-600">{capability.eyebrow}</p>
              <h3 className="mt-2 text-xl font-black tracking-tight text-white">{capability.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-500">{capability.description}</p>
              <ul className="mt-6 space-y-2 border-t border-white/[.07] pt-5">
                {capability.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                    <Icon name="check" className="h-3.5 w-3.5 text-brand-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="integrations" className="border-y border-white/[.07] bg-[#0e1114] py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Integration plan"
              title="Official connections. Explicit status."
              description="Provider access is installed only with the client’s authorization and credentials. Nothing below is described as live before it passes scope, security, and acceptance testing."
            />
            <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[.12em]">
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-emerald-300">Foundation = in repository</span>
              <span className="rounded-full border border-white/10 px-3 py-2 text-zinc-500">Planned = scoped per client</span>
            </div>
          </div>
          <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {integrations.map((integration) => (
              <article key={integration.name} className="rounded-3xl border border-white/[.07] bg-black/20 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/[.06] text-zinc-300">
                    <Icon name={integration.status === "Foundation" ? "database" : "link"} className="h-4 w-4" />
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[.08em] ${integration.status === "Foundation" ? "bg-emerald-300/10 text-emerald-300" : "bg-white/[.05] text-zinc-500"}`}>
                    {integration.status}
                  </span>
                </div>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[.15em] text-brand-400">{integration.category}</p>
                <h3 className="mt-1 font-black text-white">{integration.name}</h3>
                <p className="mt-3 text-xs leading-5 text-zinc-500">{integration.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <SectionHeading
          eyebrow="Service structure"
          title="A defined path from idea to operated system."
          description="Every phase ends with something reviewable. That keeps decisions visible, prevents open-ended builds, and creates a clean handoff into production."
        />
        <ol className="mt-14 border-t border-white/10">
          {deliverySteps.map((step) => (
            <li key={step.number} className="grid gap-4 border-b border-white/[.08] py-7 md:grid-cols-[64px_180px_1fr_260px] md:items-center">
              <span className="text-xs font-black text-brand-400">{step.number}</span>
              <h3 className="text-xl font-black text-white">{step.title}</h3>
              <p className="text-sm leading-6 text-zinc-500">{step.detail}</p>
              <div className="flex items-start gap-2 rounded-2xl bg-white/[.035] px-4 py-3 text-xs font-semibold leading-5 text-zinc-300">
                <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />
                {step.proof}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="pricing" className="border-y border-white/[.07] bg-[#0e1114] py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Working launch pricing"
            title="Buy the next responsible step."
            description="Start with definition, prove one workflow, then operate what works. Final scope and commercial terms are confirmed in a signed proposal and statement of work."
          />
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {offers.map((offer) => (
              <article
                key={offer.name}
                className={`relative flex flex-col rounded-[30px] border p-7 ${offer.featured ? "border-brand-400/45 bg-brand-500/[.08] shadow-glow" : "border-white/[.08] bg-black/20"}`}
              >
                {offer.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-brand-500 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.12em] text-white">
                    Recommended pilot
                  </span>
                )}
                <p className="text-sm font-black text-white">{offer.name}</p>
                <div className="mt-7 flex items-end gap-2">
                  <p className="text-4xl font-black tracking-[-.05em] text-white">{offer.price}</p>
                  <p className="pb-1 text-xs font-semibold text-zinc-500">{offer.cadence}</p>
                </div>
                <p className="mt-2 text-xs font-bold text-brand-300">{offer.duration}</p>
                <p className="mt-5 min-h-12 text-sm leading-6 text-zinc-500">{offer.description}</p>
                <ul className="mt-7 flex-1 space-y-3 border-t border-white/[.08] pt-6">
                  {offer.inclusions.map((inclusion) => (
                    <li key={inclusion} className="flex gap-2.5 text-sm leading-5 text-zinc-300">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                      {inclusion}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contact"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-black transition ${offer.featured ? "bg-brand-500 text-white hover:bg-brand-400" : "border border-white/15 bg-white/[.04] text-white hover:bg-white/[.08]"}`}
                >
                  {offer.cta}
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-white/[.07] bg-black/20 px-5 py-4 text-xs leading-5 text-zinc-500">
            <strong className="text-zinc-300">Cost disclosure:</strong> hardware, carrier plans, cloud hosting, taxes, and third-party API or messaging usage are not included unless the proposal expressly says otherwise. Additional tenants, workflows, migrations, and provider adapters are scoped separately. No work begins without written authorization.
          </div>
        </div>
      </section>

      <section id="architecture" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="grid gap-16 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Technical structure"
              title="A control plane built to show its work."
              description="The architecture keeps provider access at the edge, tenant and policy decisions in the control plane, execution in bounded workers, and evidence in the proof layer."
            />
            <Link href="https://github.com/ACoolNerd/ACoolPHONE" className="mt-8 inline-flex items-center gap-2 text-sm font-black text-brand-300 transition hover:text-brand-200">
              Inspect the public repository
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3 rounded-[30px] border border-white/[.08] bg-white/[.025] p-4 sm:p-6">
            {architectureLayers.map((layer, index) => (
              <div key={layer.label} className="relative rounded-2xl border border-white/[.07] bg-black/20 p-4 sm:grid sm:grid-cols-[140px_1fr] sm:items-center sm:gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-500/15 text-[9px] font-black text-brand-300">0{index + 1}</span>
                  <p className="text-xs font-black uppercase tracking-[.1em] text-white">{layer.label}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 sm:mt-0">
                  {layer.items.map((item) => (
                    <span key={item} className="rounded-lg border border-white/[.07] bg-white/[.035] px-2.5 py-2 text-[10px] font-semibold text-zinc-400">
                      {item}
                    </span>
                  ))}
                </div>
                {index < architectureLayers.length - 1 && <div className="absolute -bottom-3 left-8 z-10 h-3 w-px bg-brand-500/60" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-[#0e1114] py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Straight answers"
            title="Before you authorize the build."
            description="The important boundaries, costs, and maturity claims should be understood before implementation begins."
          />
          <div className="mt-12 divide-y divide-white/[.08] border-y border-white/[.08]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-black text-white">
                  {faq.question}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 text-lg font-light text-brand-300 transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pb-2 pt-4 text-sm leading-7 text-zinc-500">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(232,82,15,.22),transparent_46%)]" />
        <div className="relative mx-auto max-w-4xl rounded-[36px] border border-brand-300/20 bg-gradient-to-br from-brand-500/15 to-white/[.025] px-6 py-14 text-center shadow-glow sm:px-14 sm:py-20">
          <p className="text-xs font-black uppercase tracking-[.22em] text-brand-300">The next responsible step</p>
          <h2 className="mt-5 text-balance text-4xl font-black tracking-[-.05em] text-white sm:text-6xl">Choose one workflow worth proving.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400">
            Bring the current process, provider accounts, ownership boundaries, and desired outcome. We’ll turn them into a scoped blueprint or controlled pilot proposal.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={contactHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-black text-white transition hover:bg-brand-400">
              {contactEmail ? "Request a scoped proposal" : "Contact ACoolNERD"}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/[.06]">
              Open the product preview
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[.08] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Logo />
            <p className="mt-3 text-xs text-zinc-600">A command system within the ACoolECOSYSTEM.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-zinc-500">
            <Link href="#product" className="hover:text-white">Product</Link>
            <Link href="#pricing" className="hover:text-white">Pricing</Link>
            <Link href="/dashboard" className="hover:text-white">Preview</Link>
            <Link href="https://github.com/ACoolNerd/ACoolPHONE" className="hover:text-white">GitHub</Link>
          </div>
          <p className="text-xs text-zinc-700">© 2026 ACoolNERD. MIT-licensed code.</p>
        </div>
      </footer>
    </main>
  );
}
