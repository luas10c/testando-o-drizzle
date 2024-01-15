import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { tb_customers } from "./schemas/tb_customers.js";
import { tb_wallets } from "./schemas/tb_wallets.js";
import { env } from "../config/env.js";
try {
    await migrate(drizzle(postgres(env.DATABASE_URL, {
        max: 1,
        debug: true,
        ssl: false
    }), {
        schema: {
            tb_customers,
            tb_wallets
        }
    }), {
        migrationsFolder: './src/database/migrations',
        migrationsTable: 'migrations'
    });
} finally{
    process.exit(1);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2x1Y2lhbm8vRG93bmxvYWRzL3Rlc3RhbmRvLW8tZHJpenpsZS9zcmMvZGF0YWJhc2UvbWlncmF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkcml6emxlIH0gZnJvbSAnZHJpenpsZS1vcm0vcG9zdGdyZXMtanMnXG5pbXBvcnQgeyBtaWdyYXRlIH0gZnJvbSAnZHJpenpsZS1vcm0vcG9zdGdyZXMtanMvbWlncmF0b3InXG5pbXBvcnQgcG9zdGdyZXMgZnJvbSAncG9zdGdyZXMnXG5cbmltcG9ydCB7IHRiX2N1c3RvbWVycyB9IGZyb20gJy4vc2NoZW1hcy90Yl9jdXN0b21lcnMuanMnXG5pbXBvcnQgeyB0Yl93YWxsZXRzIH0gZnJvbSAnLi9zY2hlbWFzL3RiX3dhbGxldHMuanMnXG5cbmltcG9ydCB7IGVudiB9IGZyb20gJyMvY29uZmlnL2Vudi5qcydcblxudHJ5IHtcbiAgYXdhaXQgbWlncmF0ZShcbiAgICBkcml6emxlKFxuICAgICAgcG9zdGdyZXMoZW52LkRBVEFCQVNFX1VSTCwge1xuICAgICAgICBtYXg6IDEsXG4gICAgICAgIGRlYnVnOiB0cnVlLFxuICAgICAgICBzc2w6IGZhbHNlXG4gICAgICB9KSxcbiAgICAgIHtcbiAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgdGJfY3VzdG9tZXJzLFxuICAgICAgICAgIHRiX3dhbGxldHNcbiAgICAgICAgfVxuICAgICAgfVxuICAgICksXG4gICAge1xuICAgICAgbWlncmF0aW9uc0ZvbGRlcjogJy4vc3JjL2RhdGFiYXNlL21pZ3JhdGlvbnMnLFxuICAgICAgbWlncmF0aW9uc1RhYmxlOiAnbWlncmF0aW9ucydcbiAgICB9XG4gIClcbn0gZmluYWxseSB7XG4gIHByb2Nlc3MuZXhpdCgxKVxufVxuIl0sIm5hbWVzIjpbImRyaXp6bGUiLCJtaWdyYXRlIiwicG9zdGdyZXMiLCJ0Yl9jdXN0b21lcnMiLCJ0Yl93YWxsZXRzIiwiZW52IiwiREFUQUJBU0VfVVJMIiwibWF4IiwiZGVidWciLCJzc2wiLCJzY2hlbWEiLCJtaWdyYXRpb25zRm9sZGVyIiwibWlncmF0aW9uc1RhYmxlIiwicHJvY2VzcyIsImV4aXQiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLE9BQU8sUUFBUSwwQkFBeUI7QUFDakQsU0FBU0MsT0FBTyxRQUFRLG1DQUFrQztBQUMxRCxPQUFPQyxjQUFjLFdBQVU7QUFFL0IsU0FBU0MsWUFBWSxRQUFRLDRCQUEyQjtBQUN4RCxTQUFTQyxVQUFVLFFBQVEsMEJBQXlCO0FBRXBELFNBQVNDLEdBQUcsUUFBUSxtQkFBaUI7QUFFckMsSUFBSTtJQUNGLE1BQU1KLFFBQ0pELFFBQ0VFLFNBQVNHLElBQUlDLFlBQVksRUFBRTtRQUN6QkMsS0FBSztRQUNMQyxPQUFPO1FBQ1BDLEtBQUs7SUFDUCxJQUNBO1FBQ0VDLFFBQVE7WUFDTlA7WUFDQUM7UUFDRjtJQUNGLElBRUY7UUFDRU8sa0JBQWtCO1FBQ2xCQyxpQkFBaUI7SUFDbkI7QUFFSixTQUFVO0lBQ1JDLFFBQVFDLElBQUksQ0FBQztBQUNmIn0=