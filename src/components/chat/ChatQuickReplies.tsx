import React from 'react';
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
  
  const handleSelect = (e: React.MouseEvent | React.TouchEvent, message: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onSelect(message);
    }
  };

  return (
    <div 
      className="flex flex-wrap gap-2"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {replies.map((reply, index) => (
        <Button
          key={index}
          type="button"
          variant="outline"
          size="sm"
          onClick={(e) => handleSelect(e, reply.message)}
          onTouchEnd={(e) => {
            e.preventDefault();
            if (!disabled) {
              onSelect(reply.message);
            }
          }}
          disabled={disabled}
          className="text-xs min-h-[44px] px-3 py-2 bg-white hover:bg-healthGold/10 border-healthGold/30 text-healthDarkBlue hover:border-healthGold transition-colors touch-manipulation active:scale-95 select-none"
        >
          {reply.label}
        </Button>
      ))}
    </div>
  );
};