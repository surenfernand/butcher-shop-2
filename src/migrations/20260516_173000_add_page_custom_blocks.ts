import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds page block tables introduced after initial deploy (artisansPromise, contactPage, etc.).
 * Safe to run on databases that already have the core `pages` schema.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_artisans_promise_items_icon" AS ENUM('utensils', 'badge', 'heartHandshake', 'knife', 'shoppingBag', 'truck');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_contact_page_contact_details_icon" AS ENUM('map-pin', 'phone', 'mail');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_artisans_promise_items_icon" AS ENUM('utensils', 'badge', 'heartHandshake', 'knife', 'shoppingBag', 'truck');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_contact_page_contact_details_icon" AS ENUM('map-pin', 'phone', 'mail');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_artisans_promise_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" "enum_pages_blocks_artisans_promise_items_icon" DEFAULT 'utensils',
      "title" varchar,
      "description" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_artisans_promise" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'The Artisan''s Promise',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_page_stats" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_page_store_hours" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "day" varchar,
      "time" varchar,
      "highlight" boolean
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_page_contact_details" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" "enum_pages_blocks_contact_page_contact_details_icon" DEFAULT 'map-pin',
      "text" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_page" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "hero_eyebrow" varchar,
      "hero_title" varchar,
      "hero_description" varchar,
      "hero_background_image_id" integer,
      "story_eyebrow" varchar,
      "story_title" varchar,
      "story_body" varchar,
      "story_image_id" integer,
      "form_title" varchar,
      "form_description" varchar,
      "form_id" integer,
      "hours_title" varchar,
      "visit_title" varchar,
      "map_image_id" integer,
      "map_label" varchar,
      "map_embed_url" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_about_editable_standards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "body" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_about_editable_features" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "body" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_about_editable_partners" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_about_editable" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "quote" varchar,
      "hero_image_id" integer,
      "heritage_eyebrow" varchar,
      "heritage_title" varchar,
      "heritage_body" varchar,
      "heritage_image_one_id" integer,
      "heritage_image_two_id" integer,
      "standards_eyebrow" varchar,
      "standards_title" varchar,
      "standards_body" varchar,
      "butchers_image_id" integer,
      "age_badge" varchar,
      "butchers_eyebrow" varchar,
      "butchers_title" varchar,
      "butchers_body" varchar,
      "partners_eyebrow" varchar,
      "partners_title" varchar,
      "cta_title" varchar,
      "cta_body" varchar,
      "primary_button_label" varchar,
      "primary_button_url" varchar,
      "secondary_button_label" varchar,
      "secondary_button_url" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_architects_of_flavor_team" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer,
      "name" varchar,
      "role" varchar,
      "description" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_architects_of_flavor" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "subtitle" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_about_heritage_showcase_foundations" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_about_heritage_showcase" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "hero_title" varchar,
      "hero_subtitle" varchar,
      "hero_image_id" integer,
      "story_eyebrow" varchar,
      "story_title" varchar,
      "story_body" varchar,
      "primary_button_label" varchar,
      "primary_button_url" varchar,
      "secondary_button_label" varchar,
      "secondary_button_url" varchar,
      "story_image_id" integer,
      "story_image_badge" varchar,
      "foundations_title" varchar,
      "sustainability_eyebrow" varchar,
      "sustainability_title" varchar,
      "sustainability_body" varchar,
      "sustainability_cta_label" varchar,
      "sustainability_cta_url" varchar,
      "sustainability_stat_value" varchar,
      "sustainability_stat_label" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_home_testimonial_showcase_testimonials" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "quote" varchar,
      "author_name" varchar,
      "author_role" varchar,
      "author_avatar_id" integer
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_home_testimonial_showcase" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "section_background" varchar,
      "top_decor_image_id" integer,
      "bottom_decor_image_id" integer,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_artisans_promise_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "icon" "enum__pages_v_blocks_artisans_promise_items_icon" DEFAULT 'utensils',
      "title" varchar,
      "description" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_artisans_promise" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "heading" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_page_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_page_store_hours" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "day" varchar,
      "time" varchar,
      "highlight" boolean,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_page_contact_details" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "icon" "enum__pages_v_blocks_contact_page_contact_details_icon" DEFAULT 'map-pin',
      "text" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_page" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "hero_eyebrow" varchar,
      "hero_title" varchar,
      "hero_description" varchar,
      "hero_background_image_id" integer,
      "story_eyebrow" varchar,
      "story_title" varchar,
      "story_body" varchar,
      "story_image_id" integer,
      "form_title" varchar,
      "form_description" varchar,
      "form_id" integer,
      "hours_title" varchar,
      "visit_title" varchar,
      "map_image_id" integer,
      "map_label" varchar,
      "map_embed_url" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_editable_standards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "body" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_editable_features" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "body" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_editable_partners" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_editable" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "quote" varchar,
      "hero_image_id" integer,
      "heritage_eyebrow" varchar,
      "heritage_title" varchar,
      "heritage_body" varchar,
      "heritage_image_one_id" integer,
      "heritage_image_two_id" integer,
      "standards_eyebrow" varchar,
      "standards_title" varchar,
      "standards_body" varchar,
      "butchers_image_id" integer,
      "age_badge" varchar,
      "butchers_eyebrow" varchar,
      "butchers_title" varchar,
      "butchers_body" varchar,
      "partners_eyebrow" varchar,
      "partners_title" varchar,
      "cta_title" varchar,
      "cta_body" varchar,
      "primary_button_label" varchar,
      "primary_button_url" varchar,
      "secondary_button_label" varchar,
      "secondary_button_url" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_architects_of_flavor_team" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "image_id" integer,
      "name" varchar,
      "role" varchar,
      "description" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_architects_of_flavor" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "subtitle" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_heritage_showcase_foundations" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_heritage_showcase" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "hero_title" varchar,
      "hero_subtitle" varchar,
      "hero_image_id" integer,
      "story_eyebrow" varchar,
      "story_title" varchar,
      "story_body" varchar,
      "primary_button_label" varchar,
      "primary_button_url" varchar,
      "secondary_button_label" varchar,
      "secondary_button_url" varchar,
      "story_image_id" integer,
      "story_image_badge" varchar,
      "foundations_title" varchar,
      "sustainability_eyebrow" varchar,
      "sustainability_title" varchar,
      "sustainability_body" varchar,
      "sustainability_cta_label" varchar,
      "sustainability_cta_url" varchar,
      "sustainability_stat_value" varchar,
      "sustainability_stat_label" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_home_testimonial_showcase_testimonials" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "quote" varchar,
      "author_name" varchar,
      "author_role" varchar,
      "author_avatar_id" integer,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_home_testimonial_showcase" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "section_background" varchar,
      "top_decor_image_id" integer,
      "bottom_decor_image_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_artisans_promise_items" ADD CONSTRAINT "pages_blocks_artisans_promise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_artisans_promise"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_artisans_promise" ADD CONSTRAINT "pages_blocks_artisans_promise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_artisans_promise_items" ADD CONSTRAINT "_pages_v_blocks_artisans_promise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_artisans_promise"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_artisans_promise" ADD CONSTRAINT "_pages_v_blocks_artisans_promise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "pages_blocks_artisans_promise_items_order_idx" ON "pages_blocks_artisans_promise_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_artisans_promise_items_parent_id_idx" ON "pages_blocks_artisans_promise_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_artisans_promise_order_idx" ON "pages_blocks_artisans_promise" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_artisans_promise_parent_id_idx" ON "pages_blocks_artisans_promise" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_artisans_promise_path_idx" ON "pages_blocks_artisans_promise" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_artisans_promise_items_order_idx" ON "_pages_v_blocks_artisans_promise_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_artisans_promise_items_parent_id_idx" ON "_pages_v_blocks_artisans_promise_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_artisans_promise_order_idx" ON "_pages_v_blocks_artisans_promise" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_artisans_promise_parent_id_idx" ON "_pages_v_blocks_artisans_promise" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_artisans_promise_path_idx" ON "_pages_v_blocks_artisans_promise" USING btree ("_path");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_pages_v_blocks_home_testimonial_showcase_testimonials" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_home_testimonial_showcase" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_about_heritage_showcase_foundations" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_about_heritage_showcase" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_architects_of_flavor_team" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_architects_of_flavor" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_about_editable_partners" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_about_editable_features" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_about_editable_standards" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_about_editable" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_page_contact_details" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_page_store_hours" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_page_stats" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_page" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_artisans_promise_items" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_artisans_promise" CASCADE;

    DROP TABLE IF EXISTS "pages_blocks_home_testimonial_showcase_testimonials" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_home_testimonial_showcase" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_about_heritage_showcase_foundations" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_about_heritage_showcase" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_architects_of_flavor_team" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_architects_of_flavor" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_about_editable_partners" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_about_editable_features" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_about_editable_standards" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_about_editable" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_contact_page_contact_details" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_contact_page_store_hours" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_contact_page_stats" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_contact_page" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_artisans_promise_items" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_artisans_promise" CASCADE;

    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_contact_page_contact_details_icon";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_artisans_promise_items_icon";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_contact_page_contact_details_icon";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_artisans_promise_items_icon";
  `)
}
