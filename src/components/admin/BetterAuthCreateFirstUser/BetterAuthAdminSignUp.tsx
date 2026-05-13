'use client'

import React from 'react'

import { SignUp } from '@/lib/better-auth-plugin-ui/sign-up'

import '../betterAuthLoginPayloadTheme.scss'

export type BetterAuthAdminSignUpProps = {
  apiRoute: string
  defaultAdminRole: string
  userSlug: string
}

export function BetterAuthAdminSignUp({
  apiRoute,
  defaultAdminRole,
  userSlug,
}: BetterAuthAdminSignUpProps): React.ReactElement {
  return (
    <div className="login__form better-auth-payload-login better-auth-payload-login--admin-signup">
      <SignUp admin apiRoute={apiRoute} defaultAdminRole={defaultAdminRole} userSlug={userSlug} />
    </div>
  )
}
