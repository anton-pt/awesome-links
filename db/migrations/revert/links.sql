-- Revert awesome-links:links from pg

BEGIN;

DROP INDEX IF EXISTS awesomelinks.link_createdDate_id_idx;

DROP TABLE IF EXISTS awesomelinks.link;

COMMIT;
