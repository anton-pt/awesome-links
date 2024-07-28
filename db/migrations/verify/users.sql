-- Verify awesome-links:users on pg

BEGIN;

SELECT id, email, image, role, "createdDate", "updatedDate"
FROM awesomelinks."user"
WHERE FALSE;

SELECT 1/COUNT(*)
FROM pg_indexes
WHERE schemaname = 'awesomelinks' AND tablename = 'user' AND indexname = 'user_email_idx';

ROLLBACK;
