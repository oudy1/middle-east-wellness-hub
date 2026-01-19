import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Search } from 'lucide-react';
import ResourceFinderInput from './ResourceFinderInput';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ResourceFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResourceFinderModal: React.FC<ResourceFinderModalProps> = ({
  isOpen,
  onClose
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-lg w-[calc(100%-2rem)] mx-auto top-[10%] translate-y-0 p-4 sm:p-6"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <DialogHeader className="mb-4">
          <DialogTitle className={`flex items-center gap-2 text-healthDarkBlue ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Search className="h-5 w-5 text-healthTeal" />
            {isRTL ? 'البحث عن الموارد' : 'Find Resources'}
          </DialogTitle>
        </DialogHeader>
        
        <ResourceFinderInput 
          variant="full" 
          onClose={onClose}
          autoFocus={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ResourceFinderModal;
