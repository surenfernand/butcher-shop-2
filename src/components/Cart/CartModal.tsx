'use client'

import { Price } from '@/components/Price'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Product } from '@/payload-types'
import { getPurchaseUnitPriceInCents } from '@/utilities/purchasePricing'
import { placeholderImageUrl } from '@/utilities/placeholderImage'
import { CartTimerModal } from './CartTimerModal'
import { DeleteItemButton } from './DeleteItemButton'
import { EditItemQuantityButton } from './EditItemQuantityButton'
import { OpenCartButton } from './OpenCart'
import { ShoppingCart, Truck } from 'lucide-react'

export function CartModal() {
  const { cart, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const [purchaseTypeVersion, setPurchaseTypeVersion] = useState(0)

  const [settings, setSettings] = useState<any>(null)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const [showTimerModal, setShowTimerModal] = useState(false)

  const hasAcknowledgedWarningRef = useRef(false)
  const isResettingTimerRef = useRef(false)

  type PurchaseType = 'one_time' | 'weekly' | 'monthly'

  const totalQuantity = useMemo(() => {
    if (!cart || !cart.items || !cart.items.length) return 0
    return cart.items.reduce((quantity, item) => (item.quantity || 0) + quantity, 0)
  }, [cart])

  const getPurchaseTypeKey = (productID: string, variantID?: string) => {
    return variantID ? `purchaseType:${productID}:${variantID}` : `purchaseType:${productID}`
  }

  const getPurchaseTypeLabel = (purchaseType: PurchaseType) => {
    if (purchaseType === 'weekly') return 'Weekly subscription'
    if (purchaseType === 'monthly') return 'Monthly subscription'
    return 'One-time purchase'
  }

  const getPurchasePrice = (product: any, variant: any, purchaseType: PurchaseType) => {
    const variantID = variant?.id ? String(variant.id) : undefined
    const key = getPurchaseTypeKey(String(product.id), variantID)

    if (typeof window !== 'undefined') {
      const storedPrice = localStorage.getItem(`${key}:price`)

      if (storedPrice) {
        const parsed = Number(storedPrice)
        if (!Number.isNaN(parsed)) return parsed
      }
    }

    return getPurchaseUnitPriceInCents(product, variant, purchaseType)
  }

  const adjustedSubtotal = useMemo(() => {
    if (!cart?.items?.length) return 0

    return cart.items.reduce((total, item) => {
      const product = item.product
      const variant = item.variant

      if (typeof product !== 'object' || !product) return total

      const isVariant = Boolean(variant) && typeof variant === 'object'
      const variantID = isVariant ? String(variant.id) : undefined

      const purchaseType =
        typeof window !== 'undefined'
          ? ((localStorage.getItem(getPurchaseTypeKey(String(product.id), variantID)) ||
            'one_time') as PurchaseType)
          : 'one_time'

      const price = getPurchasePrice(product, isVariant ? variant : undefined, purchaseType)

      return total + price * (item.quantity || 1)
    }, 0)
  }, [cart?.items, purchaseTypeVersion])

  useEffect(() => {
    if (!isOpen) return
    setPurchaseTypeVersion((version) => version + 1)
  }, [isOpen, cart?.items])

  useEffect(() => {
    fetch('/api/globals/cart-settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data)
      })
      .catch((err) => {
        console.error('Failed to load cart timer settings', err)
        setSettings(null)
      })
  }, [])

  useEffect(() => {
    if (!settings?.enabled || totalQuantity === 0) {
      hasAcknowledgedWarningRef.current = false
      isResettingTimerRef.current = false
      setSecondsLeft(null)
      setShowTimerModal(false)
      return
    }

    const timerSeconds = Number(settings?.timerSeconds ?? 0)

    if (!timerSeconds || timerSeconds <= 0) return

    isResettingTimerRef.current = true
    hasAcknowledgedWarningRef.current = false

    setSecondsLeft(timerSeconds)
    setShowTimerModal(false)

    const interval = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current === null) return timerSeconds
        return Math.max(current - 1, 0)
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [totalQuantity, settings?.enabled, settings?.timerSeconds])

  useEffect(() => {
    if (!settings?.enabled || totalQuantity === 0 || secondsLeft === null) return

    if (secondsLeft === 0) {
      setShowTimerModal(false)
      setSecondsLeft(null)
      hasAcknowledgedWarningRef.current = false
      isResettingTimerRef.current = false

      void clearCart()
      return
    }

    if (isResettingTimerRef.current) {
      isResettingTimerRef.current = false
      return
    }

    const warningSeconds = Number(settings?.warningSeconds ?? 0)

    if (
      warningSeconds > 0 &&
      secondsLeft > 0 &&
      secondsLeft <= warningSeconds &&
      !hasAcknowledgedWarningRef.current
    ) {
      setShowTimerModal(true)
    }
  }, [secondsLeft, settings?.enabled, settings?.warningSeconds, totalQuantity, clearCart])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <OpenCartButton quantity={totalQuantity} />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-[480px] border-l border-zinc-200 bg-white p-0 text-zinc-950"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-zinc-200 px-8 py-8 text-left">
            <SheetTitle className="text-[1.45rem] font-black uppercase tracking-[0.28em] text-zinc-950">
              Your Selection
            </SheetTitle>
          </SheetHeader>

          {!cart || cart?.items?.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
              <ShoppingCart className="h-14 w-14 text-[#ef553f]" />
              <p className="text-xl font-bold uppercase tracking-wide">Your cart is empty</p>
              <p className="text-sm text-zinc-500">Add items to view them here.</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-8 py-7">
                <ul className="space-y-7">
                  {cart?.items?.map((item, i) => {
                    const product = item.product
                    const variant = item.variant

                    if (typeof product !== 'object' || !item || !product || !product.slug) {
                      return <React.Fragment key={i} />
                    }

                    const metaImage =
                      product.meta?.image && typeof product.meta?.image === 'object'
                        ? product.meta.image
                        : undefined

                    const firstGalleryImage =
                      typeof product.productGallery?.[0]?.image === 'object'
                        ? product.productGallery?.[0]?.image
                        : undefined

                    let image = firstGalleryImage || metaImage
                    let price = product.priceInUSD

                    const isVariant = Boolean(variant) && typeof variant === 'object'
                    const variantID = isVariant ? String(variant.id) : undefined

                    const purchaseType =
                      typeof window !== 'undefined'
                        ? ((localStorage.getItem(
                          getPurchaseTypeKey(String(product.id), variantID),
                        ) || 'one_time') as PurchaseType)
                        : 'one_time'

                    if (isVariant) {
                      price = variant?.priceInUSD
                    }

                    price = getPurchasePrice(product, isVariant ? variant : undefined, purchaseType)

                    const variantText = isVariant
                      ? variant?.options
                        ?.map((option: NonNullable<typeof variant.options>[number]) => {
                          if (typeof option === 'object') return option.label
                          return null
                        })
                        .filter(Boolean)
                        .join(' ')
                      : ''

                    return (
                      <li key={i} className="flex gap-5">
                        <Link href={`/products/${product.slug}`} className="block shrink-0">
                          <div className="relative h-[104px] w-[104px] overflow-hidden bg-zinc-100">
                            <Image
                              alt={image?.alt || product?.title || ''}
                              className="h-full w-full object-cover"
                              height={120}
                              src={
                                image?.url?.trim() ||
                                placeholderImageUrl(product.slug || String(product.id || 'cart-line'), 'meat')
                              }
                              width={120}
                            />
                          </div>
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="line-clamp-2 text-[0.95rem] font-bold uppercase leading-tight tracking-[0.02em]">
                                {product?.title}
                              </h3>

                              <p className="mt-1 text-[0.8rem] text-zinc-500">
                                {variantText || getPurchaseTypeLabel(purchaseType)}
                              </p>
                            </div>

                            <DeleteItemButton item={item} />
                          </div>

                          <div className="mt-5 flex items-center justify-between">
                            <div className="flex h-9 items-center border border-zinc-200">
                              <EditItemQuantityButton
                                item={item}
                                type="minus"
                                className="h-9 w-9 text-zinc-500 hover:bg-zinc-100"
                              />

                              <span className="flex h-9 w-10 items-center justify-center text-sm">
                                {item.quantity}
                              </span>

                              <EditItemQuantityButton
                                item={item}
                                type="plus"
                                className="h-9 w-9 text-zinc-500 hover:bg-zinc-100"
                              />
                            </div>

                            {typeof price === 'number' && (
                              <Price
                                amount={price * (item.quantity || 1)}
                                className="text-[1rem] font-medium text-zinc-950"
                              />
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>

               
              </div>

              <div className="border-t border-zinc-200 px-8 py-7">
                <div className="flex items-center justify-between text-sm uppercase tracking-wide">
                  <span className="text-zinc-600">Subtotal</span>
                  <Price amount={adjustedSubtotal} className="font-medium text-zinc-950" />
                </div>

                <Link
                  href="/checkout"
                  className="mt-8 flex h-16 w-full rounded-none border border-[var(--color-primary)] bg-[var(--color-primary)] px-5 py-6 text-center text-[11px] font-extrabold uppercase tracking-[0.28em] text-black transition-all duration-300 ease-out hover:bg-transparent hover:text-[var(--color-primary)] hover:scale-[1.03] active:scale-[0.97] d-flex justify-center"
                >
                  Checkout
                </Link>

              
              </div>
            </>
          )}
        </div>
      </SheetContent>

      <CartTimerModal
        open={showTimerModal}
        secondsLeft={secondsLeft || 0}
        title={settings?.modalTitle || ''}
        message={settings?.modalMessage || ''}
        confirmLabel={settings?.confirmButtonLabel || ''}
        extendLabel={settings?.extendButtonLabel || ''}
        footerText={settings?.footerText}
        onConfirm={() => {
          hasAcknowledgedWarningRef.current = true
          setShowTimerModal(false)
        }}
        onExtend={() => {
          const extendSeconds = Number(settings?.extendSeconds ?? 0)

          if (!extendSeconds || extendSeconds <= 0) {
            setShowTimerModal(false)
            return
          }

          hasAcknowledgedWarningRef.current = false
          setSecondsLeft((current) => (current ?? 0) + extendSeconds)
          setShowTimerModal(false)
        }}
      />
    </Sheet>
  )
}