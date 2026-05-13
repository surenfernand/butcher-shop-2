import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../src/payload.config.js'

async function main(): Promise<void> {
  const email = process.argv[2]?.trim()
  if (!email) {
    console.error('Usage: npx tsx scripts/promote-admin-by-email.ts <email>')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  const found = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  })

  const user = found.docs[0]
  if (!user) {
    console.error(`No user found with email: ${email}`)
    process.exit(1)
  }

  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      role: 'admin',
      roles: ['admin'],
    },
    overrideAccess: true,
  })

  console.log(`Promoted to admin: ${email} (id ${user.id})`)
  process.exit(0)
}

void main().catch((err) => {
  console.error(err)
  process.exit(1)
})
