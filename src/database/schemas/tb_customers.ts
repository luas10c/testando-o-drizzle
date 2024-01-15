import { pgTable, text, date, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'

import { tb_wallets } from './tb_wallets.js'

export const tb_customers = pgTable('tb_customers', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text('name'),
  email: text('email').unique().notNull(),
  password: text('password'),
  username: text('username').unique().notNull(),
  birthday: date('birthday'),
  updatedAt: timestamp('updated_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at')
})

relations(tb_customers, ({ many }) => {
  return {
    customer: many(tb_wallets)
  }
})
