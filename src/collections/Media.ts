import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { adminOnly } from '@/access/adminOnly'
import { deployHostUsesEphemeralDisk, isS3StorageConfigured } from '@/utilities/isS3StorageConfigured'
import { placeholderImageUrl } from '@/utilities/placeholderImage'

function mediaUnsplashFallbacksDisabled(): boolean {
  return process.env.MEDIA_DISABLE_UNSPLASH_FALLBACK === 'true'
}

function placeholderSeed(doc: object): string {
  const d = doc as Record<string, unknown>
  const alt = typeof d.alt === 'string' ? d.alt : ''
  const fn = typeof d.filename === 'string' ? d.filename : ''
  const id = d.id !== undefined && d.id !== null ? String(d.id) : ''
  return fn || alt || id || 'media'
}

export const Media: CollectionConfig = {
  admin: {
    group: 'Content',
  },
  slug: 'media',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: () => true,
    update: adminOnly,
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (!doc || typeof doc !== 'object') return doc
        if (mediaUnsplashFallbacksDisabled()) return doc

        const mime =
          'mimeType' in doc && typeof doc.mimeType === 'string' ? doc.mimeType : ''
        if (mime.startsWith('video/')) return doc

        const rawUrl = 'url' in doc && typeof doc.url === 'string' ? doc.url.trim() : ''
        const noS3 = !isS3StorageConfigured()
        const seed = placeholderSeed(doc)

        const applyUnsplash = () => {
          ;(doc as { url?: string }).url = placeholderImageUrl(seed, 'meat')
        }

        // Missing URL while not on S3 — e.g. draft / partial CMS rows
        if (!rawUrl && noS3) {
          applyUnsplash()
          return doc
        }

        // On Render/Vercel/Railway prod without S3, `/api/media/...` usually 404s
        // (ephemeral disk). Swap to stable online images so the storefront works.
        if (
          rawUrl &&
          rawUrl.startsWith('/') &&
          noS3 &&
          deployHostUsesEphemeralDisk() &&
          process.env.MEDIA_KEEP_LOCAL_URLS !== 'true'
        ) {
          applyUnsplash()
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'video/mp4', 'video/webm'],
  },
}
