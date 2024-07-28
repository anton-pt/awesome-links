-- Deploy awesome-links:user_links to pg
-- requires: users
-- requires: links

BEGIN;

CREATE TABLE IF NOT EXISTS awesomelinks.user_links_link
(
    "userId" uuid NOT NULL,
    "linkId" uuid NOT NULL,
    CONSTRAINT user_links_pkey PRIMARY KEY ("userId", "linkId"),
    CONSTRAINT user_links_linkid_fkey FOREIGN KEY ("linkId")
        REFERENCES awesomelinks.link (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT user_links_userid_fkey FOREIGN KEY ("userId")
        REFERENCES awesomelinks.user (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

COMMIT;
