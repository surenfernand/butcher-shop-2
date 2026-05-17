import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/utilities/access'
import { revalidateNewsletterPromo } from './hooks/revalidateNewsletterPromo'

export const NewsletterPromo: GlobalConfig = {
  slug: 'newsletter-promo',
  label: 'Newsletter Promo',
  access: {
    read: () => true,
    update: adminOnly,
  },
  hooks: {
    afterChange: [revalidateNewsletterPromo],
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show the newsletter promo section on the storefront.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              defaultValue: 'Mastery In Your Inbox.',
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              defaultValue:
                'Join our inner circle for exclusive access to vintage reserves, masterclass invites, and seasonal provenance reports.',
            },
            {
              name: 'emailPlaceholder',
              type: 'text',
              defaultValue: 'YOUR EMAIL ADDRESS',
            },
            {
              name: 'submitButtonLabel',
              type: 'text',
              defaultValue: 'SUBSCRIBE TO CRAFT',
            },
            {
              name: 'successMessage',
              type: 'text',
              defaultValue: "Thank you — you're on the list.",
            },
          ],
        },
        {
          label: 'Image',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Right-side promo image. Falls back to the default cleaver image if empty.',
              },
            },
            {
              name: 'imageAlt',
              type: 'text',
              defaultValue: "Butcher's cleaver and sharpening steel on a wooden surface",
            },
            {
              name: 'grayscaleImage',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Appearance',
          fields: [
            {
              name: 'sectionBackground',
              type: 'text',
              defaultValue: '#141414',
            },
            {
              name: 'headingColor',
              type: 'text',
              defaultValue: '#f8f6f3',
            },
            {
              name: 'bodyTextColor',
              type: 'text',
              defaultValue: '#e3ded9',
            },
            {
              name: 'inputTextColor',
              type: 'text',
              defaultValue: '#f6f3ef',
            },
          ],
        },
        {
          label: 'Placement',
          fields: [
            {
              name: 'placement',
              type: 'group',
              fields: [
                {
                  name: 'showOnHome',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Display this section on the home page.',
                  },
                },
                {
                  name: 'insertAfterBlocks',
                  type: 'select',
                  hasMany: true,
                  defaultValue: ['infoSection', 'aboutStory'],
                  admin: {
                    description:
                      'The promo is inserted after the first matching block on the home page layout.',
                  },
                  options: [
                    { label: 'Info Section', value: 'infoSection' },
                    { label: 'About Story', value: 'aboutStory' },
                    { label: 'Featured Cuts', value: 'featuredCuts' },
                    { label: 'Home Testimonial Showcase', value: 'homeTestimonialShowcase' },
                    { label: 'Artisans Promise', value: 'artisansPromise' },
                    { label: 'Carousel', value: 'carousel' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
