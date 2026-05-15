import type { Media } from '@/payload-types'
import { placeholderImageUrl } from '@/utilities/placeholderImage'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Upload = Media | string | null | undefined

const mediaUrl = (image: Upload) => {
  const u = typeof image === 'object' && image ? image.url : undefined
  return u?.trim() || undefined
}

export const AboutHeritageShowcaseBlock: React.FC<any> = ({
  heroTitle,
  heroSubtitle,
  heroImage,
  storyEyebrow,
  storyTitle,
  storyBody,
  primaryButtonLabel,
  primaryButtonUrl,
  secondaryButtonLabel,
  secondaryButtonUrl,
  storyImage,
  storyImageBadge,
  foundationsTitle,
  foundations = [],
  sustainabilityEyebrow,
  sustainabilityTitle,
  sustainabilityBody,
  sustainabilityCtaLabel,
  sustainabilityCtaUrl,
  sustainabilityStatValue,
  sustainabilityStatLabel,
}) => {
  const heroSrc = mediaUrl(heroImage) ?? placeholderImageUrl('heritage-showcase-hero', 'hero')
  const storySrc = mediaUrl(storyImage) ?? placeholderImageUrl('heritage-showcase-story', 'story')

  return (
    <section className="bg-[var(--color-background)] text-[#17110f]">

      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
          <div>
            {storyEyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-primary)]">{storyEyebrow}</p>
            ) : null}
            {storyTitle ? (
              <h3 className="mt-3 text-3xl font-black uppercase leading-tight tracking-[-0.02em] md:text-4xl">
                {storyTitle}
              </h3>
            ) : null}
            {storyBody ? <p className="mt-5 max-w-lg text-sm leading-7 text-[#4f4541]">{storyBody}</p> : null}
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryButtonLabel && primaryButtonUrl ? (
                <Link
                  href={primaryButtonUrl}
                  className="bg-[var(--color-primary)] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white"
                >
                  {primaryButtonLabel}
                </Link>
              ) : null}
              {secondaryButtonLabel && secondaryButtonUrl ? (
                <Link
                  href={secondaryButtonUrl}
                  className="border border-[#8b817e] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#413936]"
                >
                  {secondaryButtonLabel}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[300px] overflow-hidden border border-[#d8cecb] bg-black md:h-[340px]">
              <Image src={storySrc} alt={storyTitle || 'About us story'} fill className="object-cover" sizes="50vw" />
            </div>
            {storyImageBadge ? (
              <div className="absolute -bottom-5 left-6 max-w-[260px] bg-black px-4 py-3 text-xs text-white">
                {storyImageBadge}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="relative min-h-[460px] overflow-hidden md:min-h-[560px]">
        <Image
          src={heroSrc}
          alt={heroTitle || 'About us hero'}
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto flex min-h-[460px] max-w-6xl items-end px-6 pb-16 md:min-h-[560px] md:px-10">
          <div className="max-w-xl text-white">
            {heroTitle ? (
              <h2 className="text-4xl font-black text-white  leading-[0.95] tracking-[-0.03em] md:text-6xl" style={{color : "white !important"}}>
                {heroTitle}
              </h2>
            ) : null}
            {heroSubtitle ? <p className="mt-4 text-sm text-white/90 md:text-base">{heroSubtitle}</p> : null}
          </div>
        </div>
      </div>


      <div className="bg-[#f6efef] px-6 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          {foundationsTitle ? (
            <h3 className="text-center text-3xl font-black uppercase tracking-[-0.02em]">{foundationsTitle}</h3>
          ) : null}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {foundations.map((item: any, index: number) => (
              <article key={item.id ?? index} className="rounded-2xl border border-[var(--color-border-token)] bg-white p-6 text-[var(--color-text)] shadow-sm">
                <h4 className="text-base font-bold uppercase tracking-[-0.01em]">{item.title}</h4>
                {item.description ? <p className="mt-3 text-sm leading-6 text-[#5f5856]">{item.description}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 bg-[#15090a] p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            {sustainabilityEyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#cb8b7e]">
                {sustainabilityEyebrow}
              </p>
            ) : null}
            {sustainabilityTitle ? (
              <h3 className="mt-3 max-w-xl text-3xl font-black uppercase leading-tight tracking-[-0.03em] md:text-5xl" style={{color: "white !important"}}>
                {sustainabilityTitle}
              </h3>
            ) : null}
            {sustainabilityBody ? <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">{sustainabilityBody}</p> : null}
            {sustainabilityCtaLabel && sustainabilityCtaUrl ? (
              <Link href={sustainabilityCtaUrl} className="mt-6 inline-block text-sm underline underline-offset-4">
                {sustainabilityCtaLabel}
              </Link>
            ) : null}
          </div>
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-[#7a3f35] text-center">
            {sustainabilityStatValue ? <p className="text-3xl font-black" style={{color: "white !important"}}>{sustainabilityStatValue}</p> : null}
            {sustainabilityStatLabel ? (
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/70">{sustainabilityStatLabel}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
