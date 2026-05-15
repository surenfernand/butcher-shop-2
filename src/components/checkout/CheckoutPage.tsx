'use client'

import { Media } from '@/components/Media'
import { Message } from '@/components/Message'
import { Price } from '@/components/Price'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import { placeholderImageUrl } from '@/utilities/placeholderImage'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Suspense, useCallback, useEffect, useState } from 'react'

import { AddressItem } from '@/components/addresses/AddressItem'
import { CreateAddressModal } from '@/components/addresses/CreateAddressModal'
import { CheckoutAddresses } from '@/components/checkout/CheckoutAddresses'
import { CheckoutForm } from '@/components/forms/CheckoutForm'
import { FormItem } from '@/components/forms/FormItem'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Checkbox } from '@/components/ui/checkbox'
import { cssVariables } from '@/cssVariables'
import { Address } from '@/payload-types'
import {
  getPurchaseUnitPriceInCents,
  type PurchaseType,
} from '@/utilities/purchasePricing'
import { useAddresses, useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { toast } from 'sonner'

const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
const stripe = loadStripe(apiKey)

const formatMoney = (amount = 0) => `$${(amount / 100).toFixed(2)}`

const getPurchaseTypeLabel = (purchaseType: PurchaseType) => {
  if (purchaseType === 'weekly') return 'Weekly subscription'
  if (purchaseType === 'monthly') return 'Monthly subscription'
  return 'One-time purchase'
}

const getPurchaseTypeKey = (productID: string, variantID?: string) => {
  return variantID ? `purchaseType:${productID}:${variantID}` : `purchaseType:${productID}`
}

const getPurchasePrice = (
  product: any,
  variant: any,
  purchaseType: PurchaseType,
) => getPurchaseUnitPriceInCents(product, variant, purchaseType)

const sanitizeAddressForPayment = (address?: Partial<Address>) => {
  if (!address) return undefined
  const { id, createdAt, updatedAt, _status, ...safeAddress } = address as Partial<Address> & {
    id?: unknown
    createdAt?: unknown
    updatedAt?: unknown
    _status?: unknown
  }
  return safeAddress
}

export const CheckoutPage: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const { cart } = useCart()
  const [error, setError] = useState<null | string>(null)
  const [email, setEmail] = useState('')
  const [emailEditable, setEmailEditable] = useState(true)
  const [paymentData, setPaymentData] = useState<null | Record<string, unknown>>(null)
  const { initiatePayment } = usePayments()
  const { addresses } = useAddresses()
  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>()
  const [billingAddress, setBillingAddress] = useState<Partial<Address>>()
  const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] = useState(true)
  const [isProcessingPayment, setProcessingPayment] = useState(false)
  const [fulfillmentMethod, setFulfillmentMethod] = useState<'pickup' | 'delivery'>('pickup')
  const [paymentElementComplete, setPaymentElementComplete] = useState(false)
  // src/components/checkout/CheckoutPage.tsx

  const [allowedWeeklyDays, setAllowedWeeklyDays] = useState<string[]>([])

  const cartIsEmpty = !cart || !cart.items || !cart.items.length
  const subtotal =
    cart?.items?.reduce((total, item) => {
      if (typeof item.product !== 'object' || !item.product) return total

      const product = item.product
      const quantity = item.quantity || 0

      const variant =
        item.variant && typeof item.variant === 'object' ? item.variant : undefined

      const variantID = variant ? String(variant.id) : undefined

      const purchaseType =
        typeof window !== 'undefined'
          ? ((localStorage.getItem(
            getPurchaseTypeKey(String(product.id), variantID),
          ) || 'one_time') as PurchaseType)
          : 'one_time'

      const price = getPurchasePrice(product, variant, purchaseType)

      return total + price * quantity
    }, 0) || 0

  const [shippingCharge, setShippingCharge] = useState(0)
  const [taxRate, setTaxRate] = useState(0)

  const shipping = fulfillmentMethod === 'delivery' ? shippingCharge : 0
  const estimatedTax = subtotal * taxRate
  const displayTotal = subtotal + shipping + estimatedTax

  const [showCalendar, setShowCalendar] = useState(false)

  const [postalCode, setPostalCode] = useState('')
  const [selectedBranch, setSelectedBranch] = useState<any>(null)
  const [availableSchedules, setAvailableSchedules] = useState<any[]>([])
  const [timeSlot, setTimeSlot] = useState('')
  const [branchError, setBranchError] = useState('')

  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [branches, setBranches] = useState<any[]>([])

  const [isLoadingBranches, setIsLoadingBranches] = useState(false)

  useEffect(() => {
    if (isDateModalOpen) {
      fetch('/api/multi-location/branches')
        .then((res) => res.json())
        .then((data) => {
          const loadedBranches = data.branches || []

          setBranches(loadedBranches)

          if (loadedBranches.length && !selectedBranch) {
            const firstBranch = loadedBranches[0]

            setSelectedBranch(firstBranch)

            if (fulfillmentMethod === 'pickup') {
              void loadSchedules(firstBranch.id, 'pickup')
            }
          }
        })
    }
  }, [isDateModalOpen, selectedBranch, fulfillmentMethod])

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatDisplayDate = (value: string) =>
    new Date(value + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    })

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)


  const canGoToPayment = Boolean(
    (email || user) && billingAddress && (billingAddressSameAsShipping || shippingAddress),
  )

  const hasPaymentForm = Boolean(paymentData?.['clientSecret'])



  const normalizePostalCode = (value: string) => value.trim().toUpperCase().replace(/\s+/g, '')

  const resetFulfillmentSelection = () => {
    setAvailableSchedules([])
    setTimeSlot('')
    setBranchError('')
    setShowCalendar(false)
    setShippingCharge(0)
    setSelectedDate(undefined)
    setAllowedWeeklyDays([])


  }

  const loadSchedules = async (
    branchId: string,
    type: 'pickup' | 'delivery',
    postalValue = postalCode,
  ) => {
    setBranchError('')
    setAvailableSchedules([])
    setAllowedWeeklyDays([])
    setTimeSlot('')

    if (!branchId) {
      setBranchError('Please select a branch first.')
      return
    }

    const cleanedPostalCode = normalizePostalCode(postalValue)

    if (type === 'delivery' && !cleanedPostalCode) {
      setBranchError('Please enter your postal code.')
      return
    }

    // inside fetchFulfillmentOptions(), before let url = ...

    const productIds =
      cart?.items
        ?.map((item) => (typeof item.product === 'object' ? item.product?.id : item.product))
        .filter(Boolean)
        .map(String) || []

    let url = `/api/multi-location/fulfillment-options?branch=${branchId}&serviceType=${type}`

    if (productIds.length) {
      url += `&products=${encodeURIComponent(productIds.join(','))}`
    }

    if (type === 'delivery') {
      url += `&postalCode=${encodeURIComponent(cleanedPostalCode)}`
    }

    try {
      const res = await fetch(url)
      const data = await res.json()

      console.log("res")
      console.log(res)

      if (!res.ok) {
        setBranchError(data?.error || 'Could not load fulfillment options.')
        return
      }

      const schedules = data.schedules || []

      if (!schedules.length) {
        setBranchError(
          type === 'delivery'
            ? 'Sorry, this branch does not deliver to that postal code.'
            : 'Sorry, pickup is not available for this branch.',
        )
        return
      }

      setPostalCode(cleanedPostalCode)
      setAvailableSchedules(schedules)

      const nextAllowedWeeklyDays = (
        data.allowedWeeklyDays || schedules.flatMap((schedule: any) => schedule.weeklyDays || [])
      ).map((day: any) => String(day).toLowerCase())

      if (!nextAllowedWeeklyDays.length) {
        setBranchError('Sorry, there are no common available dates for all products in your cart.')
        return
      }

      setAllowedWeeklyDays(nextAllowedWeeklyDays)

      const firstSchedule = schedules[0]

      setShippingCharge(
        type === 'delivery'
          ? Number(firstSchedule?.shippingCharge || 0) * 100
          : 0,
      )

    } catch {
      setBranchError('Something went wrong while loading fulfillment options.')
    }
  }



  const dayMap: Record<number, string> = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
  }



  const isDateAllowed = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const selected = new Date(date)
    selected.setHours(0, 0, 0, 0)

    if (selected <= today) return false
    if (!selectedBranch) return false
    if (!allowedWeeklyDays.length) return false

    const dayName = dayMap[date.getDay()]

    return allowedWeeklyDays.includes(dayName)
  }


  useEffect(() => {
    if (!shippingAddress) {
      if (addresses && addresses.length > 0) {
        const defaultAddress = addresses[0]
        if (defaultAddress) {
          setBillingAddress(defaultAddress)
        }
      }
    }
  }, [addresses, shippingAddress])

  useEffect(() => {
    return () => {
      setShippingAddress(undefined)
      setBillingAddress(undefined)
      setBillingAddressSameAsShipping(true)
      setEmail('')
      setEmailEditable(true)
    }
  }, [])

  const initiatePaymentIntent = useCallback(
    async (paymentID: string) => {
      try {


        const fulfillment =
          typeof window !== 'undefined'
            ? JSON.parse(localStorage.getItem('fulfillment') || '{}')
            : {}

        const purchaseTypes =
          typeof window !== 'undefined'
            ? cart?.items?.map((item) => {
              const productID =
                typeof item.product === 'object' ? item.product.id : item.product

              const variantID = item.variant
                ? typeof item.variant === 'object'
                  ? item.variant.id
                  : item.variant
                : undefined

              return {
                product: productID,
                variant: variantID,
                purchaseType:
                  localStorage.getItem(
                    variantID
                      ? `purchaseType:${productID}:${variantID}`
                      : `purchaseType:${productID}`
                  ) || 'one_time',
              }
            })
            : []

        const safeBillingAddress = sanitizeAddressForPayment(billingAddress)
        const safeShippingAddress = sanitizeAddressForPayment(
          billingAddressSameAsShipping ? billingAddress : shippingAddress,
        )

        const paymentData = (await initiatePayment(paymentID, {
          additionalData: {
            ...(email ? { customerEmail: email } : {}),
            billingAddress: safeBillingAddress,
            shippingAddress: safeShippingAddress,
            fulfillment,
            purchaseTypes, // ✅ ADD THIS LINE
          }
        })) as Record<string, unknown>

        if (paymentData) {
          setPaymentData(paymentData)
        }
      } catch (error) {
        const errorData = error instanceof Error ? JSON.parse(error.message) : {}
        let errorMessage = 'An error occurred while initiating payment.'

        if (errorData?.cause?.code === 'OutOfStock') {
          errorMessage = 'One or more items in your cart are out of stock.'
        }

        setError(errorMessage)
        toast.error(errorMessage)
      }
    },
    [
      billingAddress,
      billingAddressSameAsShipping,
      cart?.items,
      email,
      initiatePayment,
      shippingAddress,
    ],
  )

  useEffect(() => {
    if (!canGoToPayment || paymentData) return
    void initiatePaymentIntent('stripe')
  }, [canGoToPayment, paymentData, initiatePaymentIntent])

  if (!stripe) return null

  if (cartIsEmpty && isProcessingPayment) {
    return (
      <div className="min-h-[60vh] bg-background py-20 text-center text-foreground">
        <p className="mb-8 font-sans text-lg tracking-[0.2em] text-[var(--color-primary)]">Processing your payment...</p>
        <LoadingSpinner />
      </div>
    )
  }

  if (cartIsEmpty) {
    return (
      <div className="min-h-[60vh] bg-background px-6 py-20 text-center text-foreground">
        <p className="mb-4 font-sans text-xl uppercase tracking-[0.2em] text-[var(--color-primary)]">Your cart is empty.</p>
        <Link className="underline underline-offset-4" href="/shop">
          Continue shopping?
        </Link>
      </div>
    )
  }

  return (
    <div className="checkout-luxury mt-5 min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">


      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:px-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.85fr)]">
        <section className="space-y-6">
          <h1 className="text-5xl font-black uppercase tracking-tight text-[var(--color-text)]">Secure Checkout</h1>

          <section className="rounded-2xl border border-[var(--color-border-token)] bg-white p-6 text-[var(--color-text)] shadow-sm md:p-8">
            <div className="mb-8 flex items-center justify-between border-b border-[var(--color-border-token)] pb-6">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-semibold text-white">1</span>
                <h2 className="text-[30px] font-black uppercase tracking-tight text-[var(--color-text)]">Contact Information</h2>
              </div>
              <span className="text-[var(--color-primary)]">◌</span>
            </div>

            <div className="space-y-8">
              {!user && (
                <div className="rounded-2xl border border-[var(--color-border-token)] bg-white p-6 text-[var(--color-text)] shadow-sm">
                  <p className="mb-4 font-sans text-xs uppercase tracking-[0.18em] text-[var(--color-muted-text)]">
                    Checkout as guest
                  </p>
                  <FormItem>
                    <Label className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--color-muted-text)]" htmlFor="email">
                      Email Address
                    </Label>
                    <Input
                      className="mt-2 h-12 rounded-none border border-[var(--color-border-token)] bg-[var(--color-surface)] px-4 text-[var(--color-text)] placeholder:text-[var(--color-muted-text)] focus-visible:ring-[var(--color-primary)]"
                      disabled={!emailEditable}
                      id="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      type="email"
                    />
                  </FormItem>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <Button
                      className="rounded-none bg-[var(--color-text)] px-8 font-sans font-black uppercase tracking-[0.18em] text-white hover:bg-[var(--color-primary-hover)]"
                      disabled={!email || !emailEditable}
                      onClick={(e) => {
                        e.preventDefault()
                        setEmailEditable(false)
                      }}
                    >
                      Continue as guest
                    </Button>
                    <Link className="text-sm text-[var(--color-muted-text)] underline underline-offset-4" href="/login">
                      Log in instead
                    </Link>
                  </div>
                </div>
              )}



              <div>
                <p className="mb-3 font-sans text-xs uppercase tracking-[0.18em] text-[var(--color-muted-text)]">
                  Signed in as
                </p>
                {user && (

                  <div className="rounded-2xl border border-[var(--color-border-token)] bg-white p-6 text-[var(--color-text)] shadow-sm">
                    {/* <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">Signed in as</p> */}
                    <p className="mt-2 text-foreground">{user.email}</p>
                    <Link className="mt-2 inline-block text-sm text-[var(--color-primary)] underline underline-offset-4" href="/logout">
                      Not you? Log out
                    </Link>
                  </div>
                )}
              </div>

              <div>
                <p className="mb-3 font-sans text-xs uppercase tracking-[0.18em] text-[var(--color-muted-text)]">
                  Billing Address
                </p>
                {billingAddress ? (
                  <div className="rounded-2xl border border-[var(--color-border-token)] bg-white p-6 text-[var(--color-text)] shadow-sm">
                    <AddressItem
                      actions={
                        <Button
                          className="rounded-none border-[var(--color-border-token)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                          variant="outline"
                          disabled={Boolean(paymentData)}
                          onClick={(e) => {
                            e.preventDefault()
                            setBillingAddress(undefined)
                          }}
                        >
                          Remove
                        </Button>
                      }
                      address={billingAddress}
                    />
                  </div>
                ) : user ? (
                  <CheckoutAddresses heading="Billing address" setAddress={setBillingAddress} />
                ) : (
                  <CreateAddressModal
                    disabled={!email || Boolean(emailEditable)}
                    callback={(address) => {
                      setBillingAddress(address)
                    }}
                    skipSubmission={true}
                  />
                )}
              </div>

              <div className="flex items-center gap-4">
                <Checkbox
                  id="shippingTheSameAsBilling"
                  checked={billingAddressSameAsShipping}
                  disabled={Boolean(paymentData || (!user && (!email || Boolean(emailEditable))))}
                  onCheckedChange={(state) => {
                    setBillingAddressSameAsShipping(state as boolean)
                  }}
                />
                <Label className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--color-muted-text)]" htmlFor="shippingTheSameAsBilling">
                  Shipping is the same as billing
                </Label>
              </div>

              {!billingAddressSameAsShipping && (
                <div>
                  <p className="mb-3 font-sans text-xs uppercase tracking-[0.18em] text-[var(--color-muted-text)]">
                    Shipping Address
                  </p>
                  {shippingAddress ? (
                    <div className="rounded-2xl border border-[var(--color-border-token)] bg-white p-6 text-[var(--color-text)] shadow-sm">
                      <AddressItem
                        actions={
                          <Button
                            className="rounded-none border-[var(--color-border-token)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                            variant="outline"
                            disabled={Boolean(paymentData)}
                            onClick={(e) => {
                              e.preventDefault()
                              setShippingAddress(undefined)
                            }}
                          >
                            Remove
                          </Button>
                        }
                        address={shippingAddress}
                      />
                    </div>
                  ) : user ? (
                    <CheckoutAddresses
                      heading="Shipping address"
                      description="Please select a shipping address."
                      setAddress={setShippingAddress}
                    />
                  ) : (
                    <CreateAddressModal
                      callback={(address) => {
                        setShippingAddress(address)
                      }}
                      disabled={!email || Boolean(emailEditable)}
                      skipSubmission={true}
                    />
                  )}
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--color-border-token)] bg-white p-6 text-[var(--color-text)] shadow-sm md:p-8">
            <div className="mb-8 flex items-center gap-3 border-b border-[var(--color-border-token)] pb-6">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-semibold text-white">2</span>
              <h2 className="text-[30px] font-black uppercase tracking-tight text-[var(--color-text)]">Payment</h2>
            </div>

            <div className="rounded-2xl border border-[var(--color-border-token)] bg-white p-6 text-[var(--color-text)] shadow-sm">
              {!paymentData && canGoToPayment && (
                <p className="font-sans text-sm uppercase tracking-[0.16em] text-[var(--color-muted-text)]">
                  Preparing secure card form...
                </p>
              )}

              {!paymentData?.['clientSecret'] && error && (
                <div className="mt-8">
                  <Message error={error} />
                  <Button
                    className="mt-5 rounded-none bg-[var(--color-text)] font-sans font-black uppercase tracking-[0.18em] text-white hover:bg-[var(--color-primary-hover)]"
                    onClick={(e) => {
                      e.preventDefault()
                      router.refresh()
                    }}
                    variant="default"
                  >
                    Try again
                  </Button>
                </div>
              )}

              <Suspense fallback={<React.Fragment />}>
                {/* @ts-ignore */}
                {paymentData && paymentData?.['clientSecret'] && (
                  <div>
                    <p className="mb-6 font-sans text-sm uppercase tracking-[0.18em] text-[var(--color-muted-text)]">
                      Secure card payment
                    </p>
                    {error && <p className="mb-4 text-red-400">{`Error: ${error}`}</p>}
                    <Elements
                      options={{
                        fonts: [
                          {
                            cssSrc:
                              'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap',
                          },
                        ],
                        appearance: {
                          theme: 'stripe',
                          variables: {
                            borderRadius: '0px',
                            colorPrimary: 'var(--color-primary)',
                            gridColumnSpacing: '20px',
                            gridRowSpacing: '20px',
                            colorBackground: 'var(--color-background)',
                            colorDanger: cssVariables.colors.error500,
                            colorDangerText: cssVariables.colors.error500,
                            colorIcon: 'var(--color-muted-text)',
                            colorText: 'var(--color-text)',
                            colorTextPlaceholder: 'var(--color-muted-text)',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSizeBase: '16px',
                            fontWeightBold: '700',
                            fontWeightNormal: '500',
                            spacingUnit: '4px',
                          },
                        },
                        clientSecret: paymentData['clientSecret'] as string,
                      }}
                      stripe={stripe}
                    >
                      <div className="flex flex-col gap-8">
                        <CheckoutForm
                          customerEmail={email}
                          billingAddress={billingAddress}
                          setProcessingPayment={setProcessingPayment}
                          setPaymentElementComplete={setPaymentElementComplete}
                        />

                      </div>
                    </Elements>
                  </div>
                )}
              </Suspense>
            </div>
          </section>
        </section>

        <aside className="h-fit rounded-2xl border border-[var(--color-border-token)] bg-white p-6 text-[var(--color-text)] shadow-sm lg:sticky lg:top-8">
          <h2 className="text-[34px] font-black uppercase tracking-tight text-[var(--color-text)]">Order Summary</h2>
          <div className="my-6 h-px bg-[var(--color-border-token)]" />

          <div className="space-y-6">
            {cart?.items?.map((item, index) => {
              if (typeof item.product === 'object' && item.product) {
                const {
                  product,
                  product: { meta, title, gallery },
                  quantity,
                  variant,
                } = item

                if (!quantity) return null

                let image = product.productGallery?.[0]?.image || product.meta?.image
                let price = product?.priceInUSD

                const isVariant = Boolean(variant) && typeof variant === 'object'

                const variantID =
                  variant && typeof variant === 'object' ? String(variant.id) : undefined

                const purchaseType =
                  typeof window !== 'undefined'
                    ? ((localStorage.getItem(
                      getPurchaseTypeKey(String(product.id), variantID),
                    ) || 'one_time') as PurchaseType)
                    : 'one_time'

                if (isVariant) {
                  price = variant?.priceInUSD

                  const imageVariant = product.gallery?.find(
                    (galleryItem: NonNullable<typeof product.gallery>[number]) => {
                      if (!galleryItem.variantOption) return false

                      const variantOptionID =
                        typeof galleryItem.variantOption === 'object'
                          ? galleryItem.variantOption.id
                          : galleryItem.variantOption

                      const hasMatch = variant?.options?.some(
                        (option: NonNullable<typeof variant.options>[number]) => {
                          if (typeof option === 'object') return option.id === variantOptionID
                          return option === variantOptionID
                        },
                      )

                      return hasMatch
                    },
                  )

                  if (imageVariant && typeof imageVariant.image !== 'string') {
                    image = imageVariant.image
                  }
                }

                price = getPurchasePrice(
                  product,
                  isVariant ? variant : undefined,
                  purchaseType,
                )

                return (
                  <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4" key={index}>
                    <div className="relative h-20 w-20 border border-[var(--color-border-token)] bg-[var(--color-surface)]">
                      {image && typeof image !== 'string' ? (
                        <Media className="" fill imgClassName="object-cover" resource={image} />
                      ) : (
                        <Image
                          src={placeholderImageUrl(
                            product.slug || String(product.id || `checkout-${index}`),
                            'meat',
                          )}
                          alt={title || ''}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-sans text-base font-semibold text-[var(--color-text)]">{title}</p>
                      {variant && typeof variant === 'object' && (
                        <p className="mt-1 font-sans text-xs italic text-[var(--color-muted-text)]">
                          {variant.options
                            ?.map((option: NonNullable<typeof variant.options>[number]) => {
                              if (typeof option === 'object') return option.label
                              return null
                            })
                            .join(', ')}
                        </p>
                      )}
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--color-muted-text)]">Qty {quantity}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        {getPurchaseTypeLabel(purchaseType)}
                      </p>
                    </div>
                    {typeof price === 'number' && (
                      <Price className="font-sans font-semibold text-[var(--color-text)]" amount={price} />
                    )}
                  </div>
                )
              }
              return null
            })}
          </div>

          <div className="my-8 h-px bg-[var(--color-border-token)]" />

          <div className="space-y-4 font-sans text-sm">
            <div className="flex justify-between text-[var(--color-muted-text)]">
              <span>Subtotal</span>
              <span className="text-[var(--color-text)]">{formatMoney(subtotal)}</span>
            </div>
            {fulfillmentMethod === 'delivery' && (
              <div className="flex justify-between text-[var(--color-muted-text)]">
                <span>Shipping</span>
                <span className="text-[var(--color-text)]">
                  {shipping ? formatMoney(shipping) : '0.00'}
                </span>
              </div>
            )}
            <div className="flex justify-between text-[var(--color-muted-text)]">
              <span>Estimated Tax</span>
              <span className="text-[var(--color-text)]">{formatMoney(estimatedTax)}</span>
            </div>
            <div className="h-px bg-[var(--color-border-token)]" />
            <div className="flex justify-between text-[32px] font-semibold text-[var(--color-primary)]">
              <span className="text-[var(--color-text)]">Total</span>
              <span>{formatMoney(displayTotal)}</span>
            </div>
          </div>

          <div className="mt-10 text-center">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-text)] text-left">
                Date: {selectedDate ? formatDisplayDate(formatDateForInput(selectedDate)) : 'Not selected'}
              </p>

              <button
                onClick={() => setIsDateModalOpen(true)}
                className="ml-4 border border-[var(--color-primary)] px-3 py-1 text-xs font-sans uppercase tracking-[0.2em] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
              >
                Change
              </button>
            </div >

            <div className="grid grid-cols-2 border border-[var(--color-border-token)]">
              <button
                type="button"
                className={`py-3 font-sans text-sm font-black uppercase tracking-[0.24em] ${fulfillmentMethod === 'pickup'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-muted-text)] hover:text-[var(--color-text)]'
                  }`}
                onClick={() => {
                  setFulfillmentMethod('pickup')
                  resetFulfillmentSelection()
                  if (selectedBranch) {
                    void loadSchedules(selectedBranch.id, 'pickup')
                  }
                }}
              >
                Pickup
              </button>
              <button
                type="button"
                className={`py-3 font-sans text-sm font-black uppercase tracking-[0.24em] ${fulfillmentMethod === 'delivery'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-muted-text)] hover:text-[var(--color-text)]'
                  }`}
                onClick={() => {
                  setFulfillmentMethod('delivery')
                  resetFulfillmentSelection()
                }}
              >
                Delivery
              </button>
            </div>
          </div>

          <Button
            className="mt-8 w-full rounded-none bg-[var(--color-text)] py-6 font-sans font-black uppercase tracking-[0.2em] text-white hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-text)] disabled:text-white disabled:opacity-100"
            disabled={
              !canGoToPayment ||
              isProcessingPayment ||
              !hasPaymentForm ||
              (hasPaymentForm && !paymentElementComplete) ||
              !selectedDate
            }
            type="submit"
            form="checkout-payment-form"
          >
            {isProcessingPayment ? 'Processing...' : 'Complete Purchase'}
          </Button>


        </aside>
      </main>

      {isDateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 animate-[modalFadeIn_180ms_ease-out]">
          <div className="w-[420px] rounded-2xl border border-[var(--color-border-token)] bg-white p-6 text-[var(--color-text)] shadow-sm animate-[modalScaleIn_240ms_cubic-bezier(0.16,1,0.3,1)]">

            {/* Header */}
            <p className="mb-2 text-center font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]">
              The Butcher’s Craft
            </p>

            <h2 className="mb-6 text-center font-sans text-xl font-black uppercase tracking-wide text-[var(--color-text)]">
              Order Type
            </h2>

            {/* Delivery / Pickup */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <button
                className={`py-3 font-sans text-sm font-black uppercase tracking-[0.2em] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--color-primary)]/20 active:translate-y-0 ${fulfillmentMethod === 'delivery'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-muted-text)]'
                  }`}
                onClick={() => {
                  setFulfillmentMethod('delivery')
                  resetFulfillmentSelection()
                }}
              >
                Delivery
              </button>

              <button
                className={`py-3 font-sans text-sm font-black uppercase tracking-[0.2em] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--color-primary)]/20 active:translate-y-0 ${fulfillmentMethod === 'pickup'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-muted-text)]'
                  }`}
                onClick={() => {
                  setFulfillmentMethod('pickup')
                  resetFulfillmentSelection()
                  if (selectedBranch) {
                    void loadSchedules(selectedBranch.id, 'pickup')
                  }
                }}
              >
                Pickup
              </button>
            </div>

            {/* Address */}
            {isLoadingBranches ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--color-muted-text)]">
                  Loading locations...
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    type="button"
                    onClick={() => {
                      setSelectedBranch(branch)
                      resetFulfillmentSelection()
                      if (fulfillmentMethod === 'pickup') {
                        void loadSchedules(branch.id, 'pickup')
                      }
                    }}
                    className={`w-full border p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-surface)] hover:shadow-md active:translate-y-0 animate-[itemSlideIn_220ms_ease-out_both] ${selectedBranch?.id === branch.id
                      ? 'border-[var(--color-primary)]'
                      : 'border-[var(--color-border-token)]'
                      }`}
                  >
                    <p className="text-[var(--color-primary)]">{branch.name}</p>
                    <p className="text-xs text-[var(--color-muted-text)]">{branch.address}</p>
                  </button>
                ))}
              </div>
            )}

            {selectedBranch && fulfillmentMethod === 'delivery' && (
              <div className="mb-6">
                <label className="mt-3 mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--color-muted-text)]">
                  Postal Code
                </label>

                <div className="flex gap-2">
                  <Input
                    value={postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value)
                      setAvailableSchedules([])
                      setTimeSlot('')
                      setShowCalendar(false)
                      setBranchError('')
                    }}
                    placeholder="Example: J7K 0Z6"
                    className="rounded-none border-[var(--color-border-token)] bg-[var(--color-surface)] text-[var(--color-text)]"
                  />

                  <button
                    type="button"
                    onClick={() => void loadSchedules(selectedBranch.id, 'delivery')}
                    className="bg-[var(--color-primary)] px-4 font-sans text-xs font-black uppercase tracking-[0.16em] text-white"
                  >
                    Check
                  </button>
                </div>
              </div>
            )}

            {branchError && (
              <p className="mb-6 text-xs text-[var(--color-error)]">{branchError}</p>
            )}

            {/* Date Picker */}
            <div className="relative mb-6">
              <label className="mt-3 mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--color-muted-text)]">
                Select Date
              </label>

              <button
                type="button"
                onClick={() => setShowCalendar((prev) => !prev)}
                disabled={!selectedBranch || !availableSchedules.length}
                className="w-full border border-[var(--color-border-token)] bg-[var(--color-surface)] px-3 py-3 text-left text-[var(--color-muted-text)] transition-all duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-text)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {selectedDate
                  ? formatDisplayDate(formatDateForInput(selectedDate))
                  : 'Choose a delivery date'}
              </button>

              {showCalendar && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                  {/* backdrop (click to close) */}
                  <div
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setShowCalendar(false)}
                  />

                  {/* calendar popup */}
                  <div className="relative z-[101] rounded-2xl border border-[var(--color-border-token)] bg-white p-6 text-[var(--color-text)] shadow-sm">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        if (date && isDateAllowed(date)) {
                          setSelectedDate(date)
                          setShowCalendar(false)
                        }
                      }}
                      disabled={(date) => !isDateAllowed(date)}
                      showOutsideDays
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <button
              className="w-full bg-[var(--color-primary)] py-3 font-sans font-black uppercase tracking-[0.2em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-lg active:translate-y-0"
              onClick={() => {
                if (!selectedBranch) {
                  setBranchError('Please select a branch first.')
                  return
                }

                if (!availableSchedules.length) {
                  setBranchError(
                    fulfillmentMethod === 'delivery'
                      ? 'Please check your postal code first.'
                      : 'Pickup is not available for this branch.',
                  )
                  return
                }

                if (!selectedDate || !isDateAllowed(selectedDate)) {
                  setBranchError('Please select an available date.')
                  return
                }

                localStorage.setItem(
                  'fulfillment',
                  JSON.stringify({
                    branch: selectedBranch.id,
                    branchName: selectedBranch.name,
                    serviceType: fulfillmentMethod,
                    date: formatDateForInput(selectedDate),
                    timeSlot,
                    postalCode: fulfillmentMethod === 'delivery' ? normalizePostalCode(postalCode) : '',
                    schedule: availableSchedules[0]?.id,
                    shippingCharge: shipping,
                    taxRate,
                    estimatedTax,
                  }),
                )

                setIsDateModalOpen(false)
              }}
            >
              Confirm and Proceed
            </button>

            <button
              className="mt-4 w-full text-sm uppercase tracking-[0.2em] text-[var(--color-muted-text)]"
              onClick={() => setIsDateModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <style jsx global>{`
  .rdp {
    --rdp-accent-color: var(--color-primary);
    --rdp-background-color: var(--color-background);
    --rdp-outline: 2px solid var(--color-primary);
    margin: 0;
    color: var(--color-text);
  }

  .rdp-caption_label {
    color: var(--color-primary);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .rdp-head_cell {
    color: var(--color-muted-text);
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  .rdp-day {
    color: var(--color-text);
    border-radius: 0;
  }

  .rdp-day:hover:not([disabled]) {
    background: var(--color-surface);
    color: var(--color-primary);
  }

  .rdp-day_selected,
  .rdp-day_selected:hover {
    background: var(--color-primary);
    color: #fff;
    font-weight: 900;
  }

  .rdp-day_disabled {
    color: var(--color-muted-text);
    opacity: 0.45;
  }

  .rdp-day_outside {
    color: var(--color-muted-text);
  }

  .rdp-nav_button {
    color: var(--color-primary);
  }

  .rdp-nav_button:hover {
    background: var(--color-surface);
  }
`}</style>

      <style jsx global>{`
  @keyframes modalFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes modalScaleIn {
    from {
      opacity: 0;
      transform: translateY(18px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`}</style>
    </div>


  )


}
