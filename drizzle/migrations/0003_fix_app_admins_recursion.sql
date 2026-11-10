DROP POLICY IF EXISTS "Admins can read admin list" ON public.app_admins;
GRANT SELECT ON public.app_admins TO authenticated;
GRANT ALL ON public.app_admins TO service_role;
CREATE POLICY "Users can see their own admin row" ON public.app_admins
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());