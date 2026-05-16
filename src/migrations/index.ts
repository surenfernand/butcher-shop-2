import * as migration_20260516_173000_add_page_custom_blocks from './20260516_173000_add_page_custom_blocks'

export const migrations = [
  {
    up: migration_20260516_173000_add_page_custom_blocks.up,
    down: migration_20260516_173000_add_page_custom_blocks.down,
    name: '20260516_173000_add_page_custom_blocks',
  },
]
