'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Product } from '@/payload-types'
import { AddToCart } from '@/components/Cart/AddToCart'

type PurchaseType = 'one_time' | 'monthly'

type ProductWithUIFields = Product & {
  title?: string
  slug?: string
  purchaseFrequencies?: {
    oneTime?: {
      enabled?: boolean | null
      priceOverride?: string | null
    } | null
    monthly?: {
      enabled?: boolean | null
      priceOverride?: string | null
      savingsText?: string | null
    } | null
  } | null
  meta?: {
    description?: string | null
    image?: unknown
  } | null
}

type Props = {
  product: ProductWithUIFields
}

export default function ProductDetails({ product }: Props) {
  const frequencies = product.purchaseFrequencies

  const purchaseOptions = useMemo<
    {
      label: string
      value: PurchaseType
      price?: string | null
      subtext?: string | null
    }[]
  >(() => {
    return [
      ...(frequencies?.oneTime?.enabled !== false
        ? [
          {
            label: 'One-Time',
            value: 'one_time' as PurchaseType,
            price: frequencies?.oneTime?.priceOverride,
          },
        ]
        : []),

      ...(frequencies?.monthly?.enabled !== false
        ? [
          {
            label: 'Monthly',
            value: 'monthly' as PurchaseType,
            price: frequencies?.monthly?.priceOverride,
            subtext: frequencies?.monthly?.savingsText,
          },
        ]
        : []),
    ]
  }, [frequencies])

  const [purchaseType, setPurchaseType] = useState<PurchaseType>(
    purchaseOptions[0]?.value || 'one_time',
  )

  useEffect(() => {
    if (
      purchaseOptions.length > 0 &&
      !purchaseOptions.some((option) => option.value === purchaseType)
    ) {
      setPurchaseType(purchaseOptions[0].value)
    }
  }, [purchaseOptions, purchaseType])

  return (
    <div className="flex flex-col font-sans">
      {product.eyebrow && (
        <span className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#c73524]">
          {product.eyebrow}
        </span>
      )}

      <h1 className="mb-5 text-5xl font-black tracking-[-0.06em] text-[#111]">
        {product.title}
      </h1>

      {Array.isArray(product.badges) && product.badges.length > 0 && (
        <div className="mb-9 flex flex-wrap gap-3">
          {product.badges.map((badge, i) => (
            <span
              key={i}
              className="bg-[#e9e6e4] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#1d1a17]"
            >
              {badge.label}
            </span>
          ))}
        </div>
      )}

      {product.meta?.description && (
        <p className="mb-14 max-w-md text-[17px] leading-8 text-[#67615d]">
          {product.meta.description}
        </p>
      )}

      {Array.isArray(product.whatsInside) && product.whatsInside.length > 0 && (
        <div className="mb-10 border border-[#ded8d5] bg-white p-10 shadow-sm">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#aaa29d]">
            What&apos;s Inside
          </h3>

          <ul className="divide-y divide-[#e8e2df] text-sm text-[#272321]">
            {product.whatsInside.map((item, i) => (
              <li key={i} className="flex items-center justify-between py-4">
                <span>
                  <span>{item.quantity}</span>{' '}
                  <span>{item.label}</span>
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#d73725] text-[11px] text-[#d73725]">
                  ✓
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {purchaseOptions.length > 0 && (
        <div className="mb-16 space-y-5">
          {purchaseOptions.map((option) => {
            const isSelected = purchaseType === option.value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setPurchaseType(option.value)}
                className={[
                  'flex w-full items-center justify-between border p-6 text-left transition',
                  isSelected
                    ? 'border-[#c23224] bg-[#fff7f5]'
                    : 'border-[#ead8d3] bg-white hover:border-[#c23224]/60',
                ].join(' ')}
              >
                <div className="flex items-center gap-5">
                  <span
                    className={[
                      'flex h-4 w-4 items-center justify-center rounded-full border',
                      isSelected ? 'border-[#c23224]' : 'border-[#9f9a96]',
                    ].join(' ')}
                  >
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-[#c23224]" />
                    )}
                  </span>

                  <span>
                    <span className="block text-sm font-black text-[#15110f]">
                      {option.label}
                    </span>

                    {option.subtext && (
                      <span className="mt-1 block text-xs text-[#7d7671]">
                        {option.subtext}
                      </span>
                    )}
                  </span>
                </div>

                {option.price && (
                  <span
                    className={[
                      'text-sm font-black',
                      isSelected ? 'text-[#c23224]' : 'text-[#15110f]',
                    ].join(' ')}
                  >
                    {option.price}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}

      <AddToCart
        product={product}
        purchaseType={purchaseType}
        className="flex h-24 w-full items-center justify-center bg-[#e95b45] text-xs font-bold uppercase tracking-[0.3em] text-white transition hover:bg-[#d94d38]"
      />
    </div>
  )
}