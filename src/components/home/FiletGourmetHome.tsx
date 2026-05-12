import { NewsletterClub } from '@/components/home/NewsletterClub'
import { Award, Hand, Utensils } from 'lucide-react'
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
    title: 'Craftsmanship',
    body: 'Generations of skill in every cut—trimmed, aged, and finished to exacting standards.',
    icon: Utensils,
  },
  {
    title: 'Gourmet Creations',
    body: 'Chef-worthy selections and specialty preparations suited for memorable occasions.',
    icon: Award,
  },
  {
    title: 'Human Touch',
    body: 'Personal service from sourcing to delivery, because luxury is in the details.',
    icon: Hand,
  },
]

export function FiletGourmetHome() {
  return (
    <>
      {/* The Artisan's Promise */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mb-14 text-center">
            <h2 className="font-sans text-3xl font-semibold tracking-tight text-black md:text-4xl">
              The Artisan&apos;s Promise
            </h2>
            <div
              className="mx-auto mt-4 h-0.5 w-12 bg-[var(--color-primary)]"
              aria-hidden
            />
          </div>

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {features.map(({ title, body, icon: Icon }) => (
              <div
                className="group flex flex-col items-center text-center transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0 md:hover:-translate-y-1"
                key={title}
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-border-token)] bg-white p-6 text-[var(--color-text)] shadow-sm transition-[box-shadow,transform,border-color] duration-300 ease-out group-hover:border-[var(--color-primary)]/25 group-hover:shadow-md motion-reduce:group-hover:translate-y-0">
                  <Icon
                    className="h-7 w-7 text-[var(--color-primary)] transition-transform duration-300 ease-out group-hover:scale-110 motion-reduce:group-hover:scale-100"
                    strokeWidth={1.25}
                  />
                </div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-black">
                  {title}
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-neutral-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Selections */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                Curated selections
              </p>
              <h2 className="font-sans text-3xl font-semibold text-black md:text-4xl">
                Signature Collections
              </h2>
            </div>
            <Link
              className="text-sm font-medium text-black underline decoration-neutral-400 underline-offset-4 transition-[color,text-decoration-color,transform] duration-200 ease-out hover:text-[var(--color-primary)] hover:decoration-[var(--color-primary)] hover:translate-x-0.5 motion-reduce:hover:translate-x-0"
              href="/shop"
            >
              Browse full catalog
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:grid-rows-2 md:gap-6">
            <Link
              className="group relative block min-h-[320px] overflow-hidden rounded-sm shadow-md ring-1 ring-black/5 transition-[box-shadow,transform] duration-500 ease-out hover:shadow-xl hover:ring-black/10 motion-reduce:transition-shadow motion-reduce:md:hover:translate-y-0 md:row-span-2 md:min-h-[min(640px,70vh)] md:hover:-translate-y-1"
              href="/shop"
            >
              <Image
                src={ASSETS.freshMeat}
                alt="Premium raw steaks and butcher knife"
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.04] motion-reduce:duration-0 motion-reduce:group-hover:scale-100"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span className="absolute right-4 top-4 bg-[var(--color-primary)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                New arrival
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-sans text-2xl font-semibold md:text-3xl">Fresh Meat</h3>
                <p className="mt-2 max-w-xs text-sm text-white/90">
                  Hand-selected, grass-fed prime cuts.
                </p>
              </div>
            </Link>

            <Link
              className="group relative block min-h-[220px] overflow-hidden rounded-sm shadow-md ring-1 ring-black/5 transition-[box-shadow,transform] duration-500 ease-out hover:shadow-xl hover:ring-black/10 motion-reduce:transition-shadow motion-reduce:md:hover:translate-y-0 md:hover:-translate-y-1"
              href="/shop"
            >
              <Image
                src={ASSETS.readyToEat}
                alt="Ready-to-eat sliced meats"
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.04] motion-reduce:duration-0 motion-reduce:group-hover:scale-100"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="font-sans text-xl font-semibold md:text-2xl">
                  Ready-to-Eat
                </h3>
                <p className="mt-1 text-sm text-white">Prepared for your table.</p>
              </div>
            </Link>

            <Link
              className="group relative block min-h-[220px] overflow-hidden rounded-sm shadow-md ring-1 ring-black/5 transition-[box-shadow,transform] duration-500 ease-out hover:shadow-xl hover:ring-black/10 motion-reduce:transition-shadow motion-reduce:md:hover:translate-y-0 md:hover:-translate-y-1"
              href="/shop-luxury"
            >
              <Image
                src={ASSETS.subscription}
                alt="Subscription meat delivery box"
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.04] motion-reduce:duration-0 motion-reduce:group-hover:scale-100"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="font-sans text-xl font-semibold md:text-2xl">
                  Subscription Boxes
                </h3>
                <p className="mt-1 text-sm text-white">Curated deliveries on your schedule.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <Utensils
          className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rotate-12 text-black/[0.04] md:h-96 md:w-96"
          aria-hidden
          strokeWidth={0.5}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center md:px-8">
          <h2 className="font-sans text-3xl font-semibold text-black md:text-4xl">
            Join the Connoisseur&apos;s Club
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-600">
            Exclusive releases, preparation tips, and members-only offers—delivered with care.
          </p>
          <div className="mt-10">
            <NewsletterClub />
          </div>
        </div>
      </section>
    </>
  )
}
