import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { ChatQuickReplies } from './ChatQuickReplies';
import { useChatSession } from '@/hooks/useChatSession';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { language } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    isLoading,
    sendMessage,
    conversationId
  } = useChatSession();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = language === 'ar' ? [
    { label: 'موارد بالعربي', message: 'أريد موارد صحية بالعربي' },
    { label: 'ابحث عن طبيب', message: 'أبحث عن طبيب عائلة' },
    { label: 'مواد تعليمية', message: 'أريد تحميل مواد تعليمية' },
    { label: 'تسجيلات', message: 'أريد مشاهدة تسجيلات الندوات' },
    { label: 'تطوع', message: 'كيف أتطوع مع SHAMS؟' },
  ] : [
    { label: 'Arabic Resources', message: 'I need health resources in Arabic' },
    { label: 'Find a Doctor', message: "I'm looking for a family doctor" },
    { label: 'Educational Materials', message: 'I want to download educational materials' },
    { label: 'Watch Recordings', message: 'I want to watch webinar recordings' },
    { label: 'Volunteer', message: 'How can I volunteer with SHAMS?' },
  ];

  const handleQuickReply = (message: string) => {
    sendMessage(message);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-healthGold hover:bg-healthGold/90 shadow-lg"
        aria-label={language === 'ar' ? 'افتح المحادثة' : 'Open chat'}
      >
        <MessageCircle className="h-6 w-6 text-healthDarkBlue" />
      </Button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
        isMinimized ? 'h-14' : 'h-[600px] max-h-[calc(100vh-48px)]'
      }`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-healthDarkBlue text-white">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png" 
            alt="SHAMS" 
            className="h-8 w-8 object-contain"
          />
          <div>
            <h3 className="font-semibold text-sm">
              {language === 'ar' ? 'مرشد SHAMS' : 'SHAMS Guide'}
            </h3>
            <p className="text-xs text-white/70">
              {language === 'ar' ? 'متاح للمساعدة' : 'Here to help'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 text-white hover:bg-white/10"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 h-[calc(100%-140px)] bg-gray-50">
            {messages.length === 0 ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-700">
                    {language === 'ar' 
                      ? 'مرحباً! أنا مرشد SHAMS. أقدر أساعدك توصل للموارد الصحية المناسبة. شو تحتاج اليوم؟'
                      : "Hi! I'm SHAMS Guide. I can help you find the right health resources. What do you need today?"}
                  </p>
                </div>
                <ChatQuickReplies 
                  replies={quickReplies} 
                  onSelect={handleQuickReply}
                  disabled={isLoading}
                />
              </div>
            ) : (
              <ChatMessages 
                messages={messages} 
                isLoading={isLoading}
              />
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <ChatInput 
            onSend={sendMessage}
            disabled={isLoading}
            placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
          />
        </>
      )}
    </div>
  );
};

export default ChatWidget;
