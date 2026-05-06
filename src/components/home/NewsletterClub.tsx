'use client'

import { useState } from 'react'

export function NewsletterClub() {
  const [done, setDone] = useState(false)

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
        className="min-h-12 flex-1 border border-neutral-200 bg-white px-4 text-sm text-neutral-800 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
        id="connoisseur-email"
        name="email"
        placeholder="Your email address"
        type="email"
        required
        disabled={done}
        autoComplete="email"
      />
      <button
        className="min-h-12 shrink-0 bg-[var(--color-primary)] px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--color-primary-hover)] disabled:opacity-70"
        type="submit"
        disabled={done}
      >
        {done ? 'Thank you' : 'Subscribe'}
      </button>
    </form>
  )
}
