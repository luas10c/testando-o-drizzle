import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'

import { tb_customers } from './tb_customers.js'

export const tb_wallets = pgTable('tb_wallets', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  balance: text('balance'),
  currency: text('currency'),
  customerId: text('customer_id')
    .references(() => tb_customers.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
    .notNull(),
  updatedAt: timestamp('updated_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at')
})

relations(tb_wallets, ({ one }) => {
  return {
    customer: one(tb_customers, {
      fields: [tb_wallets.customerId],
      references: [tb_customers.id]
    })
  }
})
