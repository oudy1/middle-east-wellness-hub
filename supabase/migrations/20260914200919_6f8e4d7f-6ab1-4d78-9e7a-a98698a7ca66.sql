CREATE TABLE public.opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  institution text NOT NULL,
  project_title text NOT NULL,
  project_description text NOT NULL,
  preferred_background text,
  deadline date,
  is_paid text,
  study_website text,
  newsletter boolean NOT NULL DEFAULT false,
  language text NOT NULL DEFAULT 'en',
  status text NOT NULL DEFAULT 'pending',
  review_notes text,
  reviewed_by uuid,
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT opportunities_status_check CHECK (status IN ('pending','approved','rejected'))
);

GRANT SELECT, INSERT ON public.opportunities TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.opportunities TO authenticated;
GRANT ALL ON public.opportunities TO service_role;

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an opportunity"
ON public.opportunities FOR INSERT TO anon, authenticated
WITH CHECK (
  status = 'pending'
  AND reviewed_by IS NULL
  AND reviewed_at IS NULL
  AND review_notes IS NULL
  AND length(first_name) BETWEEN 1 AND 100
  AND length(last_name) BETWEEN 1 AND 100
  AND length(email) BETWEEN 3 AND 255
  AND length(institution) BETWEEN 2 AND 200
  AND length(project_title) BETWEEN 3 AND 200
  AND length(project_description) BETWEEN 10 AND 2000
  AND (phone IS NULL OR length(phone) <= 40)
  AND (preferred_background IS NULL OR length(preferred_background) <= 300)
  AND (study_website IS NULL OR length(study_website) <= 500)
);

CREATE POLICY "Public can view approved opportunities"
ON public.opportunities FOR SELECT TO anon, authenticated
USING (status = 'approved');

CREATE POLICY "Admins can view all opportunities"
ON public.opportunities FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.app_admins a WHERE a.user_id = auth.uid()));

CREATE POLICY "Admins can update opportunities"
ON public.opportunities FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.app_admins a WHERE a.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.app_admins a WHERE a.user_id = auth.uid()));

CREATE POLICY "Admins can delete opportunities"
ON public.opportunities FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.app_admins a WHERE a.user_id = auth.uid()));

CREATE TRIGGER update_opportunities_updated_at
BEFORE UPDATE ON public.opportunities
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX opportunities_status_created_idx ON public.opportunities (status, created_at DESC);