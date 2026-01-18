import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';
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

  // Validate URL to prevent XSS via javascript: protocol
  const isValidUrl = (url: string): boolean => {
    const trimmed = url.trim().toLowerCase();
    // Block dangerous protocols
    if (trimmed.startsWith('javascript:') || 
        trimmed.startsWith('data:') || 
        trimmed.startsWith('vbscript:')) {
      return false;
    }
    // Allow relative paths starting with /
    if (url.startsWith('/')) {
      return true;
    }
    // Allow http/https URLs
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return true;
    }
    return false;
  };

  // Parse message content for links and format
  const formatContent = (content: string) => {
    // Convert markdown-style links to clickable links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      
      const linkText = match[1];
      const linkUrl = match[2];
      
      // Only create link if URL is safe, otherwise show plain text
      if (isValidUrl(linkUrl)) {
        parts.push(
          <a
            key={match.index}
            href={linkUrl}
            target={linkUrl.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="text-healthGold hover:underline font-medium"
          >
            {linkText}
          </a>
        );
      } else {
        // Show as plain text if URL is not safe
        parts.push(linkText);
      }
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
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
              ? 'اتصل بـ 911 أو اذهب إلى أقرب غرفة طوارئ. خط أزمات كندا: 1-833-456-4566'
              : 'Call 911 or go to your nearest emergency room. Canada Crisis Line: 1-833-456-4566'}
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

      {/* Safety footer after messages */}
      {messages.length > 0 && !isLoading && (
        <ChatSafetyFooter />
      )}
    </div>
  );
};
