'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
  remember?: boolean
}

export const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<null | string>(null)

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await login({
          email: data.email,
          password: data.password,
        })

        if (redirect?.current) router.push(redirect.current)
        else router.push('/account')
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Message className="mb-6 text-sm text-red-400" error={error} />

      <div className="flex flex-col gap-9">
        <FormItem>
          <Label
            htmlFor="email"
            className="mb-3 block text-base font-normal text-[var(--color-muted-text)]"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            style={{padding: "10px"}}
            className="h-12 rounded-none border-0 border-b border-[var(--color-muted-text)] bg-transparent px-0 text-[var(--color-surface)] placeholder:text-[var(--color-muted-text)] shadow-none focus-visible:ring-0 focus-visible:border-[var(--color-gold)]"
            {...register('email', { required: 'Email is required.' })}
          />
          {errors.email && <FormError message={errors.email.message} />}
        </FormItem>

        <FormItem>
          <Label
            htmlFor="password"
            className="mb-3 block text-base font-normal text-[var(--color-muted-text)]"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            style={{padding: "10px"}}
            className="h-12 rounded-none border-0 border-b border-[var(--color-muted-text)] bg-transparent px-0 text-[var(--color-surface)] placeholder:text-[var(--color-muted-text)] shadow-none focus-visible:ring-0 focus-visible:border-[var(--color-gold)]"
            {...register('password', { required: 'Please provide a password.' })}
          />
          {errors.password && <FormError message={errors.password.message} />}
        </FormItem>

        <div className="flex items-center justify-between text-sm text-[var(--color-muted-text)]">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none border border-[var(--color-border-token)] bg-transparent checked:bg-[var(--color-gold)]"
              {...register('remember')}
            />
            <span>Remember me</span>
          </label>

          <Link
            href={`/forgot-password${allParams}`}
            className="text-[var(--color-gold)] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <Button
       className="mt-5 w-full rounded-none border border-[var(--color-primary)] bg-[var(--color-primary)] px-5 py-6 text-center text-[11px] font-extrabold uppercase tracking-[0.28em] text-black transition-all duration-300 ease-out hover:bg-transparent hover:text-[var(--color-primary)] hover:scale-[1.03] active:scale-[0.97]"
        disabled={isLoading}
        size="lg"
        type="submit"
        style={{fontWeight : "900"}}
      >
        {isLoading ? 'Processing' : 'Sign In'}
      </Button>
    </form>
  )
}