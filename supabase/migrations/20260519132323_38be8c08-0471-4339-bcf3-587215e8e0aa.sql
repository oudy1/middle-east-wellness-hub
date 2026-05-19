
CREATE TABLE public.faq_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  faq_id text NOT NULL,
  vote text NOT NULL CHECK (vote IN ('up', 'down')),
  language text DEFAULT 'en',
  session_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX faq_votes_faq_id_idx ON public.faq_votes (faq_id);

ALTER TABLE public.faq_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit faq votes"
  ON public.faq_votes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read faq votes"
  ON public.faq_votes FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.app_admins a WHERE a.user_id = auth.uid()));

CREATE POLICY "Deny anon select on faq_votes"
  ON public.faq_votes FOR SELECT
  TO anon
  USING (false);
