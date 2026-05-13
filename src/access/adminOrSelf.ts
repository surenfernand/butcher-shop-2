import type { Access } from 'payload'

import { getBetterAuthSessionUserId } from '@/access/betterAuthRequestUser'
import { isAdminPrincipal } from '@/access/utilities'

/**
 * The ID of the document matches that of the user or the user is an admin.
 *
 * Useful to allow users to manage their own account, but not others.
 *
 * When `id` is present (e.g. `findByID`), a **Better Auth session** for that same id
 * is accepted even if a stale **`payload-token`** still resolves `req.user` to another account.
 */
export const adminOrSelf: Access = async (args) => {
  const {
    req,
    req: { user },
  } = args
  const id = (args as { id?: string | number }).id

  const baUid = await getBetterAuthSessionUserId(req)
  if (baUid != null && id !== undefined && id !== null && String(baUid) === String(id)) {
    return true
  }

  if (user) {
    if (isAdminPrincipal(user)) {
      return true
    }

    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}
