import type { Order } from '@/payload-types'

import { Media } from '@/components/Media'
import { getOrderLineProductImage } from '@/utilities/getOrderLineProductImage'
import { placeholderImageUrl } from '@/utilities/placeholderImage'
import { getPurchaseUnitPriceInCents, PurchaseType } from '@/utilities/purchasePricing'
import { batchResolveOrderLinesForPricing } from '@/utilities/resolveOrderLinePricingDocs'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{
    email?: string
    accessToken?: string
    purchaseType?: string
    shippingCharge?: string
    estimatedTax?: string
  }>
}

const formatMoney = (amount?: number | null) =>
  typeof amount === 'number'
    ? new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100)
    : ''

const formatDate = (date?: string | null) =>
  date
    ? new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date))
    : ''

export default async function ThankYouPage({ params, searchParams }: PageProps) {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })

  const { user } = await payload.auth({ headers })

  const { id } = await params


  const {
    email = '',
    accessToken = '',
    purchaseType: purchaseTypeFromUrl = '',
    shippingCharge: shippingChargeFromUrl = '',
    estimatedTax: estimatedTaxFromUrl = '',
  } = await searchParams

  const {
    docs: [order],
  } = await payload.find({
    collection: 'orders',
    user,
    overrideAccess: !Boolean(user),
    depth: 1,
    where: {
      and: [
        {
          id: {
            equals: id,
          },
        },
        ...(user
          ? [
            {
              customer: {
                equals: user.id,
              },
            },
          ]
          : [
            {
              accessToken: {
                equals: accessToken,
              },
            },
            ...(email
              ? [
                {
                  customerEmail: {
                    equals: email,
                  },
                },
              ]
              : []),
          ]),
      ],
    },
  })

  if (!order) {
    notFound()
  }

  const typedOrder = order as Order

  const linePricingDocs = await batchResolveOrderLinesForPricing(payload, typedOrder.items)

  const orderUrl = `/orders/${id}?${new URLSearchParams({
    ...(email ? { email } : {}),
    ...(accessToken ? { accessToken } : {}),
  }).toString()}`



  const purchaseTypeForPricing: PurchaseType =
    purchaseTypeFromUrl === 'weekly' ||
      purchaseTypeFromUrl === 'monthly' ||
      purchaseTypeFromUrl === 'one_time'
      ? purchaseTypeFromUrl
      : (typedOrder.purchaseType ?? 'one_time')


  const shippingChargeFromUrlNumber =
    shippingChargeFromUrl !== '' ? Number(shippingChargeFromUrl) : null

  const shippingTotal = Number.isFinite(shippingChargeFromUrlNumber)
    ? shippingChargeFromUrlNumber
    : typedOrder.fulfillment?.serviceType === 'delivery'
      ? Number(typedOrder.fulfillment?.shippingCharge || 0)
      : 0

  const fulfillmentWithTax = (typedOrder.fulfillment as
    | (typeof typedOrder.fulfillment & { estimatedTax?: number | null })
    | null
    | undefined)



  const itemsSubtotal =
    linePricingDocs.reduce((total, row) => {
      const { item, product, variant } = row

      if (!product) return total

      const unitPrice = getPurchaseUnitPriceInCents(product, variant, purchaseTypeForPricing)
      const quantity = item.quantity || 0

      return total + unitPrice * quantity
    }, 0) || 0


  const estimatedTaxFromUrlNumber =
    estimatedTaxFromUrl !== '' ? Number(estimatedTaxFromUrl) : null

  const estimatedTax =
    estimatedTaxFromUrlNumber !== null && Number.isFinite(estimatedTaxFromUrlNumber)
      ? estimatedTaxFromUrlNumber
      : Number(fulfillmentWithTax?.estimatedTax || 0)

  const safeShippingTotal = shippingTotal ?? 0
  const safeEstimatedTax = estimatedTax ?? 0

  const calculatedTotal = itemsSubtotal + safeShippingTotal + safeEstimatedTax

 
  const address = typedOrder.shippingAddress

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[#1b1b1b]">
      <section className="relative flex items-center justify-center overflow-hidden px-6 pb-8 pt-16 text-center md:pt-20">
        <div className="w-full max-w-3xl">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)] text-2xl font-black text-white">
            ✓
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-[var(--color-text)] md:text-6xl">
            Order Confirmed
          </h1>

          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
            Order #{typedOrder.id}
          </p>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[#5b5b5b]">
            Thank you for choosing Filet Gourmet. Your selection is now being prepared by our
            team with the same precision and care your table deserves.
          </p>
        </div>
      </section>

      <section className="relative z-20 mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="border border-[#e8e8e8] bg-white p-8">
            <div className="mb-8 flex items-end justify-between border-b border-[#ececec] pb-4">
              <h2 className="text-3xl font-semibold tracking-tight text-[#1b1b1b]">
                Artisanal Preparation
              </h2>

              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted-text)]">
                Placed {formatDate(typedOrder.createdAt)}
              </p>
            </div>

            <div className="space-y-6">
              {linePricingDocs.map(({ item, product, variant }, index) => {
                if (!product) return null

                const image = getOrderLineProductImage(product, variant)
                const unitPrice = getPurchaseUnitPriceInCents(
                  product,
                  variant,
                  purchaseTypeForPricing,
                )
                const quantity = item.quantity || 1
                const lineTotal = unitPrice * quantity

                return (
                  <div key={item.id || index} className="flex items-center gap-5 border-b border-[#f0f0f0] pb-5 last:border-b-0 last:pb-0">
                    <div className="relative h-24 w-24 overflow-hidden border border-[#e2e2e2] bg-[#f8f8f8]">
                      {image?.url?.trim() ? (
                        <Media fill imgClassName="object-cover" resource={image} />
                      ) : (
                        <Image
                          src={
                            placeholderImageUrl(
                              product.slug || String(product.id || `thankyou-line-${index}`),
                              'meat',
                            )
                          }
                          alt={product.title || ''}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[var(--color-text)]">{product.title}</h3>

                      {purchaseTypeForPricing && purchaseTypeForPricing !== 'one_time' ? (
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--color-primary)]">
                          {purchaseTypeForPricing === 'monthly'
                            ? 'Monthly subscription'
                            : 'Weekly subscription'}
                        </p>
                      ) : null}

                      {variant?.title ? (
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--color-muted-text)]">
                          {variant.title}
                        </p>
                      ) : null}
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-[var(--color-text)]">{formatMoney(lineTotal)}</p>
                      <p className="mt-1 text-xs uppercase text-[var(--color-muted-text)]">Qty: {quantity}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 space-y-3 border-t border-[#ececec] pt-6">
              <div className="flex justify-between text-sm text-[var(--color-muted-text)]">
                <span>Subtotal</span>
                <span>{formatMoney(itemsSubtotal)}</span>
              </div>

              <div className="flex justify-between text-sm text-[var(--color-muted-text)]">
                <span>Shipping</span>
                <span>{formatMoney(shippingTotal)}</span>
              </div>

              <div className="flex justify-between text-sm text-[var(--color-muted-text)]">
                <span>Tax</span>
                <span>{formatMoney(estimatedTax)}</span>
              </div>

              <div className="flex justify-between border-t border-[#ececec] pt-4 text-2xl font-semibold">
                <span className="text-[var(--color-text)]">Total</span>
                <span className="text-[var(--color-primary)]">{formatMoney(calculatedTotal)}</span>
              </div>
            </div>
          </div>

          
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div className="border border-[#e8e8e8] bg-[#f7f7f7] p-7">
            <h2 className="text-[38px] font-semibold tracking-tight text-[var(--color-text)]">Order Summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-[var(--color-muted-text)]">
                <span>Subtotal</span>
                <span className="font-semibold text-[var(--color-text)]">{formatMoney(itemsSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[var(--color-muted-text)]">
                <span>Shipping</span>
                <span className="font-semibold text-[var(--color-text)]">{(shippingTotal ?? 0) > 0 ? formatMoney(shippingTotal ?? 0) : '0.00'}</span>
              </div>
              <div className="flex justify-between text-[var(--color-muted-text)]">
                <span>Tax</span>
                <span className="font-semibold text-[var(--color-text)]">{formatMoney(estimatedTax)}</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-[#e5e5e5] pt-3 text-[26px] font-semibold">
                <span className="text-[var(--color-text)]">Total</span>
                <span className="text-[var(--color-primary)]">{formatMoney(calculatedTotal)}</span>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <Link
                href={orderUrl}
                className="block w-full bg-[var(--color-primary)] py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-white hover:bg-[#842518]"
              >
                View Order Status
              </Link>
              <Link
                href="/shop"
                className="block w-full border border-[#cfcfcf] bg-white py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-[var(--color-text)] hover:bg-[#fafafa]"
              >
                Return to Shop
              </Link>
            </div>
          </div>

       


        </aside>
      </section>
    </main>
  )
}