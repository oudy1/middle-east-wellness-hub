import { useState } from 'react';
import { Menu, Languages, ChevronDown, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeaderSearchButton } from "@/components/ResourceFinder";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

// SHAMS_LOGO_PRIMARY - Do not change this logo path
const SHAMS_LOGO_PRIMARY = "/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png";

type DesktopLink = { to: string; label: string };
type DrawerLink = { to: string; label: string };
type DrawerGroup = { label: string; children: DrawerLink[] };
type DrawerItem = DrawerLink | DrawerGroup;

const isGroup = (item: DrawerItem): item is DrawerGroup =>
  (item as DrawerGroup).children !== undefined;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [desktopEducationOpen, setDesktopEducationOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const isRTL = language === "ar";

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ku', name: 'کوردی', flag: '' },
    { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
  ];
  const currentLanguage = languages.find(lang => lang.code === language);

  // Desktop links — keep concise per spec
  const desktopLinks: DesktopLink[] = [
    { to: "/", label: t("header.home") },
    { to: "/about", label: t("header.aboutUs") },
    { to: "/services", label: isRTL ? "الخدمات" : "Services" },
    { to: "/programs", label: isRTL ? "البرامج" : "Programs" },
    { to: "/research", label: isRTL ? "البحث" : "Research" },
    // Education has a small dropdown on desktop
    { to: "/recordings", label: isRTL ? "التسجيلات" : "Recordings" },
    { to: "/physician-directory", label: t("header.findHealthcareWorkers") },
    { to: "/contact", label: t("header.contact") },
  ];

  const educationLinks: DrawerLink[] = [
    { to: "/webinars", label: isRTL ? "ندوات عبر الإنترنت" : "Webinars" },
    { to: "/recordings", label: isRTL ? "التسجيلات" : "Recordings" },
    { to: "/diseases", label: t("header.diseases") },
    { to: "/faq", label: t("footer.faq") },
    { to: "/glossary", label: t("common.glossary") },
  ];

  // Mobile drawer structure (per spec)
  const drawerItems: DrawerItem[] = [
    { to: "/", label: t("header.home") },
    { to: "/about", label: t("header.aboutUs") },
    { to: "/services", label: isRTL ? "الخدمات" : "Services" },
    {
      label: isRTL ? "الموارد" : "Resources",
      children: [
        { to: "/programs", label: isRTL ? "البرامج" : "Programs" },
        { to: "/resources", label: isRTL ? "حقوق المريض" : "Patient Rights" },
        { to: "/services", label: isRTL ? "خدمات المجتمع" : "Community Services" },
      ],
    },
    {
      label: isRTL ? "البحث" : "Research",
      children: [
        { to: "/research", label: isRTL ? "الدراسات البحثية" : "Research Studies" },
        { to: "/research", label: isRTL ? "الفرص البحثية" : "Research Opportunities" },
        { to: "/research", label: isRTL ? "الباحثون المرتبطون بشمس" : "Researchers Associated with SHAMS" },
        { to: "/research", label: isRTL ? "المؤتمرات والعروض" : "Conferences & Presentations" },
      ],
    },
    {
      label: isRTL ? "التعليم" : "Education",
      children: [
        { to: "/webinars", label: isRTL ? "ندوات عبر الإنترنت" : "Webinars" },
        { to: "/recordings", label: isRTL ? "التسجيلات" : "Recordings" },
        { to: "/resources", label: isRTL ? "مواضيع أسبوعية" : "Weekly Topics" },
      ],
    },
    {
      label: t("header.findHealthcareWorkers"),
      children: [
        { to: "/physicians/family", label: isRTL ? "أطباء الأسرة" : "Family Physicians" },
        { to: "/physician-directory", label: isRTL ? "العاملون في الرعاية الصحية" : "Healthcare Workers" },
        { to: "/physicians/family/cities", label: isRTL ? "التصفح حسب المدينة" : "Browse by City" },
      ],
    },
    { to: "/contact", label: t("header.contact") },
  ];

  const closeDrawer = () => setMobileMenuOpen(false);
  const isActive = (to: string) => location.pathname === to;

  return (
    <header
      className="bg-healthDarkBlue text-white sticky top-0 z-50 w-full shadow-lg border-b border-healthTeal/20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between h-12 sm:h-auto gap-2">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center gap-3 sm:gap-4">
              <img
                src={SHAMS_LOGO_PRIMARY}
                alt="SHAMS Logo"
                width={64}
                height={64}
                loading="eager"
                decoding="async"
                fetchPriority="high"
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
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-6 mx-6">
            {desktopLinks.slice(0, 5).map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                className={cn(
                  "hover:text-healthTeal transition-colors font-medium text-sm whitespace-nowrap",
                  isActive(link.to) && "text-healthTeal"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Education dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDesktopEducationOpen(true)}
              onMouseLeave={() => setDesktopEducationOpen(false)}
            >
              <button
                onClick={() => setDesktopEducationOpen((v) => !v)}
                className="flex items-center gap-1 hover:text-healthTeal transition-colors font-medium text-sm"
                aria-haspopup="menu"
                aria-expanded={desktopEducationOpen}
              >
                <span>{t("header.education")}</span>
                <ChevronDown size={14} />
              </button>
              {desktopEducationOpen && (
                <div className={cn(
                  "absolute top-full mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border",
                  isRTL ? "right-0" : "left-0"
                )}>
                  {educationLinks.map((l) => (
                    <Link
                      key={l.to + l.label}
                      to={l.to}
                      className={cn(
                        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                        isRTL ? "text-right" : "text-left"
                      )}
                      onClick={() => setDesktopEducationOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {desktopLinks.slice(5).map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                className={cn(
                  "hover:text-healthTeal transition-colors font-medium text-sm whitespace-nowrap",
                  isActive(link.to) && "text-healthTeal"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: desktop search + language */}
          <div className="hidden lg:flex items-center gap-4">
            <HeaderSearchButton variant="desktop" />
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-healthTeal transition-colors"
                aria-label="Select language"
                aria-expanded={languageMenuOpen}
              >
                <Languages size={16} />
                <span>{currentLanguage?.flag}</span>
                <ChevronDown size={14} />
              </button>
              {languageMenuOpen && (
                <div className={cn(
                  "absolute mt-2 w-44 bg-white rounded-md shadow-lg py-1 z-50 border",
                  isRTL ? "left-0" : "right-0"
                )}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setLanguageMenuOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2",
                        isRTL ? "text-right flex-row-reverse" : "text-left",
                        language === lang.code ? 'bg-healthTeal text-white' : 'text-gray-700'
                      )}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile / tablet: search + hamburger */}
          <div className="lg:hidden flex items-center gap-1 sm:gap-2">
            <HeaderSearchButton variant="mobile" />

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="text-white p-3 hover:bg-healthTeal/20 rounded-md transition-colors min-h-[44px] min-w-[44px] touch-manipulation flex items-center justify-center"
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent
                side={isRTL ? "left" : "right"}
                className="w-full sm:w-[340px] bg-healthDarkBlue text-white border-l border-white/10 p-0 flex flex-col [&>button]:hidden"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <SheetHeader className="p-5 pb-3 border-b border-white/10 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <SheetTitle className={cn(
                      "text-white text-xl",
                      isRTL ? "text-right" : "text-left"
                    )}>
                      {t("common.menu") || (isRTL ? "القائمة" : "Menu")}
                    </SheetTitle>
                    <SheetClose
                      aria-label="Close menu"
                      className="p-2 rounded-md hover:bg-healthTeal/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <X size={22} />
                    </SheetClose>
                  </div>
                </SheetHeader>

                <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-3 space-y-1">
                  {drawerItems.map((item, idx) => {
                    if (!isGroup(item)) {
                      return (
                        <Link
                          key={item.to + idx}
                          to={item.to}
                          onClick={closeDrawer}
                          className={cn(
                            "block py-3 px-4 rounded-md hover:bg-healthTeal/20 transition-colors font-medium min-h-[48px] flex items-center touch-manipulation",
                            isRTL ? "text-right" : "text-left",
                            isActive(item.to) && "bg-healthTeal/30 text-white"
                          )}
                        >
                          {item.label}
                        </Link>
                      );
                    }
                    return (
                      <Collapsible key={item.label + idx}>
                        <CollapsibleTrigger
                          className={cn(
                            "group w-full flex items-center justify-between py-3 px-4 rounded-md hover:bg-healthTeal/20 transition-colors font-medium min-h-[48px] touch-manipulation",
                            isRTL && "flex-row-reverse"
                          )}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={18}
                            className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent className={cn(
                          "overflow-hidden",
                          isRTL ? "pr-4" : "pl-4"
                        )}>
                          <div className="py-1 space-y-1 border-l-2 border-healthTeal/30 ml-2">
                            {item.children.map((child, i) => (
                              <Link
                                key={child.to + child.label + i}
                                to={child.to}
                                onClick={closeDrawer}
                                className={cn(
                                  "block py-2.5 px-4 rounded-md hover:bg-healthTeal/20 transition-colors text-sm min-h-[44px] flex items-center touch-manipulation",
                                  isRTL ? "text-right" : "text-left"
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </nav>

                {/* Language toggle in drawer footer */}
                <div className="border-t border-white/10 p-4 flex-shrink-0">
                  <div className={cn(
                    "text-xs uppercase tracking-wider text-white/60 mb-2",
                    isRTL ? "text-right" : "text-left"
                  )}>
                    <Languages size={14} className="inline mr-1" />
                    {isRTL ? "اللغة" : "Language"}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as any)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2.5 rounded-md text-sm transition-colors min-h-[44px] touch-manipulation",
                          isRTL ? "flex-row-reverse text-right" : "text-left",
                          language === lang.code
                            ? "bg-healthTeal text-white"
                            : "bg-white/5 hover:bg-white/10 text-white"
                        )}
                      >
                        <span>{lang.flag}</span>
                        <span className="truncate">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
