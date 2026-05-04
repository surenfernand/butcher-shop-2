import type { Block } from 'payload'

export const ArtisansPromise: Block = {
  slug: 'artisansPromise',
  interfaceName: 'ArtisansPromiseBlock',
  labels: {
    singular: "Artisan's Promise",
    plural: "Artisan's Promise Sections",
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: "The Artisan's Promise",
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
      labels: {
        singular: 'Promise item',
        plural: 'Promise items',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'utensils',
          options: [
            { label: 'Utensils', value: 'utensils' },
            { label: 'Badge / Star', value: 'badge' },
            { label: 'Heart Handshake', value: 'heartHandshake' },
            { label: 'Knife', value: 'knife' },
            { label: 'Shopping Bag', value: 'shoppingBag' },
            { label: 'Truck', value: 'truck' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}