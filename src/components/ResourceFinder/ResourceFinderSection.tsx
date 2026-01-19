import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import ResourceFinderInput from './ResourceFinderInput';
import { popularSearches, getResourceById } from '@/lib/resourceFinderData';

const ResourceFinderSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  const handlePopularClick = (searchId: string) => {
    const resource = getResourceById(searchId);
    if (resource) {
      if (resource.anchor) {
        navigate(resource.url);
        setTimeout(() => {
          const element = document.getElementById(resource.anchor!);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        navigate(resource.url);
      }
    }
  };

  return (
    <section className="bg-white py-6 md:py-8 border-b border-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className={`flex items-center justify-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Search className="h-5 w-5 text-healthTeal" />
            <h2 className="text-lg font-semibold text-healthDarkBlue">
              {isRTL ? 'البحث عن الموارد' : 'Resource Finder'}
            </h2>
          </div>

          {/* Search Input */}
          <ResourceFinderInput variant="full" />

          {/* Popular Searches */}
          <div className="mt-4">
            <p className={`text-xs text-gray-500 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'عمليات بحث شائعة:' : 'Popular searches:'}
            </p>
            <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
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
        </div>
      </div>
    </section>
  );
};

export default ResourceFinderSection;
