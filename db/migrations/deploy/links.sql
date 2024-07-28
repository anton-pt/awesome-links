-- Deploy awesome-links:links to pg
-- requires: appschema

BEGIN;

CREATE TABLE IF NOT EXISTS awesomelinks.link
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    category TEXT NOT NULL,
    "createdDate" TIMESTAMPTZ NOT NULL DEFAULT DATE_TRUNC('millisecond', now()),
    "updatedDate" TIMESTAMPTZ NOT NULL DEFAULT DATE_TRUNC('millisecond', now()),
    CONSTRAINT link_pkey PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS "link_createdDate_id_idx"
    ON awesomelinks.link ("createdDate", id);

COMMIT;
