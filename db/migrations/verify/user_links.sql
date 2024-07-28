-- Verify awesome-links:user_links on pg

BEGIN;

SELECT "userId", "linkId"
FROM awesomelinks.user_links_link
WHERE FALSE;

ROLLBACK;
