import type { DefaultDocumentIDType } from 'payload'
import type { Media } from '@/payload-types'
import { placeholderImageUrl } from '@/utilities/placeholderImage'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  id?: DefaultDocumentIDType
  className?: string
  title?: string | null
  lead?: string | null
  body?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  image?: Media | string | null
}

export const AboutStoryBlock: React.FC<Props> = ({
  title,
  lead,
  body,
  ctaLabel,
  ctaUrl,
  image,
  className,
}) => {
  const media = typeof image === 'object' && image ? image : null
  const displaySrc =
    media?.url?.trim() || placeholderImageUrl(title || 'about-story')

  return (
    <section className={['mx-auto max-w-[1280px] px-8 py-20', className].filter(Boolean).join(' ')}>
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div className="space-y-6">
          {title && <h2 className="text-4xl font-semibold uppercase tracking-[0.08em] text-white">{title}</h2>}
          {lead && <p className="max-w-xl text-lg leading-8 text-[#d2c5b1]">{lead}</p>}
          {body && <p className="max-w-xl text-base leading-8 text-[#d2c5b1]">{body}</p>}

          {ctaLabel && ctaUrl && (
            <div className="pt-2">
              <Link
                href={ctaUrl}
                className="inline-flex items-center bg-[var(--color-gold)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:brightness-110"
              >
                {ctaLabel}
              </Link>
            </div>
          )}
        </div>

        <div className="relative min-h-[420px] overflow-hidden border border-[var(--color-gold)]/20 bg-[#1a1c1c]">
          <Image
            src={displaySrc}
            alt={media?.alt || title || 'About story image'}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale transition duration-700 hover:grayscale-0"
          />
        </div>
      </div>
    </section>
  )
}