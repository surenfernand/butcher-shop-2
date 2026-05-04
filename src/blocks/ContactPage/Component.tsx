'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import React from 'react'

import { FormBlock } from '@/blocks/Form/Component'

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
  const storyUrl = getMediaUrl(storyImage)
  const mapUrl = getMediaUrl(mapImage)
  const formDoc = form && typeof form === 'object' && 'fields' in form ? form : null

  return (
    <section className="bg-white text-[#111]">
      <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden px-6 text-center">
        {heroUrl ? (
          <img src={heroUrl} alt="" className="absolute inset-0 h-full w-full object-cover grayscale" />
        ) : null}
        <div className="absolute inset-0 bg-white" />
        <div className="relative z-10 max-w-3xl">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.48em] text-[#e66d54]">
            {heroEyebrow || 'THE HERITAGE'}
          </p>
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-5xl">
            {heroTitle || 'CRAFTSMANSHIP BORN OF TRADITION'}
          </h1>
          {heroDescription ? (
            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#555]">{heroDescription}</p>
          ) : null}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-24 lg:grid-cols-[1fr_480px] lg:items-center">
        <div>
          {storyEyebrow ? (
            <p className="mb-8 inline-flex border-l-2 border-[#e66d54] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e66d54]">
              {storyEyebrow}
            </p>
          ) : null}
          <h2 className="max-w-2xl text-4xl font-black uppercase leading-[1.05] tracking-[-0.04em] md:text-5xl">
            {storyTitle || 'THE THEATER OF ARTISANAL BUTCHERY'}
          </h2>
          <div className="mt-8 max-w-3xl space-y-5 text-sm leading-7 text-[#555]">
            {splitLines(storyBody).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {stats?.length ? (
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-8 border-t border-[#ddd] pt-7">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-xl font-black">{stat.value}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[-0.02em] text-[#222]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative border-[14px] border-black bg-black p-5 shadow-sm">
          <div className="border border-white/15 p-3">
            {storyUrl ? (
              <img src={storyUrl} alt="" className="h-[520px] w-full object-cover grayscale" />
            ) : (
              <div className="flex h-[520px] items-center justify-center bg-[#111] text-sm uppercase text-white/60">
                Add story image in admin
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[1fr_490px]">
          <div className="bg-white p-10 shadow-sm">
            <h2 className="text-2xl font-black uppercase">{formTitle || 'INQUIRIES'}</h2>
            {formDescription ? <p className="mt-3 text-sm text-[#555]">{formDescription}</p> : null}
            <div className="mt-8">
              {formDoc ? (
                <FormBlock form={formDoc} enableIntro={false} />
              ) : (
                <div className="border border-dashed border-[#c93522]/50 p-6 text-sm text-[#555]">
                  Select a Payload form for this page in the admin panel.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-10 shadow-sm">
              <h3 className="mb-7 text-2xl font-black uppercase">{hoursTitle || 'OPENING HOURS'}</h3>
              <div className="space-y-5">
                {(storeHours || []).map((item, index) => (
                  <div key={index} className="flex justify-between border-b border-[#ddd] pb-4 text-sm">
                    <span className="text-[#555]">{item.day}</span>
                    <span className={item.highlight ? 'font-black text-[#c93522]' : 'font-black'}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="bg-[#d0452e] p-10 text-white shadow-sm">
              <h3 className="mb-6 text-2xl font-black uppercase">{visitTitle || 'VISIT THE ATELIER'}</h3>
              <div className="space-y-5">
                {(contactDetails || []).map((detail, index) => {
                  const Icon = icons[detail.icon || 'map-pin'] || MapPin
                  return (
                    <div key={index} className="flex gap-4 text-sm font-bold leading-6">
                      <Icon className="mt-1 h-4 w-4 shrink-0" />
                      <span className="whitespace-pre-line">{detail.text}</span>
                    </div>
                  )
                })}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="relative h-[500px] overflow-hidden bg-[#777]">
        {mapEmbedUrl ? (
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 grayscale"
          />
        ) : mapUrl ? (
          <img src={mapUrl} alt="" className="absolute inset-0 h-full w-full object-cover grayscale" />
        ) : null}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white/90">
            <MapPin className="mx-auto h-28 w-28 opacity-70" strokeWidth={1.3} />
            {mapLabel ? (
              <p className="mt-3 inline-flex bg-black/35 px-4 py-2 text-xs font-bold uppercase tracking-wide">
                {mapLabel}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
