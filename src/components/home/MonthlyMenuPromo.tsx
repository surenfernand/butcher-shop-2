import type { NewsletterPromo } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { MonthlyMenuPromoClient } from './MonthlyMenuPromoClient'

type Props = {
  data?: NewsletterPromo | null
}

export async function MonthlyMenuPromo({ data }: Props = {}) {
  const promo = data ?? (await getCachedGlobal('newsletter-promo', 1)())

  if (!promo?.enabled) {
    return null
  }

  return <MonthlyMenuPromoClient promo={promo} />
}
