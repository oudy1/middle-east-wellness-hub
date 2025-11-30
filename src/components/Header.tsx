
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Languages, ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [educationMenuOpen, setEducationMenuOpen] = useState(false);
  const [physicianMenuOpen, setPhysicianMenuOpen] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
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

  const toggleEducationMenu = () => {
    setEducationMenuOpen(!educationMenuOpen);
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
    <header className="bg-healthDarkBlue text-white relative z-50 w-full shadow-lg border-b border-healthTeal/20">
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between h-12 sm:h-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img src="/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png" alt="SHAMS Logo" className="h-12 w-12 sm:h-14 sm:w-14 object-contain flex-shrink-0" />
              <div className="flex flex-col min-w-0">
                <div className="text-lg sm:text-xl font-bold truncate">
                  {language === 'ar' ? "شمس" : "SHAMS"}
                </div>
                <div className="text-xs text-healthGold opacity-90 hidden sm:block">
                  Supporting Health & Advocacy for Middle Eastern Communities
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1 space-x-8 mx-8">
            <Link to="/" className="hover:text-healthTeal transition-colors font-medium text-sm">
              {t("header.home")}
            </Link>
            <Link to="/about" className="hover:text-healthTeal transition-colors font-medium text-sm">
              {t("header.aboutUs")}
            </Link>
            <Link to="/services" className="hover:text-healthTeal transition-colors font-medium text-sm">
              {t("header.forCommunity")}
            </Link>
            <Link to="/resources" className="hover:text-healthTeal transition-colors font-medium text-sm">
              {t("header.forClinicians")}
            </Link>
            
            {/* Education Dropdown */}
            <div className="relative">
              <button
                onClick={toggleEducationMenu}
                className="flex items-center space-x-1 hover:text-healthTeal transition-colors font-medium text-sm"
              >
                <span>{t("header.education")}</span>
                <ChevronDown size={14} />
              </button>
              
              {educationMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <Link
                    to="/diseases"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setEducationMenuOpen(false)}
                  >
                    {t("header.diseases")}
                  </Link>
                  <Link
                    to="/webinars"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setEducationMenuOpen(false)}
                  >
                    {t("header.webinars")}
                  </Link>
                </div>
              )}
            </div>
            
            {/* Contact Dropdown */}
            <div className="relative">
              <button
                onClick={() => setContactMenuOpen(!contactMenuOpen)}
                className="flex items-center space-x-1 hover:text-healthTeal transition-colors font-medium text-sm"
              >
                <span>{t("header.contact")}</span>
                <ChevronDown size={14} />
              </button>
              
              {contactMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <Link
                    to="/contact"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setContactMenuOpen(false)}
                  >
                    {t("header.contactUs")}
                  </Link>
                  <Link
                    to="/support-us"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setContactMenuOpen(false)}
                  >
                    {t("header.supportUs")}
                  </Link>
                </div>
              )}
            </div>
            
            {/* Physician Directory Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPhysicianMenuOpen(!physicianMenuOpen)}
                className="flex items-center space-x-1 hover:text-healthTeal transition-colors font-medium text-sm"
              >
                <span>{t("header.physicianDirectory")}</span>
                <ChevronDown size={14} />
              </button>
              
              {physicianMenuOpen && (
                 <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                   <Link
                     to="/physician-directory"
                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                     onClick={() => setPhysicianMenuOpen(false)}
                   >
                     {t("header.findHealthcareWorkers")}
                   </Link>
                   <Link
                     to="/physicians/family"
                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                     onClick={() => setPhysicianMenuOpen(false)}
                   >
                     {t("header.familyPhysician")}
                   </Link>
                   <Link
                     to="/physicians/family/cities"
                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-xs"
                     onClick={() => setPhysicianMenuOpen(false)}
                   >
                     {language === 'ar' ? 'تصفح حسب المدينة' : 'Browse by City'}
                   </Link>
                 </div>
              )}
            </div>
          </nav>
          
          {/* Language Selector - Right Side */}
          <div className="hidden lg:flex items-center">
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-healthTeal transition-colors"
                aria-label="Select language"
              >
                <Languages size={16} />
                <span>{currentLanguage?.flag}</span>
                <ChevronDown size={14} />
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg py-1 z-50 border">
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
          </div>
          
          {/* Mobile Language & Menu Button */}
          <div className="lg:hidden flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center space-x-1.5 px-3 py-2.5 rounded-md hover:bg-healthTeal transition-colors min-h-[44px] touch-manipulation"
                aria-label="Select language"
              >
                <Languages size={18} />
                <span className="text-base">{currentLanguage?.flag}</span>
                <ChevronDown size={14} />
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-healthDarkBlue rounded-md shadow-lg py-2 z-50 border border-white/20">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setLanguageMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-healthTeal flex items-center space-x-3 min-h-[44px] touch-manipulation ${
                        language === lang.code ? 'bg-healthTeal text-white' : 'text-white hover:text-white'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Menu Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-white p-3 hover:bg-healthTeal/20 rounded-md transition-colors min-h-[44px] min-w-[44px] touch-manipulation flex items-center justify-center" aria-label="Toggle menu">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-healthDarkBlue text-white border-l border-white/10 p-0">
                <SheetHeader className="p-6 pb-4">
                  <SheetTitle className="text-white text-left text-xl">Menu</SheetTitle>
                  <SheetDescription className="text-white/70 text-left">
                    Navigate through our pages
                  </SheetDescription>
                </SheetHeader>
                <nav className="px-4 pb-6 space-y-2 overflow-y-auto">
                  <Link to="/" className="block py-4 px-4 rounded-md hover:bg-healthTeal/20 transition-colors font-medium border-b border-white/10 min-h-[56px] flex items-center touch-manipulation">
                    {t("header.home")}
                  </Link>
                  <Link to="/about" className="block py-4 px-4 rounded-md hover:bg-healthTeal/20 transition-colors font-medium border-b border-white/10 min-h-[56px] flex items-center touch-manipulation">
                    {t("header.aboutUs")}
                  </Link>
                  <Link to="/services" className="block py-4 px-4 rounded-md hover:bg-healthTeal/20 transition-colors font-medium border-b border-white/10 min-h-[56px] flex items-center touch-manipulation">
                    {t("header.forCommunity")}
                  </Link>
                  <Link to="/resources" className="block py-4 px-4 rounded-md hover:bg-healthTeal/20 transition-colors font-medium border-b border-white/10 min-h-[56px] flex items-center touch-manipulation">
                    {t("header.forClinicians")}
                  </Link>
                  
                  {/* Education Section */}
                  <div className="py-4 px-4 border-b border-white/10">
                    <div className="text-healthTeal font-semibold mb-4 text-base">{t("header.education")}</div>
                    <div className="ml-2 space-y-2">
                      <Link to="/diseases" className="block py-3 px-3 hover:bg-healthTeal/20 rounded-md transition-colors min-h-[48px] flex items-center touch-manipulation">
                        {t("header.diseases")}
                      </Link>
                      <Link to="/webinars" className="block py-3 px-3 hover:bg-healthTeal/20 rounded-md transition-colors min-h-[48px] flex items-center touch-manipulation">
                        {t("header.webinars")}
                      </Link>
                    </div>
                  </div>
                  
                  {/* Contact Section */}
                  <div className="py-4 px-4 border-b border-white/10">
                    <div className="text-healthTeal font-semibold mb-4 text-base">{t("header.contact")}</div>
                    <div className="ml-2 space-y-2">
                      <Link to="/contact" className="block py-3 px-3 hover:bg-healthTeal/20 rounded-md transition-colors min-h-[48px] flex items-center touch-manipulation">
                        {t("header.contactUs")}
                      </Link>
                      <Link to="/support-us" className="block py-3 px-3 hover:bg-healthTeal/20 rounded-md transition-colors min-h-[48px] flex items-center touch-manipulation">
                        {t("header.supportUs")}
                      </Link>
                    </div>
                  </div>
                  
                  {/* Physician Directory Section */}
                  <div className="py-4 px-4">
                    <div className="text-healthTeal font-semibold mb-4 text-base">{t("header.physicianDirectory")}</div>
                    <div className="ml-2 space-y-2">
                       <Link to="/physician-directory" className="block py-3 px-3 hover:bg-healthTeal/20 rounded-md transition-colors min-h-[48px] flex items-center touch-manipulation">
                         {t("header.findHealthcareWorkers")}
                      </Link>
                      <Link to="/family-physician" className="block py-3 px-3 hover:bg-healthTeal/20 rounded-md transition-colors min-h-[48px] flex items-center touch-manipulation">
                        {t("header.familyPhysician")}
                      </Link>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
