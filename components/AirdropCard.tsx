import Link from "next/link"
import { formatUSD } from "@/lib/format"
import StatusBadge from "./StatusBadge"

export default function AirdropCard({ a }: { a: any }) {
  const pct = a.stepsTotal > 0 ? Math.round((a.stepsDone / a.stepsTotal) * 100) : 0

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <Link href={`/airdrops/${a.slug}`} className="text-xl font-semibold hover:underline">
          {a.title}
        </Link>
        <StatusBadge status={a.status} />
      </div>

      <p className="text-slate-300 mt-1">{a.chain} • {a.category}</p>

      {a.description && (
        <p className="mt-3 text-sm text-slate-300/90 line-clamp-3">{a.description}</p>
      )}

      {a.estValueUsd != null && (
        <p className="mt-3 text-sm">Est. Value: {formatUSD(a.estValueUsd)}</p>
      )}

      {/* Progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>Progress: {a.stepsDone} / {a.stepsTotal} Steps</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-emerald-400/70" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {a.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {a.tags.map((t: any) => <span key={t.tag.id} className="tag">{t.tag.name}</span>)}
        </div>
      ) : null}

      <div className="mt-4 flex justify-end">
        <Link
          href={`/airdrops/${a.slug}`}
          className="btn bg-emerald-400/15 text-emerald-200 border border-emerald-400/20 hover:bg-emerald-400/25"
        >
          Join {a.title} ↗
        </Link>
      </div>
    </div>
  )
}
