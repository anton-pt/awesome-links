-- Revert awesome-links:users from pg

BEGIN;

DROP INDEX IF EXISTS awesomelinks.user_email_idx;

DROP TABLE IF EXISTS awesomelinks.user;

DROP TYPE IF EXISTS awesomelinks.user_role_enum;

COMMIT;
