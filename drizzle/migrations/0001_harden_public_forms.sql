-- 1. Lists no site form uses: close public submissions entirely (admins keep read access)
DROP POLICY IF EXISTS "Anyone can submit research requests" ON public.research_requests;
DROP POLICY IF EXISTS "Anyone can submit topic suggestions" ON public.topic_suggestions;
DROP POLICY IF EXISTS "Public can submit follow-up leads" ON public.follow_up_leads;
REVOKE INSERT, UPDATE, DELETE ON public.research_requests FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.topic_suggestions FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.follow_up_leads FROM anon, authenticated;
GRANT ALL ON public.research_requests, public.topic_suggestions, public.follow_up_leads TO service_role;

-- 2. Provider suggestions: strict input rules
DROP POLICY IF EXISTS "Public can submit provider suggestions" ON public.provider_suggestions;
REVOKE UPDATE, DELETE ON public.provider_suggestions FROM anon, authenticated;
GRANT INSERT ON public.provider_suggestions TO anon, authenticated;
GRANT ALL ON public.provider_suggestions TO service_role;
CREATE POLICY "Public can submit provider suggestions" ON public.provider_suggestions
FOR INSERT TO anon, authenticated
WITH CHECK (
  coalesce(status, 'pending') = 'pending'
  AND length(btrim(provider_name)) BETWEEN 2 AND 120
  AND length(btrim(city)) BETWEEN 2 AND 80
  AND province IN ('ON','QC','BC','AB','MB','SK','NS','NB','NL','PE','YT','NT','NU')
  AND (provider_type IS NULL OR length(provider_type) <= 80)
  AND (contact_info IS NULL OR length(contact_info) <= 200)
  AND (notes IS NULL OR length(notes) <= 1000)
  AND (submitted_by_name IS NULL OR length(submitted_by_name) <= 100)
  AND (submitted_by_email IS NULL OR submitted_by_email = '' OR (length(submitted_by_email) <= 255 AND submitted_by_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
  AND coalesce(provider_name || coalesce(contact_info,'') || coalesce(notes,''), '') !~* '(https?://|www\.)[^ ]*.*(https?://|www\.)'
);

-- Block the same provider being suggested again for the same city within a day
CREATE OR REPLACE FUNCTION public.block_duplicate_provider_suggestion()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.provider_suggestions
    WHERE lower(btrim(provider_name)) = lower(btrim(NEW.provider_name))
      AND lower(btrim(city)) = lower(btrim(NEW.city))
      AND created_at > now() - interval '24 hours'
  ) THEN
    RAISE EXCEPTION 'duplicate_suggestion' USING ERRCODE = '23505';
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_block_duplicate_provider_suggestion ON public.provider_suggestions;
CREATE TRIGGER trg_block_duplicate_provider_suggestion
BEFORE INSERT ON public.provider_suggestions
FOR EACH ROW EXECUTE FUNCTION public.block_duplicate_provider_suggestion();

-- 3. FAQ votes: strict input rules; one vote per visitor per question
DROP POLICY IF EXISTS "Public can submit faq votes" ON public.faq_votes;
REVOKE UPDATE, DELETE ON public.faq_votes FROM anon, authenticated;
GRANT INSERT ON public.faq_votes TO anon, authenticated;
GRANT ALL ON public.faq_votes TO service_role;
CREATE POLICY "Public can submit faq votes" ON public.faq_votes
FOR INSERT TO anon, authenticated
WITH CHECK (
  vote IN ('up','down')
  AND faq_id ~ '^[A-Za-z0-9_-]{1,80}$'
  AND coalesce(language, 'en') IN ('en','ar','ku','fa','tr')
  AND session_id IS NOT NULL
  AND session_id ~ '^[A-Za-z0-9-]{8,64}$'
);