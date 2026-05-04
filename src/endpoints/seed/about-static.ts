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
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'About us',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  tag: 'h1',
                  version: 1,
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text:
                        'We are passionate about quality meat, careful sourcing, and honest craftsmanship. Edit this page in the Payload admin under Pages → About us once your database is connected.',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  textFormat: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          enableLink: false,
        },
      ],
    },
  ],
  meta: {
    title: 'About us',
    description: 'Learn about our butcher shop and values.',
  },
})
