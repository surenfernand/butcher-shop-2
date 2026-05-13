import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { adminOnlyFieldAccessUsers } from '@/access/adminOnlyFieldAccessUsers'
import { publicAccess } from '@/access/publicAccess'
import { adminOrSelf } from '@/access/adminOrSelf'
import { adminOrSelfOrBootstrapAdminRole } from '@/access/adminOrSelfOrBootstrapAdminRole'
import { rolesFieldBootstrapOrAdmin } from '@/access/rolesFieldBootstrapOrAdmin'
import { isAdminPrincipal } from '@/access/utilities'

import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { syncBetterAuthRoleToPayloadRoles } from './hooks/syncBetterAuthRoleToPayloadRoles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => isAdminPrincipal(user),
    create: publicAccess,
    delete: adminOnly,
    read: adminOrSelf,
    unlock: adminOnly,
    update: adminOrSelfOrBootstrapAdminRole,
  },
  admin: {
    group: 'Users',
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: {
    tokenExpiration: 1209600,
  },
  hooks: {
    beforeChange: [syncBetterAuthRoleToPayloadRoles],
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      access: {
        create: rolesFieldBootstrapOrAdmin,
        read: adminOnlyFieldAccessUsers,
        update: rolesFieldBootstrapOrAdmin,
      },
      defaultValue: ['customer'],
      hasMany: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'customer',
          value: 'customer',
        },
      ],
    },
    {
      name: 'orders',
      type: 'join',
      collection: 'orders',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id', 'createdAt', 'total', 'currency', 'items'],
      },
    },
    {
      name: 'cart',
      type: 'join',
      collection: 'carts',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id', 'createdAt', 'total', 'currency', 'items'],
      },
    },
    {
      name: 'addresses',
      type: 'join',
      collection: 'addresses',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id'],
      },
    },
  ],
}
