import { getServerSideURL } from '@/utilities/getURL'

/**
 * Prefixes same-site CMS paths (`/api/media/...`) with the public server URL.
 * Use from **server-only** code (e.g. Open Graph metadata). Do not use from
 * client `next/image` — keep `/api/...` relative so the browser loads from the
 * current origin and Next `localPatterns` apply.
 */
export function absolutizeMediaSrc(url: string | null | undefined): string {
  const u = typeof url === 'string' ? url.trim() : ''
  if (!u) return ''
  if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('//')) return u
  const base = getServerSideURL().replace(/\/$/, '')
  const path = u.startsWith('/') ? u : `/${u}`
  return `${base}${path}`
}
