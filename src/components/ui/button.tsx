import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/cn'

const buttonVariants = cva(
  "relative inline-flex items-center justify-center hover:cursor-pointer gap-2 whitespace-nowrap rounded text-sm font-semibold outline-none transition-[color,box-shadow,background-color,border-color,transform] duration-200 ease-out motion-reduce:transition-colors motion-reduce:duration-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-xs motion-reduce:active:scale-100',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-xs motion-reduce:active:scale-100',
        outline:
          'border border-input bg-card text-foreground shadow-xs hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-xs motion-reduce:active:scale-100',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-xs motion-reduce:active:scale-100',
        ghost:
          'text-muted-foreground hover:text-primary [&.active]:text-primary py-2 px-4 uppercase tracking-[0.14em] text-xs hover:bg-foreground/5 active:scale-[0.98] motion-reduce:hover:bg-transparent motion-reduce:active:scale-100',
        link: 'text-primary underline-offset-4 hover:text-[var(--color-primary-hover)] hover:underline',
        nav: 'text-muted-foreground hover:text-primary [&.active]:text-primary p-0 uppercase tracking-[0.14em] text-xs inline-flex items-center justify-center',
      },
      size: {
        clear: '',
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
