import type { Order, Product } from '@/payload-types'
import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

function formatOrderRef(id: number) {
  return `BC-${id}`
}

function formatMoney(amount?: number | null) {
  if (typeof amount !== 'number') return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100)
}

function formatOrderDate(iso?: string | null) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))
}

function getItemsLines(order: Order): { primary: string; secondary: string } {
  const items = order.items || []
  const withProducts = items.filter(
    (line) => line.product && typeof line.product === 'object',
  ) as { product: Product; quantity: number }[]

  if (withProducts.length === 0) {
    const totalQty = items.reduce((n, l) => n + (l.quantity || 0), 0)
    return {
      primary: 'Order items',
      secondary: totalQty > 0 ? `${totalQty} items total` : '—',
    }
  }

  const first = withProducts[0].product
  const primary = first.title || 'Order items'
  const lineCount = items.length
  const totalQty = items.reduce((n, l) => n + (l.quantity || 0), 0)

  if (lineCount === 1) {
    return {
      primary,
      secondary: totalQty <= 1 ? '1 item total' : `${totalQty} items total`,
    }
  }

  const additional = lineCount - 1
  return {
    primary,
    secondary: `+ ${additional} additional ${additional === 1 ? 'item' : 'items'}`,
  }
}

function StatusBadge({ status }: { status: Order['status'] }) {
  const s = status || 'processing'
  const label =
    s === 'completed'
      ? 'Delivered'
      : s === 'processing'
        ? 'Processing'
        : s === 'cancelled'
          ? 'Cancelled'
          : s === 'refunded'
            ? 'Refunded'
            : 'Processing'

  if (s === 'completed') {
    return (
      <span className="inline-block rounded-full bg-[#e6f6ea] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2e7d4d]">
        {label.toUpperCase()}
      </span>
    )
  }

  if (s === 'processing') {
    return (
      <span className="inline-block rounded-full bg-[#e7eefb] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3056a8]">
        {label.toUpperCase()}
      </span>
    )
  }

  return (
    <span className="inline-block rounded-full bg-[#f3f3f3] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#666]">
      {label.toUpperCase()}
    </span>
  )
}

export default async function Orders() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  let orders: Order[] | null = null

  if (!user) {
    redirect(`/login?warning=${encodeURIComponent('Please login to access your orders.')}`)
  }

  try {
    const ordersResult = await payload.find({
      collection: 'orders',
      limit: 100,
      pagination: false,
      depth: 2,
      sort: '-createdAt',
      user,
      overrideAccess: false,
      where: {
        customer: {
          equals: user?.id,
        },
      },
    })

    orders = ordersResult?.docs || []
  } catch {
    orders = []
  }

  return (
    <div className="w-full space-y-10 text-[#1f1f1f]">
      <div className="mt-2">
        
        <h1 className="mt-3 text-6xl font-semibold tracking-tight text-[#171717]">Past Orders</h1>
        <div className="mt-3 h-[3px] w-20 bg-[#d66152]" />
      </div>

      <div className="overflow-hidden border border-[#e8e8e8] bg-white">
        {(!orders || orders.length === 0) && (
          <div className="px-6 py-14 text-center text-[#777]">You have no orders.</div>
        )}

        {orders && orders.length > 0 && (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#ebebeb] bg-[#fafafa]">
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666] lg:px-7">
                    Order ID
                  </th>
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666] lg:px-6">
                    Date
                  </th>
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666] lg:px-6">
                    Total
                  </th>
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666] lg:px-6">
                    Status
                  </th>
                  <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666] lg:px-7">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const href = `/orders/${order.id}`

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-[#efefef] transition-colors hover:bg-[#fcfcfc]"
                    >
                      <td className="px-5 py-5 align-middle text-sm lg:px-7">
                        <Link
                          href={href}
                          className="font-semibold tracking-[0.06em] text-[#202020] underline-offset-4 hover:text-[#992d20]"
                        >
                          #{formatOrderRef(order.id)}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-5 py-5 align-middle text-sm text-[#353535] lg:px-6">
                        {formatOrderDate(order.createdAt)}
                      </td>
                      <td className="px-5 py-5 align-middle lg:px-6">
                        <span className="font-semibold text-[#d66152]">{formatMoney(order.amount)}</span>
                      </td>
                      <td className="px-5 py-5 align-middle lg:px-6">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-5 py-5 align-middle lg:px-7">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={href}
                            className="inline-flex items-center border border-[#dfdfdf] bg-[#f8f8f8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#333] hover:bg-[#f0f0f0]"
                          >
                            Details
                          </Link>
                        
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

 
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Your orders.',
  openGraph: mergeOpenGraph({
    title: 'Orders',
    url: '/orders',
  }),
  title: 'Orders',
}
