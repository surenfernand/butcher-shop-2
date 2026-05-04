import type { Block } from 'payload'

const text = (name: string, label: string, defaultValue?: string, required = false) => ({
  name,
  type: 'text' as const,
  label,
  defaultValue,
  required,
})

export const ContactPage: Block = {
  slug: 'contactPage',
  interfaceName: 'ContactPageBlock',
  labels: {
    singular: 'Contact Page',
    plural: 'Contact Pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            text('heroEyebrow', 'Eyebrow', 'THE HERITAGE'),
            text('heroTitle', 'Title', 'CRAFTSMANSHIP BORN OF TRADITION'),
            {
              name: 'heroDescription',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                'Founded in 1948, Filet Gourmet has remained a sanctuary for the art of butchery, where precision meets passion in every cut.',
            },
            {
              name: 'heroBackgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Image',
            },
          ],
        },
        {
          label: 'Story',
          fields: [
            text('storyEyebrow', 'Eyebrow', 'SINCE 1948'),
            text('storyTitle', 'Title', 'THE THEATER OF ARTISANAL BUTCHERY'),
            {
              name: 'storyBody',
              type: 'textarea',
              label: 'Body Copy',
              defaultValue:
                'At Filet Gourmet, we believe that butchery is an art form. Our journey began three generations ago in a small corner shop, guided by a single principle: respect for the animal and the craft. Today, that legacy lives on in our state-of-the-art atelier.\n\nWe source exclusively from sustainable, local farms where animals are grass-fed and treated with dignity. Each cut of meat at Filet Gourmet is aged to perfection in our custom dry-aging rooms, ensuring a flavor profile that is as deep as our history.',
            },
            {
              name: 'storyImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Story Image',
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Stats',
              defaultValue: [
                { value: '75+', label: 'YEARS OF EXPERTISE' },
                { value: '12', label: 'MASTER BUTCHERS' },
                { value: '100%', label: 'GRASS-FED BEEF' },
              ],
              fields: [
                text('value', 'Value', undefined, true),
                text('label', 'Label', undefined, true),
              ],
            },
          ],
        },
        {
          label: 'Inquiry & Hours',
          fields: [
            text('formTitle', 'Form Title', 'INQUIRIES'),
            {
              name: 'formDescription',
              type: 'textarea',
              label: 'Form Description',
              defaultValue: 'Reach out for bespoke orders, wholesale inquiries, or private events.',
            },
            {
              name: 'form',
              type: 'relationship',
              relationTo: 'forms',
              label: 'Payload Form',
            },
            text('hoursTitle', 'Opening Hours Title', 'OPENING HOURS'),
            {
              name: 'storeHours',
              type: 'array',
              label: 'Store Hours',
              defaultValue: [
                { day: 'Monday – Friday', time: '08:00 – 20:00' },
                { day: 'Saturday', time: '09:00 – 18:00' },
                { day: 'Sunday', time: 'CLOSED', highlight: true },
              ],
              fields: [
                text('day', 'Day', undefined, true),
                text('time', 'Time', undefined, true),
                { name: 'highlight', type: 'checkbox', label: 'Highlight this time' },
              ],
            },
            text('visitTitle', 'Visit Card Title', 'VISIT THE ATELIER'),
            {
              name: 'contactDetails',
              type: 'array',
              label: 'Contact Details',
              defaultValue: [
                { icon: 'map-pin', text: '124 Artisanal Row, Meatpacking District\nNew York, NY 10014' },
                { icon: 'phone', text: '+1 (555) 892-0101' },
                { icon: 'mail', text: 'atelier@filetgourmet.com' },
              ],
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  defaultValue: 'map-pin',
                  options: [
                    { label: 'Map Pin', value: 'map-pin' },
                    { label: 'Phone', value: 'phone' },
                    { label: 'Mail', value: 'mail' },
                  ],
                },
                { name: 'text', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Map',
          fields: [
            {
              name: 'mapImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Map Background Image',
            },
            text('mapLabel', 'Map Pin Label', 'FILET GOURMET ATELIER'),
            {
              name: 'mapEmbedUrl',
              type: 'textarea',
              label: 'Optional Google Map Embed URL',
              admin: {
                description: 'Leave empty to show the editable uploaded map image instead.',
              },
            },
          ],
        },
      ],
    },
  ],
}
