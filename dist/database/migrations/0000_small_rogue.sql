CREATE TABLE IF NOT EXISTS "tb_customers" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password" text,
	"username" text NOT NULL,
	"birthday" date,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "tb_customers_email_unique" UNIQUE("email"),
	CONSTRAINT "tb_customers_username_unique" UNIQUE("username")
);
