
import { useState, useCallback } from 'react';
import { Menu, Languages, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeaderSearchButton } from "@/components/ResourceFinder";
import navigationData from "../../content/navigation.json";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// SHAMS_LOGO_PRIMARY - Do not change this logo path
const SHAMS_LOGO_PRIMARY = "/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png";

type NavItem = {
  labelKey: string;
  path?: string;
  children?: NavItem[];
};

const { mainNav, languages: langOptions } = navigationData as {
  mainNav: NavItem[];
  languages: { code: string; name: string; flag: string }[];
};

const Header = () => {
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  const toggleDropdown = useCallback((key: string) => {
    setOpenDropdown(prev => (prev === key ? null : key));
  }, []);

  const closeDropdown = useCallback(() => setOpenDropdown(null), []);

  const currentLanguage = langOptions.find(lang => lang.code === language);

  const renderDesktopItem = (item: NavItem) => {
    if (!item.children) {
      return (
        <Link key={item.labelKey} to={item.path!} className="hover:text-healthTeal transition-colors font-medium text-sm">
          {t(item.labelKey)}
        </Link>
      );
    }

    return (
      <div key={item.labelKey} className="relative">
        <button
          onClick={() => toggleDropdown(item.labelKey)}
          className="flex items-center space-x-1 hover:text-healthTeal transition-colors font-medium text-sm"
        >
          {item.path ? (
            <Link to={item.path} className="hover:text-healthTeal transition-colors font-medium text-sm">
              {t(item.labelKey)}
            </Link>
          ) : (
            <span>{t(item.labelKey)}</span>
          )}
          <ChevronDown size={14} />
        </button>

        {openDropdown === item.labelKey && (
          <div
            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border"
            onMouseLeave={closeDropdown}
          >
            {item.children.map(child => (
              <Link
                key={child.path}
                to={child.path!}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                {t(child.labelKey)}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderMobileItem = (item: NavItem) => {
    if (!item.children) {
      return (
        <Link key={item.labelKey} to={item.path!} className="block py-4 px-4 rounded-md hover:bg-healthTeal/20 transition-colors font-medium border-b border-white/10 min-h-[56px] flex items-center touch-manipulation">
          {t(item.labelKey)}
        </Link>
      );
    }

    return (
      <div key={item.labelKey} className="py-4 px-4 border-b border-white/10">
        <div className="text-healthTeal font-semibold mb-4 text-base">{t(item.labelKey)}</div>
        <div className="ml-2 space-y-2">
          {item.children.map(child => (
            <Link key={child.path} to={child.path!} className="block py-3 px-3 hover:bg-healthTeal/20 rounded-md transition-colors min-h-[48px] flex items-center touch-manipulation">
              {t(child.labelKey)}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const LanguageMenu = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="relative">
      <button
        onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
        className={mobile
          ? "flex items-center space-x-1.5 px-2 py-2.5 rounded-md hover:bg-healthTeal transition-colors min-h-[44px] touch-manipulation"
          : "flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-healthTeal transition-colors"
        }
        aria-label="Select language"
      >
        <Languages size={mobile ? 18 : 16} />
        <span className={mobile ? "text-base" : ""}>{currentLanguage?.flag}</span>
        <ChevronDown size={14} />
      </button>

      {languageMenuOpen && (
        <div className={`absolute right-0 mt-2 w-44 rounded-md shadow-lg z-50 border ${
          mobile ? "bg-healthDarkBlue border-white/20 py-2" : "bg-white py-1"
        }`}>
          {langOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLanguage(lang.code as any); setLanguageMenuOpen(false); }}
              className={mobile
                ? `w-full text-left px-4 py-3 text-sm hover:bg-healthTeal flex items-center space-x-3 min-h-[44px] touch-manipulation ${
                    language === lang.code ? 'bg-healthTeal text-white' : 'text-white hover:text-white'
                  }`
                : `w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                    language === lang.code ? 'bg-healthTeal text-white' : 'text-gray-700'
                  }`
              }
            >
              <span className={mobile ? "text-base" : ""}>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-healthDarkBlue text-white relative z-50 w-full shadow-lg border-b border-healthTeal/20">
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between h-12 sm:h-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center gap-3 sm:gap-4">
              <img
                src={SHAMS_LOGO_PRIMARY}
                alt="SHAMS Logo"
                className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <div className="text-lg sm:text-xl font-bold truncate">
                  {t("footer.title")}
                </div>
                <div className="text-xs text-healthGold opacity-90 hidden sm:block">
                  {t("hero.tagline")}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 space-x-8 mx-8">
            {mainNav.map(renderDesktopItem)}
          </nav>

          {/* Desktop Search + Language */}
          <div className="hidden lg:flex items-center gap-4">
            <HeaderSearchButton variant="desktop" />
            <LanguageMenu />
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-1 sm:space-x-2">
            <HeaderSearchButton variant="mobile" />
            <LanguageMenu mobile />
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-white p-3 hover:bg-healthTeal/20 rounded-md transition-colors min-h-[44px] min-w-[44px] touch-manipulation flex items-center justify-center" aria-label="Toggle menu">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-healthDarkBlue text-white border-l border-white/10 p-0">
                <SheetHeader className="p-6 pb-4">
                  <SheetTitle className="text-white text-left text-xl">{t("common.menu")}</SheetTitle>
                  <SheetDescription className="text-white/70 text-left">
                    {t("common.navigatePages")}
                  </SheetDescription>
                </SheetHeader>
                <nav className="px-4 pb-6 space-y-2 overflow-y-auto">
                  {mainNav.map(renderMobileItem)}
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
