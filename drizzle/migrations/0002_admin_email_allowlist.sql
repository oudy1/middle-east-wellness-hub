CREATE TABLE IF NOT EXISTS public.admin_email_allowlist (
  email text PRIMARY KEY CHECK (email = lower(email)),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.admin_email_allowlist TO service_role;
ALTER TABLE public.admin_email_allowlist ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.admin_email_allowlist IS 'Emails that become SHAMS admins once their sign-in email is confirmed. Not readable by the public.';

CREATE OR REPLACE FUNCTION public.grant_allowlisted_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL
     AND EXISTS (SELECT 1 FROM public.admin_email_allowlist a WHERE a.email = lower(NEW.email))
     AND NOT EXISTS (SELECT 1 FROM public.app_admins x WHERE x.user_id = NEW.id) THEN
    INSERT INTO public.app_admins (user_id) VALUES (NEW.id);
  END IF;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'grant_allowlisted_admin failed: %', SQLERRM;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.grant_allowlisted_admin() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_confirmed_grant_admin ON auth.users;
CREATE TRIGGER on_auth_user_confirmed_grant_admin
AFTER INSERT OR UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_allowlisted_admin();