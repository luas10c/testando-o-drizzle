CREATE TABLE IF NOT EXISTS "tb_wallets" (
	"id" text PRIMARY KEY NOT NULL,
	"balance" text,
	"currency" text,
	"customer_id" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);

DO $$ BEGIN
 ALTER TABLE "tb_wallets" ADD CONSTRAINT "tb_wallets_customer_id_tb_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "tb_customers"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
