import type { Plugin } from 'payload'

const DEFAULT_ADMIN_ROLE = 'admin'

/**
 * Runs after `@payload-auth/better-auth-plugin` so admin login / create-first-admin
 * use Payload’s native layout (Logo + `login` / `create-first-user` chrome) while
 * keeping Better Auth for credentials.
 */
export const overrideBetterAuthAdminViews: Plugin = (config) => {
  config.admin ??= {}
  config.admin.components ??= {}
  config.admin.components.views = {
    ...config.admin.components.views,
    login: {
      path: '/login',
      Component: {
        path: '@/components/admin/BetterAuthAdminLogin#default',
        serverProps: { defaultAdminRole: DEFAULT_ADMIN_ROLE },
      },
    },
    createFirstAdmin: {
      path: '/create-first-admin',
      Component: {
        path: '@/components/admin/BetterAuthCreateFirstUser#default',
        serverProps: { defaultAdminRole: DEFAULT_ADMIN_ROLE },
      },
    },
  }

  return config
}
