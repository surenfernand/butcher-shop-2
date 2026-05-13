import { Users } from '@/collections/Users'
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent'
import { redirect } from 'next/navigation'
import React from 'react'
import type { AdminViewServerProps } from 'payload'

import '../betterAuthLoginPayloadTheme.scss'
import { BetterAuthAdminSignUp } from './BetterAuthAdminSignUp'

type Props = AdminViewServerProps & {
  defaultAdminRole?: string
}

export default async function BetterAuthCreateFirstUser({
  initPageResult,
  params,
  searchParams,
  defaultAdminRole = 'admin',
}: Props): Promise<React.ReactElement> {
  const { locale, permissions, req } = initPageResult
  const {
    i18n,
    payload: { config },
    payload,
    user,
  } = req
  const {
    admin: {
      components: { afterLogin, beforeLogin } = {},
    },
    routes: { admin, api },
  } = config

  const adminCount = await req.payload.count({
    collection: Users.slug as 'users',
    where: {
      role: {
        equals: defaultAdminRole,
      },
    },
  })

  if (adminCount.totalDocs > 0) {
    redirect(admin)
  }

  const filteredAfterLogin =
    Array.isArray(afterLogin) && afterLogin.length > 1 ? afterLogin.slice(1) : undefined

  return (
    <div className="create-first-user better-auth-first-admin">
      <div className="better-auth-first-admin__shell">
        <header className="better-auth-first-admin__header">
          <h1 className="better-auth-first-admin__title">{req.t('general:welcome')}</h1>
          <p className="better-auth-first-admin__subtitle">{req.t('authentication:beginCreateFirstUser')}</p>
        </header>
        <div className="better-auth-first-admin__message">
          {RenderServerComponent({
            Component: beforeLogin,
            importMap: payload.importMap,
            serverProps: {
              i18n,
              locale,
              params,
              payload,
              permissions,
              searchParams,
              user: user ?? undefined,
            },
          })}
        </div>
        <BetterAuthAdminSignUp
          apiRoute={api}
          defaultAdminRole={defaultAdminRole}
          userSlug={Users.slug}
        />
        {RenderServerComponent({
          Component: filteredAfterLogin,
          importMap: payload.importMap,
          serverProps: {
            i18n,
            locale,
            params,
            payload,
            permissions,
            searchParams,
            user: user ?? undefined,
          },
        })}
      </div>
    </div>
  )
}
