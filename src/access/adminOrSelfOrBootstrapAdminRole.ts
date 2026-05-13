import type { Access } from 'payload'

import { getBetterAuthSessionUserId } from '@/access/betterAuthRequestUser'
import { hasAdminUser, isBootstrapAdminRoleOnlyPatch } from '@/access/bootstrapAdminAccess'
import { isAdminPrincipal } from '@/access/utilities'

export const adminOrSelfOrBootstrapAdminRole: Access = async ({ req, data, id }) => {
  const baUid = await getBetterAuthSessionUserId(req)
  if (
    data &&
    isBootstrapAdminRoleOnlyPatch(data) &&
    id !== undefined &&
    id !== null &&
    baUid != null &&
    String(baUid) === String(id)
  ) {
    return true
  }

  const { user } = req
  if (user) {
    if (isAdminPrincipal(user)) return true

    // Better Auth create-first-admin: `addAdminRole` PATCHes `{ role: 'admin' }` as the
    // signed-in user. `roles[]` may still be `['customer']`, so `isAdminPrincipal` is false
    // and we used to return `{ id: { equals: user.id } }`. Combined with the route `id`
    // filter, a string vs number mismatch can yield no row and Payload returns 403.
    if (
      data &&
      isBootstrapAdminRoleOnlyPatch(data) &&
      id !== undefined &&
      id !== null &&
      String(user.id) === String(id)
    ) {
      try {
        const target = await req.payload.findByID({
          collection: 'users',
          id,
          depth: 0,
          overrideAccess: true,
        })
        if (target?.role === 'admin') {
          return true
        }
      } catch {
        //
      }
    }

    return {
      id: {
        equals: user.id,
      },
    }
  }

  if (data && isBootstrapAdminRoleOnlyPatch(data)) {
    // Better Auth create-first-admin: no Payload `req.user`, but the plugin still PATCHes
    // `{ role: 'admin' }` to align Payload. By then `hasAdminUser()` is often already true
    // because the new user has `role: 'admin'` from signup, so the old bootstrap check never ran.
    if (id !== undefined && id !== null) {
      try {
        const target = await req.payload.findByID({
          collection: 'users',
          id,
          depth: 0,
          overrideAccess: true,
        })
        if (target && target.role === 'admin') {
          return true
        }
      } catch {
        // missing doc — fall through
      }
    }

    if (!(await hasAdminUser(req))) {
      return true
    }
  }

  return false
}
