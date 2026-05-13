import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Payload admin / access helpers use `roles[]`; Better Auth admin plugin uses `role`.
 * Keep them aligned on every write.
 */
export const syncBetterAuthRoleToPayloadRoles: CollectionBeforeChangeHook = ({ data }) => {
  if (!data) return data
  if (data.role === 'admin') {
    data.roles = ['admin']
  } else if (data.role === 'customer' || data.role === 'user') {
    data.roles = ['customer']
  }
  return data
}
