/**
 * Unsplash fallbacks when CMS media has no `url`.
 * Hostnames must stay in sync with `images.remotePatterns` in `next.config.ts`.
 */
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1504674900240-0877df9cc836?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1600&q=85',
] as const

/** Deterministic pick so the same seed keeps a stable image. */
export function placeholderImageUrl(seed = 'default'): string {
  let h = 0
  const s = String(seed)
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  const idx = Math.abs(h) % PLACEHOLDER_IMAGES.length
  return PLACEHOLDER_IMAGES[idx]
}
