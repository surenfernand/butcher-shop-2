import { RequiredDataFromCollectionSlug } from 'payload'

export const aboutStaticData: () => RequiredDataFromCollectionSlug<'pages'> = () => ({
  slug: 'about',
  _status: 'published',
  title: 'About us',
  hero: {
    type: 'none',
  },
  layout: [
    {
      blockName: 'About',
      blockType: 'aboutEditable',
      eyebrow: 'Crafting a Legacy of Excellence',
      quote:
        'We believe that the finest meat is a result of patience, respect for the animal, and a level of craftsmanship that can only be earned over decades.',
      heritageEyebrow: 'The Heritage',
      heritageTitle: 'Since 1984: A Family Tradition',
      heritageBody:
        'What began as a neighborhood counter has grown into a destination for discerning home cooks and chefs. We still break down whole animals in-house, age primals with care, and know our suppliers by name. Every cut reflects the same standards we have held for generations.',
      standardsEyebrow: 'Our Ethical Standards',
      standardsTitle: 'Integrity in Every Cut',
      standardsBody:
        'We partner with farms that share our values: humane handling, transparent practices, and respect for the land. That relationship is the foundation of flavor you can feel good about serving.',
      standards: [
        {
          title: 'Sourcing',
          body: 'We visit farms, ask hard questions, and only buy from partners we would trust at our own table.',
        },
        {
          title: 'Traceability',
          body: 'From pasture or pen to our case, we can tell you where your meat came from and how it was raised.',
        },
        {
          title: 'Minimal waste',
          body: 'Nose-to-tail butchery honors the animal and brings you extraordinary value in every cut.',
        },
      ],
      ageBadge: '45 Days Average Aging',
      butchersEyebrow: 'The Master Butchers',
      butchersTitle: 'The Art of the Dry-Age',
      butchersBody:
        'Our dry-aging room is the heart of the shop: controlled humidity, steady airflow, and patient trimming until each primal reaches its peak. The result is beef with depth, nutty sweetness, and a texture that sears like a dream.',
      features: [
        {
          title: 'In-house butchery',
          body: 'Custom cuts, expert trimming, and advice at the counter every day.',
        },
        {
          title: 'Aging program',
          body: 'We age primals to develop flavor and tenderness you will not find in a grocery case.',
        },
        {
          title: 'Curated selection',
          body: 'From everyday staples to special-occasion roasts, we stock what we are proud to cook ourselves.',
        },
      ],
      partnersEyebrow: 'Our Partners',
      partnersTitle: 'The Heritage Farms',
      partners: [
        { name: 'Highland Ridge Ranch' },
        { name: 'Willow Creek Pork' },
        { name: 'Bluewater Lamb Co.' },
        { name: 'Northern Plains Angus' },
      ],
      ctaTitle: 'Taste the Difference',
      ctaBody:
        'Visit the shop for the full experience, or order online for pickup and delivery where available.',
      primaryButtonLabel: 'Shop All Cuts',
      primaryButtonUrl: '/shop',
      secondaryButtonLabel: 'Contact',
      secondaryButtonUrl: '/contact',
    },
  ],
  meta: {
    title: 'About us',
    description: 'Learn about our butcher shop and values.',
  },
})
