-- Clean up any pre-existing duplicates first so the unique index can be created
DELETE FROM public.faq_votes a
USING public.faq_votes b
WHERE a.ctid < b.ctid
  AND a.faq_id = b.faq_id
  AND a.session_id IS NOT NULL
  AND b.session_id IS NOT NULL
  AND a.session_id = b.session_id;

-- Enforce one vote per session per FAQ item (only when session_id is present)
CREATE UNIQUE INDEX IF NOT EXISTS faq_votes_unique_session_faq
  ON public.faq_votes (faq_id, session_id)
  WHERE session_id IS NOT NULL;