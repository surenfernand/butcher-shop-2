'use client'

import type { Media, Product } from '@/payload-types'
import { placeholderImageUrl } from '@/utilities/placeholderImage'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
  product: Product
}

export default function ProductGallery({ product }: Props) {
  const gallery = (product.productGallery || [])
    .map((item) => item.image)
    .filter((image): image is Media => typeof image === 'object' && image !== null)

  const [activeIndex, setActiveIndex] = useState(0)

  const mainImage = gallery[activeIndex] ?? gallery[0]
  const mainSrc =
    mainImage?.url?.trim() || placeholderImageUrl(product.slug || String(product.id || 'product-gallery'))
  const thumbSlots = [1, 2, 3] as const

  return (
  <div className="flex flex-col gap-6">
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-[var(--color-text)]/10 bg-[var(--color-text)] shadow-sm">
      <Image
        src={mainSrc}
        alt={mainImage?.alt || 'Product image'}
        fill
        sizes="(max-width: 1024px) 100vw, 58vw"
        priority
        className="object-cover"
      />
    </div>

    <div className="grid grid-cols-3 gap-6">
      {thumbSlots.map((slotIndex) => {
        const img = gallery[slotIndex]
        const isActive = activeIndex === slotIndex
        const thumbSrc = img?.url?.trim() || placeholderImageUrl(`${product.slug}-thumb-${slotIndex}`)

        return (
          <button
            key={slotIndex}
            type="button"
            disabled={false}
            onClick={() => setActiveIndex(slotIndex)}
            className={[
              'relative aspect-square w-full overflow-hidden border bg-[var(--color-surface)] transition',
              'cursor-pointer hover:opacity-90',
              isActive ? 'border-[var(--color-primary)]' : 'border-[var(--color-text)]/10',
            ].join(' ')}
          >
            <Image
              src={thumbSrc}
              alt={img?.alt || `Product image ${slotIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 33vw, 20vw"
              className="object-cover"
            />
          </button>
        )
      })}
    </div>
  </div>
)
}
