/**
 * Unsplash fallbacks when CMS media has no `url`.
 * Hostnames must stay in sync with `images.remotePatterns` in `next.config.ts`.
 *
 * `PlaceholderKind` picks a **thematic** pool so each page area gets a fitting image
 * (meat for products, portraits for testimonials, shop for visit, etc.).
 */

export type PlaceholderKind =
  | 'meat'
  | 'hero'
  | 'portrait'
  | 'shop'
  | 'map'
  | 'story'
  | 'team'
  | 'decor'
  | 'info'
  | 'videoPoster'

/** Raw cuts, steaks, grill — product grids, cart, catalog. */
const MEAT: readonly string[] = [
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=1600&q=85',
]

/** Full-bleed hero backgrounds. */
const HERO: readonly string[] = [
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=2000&q=85',
]

/** Testimonial / quote avatars. */
const PORTRAIT: readonly string[] = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=85',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=85',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85',
]

/** Visit / location / storefront mood. */
const SHOP: readonly string[] = [
  'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1600&q=85',
]

/** Static “map” panel when no map image is set. */
const MAP: readonly string[] = [
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=1200&q=85',
]

/** About / editorial imagery. */
const STORY: readonly string[] = [
  'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1504674900240-0877df9cc836?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1400&q=85',
]

/** Team / craft / hands at work. */
const TEAM: readonly string[] = [
  'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=1200&q=85',
]

/** Decorative bands behind testimonials (non-literal). */
const DECOR: readonly string[] = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1557682250-573673c46e3c?auto=format&fit=crop&w=1600&q=85',
]

/** Info / split-section imagery (craft + product). */
const INFO: readonly string[] = [
  'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=1400&q=85',
]

/** Still shown when a video URL is missing. */
const VIDEO_POSTER: readonly string[] = [
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
]

const POOLS: Record<PlaceholderKind, readonly string[]> = {
  meat: MEAT,
  hero: HERO,
  portrait: PORTRAIT,
  shop: SHOP,
  map: MAP,
  story: STORY,
  team: TEAM,
  decor: DECOR,
  info: INFO,
  videoPoster: VIDEO_POSTER,
}

function pickFromPool(seed: string, pool: readonly string[]): string {
  let h = 0
  const s = String(seed)
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  const idx = Math.abs(h) % pool.length
  return pool[idx]
}

/**
 * Deterministic image for a seed within a thematic pool.
 * Defaults to `meat` (shop catalog context).
 */
export function placeholderImageUrl(seed = 'default', kind: PlaceholderKind = 'meat'): string {
  return pickFromPool(seed, POOLS[kind])
}
