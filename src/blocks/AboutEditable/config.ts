import type { Block } from 'payload'

export const AboutEditable: Block = {
  slug: 'aboutEditable',
  interfaceName: 'AboutEditableBlock',
  labels: {
    singular: 'Editable About Page',
    plural: 'Editable About Pages',
  },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Crafting a Legacy of Excellence' },
    { name: 'quote', type: 'textarea', defaultValue: 'We believe that the finest meat is a result of patience, respect for the animal, and a level of craftsmanship that can only be earned over decades.' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },

    { name: 'heritageEyebrow', type: 'text', defaultValue: 'The Heritage' },
    { name: 'heritageTitle', type: 'text', defaultValue: 'Since 1984: A Family Tradition' },
    { name: 'heritageBody', type: 'textarea' },
    { name: 'heritageImageOne', type: 'upload', relationTo: 'media' },
    { name: 'heritageImageTwo', type: 'upload', relationTo: 'media' },

    { name: 'standardsEyebrow', type: 'text', defaultValue: 'Our Ethical Standards' },
    { name: 'standardsTitle', type: 'text', defaultValue: 'Integrity in Every Cut' },
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
    { name: 'ageBadge', type: 'text', defaultValue: '45 Days Average Aging' },
    { name: 'butchersEyebrow', type: 'text', defaultValue: 'The Master Butchers' },
    { name: 'butchersTitle', type: 'text', defaultValue: 'The Art of the Dry-Age' },
    { name: 'butchersBody', type: 'textarea' },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
      ],
    },

    { name: 'partnersEyebrow', type: 'text', defaultValue: 'Our Partners' },
    { name: 'partnersTitle', type: 'text', defaultValue: 'The Heritage Farms' },
    {
      name: 'partners',
      type: 'array',
      fields: [{ name: 'name', type: 'text' }],
    },

    { name: 'ctaTitle', type: 'text', defaultValue: 'Taste the Difference' },
    { name: 'ctaBody', type: 'textarea' },
    { name: 'primaryButtonLabel', type: 'text', defaultValue: 'Shop All Cuts' },
    { name: 'primaryButtonUrl', type: 'text', defaultValue: '/shop' },
    { name: 'secondaryButtonLabel', type: 'text', defaultValue: 'Our Journal' },
    { name: 'secondaryButtonUrl', type: 'text', defaultValue: '/journal' },
  ],
}