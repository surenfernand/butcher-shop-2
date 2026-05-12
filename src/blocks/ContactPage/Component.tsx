'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import React, { Fragment } from 'react'

import { FormBlock } from '@/blocks/Form/Component'
import { cn } from '@/utilities/cn'

const icons: Record<string, LucideIcon> = {
  'map-pin': MapPin,
  phone: Phone,
  mail: Mail,
}

type Media = {
  url?: string | null
  alt?: string | null
}

type Stat = {
  value?: string | null
  label?: string | null
}

type StoreHour = {
  day?: string | null
  time?: string | null
  highlight?: boolean | null
}

type ContactDetail = {
  icon?: string | null
  text?: string | null
}

type Props = {
  heroEyebrow?: string | null
  heroTitle?: string | null
  heroDescription?: string | null
  heroBackgroundImage?: Media | number | string | null
  storyEyebrow?: string | null
  storyTitle?: string | null
  storyBody?: string | null
  storyImage?: Media | number | string | null
  stats?: Stat[] | null
  formTitle?: string | null
  formDescription?: string | null
  form?: FormType | number | string | null
  hoursTitle?: string | null
  storeHours?: StoreHour[] | null
  visitTitle?: string | null
  contactDetails?: ContactDetail[] | null
  mapImage?: Media | number | string | null
  mapLabel?: string | null
  mapEmbedUrl?: string | null
}

const getMediaUrl = (media?: Media | number | string | null) => {
  if (media && typeof media === 'object' && 'url' in media) return media.url || undefined
  return undefined
}

const getMediaAlt = (media?: Media | number | string | null) => {
  if (media && typeof media === 'object' && 'alt' in media && media.alt) return media.alt
  return undefined
}

const splitLines = (text?: string | null) =>
  (text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

export const ContactPageBlock: React.FC<Props> = ({
  heroEyebrow,
  heroTitle,
  heroDescription,
  heroBackgroundImage,
  storyEyebrow,
  storyTitle,
  storyBody,
  storyImage,
  stats,
  formTitle,
  formDescription,
  form,
  hoursTitle,
  storeHours,
  visitTitle,
  contactDetails,
  mapImage,
  mapLabel,
  mapEmbedUrl,
}) => {
  const heroUrl = getMediaUrl(heroBackgroundImage)
  const heroAlt = getMediaAlt(heroBackgroundImage) || ''
  const storyUrl = getMediaUrl(storyImage)
  const storyAlt = getMediaAlt(storyImage) || 'Our atelier'
  const mapUrl = getMediaUrl(mapImage)
  const mapAlt = getMediaAlt(mapImage) || ''
  const formDoc = form && typeof form === 'object' && 'fields' in form ? form : null
  const heroHasImage = Boolean(heroUrl)
  const hasMap = Boolean(mapEmbedUrl?.trim()) || Boolean(mapUrl)
  const details = contactDetails || []
  const hours = storeHours || []

  return (
    <Fragment>
      {/* Hero is its own section so body `text-[var(--color-text)]` never leaks onto headings */}
      <section className="not-prose bg-[#1a1817] text-[#f6f3ef]">
        <div className="relative flex min-h-[min(52vh,560px)] items-center justify-center overflow-hidden px-6 py-20 text-center md:py-28">
          {heroHasImage ? (
            <img
              src={heroUrl}
              alt={heroAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#2a2624] via-[#1a1817] to-[#0f0e0d]"
              aria-hidden
            />
          )}
          <div
            className={cn(
              'absolute inset-0',
              heroHasImage
                ? 'bg-gradient-to-b from-black/75 via-black/50 to-black/72'
                : 'bg-gradient-to-b from-black/20 to-black/40',
            )}
            aria-hidden
          />
          <div className="relative z-10 mx-auto w-full max-w-3xl animate-in fade-in-0 slide-in-from-bottom-3 duration-700 motion-reduce:animate-none">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--color-gold)]">
              {heroEyebrow || 'THE HERITAGE'}
            </p>
            <h1
              className="font-sans text-3xl font-semibold leading-[1.12] tracking-tight text-[#fafafa] md:text-5xl lg:text-[3.25rem]"
              style={{ color: '#fafafa' }}
            >
              {heroTitle || 'Craftsmanship born of tradition'}
            </h1>
            {heroDescription ? (
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#e8e4df] md:text-[17px] md:leading-8">
                {heroDescription}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5f2] text-[var(--color-text)]">
      {/* Story */}
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-24 lg:grid-cols-[1fr_min(42%,480px)] lg:items-center lg:gap-16">
        <div>
          {storyEyebrow ? (
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
              {storyEyebrow}
            </p>
          ) : null}
          <h2 className="max-w-2xl font-sans text-3xl font-semibold leading-tight tracking-tight text-[var(--color-text)] md:text-4xl lg:text-[2.5rem]">
            {storyTitle || 'The theater of artisanal butchery'}
          </h2>
          <div className="mt-8 max-w-2xl space-y-5 text-sm leading-7 text-[var(--color-muted-text)] md:text-[15px] md:leading-8">
            {splitLines(storyBody).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {stats?.length ? (
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-[var(--color-border-token)] pt-8 md:gap-10">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl font-semibold tabular-nums text-[var(--color-text)] md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-text)]">
                    {stat.label}
                  </div>
                </div> 
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-[var(--color-text)] shadow-xl ring-1 ring-black/10">
          {storyUrl ? (
            <img
              src={storyUrl}
              alt={storyAlt}
              className="aspect-[4/5] w-full object-cover md:aspect-[3/4] lg:min-h-[420px]"
            />
          ) : (
            <div className="flex aspect-[4/5] min-h-[280px] items-center justify-center bg-[#2a2624] px-6 text-center text-sm text-white/50 md:aspect-[3/4] lg:min-h-[420px]">
              Add a story image in the Contact Page block (Story tab).
            </div>
          )}
        </div>
      </div>

      {/* Form + sidebar */}
      <div className="border-t border-[var(--color-border-token)] bg-white px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_380px] lg:gap-12 xl:grid-cols-[1fr_400px]">
          <div className="rounded-2xl border border-[var(--color-border-token)] bg-[#faf9f7] p-6 shadow-sm md:p-8">
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-[var(--color-text)]">
              {formTitle || 'Send a message'}
            </h2>
            {formDescription ? (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-muted-text)]">
                {formDescription}
              </p>
            ) : null}
            <div className="mt-8">
              {formDoc ? (
                <FormBlock form={formDoc} enableIntro={false} />
              ) : (
                <div className="rounded-xl border border-dashed border-[var(--color-primary)]/35 bg-white px-5 py-8 text-center text-sm text-[var(--color-muted-text)]">
                  Connect a form in the admin: Contact Page block → Inquiry &amp; Hours → Payload Form.
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-2xl border border-[var(--color-border-token)] bg-white p-6 shadow-sm md:p-7">
              <h3 className="font-sans text-lg font-semibold tracking-tight text-[var(--color-text)]">
                {hoursTitle || 'Opening hours'}
              </h3>
              {hours.length > 0 ? (
                <ul className="mt-6 space-y-0 divide-y divide-[var(--color-border-token)]">
                  {hours.map((item, index) => (
                    <li
                      key={index}
                      className="flex flex-wrap items-baseline justify-between gap-2 py-3.5 text-sm first:pt-0"
                    >
                      <span className="text-[var(--color-muted-text)]">{item.day}</span>
                      <span
                        className={cn(
                          'shrink-0 font-medium tabular-nums text-[var(--color-text)]',
                          item.highlight && 'text-[var(--color-primary)]',
                        )}
                      >
                        {item.time}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-[var(--color-muted-text)]">Hours will appear here once added in the CMS.</p>
              )}
            </div>

            {details.length > 0 ? (
              <div className="rounded-2xl border border-[var(--color-border-token)] bg-[var(--color-text)] p-6 text-white shadow-sm md:p-7">
                <h3 className="font-sans text-lg font-semibold tracking-tight text-white">
                  {visitTitle || 'Visit the atelier'}
                </h3>
                <ul className="mt-6 space-y-5">
                  {details.map((detail, index) => {
                    const Icon = icons[detail.icon || 'map-pin'] || MapPin
                    return (
                      <li key={index} className="flex gap-4 text-sm leading-relaxed text-white/90">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                          <Icon className="h-4 w-4 text-[var(--color-gold)]" strokeWidth={1.5} />
                        </span>
                        <span className="whitespace-pre-line pt-1">{detail.text}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative min-h-[380px] overflow-hidden bg-[#e8e4df] md:min-h-[440px]">
        {hasMap ? (
          <>
            {mapEmbedUrl?.trim() ? (
              <iframe
                src={mapEmbedUrl.trim()}
                title={mapLabel || 'Location map'}
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full min-h-[380px] w-full border-0 md:min-h-[440px]"
              />
            ) : mapUrl ? (
              <img
                src={mapUrl}
                alt={mapAlt || mapLabel || 'Map'}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            {(mapLabel || !mapEmbedUrl?.trim()) && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-10 pt-16">
                <div className="mx-4 flex max-w-lg items-center gap-3 rounded-full border border-white/20 bg-black/55 px-5 py-3 text-left text-white shadow-lg backdrop-blur-sm">
                  <MapPin className="h-5 w-5 shrink-0 text-[var(--color-gold)]" strokeWidth={1.75} />
                  {mapLabel ? (
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/95">{mapLabel}</p>
                  ) : (
                    <p className="text-xs text-white/80">Location</p>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex min-h-[380px] flex-col items-center justify-center gap-3 px-6 text-center md:min-h-[440px]">
            <MapPin className="h-10 w-10 text-[var(--color-muted-text)]" strokeWidth={1.25} />
            <p className="max-w-sm text-sm text-[var(--color-muted-text)]">
              Add a map embed URL or map image in the Contact Page block (Map tab) to show your location here.
            </p>
          </div>
        )}
      </div>
      </section>
    </Fragment>
  )
}
