import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { searchResources, SearchableResource } from '@/lib/resourceFinderData';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ResourceFinderDropdown from './ResourceFinderDropdown';

interface ResourceFinderInputProps {
  variant?: 'full' | 'compact';
  onClose?: () => void;
  autoFocus?: boolean;
  className?: string;
}

const ResourceFinderInput: React.FC<ResourceFinderInputProps> = ({
  variant = 'full',
  onClose,
  autoFocus = false,
  className = ''
}) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableResource[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isRTL = language === 'ar';

  const placeholder = isRTL 
    ? 'ابحث عن الموارد (المواضيع، ملفات PDF، الفعاليات، مقدمو الرعاية)'
    : 'Search resources (topics, PDFs, events, healthcare workers)';

  const buttonText = isRTL ? 'بحث' : 'Search';

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchLang = isRTL ? 'ar' : 'en';
    const searchResults = searchResources(query, searchLang);
    setResults(searchResults);
    
    // Show no results after user has typed at least 2 characters
    setShowNoResults(query.length >= 2 && searchResults.length === 0);
  }, [query, isRTL]);

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      // Navigate to first result
      const firstResult = results[0];
      if (firstResult.isExternal) {
        window.open(firstResult.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = firstResult.url;
      }
      handleClose();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    onClose?.();
  };

  const handleSelect = () => {
    setIsOpen(false);
    setQuery('');
    onClose?.();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center gap-2 ${variant === 'compact' ? '' : ''}`}>
          <div className="relative flex-1">
            <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
            <Input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleFocus}
              placeholder={placeholder}
              className={`${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} ${variant === 'compact' ? 'h-9 text-sm' : 'h-12 text-base'} bg-white border-gray-200 focus:border-healthTeal`}
              enterKeyHint="go"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className={`absolute top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded ${isRTL ? 'left-2' : 'right-2'}`}
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
          {variant === 'full' && (
            <Button 
              type="submit" 
              className="bg-healthTeal hover:bg-healthTeal/90 h-12 px-6"
            >
              {buttonText}
            </Button>
          )}
        </div>
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <ResourceFinderDropdown
            results={results}
            query={query}
            onSelect={handleSelect}
            showNoResults={showNoResults}
          />
        </div>
      )}
    </div>
  );
};

export default ResourceFinderInput;
