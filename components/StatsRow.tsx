type Stats = { total: number; todo: number; prog: number; done: number }

export default function StatsRow({ stats }: { stats: Stats }) {
  const remaining = Math.max(0, stats.total - stats.done)
  const remainingPct = stats.total ? Math.round((remaining / stats.total) * 100) : 0

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card p-5">
        <div className="text-sm text-slate-400">Completed Airdrops</div>
        <div className="mt-3 flex items-end justify-between">
          <div className="text-3xl font-bold">{stats.done}</div>
          <div className="text-xs text-slate-400">of {stats.total} total</div>
        </div>
      </div>

      <div className="card p-5">
        <div className="text-sm text-slate-400">Remaining Airdrops</div>
        <div className="mt-3 flex items-end justify-between">
          <div className="text-3xl font-bold">{remaining}</div>
          <div className="text-xs text-slate-400">{remainingPct}%</div>
        </div>
      </div>

      <div className="card p-5 bg-gradient-to-br from-amber-600/20 to-amber-400/10 border-amber-500/20">
        <div className="text-sm text-amber-200">Featured Airdrops 🌤️</div>
        <ul className="mt-2 space-y-1 text-sm">
          <li className="text-amber-100/90">• Extend (Perp DEX)</li>
          <li className="text-amber-100/90">• Liminal Airdrop</li>
          <li className="text-amber-100/90">• Hyperliquid S2</li>
        </ul>
      </div>
    </div>
  )
}
