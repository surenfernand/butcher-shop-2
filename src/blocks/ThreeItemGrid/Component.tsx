import type { Media, Product, ThreeItemGridBlock as ThreeItemGridBlockProps } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import type { DefaultDocumentIDType } from 'payload'
import React from 'react'

const SUBSCRIPTION_IMAGE =
  'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=900&q=80'

type ProductWithGallery = Product & {
  productGallery?: { image?: Media | string | null }[] | null
}

function productImageUrl(item: ProductWithGallery): { src: string; alt: string } | null {
  const image = item.productGallery?.[0]?.image
  const media = typeof image === 'object' && image !== null ? image : null
  if (media?.url) {
    return { src: media.url, alt: media.alt || item.title || 'Product' }
  }
  return null
}

type BentoTileProps = {
  href: string
  image: { src: string; alt: string } | null
  title: string
  subtitle?: string | null
  size: 'large' | 'small'
  badge?: string | null
}

const BentoTile: React.FC<BentoTileProps> = ({
  href,
  image,
  title,
  subtitle,
  size,
  badge,
}) => {
  return (
    <Link
      href={href}
      className={
        size === 'large'
          ? 'on-dark-media group relative block min-h-[280px] overflow-hidden bg-neutral-900 text-white md:row-span-2 md:min-h-[min(640px,70vh)]'
          : 'on-dark-media group relative block min-h-[200px] overflow-hidden bg-neutral-900 text-white md:min-h-0'
      }
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          sizes={size === 'large' ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-sm text-white/50">
          No image
        </div>
      )}

      {size === 'large' && (
        <div
          className="pointer-events-none absolute inset-3 ring-1 ring-white/80"
          aria-hidden
        />
      )}

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20"
        aria-hidden
      />

      {badge ? (
        <span className="absolute right-4 top-4 bg-[var(--color-primary)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          {badge}
        </span>
      ) : null}

      <div className="absolute bottom-0 left-0 p-6 text-white md:p-8">
        <h3
          className={
            size === 'large'
              ? 'text-2xl font-semibold tracking-tight text-white md:text-3xl'
              : 'text-xl font-semibold tracking-tight text-white md:text-2xl'
          }
        >
          {title}
        </h3>
        {subtitle ? (
          <p
            className={
              size === 'large'
                ? 'mt-2 max-w-sm text-sm leading-relaxed text-white/90'
                : 'mt-1 text-sm leading-relaxed text-white/90'
            }
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </Link>
  )
}

export const ThreeItemGridBlock: React.FC<
  ThreeItemGridBlockProps & {
    id?: DefaultDocumentIDType
    className?: string
  }
> = async ({ products }) => {
  if (!products || !products[0] || !products[1]) return null

  const [first, second, third] = products
  const p0 = first as ProductWithGallery
  const p1 = second as ProductWithGallery
  const p2 = third ? (third as ProductWithGallery) : null

  const img0 = productImageUrl(p0)
  const img1 = productImageUrl(p1)
  const img2 = p2 ? productImageUrl(p2) : null

  const badgeLarge =
    (typeof p0.eyebrow === 'string' && p0.eyebrow.trim()) || 'New arrivals'

  const subtitleLarge =
    (p0.shopCardShortDescription && p0.shopCardShortDescription.trim()) ||
    'Hand-selected, grass-fed prime cuts.'

  const subtitleSmall = p1.shopCardShortDescription?.trim() || undefined

  const thirdHref = '/shop-luxury'
  const thirdTitle = p2?.title || 'Subscription Boxes'
  const thirdSubtitle = p2?.shopCardShortDescription?.trim() || (p2 ? undefined : 'Curated deliveries on your schedule.')

  const thirdImage = img2 ?? { src: SUBSCRIPTION_IMAGE, alt: thirdTitle }

  return (
    <section className="bg-[var(--color-background)] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
              Curated selections
            </p>
            <h2 className="font-sans text-3xl font-semibold text-neutral-800 md:text-4xl">
              Signature Collections
            </h2>
          </div>
          <Link
            className="self-start text-sm font-medium text-neutral-800 underline decoration-[var(--color-primary)] decoration-1 underline-offset-4 transition hover:text-[var(--color-primary)] md:self-auto"
            href="/shop"
          >
            Browse full catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-2 md:gap-4">
          <BentoTile
            badge={badgeLarge}
            href={`/products/${p0.slug}`}
            image={img0}
            size="large"
            subtitle={subtitleLarge}
            title={p0.title || 'Fresh Meat'}
          />

          <BentoTile
            href={`/products/${p1.slug}`}
            image={img1}
            size="small"
            subtitle={subtitleSmall ?? undefined}
            title={p1.title || 'Ready-to-Eat'}
          />

          <BentoTile
            href={p2?.slug ? `/products/${p2.slug}` : thirdHref}
            image={thirdImage}
            size="small"
            subtitle={thirdSubtitle ?? undefined}
            title={thirdTitle}
          />
        </div>
      </div>
    </section>
  )
}
