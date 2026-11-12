-- 1. Status columns on listings
ALTER TABLE public.healthcare_workers
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending_review',
  ADD COLUMN IF NOT EXISTS status_changed_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS published_at timestamptz,
  ADD COLUMN IF NOT EXISTS needs_reverification boolean NOT NULL DEFAULT false;

ALTER TABLE public.healthcare_workers
  ADD CONSTRAINT healthcare_workers_status_check
  CHECK (status IN ('draft','pending_review','approved','published','rejected','needs_correction','archived'));

-- Existing verified listings stay public; anything else waits for review.
UPDATE public.healthcare_workers
SET status = CASE WHEN verified THEN 'published' ELSE 'pending_review' END,
    published_at = CASE WHEN verified THEN coalesce(last_verified_at, created_at) ELSE NULL END,
    status_changed_at = now();

-- 2. Private review details (admins only)
CREATE TABLE public.healthcare_worker_reviews (
  worker_id uuid PRIMARY KEY,
  submitted_by_email text,
  applicant_notes text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  review_notes text,
  reverify_reason text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.healthcare_worker_reviews TO authenticated;
GRANT ALL ON public.healthcare_worker_reviews TO service_role;
ALTER TABLE public.healthcare_worker_reviews ENABLE ROW LEVEL SECURITY;

-- 3. Change history (admins only, written by triggers)
CREATE TABLE public.healthcare_worker_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id uuid NOT NULL,
  changed_at timestamptz NOT NULL DEFAULT now(),
  changed_by uuid,
  action text NOT NULL,
  old_status text,
  new_status text,
  changed_fields text[],
  details jsonb
);
CREATE INDEX healthcare_worker_history_worker_idx ON public.healthcare_worker_history (worker_id, changed_at DESC);
GRANT SELECT ON public.healthcare_worker_history TO authenticated;
GRANT ALL ON public.healthcare_worker_history TO service_role;
ALTER TABLE public.healthcare_worker_history ENABLE ROW LEVEL SECURITY;

-- Move any existing private details off the public table
INSERT INTO public.healthcare_worker_reviews (worker_id, submitted_by_email, reviewed_at)
SELECT id, submitted_by_email, CASE WHEN verified THEN last_verified_at END FROM public.healthcare_workers
ON CONFLICT (worker_id) DO NOTHING;
UPDATE public.healthcare_workers SET submitted_by_email = NULL WHERE submitted_by_email IS NOT NULL;

-- 4. Admin check
CREATE OR REPLACE FUNCTION public.is_app_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.app_admins WHERE user_id = auth.uid()) $$;
REVOKE EXECUTE ON FUNCTION public.is_app_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_app_admin() TO anon, authenticated, service_role;

-- 5. Guard every write: visitors can only submit for review; status changes are recorded.
CREATE OR REPLACE FUNCTION public.healthcare_workers_guard()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _role text := coalesce(nullif(current_setting('request.jwt.claim.role', true), ''),
                         nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role', '');
  _trusted boolean := (_role NOT IN ('anon', 'authenticated')) OR public.is_app_admin();
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NOT _trusted THEN
      IF NEW.status IS DISTINCT FROM 'pending_review' OR NEW.verified OR NEW.needs_reverification
         OR NEW.published_at IS NOT NULL OR NEW.last_verified_at IS NOT NULL THEN
        RAISE EXCEPTION 'New listings must wait for SHAMS review' USING ERRCODE = '42501';
      END IF;
      IF length(coalesce(NEW.submitted_by_email, '')) > 255 OR length(coalesce(NEW.notes, '')) > 1000 THEN
        RAISE EXCEPTION 'Submission too long' USING ERRCODE = '22001';
      END IF;
      INSERT INTO public.healthcare_worker_reviews (worker_id, submitted_by_email, applicant_notes)
      VALUES (NEW.id, NEW.submitted_by_email, NEW.notes);
      NEW.notes := NULL;
    ELSE
      INSERT INTO public.healthcare_worker_reviews (worker_id, submitted_by_email)
      VALUES (NEW.id, NEW.submitted_by_email)
      ON CONFLICT (worker_id) DO NOTHING;
    END IF;
    NEW.submitted_by_email := NULL;
    NEW.status_changed_at := now();
    IF NEW.status = 'published' THEN NEW.published_at := coalesce(NEW.published_at, now()); END IF;
    NEW.verified := NEW.status IN ('approved', 'published');
    RETURN NEW;
  END IF;

  -- UPDATE
  IF NOT _trusted THEN
    RAISE EXCEPTION 'Only SHAMS administrators can change listings' USING ERRCODE = '42501';
  END IF;

  IF NEW.submitted_by_email IS NOT NULL THEN
    INSERT INTO public.healthcare_worker_reviews (worker_id, submitted_by_email)
    VALUES (NEW.id, NEW.submitted_by_email)
    ON CONFLICT (worker_id) DO UPDATE SET submitted_by_email = excluded.submitted_by_email, updated_at = now();
    NEW.submitted_by_email := NULL;
  END IF;

  IF NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.status_changed_at := now();
    IF NEW.status IN ('approved', 'published') AND OLD.status NOT IN ('approved', 'published') THEN
      NEW.last_verified_at := now();
      NEW.needs_reverification := false;
    END IF;
    IF NEW.status = 'published' THEN NEW.published_at := now(); END IF;
    INSERT INTO public.healthcare_worker_reviews (worker_id, reviewed_by, reviewed_at)
    VALUES (NEW.id, auth.uid(), now())
    ON CONFLICT (worker_id) DO UPDATE
      SET reviewed_by = excluded.reviewed_by, reviewed_at = excluded.reviewed_at, updated_at = now();
  ELSIF OLD.needs_reverification AND NOT NEW.needs_reverification THEN
    NEW.last_verified_at := now();
    INSERT INTO public.healthcare_worker_reviews (worker_id, reviewed_by, reviewed_at)
    VALUES (NEW.id, auth.uid(), now())
    ON CONFLICT (worker_id) DO UPDATE
      SET reviewed_by = excluded.reviewed_by, reviewed_at = excluded.reviewed_at, updated_at = now();
  END IF;

  NEW.verified := NEW.status IN ('approved', 'published');
  RETURN NEW;
END;
$$;

CREATE TRIGGER healthcare_workers_guard
BEFORE INSERT OR UPDATE ON public.healthcare_workers
FOR EACH ROW EXECUTE FUNCTION public.healthcare_workers_guard();

-- 6. History of significant changes
CREATE OR REPLACE FUNCTION public.healthcare_workers_log()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _fields text[];
  _action text;
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.healthcare_worker_history (worker_id, changed_by, action, new_status)
    VALUES (NEW.id, auth.uid(), 'created', NEW.status);
    RETURN NULL;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.healthcare_worker_history (worker_id, changed_by, action, old_status, details)
    VALUES (OLD.id, auth.uid(), 'deleted', OLD.status,
            jsonb_build_object('full_name', OLD.full_name, 'city', OLD.city, 'province', OLD.province));
    DELETE FROM public.healthcare_worker_reviews WHERE worker_id = OLD.id;
    RETURN NULL;
  END IF;

  SELECT array_agg(n.key ORDER BY n.key) INTO _fields
  FROM jsonb_each(to_jsonb(NEW)) n
  WHERE n.value IS DISTINCT FROM (to_jsonb(OLD) -> n.key)
    AND n.key NOT IN ('status_changed_at', 'verified', 'last_verified_at', 'published_at', 'submitted_by_email');

  IF NEW.status IS DISTINCT FROM OLD.status THEN
    _action := 'status_changed';
  ELSIF NEW.needs_reverification IS DISTINCT FROM OLD.needs_reverification THEN
    _action := CASE WHEN NEW.needs_reverification THEN 'flagged_for_reverification' ELSE 'reverified' END;
  ELSIF _fields IS NOT NULL THEN
    _action := 'edited';
  ELSE
    RETURN NULL;
  END IF;

  INSERT INTO public.healthcare_worker_history (worker_id, changed_by, action, old_status, new_status, changed_fields)
  VALUES (NEW.id, auth.uid(), _action, OLD.status, NEW.status, _fields);
  RETURN NULL;
END;
$$;

CREATE TRIGGER healthcare_workers_log
AFTER INSERT OR UPDATE OR DELETE ON public.healthcare_workers
FOR EACH ROW EXECUTE FUNCTION public.healthcare_workers_log();

REVOKE EXECUTE ON FUNCTION public.healthcare_workers_guard() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.healthcare_workers_log() FROM PUBLIC, anon, authenticated;

-- 7. Only one published listing per person, city and provider type
CREATE UNIQUE INDEX healthcare_workers_one_published
ON public.healthcare_workers (lower(btrim(full_name)), lower(btrim(city)), province, provider_type)
WHERE status = 'published';

-- 8. Access rules
GRANT SELECT, INSERT ON public.healthcare_workers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.healthcare_workers TO authenticated;
GRANT ALL ON public.healthcare_workers TO service_role;

DROP POLICY IF EXISTS "Public can view healthcare workers" ON public.healthcare_workers;
DROP POLICY IF EXISTS "Admins can insert healthcare workers" ON public.healthcare_workers;
DROP POLICY IF EXISTS "Admins can update healthcare workers" ON public.healthcare_workers;
DROP POLICY IF EXISTS "Admins can delete healthcare workers" ON public.healthcare_workers;
DROP POLICY IF EXISTS "Providers can self-submit their listing" ON public.healthcare_workers;

CREATE POLICY "Public can view published healthcare workers"
ON public.healthcare_workers FOR SELECT TO anon, authenticated
USING (status = 'published');

CREATE POLICY "Admins can view all healthcare workers"
ON public.healthcare_workers FOR SELECT TO authenticated
USING (public.is_app_admin());

CREATE POLICY "Admins can insert healthcare workers"
ON public.healthcare_workers FOR INSERT TO authenticated
WITH CHECK (public.is_app_admin());

CREATE POLICY "Admins can update healthcare workers"
ON public.healthcare_workers FOR UPDATE TO authenticated
USING (public.is_app_admin()) WITH CHECK (public.is_app_admin());

CREATE POLICY "Admins can delete healthcare workers"
ON public.healthcare_workers FOR DELETE TO authenticated
USING (public.is_app_admin());

CREATE POLICY "Providers can self-submit their listing"
ON public.healthcare_workers FOR INSERT TO anon, authenticated
WITH CHECK (
  status = 'pending_review'
  AND verified = false
  AND needs_reverification = false
  AND published_at IS NULL
  AND last_verified_at IS NULL
  AND source = 'self-submitted'
  AND length(full_name) BETWEEN 2 AND 120
  AND length(city) BETWEEN 2 AND 80
  AND length(province) = 2
  AND (email IS NULL OR length(email) <= 255)
  AND (phone IS NULL OR length(phone) <= 40)
  AND (website IS NULL OR length(website) <= 500)
  AND (address IS NULL OR length(address) <= 300)
  AND (clinic_name IS NULL OR length(clinic_name) <= 200)
  AND (specialty IS NULL OR length(specialty) <= 120)
  AND (notes IS NULL OR length(notes) <= 1000)
);

CREATE POLICY "Admins can view listing reviews"
ON public.healthcare_worker_reviews FOR SELECT TO authenticated
USING (public.is_app_admin());

CREATE POLICY "Admins can update listing reviews"
ON public.healthcare_worker_reviews FOR UPDATE TO authenticated
USING (public.is_app_admin()) WITH CHECK (public.is_app_admin());

CREATE POLICY "Admins can view listing history"
ON public.healthcare_worker_history FOR SELECT TO authenticated
USING (public.is_app_admin());
