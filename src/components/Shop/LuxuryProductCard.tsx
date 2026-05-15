import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { placeholderImageUrl } from '@/utilities/placeholderImage'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  product: Partial<Product> & {
    shopCardLabel?: string | null
    shopCardShortDescription?: string | null
    origin?: string | null
    cardButtonLabel?: string | null
    productGallery?: { image?: unknown }[] | null
  }
}

const originLabels: Record<string, string> = {
  'japanese-heritage': 'Japanese Heritage',
  'black-angus-heritage': 'Black Angus Heritage',
  'midwest-corn-fed': 'Midwest Corn-Fed',
}

export const LuxuryProductCard: React.FC<Props> = ({ product }) => {
  const firstImage = product.productGallery?.[0]?.image
  const image = typeof firstImage === 'object' && firstImage !== null ? firstImage : null

  const originText = product.origin ? originLabels[product.origin] || product.origin : ''

  return (
    <article className="overflow-hidden rounded-3xl border border-[var(--color-border-token)] bg-white text-[var(--color-text)] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-primary-hover)]/40 hover:shadow-xl">
      <Link className="group block h-full w-full" href={`/products/${product.slug}`}>
        <div className="relative">
          {product.shopCardLabel ? (
            <div className="absolute left-5 top-5 z-10 rounded-full bg-[var(--color-primary-hover)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white shadow-lg transition-all duration-300 group-hover:translate-y-[-2px]">
              {product.shopCardLabel}
            </div>
          ) : null}

          {image ? (
            <Media
              className="relative aspect-[4/4.4] w-full bg-[#eee7df]"
              imgClassName={clsx(
                'h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]',
              )}
              resource={image as never}
            />
          ) : (
            <div className="relative aspect-[4/4.4] w-full bg-[#eee7df]">
              <Image
                src={placeholderImageUrl(product.slug || String(product.id || 'luxury-card'), 'meat')}
                alt={product.title || 'Product'}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="space-y-3 p-6">
          <div className="flex items-start justify-between gap-4 transition-all duration-300 group-hover:translate-y-[-2px]">
            <h3 className="text-xl font-black leading-tight text-[var(--color-text)]">{product.title}</h3>

            {typeof product.priceInUSD === 'number' ? (
              <div className="shrink-0 font-bold text-[var(--color-primary-hover)]">
                <Price amount={product.priceInUSD} />
              </div>
            ) : null}
          </div>

          {originText ? (
            <p className="line-clamp-3 text-sm leading-6 text-[var(--color-muted-text)]">{originText}</p>
          ) : null}

          {product.shopCardShortDescription ? (
            <p className="line-clamp-3 text-sm leading-6 text-[var(--color-muted-text)]">
              {product.shopCardShortDescription}
            </p>
          ) : null}

          <div className="pt-2">
            <div className="rounded-full border border-[var(--color-primary-hover)] bg-[var(--color-primary-hover)] px-5 py-3 text-center text-[11px] font-black uppercase tracking-[0.24em] text-white transition-all duration-300 ease-out group-hover:border-[#c7442e] group-hover:bg-[#c7442e]">
              {product.cardButtonLabel || 'Add to Cart'}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}