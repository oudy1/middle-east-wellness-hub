-- Add explicit deny SELECT policy for research_requests (same pattern as follow_up_leads)
CREATE POLICY "Deny anon select on research_requests"
  ON public.research_requests
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- Add admin read access for research_requests  
CREATE POLICY "Admins can read research requests"
  ON public.research_requests
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM app_admins a WHERE a.user_id = auth.uid()
  ));

-- Revoke SELECT from anon and authenticated (belt and suspenders)
REVOKE SELECT ON public.research_requests FROM anon, authenticated;