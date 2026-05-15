import type { FieldAccess } from 'payload'

import { hasAdminUser } from '@/access/bootstrapAdminAccess'
import { isAdminPrincipal } from '@/access/utilities'

/**
 * Lets the first admin / bootstrap flow set `roles` when no admin exists yet,
 * or when an admin is updating the field.
 */
export const rolesFieldBootstrapOrAdmin: FieldAccess = async ({ req, data }) => {
  const { user } = req
  if (user && isAdminPrincipal(user)) return true
  if (!(await hasAdminUser(req))) return true

  const incoming = data as { role?: string } | undefined
  if (incoming?.role === 'admin' && (!user || isAdminPrincipal(user))) {
    return true
  }

  return false
}
