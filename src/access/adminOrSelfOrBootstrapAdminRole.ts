import type { Access } from 'payload'

import { hasAdminUser, isBootstrapAdminRoleOnlyPatch } from '@/access/bootstrapAdminAccess'
import { isAdminPrincipal } from '@/access/utilities'

export const adminOrSelfOrBootstrapAdminRole: Access = async ({ req, data, id }) => {
  const { user } = req
  if (user) {
    if (isAdminPrincipal(user)) return true

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
        //
      }
    }

    if (!(await hasAdminUser(req))) {
      return true
    }
  }

  return false
}
