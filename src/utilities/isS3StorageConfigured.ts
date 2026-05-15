/** Matches `src/plugins/index.ts` — when false, uploads are local-only or unset. */
export function isS3StorageConfigured(): boolean {
  return (
    Boolean(process.env.S3_BUCKET?.trim()) &&
    Boolean(process.env.S3_REGION?.trim()) &&
    Boolean(process.env.S3_ACCESS_KEY_ID?.trim()) &&
    Boolean(process.env.S3_SECRET_ACCESS_KEY?.trim())
  )
}
