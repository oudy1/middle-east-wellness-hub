import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    isLoading,
    sendMessage,
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
    }, 150);
    return () => clearTimeout(timer);
  }, [isOpen, isMinimized]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen && !isMinimized) {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMinimized]);

  // Close chat when navigating - passed to ChatMessages
  const handleNavigationClose = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Bilingual welcome message
  const welcomeMessage = 
    "Hi, I'm the SHAMS Guide. I can help you find resources, browse our pages, or connect with our team.\n\nمرحباً، أنا مساعد SHAMS. أقدر أساعدك تلاقي مصادر، توصل لصفحات الموقع، أو تتواصل مع فريقنا.";

  // Bilingual quick replies with both languages in label
  const quickReplies = [
    { 
      label: language === 'ar' 
        ? 'ابحث عن مقدمي رعاية | Find Healthcare Workers' 
        : 'Find Healthcare Workers | ابحث عن مقدمي رعاية',
      message: language === 'ar' 
        ? 'أبحث عن طبيب أو مقدم رعاية صحية' 
        : "I'm looking for a doctor or healthcare provider"
    },
    { 
      label: language === 'ar' 
        ? 'تصفح المصادر | Browse Resources' 
        : 'Browse Resources | تصفح المصادر',
      message: language === 'ar' 
        ? 'أريد الوصول إلى الموارد التعليمية' 
        : 'I want to access educational resources'
    },
    { 
      label: language === 'ar' 
        ? 'تواصل معنا | Contact SHAMS' 
        : 'Contact SHAMS | تواصل معنا',
      message: language === 'ar' 
        ? 'أريد التواصل مع فريق SHAMS' 
        : 'I want to contact the SHAMS team'
    },
    { 
      label: language === 'ar' 
        ? 'اقترح موضوعاً | Suggest a Topic' 
        : 'Suggest a Topic | اقترح موضوعاً',
      message: language === 'ar' 
        ? 'أريد اقتراح موضوع للنقاش' 
        : 'I want to suggest a discussion topic'
    },
    { 
      label: language === 'ar' 
        ? 'فرص بحثية | Research Opportunities' 
        : 'Research Opportunities | فرص بحثية',
      message: language === 'ar' 
        ? 'ما هي الفرص البحثية المتاحة؟' 
        : 'What research opportunities are available?'
    },
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
      {/* Backdrop for mobile - lower z-index than chat window */}
      <div 
        className="fixed inset-0 z-[55] bg-black/30 sm:hidden"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        style={{ pointerEvents: 'auto' }}
      />
      
      <div 
        ref={chatContainerRef}
        className={`fixed z-[60] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 flex flex-col ${
          isMinimized ? 'h-14' : 'h-[100dvh] sm:h-[600px] sm:max-h-[calc(100vh-48px)]'
        } w-full sm:w-[400px] sm:max-w-[calc(100vw-48px)] bottom-0 right-0 sm:bottom-6 sm:right-6`}
        style={{ 
          maxHeight: isMinimized ? '56px' : 'calc(100dvh - env(safe-area-inset-top, 0px))',
          pointerEvents: 'auto',
        }}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-healthDarkBlue text-white shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png" 
              alt="SHAMS" 
              className="h-8 w-8 object-contain"
            />
            <div>
              <h3 className="font-semibold text-sm">SHAMS Guide</h3>
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
          <>
            {/* Messages area - scrollable */}
            <div 
              className="flex-1 overflow-y-auto p-4 bg-gray-50 overscroll-contain"
              style={{ pointerEvents: 'auto' }}
            >
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {welcomeMessage}
                    </p>
                  </div>
                  <div className="text-xs text-center text-muted-foreground mb-2">
                    {language === 'ar' ? 'روابط سريعة | Quick links' : 'Quick links | روابط سريعة'}
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
                  onNavigate={handleNavigationClose}
                />
              )}
              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* Input area - fixed at bottom */}
            <div className="shrink-0">
              <ChatInput 
                ref={chatInputRef}
                onSend={sendMessage}
                disabled={isLoading}
                placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatWidget;