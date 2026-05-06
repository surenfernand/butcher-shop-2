'use client'

import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const LogoutPage: React.FC = () => {
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Logged out successfully.')
      } catch {
        setError('You are already logged out.')
      }
    }

    void performLogout()
  }, [logout])

  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="container flex min-h-[calc(100vh-10rem)] items-center py-16 md:py-24">
        <div className="bg-card border-border w-full max-w-2xl rounded-lg border p-8 shadow-sm md:p-12">
          {(error || success) && (
            <p className="bg-secondary text-foreground mb-6 inline-flex rounded px-4 py-2 text-label-md uppercase">
              {error || success}
            </p>
          )}

          <h1 className="text-headline-lg mb-4">You are now logged out</h1>

          <p className="text-muted-foreground text-body-md mb-10 max-w-xl">
            What would you like to do next? Browse our curated collections or sign back in to
            your account.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/shop"
              className="bg-primary text-primary-foreground rounded px-6 py-3 text-label-md inline-flex items-center justify-center uppercase transition hover:bg-[var(--color-primary-hover)]"
            >
              Continue Shopping
            </Link>

            <Link
              href="/login"
              className="border-border text-foreground rounded px-6 py-3 text-label-md inline-flex items-center justify-center border uppercase transition hover:border-primary hover:text-primary"
            >
              Log In Again
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}