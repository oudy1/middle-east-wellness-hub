import { useState, useCallback, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { searchKnowledge } from '@/lib/knowledgeIndex';
import { instantAnswer, offlineFallback, replyLanguage, type InstantIntent } from '@/lib/chatInstantAnswers';
import { isApprovedInternalUrl } from '@/lib/chatbotRoutes';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  /**
   * Where an assistant answer came from: the AI service, an instant answer
   * worked out in the browser, or the offline fallback shown when the AI fails.
   */
  origin?: 'ai' | 'instant' | 'fallback';
  instantIntent?: InstantIntent;
}

type Message = ChatMessage;

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
    
    const assistantId = crypto.randomUUID();

    // Simple questions (and every safety message) get an instant, verified
    // answer without calling the AI service.
    const last = history[history.length - 1];
    const previousIntent = last?.role === 'assistant' ? last.instantIntent ?? null : null;
    const instant = instantAnswer(userMessage.content, language === 'ar' ? 'ar' : 'en', previousIntent);
    if (instant) {
      setMessages([
        ...history,
        userMessage,
        { id: assistantId, role: 'assistant', content: instant.text, origin: 'instant', instantIntent: instant.intent },
      ]);
      setIsLoading(false);
      if (abortRef.current === controller) abortRef.current = null;
      return;
    }

    setMessages([...history, userMessage]);

    try {
      // Prepare messages for API (include history from current session only)
      const apiMessages = [...history, userMessage].filter(m => m.origin !== 'fallback').map(m => ({
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
              prev.map(m => (m.id === assistantId ? { ...m, content: assistantContent, origin: 'ai' } : m))
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
      const fbLang = replyLanguage(userMessage.content, language === 'ar' ? 'ar' : 'en');
      const fbResults = searchKnowledge(userMessage.content, fbLang, 2);
      // Only offer pages that match nearly as well as the best one.
      const fbTop = fbResults[0]?.score ?? 0;
      const contextForFallback = fbResults.filter(r => r.score >= fbTop * 0.6).map(r => ({
        title: fbLang === 'ar' ? r.item.title_ar : r.item.title_en,
        url: r.item.url,
      }));
      setMessages(prev => {
        // Drop an empty assistant bubble; keep whatever text already arrived.
        const cleaned = prev.filter(m => !(m.id === assistantId && !m.content.trim()));
        return cleaned;
      });
      if (!aborted) {
        console.error('Chat error:', error);
        // Keep the question on screen, show the best matching verified pages,
        // and offer "Try again" instead of losing it.
        const fallbackLinks = contextForFallback
          .filter(c => c.url && isApprovedInternalUrl(c.url))
          .map(c => ({ label: c.title ?? c.url!, url: c.url! }));
        setMessages(prev => [
          ...prev.filter(m => m.id !== assistantId),
          { id: crypto.randomUUID(), role: 'assistant', content: offlineFallback(fbLang, fallbackLinks), origin: 'fallback' },
        ]);
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
    const history = messagesRef.current.filter(m => m.id !== failedMessage.id && m.origin !== 'fallback');
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
