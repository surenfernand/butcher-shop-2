import type { RequiredDataFromCollectionSlug } from 'payload'
import { getPayload } from 'payload'
import config from '../../src/payload.config.js'

/** Local API accepts `password` for auth collections; generated create types omit it. */
type SeedUserCreate = RequiredDataFromCollectionSlug<'users'> & { password: string }

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
  const data: SeedUserCreate = {
    email: testUser.email,
    roles: ['admin'],
    password: testUser.password,
  }

  await payload.create({
    collection: 'users',
    data,
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
