import type { DefaultDocumentIDType } from 'payload'
import React from 'react'
import {
  BadgeCheck,
  HandHeart,
  
  ShoppingBag,
  Truck,
  Utensils,
  type LucideIcon,
} from 'lucide-react'

type PromiseItem = {
  icon?: 'utensils' | 'badge' | 'heartHandshake'  | 'shoppingBag' | 'truck' | null
  title?: string | null
  description?: string | null
}

type ArtisansPromiseBlockProps = {
  heading?: string | null
  items?: PromiseItem[] | null
}

const iconMap: Record<NonNullable<PromiseItem['icon']>, LucideIcon> = {
  utensils: Utensils,
  badge: BadgeCheck,
  heartHandshake: HandHeart, 
  shoppingBag: ShoppingBag,
  truck: Truck,
}

export const ArtisansPromiseBlock: React.FC<
  ArtisansPromiseBlockProps & {
    id?: DefaultDocumentIDType
    className?: string
  }
> = ({ heading = "The Artisan's Promise", items }) => {
  if (!items?.length) return null

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-sm font-semibold tracking-tight text-neutral-700 md:text-base">
            {heading}
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 bg-[#E66D54]" aria-hidden />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon || 'utensils']

            return (
              <article
                className="flex min-h-[250px] flex-col items-center justify-center bg-[#e9e8e6] px-8 py-10 text-center"
                key={index}
              >
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl border border-[#E66D54]/25 text-[#E66D54]">
                  <Icon aria-hidden className="h-6 w-6" strokeWidth={2.4} />
                </div>

                {item.title ? (
                  <h3 className="text-base font-semibold text-neutral-700">{item.title}</h3>
                ) : null}

                {item.description ? (
                  <p className="mt-5 max-w-[260px] text-sm font-semibold leading-6 text-neutral-500">
                    {item.description}
                  </p>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}