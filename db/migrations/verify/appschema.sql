-- Verify awesome-links:appschema on pg

BEGIN;

SELECT pg_catalog.has_schema_privilege('awesomelinks', 'usage');

ROLLBACK;
