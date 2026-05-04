import type { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Upload = Media | string | null | undefined

const mediaUrl = (image: Upload) =>
  typeof image === 'object' && image ? image.url : undefined

/** Shown when no media is set in the CMS (e.g. static /about fallback). */
const ABOUT_FALLBACK_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1600&q=80',
  heritageOne:
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  heritageTwo:
    'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=800&q=80',
  butchers:
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=80',
} as const

const EditableImage = ({
  image,
  alt,
  className,
  fallbackSrc,
}: {
  image?: Upload
  alt: string
  className?: string
  /** Used when `image` has no URL (static page or unfilled upload). */
  fallbackSrc?: string
}) => {
  const src = mediaUrl(image) ?? fallbackSrc

  if (!src) {
    return <div className={['bg-neutral-100', className].filter(Boolean).join(' ')} />
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="100vw"
      className="object-cover grayscale"
    />
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

  return (
    <section className="mx-auto max-w-[1100px] px-6 py-8 text-[#2d2a26]">
      <div className="mb-10">
        {eyebrow && <p className="mb-4 text-sm">{eyebrow}</p>}
        {quote && (
          <blockquote className="mb-8 max-w-2xl border-l-2 border-[#b72b1f] pl-4 text-sm italic text-neutral-600">
            “{quote}”
          </blockquote>
        )}
        <div className="relative h-[460px] w-full overflow-hidden">
          <EditableImage
            image={heroImage}
            alt="About hero"
            fallbackSrc={ABOUT_FALLBACK_IMAGES.hero}
          />
        </div>
      </div>

      <hr className="my-20 border-[#d8c5bb]" />

      <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
        <div>
          {heritageEyebrow && (
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#b72b1f]">
              {heritageEyebrow}
            </p>
          )}
          {heritageTitle && <h2 className="mb-5 text-base">{heritageTitle}</h2>}
          {heritageBody && (
            <p className="max-w-md whitespace-pre-line text-sm leading-7 text-neutral-600">
              {heritageBody}
            </p>
          )}
        </div>

        <div className="flex items-center gap-5">
          <div className="relative h-44 w-44 bg-neutral-100 p-4">
            <EditableImage
              image={heritageImageOne}
              alt="Heritage image one"
              fallbackSrc={ABOUT_FALLBACK_IMAGES.heritageOne}
            />
          </div>
          <div className="relative h-36 w-44 overflow-hidden">
            <EditableImage
              image={heritageImageTwo}
              alt="Heritage image two"
              fallbackSrc={ABOUT_FALLBACK_IMAGES.heritageTwo}
            />
          </div>
        </div>
      </div>

      <div className="my-24 rounded bg-neutral-50 px-8 py-20 text-center">
        {standardsEyebrow && (
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#b72b1f]">
            {standardsEyebrow}
          </p>
        )}
        {standardsTitle && <h2 className="mb-6 text-base">{standardsTitle}</h2>}
        {standardsBody && (
          <p className="mx-auto mb-16 max-w-2xl text-sm leading-7 text-neutral-600">
            {standardsBody}
          </p>
        )}

        <div className="grid gap-10 md:grid-cols-3">
          {standards.map((item: any, index: number) => (
            <div key={index}>
              <div className="mx-auto mb-5 h-6 w-6 rounded-full border border-[#b72b1f]" />
              <h3 className="mb-2 text-sm font-medium">{item.title}</h3>
              <p className="mx-auto max-w-[220px] text-xs leading-6 text-neutral-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid items-center gap-16 md:grid-cols-2">
        <div className="relative">
          <div className="relative h-[430px] overflow-hidden">
            <EditableImage
              image={butchersImage}
              alt="Master butchers"
              fallbackSrc={ABOUT_FALLBACK_IMAGES.butchers}
            />
          </div>
          {ageBadge && (
            <div className="absolute bottom-[-25px] right-[-20px] bg-[#b72b1f] px-8 py-5 text-center text-sm font-bold uppercase text-white">
              {ageBadge}
            </div>
          )}
        </div>

        <div>
          {butchersEyebrow && (
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#b72b1f]">
              {butchersEyebrow}
            </p>
          )}
          {butchersTitle && <h2 className="mb-5 text-base">{butchersTitle}</h2>}
          {butchersBody && (
            <p className="mb-8 text-sm leading-7 text-neutral-600">{butchersBody}</p>
          )}

          <div className="space-y-5">
            {features.map((item: any, index: number) => (
              <div key={index} className="flex gap-3">
                <span className="mt-1 h-4 w-4 rounded-full border border-[#b72b1f]" />
                <div>
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="text-xs leading-6 text-neutral-600">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="my-24 border-[#d8c5bb]" />

      <div className="text-center">
        {partnersEyebrow && (
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neutral-500">
            {partnersEyebrow}
          </p>
        )}
        {partnersTitle && <h2 className="mb-12 text-sm">{partnersTitle}</h2>}

        <div className="mx-auto grid max-w-3xl gap-10 md:grid-cols-4">
          {partners.map((partner: any, index: number) => (
            <p key={index} className="text-sm uppercase tracking-wide">
              {partner.name}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-24 rounded bg-[#b72b1f] px-8 py-20 text-center text-white">
        {ctaTitle && <h2 className="mb-4 text-base font-semibold">{ctaTitle}</h2>}
        {ctaBody && <p className="mx-auto mb-8 max-w-xl text-sm leading-7">{ctaBody}</p>}

        <div className="flex justify-center gap-4">
          {primaryButtonLabel && primaryButtonUrl && (
            <Link href={primaryButtonUrl} className="bg-white px-8 py-3 text-xs font-bold uppercase text-[#b72b1f]">
              {primaryButtonLabel}
            </Link>
          )}
          {secondaryButtonLabel && secondaryButtonUrl && (
            <Link href={secondaryButtonUrl} className="border border-white px-8 py-3 text-xs font-bold uppercase text-white">
              {secondaryButtonLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}