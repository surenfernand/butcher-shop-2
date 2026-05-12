import { RequiredDataFromCollectionSlug } from 'payload'

export const homeStaticData: () => RequiredDataFromCollectionSlug<'pages'> = () => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'highImpact',
      eyebrow: 'What we do',
      heading: 'Fresh\nCuts\nFire grilled\nButcher',
      description:
        'At the core of our craft is excellence: prime cuts, open flame, and hospitality worthy of your table—served with the same care from our block to your door.',
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Our menu',
            url: '/shop-luxury',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'Book a table',
            url: '/contact',
          },
        },
      ],
    },
    layout: [],
    meta: {
      description:
        'FILET GOURMET — artisanal butchery and luxury meats delivered to your door.',
      title: 'FILET GOURMET | Artisanal Butchery',
    },
    title: 'Home',
  }
}
