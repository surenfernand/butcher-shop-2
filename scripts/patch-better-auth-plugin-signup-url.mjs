/**
 * @payload-auth/better-auth-plugin sign-up uses NEXT_PUBLIC_SERVER_URL for PATCH /api/users/:id.
 * When unset or mismatched with the browser origin (e.g. localhost vs 127.0.0.1), fetch throws TypeError: Failed to fetch.
 * This patch prefers window.location.origin in the browser. Idempotent.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const target = path.join(
  root,
  'node_modules',
  '@payload-auth',
  'better-auth-plugin',
  'dist',
  'payload',
  'components',
  'sign-up.js',
)

const needle =
  'const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${apiRoute}/${userSlug}/${userId}`, {'
const replacement = `const apiBase = typeof window !== 'undefined' && window.location?.origin ? window.location.origin : (process.env.NEXT_PUBLIC_SERVER_URL ?? '');
            const req = await fetch(\`\${apiBase}\${apiRoute}/\${userSlug}/\${userId}\`, {`

if (!fs.existsSync(target)) {
  console.warn('[patch-better-auth-plugin-signup-url] skip: file not found', target)
  process.exit(0)
}

let src = fs.readFileSync(target, 'utf8')
if (src.includes('window.location?.origin ? window.location.origin')) {
  process.exit(0)
}
if (!src.includes(needle)) {
  console.warn('[patch-better-auth-plugin-signup-url] skip: expected snippet missing (plugin version changed?)')
  process.exit(0)
}

src = src.replace(needle, replacement)
fs.writeFileSync(target, src, 'utf8')
console.log('[patch-better-auth-plugin-signup-url] patched', path.relative(root, target))
