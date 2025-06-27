
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Globe, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'عربي' },
    { code: 'ku', name: 'Kurdish', nativeName: 'کوردی' },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' }
  ];
  
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  
  return (
    <header className="bg-healthDarkBlue text-white relative z-50 w-full">
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              {language === 'ar' ? "شمس" : "SHAMS"}
              <span className="text-xs font-light block">
                {t("header.home") === "Home" ? 
                  "Supporting Health & Advocacy for Middle Eastern Societies" : 
                  "شمس دعم الصحة والدفاع عن مجتمعات الشرق الأوسط"}
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="hover:text-healthTeal transition-colors text-sm">
              {t("header.home")}
            </Link>
            <Link to="/about" className="hover:text-healthTeal transition-colors text-sm">
              {t("header.aboutUs")}
            </Link>
            <Link to="/services" className="hover:text-healthTeal transition-colors text-sm">
              {t("header.forCommunity")}
            </Link>
            <Link to="/resources" className="hover:text-healthTeal transition-colors text-sm">
              {t("header.forClinicians")}
            </Link>
            <Link to="/diseases" className="hover:text-healthTeal transition-colors text-sm">
              {t("header.diseases")}
            </Link>
            <Link to="/contact" className="hover:text-healthTeal transition-colors text-sm">
              Contact
            </Link>
            <Link to="/webinars" className="hover:text-healthTeal transition-colors text-sm">
              {t("header.webinars")}
            </Link>
          </nav>
          
          {/* Language Selector */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-healthGold hover:bg-healthGold/80 text-healthDarkBlue border-white hover:border-white flex items-center gap-1 text-xs h-8"
                >
                  <Globe size={12} />
                  {currentLanguage.nativeName}
                  <ChevronDown size={12} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-[100]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as "en" | "ar" | "ku" | "fa" | "tr")}
                    className="cursor-pointer hover:bg-gray-100 px-3 py-2 text-sm"
                  >
                    {lang.nativeName} ({lang.name})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white flex-shrink-0"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pt-3 pb-2 space-y-1 max-w-7xl mx-auto">
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
            <div className="pt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-healthGold hover:bg-healthGold/80 text-healthDarkBlue border-white hover:border-white flex items-center gap-1 text-xs h-8"
                  >
                    <Globe size={12} />
                    {currentLanguage.nativeName}
                    <ChevronDown size={12} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-[100]">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as "en" | "ar" | "ku" | "fa" | "tr")}
                      className="cursor-pointer hover:bg-gray-100 px-3 py-2 text-sm"
                    >
                      {lang.nativeName} ({lang.name})
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
