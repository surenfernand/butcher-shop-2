import type { Block } from 'payload'

export const HomeTestimonialShowcase: Block = {
  slug: 'homeTestimonialShowcase',
  interfaceName: 'HomeTestimonialShowcaseBlock',
  labels: {
    singular: 'Home Testimonial Showcase',
    plural: 'Home Testimonial Showcases',
  },
  fields: [
    {
      name: 'sectionBackground',
      type: 'text',
      defaultValue: 'var(--color-surface)',
    },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      defaultValue: [
        {
          quote:
            'By far some of the most delicious steaks I have tasted. Meat House is a credible service that allows regular people to enjoy the best meal straight from the farm.',
          authorName: 'Alita Kyri',
          authorRole: 'Farmer',
        },
      ],
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'authorName',
          type: 'text',
          required: true,
        },
        {
          name: 'authorRole',
          type: 'text',
        },
        {
          name: 'authorAvatar',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'topDecorImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'bottomDecorImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

