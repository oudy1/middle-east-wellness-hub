import React, { Suspense, useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { lazyWithRetry } from '@/lib/lazyWithRetry';

const loadChatWindow = () => import('./ChatWindow');
const ChatWindow = lazyWithRetry(loadChatWindow);

/**
 * Chat launcher. Only the round button loads with the page; the chat window
 * (and its search knowledge) downloads the first time it is opened, or after
 * the page has settled so opening still feels instant.
 */
const ChatWidget: React.FC = () => {
  const [activated, setActivated] = useState(false);
  const { t } = useLanguage();

  // Other parts of the site (e.g. the homepage Arabic prompt) can open the chat.
  useEffect(() => {
    if (activated) return;
    const open = () => setActivated(true);
    window.addEventListener('shams-open-chat', open);
    return () => window.removeEventListener('shams-open-chat', open);
  }, [activated]);

  // Warm the download once the page is idle, without competing with first paint.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const timer = window.setTimeout(() => {
      if (w.requestIdleCallback) w.requestIdleCallback(() => void loadChatWindow());
      else void loadChatWindow();
    }, 5000);
    return () => window.clearTimeout(timer);
  }, []);

  const launcher = (
    <Button
      type="button"
      onClick={() => setActivated(true)}
      onPointerEnter={() => void loadChatWindow()}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-healthGold hover:bg-healthGold/90 shadow-lg touch-manipulation active:scale-95"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}
      aria-label={t('chatbot.openChat')}
      aria-busy={activated || undefined}
    >
      <MessageCircle className="h-6 w-6 text-healthDarkBlue" />
    </Button>
  );

  if (!activated) return launcher;
  return (
    <Suspense fallback={launcher}>
      <ChatWindow initiallyOpen />
    </Suspense>
  );
};

export default ChatWidget;
