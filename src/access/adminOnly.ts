import type { Access } from 'payload'

import { isAdminPrincipal } from '@/access/utilities'

export const adminOnly: Access = ({ req: { user } }) => {
  if (user) return isAdminPrincipal(user)

  return false
}
