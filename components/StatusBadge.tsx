export default function StatusBadge({ status }:{ status:"OPEN"|"UPCOMING"|"CLOSED"|"UNKNOWN" }) {
  const map = {
    OPEN: "bg-emerald-400/20 text-emerald-200",
    UPCOMING: "bg-amber-400/25 text-amber-100",
    CLOSED: "bg-slate-600/40 text-slate-200",
    UNKNOWN: "bg-slate-700/40 text-slate-300",
  } as const
  return <span className={`badge ${map[status]}`}>{status}</span>
}
