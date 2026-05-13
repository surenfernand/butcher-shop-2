import type { User } from '@/payload-types'

export const checkRole = (allRoles: User['roles'] = [], user?: User | null): boolean => {
  if (user && allRoles) {
    return allRoles.some((role) => {
      return user?.roles?.some((individualRole) => {
        return individualRole === role
      })
    })
  }

  return false
}

/**
 * Payload admin checks use `roles[]`; Better Auth + `@payload-auth/better-auth-plugin`
 * can set `role: 'admin'` before `roles` is synced (e.g. right after sign-up).
 * The Better Auth auth strategy only attaches `req.user` when `role` is in `adminRoles`.
 */
export const isAdminPrincipal = (user?: User | null): boolean => {
  if (!user) return false
  if (checkRole(['admin'], user)) return true
  const role = (user as { role?: string }).role
  return role === 'admin'
}
