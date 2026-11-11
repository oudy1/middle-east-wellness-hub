import { useState, useCallback, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { searchKnowledge } from '@/lib/knowledgeIndex';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const useChatSession = () => {
  // Start fresh every time - no persistence
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  /** The user message whose answer failed, so it can be retried in place. */
  const [failedMessage, setFailedMessage] = useState<Message | null>(null);
  const { language } = useLanguage();
  const messagesRef = useRef<Message[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Stop any answer still arriving when the chat goes away.
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(async (content: string, history: Message[]) => {
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    setFailedMessage(null);
    const controller = new AbortController();
    abortRef.current = controller;
    
    // Add user message immediately
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim()
    };
    
    setMessages([...history, userMessage]);
    const assistantId = crypto.randomUUID();

    try {
      // Prepare messages for API (include history from current session only)
      const apiMessages = [...history, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      // Local retrieval: send top matching knowledge items as grounding context
      const contextResults = searchKnowledge(userMessage.content, language as 'en' | 'ar', 5);
      const context = contextResults.map(r => ({
        title: language === 'ar' ? r.item.title_ar : r.item.title_en,
        description: language === 'ar' ? r.item.description_ar : r.item.description_en,
        category: r.item.category,
        url: r.item.url,
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
          body: JSON.stringify({ messages: apiMessages, language, context }),
          signal: controller.signal,
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
      let finished = false;

      // Add empty assistant message
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

      let buffer = '';

      const handleLine = (raw: string): boolean => {
        const line = raw.trim();
        if (line === '' || line.startsWith(':') || !line.startsWith('data: ')) return true;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') {
          finished = true;
          return true;
        }
        try {
          const parsed = JSON.parse(jsonStr);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            assistantContent += delta;
            setMessages(prev =>
              prev.map(m => (m.id === assistantId ? { ...m, content: assistantContent } : m))
            );
          }
          return true;
        } catch {
          return false; // incomplete JSON, wait for more data
        }
      };

      while (!finished) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while (!finished && (newlineIndex = buffer.indexOf('\n')) !== -1) {
          const line = buffer.slice(0, newlineIndex);
          const rest = buffer.slice(newlineIndex + 1);
          if (!handleLine(line)) break;
          buffer = rest;
        }
      }
      if (finished) reader.cancel().catch(() => {});
      // Last line without a trailing newline
      if (!finished && buffer.trim()) handleLine(buffer);

      if (!assistantContent.trim()) {
        throw new Error('Empty response');
      }

    } catch (error) {
      const aborted = controller.signal.aborted;
      setMessages(prev => {
        // Drop an empty assistant bubble; keep whatever text already arrived.
        const cleaned = prev.filter(m => !(m.id === assistantId && !m.content.trim()));
        return cleaned;
      });
      if (!aborted) {
        console.error('Chat error:', error);
        // Keep the question on screen and offer "Try again" instead of losing it.
        setMessages(prev => prev.filter(m => m.id !== assistantId));
        setFailedMessage(userMessage);
      }
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setIsLoading(false);
    }
  }, [language, isLoading]);

  const sendMessage = useCallback(
    (content: string) => send(content, messagesRef.current),
    [send]
  );

  /** Re-asks the question whose answer failed. */
  const retry = useCallback(() => {
    if (!failedMessage) return;
    const history = messagesRef.current.filter(m => m.id !== failedMessage.id);
    send(failedMessage.content, history);
  }, [failedMessage, send]);

  /** Stops the answer that is still arriving; text received so far stays. */
  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  // Closing the chat starts a fresh conversation next time it opens.
  const resetConversation = useCallback(() => {
    abortRef.current?.abort();
    messagesRef.current = [];
    setMessages([]);
    setFailedMessage(null);
  }, []);

  return {
    messages,
    isLoading,
    failedMessage,
    sendMessage,
    retry,
    stop,
    resetConversation,
  };
};
