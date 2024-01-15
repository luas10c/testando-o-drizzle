import express from "express";
import { z } from "zod";
import http from "node:http";
import { sql, eq } from "drizzle-orm";
import { database } from "./database/drizzle.js";
import { tb_customers } from "./database/schemas/tb_customers.js";
import { tb_wallets } from "./database/schemas/tb_wallets.js";
async function bootstrap() {
    const app = express();
    const server = http.createServer(app);
    app.use(express.json());
    app.get('/customers/:id', async function(request, response) {
        const { id } = request.params;
        const data = await database.select().from(tb_customers).where(eq(tb_customers.id, id)).limit(1);
        return response.json(data);
    });
    app.get('/customers', async function(request, response) {
        const data = await database.select().from(tb_customers);
        return response.json(data);
    });
    app.post('/customers', async function(request, response) {
        const schema = z.object({
            email: z.string().email(),
            password: z.string()
        });
        const { email, password } = await schema.parseAsync(request.body);
        const customer = await database.insert(tb_customers).values({
            email,
            password,
            username: crypto.randomUUID()
        }).returning();
        return response.json(customer);
    });
    app.get('/wallets', async function(request, response) {
        const wallets = await database.select().from(tb_wallets);
        return response.json(wallets);
    });
    app.post('/transfer', async function(request, response) {
        const schema = z.object({
            sender: z.string().uuid(),
            receiver: z.string().uuid(),
            value: z.string().min(1)
        });
        const { sender, receiver, value } = await schema.parseAsync(request.body);
        await database.transaction(async (tx)=>{
            await tx.update(tb_wallets).set({
                balance: sql`CAST(${tb_wallets.balance} AS INTEGER) - ${value}`
            }).where(eq(tb_wallets.id, sender));
            await tx.update(tb_wallets).set({
                balance: sql`CAST(${tb_wallets.balance} AS INTEGER) + ${value}`
            }).where(eq(tb_wallets.id, receiver));
            return tx;
        });
        return response.end();
    });
    function gracefulShotdown() {
        server.close();
    }
    const signals = [
        'SIGINT',
        'SIGTERM'
    ];
    for (const signal of signals){
        process.on(signal, gracefulShotdown);
    }
    server.listen(7000, '0.0.0.0');
}
bootstrap();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2x1Y2lhbm8vRG93bmxvYWRzL3Rlc3RhbmRvLW8tZHJpenpsZS9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCdcbmltcG9ydCBodHRwIGZyb20gJ25vZGU6aHR0cCdcblxuaW1wb3J0IHsgc3FsLCBlcSB9IGZyb20gJ2RyaXp6bGUtb3JtJ1xuXG5pbXBvcnQgeyBkYXRhYmFzZSB9IGZyb20gJyMvZGF0YWJhc2UvZHJpenpsZS5qcydcblxuaW1wb3J0IHsgdGJfY3VzdG9tZXJzIH0gZnJvbSAnIy9kYXRhYmFzZS9zY2hlbWFzL3RiX2N1c3RvbWVycy5qcydcbmltcG9ydCB7IHRiX3dhbGxldHMgfSBmcm9tICcjL2RhdGFiYXNlL3NjaGVtYXMvdGJfd2FsbGV0cy5qcydcblxuYXN5bmMgZnVuY3Rpb24gYm9vdHN0cmFwKCkge1xuICBjb25zdCBhcHAgPSBleHByZXNzKClcbiAgY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKVxuXG4gIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpXG5cbiAgYXBwLmdldCgnL2N1c3RvbWVycy86aWQnLCBhc3luYyBmdW5jdGlvbiAocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtc1xuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGRhdGFiYXNlXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5mcm9tKHRiX2N1c3RvbWVycylcbiAgICAgIC53aGVyZShlcSh0Yl9jdXN0b21lcnMuaWQsIGlkKSlcbiAgICAgIC5saW1pdCgxKVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oZGF0YSlcbiAgfSlcblxuICBhcHAuZ2V0KCcvY3VzdG9tZXJzJywgYXN5bmMgZnVuY3Rpb24gKHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGRhdGFiYXNlLnNlbGVjdCgpLmZyb20odGJfY3VzdG9tZXJzKVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oZGF0YSlcbiAgfSlcblxuICBhcHAucG9zdCgnL2N1c3RvbWVycycsIGFzeW5jIGZ1bmN0aW9uIChyZXF1ZXN0LCByZXNwb25zZSkge1xuICAgIGNvbnN0IHNjaGVtYSA9IHoub2JqZWN0KHtcbiAgICAgIGVtYWlsOiB6LnN0cmluZygpLmVtYWlsKCksXG4gICAgICBwYXNzd29yZDogei5zdHJpbmcoKVxuICAgIH0pXG5cbiAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gYXdhaXQgc2NoZW1hLnBhcnNlQXN5bmMocmVxdWVzdC5ib2R5KVxuXG4gICAgY29uc3QgY3VzdG9tZXIgPSBhd2FpdCBkYXRhYmFzZVxuICAgICAgLmluc2VydCh0Yl9jdXN0b21lcnMpXG4gICAgICAudmFsdWVzKHtcbiAgICAgICAgZW1haWwsXG4gICAgICAgIHBhc3N3b3JkLFxuICAgICAgICB1c2VybmFtZTogY3J5cHRvLnJhbmRvbVVVSUQoKVxuICAgICAgfSlcbiAgICAgIC5yZXR1cm5pbmcoKVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oY3VzdG9tZXIpXG4gIH0pXG5cbiAgYXBwLmdldCgnL3dhbGxldHMnLCBhc3luYyBmdW5jdGlvbiAocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgICBjb25zdCB3YWxsZXRzID0gYXdhaXQgZGF0YWJhc2Uuc2VsZWN0KCkuZnJvbSh0Yl93YWxsZXRzKVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24od2FsbGV0cylcbiAgfSlcblxuICBhcHAucG9zdCgnL3RyYW5zZmVyJywgYXN5bmMgZnVuY3Rpb24gKHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gICAgY29uc3Qgc2NoZW1hID0gei5vYmplY3Qoe1xuICAgICAgc2VuZGVyOiB6LnN0cmluZygpLnV1aWQoKSxcbiAgICAgIHJlY2VpdmVyOiB6LnN0cmluZygpLnV1aWQoKSxcbiAgICAgIHZhbHVlOiB6LnN0cmluZygpLm1pbigxKVxuICAgIH0pXG5cbiAgICBjb25zdCB7IHNlbmRlciwgcmVjZWl2ZXIsIHZhbHVlIH0gPSBhd2FpdCBzY2hlbWEucGFyc2VBc3luYyhyZXF1ZXN0LmJvZHkpXG5cbiAgICBhd2FpdCBkYXRhYmFzZS50cmFuc2FjdGlvbihhc3luYyAodHgpID0+IHtcbiAgICAgIGF3YWl0IHR4XG4gICAgICAgIC51cGRhdGUodGJfd2FsbGV0cylcbiAgICAgICAgLnNldCh7XG4gICAgICAgICAgYmFsYW5jZTogc3FsYENBU1QoJHt0Yl93YWxsZXRzLmJhbGFuY2V9IEFTIElOVEVHRVIpIC0gJHt2YWx1ZX1gXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVyZShlcSh0Yl93YWxsZXRzLmlkLCBzZW5kZXIpKVxuICAgICAgYXdhaXQgdHhcbiAgICAgICAgLnVwZGF0ZSh0Yl93YWxsZXRzKVxuICAgICAgICAuc2V0KHtcbiAgICAgICAgICBiYWxhbmNlOiBzcWxgQ0FTVCgke3RiX3dhbGxldHMuYmFsYW5jZX0gQVMgSU5URUdFUikgKyAke3ZhbHVlfWBcbiAgICAgICAgfSlcbiAgICAgICAgLndoZXJlKGVxKHRiX3dhbGxldHMuaWQsIHJlY2VpdmVyKSlcblxuICAgICAgcmV0dXJuIHR4XG4gICAgfSlcblxuICAgIHJldHVybiByZXNwb25zZS5lbmQoKVxuICB9KVxuXG4gIGZ1bmN0aW9uIGdyYWNlZnVsU2hvdGRvd24oKSB7XG4gICAgc2VydmVyLmNsb3NlKClcbiAgfVxuXG4gIGNvbnN0IHNpZ25hbHMgPSBbJ1NJR0lOVCcsICdTSUdURVJNJ11cbiAgZm9yIChjb25zdCBzaWduYWwgb2Ygc2lnbmFscykge1xuICAgIHByb2Nlc3Mub24oc2lnbmFsLCBncmFjZWZ1bFNob3Rkb3duKVxuICB9XG5cbiAgc2VydmVyLmxpc3Rlbig3MDAwLCAnMC4wLjAuMCcpXG59XG5cbmJvb3RzdHJhcCgpXG4iXSwibmFtZXMiOlsiZXhwcmVzcyIsInoiLCJodHRwIiwic3FsIiwiZXEiLCJkYXRhYmFzZSIsInRiX2N1c3RvbWVycyIsInRiX3dhbGxldHMiLCJib290c3RyYXAiLCJhcHAiLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJ1c2UiLCJqc29uIiwiZ2V0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwiaWQiLCJwYXJhbXMiLCJkYXRhIiwic2VsZWN0IiwiZnJvbSIsIndoZXJlIiwibGltaXQiLCJwb3N0Iiwic2NoZW1hIiwib2JqZWN0IiwiZW1haWwiLCJzdHJpbmciLCJwYXNzd29yZCIsInBhcnNlQXN5bmMiLCJib2R5IiwiY3VzdG9tZXIiLCJpbnNlcnQiLCJ2YWx1ZXMiLCJ1c2VybmFtZSIsImNyeXB0byIsInJhbmRvbVVVSUQiLCJyZXR1cm5pbmciLCJ3YWxsZXRzIiwic2VuZGVyIiwidXVpZCIsInJlY2VpdmVyIiwidmFsdWUiLCJtaW4iLCJ0cmFuc2FjdGlvbiIsInR4IiwidXBkYXRlIiwic2V0IiwiYmFsYW5jZSIsImVuZCIsImdyYWNlZnVsU2hvdGRvd24iLCJjbG9zZSIsInNpZ25hbHMiLCJzaWduYWwiLCJwcm9jZXNzIiwib24iLCJsaXN0ZW4iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLGFBQWEsVUFBUztBQUM3QixTQUFTQyxDQUFDLFFBQVEsTUFBSztBQUN2QixPQUFPQyxVQUFVLFlBQVc7QUFFNUIsU0FBU0MsR0FBRyxFQUFFQyxFQUFFLFFBQVEsY0FBYTtBQUVyQyxTQUFTQyxRQUFRLFFBQVEsd0JBQXVCO0FBRWhELFNBQVNDLFlBQVksUUFBUSxxQ0FBb0M7QUFDakUsU0FBU0MsVUFBVSxRQUFRLG1DQUFrQztBQUU3RCxlQUFlQztJQUNiLE1BQU1DLE1BQU1UO0lBQ1osTUFBTVUsU0FBU1IsS0FBS1MsWUFBWSxDQUFDRjtJQUVqQ0EsSUFBSUcsR0FBRyxDQUFDWixRQUFRYSxJQUFJO0lBRXBCSixJQUFJSyxHQUFHLENBQUMsa0JBQWtCLGVBQWdCQyxPQUFPLEVBQUVDLFFBQVE7UUFDekQsTUFBTSxFQUFFQyxFQUFFLEVBQUUsR0FBR0YsUUFBUUcsTUFBTTtRQUU3QixNQUFNQyxPQUFPLE1B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