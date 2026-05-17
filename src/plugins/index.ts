import {
  adminOnlyFieldAccess,
  adminOrPublishedStatus,
  customerOnlyFieldAccess,
  isAdmin,
  isDocumentOwner,
} from '@/utilities/access'
import { ProductsCollection } from "@/collections/Products";
import type { Page, Product } from "@/payload-types";
import { getServerSideURL } from "@/utilities/getURL";
import { isS3StorageConfigured } from "@/utilities/isS3StorageConfigured";
import { ecommercePlugin } from "@payloadcms/plugin-ecommerce";
import { stripeAdapter } from "@payloadcms/plugin-ecommerce/payments/stripe";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { seoPlugin } from "@payloadcms/plugin-seo";
import type { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import type { Plugin } from "payload";
import multiLocationPlugin from "./payload-multi-location-plugin/src";

const s3Plugin: Plugin | undefined = isS3StorageConfigured()
	? s3Storage({
			collections: {
				media: true,
			},
			bucket: process.env.S3_BUCKET!,
			config: {
				...(process.env.S3_ENDPOINT
					? {
							endpoint: process.env.S3_ENDPOINT,
							forcePathStyle: true as const,
						}
					: {}),
				region: process.env.S3_REGION!,
				credentials: {
					accessKeyId: process.env.S3_ACCESS_KEY_ID!,
					secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
				},
			},
		})
	: undefined;

const generateTitle: GenerateTitle<Product | Page> = ({ doc }) => {
	return doc?.title
		? `${doc.title} | Payload Ecommerce Template`
		: "Payload Ecommerce Template";
};

const generateURL: GenerateURL<Product | Page> = ({ doc }) => {
	const url = getServerSideURL();

	return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
	...(s3Plugin ? [s3Plugin] : []),
	seoPlugin({
		generateTitle,
		generateURL,
	}),
	formBuilderPlugin({
		fields: {
			payment: false,
		},
		formSubmissionOverrides: {
			access: {
				delete: isAdmin,
				read: isAdmin,
				update: isAdmin,
			},
			admin: {
				group: "Content",
			},
		},
		formOverrides: {
			access: {
				delete: isAdmin,
				read: () => true,
				update: isAdmin,
				create: isAdmin,
			},
			admin: {
				group: "Content",
			},
			fields: ({ defaultFields }) => {
				return defaultFields.map((field) => {
					if ("name" in field && field.name === "confirmationMessage") {
						return {
							...field,
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [
										...rootFeatures,
										FixedToolbarFeature(),
										HeadingFeature({
											enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
										}),
									];
								},
							}),
						};
					}
					return field;
				});
			},
		},
	}),
	ecommercePlugin({
		access: {
			adminOnlyFieldAccess,
			adminOrPublishedStatus,
			customerOnlyFieldAccess,
			isAdmin,
			isDocumentOwner,
		},
		customers: {
			slug: "users",
		},
		orders: {
			ordersCollectionOverride: ({ defaultCollection }) => ({
				...defaultCollection,
				fields: [
					...defaultCollection.fields,
					{
						name: "inventoryReduced",
						type: "checkbox",
						defaultValue: false,
						admin: {
							position: "sidebar",
							readOnly: true,
						},
					},
					{
						name: "accessToken",
						type: "text",
						unique: true,
            hooks: {
              beforeValidate: [
                ({ value, operation }) => {
                  if (operation === 'create' || !value) {
                    return crypto.randomUUID()
                  }
                  return value
                },
              ],
            },
          },

          {
            name: 'purchaseType',
            type: 'select',
            defaultValue: 'one_time',
            options: [
              { label: 'One Time', value: 'one_time' },
              { label: 'Weekly', value: 'weekly' },
              { label: 'Monthly', value: 'monthly' },
            ],
          },
          {
            name: 'purchaseTypes',
            type: 'array',
            fields: [
              {
                name: 'product',
                type: 'relationship',
                relationTo: 'products',
                required: true,
              },
              {
                name: 'variant',
                type: 'text',
              },
              {
                name: 'purchaseType',
                type: 'select',
                defaultValue: 'one_time',
                options: [
                  { label: 'One Time', value: 'one_time' },
                  { label: 'Weekly', value: 'weekly' },
                  { label: 'Monthly', value: 'monthly' },
                ],
                required: true,
              },
            ],
          },
          {
            name: 'stripeSubscriptionID',
            type: 'text',
          },
        ],
      }),
    },
    payments: {
      paymentMethods: [
        stripeAdapter({
          secretKey: process.env.STRIPE_SECRET_KEY!,
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
          webhookSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET!,
        }),
      ],
    },
    products: {
      productsCollectionOverride: ProductsCollection,
    },
  }),
	multiLocationPlugin({
		productSlug: "products",
		orderSlug: "orders",
		adminGroup: "Shop",
	}),
];
