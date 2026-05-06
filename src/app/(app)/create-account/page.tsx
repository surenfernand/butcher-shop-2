import type { Metadata } from 'next'

import { RenderParams } from '@/components/RenderParams'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { headers as getHeaders } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { CreateAccountForm } from '@/components/forms/CreateAccountForm'
import { redirect } from 'next/navigation'

export default async function CreateAccount() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?warning=${encodeURIComponent('You are already logged in.')}`)
  }

  return (
    <main className="bg-background text-foreground min-h-screen mt-5">
      <section className="container relative flex min-h-[calc(50vh-10rem)] items-center overflow-hidden py-16 md:py-24 mt-5">
        <div
          className="pointer-events-none absolute inset-0 rounded-lg bg-cover bg-center opacity-10"
          // style={{ backgroundImage: "url('/images/hero-butcher-craft.png')" }}
        />
        <div className="bg-card border-border w-full max-w-xl rounded-lg border p-8 shadow-sm md:p-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-10">
              <h1 className="text-headline-lg mb-3">Create an account</h1>
              <p className="text-muted-foreground text-body-md">
                Join us to track orders, save addresses, and shop faster.
              </p>
            </div>
            <RenderParams />
            <CreateAccountForm />
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Create account',
    url: '/create-account',
  }),
  title: 'Create account',
}
