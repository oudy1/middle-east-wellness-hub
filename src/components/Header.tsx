
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Languages, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const {
    language,
    setLanguage,
    t
  } = useLanguage();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ku', name: 'کوردی', flag: '' },
    { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <header className="bg-healthDarkBlue text-white relative z-50 w-full">
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Cleaner and more compact */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img src="/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png" alt="SHAMS Logo" className="h-12 w-12 object-contain" />
              <div className="text-2xl font-bold">
                {language === 'ar' ? "شمس" : "SHAMS"}
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation - Better spacing */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="hover:text-healthTeal transition-colors font-medium">
              {t("header.home")}
            </Link>
            <Link to="/about" className="hover:text-healthTeal transition-colors font-medium">
              {t("header.aboutUs")}
            </Link>
            <Link to="/services" className="hover:text-healthTeal transition-colors font-medium">
              {t("header.forCommunity")}
            </Link>
            <Link to="/resources" className="hover:text-healthTeal transition-colors font-medium">
              {t("header.forClinicians")}
            </Link>
            <Link to="/diseases" className="hover:text-healthTeal transition-colors font-medium">
              {t("header.diseases")}
            </Link>
            <Link to="/contact" className="hover:text-healthTeal transition-colors font-medium">
              Contact
            </Link>
            <Link to="/webinars" className="hover:text-healthTeal transition-colors font-medium">
              {t("header.webinars")}
            </Link>
            <Link to="/physician-directory" className="hover:text-healthTeal transition-colors font-medium">
              Physician Directory
            </Link>
            
            {/* Language Selector - More compact */}
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-healthTeal transition-colors"
                aria-label="Select language"
              >
                <Languages size={18} />
                <span>{currentLanguage?.flag}</span>
                <ChevronDown size={16} />
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setLanguageMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                        language === lang.code ? 'bg-healthTeal text-white' : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
          
          {/* Mobile Language & Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-healthTeal transition-colors"
                aria-label="Select language"
              >
                <Languages size={16} />
                <span>{currentLanguage?.flag}</span>
                <ChevronDown size={14} />
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 border">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setLanguageMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                        language === lang.code ? 'bg-healthTeal text-white' : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-xs">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button className="text-white" onClick={toggleMobileMenu} aria-label="Toggle menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pt-4 pb-2 space-y-2">
            <Link to="/" className="block py-2 hover:text-healthTeal transition-colors font-medium">
              {t("header.home")}
            </Link>
            <Link to="/about" className="block py-2 hover:text-healthTeal transition-colors font-medium">
              {t("header.aboutUs")}
            </Link>
            <Link to="/services" className="block py-2 hover:text-healthTeal transition-colors font-medium">
              {t("header.forCommunity")}
            </Link>
            <Link to="/resources" className="block py-2 hover:text-healthTeal transition-colors font-medium">
              {t("header.forClinicians")}
            </Link>
            <Link to="/diseases" className="block py-2 hover:text-healthTeal transition-colors font-medium">
              {t("header.diseases")}
            </Link>
            <Link to="/contact" className="block py-2 hover:text-healthTeal transition-colors font-medium">
              Contact
            </Link>
            <Link to="/webinars" className="block py-2 hover:text-healthTeal transition-colors font-medium">
              {t("header.webinars")}
            </Link>
            <Link to="/physician-directory" className="block py-2 hover:text-healthTeal transition-colors font-medium">
              Physician Directory
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
