import { PrismaClient } from "@prisma/client"

type AirdropStage  = "TODO" | "IN_PROGRESS" | "COMPLETE"
type AirdropStatus = "OPEN" | "UPCOMING" | "CLOSED" | "UNKNOWN"

const prisma = new PrismaClient()

async function upsert(data: {
  slug: string
  title: string
  chain: string
  category: string
  status?: AirdropStatus
  description?: string
  howTo?: string
  siteUrl?: string
  claimUrl?: string
  estValueUsd?: number
  stage?: AirdropStage
  stepsTotal?: number
  stepsDone?: number
  tagNames?: string[]
}) {
  await prisma.airdrop.upsert({
    where: { slug: data.slug },
    update: {},
    create: {
      slug: data.slug,
      title: data.title,
      chain: data.chain,
      category: data.category,
      status: data.status ?? "OPEN",
      description: data.description,
      howTo: data.howTo,
      siteUrl: data.siteUrl,
      claimUrl: data.claimUrl,
      estValueUsd: data.estValueUsd,
      stage: data.stage ?? "TODO",
      stepsTotal: data.stepsTotal ?? 0,
      stepsDone: data.stepsDone ?? 0,
    },
  })
}
