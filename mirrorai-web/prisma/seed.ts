import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // --- Admin User ---
  const adminEmail = 'admin@mirrorai.run'
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } })

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('Admin@2026!', 12)
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: 'MirrorAI Admin',
        role: 'admin',
        emailVerified: true,
      },
    })
    console.log(`✅ Created admin user: ${adminEmail}`)

    // --- Test ApiKey ---
    const rawKey = 'mk_test_' + Array.from({ length: 48 }, () =>
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[
        Math.floor(Math.random() * 62)
      ]
    ).join('')
    const keyHash = await bcrypt.hash(rawKey, 10)
    await prisma.apiKey.create({
      data: {
        userId: admin.id,
        name: 'Test API Key',
        keyHash,
        prefix: rawKey.slice(0, 11),
      },
    })
    console.log(`✅ Created test ApiKey (prefix: ${rawKey.slice(0, 11)})`)
  } else {
    console.log(`⏭️  Admin user already exists: ${adminEmail}`)
  }

  console.log('🎉 Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
