DROP POLICY IF EXISTS "Session owner can create conversation" ON public.chat_conversations;
DROP POLICY IF EXISTS "Session owner can update conversation" ON public.chat_conversations;
DROP POLICY IF EXISTS "Session owner can view conversation" ON public.chat_conversations;
DROP POLICY IF EXISTS "Session owner can insert messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Session owner can view messages" ON public.chat_messages;
REVOKE ALL ON public.chat_conversations FROM anon;
REVOKE ALL ON public.chat_messages FROM anon;
GRANT SELECT ON public.chat_conversations TO authenticated;
GRANT SELECT ON public.chat_messages TO authenticated;
GRANT ALL ON public.chat_conversations TO service_role;
GRANT ALL ON public.chat_messages TO service_role;
CREATE POLICY "Admins can read conversations" ON public.chat_conversations FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.app_admins a WHERE a.user_id = auth.uid()));
CREATE POLICY "Admins can read chat messages" ON public.chat_messages FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.app_admins a WHERE a.user_id = auth.uid()));