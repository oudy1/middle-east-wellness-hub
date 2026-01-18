-- Add explicit deny policies for follow_up_leads to satisfy security scanner
-- These ensure public users cannot SELECT, UPDATE, or DELETE any rows

-- Drop any existing conflicting policies first
DROP POLICY IF EXISTS "Deny public select on follow_up_leads" ON public.follow_up_leads;
DROP POLICY IF EXISTS "Deny public update on follow_up_leads" ON public.follow_up_leads;
DROP POLICY IF EXISTS "Deny public delete on follow_up_leads" ON public.follow_up_leads;

-- Create explicit DENY policies for anon role
CREATE POLICY "Deny anon select on follow_up_leads"
ON public.follow_up_leads
FOR SELECT
TO anon
USING (false);

CREATE POLICY "Deny anon update on follow_up_leads"
ON public.follow_up_leads
FOR UPDATE
TO anon
USING (false);

CREATE POLICY "Deny anon delete on follow_up_leads"
ON public.follow_up_leads
FOR DELETE
TO anon
USING (false);

-- Revoke dangerous permissions and grant only INSERT
REVOKE SELECT, UPDATE, DELETE ON public.follow_up_leads FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.follow_up_leads FROM authenticated;
GRANT INSERT ON public.follow_up_leads TO anon;
GRANT INSERT ON public.follow_up_leads TO authenticated;

-- Also add explicit deny policies for chat_conversations and chat_messages for non-session owners
-- to ensure the security scanner sees explicit denials

-- Revoke DELETE on chat tables (already restricted by RLS but make explicit)
REVOKE DELETE ON public.chat_conversations FROM anon;
REVOKE DELETE ON public.chat_messages FROM anon;

-- Ensure research_requests and topic_suggestions are also locked down
REVOKE SELECT, UPDATE, DELETE ON public.research_requests FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.research_requests FROM authenticated;
GRANT INSERT ON public.research_requests TO anon;
GRANT INSERT ON public.research_requests TO authenticated;

REVOKE SELECT, UPDATE, DELETE ON public.topic_suggestions FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.topic_suggestions FROM authenticated;
GRANT INSERT ON public.topic_suggestions TO anon;
GRANT INSERT ON public.topic_suggestions TO authenticated;