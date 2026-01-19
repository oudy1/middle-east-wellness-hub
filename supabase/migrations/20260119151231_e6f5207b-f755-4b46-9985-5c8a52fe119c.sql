-- Create healthcare_workers table for city-based directory
CREATE TABLE public.healthcare_workers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  provider_type TEXT NOT NULL DEFAULT 'Family Physician',
  specialty TEXT,
  languages TEXT[] DEFAULT ARRAY['English']::TEXT[],
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  clinic_name TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  address TEXT,
  accepting_new_patients BOOLEAN DEFAULT false,
  virtual_available BOOLEAN DEFAULT false,
  notes TEXT,
  source TEXT,
  last_verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.healthcare_workers ENABLE ROW LEVEL SECURITY;

-- Public can read the directory (it's meant to be browsable)
CREATE POLICY "Public can view healthcare workers"
  ON public.healthcare_workers
  FOR SELECT
  USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can insert healthcare workers"
  ON public.healthcare_workers
  FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM app_admins WHERE user_id = auth.uid()));

CREATE POLICY "Admins can update healthcare workers"
  ON public.healthcare_workers
  FOR UPDATE
  USING (EXISTS (SELECT 1 FROM app_admins WHERE user_id = auth.uid()));

CREATE POLICY "Admins can delete healthcare workers"
  ON public.healthcare_workers
  FOR DELETE
  USING (EXISTS (SELECT 1 FROM app_admins WHERE user_id = auth.uid()));

-- Create index for common search patterns
CREATE INDEX idx_healthcare_workers_city_province ON public.healthcare_workers(city, province);
CREATE INDEX idx_healthcare_workers_languages ON public.healthcare_workers USING GIN(languages);

-- Create provider_suggestions table for users to suggest new providers
CREATE TABLE public.provider_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_name TEXT NOT NULL,
  provider_type TEXT,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  contact_info TEXT,
  notes TEXT,
  submitted_by_email TEXT,
  submitted_by_name TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.provider_suggestions ENABLE ROW LEVEL SECURITY;

-- Public can submit suggestions
CREATE POLICY "Public can submit provider suggestions"
  ON public.provider_suggestions
  FOR INSERT
  WITH CHECK (true);

-- Block public from reading/updating/deleting
CREATE POLICY "Deny public select on provider suggestions"
  ON public.provider_suggestions
  FOR SELECT
  USING (false);

-- Admins can read suggestions
CREATE POLICY "Admins can view provider suggestions"
  ON public.provider_suggestions
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM app_admins WHERE user_id = auth.uid()));