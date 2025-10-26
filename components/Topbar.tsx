export default function Topbar() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Airdrop</h1>
      <button className="btn bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 hover:bg-emerald-400/20">
        0x9f41…eFc7 ▾
      </button>
    </div>
  )
}
