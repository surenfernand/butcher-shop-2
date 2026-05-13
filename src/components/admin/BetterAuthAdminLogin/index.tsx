import { Logo } from '@payloadcms/next/rsc'
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent'
import { Users } from '@/collections/Users'
import { getSafeRedirect } from 'payload/shared'
import { redirect } from 'next/navigation'
import React, { Fragment } from 'react'
import type { AdminViewServerProps } from 'payload'

import { BetterAuthAdminSignIn } from './BetterAuthAdminSignIn'

const loginBaseClass = 'login'

type Props = AdminViewServerProps & {
  defaultAdminRole?: string
}

export default async function BetterAuthAdminLogin({
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
    routes: { admin },
  } = config

  if (user) {
    const redirectTo = searchParams?.redirect
    redirect(
      redirectTo !== undefined && redirectTo !== ''
        ? getSafeRedirect({
            fallbackTo: admin,
            redirectTo,
          })
        : admin,
    )
  }

  const adminCount = await req.payload.count({
    collection: Users.slug as 'users',
    where: {
      role: {
        equals: defaultAdminRole,
      },
    },
  })

  if (adminCount.totalDocs === 0) {
    redirect(`${admin}/create-first-admin`)
  }

  const filteredAfterLogin =
    Array.isArray(afterLogin) && afterLogin.length > 1 ? afterLogin.slice(1) : undefined

  return (
    <Fragment>
      <div className={`${loginBaseClass}__brand`}>
        <Logo
          i18n={i18n}
          locale={locale}
          params={params}
          payload={payload}
          permissions={permissions}
          searchParams={searchParams}
          user={user ?? undefined}
        />
      </div>
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
      <BetterAuthAdminSignIn />
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
    </Fragment>
  )
}
