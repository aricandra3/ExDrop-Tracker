// lib/db.ts
import { PrismaClient } from '@prisma/client'

// Gunakan global variable untuk mencegah multiple instance saat hot reload di Next.js
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Buat atau gunakan instance prisma yang sudah ada
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })

// Simpan instance ke global di mode development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
