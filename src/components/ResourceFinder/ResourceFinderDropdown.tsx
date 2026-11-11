import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  categoryLabels,
  popularSearches,
  getResourceById
} from '@/lib/resourceFinderData';
import type { ResultGroup } from '@/lib/siteSearch';
import HighlightMatch from './HighlightMatch';
import { useOpenResource } from './useOpenResource';
import { 
  FileText, 
  Stethoscope, 
  FlaskConical, 
  Users, 
  Calendar, 
  ClipboardList,
  GraduationCap,
  TrendingUp,
  Compass,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResourceFinderDropdownProps {
  groups: ResultGroup[];
  query: string;
  /** Normalized words of the query, used to highlight matches. */
  matchWords: string[];
  onSelect: () => void;
  showNoResults: boolean;
  listboxId: string;
  activeIndex: number;
  onActiveChange: (index: number) => void;
}

export const optionId = (listboxId: string, index: number) => `${listboxId}-opt-${index}`;

const categoryIcons: Record<string, React.ReactNode> = {
  topics: <FileText className="h-4 w-4" />,
  services: <Stethoscope className="h-4 w-4" />,
  programs: <GraduationCap className="h-4 w-4" />,
  research: <FlaskConical className="h-4 w-4" />,
  healthcare: <Users className="h-4 w-4" />,
  events: <Calendar className="h-4 w-4" />,
  forms: <ClipboardList className="h-4 w-4" />
};

const ResourceFinderDropdown: React.FC<ResourceFinderDropdownProps> = ({
  groups,
  query,
  matchWords,
  onSelect,
  showNoResults,
  listboxId,
  activeIndex,
  onActiveChange,
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const openResource = useOpenResource();
  const isRTL = language === 'ar';
  const resultCount = groups.reduce((n, g) => n + g.items.length, 0);

  const handleNavigate = (resource: Parameters<typeof openResource>[0]) => {
    onSelect();
    openResource(resource);
  };

  const handlePopularClick = (searchId: string) => {
    const resource = getResourceById(searchId);
    if (resource) {
      handleNavigate(resource);
    }
  };

  const handleFallbackClick = (url: string) => {
    onSelect();
    navigate(url);
  };

  // Show popular searches when no query
  if (!query.trim()) {
    return (
      <div 
        className={`bg-white border border-gray-200 rounded-lg shadow-lg p-4 ${isRTL ? 'text-right' : 'text-left'}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
          <TrendingUp className="h-4 w-4" />
          <span>{isRTL ? 'عمليات بحث شائعة' : 'Popular searches'}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((item) => (
            <button
              key={item.id}
              onClick={() => handlePopularClick(item.id)}
              className="px-3 py-1.5 bg-healthLightGray hover:bg-healthTeal/10 text-healthDarkBlue text-sm rounded-full transition-colors border border-gray-200 hover:border-healthTeal"
            >
              {isRTL ? item.label_ar : item.label_en}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Show no results message
  if (showNoResults && resultCount === 0) {
    return (
      <div 
        className={`bg-white border border-gray-200 rounded-lg shadow-lg p-4 ${isRTL ? 'text-right' : 'text-left'}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <p className="text-gray-600 mb-4">
          {isRTL 
            ? 'لا يوجد تطابق واضح حالياً. جرّب كلمة أبسط أو اختر أحد الخيارات التالية.'
            : 'No exact match yet. Try a simpler keyword or use one of these options.'
          }
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFallbackClick('/diseases')}
            className="flex items-center gap-2"
          >
            <Compass className="h-4 w-4" />
            {isRTL ? 'تصفح المواضيع' : 'Browse Topics'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFallbackClick('/physician-directory')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            {isRTL ? 'ابحث عن مقدمي الرعاية' : 'Find Healthcare Workers'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFallbackClick('/contact')}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            {isRTL ? 'تواصل مع شمس' : 'Contact SHAMS'}
          </Button>
        </div>
      </div>
    );
  }

  // Show grouped results (single listbox so arrow keys move through every result)
  let index = -1;
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto ${isRTL ? 'text-right' : 'text-left'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <p className="sr-only" role="status" aria-live="polite">
        {isRTL ? `${resultCount} نتيجة` : `${resultCount} result${resultCount === 1 ? '' : 's'}`}
      </p>
      <ul id={listboxId} role="listbox" aria-label={isRTL ? 'نتائج البحث' : 'Search results'}>
        {groups.map(({ category, items }) => (
          <li key={category} role="presentation" className="border-b border-gray-100 last:border-b-0">
            <div
              role="presentation"
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide"
            >
              {categoryIcons[category]}
              <span>{categoryLabels[category][isRTL ? 'ar' : 'en']}</span>
            </div>
            <ul role="group" aria-label={categoryLabels[category][isRTL ? 'ar' : 'en']}>
              {items.map((resource) => {
                index += 1;
                const i = index;
                const active = i === activeIndex;
                const title = isRTL ? resource.title_ar : resource.title_en;
                const description = isRTL ? resource.description_ar : resource.description_en;
                return (
                  <li
                    key={resource.id}
                    id={optionId(listboxId, i)}
                    role="option"
                    aria-selected={active}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => onActiveChange(i)}
                    onClick={() => handleNavigate(resource)}
                    className={`w-full min-h-[44px] px-4 py-2.5 cursor-pointer transition-colors flex items-center gap-3 ${
                      active ? 'bg-healthTeal/10' : 'hover:bg-healthTeal/5'
                    }`}
                  >
                    <span className="flex-1 min-w-0">
                      <span className="block text-healthDarkBlue font-medium">
                        <HighlightMatch text={title} words={matchWords} />
                      </span>
                      {description && (
                        <span className="block text-xs text-gray-600 truncate">{description}</span>
                      )}
                    </span>
                    {resource.isExternal && <ExternalLink className="h-3 w-3 text-gray-500 shrink-0" />}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceFinderDropdown;
