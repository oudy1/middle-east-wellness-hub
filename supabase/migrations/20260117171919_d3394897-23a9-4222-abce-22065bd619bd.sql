-- Fix SECURITY DEFINER view issue - use security_invoker instead
DROP VIEW IF EXISTS public.topic_leaderboard;

CREATE VIEW public.topic_leaderboard 
WITH (security_invoker = on) AS
SELECT topic, language, SUM(votes) as total_votes, COUNT(*) as suggestion_count
FROM public.topic_suggestions
GROUP BY topic, language
ORDER BY total_votes DESC;

-- Need to create a policy for topic_suggestions SELECT so the view works
CREATE POLICY "Allow reading for aggregation view" 
ON public.topic_suggestions 
FOR SELECT 
USING (true);

-- Grant select on the view to public
GRANT SELECT ON public.topic_leaderboard TO anon, authenticated;