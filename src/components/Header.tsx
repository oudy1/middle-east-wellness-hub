
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
    <header className="bg-healthDarkBlue text-white relative z-50 w-full">
      <div className="w-full px-4 py-2">
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
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex items-center space-x-1">
              <NavigationMenuItem>
                <Link to="/" className="hover:text-healthTeal transition-colors px-3 py-2 text-sm rounded-md hover:bg-white/10">
                  {t("header.home")}
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white hover:text-white px-3 py-2 text-sm data-[state=open]:bg-white/10 h-auto">
                  {t("header.aboutUs")}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full bg-white border border-gray-200 shadow-lg min-w-[200px] z-[100] rounded-md mt-0 left-0">
                  <div className="p-1">
                    <Link to="/about" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Our Story
                    </Link>
                    <Link to="/about#mission" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Mission & Vision
                    </Link>
                    <Link to="/about#team" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Our Team
                    </Link>
                    <Link to="/about#impact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Our Impact
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white hover:text-white px-3 py-2 text-sm data-[state=open]:bg-white/10 h-auto">
                  {t("header.forCommunity")}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full bg-white border border-gray-200 shadow-lg min-w-[200px] z-[100] rounded-md mt-0 left-0">
                  <div className="p-1">
                    <Link to="/services" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Community Resources
                    </Link>
                    <Link to="/services#events" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Events & Workshops
                    </Link>
                    <Link to="/services#support" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Support Groups
                    </Link>
                    <Link to="/physician-directory" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Find Physicians
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white hover:text-white px-3 py-2 text-sm data-[state=open]:bg-white/10 h-auto">
                  {t("header.forClinicians")}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full bg-white border border-gray-200 shadow-lg min-w-[200px] z-[100] rounded-md mt-0 left-0">
                  <div className="p-1">
                    <Link to="/resources" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Research Opportunities
                    </Link>
                    <Link to="/resources#materials" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Educational Materials
                    </Link>
                    <Link to="/resources#platform" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Research Platform
                    </Link>
                    <Link to="/physician-application" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Join Our Network
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white hover:text-white px-3 py-2 text-sm data-[state=open]:bg-white/10 h-auto">
                  {t("header.diseases")}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full bg-white border border-gray-200 shadow-lg min-w-[200px] z-[100] rounded-md mt-0 left-0">
                  <div className="p-1">
                    <Link to="/diseases" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      All Diseases
                    </Link>
                    <Link to="/diseases#cardiovascular" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Cardiovascular
                    </Link>
                    <Link to="/diseases#mental-health" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Mental Health
                    </Link>
                    <Link to="/diseases#diabetes" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Diabetes
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white hover:text-white px-3 py-2 text-sm data-[state=open]:bg-white/10 h-auto">
                  Contact
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full bg-white border border-gray-200 shadow-lg min-w-[200px] z-[100] rounded-md mt-0 left-0">
                  <div className="p-1">
                    <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Contact Us
                    </Link>
                    <Link to="/contact#inquiry" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      General Inquiry
                    </Link>
                    <Link to="/contact#support" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Support Request
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white hover:text-white px-3 py-2 text-sm data-[state=open]:bg-white/10 h-auto">
                  {t("header.webinars")}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full bg-white border border-gray-200 shadow-lg min-w-[200px] z-[100] rounded-md mt-0 left-0">
                  <div className="p-1">
                    <Link to="/webinars" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      All Webinars
                    </Link>
                    <Link to="/webinars#upcoming" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Upcoming Events
                    </Link>
                    <Link to="/webinars#archive" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                      Past Recordings
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
