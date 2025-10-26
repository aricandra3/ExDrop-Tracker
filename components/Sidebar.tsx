import Link from "next/link"

const items = [
  { label: "Airdrop", href: "/", active: true },
  { label: "All", href: "/" },
  { label: "Dex & Perps", href: "/" },
  { label: "AI", href: "/" },
  { label: "Staking", href: "/" },
  { label: "Calendar", href: "/" },
  { label: "Social", href: "/" },
  { label: "Improve Wallet", href: "/" },
  { label: "Polymer bridge", href: "/" },
]

export default function Sidebar() {
  return (
    <aside className="w-[240px] border-r border-white/10 p-4 hidden md:block">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-emerald-400/20 grid place-items-center text-emerald-300 font-bold">C</div>
        <span className="font-semibold">WATCHOOR</span>
      </div>

      <nav className="space-y-1">
        {items.map((it, i) => (
          <Link
            key={i}
            href={it.href}
            className={`block rounded-xl px-3 py-2 text-sm hover:bg-white/5 ${
              it.active ? "bg-white/10 text-emerald-300" : "text-slate-300"
            }`}
          >
            {it.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto" />
      <div className="fixed bottom-4 left-4 text-xs text-slate-500">v0.1</div>
    </aside>
  )
}
