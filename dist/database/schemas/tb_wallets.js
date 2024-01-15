import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { tb_customers } from "./tb_customers.js";
export const tb_wallets = pgTable('tb_wallets', {
    id: text('id').$defaultFn(()=>randomUUID()).primaryKey(),
    balance: text('balance'),
    currency: text('currency'),
    customerId: text('customer_id').references(()=>tb_customers.id, {
        onUpdate: 'cascade',
        onDelete: 'cascade'
    }).notNull(),
    updatedAt: timestamp('updated_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at')
});
relations(tb_wallets, ({ one })=>{
    return {
        customer: one(tb_customers, {
            fields: [
                tb_wallets.customerId
            ],
            references: [
                tb_customers.id
            ]
        })
    };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2x1Y2lhbm8vRG93bmxvYWRzL3Rlc3RhbmRvLW8tZHJpenpsZS9zcmMvZGF0YWJhc2Uvc2NoZW1hcy90Yl93YWxsZXRzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBnVGFibGUsIHRleHQsIHRpbWVzdGFtcCB9IGZyb20gJ2RyaXp6bGUtb3JtL3BnLWNvcmUnXG5pbXBvcnQgeyByZWxhdGlvbnMgfSBmcm9tICdkcml6emxlLW9ybSdcbmltcG9ydCB7IHJhbmRvbVVVSUQgfSBmcm9tICdub2RlOmNyeXB0bydcblxuaW1wb3J0IHsgdGJfY3VzdG9tZXJzIH0gZnJvbSAnLi90Yl9jdXN0b21lcnMuanMnXG5cbmV4cG9ydCBjb25zdCB0Yl93YWxsZXRzID0gcGdUYWJsZSgndGJfd2FsbGV0cycsIHtcbiAgaWQ6IHRleHQoJ2lkJylcbiAgICAuJGRlZmF1bHRGbigoKSA9PiByYW5kb21VVUlEKCkpXG4gICAgLnByaW1hcnlLZXkoKSxcbiAgYmFsYW5jZTogdGV4dCgnYmFsYW5jZScpLFxuICBjdXJyZW5jeTogdGV4dCgnY3VycmVuY3knKSxcbiAgY3VzdG9tZXJJZDogdGV4dCgnY3VzdG9tZXJfaWQnKVxuICAgIC5yZWZlcmVuY2VzKCgpID0+IHRiX2N1c3RvbWVycy5pZCwge1xuICAgICAgb25VcGRhdGU6ICdjYXNjYWRlJyxcbiAgICAgIG9uRGVsZXRlOiAnY2FzY2FkZSdcbiAgICB9KVxuICAgIC5ub3ROdWxsKCksXG4gIHVwZGF0ZWRBdDogdGltZXN0YW1wKCd1cGRhdGVkX2F0JyksXG4gIGNyZWF0ZWRBdDogdGltZXN0YW1wKCdjcmVhdGVkX2F0JykuZGVmYXVsdE5vdygpLm5vdE51bGwoKSxcbiAgZGVsZXRlZEF0OiB0aW1lc3RhbXAoJ2RlbGV0ZWRfYXQnKVxufSlcblxucmVsYXRpb25zKHRiX3dhbGxldHMsICh7IG9uZSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgY3VzdG9tZXI6IG9uZSh0Yl9jdXN0b21lcnMsIHtcbiAgICAgIGZpZWxkczogW3RiX3dhbGxldHMuY3VzdG9tZXJJZF0sXG4gICAgICByZWZlcmVuY2VzOiBbdGJfY3VzdG9tZXJzLmlkXVxuICAgIH0pXG4gIH1cbn0pXG4iXSwibmFtZXMiOlsicGdUYWJsZSIsInRleHQiLCJ0aW1lc3RhbXAiLCJyZWxhdGlvbnMiLCJyYW5kb21VVUlEIiwidGJfY3VzdG9tZXJzIiwidGJfd2FsbGV0cyIsImlkIiwiJGRlZmF1bHRGbiIsInByaW1hcnlLZXkiLCJiYWxhbmNlIiwiY3VycmVuY3kiLCJjdXN0b21lcklkIiwicmVmZXJlbmNlcyIsIm9uVXBkYXRlIiwib25EZWxldGUiLCJub3ROdWxsIiwidXBkYXRlZEF0IiwiY3JlYXRlZEF0IiwiZGVmYXVsdE5vdyIsImRlbGV0ZWRBdCIsIm9uZSIsImN1c3RvbWVyIiwiZmllbGRzIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxPQUFPLEVBQUVDLElBQUksRUFBRUMsU0FBUyxRQUFRLHNCQUFxQjtBQUM5RCxTQUFTQyxTQUFTLFFBQVEsY0FBYTtBQUN2QyxTQUFTQyxVQUFVLFFBQVEsY0FBYTtBQUV4QyxTQUFTQyxZQUFZLFFBQVEsb0JBQW1CO0FBRWhELE9BQU8sTUFBTUMsYUFBYU4sUUFBUSxjQUFjO0lBQzlDTyxJQUFJTixLQUFLLE1BQ05PLFVBQVUsQ0FBQyxJQUFNSixjQUNqQkssVUFBVTtJQUNiQyxTQUFTVCxLQUFLO0lBQ2RVLFVBQVVWLEtBQUs7SUFDZlcsWUFBWVgsS0FBSyxlQUNkWSxVQUFVLENBQUMsSUFBTVIsYUFBYUUsRUFBRSxFQUFFO1FBQ2pDTyxVQUFVO1FBQ1ZDLFVBQVU7SUFDWixHQUNDQyxPQUFPO0lBQ1ZDLFdBQVdmLFVBQVU7SUFDckJnQixXQUFXaEIsVUFBVSxjQUFjaUIsVUFBVSxHQUFHSCxPQUFPO0lBQ3ZESSxXQUFXbEIsVUFBVTtBQUN2QixHQUFFO0FBRUZDLFVBQVVHLFlBQVksQ0FBQyxFQUFFZSxHQUFHLEVBQUU7SUFDNUIsT0FBTztRQUNMQyxVQUFVRCxJQUFJaEIsY0FBYztZQUMxQmtCLFFBQVE7Z0JBQUNqQixXQUFXTSxVQUFVO2FBQUM7WUFDL0JDLFlBQVk7Z0JBQUNSLGFBQWFFLEVBQUU7YUFBQztRQUMvQjtJQUNGO0FBQ0YifQ==