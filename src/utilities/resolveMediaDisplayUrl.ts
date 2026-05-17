import { deployHostUsesEphemeralDisk } from '@/utilities/isS3StorageConfigured'
import { placeholderImageUrl, type PlaceholderKind } from '@/utilities/placeholderImage'

/**
 * Storefront-safe media URL. On Render/Vercel, local `/api/media/file/...` paths
 * usually 404 — swap to stable placeholders unless files are on S3 with public URLs.
 */
export function resolveMediaDisplayUrl(
  url: string | null | undefined,
  seed = 'media',
  kind: PlaceholderKind = 'meat',
): string {
  const trimmed = typeof url === 'string' ? url.trim() : ''
  if (!trimmed) return placeholderImageUrl(seed, kind)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed

  const isLocalMediaApi =
    trimmed.startsWith('/api/media/file/') || trimmed.startsWith('/api/media/')

  if (
    isLocalMediaApi &&
    deployHostUsesEphemeralDisk() &&
    process.env.MEDIA_KEEP_LOCAL_URLS !== 'true'
  ) {
    return placeholderImageUrl(seed, kind)
  }

  return trimmed
}
