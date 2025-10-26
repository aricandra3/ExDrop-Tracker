import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Tes query sederhana ke database
    const result = await prisma.$queryRaw`SELECT 1 AS ok;`
    return NextResponse.json({ success: true, db: result })
  } catch (err) {
    console.error('Database test failed:', err)
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
