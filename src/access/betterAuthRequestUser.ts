import type { PayloadRequest } from 'payload'

type BetterAuthApi = {
  api?: {
    getSession: (args: { headers: Headers }) => Promise<{ session?: { userId?: string | number } } | null>
  }
}

/**
 * Resolves the Better Auth user id for this HTTP request (session cookie).
 * Use when `req.user` may come from a **stale Payload JWT** (`payload-token`) while
 * Better Auth is the source of truth for admin sign-up / create-first-admin.
 */
export async function getBetterAuthSessionUserId(req: PayloadRequest): Promise<string | number | null> {
  const betterAuth = (req.payload as unknown as { betterAuth?: BetterAuthApi }).betterAuth
  if (!betterAuth?.api?.getSession) return null

  try {
    const res = await betterAuth.api.getSession({ headers: req.headers as Headers })
    const uid = res?.session?.userId
    if (uid === undefined || uid === null) return null
    return uid
  } catch {
    return null
  }
}
