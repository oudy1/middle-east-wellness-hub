import { useState, useEffect, useCallback } from 'react';
import { supabase, getOrCreateSessionId } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const useChatSession = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { language } = useLanguage();
  const { toast } = useToast();
  // Use the canonical session ID from the Supabase client
  const sessionId = getOrCreateSessionId();

  // Load existing conversation on mount
  useEffect(() => {
    const loadConversation = async () => {
      try {
        // Find existing conversation for this session
        const { data: conversations, error: convError } = await supabase
          .from('chat_conversations')
          .select('id')
          .eq('session_id', sessionId)
          .order('created_at', { ascending: false })
          .limit(1);

        if (convError) throw convError;

        if (conversations && conversations.length > 0) {
          const convId = conversations[0].id;
          setConversationId(convId);

          // Load messages
          const { data: msgs, error: msgsError } = await supabase
            .from('chat_messages')
            .select('id, role, content')
            .eq('conversation_id', convId)
            .order('created_at', { ascending: true });

          if (msgsError) throw msgsError;

          if (msgs) {
            setMessages(msgs.filter(m => m.role !== 'system') as Message[]);
          }
        }
      } catch (error) {
        console.error('Error loading conversation:', error);
      }
    };

    loadConversation();
  }, [sessionId]);

  const createConversation = async (): Promise<string> => {
    const { data, error } = await supabase
      .from('chat_conversations')
      .insert({ session_id: sessionId, language })
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  };

  const saveMessage = async (convId: string, role: 'user' | 'assistant', content: string) => {
    await supabase
      .from('chat_messages')
      .insert({ conversation_id: convId, role, content });
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    
    // Add user message immediately
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      // Create conversation if needed
      let convId = conversationId;
      if (!convId) {
        convId = await createConversation();
        setConversationId(convId);
      }

      // Save user message
      await saveMessage(convId, 'user', content.trim());

      // Prepare messages for API (include history)
      const apiMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      // Stream response from edge function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shams-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: apiMessages, language }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get response');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      // Stream and parse response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      const assistantId = crypto.randomUUID();

      // Add empty assistant message
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

      let buffer = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process line by line
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          const line = buffer.slice(0, newlineIndex).trim();
          buffer = buffer.slice(newlineIndex + 1);

          if (line.startsWith(':') || line === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              setMessages(prev => 
                prev.map(m => 
                  m.id === assistantId 
                    ? { ...m, content: assistantContent }
                    : m
                )
              );
            }
          } catch {
            // Incomplete JSON, put back in buffer
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }

      // Save assistant message
      if (assistantContent) {
        await saveMessage(convId, 'assistant', assistantContent);
      }

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' 
          ? 'حدث خطأ. يرجى المحاولة مرة أخرى.'
          : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      // Remove the user message if there was an error
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  }, [messages, conversationId, language, isLoading, toast]);

  return {
    messages,
    isLoading,
    sendMessage,
    conversationId,
  };
};
