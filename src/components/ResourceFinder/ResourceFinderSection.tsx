import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import ResourceFinderInput from './ResourceFinderInput';
import { QUICK_ENTRIES } from '@/lib/helpNavigator';
import { approvedRouteMap } from '@/lib/chatbotRoutes';

const ResourceFinderSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  const openEntry = (href: string) => {
    navigate(href);
    const hash = href.split('#')[1];
    if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
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

          {/* Quick entry points (approved routes only) */}
          <nav className="mt-4" aria-label={isRTL ? 'روابط سريعة' : 'Quick links'}>
            <p className="text-xs text-muted-foreground mb-2 text-start">
              {isRTL ? 'ابدأ من هنا:' : 'Start here:'}
            </p>
            <ul className="flex flex-wrap gap-2 justify-start" data-testid="quick-entries">
              {QUICK_ENTRIES.map((item) => {
                const href = approvedRouteMap[item.routeKey];
                if (!href) return null;
                return (
                  <li key={item.id}>
                    <a
                      href={href}
                      onClick={(e) => { e.preventDefault(); openEntry(href); }}
                      className="inline-flex min-h-11 items-center px-4 bg-healthLightGray hover:bg-healthTeal/10 text-healthDarkBlue text-sm rounded-full transition-colors border border-gray-200 hover:border-healthTeal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                    >
                      {isRTL ? item.ar : item.en}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ResourceFinderSection;
