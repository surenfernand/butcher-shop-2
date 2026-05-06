// src/components/Footer/index.tsx

import { FooterMenu } from '@/components/Footer/menu'
import { FooterSocialLink } from '@/components/Footer/FooterSocialLink'
import type { Footer as FooterType } from '@/payload-types'
import { Media } from '@/components/Media'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'

const DEFAULT_EXPLORE = [
  { href: '/shop', label: 'Shop All' },
  { href: '/shop-luxury', label: 'Our Sources' },
  { href: '/shop', label: 'Dry Aging Process' },
  { href: '/shop', label: 'Recipes' },
]

const DEFAULT_COMPANY = [
  { href: '/contact', label: 'Privacy Policy' },
  { href: '/contact', label: 'Terms of Service' },
  { href: '/shop', label: 'Wholesale' },
  { href: '/shop', label: 'Sitemap' },
]

export async function Footer() {
  const footer: FooterType = await getCachedGlobal('footer', 1)()
  const menu = footer.navItems || []
  const socialLinks = footer.socialLinks || []
  const currentYear = new Date().getFullYear()

  const mid = menu.length > 1 ? Math.ceil(menu.length / 2) : menu.length
  const exploreMenu = menu.slice(0, mid)
  const companyMenu = menu.slice(mid)

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white text-neutral-600" data-theme="light">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="mb-5 flex items-center gap-3 text-black transition-opacity hover:opacity-80"
            >
              {footer.logo && typeof footer.logo === 'object' ? (
                <Media
                  resource={footer.logo}
                  imgClassName="h-12 w-auto object-contain object-left"
                />
              ) : (
                <span className="text-[12px] font-bold uppercase tracking-[0.2em]">
                  {footer.brandName || 'FILET GOURMET'}
                </span>
              )}
            </Link>

            {footer.description && (
              <p className="mb-7 text-sm leading-relaxed text-neutral-600">{footer.description}</p>
            )}

            {(socialLinks?.length ?? 0) > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map(({ id, link }) => (
                  <FooterSocialLink key={id} link={link} />
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
              Explore
            </h3>
            {exploreMenu.length > 0 ? (
              <FooterMenu menu={exploreMenu} />
            ) : (
              <ul className="flex flex-col gap-3">
                {DEFAULT_EXPLORE.map(({ href, label }) => (
                  <li key={href + label}>
                    <Link
                      className="text-sm text-neutral-600 transition-colors hover:text-[var(--color-primary)]"
                      href={href}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
              Company
            </h3>
            {companyMenu.length > 0 ? (
              <FooterMenu menu={companyMenu} />
            ) : (
              <ul className="flex flex-col gap-3">
                {DEFAULT_COMPANY.map(({ href, label }) => (
                  <li key={href + label}>
                    <Link
                      className="text-sm text-neutral-600 transition-colors hover:text-[var(--color-primary)]"
                      href={href}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
              Contact
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              {footer.address && (
                <p className="leading-relaxed text-neutral-600">{footer.address}</p>
              )}

              {footer.contactPhone && (
                <a
                  href={`tel:${footer.contactPhone}`}
                  className="text-neutral-600 transition-colors hover:text-[var(--color-primary)]"
                >
                  {footer.contactPhone}
                </a>
              )}

              {footer.contactEmail && (
                <a
                  href={`mailto:${footer.contactEmail}`}
                  className="font-medium text-[var(--color-primary)] transition-colors hover:underline"
                >
                  {footer.contactEmail}
                </a>
              )}

              {footer.bottomBar?.locationText && (
                <p className="text-neutral-600">{footer.bottomBar.locationText}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-center text-[11px] uppercase tracking-[0.18em] text-neutral-500 md:flex-row md:items-center md:justify-between md:px-10 md:text-left lg:px-12">
          <p>
            © {currentYear} {footer.brandName || 'FILET GOURMET'}. Artisanal butchery & luxury meats.
          </p>

          <div className="flex flex-col gap-2 md:items-end">
            {footer.bottomBar?.legalText && <p>{footer.bottomBar.legalText}</p>}

            {footer.bottomBar?.creditLabel && (
              <p>
                {footer.bottomBar.creditUrl ? (
                  <a
                    href={footer.bottomBar.creditUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[var(--color-primary)]"
                  >
                    {footer.bottomBar.creditLabel}
                  </a>
                ) : (
                  <span>{footer.bottomBar.creditLabel}</span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
