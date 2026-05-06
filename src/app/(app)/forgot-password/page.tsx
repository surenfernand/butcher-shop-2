import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { ForgotPasswordForm } from '@/components/forms/ForgotPasswordForm'

export default async function ForgotPasswordPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="container relative flex min-h-[calc(100vh-10rem)] items-center overflow-hidden py-16 md:py-24 mt-5">
        <div
          className="pointer-events-none absolute inset-0 rounded-lg bg-cover bg-center opacity-10"
          
        />
        <div className="bg-card border-border w-full max-w-xl rounded-lg border p-8 shadow-sm md:p-12">
          <div className="mx-auto w-full max-w-md">
            <ForgotPasswordForm />
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  description: 'Enter your email address to recover your password.',
  openGraph: mergeOpenGraph({
    title: 'Forgot Password',
    url: '/forgot-password',
  }),
  title: 'Forgot Password',
}
