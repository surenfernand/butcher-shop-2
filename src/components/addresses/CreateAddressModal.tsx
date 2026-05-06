'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AddressForm } from '@/components/forms/AddressForm'
import { Address } from '@/payload-types'
import { DefaultDocumentIDType } from 'payload'

type Props = {
  addressID?: DefaultDocumentIDType
  initialData?: Partial<Omit<Address, 'country'>> & { country?: string }
  buttonText?: string
  modalTitle?: string
  callback?: (address: Partial<Address>) => void
  skipSubmission?: boolean
  disabled?: boolean
}

export const CreateAddressModal: React.FC<Props> = ({
  addressID,
  initialData,
  buttonText = 'Add a new address',
  modalTitle = 'Add a new address',
  callback,
  skipSubmission,
  disabled,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpenChange = (state: boolean) => {
    setOpen(state)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const handleCallback = (data: Partial<Address>) => {
    closeModal()

    if (callback) {
      callback(data)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild disabled={disabled}>
        <Button
          variant={'outline'}
          className="rounded-none border-[#d9d9d9] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#333] hover:bg-[#f2f2f2]"
        >
          {buttonText}
        </Button>
      </DialogTrigger>

      <DialogContent className="box-border w-[calc(100vw-2rem)] max-w-[760px] overflow-x-hidden border border-[#dedede] bg-white p-0 text-[var(--color-text)] shadow-2xl sm:max-w-[760px]">
        <div className="box-border px-6 py-6 sm:px-10 sm:py-8">
          <DialogHeader className="mb-6 border-b border-[#ededed] pb-5 pr-10">
            <DialogTitle className="text-[40px] font-semibold tracking-tight text-[var(--color-text)]">
              {modalTitle}
            </DialogTitle>
            <DialogDescription className="mt-1 text-base text-[#707070]">
              This address will be connected to your account.
            </DialogDescription>
          </DialogHeader>

          <AddressForm
            addressID={addressID}
            initialData={initialData}
            callback={handleCallback}
            skipSubmission={skipSubmission}
            onCancel={closeModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
