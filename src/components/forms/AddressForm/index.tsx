'use client'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAddresses } from '@payloadcms/plugin-ecommerce/client/react'
import { defaultCountries as supportedCountries } from '@payloadcms/plugin-ecommerce/client/react'
import { Address, Config } from '@/payload-types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { titles } from './constants'
import { Button } from '@/components/ui/button'
import { deepMergeSimple } from 'payload/shared'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'

type AddressFormValues = {
  title?: string | null
  firstName?: string | null
  lastName?: string | null
  company?: string | null
  addressLine1?: string | null
  addressLine2?: string | null
  city?: string | null
  state?: string | null
  postalCode?: string | null
  country?: string | null
  phone?: string | null
}

type Props = {
  addressID?: Config['db']['defaultIDType']
  initialData?: Omit<Address, 'country' | 'id' | 'updatedAt' | 'createdAt'> & { country?: string }
  callback?: (data: Partial<Address>) => void
  /**
   * If true, the form will not submit to the API.
   */
  skipSubmission?: boolean
  onCancel?: () => void
}

export const AddressForm: React.FC<Props> = ({
  addressID,
  initialData,
  callback,
  skipSubmission,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddressFormValues>({
    defaultValues: initialData,
  })

  const { createAddress, updateAddress } = useAddresses()

  const onSubmit = useCallback(
    async (data: AddressFormValues) => {
      const newData = deepMergeSimple(initialData || {}, data)

      try {
        if (!skipSubmission) {
          if (addressID) {
            await updateAddress(addressID, newData)
          } else {
            await createAddress(newData)
          }
        }

        if (callback) {
          callback(newData)
        }
      } catch (error) {
        console.error('Address form submit failed:', error)

        if (callback) {
          callback(newData)
        }
      }
    },
    [initialData, skipSubmission, callback, addressID, updateAddress, createAddress],
  )
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="box-border min-w-0 text-[#1f1f1f]">
      <div className="mb-8 grid gap-6 sm:mb-10">
        <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-[minmax(0,8.75rem)_minmax(0,1fr)_minmax(0,1fr)] md:items-start">
          <FormItem className="min-w-0">
            <Label htmlFor="title" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#727272]">
              Title
            </Label>
            <Select
              {...register('title')}
              onValueChange={(value) => setValue('title', value, { shouldValidate: true })}
              defaultValue={initialData?.title || ''}
            >
              <SelectTrigger
                id="title"
                className="mb-0 h-12 w-full min-w-0 rounded-none border-[#e5e5e5] bg-[#f5f5f5] text-[#1f1f1f]"
              >
                <SelectValue placeholder="Mr." />
              </SelectTrigger>
              <SelectContent className="border-[#d9d9d9] bg-white text-[#1f1f1f]">
                {titles.map((title) => (
                  <SelectItem key={title} value={title}>{title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.title && <FormError message={errors.title.message} />}
          </FormItem>

          <FormItem className="min-w-0">
            <Label htmlFor="firstName" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#727272]">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              autoComplete="given-name"
              className="h-12 min-h-12 w-full min-w-0 rounded-none border-[#e5e5e5] bg-[#f5f5f5] text-[#1f1f1f] placeholder:text-[#9a9a9a]"
              {...register('firstName', { required: 'First name is required.' })}
            />
            {errors.firstName && <FormError message={errors.firstName.message} />}
          </FormItem>

          <FormItem className="min-w-0">
            <Label htmlFor="lastName" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#727272]">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              autoComplete="family-name"
              className="h-12 min-h-12 w-full min-w-0 rounded-none border-[#e5e5e5] bg-[#f5f5f5] text-[#1f1f1f] placeholder:text-[#9a9a9a]"
              {...register('lastName', { required: 'Last name is required.' })}
            />
            {errors.lastName && <FormError message={errors.lastName.message} />}
          </FormItem>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
          <FormItem className="min-w-0">
            <Label htmlFor="phone" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#727272]">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              autoComplete="mobile tel"
              className="h-12 min-h-12 w-full min-w-0 rounded-none border-[#e5e5e5] bg-[#f5f5f5] text-[#1f1f1f] placeholder:text-[#9a9a9a]"
              {...register('phone')}
            />
            {errors.phone && <FormError message={errors.phone.message} />}
          </FormItem>

          <FormItem className="min-w-0">
            <Label htmlFor="company" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#727272]">
              Company (Optional)
            </Label>
            <Input
              id="company"
              placeholder="e.g. Gourmet Catering Co."
              autoComplete="organization"
              className="h-12 min-h-12 w-full min-w-0 rounded-none border-[#e5e5e5] bg-[#f5f5f5] text-[#1f1f1f] placeholder:text-[#9a9a9a]"
              {...register('company')}
            />
            {errors.company && <FormError message={errors.company.message} />}
          </FormItem>
        </div>

        <FormItem className="min-w-0">
          <Label htmlFor="addressLine1" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#727272]">
            Address Line 1
          </Label>
          <Input
            id="addressLine1"
            placeholder="Street address, P.O. box"
            autoComplete="address-line1"
            className="h-12 min-h-12 w-full min-w-0 rounded-none border-[#e5e5e5] bg-[#f5f5f5] text-[#1f1f1f] placeholder:text-[#9a9a9a]"
            {...register('addressLine1', { required: 'Address line 1 is required.' })}
          />
          {errors.addressLine1 && <FormError message={errors.addressLine1.message} />}
        </FormItem>

        <FormItem className="min-w-0">
          <Label htmlFor="addressLine2" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#727272]">
            Address Line 2 (Optional)
          </Label>
          <Input
            id="addressLine2"
            placeholder="Apartment, suite, unit, floor"
            autoComplete="address-line2"
            className="h-12 min-h-12 w-full min-w-0 rounded-none border-[#e5e5e5] bg-[#f5f5f5] text-[#1f1f1f] placeholder:text-[#9a9a9a]"
            {...register('addressLine2')}
          />
          {errors.addressLine2 && <FormError message={errors.addressLine2.message} />}
        </FormItem>

        <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-3">
          <FormItem className="min-w-0">
            <Label htmlFor="city" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#727272]">City</Label>
            <Input id="city" placeholder="New York" className="h-12 min-h-12 w-full min-w-0 rounded-none border-[#e5e5e5] bg-[#f5f5f5] text-[#1f1f1f] placeholder:text-[#9a9a9a]" {...register('city', { required: 'City is required.' })} />
            {errors.city && <FormError message={errors.city.message} />}
          </FormItem>

          <FormItem className="min-w-0">
            <Label htmlFor="state" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#727272]">State / Province</Label>
            <Input id="state" placeholder="NY" className="h-12 min-h-12 w-full min-w-0 rounded-none border-[#e5e5e5] bg-[#f5f5f5] text-[#1f1f1f] placeholder:text-[#9a9a9a]" {...register('state')} />
            {errors.state && <FormError message={errors.state.message} />}
          </FormItem>

          <FormItem className="min-w-0">
            <Label htmlFor="postalCode" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#727272]">Zip Code</Label>
            <Input id="postalCode" placeholder="10014" className="h-12 min-h-12 w-full min-w-0 rounded-none border-[#e5e5e5] bg-[#f5f5f5] text-[#1f1f1f] placeholder:text-[#9a9a9a]" {...register('postalCode', { required: 'Postal code is required.' })} />
            {errors.postalCode && <FormError message={errors.postalCode.message} />}
          </FormItem>
        </div>

        <FormItem className="min-w-0">
          <Label htmlFor="country" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#727272]">
            Country
          </Label>
          <Select
            {...register('country', { required: 'Country is required.' })}
            onValueChange={(value) => setValue('country', value, { shouldValidate: true })}
            required
            defaultValue={initialData?.country || ''}
          >
            <SelectTrigger
              id="country"
              className="mb-0 h-12 w-full min-w-0 rounded-none border-[#e5e5e5] bg-[#f5f5f5] text-[#1f1f1f]"
            >
              <SelectValue placeholder="United States" />
            </SelectTrigger>
            <SelectContent className="border-[#d9d9d9] bg-white text-[#1f1f1f]">
              {supportedCountries.map((country) => {
                const value = typeof country === 'string' ? country : country.value
                const label =
                  typeof country === 'string'
                    ? country
                    : typeof country.label === 'string'
                      ? country.label
                      : value

                return <SelectItem key={value} value={value}>{label}</SelectItem>
              })}
            </SelectContent>
          </Select>
          {errors.country && <FormError message={errors.country.message} />}
        </FormItem>
      </div>

      <div className="flex min-w-0 flex-col gap-4 border-t border-[#ededed] pt-6 sm:flex-row sm:items-center sm:justify-end sm:gap-6">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="rounded-none px-3 text-[#686868] hover:bg-transparent hover:text-[#3d3d3d]"
        >
          ✕ Cancel
        </Button>

        <Button
          type="submit"
          className="h-12 w-full max-w-full rounded-none bg-[#b23628] px-8 text-sm font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#9f2f22] sm:w-auto sm:min-w-[220px] sm:max-w-[280px]"
        >
          Save Address
        </Button>
      </div>
    </form>
  )
}
