'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/utilities/cn'

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'mb-3 block text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--color-primary)]',
        className,
      )}
      {...props}
    />
  )
}

export { Label }