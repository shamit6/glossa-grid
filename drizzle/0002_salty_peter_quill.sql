ALTER TABLE "Translations" RENAME COLUMN "original_language" TO "from_language";--> statement-breakpoint
ALTER TABLE "Translations" RENAME COLUMN "translated_language" TO "to_language";--> statement-breakpoint
ALTER TABLE "Translations" RENAME COLUMN "original_word" TO "word";--> statement-breakpoint
ALTER TABLE "Translations" ALTER COLUMN "learning_status" SET DEFAULT 'new';