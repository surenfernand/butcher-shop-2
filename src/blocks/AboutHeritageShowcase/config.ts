import type { Block } from 'payload'

export const AboutHeritageShowcase: Block = {
  slug: 'aboutHeritageShowcase',
  interfaceName: 'AboutHeritageShowcaseBlock',
  labels: {
    singular: 'About Heritage Showcase',
    plural: 'About Heritage Showcases',
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'Our Heritage, Your Table',
      required: true,
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      defaultValue: 'Where old-world butchery lives in every modern cut.',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'storyEyebrow',
      type: 'text',
      defaultValue: 'Since 1984',
    },
    {
      name: 'storyTitle',
      type: 'text',
      defaultValue: 'The Intersection of History & Precision',
    },
    {
      name: 'storyBody',
      type: 'textarea',
      defaultValue:
        'For four decades, we have perfected every cut through discipline, repetition, and an unwavering respect for craft.',
    },
    {
      name: 'primaryButtonLabel',
      type: 'text',
      defaultValue: 'Our Legacy',
    },
    {
      name: 'primaryButtonUrl',
      type: 'text',
      defaultValue: '/about-us',
    },
    {
      name: 'secondaryButtonLabel',
      type: 'text',
      defaultValue: 'Book a Visit',
    },
    {
      name: 'secondaryButtonUrl',
      type: 'text',
      defaultValue: '/contact',
    },
    {
      name: 'storyImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'storyImageBadge',
      type: 'text',
      defaultValue: "The next generation starts at our cutting table.",
    },
    {
      name: 'foundationsTitle',
      type: 'text',
      defaultValue: 'Our Foundations',
    },
    {
      name: 'foundations',
      type: 'array',
      minRows: 3,
      maxRows: 6,
      defaultValue: [
        {
          title: 'Ethical Sourcing',
          description: 'Only trusted farms, transparent standards, and traceable quality.',
        },
        {
          title: 'Artisanal Aging',
          description: 'Dry-aged with control, patience, and old-world method.',
        },
        {
          title: 'Transparency',
          description: 'Clear origins, clear process, and no compromise on integrity.',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'sustainabilityEyebrow',
      type: 'text',
      defaultValue: 'Sustainability Commitment',
    },
    {
      name: 'sustainabilityTitle',
      type: 'text',
      defaultValue: '100% Carbon Neutral Operations',
    },
    {
      name: 'sustainabilityBody',
      type: 'textarea',
      defaultValue:
        'Our facilities run on renewable power and precision planning, reducing waste while preserving exceptional quality.',
    },
    {
      name: 'sustainabilityCtaLabel',
      type: 'text',
      defaultValue: 'See our sustainability report',
    },
    {
      name: 'sustainabilityCtaUrl',
      type: 'text',
      defaultValue: '/sustainability',
    },
    {
      name: 'sustainabilityStatValue',
      type: 'text',
      defaultValue: '0%',
    },
    {
      name: 'sustainabilityStatLabel',
      type: 'text',
      defaultValue: 'Carbon debt',
    },
  ],
}
