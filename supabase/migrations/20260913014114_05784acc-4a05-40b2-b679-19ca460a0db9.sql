ALTER TABLE public.healthcare_workers
  ADD COLUMN IF NOT EXISTS verified boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS submitted_by_email text;

UPDATE public.healthcare_workers SET verified = true WHERE source IS NULL OR source <> 'self-submitted';

GRANT SELECT, INSERT ON public.healthcare_workers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.healthcare_workers TO authenticated;
GRANT ALL ON public.healthcare_workers TO service_role;

CREATE POLICY "Providers can self-submit their listing"
ON public.healthcare_workers
FOR INSERT
TO anon, authenticated
WITH CHECK (
  verified = false
  AND source = 'self-submitted'
  AND length(full_name) BETWEEN 2 AND 120
  AND length(city) BETWEEN 2 AND 80
  AND length(province) BETWEEN 2 AND 2
  AND (email IS NULL OR length(email) <= 255)
  AND (phone IS NULL OR length(phone) <= 40)
  AND (notes IS NULL OR length(notes) <= 1000)
);