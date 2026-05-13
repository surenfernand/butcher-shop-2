import type { FieldAccess } from 'payload'

import { getBetterAuthSessionUserId } from '@/access/betterAuthRequestUser'
import { hasAdminUser } from '@/access/bootstrapAdminAccess'
import { isAdminPrincipal } from '@/access/utilities'

/**
 * Lets the first admin / bootstrap PATCH run when Payload `req.user` is missing
 * (Better Auth session may not hit `/api/users/*` the same way) but the body is
 * only promoting Better Auth `role` → we must still allow `roles` to be written
 * by `syncBetterAuthRoleToPayloadRoles` in the same operation.
 *
 * Also allows when a **stale `payload-token`** sets `req.user` to a different id than
 * the Better Auth session (see `getBetterAuthSessionUserId`).
 */
export const rolesFieldBootstrapOrAdmin: FieldAccess = async ({ req, data, id }) => {
  const baUid = await getBetterAuthSessionUserId(req)
  if (baUid != null && id !== undefined && id !== null && String(baUid) === String(id)) {
    const incoming = data as { role?: string } | undefined
    if (incoming?.role === 'admin') {
      return true
    }
  }

  const { user } = req
  if (user && isAdminPrincipal(user)) return true
  if (!(await hasAdminUser(req))) return true

  const incoming = data as { role?: string } | undefined
  if (incoming?.role === 'admin' && (!user || isAdminPrincipal(user))) {
    return true
  }

  return false
}
