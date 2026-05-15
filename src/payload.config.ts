import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import {
    BoldFeature,
    EXPERIMENTAL_TableFeature,
    IndentFeature,
    ItalicFeature,
    LinkFeature,
    OrderedListFeature,
    UnderlineFeature,
    UnorderedListFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'
import 'dotenv/config'
import path from 'path'
import { buildConfig } from 'payload'
import type { Plugin } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages/index'
import { Users } from '@/collections/Users'
import { Footer } from '@/globals/Footer'
import { Header } from '@/globals/Header'
import { ShopPage } from '@/globals/ShopPage'
import { CutTypes } from './collections/ProductCategories/CutTypes'
import { Flavors } from './collections/ProductCategories/Flavors'
import { MeatTypes } from './collections/ProductCategories/MeatTypes'
import { Qualities } from './collections/ProductCategories/Qualities'
import { CartSettings } from './globals/CartSettings'
import { ShopLuxuryPage } from './globals/ShopLuxuryPage'
import { plugins } from './plugins'
import { openAdminLoginBypassBeforeHook } from './auth/openAdminLoginBypass'
import { overrideBetterAuthAdminViews } from './plugins/overrideBetterAuthAdminViews'
import { payloadBetterAuth } from '@payload-auth/better-auth-plugin'
import { admin } from 'better-auth/plugins'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin#BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard#BeforeDashboard'],
    },
    user: Users.slug,
  },
  collections: [
    Users,
    Pages,
    Categories,
    Media,

    MeatTypes,
    CutTypes,
    Qualities,
    Flavors,
  ],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        LinkFeature({
          enabledCollections: ['pages'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
        IndentFeature(),
        EXPERIMENTAL_TableFeature(),
      ]
    },
  }),
  //email: nodemailerAdapter(),
  endpoints: [],
  globals: [Header, Footer, ShopPage, ShopLuxuryPage, CartSettings],
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        region: process.env.S3_REGION!,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
      },
    }),
    ...plugins,
    payloadBetterAuth({
      users: {
        // Plugin hardcodes defaultValue 'user' on `role`; the DB enum must include it or
        // push-schema fails (e.g. DEFAULT 'user' with enum only admin|customer).
        roles: ['admin', 'customer', 'user'],
        adminRoles: ['admin'],
      },
      betterAuthOptions: {
        emailAndPassword: {
          enabled: true,
        },
        hooks: {
          before: openAdminLoginBypassBeforeHook,
        },
        plugins: [admin()],
      },
    }) as unknown as Plugin,
    overrideBetterAuthAdminViews,
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // sharp,
})
