import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { adminOnly } from '@/access/adminOnly'
import { isS3StorageConfigured } from '@/utilities/isS3StorageConfigured'
import { placeholderImageUrl } from '@/utilities/placeholderImage'

function tempUnsplashMediaFallbackEnabled(): boolean {
  if (process.env.MEDIA_DISABLE_UNSPLASH_FALLBACK === 'true') return false
  return !isS3StorageConfigured()
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
        if (!tempUnsplashMediaFallbackEnabled()) return doc

        const mime =
          'mimeType' in doc && typeof doc.mimeType === 'string' ? doc.mimeType : ''
        if (mime.startsWith('video/')) return doc

        const rawUrl = 'url' in doc && typeof doc.url === 'string' ? doc.url.trim() : ''
        if (rawUrl) return doc

        const alt = 'alt' in doc && typeof doc.alt === 'string' ? doc.alt : ''
        const fn = 'filename' in doc && typeof doc.filename === 'string' ? doc.filename : ''
        const id = 'id' in doc ? String(doc.id ?? '') : ''
        const seed = fn || alt || id || 'media'

        ;(doc as { url?: string }).url = placeholderImageUrl(seed, 'meat')
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
