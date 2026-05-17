import * as migration_20260516_173000_add_page_custom_blocks from './20260516_173000_add_page_custom_blocks'
import * as migration_20260517_140000_add_newsletter_promo_global from './20260517_140000_add_newsletter_promo_global'

export const migrations = [
  {
    up: migration_20260516_173000_add_page_custom_blocks.up,
    down: migration_20260516_173000_add_page_custom_blocks.down,
    name: '20260516_173000_add_page_custom_blocks',
  },
  {
    up: migration_20260517_140000_add_newsletter_promo_global.up,
    down: migration_20260517_140000_add_newsletter_promo_global.down,
    name: '20260517_140000_add_newsletter_promo_global',
  },
]
