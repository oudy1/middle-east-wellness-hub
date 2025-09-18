import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BilingualContentProps {
  englishContent: React.ReactNode;
  arabicContent: React.ReactNode;
  className?: string;
  showBothLanguages?: boolean;
}

const BilingualContent: React.FC<BilingualContentProps> = ({
  englishContent,
  arabicContent,
  className = "",
  showBothLanguages = false
}) => {
  const { language } = useLanguage();

  // If showBothLanguages is true, display both languages side by side
  if (showBothLanguages) {
    return (
      <div className={`bilingual-container ${className}`}>
        <div className="english">
          {englishContent}
        </div>
        <div className="arabic">
          {arabicContent}
        </div>
      </div>
    );
  }

  // Otherwise, show content based on current language
  return (
    <div className={className}>
      {language === 'ar' ? arabicContent : englishContent}
    </div>
  );
};

export default BilingualContent;
