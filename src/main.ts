import express from 'express'
import { z } from 'zod'
import http from 'node:http'

import { sql, eq } from 'drizzle-orm'

import { database } from '#/database/drizzle.js'

import { tb_customers } from '#/database/schemas/tb_customers.js'
import { tb_wallets } from '#/database/schemas/tb_wallets.js'

async function bootstrap() {
  const app = express()
  const server = http.createServer(app)

  app.use(express.json())

  app.get('/customers/:id', async function (request, response) {
    const { id } = request.params

    const data = await database
      .select()
      .from(tb_customers)
      .where(eq(tb_customers.id, id))
      .limit(1)

    return response.json(data)
  })

  app.get('/customers', async function (request, response) {
    const data = await database.select().from(tb_customers)

    return response.json(data)
  })

  app.post('/customers', async function (request, response) {
    const schema = z.object({
      email: z.string().email(),
      password: z.string()
    })

    const { email, password } = await schema.parseAsync(request.body)

    const customer = await database
      .insert(tb_customers)
      .values({
        email,
        password,
        username: crypto.randomUUID()
      })
      .returning()

    return response.json(customer)
  })

  app.get('/wallets', async function (request, response) {
    const wallets = await database.select().from(tb_wallets)

    return response.json(wallets)
  })

  app.post('/transfer', async function (request, response) {
    const schema = z.object({
      sender: z.string().uuid(),
      receiver: z.string().uuid(),
      value: z.string().min(1)
    })

    const { sender, receiver, value } = await schema.parseAsync(request.body)

    await database.transaction(async (tx) => {
      await tx
        .update(tb_wallets)
        .set({
          balance: sql`CAST(${tb_wallets.balance} AS INTEGER) - ${value}`
        })
        .where(eq(tb_wallets.id, sender))
      await tx
        .update(tb_wallets)
        .set({
          balance: sql`CAST(${tb_wallets.balance} AS INTEGER) + ${value}`
        })
        .where(eq(tb_wallets.id, receiver))

      return tx
    })

    return response.end()
  })

  function gracefulShotdown() {
    server.close()
  }

  const signals = ['SIGINT', 'SIGTERM']
  for (const signal of signals) {
    process.on(signal, gracefulShotdown)
  }

  server.listen(7000, '0.0.0.0')
}

bootstrap()
