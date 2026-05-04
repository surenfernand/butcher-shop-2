import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import clsx from 'clsx'
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
    <article className="overflow-hidden rounded-3xl border border-[#e4ded6] bg-white text-[#161616] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#d84a32]/40 hover:shadow-xl">
      <Link className="group block h-full w-full" href={`/products/${product.slug}`}>
        <div className="relative">
          {product.shopCardLabel ? (
            <div className="absolute left-5 top-5 z-10 rounded-full bg-[#d84a32] px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white shadow-lg transition-all duration-300 group-hover:translate-y-[-2px]">
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
            <div className="relative aspect-[4/4.4] w-full bg-[#eee7df]" />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="space-y-3 p-6">
          <div className="flex items-start justify-between gap-4 transition-all duration-300 group-hover:translate-y-[-2px]">
            <h3 className="text-xl font-black leading-tight text-[#161616]">{product.title}</h3>

            {typeof product.priceInUSD === 'number' ? (
              <div className="shrink-0 font-bold text-[#d84a32]">
                <Price amount={product.priceInUSD} />
              </div>
            ) : null}
          </div>

          {originText ? (
            <p className="line-clamp-3 text-sm leading-6 text-[#68615b]">{originText}</p>
          ) : null}

          {product.shopCardShortDescription ? (
            <p className="line-clamp-3 text-sm leading-6 text-[#68615b]">
              {product.shopCardShortDescription}
            </p>
          ) : null}

          <div className="pt-2">
            <div className="rounded-full border border-[#d84a32] bg-[#d84a32] px-5 py-3 text-center text-[11px] font-black uppercase tracking-[0.24em] text-white transition-all duration-300 ease-out group-hover:border-[#161616] group-hover:bg-[#161616]">
              {product.cardButtonLabel || 'Add to Cart'}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}