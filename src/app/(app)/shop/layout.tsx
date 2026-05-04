import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import { ShopFilters } from '@/components/Shop/ShopFilters'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config: configPromise })

  const shopPage = await payload.findGlobal({
    slug: 'shop-page',
  })

  return (
    <Suspense fallback={null}>
      <div className="mt-5 bg-[#f7f5f2] text-[#161616]">
        <div className="container py-16">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop' },
            ]}
          />

          <div className="mb-12 border-b border-[#e4ded6] pb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#d84a32]">
              Artisanal selections
            </p>

            <h1 className="mb-4 text-4xl font-black uppercase tracking-tight text-[#161616] md:text-6xl">
              {shopPage.title || 'Shop'}
            </h1>

            <p className="max-w-3xl text-base leading-7 text-[#68615b]">
              {shopPage.introText || ''}
            </p>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="w-full lg:max-w-[260px]">
              <ShopFilters
                labels={{
                  cutTypeLabel: shopPage.filters?.cutTypeLabel || 'Cut Type',
                  agingProcessLabel: shopPage.filters?.agingProcessLabel || 'Aging Process',
                  originLabel: shopPage.filters?.originLabel || 'Origin',
                  priceRangeLabel: shopPage.filters?.priceRangeLabel || 'Price Range',
                }}
                sortLabel={shopPage.sortLabel || 'Sort by'}
              />
            </div>

            <div className="min-h-screen flex-1">{children}</div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}