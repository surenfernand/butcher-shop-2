import { RequiredDataFromCollectionSlug } from 'payload'

export const homeStaticData: () => RequiredDataFromCollectionSlug<'pages'> = () => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'highImpact',
      eyebrow: 'Masterfully crafted since 1998',
      heading: 'Premium Cuts, Delivered to Your Door',
      description:
        'Exceptional beef, lamb, and poultry—hand-selected, expertly trimmed, and shipped with the care your table deserves.',
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Shop now',
            url: '/shop',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'View menu',
            url: '/shop-luxury',
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
