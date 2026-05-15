/**
 * Online stock images when CMS media has no `url` (Unsplash + Pexels).
 * Hostnames must stay in sync with `images.remotePatterns` in `next.config.ts`.
 *
 * `PlaceholderKind` picks a thematic pool (meat, hero, portraits, shop, etc.).
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

const u = (host: 'unsplash' | 'pexels', id: string, w: number) =>
  host === 'unsplash'
    ? `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`
    : `https://images.pexels.com/photos/${id}?auto=compress&cs=tinysrgb&w=${w}`

/** Raw cuts, steaks, grill, charcuterie — products, cart, catalog. */
const MEAT: readonly string[] = [
  u('unsplash', '1600891964092-4316c288032e', 1600),
  u('unsplash', '1544025162-d76694265947', 1600),
  u('unsplash', '1603048297172-c92544798d5a', 1600),
  u('unsplash', '1529692236671-f1f6cf9683ba', 1600),
  u('unsplash', '1603360946369-dc9bb6258143', 1600),
  u('unsplash', '1558030006-450675393462', 1600),
  u('unsplash', '1615937652655-f07d2c9b6224', 1600),
  u('unsplash', '1588168333986-5078d3ae3976', 1600),
  u('pexels', '618775/pexels-photo-618775.jpeg', 1600),
  u('pexels', '769289/pexels-photo-769289.jpeg', 1600),
  u('pexels', '2313686/pexels-photo-2313686.jpeg', 1600),
  u('pexels', '3296273/pexels-photo-3296273.jpeg', 1600),
]

/** Full-bleed hero backgrounds. */
const HERO: readonly string[] = [
  u('unsplash', '1600891964092-4316c288032e', 2400),
  u('unsplash', '1544025162-d76694265947', 2400),
  u('unsplash', '1603048297172-c92544798d5a', 2400),
  u('unsplash', '1558030006-450675393462', 2400),
  u('pexels', '3296273/pexels-photo-3296273.jpeg', 1920),
  u('pexels', '2313686/pexels-photo-2313686.jpeg', 1920),
]

/** Testimonial / quote avatars. */
const PORTRAIT: readonly string[] = [
  u('unsplash', '1560250097-0b93528c311a', 400),
  u('unsplash', '1573496359142-b8d87734a5a2', 400),
  u('unsplash', '1507003211169-0a1dd7228f2d', 400),
  u('unsplash', '1472099645785-5658abf4ff4e', 400),
  u('unsplash', '1519085360753-af0119f7cbe7', 400),
  u('pexels', '2379004/pexels-photo-2379004.jpeg', 400),
  u('pexels', '2182970/pexels-photo-2182970.jpeg', 400),
]

/** Visit / location / storefront mood. */
const SHOP: readonly string[] = [
  u('unsplash', '1588168333986-5078d3ae3976', 1600),
  u('unsplash', '1533090161767-e6ffed986c88', 1600),
  u('unsplash', '1555396273-367ea4eb4db5', 1600),
  u('unsplash', '1441986300917-64674bd600d8', 1600),
  u('pexels', '264507/pexels-photo-264507.jpeg', 1600),
  u('pexels', '2253643/pexels-photo-2253643.jpeg', 1600),
]

/** Static “map” / city / wayfinding when no map image is set. */
const MAP: readonly string[] = [
  u('unsplash', '1524661135-423995f22d0b', 1200),
  u('unsplash', '1446776653964-20c1d3a81b06', 1200),
  u('unsplash', '1519501025264-65ba15a82390', 1200),
  u('unsplash', '1477959859917-0b56c4944d7e', 1200),
  u('pexels', '2977581/pexels-photo-2977581.jpeg', 1200),
]

/** About / editorial imagery. */
const STORY: readonly string[] = [
  u('unsplash', '1529692236671-f1f6cf9683ba', 1400),
  u('unsplash', '1504674900240-0877df9cc836', 1400),
  u('unsplash', '1432139555190-58524dae6a55', 1400),
  u('unsplash', '1544025162-d76694265947', 1400),
  u('unsplash', '1603048297172-c92544798d5a', 1400),
  u('pexels', '769289/pexels-photo-769289.jpeg', 1400),
]

/** Team / craft / hands at work. */
const TEAM: readonly string[] = [
  u('unsplash', '1529692236671-f1f6cf9683ba', 1200),
  u('unsplash', '1600891964092-4316c288032e', 1200),
  u('unsplash', '1588168333986-5078d3ae3976', 1200),
  u('unsplash', '1551218808-9ea430973036', 1200),
  u('unsplash', '1577219491135-ce391730fb2b', 1200),
  u('pexels', '3296273/pexels-photo-3296273.jpeg', 1200),
]

/** Decorative bands behind testimonials. */
const DECOR: readonly string[] = [
  u('unsplash', '1618005182384-a83a8bd57fbe', 1600),
  u('unsplash', '1557682250-573673c46e3c', 1600),
  u('unsplash', '1557683310-973673baf926', 1600),
  u('unsplash', '1618221195710-dd6b41faaea6', 1600),
  u('pexels', '7130468/pexels-photo-7130468.jpeg', 1600),
]

/** Info / split-section imagery. */
const INFO: readonly string[] = [
  u('unsplash', '1603048297172-c92544798d5a', 1400),
  u('unsplash', '1544025162-d76694265947', 1400),
  u('unsplash', '1588168333986-5078d3ae3976', 1400),
  u('unsplash', '1615937652655-f07d2c9b6224', 1400),
  u('pexels', '618775/pexels-photo-618775.jpeg', 1400),
]

/** Still shown when a video URL is missing. */
const VIDEO_POSTER: readonly string[] = [
  u('unsplash', '1600891964092-4316c288032e', 1600),
  u('unsplash', '1544025162-d76694265947', 1600),
  u('unsplash', '1603048297172-c92544798d5a', 1600),
  u('pexels', '2313686/pexels-photo-2313686.jpeg', 1600),
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
 * Deterministic image URL for a seed within a thematic pool.
 * Defaults to `meat` (shop catalog context).
 */
export function placeholderImageUrl(seed = 'default', kind: PlaceholderKind = 'meat'): string {
  return pickFromPool(seed, POOLS[kind])
}
