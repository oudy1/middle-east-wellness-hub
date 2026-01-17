import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  placeholder: string;
}

export interface ChatInputRef {
  focus: () => void;
  scrollIntoView: () => void;
}

export const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(
  ({ onSend, disabled, placeholder }, ref) => {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus({ preventScroll: true });
      },
      scrollIntoView: () => {
        inputRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
      },
    }));

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && !disabled) {
        onSend(trimmed);
        setInput('');
      }
    };

    return (
      <div className="border-t border-gray-200 p-3 bg-white pb-[calc(env(safe-area-inset-bottom,0px)+12px)]">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            inputMode="text"
            enterKeyHint="send"
            autoComplete="off"
            className="flex-1 min-h-[44px] px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthGold focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          />
          <Button
            type="submit"
            disabled={disabled || !input.trim()}
            size="icon"
            className="h-11 w-11 bg-healthGold hover:bg-healthGold/90 text-healthDarkBlue shrink-0 touch-manipulation"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    );
  }
);

ChatInput.displayName = 'ChatInput';
