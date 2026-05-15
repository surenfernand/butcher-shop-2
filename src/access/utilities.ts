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
 * Treats a user as an admin if `roles` includes `admin`, or legacy `role === 'admin'`.
 */
export const isAdminPrincipal = (user?: User | null): boolean => {
  if (!user) return false
  if (checkRole(['admin'], user)) return true
  const role = (user as { role?: string }).role
  return role === 'admin'
}
