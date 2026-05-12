'use client'

import Image from 'next/image'
import React, { useState } from 'react'

export const MonthlyMenuPromo: React.FC = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section className="not-prose bg-[#141414] text-[#f6f3ef]">
      <div className="grid md:min-h-[440px] md:grid-cols-2 md:items-stretch">
        <div className="flex flex-col justify-center px-8 py-14 md:order-none md:px-12 md:py-16 lg:px-16 lg:py-20">
          <h2
            className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-[3.15rem] lg:leading-[1.12]"
            style={{ color: '#f8f6f3' }}
          >
            Mastery In Your Inbox.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#e3ded9] md:text-[17px] md:leading-8">
            Join our inner circle for exclusive access to vintage reserves, masterclass invites, and
            seasonal provenance reports.
          </p>

          {submitted ? (
            <p className="mt-10 text-sm font-medium text-[var(--color-gold)]">
              Thank you — you&apos;re on the list.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 max-w-md">
              <label className="block">
                <span className="sr-only">Your email address</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="YOUR EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-white/20 bg-white/[0.07] px-3 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#f6f3ef] placeholder:text-white/50 outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-out focus:border-white/45 focus:bg-white/[0.1] focus:ring-1 focus:ring-white/25 motion-reduce:transition-none"
                />
              </label>
              <button
                type="submit"
                className="mt-9 w-full bg-[var(--color-gold)] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text)] shadow-sm transition-[transform,box-shadow,filter] duration-200 ease-out hover:shadow-md hover:brightness-[1.03] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] motion-reduce:transition-shadow motion-reduce:hover:translate-y-0 motion-reduce:hover:brightness-100 motion-reduce:active:scale-100 md:inline-block md:w-auto md:min-w-[300px]"
              >
                SUBSCRIBE TO CRAFT
              </button>
            </form>
          )}
        </div>

        <div className="relative flex items-center justify-center px-6 py-10 md:order-none md:px-10 md:py-14 lg:px-12">
          <div className="relative aspect-[5/6] w-full max-w-[340px] overflow-hidden rounded-md shadow-[0_22px_44px_rgba(0,0,0,0.5)] ring-1 ring-white/12 md:aspect-square md:max-w-[min(400px,40vw)]">
            <div className="absolute inset-y-0 left-[-14%] w-[128%] max-w-none">
              <Image
                src="/images/newsletter-cleaver.png"
                alt="Butcher's cleaver and sharpening steel on a wooden surface"
                fill
                className="object-cover object-center grayscale"
                sizes="(max-width: 768px) 90vw, 400px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
