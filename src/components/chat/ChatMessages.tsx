import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatSafetyFooter } from './ChatSafetyFooter';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

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

  // Validate URL to prevent XSS
  const isValidUrl = (url: string): boolean => {
    const trimmed = url.trim().toLowerCase();
    if (trimmed.startsWith('javascript:') || 
        trimmed.startsWith('data:') || 
        trimmed.startsWith('vbscript:')) {
      return false;
    }
    if (url.startsWith('/')) {
      return true;
    }
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return true;
    }
    return false;
  };

  // Handle navigation for internal links
  const handleNavigation = (e: React.MouseEvent | React.TouchEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (url.startsWith('/')) {
      navigate(url);
    } else if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Parse message content for links and navigation buttons
  const formatContent = (content: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    let match;
    let buttonCount = 0;
    const buttons: React.ReactElement[] = [];

    while ((match = linkRegex.exec(content)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        const textBefore = content.slice(lastIndex, match.index);
        if (textBefore.trim()) {
          parts.push(textBefore);
        }
      }
      
      const linkText = match[1];
      const linkUrl = match[2];
      
      if (isValidUrl(linkUrl)) {
        const isInternalRoute = linkUrl.startsWith('/');
        
        if (isInternalRoute) {
          // Render as a navigation button for internal routes
          buttons.push(
            <Button
              key={`btn-${buttonCount++}`}
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => handleNavigation(e, linkUrl)}
              onTouchEnd={(e) => {
                e.preventDefault();
                if (linkUrl.startsWith('/')) {
                  navigate(linkUrl);
                } else if (linkUrl.startsWith('http')) {
                  window.open(linkUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              className="text-xs min-h-[40px] px-3 py-2 bg-white hover:bg-healthGold/10 border-healthGold/30 text-healthDarkBlue hover:border-healthGold transition-colors touch-manipulation active:scale-95 select-none"
            >
              {linkText}
            </Button>
          );
        } else {
          // Render as external link
          parts.push(
            <a
              key={match.index}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-healthGold hover:underline font-medium"
            >
              {linkText}
            </a>
          );
        }
      } else {
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
            {language === 'ar' ? 'روابط سريعة | Quick links' : 'Quick links | روابط سريعة'}
          </div>
          <div className="flex flex-wrap gap-2">
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
            {language === 'ar' ? '⚠️ إذا كنت في خطر فوري:' : '⚠️ If you are in immediate danger:'}
          </p>
          <p>
            {language === 'ar' 
              ? 'اتصل بـ 911 أو اذهب إلى أقرب غرفة طوارئ. في كندا، اتصل أو أرسل رسالة إلى 988 للدعم النفسي.'
              : 'Call 911 or go to your nearest emergency room. In Canada, call or text 988 for mental health support.'}
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
          >
            <div className="whitespace-pre-wrap">
              {formatContent(message.content)}
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">
                {language === 'ar' ? 'جاري الكتابة...' : 'Typing...'}
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