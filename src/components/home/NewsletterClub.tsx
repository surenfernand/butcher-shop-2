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
        className="min-h-12 flex-1 border border-neutral-200 bg-white px-4 text-sm text-neutral-800 shadow-sm outline-none transition-[border-color,box-shadow,transform] duration-200 ease-out placeholder:text-neutral-400 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 motion-reduce:transition-colors enabled:hover:border-neutral-300"
        id="connoisseur-email"
        name="email"
        placeholder="Your email address"
        type="email"
        required
        disabled={done}
        autoComplete="email"
      />
      <button
        className="min-h-12 shrink-0 bg-[var(--color-primary)] px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition-[transform,box-shadow,background-color] duration-200 ease-out hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-sm motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
        type="submit"
        disabled={done}
      >
        {done ? 'Thank you' : 'Subscribe'}
      </button>
    </form>
  )
}
