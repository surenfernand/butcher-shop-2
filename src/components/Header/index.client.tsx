'use client'

import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import type { Header } from 'src/payload-types'
import { MobileMenu } from './MobileMenu'
import { User } from 'lucide-react'

import { Media } from '@/components/Media'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const menu = header.navItems || []
  const pathname = usePathname()

  return (
    <header className="fixed left-0 top-0 z-50 w-full" data-theme="light">
      <div className="border-b border-neutral-200/90 bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300 ease-out">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>

          <div className="flex min-w-0 flex-1 items-center md:max-w-[200px]">
            <Link href="/" className="flex min-w-0 items-center">
              {header.logo && typeof header.logo === 'object' ? (
                <Media
                  resource={header.logo}
                  imgClassName="h-12 w-auto max-w-[200px] object-contain object-left md:h-14"
                />
              ) : (
                <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-black">
                  FILET GOURMET
                </span>
              )}
            </Link>
          </div>

          <div className="hidden min-h-0 flex-1 items-center justify-center md:flex">
            {menu.length ? (
              <ul className="flex items-center justify-center gap-7 lg:gap-10">
                {menu.map((item) => (
                  <li className="flex items-center" key={item.id}>
                    <CMSLink
                      {...item.link}
                      appearance="nav"
                      size="clear"
                      className={cn(
                        'relative text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-800 transition-colors duration-200 hover:text-[var(--color-primary)]',
                        {
                          'text-[var(--color-primary)] after:absolute after:left-0 after:top-full after:mt-1.5 after:h-px after:w-full after:bg-[var(--color-primary)]':
                            item.link?.url === '/'
                              ? pathname === '/'
                              : item.link?.url
                                ? pathname.startsWith(item.link.url)
                                : false,
                        },
                      )}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="flex flex-1 items-center justify-end gap-5 text-neutral-800">
            <Suspense fallback={<OpenCartButton />}>
              <Cart />
            </Suspense>

            <Link
              href="/account"
              className="hidden transition-colors hover:text-[var(--color-primary)] md:inline-flex"
              aria-label="Account"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
