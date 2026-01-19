import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  SearchableResource, 
  categoryLabels,
  popularSearches,
  getResourceById
} from '@/lib/resourceFinderData';
import { 
  FileText, 
  Stethoscope, 
  FlaskConical, 
  Users, 
  Calendar, 
  ClipboardList,
  TrendingUp,
  Compass,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResourceFinderDropdownProps {
  results: SearchableResource[];
  query: string;
  onSelect: () => void;
  showNoResults: boolean;
}

const categoryIcons: Record<string, React.ReactNode> = {
  topics: <FileText className="h-4 w-4" />,
  services: <Stethoscope className="h-4 w-4" />,
  research: <FlaskConical className="h-4 w-4" />,
  healthcare: <Users className="h-4 w-4" />,
  events: <Calendar className="h-4 w-4" />,
  forms: <ClipboardList className="h-4 w-4" />
};

const ResourceFinderDropdown: React.FC<ResourceFinderDropdownProps> = ({
  results,
  query,
  onSelect,
  showNoResults
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  // Group results by category
  const groupedResults = results.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, SearchableResource[]>);

  const handleNavigate = (resource: SearchableResource) => {
    onSelect();
    
    if (resource.isExternal) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    } else if (resource.anchor) {
      navigate(resource.url);
      // Small delay to allow navigation, then scroll to anchor
      setTimeout(() => {
        const element = document.getElementById(resource.anchor!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(resource.url);
    }
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
  if (showNoResults && results.length === 0) {
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

  // Show grouped results
  return (
    <div 
      className={`bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto ${isRTL ? 'text-right' : 'text-left'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {Object.entries(groupedResults).map(([category, items]) => (
        <div key={category} className="border-b border-gray-100 last:border-b-0">
          <div className={`flex items-center gap-2 px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide ${isRTL ? 'flex-row-reverse' : ''}`}>
            {categoryIcons[category]}
            <span>{categoryLabels[category as keyof typeof categoryLabels][isRTL ? 'ar' : 'en']}</span>
          </div>
          {items.map((resource) => (
            <button
              key={resource.id}
              onClick={() => handleNavigate(resource)}
              className={`w-full px-4 py-3 hover:bg-healthTeal/5 transition-colors flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span className="flex-1 text-healthDarkBlue font-medium">
                {isRTL ? resource.title_ar : resource.title_en}
              </span>
              {resource.isExternal && (
                <ExternalLink className="h-3 w-3 text-gray-400" />
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ResourceFinderDropdown;
