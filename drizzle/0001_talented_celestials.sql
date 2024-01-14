CREATE TABLE IF NOT EXISTS "Translations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"original_language" varchar(32) DEFAULT 'en',
	"translated_language" varchar(32) DEFAULT 'he',
	"original_word" varchar(64),
	"translated_word" varchar(64),
	"translated_word_description" text,
	"translated_word_example" text,
	"learning_status" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Translations" ADD CONSTRAINT "Translations_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
