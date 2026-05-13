/**
 * `getPayload` caches instances on `global._payload` (a Map). If another runtime or library
 * sets `global._payload` to a truthy non-Map value, `getPayload` skips re-initialization and
 * throws `W.get is not a function` during Next.js static generation (parallel workers).
 * Reset to a fresh Map when the store is missing or not a Map. Idempotent.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const target = path.join(root, 'node_modules', 'payload', 'dist', 'index.js')

const needle = `let _cached = global._payload;
if (!_cached) {
    _cached = global._payload = new Map();
}`

const replacement = `let _cached = global._payload;
if (!_cached || typeof _cached.get !== 'function') {
    _cached = global._payload = new Map();
}`

if (!fs.existsSync(target)) {
  console.warn('[patch-payload-global-cache-map] skip: file not found', target)
  process.exit(0)
}

let src = fs.readFileSync(target, 'utf8')
if (src.includes('typeof _cached.get !== \'function\'')) {
  process.exit(0)
}
if (!src.includes(needle)) {
  console.warn('[patch-payload-global-cache-map] skip: expected snippet missing (payload version changed?)')
  process.exit(0)
}

src = src.replace(needle, replacement)
fs.writeFileSync(target, src, 'utf8')
console.log('[patch-payload-global-cache-map] patched', path.relative(root, target))
