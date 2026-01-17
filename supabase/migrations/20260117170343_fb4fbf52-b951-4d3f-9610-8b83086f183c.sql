-- Create chat_conversations table for storing conversation sessions
CREATE TABLE public.chat_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  session_id TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat_messages table for storing messages
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create research_requests table for logging user questions
CREATE TABLE public.research_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE SET NULL,
  question TEXT NOT NULL,
  province TEXT,
  language_preference TEXT DEFAULT 'en',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create follow_up_leads table for contact form submissions
CREATE TABLE public.follow_up_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  province TEXT,
  topic TEXT,
  language_preference TEXT DEFAULT 'en',
  description TEXT,
  opt_in_research BOOLEAN DEFAULT false,
  opt_in_events BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create topic_suggestions table for user-submitted topic ideas
CREATE TABLE public.topic_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  votes INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_up_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_suggestions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chat_conversations (public access for anonymous users via session_id)
CREATE POLICY "Anyone can create conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view their own conversations by session" 
ON public.chat_conversations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update their conversations" 
ON public.chat_conversations 
FOR UPDATE 
USING (true);

-- RLS Policies for chat_messages
CREATE POLICY "Anyone can insert messages" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view messages" 
ON public.chat_messages 
FOR SELECT 
USING (true);

-- RLS Policies for research_requests (public submission)
CREATE POLICY "Anyone can submit research requests" 
ON public.research_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view research requests" 
ON public.research_requests 
FOR SELECT 
USING (true);

-- RLS Policies for follow_up_leads (public submission)
CREATE POLICY "Anyone can submit follow-up leads" 
ON public.follow_up_leads 
FOR INSERT 
WITH CHECK (true);

-- RLS Policies for topic_suggestions
CREATE POLICY "Anyone can submit topic suggestions" 
ON public.topic_suggestions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view topic suggestions" 
ON public.topic_suggestions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update topic votes" 
ON public.topic_suggestions 
FOR UPDATE 
USING (true);

-- Create indexes for performance
CREATE INDEX idx_chat_messages_conversation ON public.chat_messages(conversation_id);
CREATE INDEX idx_chat_conversations_session ON public.chat_conversations(session_id);
CREATE INDEX idx_research_requests_status ON public.research_requests(status);
CREATE INDEX idx_topic_suggestions_votes ON public.topic_suggestions(votes DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for conversation updates
CREATE TRIGGER update_chat_conversations_updated_at
BEFORE UPDATE ON public.chat_conversations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for chat messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;