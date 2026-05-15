'use client'

import type { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/cn'
import { placeholderImageUrl } from '@/utilities/placeholderImage'

type Upload = Media | string | null | undefined

const mediaUrl = (image: Upload) => {
  const u = typeof image === 'object' && image ? image.url : undefined
  return u?.trim() || undefined
}

/** Shown when no media is set in the CMS (thematic Unsplash fallbacks). */
const ABOUT_FALLBACK_IMAGES = {
  hero: placeholderImageUrl('about-editable-hero', 'hero'),
  heritageOne: placeholderImageUrl('about-editable-heritage-1', 'story'),
  heritageTwo: placeholderImageUrl('about-editable-heritage-2', 'story'),
  butchers: placeholderImageUrl('about-editable-butchers', 'team'),
} as const

const SectionVisibleContext = createContext(false)
const ReducedMotionContext = createContext(false)

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function RevealSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const reducedMotion = useContext(ReducedMotionContext)

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reducedMotion])

  return (
    <SectionVisibleContext.Provider value={visible}>
      <div
        ref={ref}
        className={cn(
          'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-200',
          reducedMotion ? 'translate-y-0 opacity-100' : visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
          className,
        )}
      >
        {children}
      </div>
    </SectionVisibleContext.Provider>
  )
}

function StaggerItem({
  index,
  className,
  children,
}: {
  index: number
  className?: string
  children: React.ReactNode
}) {
  const visible = useContext(SectionVisibleContext)
  const reducedMotion = useContext(ReducedMotionContext)

  return (
    <div
      className={cn(
        'transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150',
        reducedMotion || visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className,
      )}
      style={
        reducedMotion
          ? undefined
          : { transitionDelay: visible ? `${Math.min(index, 12) * 90}ms` : '0ms' }
      }
    >
      {children}
    </div>
  )
}

const primaryButtonClass =
  'inline-flex min-h-12 items-center justify-center bg-[var(--color-primary)] px-8 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-md active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100'

const secondaryButtonClass =
  'inline-flex min-h-12 items-center justify-center border-2 border-[var(--color-border-token)] bg-transparent px-8 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-text)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:shadow-sm active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100'

const imageHoverClass =
  'object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:scale-[1.04]'

const EditableImage = ({
  image,
  alt,
  className,
  fallbackSrc,
  imageClassName = 'object-cover',
}: {
  image?: Upload
  alt: string
  className?: string
  fallbackSrc?: string
  imageClassName?: string
}) => {
  const raw = mediaUrl(image)
  const src = raw || fallbackSrc?.trim() || placeholderImageUrl(alt, 'story')

  return (
    <div className={cn('relative h-full w-full', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={imageClassName}
      />
    </div>
  )
}

export const AboutEditableBlock: React.FC<any> = (props) => {
  const {
    eyebrow,
    quote,
    heroImage,
    heritageEyebrow,
    heritageTitle,
    heritageBody,
    heritageImageOne,
    heritageImageTwo,
    standardsEyebrow,
    standardsTitle,
    standardsBody,
    standards = [],
    butchersImage,
    ageBadge,
    butchersEyebrow,
    butchersTitle,
    butchersBody,
    features = [],
    partnersEyebrow,
    partnersTitle,
    partners = [],
    ctaTitle,
    ctaBody,
    primaryButtonLabel,
    primaryButtonUrl,
    secondaryButtonLabel,
    secondaryButtonUrl,
  } = props

  const eyebrowClass =
    'text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary-hover)] motion-reduce:animate-none animate-in fade-in duration-500'

  const reducedMotion = usePrefersReducedMotion()

  return (
    <ReducedMotionContext.Provider value={reducedMotion}>
      <section className="bg-background text-[var(--color-text)]">
      {/* Intro + hero */}
      <RevealSection>
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-10 md:px-8 md:pb-20 md:pt-14">
          <div className="mx-auto max-w-3xl text-center md:max-w-4xl pt-5">
            {eyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
            {quote ? (
              <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-[var(--color-text)] motion-reduce:animate-none animate-in fade-in slide-in-from-bottom-3 duration-700 md:mt-6 md:text-5xl md:leading-[1.06]">
                {quote}
              </h1>
            ) : null}
          </div>

          <div className="group relative mt-12 overflow-hidden rounded-lg shadow-[0_24px_60px_-12px_rgba(26,17,15,0.18)] transition-shadow duration-500 ease-out hover:shadow-[0_28px_64px_-10px_rgba(26,17,15,0.22)] md:mt-16 md:rounded-xl">
            <div className="relative aspect-[21/9] min-h-[220px] w-full md:aspect-[2.4/1] md:min-h-[320px]">
              <EditableImage
                image={heroImage}
                alt="About hero"
                fallbackSrc={ABOUT_FALLBACK_IMAGES.hero}
                className="bg-muted"
                imageClassName={imageHoverClass}
              />
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Heritage */}
      <div className="border-t border-[var(--color-border-token)] bg-[var(--color-surface)]">
        <RevealSection>
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:items-center md:gap-16 md:px-8 md:py-24">
            <div className="order-2 md:order-1">
              {heritageEyebrow ? <p className={eyebrowClass}>{heritageEyebrow}</p> : null}
              {heritageTitle ? (
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
                  {heritageTitle}
                </h2>
              ) : null}
              {heritageBody ? (
                <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--color-muted-text)] md:text-lg md:leading-relaxed">
                  {heritageBody}
                </p>
              ) : null}
            </div>

            <div className="relative order-1 min-h-[280px] md:order-2 md:min-h-[360px]">
              <div className="group absolute left-0 top-0 z-10 w-[58%] overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 transition-all duration-500 ease-out hover:z-30 hover:shadow-xl motion-reduce:hover:shadow-lg">
                <div className="relative aspect-[3/4] w-full">
                  <EditableImage
                    image={heritageImageOne}
                    alt="Heritage"
                    fallbackSrc={ABOUT_FALLBACK_IMAGES.heritageOne}
                    className="bg-muted"
                    imageClassName={imageHoverClass}
                  />
                </div>
              </div>
              <div className="group absolute bottom-0 right-0 z-20 w-[55%] overflow-hidden rounded-lg shadow-xl ring-1 ring-black/5 transition-all duration-500 ease-out hover:z-30 hover:shadow-xl motion-reduce:hover:shadow-xl">
                <div className="relative aspect-[4/5] w-full">
                  <EditableImage
                    image={heritageImageTwo}
                    alt="Heritage detail"
                    fallbackSrc={ABOUT_FALLBACK_IMAGES.heritageTwo}
                    className="bg-muted"
                    imageClassName={imageHoverClass}
                  />
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>

      {/* Standards */}
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <RevealSection>
          <div className="rounded-2xl border border-[var(--color-border-token)] bg-[var(--color-card)] px-6 py-12 shadow-sm transition-shadow duration-500 hover:shadow-md md:px-12 md:py-16">
            <div className="mx-auto max-w-2xl text-center">
              {standardsEyebrow ? <p className={eyebrowClass}>{standardsEyebrow}</p> : null}
              {standardsTitle ? (
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{standardsTitle}</h2>
              ) : null}
              {standardsBody ? (
                <p className="mt-5 text-base leading-relaxed text-[var(--color-muted-text)] md:text-lg">
                  {standardsBody}
                </p>
              ) : null}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {standards.map((item: { title?: string; body?: string }, index: number) => (
                <StaggerItem key={index} index={index}>
                  <article className="group flex h-full flex-col rounded-xl border border-[var(--color-border-token)] bg-[var(--color-background)] p-6 text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-primary)]/25 hover:shadow-lg motion-reduce:hover:translate-y-0 md:p-8">
                    <span
                      className="mb-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-sm font-bold text-[var(--color-primary-hover)] transition-transform duration-300 group-hover:scale-110"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    {item.title ? (
                      <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text)]">
                        {item.title}
                      </h3>
                    ) : null}
                    {item.body ? (
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-text)] md:text-base">
                        {item.body}
                      </p>
                    ) : null}
                  </article>
                </StaggerItem>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>

      {/* Butchers + features */}
      <div className="border-t border-[var(--color-border-token)] bg-[var(--color-surface)]">
        <RevealSection>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
            <div className="relative mx-auto w-full max-w-lg md:max-w-none">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 transition-all duration-500 ease-out hover:shadow-xl md:aspect-[3/4]">
                <EditableImage
                  image={butchersImage}
                  alt="Master butchers"
                  fallbackSrc={ABOUT_FALLBACK_IMAGES.butchers}
                  className="bg-muted"
                  imageClassName={imageHoverClass}
                />
              </div>
              {ageBadge ? (
                <div className="absolute -bottom-1 left-1/2 z-10 w-[min(100%,280px)] -translate-x-1/2 translate-y-1/2 rounded-lg bg-[var(--color-primary-hover)] px-5 py-4 text-center shadow-lg transition-transform duration-300 ease-out hover:scale-[1.03] motion-reduce:hover:scale-100 md:left-auto md:right-6 md:translate-x-0 md:translate-y-0 md:bottom-6">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white">{ageBadge}</p>
                </div>
              ) : null}
            </div>

            <div className={ageBadge ? 'pt-10 md:pt-0' : ''}>
              {butchersEyebrow ? <p className={eyebrowClass}>{butchersEyebrow}</p> : null}
              {butchersTitle ? (
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{butchersTitle}</h2>
              ) : null}
              {butchersBody ? (
                <p className="mt-6 text-base leading-relaxed text-[var(--color-muted-text)] md:text-lg">
                  {butchersBody}
                </p>
              ) : null}

              <ul className="mt-10 space-y-6">
                {features.map((item: { title?: string; body?: string }, index: number) => (
                  <StaggerItem key={index} index={index}>
                    <li className="group flex gap-4 transition-colors duration-200 hover:text-[var(--color-primary)]">
                      <span
                        className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-primary)] transition-transform duration-300 ease-out group-hover:scale-125"
                        aria-hidden
                      />
                      <div>
                        {item.title ? (
                          <h3 className="text-base font-semibold text-[var(--color-text)] transition-colors duration-200">
                            {item.title}
                          </h3>
                        ) : null}
                        {item.body ? (
                          <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted-text)] md:text-base">
                            {item.body}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  </StaggerItem>
                ))}
              </ul>
            </div>
          </div>
        </RevealSection>
      </div>

      {/* Partners */}
      <RevealSection>
        <div className="mx-auto max-w-6xl px-5 py-16 text-center md:px-8 md:py-20">
          {partnersEyebrow ? (
            <p className={`${eyebrowClass} text-[var(--color-muted-text)]`}>{partnersEyebrow}</p>
          ) : null}
          {partnersTitle ? (
            <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">{partnersTitle}</h2>
          ) : null}

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner: { name?: string }, index: number) => (
              <StaggerItem key={index} index={index}>
                <div className="rounded-lg border border-[var(--color-border-token)] bg-[var(--color-card)] px-4 py-5 text-sm font-medium uppercase tracking-wide text-[var(--color-muted-text)] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-md motion-reduce:hover:translate-y-0">
                  {partner.name}
                </div>
              </StaggerItem>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* CTA */}
      <div className="border-t border-[var(--color-border-token)] bg-muted/50 px-5 py-16 md:px-8 md:py-20">
        <RevealSection>
          <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--color-border-token)] bg-[var(--color-card)] px-6 py-12 text-center shadow-sm transition-shadow duration-500 hover:shadow-md md:px-12 md:py-14">
            {ctaTitle ? (
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{ctaTitle}</h2>
            ) : null}
            {ctaBody ? (
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--color-muted-text)]">
                {ctaBody}
              </p>
            ) : null}

            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              {primaryButtonLabel && primaryButtonUrl ? (
                <Link href={primaryButtonUrl} className={primaryButtonClass}>
                  {primaryButtonLabel}
                </Link>
              ) : null}
              {secondaryButtonLabel && secondaryButtonUrl ? (
                <Link href={secondaryButtonUrl} className={secondaryButtonClass}>
                  {secondaryButtonLabel}
                </Link>
              ) : null}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
    </ReducedMotionContext.Provider>
  )
}
