'use client'

import type { Header, Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { cn } from '@/utilities/cn'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

const HERO_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=2000&q=80'

type HeroLink = NonNullable<NonNullable<Page['hero']['links']>[number]['link']>

function heroLinkHref(link: HeroLink): string | null {
  if (!link) return null
  if (
    link.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value &&
    'slug' in link.reference.value &&
    link.reference.value.slug
  ) {
    const slug = link.reference.value.slug
    const prefix =
      link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
    return `${prefix}/${slug}`
  }
  return link.url ?? null
}

type HighImpactHeroProps = Page['hero'] & {
  brandLogo?: Header['logo']
  pageSlug?: string
}

export const HighImpactHero: React.FC<HighImpactHeroProps> = ({
  links,
  media,
  eyebrow,
  heading,
  description,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  const mediaUrl = media && typeof media === 'object' && media.url ? media.url : null

  const isVideo = media && typeof media === 'object' && media.mimeType?.startsWith('video')

  const imageSrc = mediaUrl || HERO_FALLBACK_IMAGE
  const imageAlt =
    (media && typeof media === 'object' && media.alt) || 'Premium marbled steak on a dark surface'

  return (
    <section
      className="relative -mt-[10.4rem] min-h-[85vh] overflow-hidden bg-[#1a1a1a] text-neutral-900"
      data-theme="light"
    >
      <div className="absolute inset-0">
        <div className="relative h-full min-h-[85vh] w-full">
          {mediaUrl && isVideo ? (
            <video autoPlay muted loop playsInline className="h-full w-full object-cover">
              <source src={mediaUrl} type={media.mimeType || 'video/mp4'} />
            </video>
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
            />
          )}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent md:from-black/45"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[85vh] items-center">
        <div className="container w-full px-4 pt-24 pb-16 md:px-8 md:pt-28 md:pb-24">
          <div className="max-w-xl rounded-sm bg-white/90 p-8 shadow-lg backdrop-blur-sm md:p-10 lg:p-12">
            {(eyebrow || heading) && (
              <div className="mb-6">
                {eyebrow && (
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E66D54]">
                    {eyebrow}
                  </p>
                )}
              </div>
            )}

            {heading && (
              <h1 className="font-filet-serif text-3xl font-semibold leading-[1.15] tracking-tight text-black md:text-4xl lg:text-[2.75rem]">
                {heading}
              </h1>
            )}

            {description && (
              <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-600 md:text-base">
                {description}
              </p>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:gap-4">
                {links.map(({ link }, i) => {
                  if (!link) return null
                  const href = heroLinkHref(link as HeroLink)
                  if (!href) return null

                  const isOutline = link.appearance === 'outline'
                  const newTabProps = link.newTab
                    ? { rel: 'noopener noreferrer' as const, target: '_blank' as const }
                    : {}

                  return (
                    <li key={i} className="flex w-full sm:w-auto">
                      <Link
                        href={href}
                        {...newTabProps}
                        className={cn(
                          'inline-flex min-h-11 w-full items-center justify-center rounded-sm px-6 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] transition sm:min-w-[140px]',
                          isOutline
                            ? 'border border-neutral-300 bg-transparent text-neutral-900 hover:border-neutral-400'
                            : 'border border-[#E66D54] bg-[#E66D54] text-white hover:bg-[#d85e42]',
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
