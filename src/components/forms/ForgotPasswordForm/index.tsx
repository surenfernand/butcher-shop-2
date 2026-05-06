'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
}

export const ForgotPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'There was a problem while attempting to send you a password reset email. Please try again.',
      )
    }
  }, [])

  return (
    <>
      {!success && (
        <>
          <h1 className="text-headline-lg mb-3">Forgot password</h1>
          <div className="text-muted-foreground text-body-md mb-8">
            <p>
              {`Please enter your email below. You will receive an email message with instructions on
              how to reset your password. To manage your all users, `}
              <Link
                href="/admin/collections/users"
                className="text-primary underline underline-offset-4 hover:text-[var(--color-primary-hover)]"
              >
                login to the admin dashboard
              </Link>
              .
            </p>
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Message className="mb-6 text-sm text-red-500" error={error} />

            <FormItem className="mb-8">
              <Label htmlFor="email" className="text-muted-foreground mb-2 block text-base font-normal">
                Email address
              </Label>
              <Input
                id="email"
                {...register('email', { required: 'Please provide your email.' })}
                type="email"
                className="h-12 border-0 border-b border-[var(--color-muted-text)] bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-[var(--color-primary)]"
              />
              {errors.email && <FormError message={errors.email.message} />}
            </FormItem>

            <Button
              type="submit"
              variant="default"
              className="w-full rounded border border-[var(--color-primary)] bg-[var(--color-primary)] px-5 py-6 text-[11px] font-extrabold uppercase tracking-[0.24em] text-white transition-all duration-300 ease-out hover:bg-[var(--color-primary-hover)]"
            >
              Send reset link
            </Button>
          </form>
        </>
      )}
      {success && (
        <>
          <h1 className="text-headline-lg mb-3">Request submitted</h1>
          <div className="text-muted-foreground text-body-md">
            <p>Check your email for a link that will allow you to securely reset your password.</p>
          </div>
        </>
      )}
    </>
  )
}
