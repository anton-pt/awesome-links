-- Deploy awesome-links:users to pg
-- requires: appschema

BEGIN;

-- Enable the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the user_role_enum type if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_enum') THEN
        CREATE TYPE awesomelinks.user_role_enum AS ENUM ('USER', 'ADMIN');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS awesomelinks.user
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    image TEXT,
    role awesomelinks.user_role_enum NOT NULL DEFAULT 'USER'::awesomelinks.user_role_enum,
    "createdDate" TIMESTAMPTZ NOT NULL DEFAULT DATE_TRUNC('millisecond', now()),
    "updatedDate" TIMESTAMPTZ NOT NULL DEFAULT DATE_TRUNC('millisecond', now()),
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT user_email_key UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS user_email_idx
    ON awesomelinks."user" (email);

COMMIT;
