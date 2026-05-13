import { toNextJsHandler } from 'better-auth/next-js'
import configPromise from '@payload-config'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

type BetterAuthInstance = {
  handler: (request: Request) => Promise<Response>
}

let handlers: ReturnType<typeof toNextJsHandler> | undefined

async function getBetterAuthHandlers() {
  if (handlers) return handlers

  const payload = await getPayload({ config: configPromise })
  const betterAuth = (payload as { betterAuth?: BetterAuthInstance }).betterAuth

  if (!betterAuth?.handler) {
    throw new Error(
      'Better Auth is not on the Payload instance. Ensure payloadBetterAuth is installed and onInit has run.',
    )
  }

  handlers = toNextJsHandler(betterAuth)
  return handlers
}

export async function GET(request: NextRequest) {
  const { GET: handleGET } = await getBetterAuthHandlers()
  return handleGET(request)
}

export async function POST(request: NextRequest) {
  const { POST: handlePOST } = await getBetterAuthHandlers()
  return handlePOST(request)
}
