'use client'

import React from 'react'

import SignIn from '@/lib/better-auth-plugin-ui/sign-in'

import '../betterAuthLoginPayloadTheme.scss'

export function BetterAuthAdminSignIn(): React.ReactElement {
  return (
    <div className="login__form better-auth-payload-login better-auth-payload-login--admin-signin">
      <SignIn admin />
    </div>
  )
}
