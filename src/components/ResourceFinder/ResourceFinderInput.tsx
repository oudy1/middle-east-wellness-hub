import React, { useState, useRef, useEffect, useId, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { searchSite, groupResults, flattenGroups, queryWords } from '@/lib/siteSearch';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ResourceFinderDropdown, { optionId } from './ResourceFinderDropdown';
import { useOpenResource } from './useOpenResource';

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
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxId = useId().replace(/:/g, '') + '-results';
  const openResource = useOpenResource();
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

  const groups = useMemo(() => groupResults(searchSite(query, isRTL ? 'ar' : 'en')), [query, isRTL]);
  const ordered = useMemo(() => flattenGroups(groups), [groups]);
  const matchWords = useMemo(() => queryWords(query), [query]);
  // Show "no results" once the user has typed at least 2 characters
  const showNoResults = query.trim().length >= 2 && ordered.length === 0;

  useEffect(() => {
    setActiveIndex(-1);
  }, [query, isRTL]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      if (isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
      return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    if (ordered.length === 0) return;
    e.preventDefault();
    setIsOpen(true);
    setActiveIndex((i) => {
      if (e.key === 'ArrowDown') return i + 1 >= ordered.length ? 0 : i + 1;
      return i <= 0 ? ordered.length - 1 : i - 1;
    });
  };

  useEffect(() => {
    if (activeIndex < 0) return;
    document.getElementById(optionId(listboxId, activeIndex))?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, listboxId]);

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Enter opens the highlighted result, or the best match
    const chosen = ordered[activeIndex] ?? ordered[0];
    if (chosen) {
      handleClose();
      openResource(chosen);
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
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              role="combobox"
              aria-expanded={isOpen && ordered.length > 0}
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={isOpen && activeIndex >= 0 ? optionId(listboxId, activeIndex) : undefined}
              aria-label={placeholder}
              placeholder={placeholder}
              className={`${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} ${variant === 'compact' ? 'h-9 text-sm' : 'h-12 text-base'} bg-white border-gray-200 focus:border-healthTeal`}
              enterKeyHint="go"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={isRTL ? 'مسح البحث' : 'Clear search'}
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
            groups={groups}
            query={query}
            matchWords={matchWords}
            onSelect={handleSelect}
            showNoResults={showNoResults}
            listboxId={listboxId}
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
          />
        </div>
      )}
    </div>
  );
};

export default ResourceFinderInput;
