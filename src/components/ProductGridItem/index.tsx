import type { Product, Variant } from '@/payload-types'

import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { Media } from '@/components/Media'
import { placeholderImageUrl } from '@/utilities/placeholderImage'
import { Price } from '@/components/Price'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { productGallery, priceInUSD, title } = product

  let price = priceInUSD

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInUSD &&
      typeof variant.priceInUSD === 'number'
    ) {
      price = variant.priceInUSD
    }
  }

  const image =
    productGallery?.[0]?.image && typeof productGallery[0]?.image !== 'string' ? productGallery[0]?.image : false

  return (
    <Link className="relative inline-block h-full w-full group" href={`/products/${product.slug}`}>
      <div
        className={clsx(
          'relative aspect-square overflow-hidden border rounded-2xl p-8 bg-primary-foreground',
        )}
      >
        {image ? (
          <Media
            className="relative h-full w-full"
            height={80}
            imgClassName={clsx('h-full w-full object-cover rounded-2xl', {
              'transition duration-300 ease-in-out group-hover:scale-102': true,
            })}
            resource={image}
            width={80}
          />
        ) : (
          <Image
            src={placeholderImageUrl(product.slug || String(product.id || 'grid-item'), 'meat')}
            alt={title || 'Product'}
            width={80}
            height={80}
            className="h-full w-full object-cover rounded-2xl transition duration-300 ease-in-out group-hover:scale-102"
          />
        )}
      </div>

      <div className="font-mono text-primary/50 group-hover:text-primary flex justify-between items-center mt-4">
        <div>{title}</div>

        {typeof price === 'number' && (
          <div className="">
            <Price amount={price} />
          </div>
        )}
      </div>
    </Link>
  )
}
