CREATE TABLE IF NOT EXISTS "Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(64),
	"password" varchar(64)
);
