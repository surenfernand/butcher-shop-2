'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, ClipboardList, Heart, LogOut, UserRound } from 'lucide-react'

type Props = {
  className?: string
}

const linkBase =
  'w-full justify-start rounded-none px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] hover:no-underline transition-colors'

const linkInactive =
  'text-[#0000] hover:text-[#d66152] hover:bg-[#f2f2f2]'

const linkActive =
  'bg-[#ececec] text-[#d66152]'

export const AccountNav: React.FC<Props> = ({ className }) => {
  const pathname = usePathname()

  return (
    <div
      className={clsx(
        'flex min-h-full flex-col justify-between text-white',
        'text-foreground',
        className,
      )}
    >
      <div>
        <div className="border-b border-[#e8e8e8] px-5 py-6">
          <p className="text-[38px] font-semibold tracking-tight text-[#101010]">My Account</p>
          <p className="mt-1 text-sm text-black">Manage your culinary journey</p>
        </div>

        <ul className="mt-4 flex flex-col gap-1 px-3">
          <li>
            <Button asChild variant="link" className="h-auto w-full p-0">
              <Link
                href="/account"
                className={clsx(
                  linkBase,
                  pathname === '/account' ? linkActive : linkInactive,
                )}
              >
                <UserRound className="mr-3 size-4" aria-hidden />
                Profile
              </Link>
            </Button>
          </li>

          <li>
            <Button asChild variant="link" className="h-auto w-full p-0">
              <Link
                href="/orders"
                className={clsx(
                  linkBase,
                  pathname === '/orders' || pathname.includes('/orders')
                    ? linkActive
                    : linkInactive,
                )}
              >
                <ClipboardList className="mr-3 size-4" aria-hidden />
                Orders
              </Link>
            </Button>
          </li>

          <li>
            <Button
              asChild
              variant="link"
              className="h-auto w-full p-0"
            >
              <Link
                href="/account/subscriptions"
                className={clsx(
                  linkBase,
                  pathname === '/account/subscriptions' ? linkActive : linkInactive,
                )}
              >
                <CalendarDays className="mr-3 size-4" aria-hidden />
                Subscriptions
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="link" className="h-auto w-full p-0">
              <Link
                href="/account/addresses"
                className={clsx(
                  linkBase,
                  pathname === '/account/addresses' ? linkActive : linkInactive,
                )}
              >
                <Heart className="mr-3 size-4" aria-hidden />
                Addresses
              </Link>
            </Button>
          </li>
        </ul>
      </div>

      <div className="mx-5 border-t border-[#e8e8e8] pt-3">
        <Button
          asChild
          variant="link"
          className="h-auto w-full p-0"
        >
          <Link
            href="/logout"
            className={clsx(
              linkBase,
              'text-[#d23c2e] hover:bg-[#f5f0ef] hover:text-[#c83123]',
              pathname === '/logout' && 'bg-[#ececec]',
            )}
          >
            <LogOut className="mr-3 size-4" aria-hidden />
            Sign out
          </Link>
        </Button>
      </div>
    </div>
  )
}