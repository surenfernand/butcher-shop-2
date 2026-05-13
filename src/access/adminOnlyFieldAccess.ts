import type { FieldAccess } from 'payload'

import { isAdminPrincipal } from '@/access/utilities'

export const adminOnlyFieldAccess: FieldAccess = ({ req: { user } }) => {
  if (user) return isAdminPrincipal(user)

  return false
}
