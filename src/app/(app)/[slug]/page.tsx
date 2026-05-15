import type { Metadata } from 'next'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { aboutStaticData } from '@/endpoints/seed/about-static'
import { contactStaticData } from '@/endpoints/seed/contact-static'
import { homeStaticData } from '@/endpoints/seed/home-static'
import React from 'react'

import { FiletGourmetHome } from '@/components/home/FiletGourmetHome'
import type { Page } from '@/payload-types'
import { notFound } from 'next/navigation'

/** Opt this segment out of static prerendering so `next build` does not run full page queries against Postgres. */
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  // Docker / CI builds often omit .env; without a DB, prebuilding slug paths must be skipped.
  if (!process.env.DATABASE_URL?.trim()) {
    return []
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const pages = await payload.find({
      collection: 'pages',
      limit: 1000,
      depth: 0,
      pagination: false,
      // Only slugs are needed; selecting layout would join every block table and breaks builds
      // when DATABASE_URL points at a DB that has not been migrated to the current schema.
      select: {
        slug: true,
      },
      where: {
        _status: {
          equals: 'published',
        },
      },
    })

    return pages.docs
      .filter((doc) => doc.slug && doc.slug !== 'home')
      .map((doc) => ({
        slug: doc.slug,
      }))
  } catch (err) {
    console.warn(
      '[pages/[slug]] generateStaticParams: database unavailable, skipping pre-rendered slug paths.',
      err instanceof Error ? err.message : err,
    )
    return []
  }
}

type SearchParams = { [key: string]: string | string[] | undefined }

type Args = {
  params: Promise<{
    slug?: string
  }>
  searchParams: Promise<SearchParams>
}

function isLayoutEmpty(layout: Page['layout'] | null | undefined): boolean {
  return !layout || !Array.isArray(layout) || layout.length === 0
}

/** CMS page exists but has no blocks — use seed/static layout so the page is not blank. */
function mergeStaticLayoutIfEmpty(page: Page | null, slug: string): Page | null {
  if (!page) return null
  if (!isLayoutEmpty(page.layout)) return page

  if (slug === 'about') {
    const fallback = aboutStaticData() as Page
    return { ...page, layout: fallback.layout }
  }
  if (slug === 'contact') {
    const fallback = contactStaticData() as Page
    return { ...page, layout: fallback.layout }
  }

  return page
}

export default async function Page({ params, searchParams }: Args) {
  const { slug = 'home' } = await params
  const resolvedSearchParams = await searchParams

  const url = '/' + slug

  let page = await queryPageBySlug({
    slug,
  })

  if (!page && slug === 'home') {
    page = homeStaticData() as Page
  }

  if (!page && slug === 'about') {
    page = aboutStaticData() as Page
  }

  if (!page && slug === 'contact') {
    page = contactStaticData() as Page
  }

  if (!page) {
    return notFound()
  }

  page = mergeStaticLayoutIfEmpty(page, slug) ?? page

  const headerGlobal = await getCachedGlobal('header', 1)()
  const { hero, layout } = page

  const showFiletHomeSections =
    slug === 'home' && Array.isArray(layout) && layout.length === 0

  const heroPullsUnderHeader = hero?.type === 'highImpact'

  return (
    <article>
      <div className={heroPullsUnderHeader ? '' : 'pt-20'}>
        <RenderHero {...hero} brandLogo={headerGlobal.logo} pageSlug={slug} />
        <RenderBlocks blocks={layout} searchParams={resolvedSearchParams} slug={slug} />
        {showFiletHomeSections ? <FiletGourmetHome /> : null}
      </div>
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params

  let page = await queryPageBySlug({
    slug,
  })

  if (!page && slug === 'home') {
    page = homeStaticData() as Page
  }

  if (!page && slug === 'about') {
    page = aboutStaticData() as Page
  }

  if (!page && slug === 'contact') {
    page = contactStaticData() as Page
  }

  if (page) {
    page = mergeStaticLayoutIfEmpty(page, slug) ?? page
  }

  return generateMeta({ doc: page })
}

const queryPageBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    depth: 3,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
  })

  return result.docs?.[0] || null
}
