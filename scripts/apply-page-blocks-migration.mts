/**
 * Applies the page custom blocks migration without the Payload CLI dependency check.
 * Usage: npx tsx scripts/apply-page-blocks-migration.mts
 */
import 'dotenv/config'
import type { MigrateUpArgs } from '@payloadcms/db-postgres'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import { up } from '../src/migrations/20260516_173000_add_page_custom_blocks.ts'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('DATABASE_URL is not set')
  process.exit(1)
}

const pool = new pg.Pool({ connectionString })
const db = drizzle(pool) as MigrateUpArgs['db']

try {
  console.log('Applying page custom blocks migration...')
  await up({ db, payload: null, req: null } as MigrateUpArgs)
  console.log('Migration applied successfully.')
} catch (error) {
  console.error('Migration failed:', error)
  process.exit(1)
} finally {
  await pool.end()
}
