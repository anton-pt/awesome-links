-- Verify awesome-links:links on pg

BEGIN;

SELECT id, title, description, url, "imageUrl", category, "createdDate", "updatedDate"
FROM awesomelinks.link
WHERE FALSE;

SELECT 1/COUNT(*)
FROM pg_indexes
WHERE schemaname = 'awesomelinks' AND tablename = 'link' AND indexname = 'link_createdDate_id_idx';

ROLLBACK;
