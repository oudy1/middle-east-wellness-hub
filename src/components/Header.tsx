
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    language,
    t
  } = useLanguage();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return <header className="bg-healthDarkBlue text-white relative z-50 w-full">
      <div className="w-full py-2 mx-[13px] px-[68px]">
        <div className="flex items-center justify-between max-w-7xl px-[44px] py-[16px] rounded-sm my-0 mx-[10px]">
          {/* Logo - Made bigger and more prominent */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <div>
                <img src="/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png" alt="SHAMS Logo" className="h-20 w-20 object-fill mb-2" />
                <div className="text-2xl font-bold">
                  {language === 'ar' ? "شمس" : "SHAMS"}
                </div>
                <div className="text-sm font-light max-w-xs">
                  {t("header.home") === "Home" ? "Supporting Health & Advocacy" : "دعم الصحة والدفاع"}
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation - Condensed */}
          <nav className="hidden lg:flex items-center space-x-3 text-sm">
            <Link to="/" className="hover:py-2 transition-colors px-2">
              {t("header.home")}
            </Link>
            <Link to="/about" className="hover:text-healthTeal transition-colors px-2">
              {t("header.aboutUs")}
            </Link>
            <Link to="/services" className="hover:text-healthTeal transition-colors px-2">
              {t("header.forCommunity")}
            </Link>
            <Link to="/resources" className="hover:text-healthTeal transition-colors px-2">
              {t("header.forClinicians")}
            </Link>
            <Link to="/diseases" className="hover:text-healthTeal transition-colors px-2">
              {t("header.diseases")}
            </Link>
            <Link to="/contact" className="hover:text-healthTeal transition-colors px-2">
              Contact
            </Link>
            <Link to="/webinars" className="hover:text-healthTeal transition-colors px-2">
              {t("header.webinars")}
            </Link>
            <Link to="/physician-directory" className="hover:text-healthTeal transition-colors px-1">
              Physician Directory
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white flex-shrink-0" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <Menu size={20} />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && <nav className="lg:hidden pt-3 pb-2 space-y-1 max-w-7xl mx-auto">
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
