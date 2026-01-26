import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuickReply {
  label: string;
  message: string;
}

interface ChatQuickRepliesProps {
  replies: QuickReply[];
  onSelect: (message: string) => void;
  disabled: boolean;
}

export const ChatQuickReplies: React.FC<ChatQuickRepliesProps> = ({ 
  replies, 
  onSelect, 
  disabled 
}) => {
  const { language } = useLanguage();
  
  const handleSelect = useCallback((message: string) => {
    if (!disabled) {
      onSelect(message);
    }
  }, [disabled, onSelect]);

  return (
    <div 
      className="flex flex-wrap gap-2"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={{ pointerEvents: 'auto' }}
    >
      {replies.map((reply, index) => (
        <Button
          key={index}
          type="button"
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSelect(reply.message);
          }}
          disabled={disabled}
          className="text-xs min-h-[44px] px-4 py-2 bg-white hover:bg-healthGold/20 border-healthGold/40 text-healthDarkBlue hover:border-healthGold transition-colors touch-manipulation active:scale-95 select-none cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          {reply.label}
        </Button>
      ))}
    </div>
  );
};