import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { tb_customers } from './schemas/tb_customers.js'
import { tb_wallets } from './schemas/tb_wallets.js'

import { env } from '#/config/env.js'

export const database = drizzle(
  postgres(env.DATABASE_URL, {
    max: 1,
    debug: true,
    ssl: false
  }),
  {
    logger: true,
    schema: {
      tb_customers,
      tb_wallets
    }
  }
)
