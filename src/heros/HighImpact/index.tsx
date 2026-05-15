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
  pageSlug,
}) => {
  const isMeatHome = pageSlug === 'home'
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  const mediaUrl =
    media && typeof media === 'object' && media.url?.trim() ? media.url.trim() : null

  const isVideo = media && typeof media === 'object' && media.mimeType?.startsWith('video')

  const imageSrc = mediaUrl || HERO_FALLBACK_IMAGE
  const imageAlt =
    (media && typeof media === 'object' && media.alt) || 'Premium marbled steak on a dark surface'

  const headingLines =
    isMeatHome && heading
      ? heading
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
      : null

  return (
    <section
      className={cn(
        /* Pull under fixed header (h-20), then pad so content clears it — avoids clipping & “squashed” band */
        'relative z-0 -mt-20 min-h-svh overflow-hidden pt-20',
        isMeatHome ? 'on-dark-media bg-[#0f0e0c] text-white' : 'bg-[var(--color-primary-hover)] text-neutral-900',
      )}
      data-theme="light"
    >
      <div className="absolute inset-0 min-h-svh">
        <div className="relative min-h-svh w-full">
          {mediaUrl && isVideo ? (
            <video autoPlay muted loop playsInline className="h-full min-h-svh w-full object-cover">
              <source src={mediaUrl} type={media.mimeType || 'video/mp4'} />
            </video>
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="100vw"
              priority
              className={cn('object-cover object-center', isMeatHome && 'brightness-[0.85] contrast-[1.05]')}
            />
          )}
        </div>
      </div>

      <div
        className={cn(
          'pointer-events-none absolute inset-0 min-h-svh bg-gradient-to-r to-transparent',
          isMeatHome
            ? 'from-black/80 via-black/50 md:from-black/75'
            : 'from-black/55 via-black/25 md:from-black/45',
        )}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[calc(100svh-5rem)] flex-col justify-center py-10 md:py-14">
        <div className="container w-full px-4 md:px-8">
          <div
            className={cn(
              'max-w-xl animate-in fade-in-0 slide-in-from-bottom-4 p-8 duration-700 motion-reduce:animate-none md:p-10 lg:p-12',
              isMeatHome
                ? 'rounded-lg border border-white/15 bg-black/55 shadow-2xl backdrop-blur-xl lg:max-w-lg'
                : 'rounded-sm bg-white/90 shadow-lg backdrop-blur-sm',
            )}
          >
            {(eyebrow || heading) && (
              <div className="mb-6">
                {eyebrow && (
                  <p
                    className={cn(
                      'mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]',
                      isMeatHome ? 'text-[var(--color-gold)]' : 'text-[var(--color-primary)]',
                    )}
                  >
                    {eyebrow}
                  </p>
                )}
              </div>
            )}

            {heading &&
              (headingLines && headingLines.length > 1 ? (
                <h1 className="font-sans font-bold tracking-tight text-white">
                  {headingLines.map((line, idx) => (
                    <span
                      key={idx}
                      className="block py-0.5 text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.02] uppercase md:text-[clamp(2.75rem,5.5vw,4.25rem)]"
                      style={{ color: '#faf8f5' }}
                    >
                      {line}
                    </span>
                  ))}
                </h1>
              ) : (
                <h1
                  className={cn(
                    'font-sans text-3xl font-semibold leading-[1.15] tracking-tight md:text-4xl lg:text-[2.75rem]',
                    isMeatHome ? 'text-[#faf8f5]' : 'text-black',
                  )}
                >
                  {heading}
                </h1>
              ))}

            {description && (
              <p
                className={cn(
                  'mt-5 max-w-md text-sm leading-relaxed md:text-base',
                  isMeatHome ? 'text-white/78' : 'text-neutral-600',
                )}
              >
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
                          'inline-flex min-h-11 w-full items-center justify-center rounded-sm px-6 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out motion-reduce:transition-colors motion-reduce:duration-0 motion-reduce:hover:translate-y-0 active:scale-[0.98] motion-reduce:active:scale-100 sm:min-w-[140px]',
                          isMeatHome
                            ? isOutline
                              ? 'border border-white/35 bg-transparent text-white shadow-sm hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/10 hover:shadow-md'
                              : 'border border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-sm hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-md'
                            : isOutline
                              ? 'border border-neutral-300 bg-transparent text-neutral-900 shadow-sm hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-md'
                              : 'border border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-sm hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-md',
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
