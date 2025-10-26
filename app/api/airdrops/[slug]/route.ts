// app/api/airdrops/[slug]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const a = await prisma.airdrop.findUnique({
    where: { slug: params.slug },
    include: { tags: { include: { tag: true } } },
  })
  if (!a) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(a)
}
