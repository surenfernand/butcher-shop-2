'use client'

import type { Media, Product } from '@/payload-types'
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
  const thumbSlots = [1, 2, 3] as const

  return (
  <div className="flex flex-col gap-6">
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-[#1d1a17]/10 bg-[#151515] shadow-sm">
      {mainImage?.url ? (
        <Image
          src={mainImage.url}
          alt={mainImage.alt || 'Product image'}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          priority
          className="object-cover"
        />
      ) : (
        <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-white/40">
          No image
        </div>
      )}
    </div>

    <div className="grid grid-cols-3 gap-6">
      {thumbSlots.map((slotIndex) => {
        const img = gallery[slotIndex]
        const isActive = activeIndex === slotIndex

        return (
          <button
            key={slotIndex}
            type="button"
            disabled={!img?.url}
            onClick={() => img?.url && setActiveIndex(slotIndex)}
            className={[
              'relative aspect-square w-full overflow-hidden border bg-[#ece8e5] transition',
              img?.url ? 'cursor-pointer hover:opacity-90' : 'cursor-default',
              isActive ? 'border-[#e85b45]' : 'border-[#1d1a17]/10',
            ].join(' ')}
          >
            {img?.url ? (
              <Image
                src={img.url}
                alt={img.alt || `Product image ${slotIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 33vw, 20vw"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[#ece8e5]" />
            )}
          </button>
        )
      })}
    </div>
  </div>
)
}
