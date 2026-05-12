import { NewsletterClub } from '@/components/home/NewsletterClub'
import { Flame, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ASSETS = {
  freshMeat:
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80',
  readyToEat:
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80',
  subscription:
    'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=900&q=80',
}

const features = [
  {
    title: 'High quality standards',
    body: 'Prime beef, lamb, and poultry—aged, trimmed, and finished with the discipline of a working kitchen.',
    icon: Sparkles,
  },
  {
    title: 'Attention to detail',
    body: 'From dry-aging to portioning, every step is measured so what arrives at your door matches what we would serve ourselves.',
    icon: Flame,
  },
  {
    title: 'Premium experience',
    body: 'Personal guidance on cuts, prep, and pairings—because great meat deserves the same care as great wine.',
    icon: Users,
  },
]

export function FiletGourmetHome() {
  return (
    <>
      {/* Values — dark “meat restaurant” band (same 3-column structure) */}
      <section className="on-dark-media relative overflow-hidden bg-[#12100e] py-20 text-[#f5f0e8] md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
          <div className="mb-14 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--color-gold)]">
              Explore our world
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Built for meat lovers
            </h2>
            <div className="mx-auto mt-5 h-px w-16 bg-[var(--color-primary)]" aria-hidden />
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {features.map(({ title, body, icon: Icon }) => (
              <div
                className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-8 text-center transition-[transform,box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none md:hover:-translate-y-1 md:hover:border-white/18 md:hover:shadow-lg md:hover:shadow-black/40"
                key={title}
              >
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[var(--color-gold)] transition-colors duration-300 group-hover:border-[var(--color-primary)]/40 group-hover:text-[var(--color-primary)]">
                  <Icon className="h-6 w-6" strokeWidth={1.35} />
                </div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-white/65">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections — warm light grid (same bento layout) */}
      <section className="bg-[#f0ebe4] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                From the kitchen
              </p>
              <h2 className="font-sans text-3xl font-semibold tracking-tight text-[#1a1614] md:text-4xl">
                Signature cuts &amp; boxes
              </h2>
            </div>
            <Link
              className="text-sm font-medium text-[#1a1614] underline decoration-[#1a1614]/30 underline-offset-4 transition-[color,text-decoration-color,transform] duration-200 ease-out hover:text-[var(--color-primary)] hover:decoration-[var(--color-primary)] hover:translate-x-0.5 motion-reduce:hover:translate-x-0"
              href="/shop"
            >
              Browse full catalog
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:grid-rows-2 md:gap-6">
            <Link
              className="on-dark-media group relative block min-h-[320px] overflow-hidden rounded-lg text-white shadow-lg ring-1 ring-black/10 transition-[box-shadow,transform] duration-500 ease-out hover:shadow-2xl hover:ring-black/20 motion-reduce:transition-shadow motion-reduce:md:hover:translate-y-0 md:row-span-2 md:min-h-[min(640px,70vh)] md:hover:-translate-y-1"
              href="/shop"
            >
              <Image
                src={ASSETS.freshMeat}
                alt="Premium raw steaks and butcher knife"
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.05] motion-reduce:duration-0 motion-reduce:group-hover:scale-100"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span className="absolute right-4 top-4 rounded-sm bg-[var(--color-primary)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md">
                Chef&apos;s pick
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--color-gold)]">
                  Prime cuts
                </p>
                <h3 className="font-sans text-3xl font-semibold leading-[0.95] tracking-tight text-white md:text-4xl">
                  Fresh
                  <br />
                  meat
                </h3>
                <p className="mt-3 max-w-xs text-sm text-white/85">
                  Hand-selected steaks and roasts—ready for your grill or oven.
                </p>
              </div>
            </Link>

            <Link
              className="on-dark-media group relative block min-h-[220px] overflow-hidden rounded-lg text-white shadow-md ring-1 ring-black/10 transition-[box-shadow,transform] duration-500 ease-out hover:shadow-xl motion-reduce:transition-shadow motion-reduce:md:hover:translate-y-0 md:hover:-translate-y-1"
              href="/shop"
            >
              <Image
                src={ASSETS.readyToEat}
                alt="Ready-to-eat sliced meats"
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.05] motion-reduce:duration-0 motion-reduce:group-hover:scale-100"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">
                  Fire grilled
                </p>
                <h3 className="font-sans text-2xl font-semibold tracking-tight text-white md:text-3xl">Ready to eat</h3>
                <p className="mt-2 text-sm text-white/85">Prepared cuts for busy nights.</p>
              </div>
            </Link>

            <Link
              className="on-dark-media group relative block min-h-[220px] overflow-hidden rounded-lg text-white shadow-md ring-1 ring-black/10 transition-[box-shadow,transform] duration-500 ease-out hover:shadow-xl motion-reduce:transition-shadow motion-reduce:md:hover:translate-y-0 md:hover:-translate-y-1"
              href="/shop-luxury"
            >
              <Image
                src={ASSETS.subscription}
                alt="Subscription meat delivery box"
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.05] motion-reduce:duration-0 motion-reduce:group-hover:scale-100"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">
                  Curated for you
                </p>
                <h3 className="font-sans text-2xl font-semibold tracking-tight text-white md:text-3xl">Subscription</h3>
                <p className="mt-2 text-sm text-white/85">Boxes on your schedule.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter — dark strip (same block + form) */}
      <section className="on-dark-media relative overflow-hidden border-t border-white/10 bg-[#0e0c0b] py-20 md:py-28">
        <div
          className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[var(--color-primary)]/12 blur-3xl"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
            Get exclusive offers
          </p>
          <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Join our newsletter
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/65">
            Seasonal cuts, prep tips, and members-only drops—straight to your inbox.
          </p>
          <div className="mt-10">
            <NewsletterClub variant="dark" />
          </div>
        </div>
      </section>
    </>
  )
}
