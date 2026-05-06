import type { Metadata } from 'next'

import { LoginForm } from '@/components/forms/LoginForm'
import { RenderParams } from '@/components/RenderParams'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Login() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?warning=${encodeURIComponent('You are already logged in.')}`)
  }

  return (
    <main className="bg-background text-foreground min-h-screen bg-cover bg-center mt-5" style={{ backgroundImage: "url('/media/surreal-food-online-content-creation.jpg')" }}>
      <section className="container relative flex min-h-[calc(100vh-10rem)] items-center overflow-hidden py-16 md:py-24"

      // className="pointer-events-none absolute inset-0 rounded-lg bg-cover bg-center opacity-10"
      >
    
        <div className="bg-card border-border w-full max-w-xl rounded-lg border p-8 shadow-sm md:p-12">
          <div className="mx-auto w-full max-w-md">
            <RenderParams />

            <div className="mb-10">
              <h1 className="text-headline-lg mb-3">Welcome back</h1>
              <p className="text-muted-foreground text-body-md">
                Enter your credentials to access your account.
              </p>
            </div>

            <LoginForm />

            <div className="text-muted-foreground text-body-md mt-8">
              New to Butchers Craft?
              <Link
                href="/create-account"
                className="ml-2 text-primary underline underline-offset-4 hover:text-[var(--color-primary-hover)]"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  description: 'Login or create an account to get started.',
  openGraph: {
    title: 'Login',
    url: '/login',
  },
  title: 'Login',
}