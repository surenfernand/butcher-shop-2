import { getServerSideURL } from '@/utilities/getURL'

/**
 * Prefixes same-site CMS paths (`/api/media/...`) with the public server URL
 * so `<Image src>` and `<video src>` resolve during SSR and in non-browser contexts.
 */
export function absolutizeMediaSrc(url: string | null | undefined): string {
  const u = typeof url === 'string' ? url.trim() : ''
  if (!u) return ''
  if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('//')) return u
  const base = getServerSideURL().replace(/\/$/, '')
  const path = u.startsWith('/') ? u : `/${u}`
  return `${base}${path}`
}
