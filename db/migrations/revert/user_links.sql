-- Revert awesome-links:user_links from pg

BEGIN;

DROP TABLE IF EXISTS awesomelinks.user_links_link;

COMMIT;
