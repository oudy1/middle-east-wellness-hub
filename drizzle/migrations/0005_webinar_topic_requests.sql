CREATE TABLE public.webinar_topic_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (length(email) BETWEEN 3 AND 255),
  topic text NOT NULL CHECK (length(topic) BETWEEN 2 AND 200),
  description text CHECK (description IS NULL OR length(description) <= 1000),
  language text NOT NULL DEFAULT 'en' CHECK (language IN ('en','ar')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.webinar_topic_requests TO authenticated;
GRANT ALL ON public.webinar_topic_requests TO service_role;
ALTER TABLE public.webinar_topic_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read topic requests" ON public.webinar_topic_requests FOR SELECT TO authenticated USING (public.is_app_admin());