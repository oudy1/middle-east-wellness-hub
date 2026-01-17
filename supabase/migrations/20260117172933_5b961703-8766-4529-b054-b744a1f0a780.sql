-- 1) Fix chat_conversations: Remove the OR bug and tighten all policies
DROP POLICY IF EXISTS "Users can view their own conversations by session" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.chat_conversations;

-- Strict SELECT: only session owner can read
CREATE POLICY "Session owner can view conversation"
ON public.chat_conversations
FOR SELECT
TO anon, authenticated
USING (session_id = (current_setting('request.headers', true)::json ->> 'x-session-id'));

-- Strict UPDATE: only session owner can update
CREATE POLICY "Session owner can update conversation"
ON public.chat_conversations
FOR UPDATE
TO anon, authenticated
USING (session_id = (current_setting('request.headers', true)::json ->> 'x-session-id'))
WITH CHECK (session_id = (current_setting('request.headers', true)::json ->> 'x-session-id'));

-- Strict INSERT: session_id must match header (prevents spoofing)
CREATE POLICY "Session owner can create conversation"
ON public.chat_conversations
FOR INSERT
TO anon, authenticated
WITH CHECK (session_id = (current_setting('request.headers', true)::json ->> 'x-session-id'));

-- 2) Fix chat_messages: Remove USING(true) leak
DROP POLICY IF EXISTS "Users can view messages for accessible conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.chat_messages;

-- Strict SELECT: only if parent conversation belongs to session
CREATE POLICY "Session owner can view messages"
ON public.chat_messages
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.chat_conversations c
    WHERE c.id = chat_messages.conversation_id
      AND c.session_id = (current_setting('request.headers', true)::json ->> 'x-session-id')
  )
);

-- Strict INSERT: only into own conversations
CREATE POLICY "Session owner can insert messages"
ON public.chat_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.chat_conversations c
    WHERE c.id = chat_messages.conversation_id
      AND c.session_id = (current_setting('request.headers', true)::json ->> 'x-session-id')
  )
);

-- 3) Fix follow_up_leads: Ensure no SELECT, only INSERT
DROP POLICY IF EXISTS "Anyone can view follow up leads" ON public.follow_up_leads;
DROP POLICY IF EXISTS "Anyone can view research requests" ON public.follow_up_leads;
DROP POLICY IF EXISTS "Public read" ON public.follow_up_leads;

-- Revoke SELECT from public roles
REVOKE SELECT, UPDATE, DELETE ON public.follow_up_leads FROM anon, authenticated;

-- Ensure INSERT is granted
GRANT INSERT ON public.follow_up_leads TO anon, authenticated;

-- 4) Fix topic_suggestions: Remove public SELECT, keep aggregated view
DROP POLICY IF EXISTS "Allow reading for aggregation view" ON public.topic_suggestions;

-- Revoke direct SELECT
REVOKE SELECT ON public.topic_suggestions FROM anon, authenticated;

-- Grant INSERT for submissions
GRANT INSERT ON public.topic_suggestions TO anon, authenticated;