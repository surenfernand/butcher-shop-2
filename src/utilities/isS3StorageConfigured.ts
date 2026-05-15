/** Matches `src/plugins/index.ts` — when false, uploads are local-only or unset. */
export function isS3StorageConfigured(): boolean {
  return (
    Boolean(process.env.S3_BUCKET?.trim()) &&
    Boolean(process.env.S3_REGION?.trim()) &&
    Boolean(process.env.S3_ACCESS_KEY_ID?.trim()) &&
    Boolean(process.env.S3_SECRET_ACCESS_KEY?.trim())
  )
}

/**
 * Render / Vercel / Railway production typically have no durable disk for
 * `/api/media/...` — URLs in the DB often 404 after deploy unless S3 is used.
 */
export function deployHostUsesEphemeralDisk(): boolean {
  return (
    process.env.RENDER === 'true' ||
    process.env.VERCEL === '1' ||
    process.env.RAILWAY_ENVIRONMENT === 'production'
  )
}
