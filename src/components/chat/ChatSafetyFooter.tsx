import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Mail } from 'lucide-react';

export const ChatSafetyFooter: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div 
      className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500 space-y-2"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <p className="italic">
        {language === 'ar' 
          ? 'تنويه: نحن لسنا أطباء. هذا المرشد للمعلومات فقط وليس بديلاً عن الاستشارة الطبية.'
          : 'Disclaimer: We are not medical doctors. This guide is for information only and not a substitute for medical advice.'}
      </p>
      
      <div className="flex items-center gap-3 flex-wrap">
        <a
          href="https://www.instagram.com/project_shams/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-healthGold hover:underline touch-manipulation"
        >
          <Instagram className="h-3 w-3" />
          <span>@project_shams</span>
        </a>
        
        <a
          href="mailto:infoprojectshams@gmail.com"
          className="inline-flex items-center gap-1 text-healthGold hover:underline touch-manipulation"
        >
          <Mail className="h-3 w-3" />
          <span>infoprojectshams@gmail.com</span>
        </a>
      </div>
    </div>
  );
};
