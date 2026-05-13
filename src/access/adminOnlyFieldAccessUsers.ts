import type { FieldAccess } from 'payload'

import { getBetterAuthSessionUserId } from '@/access/betterAuthRequestUser'
import { adminOnlyFieldAccess } from '@/access/adminOnlyFieldAccess'

/**
 * Like {@link adminOnlyFieldAccess}, but allows reading your own `users` document fields
 * when Better Auth proves you are that user (handles stale `payload-token` vs session).
 */
export const adminOnlyFieldAccessUsers: FieldAccess = async (args) => {
  const { req, id } = args
  const baUid = await getBetterAuthSessionUserId(req)
  if (baUid != null && id !== undefined && id !== null && String(baUid) === String(id)) {
    return true
  }
  return adminOnlyFieldAccess(args)
}
