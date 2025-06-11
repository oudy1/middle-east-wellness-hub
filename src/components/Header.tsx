
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
    <header className="bg-healthDarkBlue text-white relative z-50">
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
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-3">
              <NavigationMenuItem>
                <Link to="/" className="hover:text-healthTeal transition-colors px-3 py-2">
                  {t("header.home")}
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white hover:text-white px-3 py-2">
                  {t("header.aboutUs")}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[200px] z-50">
                  <div className="p-2">
                    <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Our Story
                    </Link>
                    <Link to="/about#mission" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Mission & Vision
                    </Link>
                    <Link to="/about#team" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Our Team
                    </Link>
                    <Link to="/about#impact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Our Impact
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white hover:text-white px-3 py-2">
                  {t("header.forCommunity")}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[200px] z-50">
                  <div className="p-2">
                    <Link to="/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Community Resources
                    </Link>
                    <Link to="/services#events" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Events & Workshops
                    </Link>
                    <Link to="/services#support" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Support Groups
                    </Link>
                    <Link to="/physician-directory" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Find Physicians
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white hover:text-white px-3 py-2">
                  {t("header.forClinicians")}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[200px] z-50">
                  <div className="p-2">
                    <Link to="/resources" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Research Opportunities
                    </Link>
                    <Link to="/resources#materials" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Educational Materials
                    </Link>
                    <Link to="/resources#platform" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Research Platform
                    </Link>
                    <Link to="/physician-application" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Join Our Network
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white hover:text-white px-3 py-2">
                  {t("header.diseases")}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[200px] z-50">
                  <div className="p-2">
                    <Link to="/diseases" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      All Diseases
                    </Link>
                    <Link to="/diseases#cardiovascular" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Cardiovascular
                    </Link>
                    <Link to="/diseases#mental-health" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Mental Health
                    </Link>
                    <Link to="/diseases#diabetes" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Diabetes
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white hover:text-white px-3 py-2">
                  Contact
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[200px] z-50">
                  <div className="p-2">
                    <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Contact Us
                    </Link>
                    <Link to="/contact#inquiry" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      General Inquiry
                    </Link>
                    <Link to="/contact#support" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Support Request
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white hover:text-white px-3 py-2">
                  {t("header.webinars")}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[200px] z-50">
                  <div className="p-2">
                    <Link to="/webinars" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      All Webinars
                    </Link>
                    <Link to="/webinars#upcoming" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Upcoming Events
                    </Link>
                    <Link to="/webinars#archive" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Past Recordings
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
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
