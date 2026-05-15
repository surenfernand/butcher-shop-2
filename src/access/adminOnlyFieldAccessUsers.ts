import type { FieldAccess } from 'payload'

import { adminOnlyFieldAccess } from '@/access/adminOnlyFieldAccess'

/**
 * Like {@link adminOnlyFieldAccess}, but allows reading your own `users` document fields.
 */
export const adminOnlyFieldAccessUsers: FieldAccess = (args) => {
  return adminOnlyFieldAccess(args)
}
