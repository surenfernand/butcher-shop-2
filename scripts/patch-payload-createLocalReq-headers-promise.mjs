/**
 * Next.js 16+ returns `headers()` as a Promise. Payload's `createLocalReq` only replaced
 * missing `req.headers` with `new Headers()`, so a Promise was treated as truthy and
 * JWT / cookie parsing later called `.get` on a Promise → "W.get is not a function"
 * during `next build` (e.g. collecting page data for `/[slug]`). Idempotent.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const target = path.join(root, 'node_modules', 'payload', 'dist', 'utilities', 'createLocalReq.js')

const needle = `    if (!req.headers) {
        req.headers = new Headers();
    }`

const replacement = `    let incomingHeaders = req.headers;
    if (incomingHeaders && typeof incomingHeaders.then === 'function') {
        incomingHeaders = await incomingHeaders;
    }
    if (!incomingHeaders || typeof incomingHeaders.get !== 'function') {
        req.headers = new Headers();
    } else {
        req.headers = incomingHeaders;
    }`

if (!fs.existsSync(target)) {
  console.warn('[patch-payload-createLocalReq-headers-promise] skip: file not found', target)
  process.exit(0)
}

let src = fs.readFileSync(target, 'utf8')
if (src.includes('incomingHeaders') && src.includes('typeof incomingHeaders.then')) {
  process.exit(0)
}
if (!src.includes(needle)) {
  console.warn(
    '[patch-payload-createLocalReq-headers-promise] skip: expected snippet missing (payload version changed?)',
  )
  process.exit(0)
}

src = src.replace(needle, replacement)
fs.writeFileSync(target, src, 'utf8')
console.log('[patch-payload-createLocalReq-headers-promise] patched', path.relative(root, target))
