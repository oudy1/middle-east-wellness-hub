import React from 'react';
import { Button } from '@/components/ui/button';

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
  return (
    <div className="flex flex-wrap gap-2">
      {replies.map((reply, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelect(reply.message)}
          disabled={disabled}
          className="text-xs bg-white hover:bg-healthGold/10 border-healthGold/30 text-healthDarkBlue hover:border-healthGold transition-colors"
        >
          {reply.label}
        </Button>
      ))}
    </div>
  );
};
