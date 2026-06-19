-- Remove chat_messages from realtime publication to prevent unauthorized channel subscriptions
ALTER PUBLICATION supabase_realtime DROP TABLE public.chat_messages;

-- Add explicit admin-only SELECT policy on topic_suggestions
CREATE POLICY "Admins can read topic suggestions"
ON public.topic_suggestions
FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM public.app_admins a WHERE a.user_id = auth.uid()));

CREATE POLICY "Deny anon select on topic_suggestions"
ON public.topic_suggestions
FOR SELECT
TO anon
USING (false);