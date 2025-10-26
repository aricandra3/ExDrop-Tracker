import { NextResponse } from 'next/server'
// gunakan import relatif untuk menghindari masalah alias
import { prisma } from '../../../lib/db'

export async function GET() {
  try {
    const r = await prisma.$queryRaw`SELECT 1 AS ok;`
    return NextResponse.json({ ok: true, db: r })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
