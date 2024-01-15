import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import { tb_customers } from './schemas/tb_customers.js'
import { tb_wallets } from './schemas/tb_wallets.js'

import { env } from '#/config/env.js'

try {
  await migrate(
    drizzle(
      postgres(env.DATABASE_URL, {
        max: 1,
        debug: true,
        ssl: false
      }),
      {
        schema: {
          tb_customers,
          tb_wallets
        }
      }
    ),
    {
      migrationsFolder: './src/database/migrations',
      migrationsTable: 'migrations'
    }
  )
} finally {
  process.exit(1)
}
