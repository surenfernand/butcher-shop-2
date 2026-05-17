import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the newsletter-promo global table (admin-editable home newsletter section).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_newsletter_promo_placement_insert_after_blocks" AS ENUM(
        'infoSection',
        'aboutStory',
        'featuredCuts',
        'homeTestimonialShowcase',
        'artisansPromise',
        'carousel'
      );
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "newsletter_promo" (
      "id" serial PRIMARY KEY NOT NULL,
      "enabled" boolean DEFAULT true,
      "heading" varchar DEFAULT 'Mastery In Your Inbox.' NOT NULL,
      "description" varchar DEFAULT 'Join our inner circle for exclusive access to vintage reserves, masterclass invites, and seasonal provenance reports.' NOT NULL,
      "email_placeholder" varchar DEFAULT 'YOUR EMAIL ADDRESS',
      "submit_button_label" varchar DEFAULT 'SUBSCRIBE TO CRAFT',
      "success_message" varchar DEFAULT 'Thank you — you''re on the list.',
      "image_id" integer,
      "image_alt" varchar DEFAULT 'Butcher''s cleaver and sharpening steel on a wooden surface',
      "grayscale_image" boolean DEFAULT true,
      "section_background" varchar DEFAULT '#141414',
      "heading_color" varchar DEFAULT '#f8f6f3',
      "body_text_color" varchar DEFAULT '#e3ded9',
      "input_text_color" varchar DEFAULT '#f6f3ef',
      "placement_show_on_home" boolean DEFAULT true,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "newsletter_promo_placement_insert_after_blocks" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" "enum_newsletter_promo_placement_insert_after_blocks",
      "id" serial PRIMARY KEY NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "newsletter_promo_placement_insert_after_blocks"
        ADD CONSTRAINT "newsletter_promo_placement_insert_after_blocks_parent_fk"
        FOREIGN KEY ("parent_id") REFERENCES "public"."newsletter_promo"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "newsletter_promo"
        ADD CONSTRAINT "newsletter_promo_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "newsletter_promo_placement_insert_after_blocks_order_idx"
      ON "newsletter_promo_placement_insert_after_blocks" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "newsletter_promo_placement_insert_after_blocks_parent_idx"
      ON "newsletter_promo_placement_insert_after_blocks" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "newsletter_promo_image_idx"
      ON "newsletter_promo" USING btree ("image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "newsletter_promo_placement_insert_after_blocks" CASCADE;
    DROP TABLE IF EXISTS "newsletter_promo" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_newsletter_promo_placement_insert_after_blocks";
  `)
}
