import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChatMessages } from './ChatMessages';
import { ChatInput, ChatInputRef } from './ChatInput';
import { ChatQuickReplies } from './ChatQuickReplies';
import { ChatSafetyFooter } from './ChatSafetyFooter';
import { useChatSession } from '@/hooks/useChatSession';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { language } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<ChatInputRef>(null);
  
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

  // Focus input when chat opens (with delay for mobile)
  useEffect(() => {
    if (!isOpen || isMinimized) return;
    const timer = setTimeout(() => {
      chatInputRef.current?.focus();
      chatInputRef.current?.scrollIntoView();
    }, 100);
    return () => clearTimeout(timer);
  }, [isOpen, isMinimized]);

  // Bilingual quick replies with full list
  const quickReplies = language === 'ar' ? [
    { label: 'موارد باللغة العربية', message: 'أريد موارد صحية باللغة العربية' },
    { label: 'ابحث عن مقدمي رعاية صحية', message: 'أبحث عن طبيب عائلة أو مقدم رعاية صحية' },
    { label: 'تطوع مع شمس', message: 'كيف أتطوع مع مشروع شمس؟' },
    { label: 'فرص بحثية', message: 'ما هي الفرص البحثية المتاحة؟' },
    { label: 'شاهد تسجيلات الفعاليات', message: 'أريد مشاهدة تسجيلات الندوات والفعاليات' },
    { label: 'اقترح موضوعاً', message: 'أريد اقتراح موضوع للنقاش' },
    { label: 'دعم في أزمة', message: 'أحتاج مساعدة عاجلة أو دعم في أزمة' },
  ] : [
    { label: 'Find Arabic resources', message: 'I need health resources in Arabic' },
    { label: 'Find healthcare workers', message: "I'm looking for a family doctor or healthcare provider" },
    { label: 'Volunteer with SHAMS', message: 'How can I volunteer with SHAMS?' },
    { label: 'Research opportunities', message: 'What research opportunities are available?' },
    { label: 'Watch event recordings', message: 'I want to watch webinar and event recordings' },
    { label: 'Suggest a topic', message: 'I want to suggest a discussion topic' },
    { label: 'Crisis support', message: 'I need urgent help or crisis support' },
  ];

  const handleQuickReply = (message: string) => {
    sendMessage(message);
  };

  if (!isOpen) {
    return (
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-healthGold hover:bg-healthGold/90 shadow-lg touch-manipulation active:scale-95"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}
        aria-label={language === 'ar' ? 'افتح المحادثة' : 'Open chat'}
      >
        <MessageCircle className="h-6 w-6 text-healthDarkBlue" />
      </Button>
    );
  }

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 z-[55] bg-black/20 sm:hidden"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      
      <div 
        className={`fixed z-[60] pointer-events-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
          isMinimized ? 'h-14' : 'h-[100dvh] sm:h-[600px] sm:max-h-[calc(100vh-48px)]'
        } w-full sm:w-[400px] sm:max-w-[calc(100vw-48px)] bottom-0 right-0 sm:bottom-6 sm:right-6`}
        style={{ 
          maxHeight: isMinimized ? '56px' : 'calc(100dvh - env(safe-area-inset-top, 0px))',
        }}
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
                {language === 'ar' ? 'مرشد شمس' : 'SHAMS Guide'}
              </h3>
              <p className="text-xs text-white/70">
                {language === 'ar' ? 'متاح للمساعدة' : 'Here to help'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-10 w-10 text-white hover:bg-white/10 touch-manipulation"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-10 w-10 text-white hover:bg-white/10 touch-manipulation"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex flex-col h-[calc(100%-56px)]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-700">
                      {language === 'ar' 
                        ? 'مرحباً! أنا مرشد شمس. أقدر أساعدك توصل للموارد الصحية المناسبة. شو تحتاج اليوم؟'
                        : "Hi! I'm SHAMS Guide. I can help you find the right health resources. What do you need today?"}
                    </p>
                  </div>
                  <ChatQuickReplies 
                    replies={quickReplies} 
                    onSelect={handleQuickReply}
                    disabled={isLoading}
                  />
                  <ChatSafetyFooter />
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
              ref={chatInputRef}
              onSend={sendMessage}
              disabled={isLoading}
              placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWidget;
