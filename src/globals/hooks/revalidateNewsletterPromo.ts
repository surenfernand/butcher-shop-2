import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateNewsletterPromo: GlobalAfterChangeHook = () => {
  revalidateTag('global_newsletter-promo')
  revalidatePath('/')
  revalidatePath('/home')
}
