import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { adminOnly } from '@/utilities/access'
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
        const seed = placeholderSeed(doc)

        const applyUnsplash = () => {
          ;(doc as { url?: string }).url = placeholderImageUrl(seed, 'meat')
        }

        const isLocalMediaApi =
          rawUrl.startsWith('/api/media/file/') || rawUrl.startsWith('/api/media/')

        // Missing URL — partial CMS rows
        if (!rawUrl && !isS3StorageConfigured()) {
          applyUnsplash()
          return doc
        }

        // On Render/Vercel: local disk paths 404 (files never deployed or not in S3 yet).
        if (
          isLocalMediaApi &&
          deployHostUsesEphemeralDisk() &&
          process.env.MEDIA_KEEP_LOCAL_URLS !== 'true'
        ) {
          applyUnsplash()
          return doc
        }

        // S3 enabled locally but DB still has `/api/media/file/...` (not migrated to bucket).
        if (
          isLocalMediaApi &&
          isS3StorageConfigured() &&
          (process.env.MEDIA_USE_PLACEHOLDER_ON_LOCAL_URLS === 'true' ||
            process.env.NODE_ENV === 'development') &&
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
