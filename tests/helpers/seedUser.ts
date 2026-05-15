import { getPayload } from 'payload'
import config from '../../src/payload.config.js'

export const testUser = {
  email: 'dev@payloadcms.com',
  password: 'test',
}

/**
 * Seeds a test user for e2e admin tests.
 */
export async function seedTestUser(): Promise<void> {
  const payload = await getPayload({ config })

  // Delete existing test user if any
  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })

  // Create fresh test user with Payload auth (email + password).
  // Generated `data` types omit `password`; Local API still accepts it for auth collections.
  await payload.create({
    collection: 'users',
    data: {
      email: testUser.email,
      emailVerified: true,
      role: 'admin',
      roles: ['admin'],
      password: testUser.password,
    } as unknown as Parameters<typeof payload.create>[0]['data'],
  })
}

/**
 * Cleans up test user after tests
 */
export async function cleanupTestUser(): Promise<void> {
  const payload = await getPayload({ config })

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })
}
