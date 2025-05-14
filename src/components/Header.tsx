
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'ar' for Arabic
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  return (
    <header className="bg-healthDarkBlue text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold mr-8">
              Middle Eastern Health Initiative
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-healthTeal transition-colors">Home</Link>
            <Link to="/about" className="hover:text-healthTeal transition-colors">About</Link>
            <Link to="/services" className="hover:text-healthTeal transition-colors">Services</Link>
            <Link to="/resources" className="hover:text-healthTeal transition-colors">Resources</Link>
            <Link to="/diseases" className="hover:text-healthTeal transition-colors">Diseases</Link>
            <Link to="/contact" className="hover:text-healthTeal transition-colors">Contact</Link>
          </nav>
          
          <div className="hidden md:flex items-center">
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-healthDarkBlue flex items-center gap-2"
              onClick={toggleLanguage}
            >
              <Globe size={16} />
              {language === 'en' ? 'عربي' : 'English'}
            </Button>
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
            <Link to="/" className="block py-2 hover:text-healthTeal transition-colors">Home</Link>
            <Link to="/about" className="block py-2 hover:text-healthTeal transition-colors">About</Link>
            <Link to="/services" className="block py-2 hover:text-healthTeal transition-colors">Services</Link>
            <Link to="/resources" className="block py-2 hover:text-healthTeal transition-colors">Resources</Link>
            <Link to="/diseases" className="block py-2 hover:text-healthTeal transition-colors">Diseases</Link>
            <Link to="/contact" className="block py-2 hover:text-healthTeal transition-colors">Contact</Link>
            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-white hover:bg-white hover:text-healthDarkBlue flex items-center gap-2"
                onClick={toggleLanguage}
              >
                <Globe size={16} />
                {language === 'en' ? 'عربي' : 'English'}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
