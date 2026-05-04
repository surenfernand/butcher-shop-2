import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const aliasRedirects = [
    {
      source: '/about-us',
      destination: '/about',
      permanent: false,
    },
  ]

  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  return [...aliasRedirects, internetExplorerRedirect]
}
