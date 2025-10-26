import Sidebar from "@/components/Sidebar"
import Topbar from "@/components/Topbar"
import StatsRow from "@/components/StatsRow"
import Tabs from "@/components/Tabs"
import AirdropCard from "@/components/AirdropCard"
import SearchBox from "@/components/SearchBox"
import SelectParam from "@/components/SelectParam"
import { prisma } from "@/lib/db"
import type { Prisma, AirdropStage } from "@prisma/client"

export const dynamic = "force-dynamic"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; chain?: string; tab?: string }>
}) {
  const sp = await searchParams

  const where: Prisma.AirdropWhereInput = {}
  if (sp.chain) where.chain = sp.chain
  if (sp.status) where.status = sp.status as any
  if (sp.q) {
    where.OR = [
      { title: { contains: sp.q, mode: "insensitive" } },
      { description: { contains: sp.q, mode: "insensitive" } },
    ]
  }

  const raw = (sp.tab ?? "All").toString().toLowerCase()
    .replace(/\+/g, " ").replace(/-/g, " ").replace(/\s+/g, " ").trim()

  const map: Record<string, AirdropStage | null> = {
    "all": null,
    "to do": "TODO",
    "in progress": "IN_PROGRESS",
    "complete": "COMPLETE",
  }
  const stage = map[raw] ?? null
  if (stage) where.stage = stage

  // ambil daftar chain unik untuk dropdown
  const [chainsDistinct, items, todo, prog, done, total] = await Promise.all([
    prisma.airdrop.findMany({
      distinct: ["chain"],
      select: { chain: true },
      orderBy: { chain: "asc" },
    }),
    prisma.airdrop.findMany({
      where,
      include: { tags: { include: { tag: true } } },
      orderBy: { createdAt: "desc" },
      take: 24,
    }),
    prisma.airdrop.count({ where: { stage: "TODO" } }),
    prisma.airdrop.count({ where: { stage: "IN_PROGRESS" } }),
    prisma.airdrop.count({ where: { stage: "COMPLETE" } }),
    prisma.airdrop.count(),
  ])
  const chains = chainsDistinct.map(c => c.chain).filter(Boolean)

  return (
    <>
      <Sidebar />
      <main className="flex-1 bg-grid">
        <div className="mx-auto max-w-6xl p-6 md:p-8 space-y-6">
          <Topbar />

          {/* FILTERS – reactif ke URL */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <SearchBox />
            <SelectParam
              name="chain"
              value={sp.chain}
              options={chains.length ? chains : ["Base","Ethereum","Solana","BNB Chain"]}
              labelAll="All chains"
            />
            <SelectParam
              name="status"
              value={sp.status}
              options={["OPEN","UPCOMING","CLOSED","UNKNOWN"]}
              labelAll="Any status"
            />
            <a
              href="?"
              className="btn card hover:bg-white/10 flex items-center justify-center"
              title="Clear filters"
            >
              Clear
            </a>
          </div>

          <StatsRow stats={{ total, todo, prog, done }} />
          <Tabs counts={{ todo, prog, done }} />

          <div className="text-sm text-slate-400">
            Found {items.length} airdrop(s) {stage ? `(stage = ${stage})` : "(all)"}
          </div>

          {items.length === 0 ? (
            <div className="card p-8 text-center text-slate-300">
              No airdrops match your filters.
              <div className="mt-3">
                <a className="underline" href="?">Reset filters</a>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {items.map((a) => <AirdropCard key={a.slug} a={a as any} />)}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
