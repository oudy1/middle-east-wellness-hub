
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

  return <header className="bg-healthDarkBlue text-white relative z-50 w-full">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - More compact */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <img src="/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png" alt="SHAMS Logo" className="h-16 w-16 object-contain" />
                <div>
                  <div className="text-xl font-bold">
                    {language === 'ar' ? "شمس" : "SHAMS"}
                  </div>
                  <div className="text-xs font-light">
                    {t("header.home") === "Home" ? "Supporting Health & Advocacy" : "دعم الصحة والدفاع"}
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation - More compact */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm">
            <Link to="/" className="hover:text-healthTeal transition-colors">
              {t("header.home")}
            </Link>
            <Link to="/about" className="hover:text-healthTeal transition-colors">
              {t("header.aboutUs")}
            </Link>
            <Link to="/services" className="hover:text-healthTeal transition-colors">
              {t("header.forCommunity")}
            </Link>
            <Link to="/resources" className="hover:text-healthTeal transition-colors">
              {t("header.forClinicians")}
            </Link>
            <Link to="/diseases" className="hover:text-healthTeal transition-colors">
              {t("header.diseases")}
            </Link>
            <Link to="/contact" className="hover:text-healthTeal transition-colors">
              Contact
            </Link>
            <Link to="/webinars" className="hover:text-healthTeal transition-colors">
              {t("header.webinars")}
            </Link>
            <Link to="/physician-directory" className="hover:text-healthTeal transition-colors">
              Physician Directory
            </Link>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-healthTeal transition-colors text-sm"
                aria-label="Select language"
              >
                <Languages size={16} />
                <span>{currentLanguage?.flag}</span>
                <span className="hidden sm:inline">{currentLanguage?.name}</span>
                <ChevronDown size={14} />
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
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-healthTeal transition-colors text-sm"
                aria-label="Select language"
              >
                <Languages size={16} />
                <span>{currentLanguage?.flag}</span>
                <ChevronDown size={12} />
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
            <button className="text-white flex-shrink-0" onClick={toggleMobileMenu} aria-label="Toggle menu">
              <Menu size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && <nav className="lg:hidden pt-3 pb-2 space-y-1">
            <Link to="/" className="block py-2 hover:text-healthTeal transition-colors text-sm">
              {t("header.home")}
            </Link>
            <Link to="/about" className="block py-2 hover:text-healthTeal transition-colors text-sm">
              {t("header.aboutUs")}
            </Link>
            <Link to="/services" className="block py-2 hover:text-healthTeal transition-colors text-sm">
              {t("header.forCommunity")}
            </Link>
            <Link to="/resources" className="block py-2 hover:text-healthTeal transition-colors text-sm">
              {t("header.forClinicians")}
            </Link>
            <Link to="/diseases" className="block py-2 hover:text-healthTeal transition-colors text-sm">
              {t("header.diseases")}
            </Link>
            <Link to="/contact" className="block py-2 hover:text-healthTeal transition-colors text-sm">
              Contact
            </Link>
            <Link to="/webinars" className="block py-2 hover:text-healthTeal transition-colors text-sm">
              {t("header.webinars")}
            </Link>
            <Link to="/physician-directory" className="block py-2 hover:text-healthTeal transition-colors text-sm">
              Physician Directory
            </Link>
          </nav>}
      </div>
    </header>;
};
export default Header;
