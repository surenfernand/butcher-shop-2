import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string
  quantity?: number
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      variant="nav"
      size="clear"
      className={clsx(
        'relative inline-flex h-5 w-5 items-center justify-center p-0 text-neutral-800 transition-colors hover:text-[var(--color-primary)]',
        className,
      )}
      {...rest}
    >
      <ShoppingCart className="h-4 w-4 lucide lucide-search" strokeWidth={1.5} />

      {quantity ? (
        <span className="absolute left-[10px] top-[-7px] flex h-4 min-w-4 items-center justify-center rounded-full border border-[var(--color-primary)] bg-white px-1 text-[9px] font-medium leading-none text-[var(--color-primary)]">
          {quantity}
        </span>
      ) : null}
    </Button>
  )
}