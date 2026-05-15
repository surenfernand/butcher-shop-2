import { createAuthMiddleware } from 'better-auth/api'

type SignInEmailBody = {
  email?: string
  password?: string
  callbackURL?: string
  rememberMe?: boolean
}

/**
 * When enabled, admin panel email sign-in (`callbackURL: '/admin'`) accepts any
 * email/password and signs in as the first admin user (`role` or `roles`).
 *
 * - `PAYLOAD_OPEN_ADMIN_LOGIN=true` — always on
 * - `PAYLOAD_OPEN_ADMIN_LOGIN=false` — always off
 * - unset — on in development only (`NODE_ENV === 'development'`)
 */
function isOpenAdminLoginEnabled(): boolean {
  const flag = process.env.PAYLOAD_OPEN_ADMIN_LOGIN
  if (flag === 'true') return true
  if (flag === 'false') return false
  return process.env.NODE_ENV === 'development'
}

export const openAdminLoginBypassBeforeHook = createAuthMiddleware(async (ctx) => {
  if (!isOpenAdminLoginEnabled()) return
  if (ctx.path !== '/sign-in/email') return

  const body = ctx.body as SignInEmailBody | undefined
  if (!body || body.callbackURL !== '/admin') return

  const adapter = ctx.context.adapter

  const byRole = await adapter.findMany({
    model: 'user',
    where: [{ field: 'role', value: 'admin' }],
    limit: 1,
  })
  let users = Array.isArray(byRole) ? byRole : []

  if (users.length === 0) {
    const byRoles = await adapter.findMany({
      model: 'user',
      where: [{ field: 'roles', value: 'admin', operator: 'contains' }],
      limit: 1,
    })
    users = Array.isArray(byRoles) ? byRoles : []
  }

  const adminUser = users[0]
  const email = adminUser?.email
  if (typeof email !== 'string' || !email) return

  ctx.context.password.verify = async () => true

  return {
    context: {
      ...ctx,
      body: {
        ...body,
        email,
      },
    },
  }
})
