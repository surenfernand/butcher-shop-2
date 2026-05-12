'use client'

'use client'

import { useState } from 'react'

import { cn } from '@/utilities/cn'

type NewsletterClubProps = {
  /** Dark band (meat-restaurant style footer newsletter) */
  variant?: 'light' | 'dark'
}

export function NewsletterClub({ variant = 'light' }: NewsletterClubProps) {
  const [done, setDone] = useState(false)
  const dark = variant === 'dark'

  return (
    <form
      className="mx-auto flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:items-stretch"
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
    >
      <label className="sr-only" htmlFor="connoisseur-email">
        Email address
      </label>
      <input
        className={cn(
          'min-h-12 flex-1 px-4 text-sm shadow-sm outline-none transition-[border-color,box-shadow,transform] duration-200 ease-out motion-reduce:transition-colors enabled:hover:border-neutral-300',
          dark
            ? 'border border-white/20 bg-white/10 text-white placeholder:text-white/45 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/25'
            : 'border border-neutral-200 bg-white text-neutral-800 placeholder:text-neutral-400 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20',
        )}
        id="connoisseur-email"
        name="email"
        placeholder="Your email address"
        type="email"
        required
        disabled={done}
        autoComplete="email"
      />
      <button
        className={cn(
          'min-h-12 shrink-0 px-8 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-sm motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100',
          dark
            ? 'border border-[var(--color-gold)]/80 bg-[var(--color-gold)] text-[var(--color-text)] hover:brightness-105'
            : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]',
        )}
        type="submit"
        disabled={done}
      >
        {done ? 'Thank you' : 'Subscribe'}
      </button>
    </form>
  )
}
