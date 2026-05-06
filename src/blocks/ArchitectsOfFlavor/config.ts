import type { Block } from 'payload'

export const ArchitectsOfFlavor: Block = {
  slug: 'architectsOfFlavor',
  interfaceName: 'ArchitectsOfFlavorBlock',
  labels: {
    singular: 'Architects of Flavor',
    plural: 'Architects of Flavor',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'THE ARCHITECTS OF FLAVOR',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Precision in every movement, mastery in every cut.',
    },
    {
      name: 'team',
      type: 'array',
      minRows: 1,
      defaultValue: [
        {
          name: 'ARTHUR STERLING',
          role: 'Head Butcher - 40 Years Exp.',
          description:
            'A scholar of the blade, Arthur has spent four decades refining the signature MEATHOUSE dry-aging technique.',
        },
        {
          name: 'ELENA VANCE',
          role: 'Sous-Artisan',
          description:
            'Elena brings a modern culinary perspective to traditional cuts, specializing in French trimming and artisanal presentation.',
        },
        {
          name: 'MARCUS THORNE',
          role: 'Primary Sourcing Lead',
          description:
            'With a background in agriculture, Marcus ensures every carcass meets our strict ethical and quality benchmarks before it reaches the shop.',
        },
        {
          name: 'JULIAN REED',
          role: 'Apprentice Butcher',
          description:
            'The next generation. Julian preserves the methods of those before him while integrating sustainable delivery logistics.',
        },
      ],
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}