import type { Block } from 'payload'

export const AboutEditable: Block = {
  slug: 'aboutEditable',
  interfaceName: 'AboutEditableBlock',
  labels: {
    singular: 'Editable About Page',
    plural: 'Editable About Pages',
  },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Butcher shop & kitchen' },
    { name: 'quote', type: 'textarea', defaultValue: 'About us' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },

    { name: 'heritageEyebrow', type: 'text', defaultValue: 'What we do' },
    { name: 'heritageTitle', type: 'text', defaultValue: 'Discover more about our work' },
    { name: 'heritageBody', type: 'textarea' },
    { name: 'heritageImageOne', type: 'upload', relationTo: 'media' },
    { name: 'heritageImageTwo', type: 'upload', relationTo: 'media' },

    { name: 'standardsEyebrow', type: 'text', defaultValue: 'Explore our world' },
    { name: 'standardsTitle', type: 'text', defaultValue: 'Solutions made for your needs' },
    { name: 'standardsBody', type: 'textarea' },
    {
      name: 'standards',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
      ],
    },

    { name: 'butchersImage', type: 'upload', relationTo: 'media' },
    { name: 'ageBadge', type: 'text', defaultValue: 'High quality standards' },
    { name: 'butchersEyebrow', type: 'text', defaultValue: 'Tailored for you' },
    { name: 'butchersTitle', type: 'text', defaultValue: 'We help your table shine' },
    { name: 'butchersBody', type: 'textarea' },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
      ],
    },

    { name: 'partnersEyebrow', type: 'text', defaultValue: 'Smart and simple' },
    { name: 'partnersTitle', type: 'text', defaultValue: 'Creative ideas for discerning guests' },
    {
      name: 'partners',
      type: 'array',
      fields: [{ name: 'name', type: 'text' }],
    },

    { name: 'ctaTitle', type: 'text', defaultValue: 'Bridging connections' },
    { name: 'ctaBody', type: 'textarea' },
    { name: 'primaryButtonLabel', type: 'text', defaultValue: 'Learn more' },
    { name: 'primaryButtonUrl', type: 'text', defaultValue: '/shop' },
    { name: 'secondaryButtonLabel', type: 'text', defaultValue: 'Contact us' },
    { name: 'secondaryButtonUrl', type: 'text', defaultValue: '/contact' },
  ],
}