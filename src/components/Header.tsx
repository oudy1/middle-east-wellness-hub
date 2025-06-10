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
    <header className="bg-healthDarkBlue text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold mr-8">
              {language === 'ar' ? "شمس" : "SHAMS"}
              <span className="text-sm font-light block md:inline md:ml-2">
                {t("header.home") === "Home" ? 
                  "Supporting Health & Advocacy for Middle Eastern Societies" : 
                  "شمس دعم الصحة والدفاع عن مجتمعات الشرق الأوسط"}
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className={`hover:text-healthTeal transition-colors ${language === 'ar' ? 'ml-3' : ''}`}>
              {t("header.home")}
            </Link>
            <Link to="/about" className={`hover:text-healthTeal transition-colors ${language === 'ar' ? 'ml-3' : ''}`}>
              {t("header.aboutUs")}
            </Link>
            <Link to="/services" className={`hover:text-healthTeal transition-colors ${language === 'ar' ? 'ml-3' : ''}`}>
              {t("header.forCommunity")}
            </Link>
            <Link to="/resources" className={`hover:text-healthTeal transition-colors ${language === 'ar' ? 'ml-3' : ''}`}>
              {t("header.forClinicians")}
            </Link>
            <Link to="/diseases" className={`hover:text-healthTeal transition-colors ${language === 'ar' ? 'ml-3' : ''}`}>
              {t("header.diseases")}
            </Link>
            <Link to="/contact" className={`hover:text-healthTeal transition-colors ${language === 'ar' ? 'ml-3' : ''}`}>
              {t("header.contact")}
            </Link>
            <Link to="/webinars" className={`hover:text-healthTeal transition-colors ${language === 'ar' ? 'ml-3' : ''}`}>
              {t("header.webinars")}
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-healthGold hover:bg-healthGold/80 text-healthDarkBlue border-white hover:border-white flex items-center gap-2"
                >
                  <Globe size={16} />
                  {currentLanguage.nativeName}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as "en" | "ar" | "ku" | "fa" | "tr")}
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  >
                    {lang.nativeName} ({lang.name})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-2">
            <Link to="/" className="block py-2 hover:text-healthTeal transition-colors">
              {t("header.home")}
            </Link>
            <Link to="/about" className="block py-2 hover:text-healthTeal transition-colors">
              {t("header.aboutUs")}
            </Link>
            <Link to="/services" className="block py-2 hover:text-healthTeal transition-colors">
              {t("header.forCommunity")}
            </Link>
            <Link to="/resources" className="block py-2 hover:text-healthTeal transition-colors">
              {t("header.forClinicians")}
            </Link>
            <Link to="/diseases" className="block py-2 hover:text-healthTeal transition-colors">
              {t("header.diseases")}
            </Link>
            <Link to="/contact" className="block py-2 hover:text-healthTeal transition-colors">
              {t("header.contact")}
            </Link>
            <Link to="/webinars" className="block py-2 hover:text-healthTeal transition-colors">
              {t("header.webinars")}
            </Link>
            <div className="pt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-healthGold hover:bg-healthGold/80 text-healthDarkBlue border-white hover:border-white flex items-center gap-2"
                  >
                    <Globe size={16} />
                    {currentLanguage.nativeName}
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as "en" | "ar" | "ku" | "fa" | "tr")}
                      className="cursor-pointer hover:bg-gray-100 px-4 py-2"
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
