'use client'

import type { Media } from '@/payload-types'
import { placeholderImageUrl } from '@/utilities/placeholderImage'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'

type Upload = Media | string | null | undefined

type TestimonialItem = {
  quote?: string | null
  authorName?: string | null
  authorRole?: string | null
  authorAvatar?: Upload
}

type Props = {
  sectionBackground?: string | null
  testimonials?: TestimonialItem[] | null
  topDecorImage?: Upload
  bottomDecorImage?: Upload
}

const toMedia = (value?: Upload) =>
  value && typeof value === 'object' ? value : null

const mediaUrl = (value?: Upload) => {
  const media = toMedia(value)
  return media?.url?.trim() || ''
}

export const HomeTestimonialShowcaseBlock: React.FC<Props> = ({
  sectionBackground = 'var(--color-surface)',
  testimonials,
  topDecorImage,
  bottomDecorImage,
}) => {
  const items = useMemo(() => (testimonials || []).filter((item) => item?.quote), [testimonials])
  const [activeIndex, setActiveIndex] = useState(0)

  if (!items.length) return null

  const active = items[activeIndex]
  const avatarMedia = toMedia(active.authorAvatar)
  const topDecorUrl = mediaUrl(topDecorImage) || placeholderImageUrl('testimonial-top-decor')
  const bottomDecorUrl = mediaUrl(bottomDecorImage) || placeholderImageUrl('testimonial-bottom-decor')

  return (
    <section className="relative overflow-hidden py-20 md:py-24" style={{ backgroundColor: sectionBackground || 'var(--color-surface)' }}>
      <div className="pointer-events-none absolute right-0 top-0 hidden h-28 w-72 opacity-95 md:block">
        <Image src={topDecorUrl} alt="" fill sizes="288px" className="object-contain object-right-top" />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 hidden h-28 w-72 opacity-95 md:block">
        <Image src={bottomDecorUrl} alt="" fill sizes="288px" className="object-contain object-left-bottom" />
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-[48px_1fr_48px] items-center gap-6 px-6 md:gap-10">
        <button
          type="button"
          aria-label="Previous testimonial"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8d1c8] bg-white text-[var(--color-muted-text)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          onClick={() => setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="text-center">
          <Quote className="mx-auto h-6 w-6 text-[var(--color-muted-text)]" />
          <p className="mx-auto mt-6 max-w-3xl text-2xl leading-relaxed text-[#25384d] md:text-[38px] md:leading-[1.3]">
            {active.quote}
          </p>

          <div className="mt-10 flex flex-col items-center">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border border-[#d8d1c8] bg-white">
              <Image
                src={
                  avatarMedia?.url?.trim() ||
                  placeholderImageUrl(active.authorName || `testimonial-${activeIndex}`)
                }
                alt={avatarMedia?.alt || active.authorName || 'Author avatar'}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm font-medium text-[#25384d]">{active.authorName}</p>
            {active.authorRole ? <p className="mt-1 text-xs text-[#5e6f81]">{active.authorRole}</p> : null}
          </div>
        </div>

        <button
          type="button"
          aria-label="Next testimonial"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8d1c8] bg-white text-[var(--color-muted-text)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          onClick={() => setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}

