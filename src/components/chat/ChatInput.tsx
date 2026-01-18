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
    const formRef = useRef<HTMLFormElement>(null);

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
        // Refocus input after sending on mobile
        setTimeout(() => {
          inputRef.current?.focus({ preventScroll: true });
        }, 50);
      }
    };

    return (
      <div className="border-t border-gray-200 p-3 bg-white pb-[calc(env(safe-area-inset-bottom,0px)+12px)]">
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="flex items-center gap-2"
        >
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
            autoCapitalize="sentences"
            autoCorrect="on"
            spellCheck="true"
            className="flex-1 min-h-[44px] px-4 py-2 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-healthGold focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation appearance-none"
            style={{ fontSize: '16px' }} // Prevents iOS zoom on focus
          />
          <Button
            type="submit"
            disabled={disabled || !input.trim()}
            size="icon"
            className="h-11 w-11 min-h-[44px] min-w-[44px] bg-healthGold hover:bg-healthGold/90 text-healthDarkBlue shrink-0 touch-manipulation active:scale-95 rounded-xl"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    );
  }
);

ChatInput.displayName = 'ChatInput';
