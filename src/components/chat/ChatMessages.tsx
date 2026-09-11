import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatSafetyFooter } from './ChatSafetyFooter';
import {
  isApprovedInternalUrl,
  isMailtoOrTel,
  isSafeExternalUrl,
  parentRoute,
} from '@/lib/chatbotRoutes';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onNavigate?: () => void; // Callback to close chat on navigation
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading, onNavigate }) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [navError, setNavError] = useState<{ message: string; fallback: string } | null>(null);

  // Check if last message contains emergency keywords
  const hasEmergencyContent = (content: string): boolean => {
    const emergencyKeywords = [
      'suicide', 'kill myself', 'end my life', 'want to die',
      'انتحار', 'أريد الموت', 'أنهي حياتي', 'اقتل نفسي',
      'emergency', 'طوارئ', '911', 'crisis', 'أزمة'
    ];
    const lowerContent = content.toLowerCase();
    return emergencyKeywords.some(keyword => lowerContent.includes(keyword.toLowerCase()));
  };

  const lastMessage = messages[messages.length - 1];
  const showEmergencyBanner = lastMessage && hasEmergencyContent(lastMessage.content);

  const navErrorText = language === 'ar'
    ? 'عذراً، لم نتمكن من فتح هذه الصفحة. جرّب القسم الرئيسي بدلاً من ذلك.'
    : 'Sorry, that page could not be opened. Try the main section instead.';

  // Internal navigation: close chat first, then route with React Router.
  const handleInternalNavigation = useCallback((url: string) => {
    if (!isApprovedInternalUrl(url)) {
      console.warn('[chatbot] blocked navigation to unapproved route:', url);
      setNavError({ message: navErrorText, fallback: parentRoute(url) });
      return;
    }

    setNavError(null);
    // Close the chat window first so it never covers the destination (mobile).
    onNavigate?.();

    // Let the close state flush, then navigate client-side.
    setTimeout(() => {
      try {
        navigate(url);
      } catch (err) {
        console.error('[chatbot] navigation failed for route:', url, err);
        setNavError({ message: navErrorText, fallback: parentRoute(url) });
      }
    }, 50);
  }, [navigate, onNavigate, navErrorText]);

  // Mail / phone actions stay outside the router.
  const handleMailtoNavigation = useCallback((url: string) => {
    window.location.href = url;
  }, []);

  // External links always open in a new tab.
  const handleExternalNavigation = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Parse message content for links and navigation buttons
  const formatContent = (content: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    let match;
    let buttonCount = 0;
    const buttons: React.ReactElement[] = [];

    const internalClasses = "text-xs min-h-[44px] px-4 py-2 bg-white hover:bg-healthGold/20 border-healthGold/40 text-healthDarkBlue hover:border-healthGold transition-colors touch-manipulation active:scale-95 select-none cursor-pointer z-10";
    const externalClasses = "text-xs min-h-[44px] px-4 py-2 bg-white hover:bg-healthTeal/10 border-healthTeal/30 text-healthDarkBlue hover:border-healthTeal transition-colors touch-manipulation active:scale-95 select-none cursor-pointer z-10";

    while ((match = linkRegex.exec(content)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        const textBefore = content.slice(lastIndex, match.index);
        if (textBefore.trim()) {
          parts.push(textBefore);
        }
      }

      const linkText = match[1];
      const linkUrl = match[2].trim();

      if (linkUrl.startsWith('/')) {
        // Internal route: only render a button when the route is approved.
        if (isApprovedInternalUrl(linkUrl)) {
          const url = linkUrl;
          buttons.push(
            <Button
              key={`nav-btn-${buttonCount++}`}
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleInternalNavigation(url);
              }}
              className={internalClasses}
              style={{ pointerEvents: 'auto' }}
            >
              {linkText}
            </Button>
          );
        } else {
          // Unverified route from the model: offer the nearest verified parent.
          console.warn('[chatbot] unapproved route in response, using parent:', linkUrl);
          const fallback = parentRoute(linkUrl);
          buttons.push(
            <Button
              key={`nav-fallback-${buttonCount++}`}
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleInternalNavigation(fallback);
              }}
              className={internalClasses}
              style={{ pointerEvents: 'auto' }}
            >
              {linkText}
            </Button>
          );
        }
      } else if (isMailtoOrTel(linkUrl)) {
        const url = linkUrl;
        buttons.push(
          <Button
            key={`mail-btn-${buttonCount++}`}
            type="button"
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMailtoNavigation(url);
            }}
            className={externalClasses}
            style={{ pointerEvents: 'auto' }}
          >
            {linkText}
          </Button>
        );
      } else if (isSafeExternalUrl(linkUrl)) {
        const url = linkUrl;
        buttons.push(
          <Button
            key={`ext-btn-${buttonCount++}`}
            type="button"
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleExternalNavigation(url);
            }}
            className={externalClasses}
            style={{ pointerEvents: 'auto' }}
          >
            {linkText} ↗
          </Button>
        );
      } else {
        // javascript:, data:, vbscript: and anything else: render as plain text.
        parts.push(linkText);
      }
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      const remainingText = content.slice(lastIndex);
      if (remainingText.trim()) {
        parts.push(remainingText);
      }
    }

    // If we have buttons, render them after the text with a label
    if (buttons.length > 0) {
      return (
        <div className="space-y-3">
          {parts.length > 0 && (
            <div className="whitespace-pre-wrap">{parts}</div>
          )}
          <div className="text-xs text-muted-foreground mb-1">
            {t('chatbot.quickLinksLabel')}
          </div>
          <div className="flex flex-wrap gap-2" style={{ pointerEvents: 'auto' }}>
            {buttons}
          </div>
        </div>
      );
    }

    return parts.length > 0 ? parts : content;
  };

  return (
    <div className="space-y-3">
      {showEmergencyBanner && (
        <div 
          className="bg-red-100 border border-red-300 rounded-lg p-3 text-sm text-red-800"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          <p className="font-bold mb-1">
            ⚠️ {t('chatbot.emergencyTitle')}
          </p>
          <p>
            {t('chatbot.emergencyBody')}
          </p>
        </div>
      )}
      
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${
              message.role === 'user'
                ? 'bg-healthDarkBlue text-white'
                : 'bg-white text-gray-800 shadow-sm border border-gray-100'
            }`}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="whitespace-pre-wrap">
              {formatContent(message.content)}
            </div>
          </div>
        </div>
      ))}

      {navError && (
        <div
          className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-sm text-amber-900"
          role="status"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          <p className="mb-2">{navError.message}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleInternalNavigation(navError.fallback)}
            className="text-xs min-h-[44px] px-4 py-2 bg-white"
          >
            {language === 'ar' ? 'اذهب إلى القسم الرئيسي' : 'Go to the main section'}
          </Button>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">
                {t('chatbot.typing')}
              </span>
            </div>
          </div>
        </div>
      )}

      {messages.length > 0 && !isLoading && (
        <ChatSafetyFooter />
      )}
    </div>
  );
};
