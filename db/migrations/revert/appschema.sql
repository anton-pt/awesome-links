-- Revert awesome-links:appschema from pg

BEGIN;

DROP SCHEMA awesomelinks;

COMMIT;
