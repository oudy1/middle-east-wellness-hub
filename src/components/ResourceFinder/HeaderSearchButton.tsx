import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ResourceFinderModal from './ResourceFinderModal';
import ResourceFinderInput from './ResourceFinderInput';

interface HeaderSearchButtonProps {
  variant: 'desktop' | 'mobile';
}

const HeaderSearchButton: React.FC<HeaderSearchButtonProps> = ({ variant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  if (variant === 'desktop') {
    return (
      <div className="relative w-64">
        <ResourceFinderInput variant="compact" />
      </div>
    );
  }

  // Mobile variant - icon button that opens modal
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-white p-2.5 hover:bg-healthTeal/20 rounded-md transition-colors min-h-[44px] min-w-[44px] touch-manipulation flex items-center justify-center"
        aria-label={isRTL ? 'البحث عن الموارد' : 'Search resources'}
      >
        <Search size={20} />
      </button>

      <ResourceFinderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default HeaderSearchButton;
