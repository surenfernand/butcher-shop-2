import type { PayloadRequest } from 'payload'

/** Better Auth `role` + Payload `roles[]` */
export async function hasAdminUser(req: PayloadRequest): Promise<boolean> {
  const { totalDocs: byRoles } = await req.payload.find({
    collection: 'users',
    depth: 0,
    limit: 0,
    overrideAccess: true,
    where: {
      roles: {
        contains: 'admin',
      },
    },
  })

  if (byRoles > 0) return true

  const { totalDocs: byRole } = await req.payload.find({
    collection: 'users',
    depth: 0,
    limit: 0,
    overrideAccess: true,
    where: {
      role: {
        equals: 'admin',
      },
    },
  })

  return byRole > 0
}

/**
 * Create-first-admin sends a PATCH with `role: 'admin'` (and sometimes `id`) while Better Auth
 * cookies do not always populate Payload `req.user` the same way as admin UI requests.
 */
export function isBootstrapAdminRoleOnlyPatch(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false
  const o = data as Record<string, unknown>
  if (o.role !== 'admin') return false
  const keys = Object.keys(o).filter((k) => o[k] !== undefined)
  const extra = keys.filter((k) => k !== 'role' && k !== 'id')
  return extra.length === 0
}
