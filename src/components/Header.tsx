import { useState, useRef, useEffect, useCallback } from 'react';
import { Menu, Languages, ChevronDown, X, Search } from "lucide-react";
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

type NavLink = { to: string; label: string };
type NavGroup = { label: string; to?: string; children: NavLink[] };
type NavItem = NavLink | NavGroup;

const isGroup = (item: NavItem): item is NavGroup =>
  (item as NavGroup).children !== undefined;

const CLOSE_DELAY_MS = 300;

interface DesktopDropdownProps {
  item: NavGroup;
  isRTL: boolean;
  isActivePath: (to: string) => boolean;
}

const DesktopDropdown = ({ item, isRTL, isActivePath }: DesktopDropdownProps) => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    clearTimer();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };
  const openNow = () => {
    clearTimer();
    setOpen(true);
  };

  useEffect(() => () => clearTimer(), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isItemActive =
    (item.to && isActivePath(item.to)) ||
    item.children.some((c) => isActivePath(c.to));

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={openNow}
        onFocus={openNow}
        className={cn(
          "flex items-center gap-1 hover:text-healthTealLight transition-colors font-medium text-sm whitespace-nowrap py-2",
          isItemActive && "text-healthTealLight"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span>{item.label}</span>
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && (
        <div
          role="menu"
          onMouseEnter={openNow}
          onMouseLeave={scheduleClose}
          className={cn(
            // small invisible bridge prevents hover gap
            "absolute top-full pt-2 w-60 z-50",
            isRTL ? "right-0" : "left-0"
          )}
        >
          <div className="bg-white rounded-md shadow-lg py-1 border border-gray-200">
            {item.children.map((l) => (
              <Link
                key={l.to + l.label}
                to={l.to}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-healthDarkBlue transition-colors",
                  isRTL ? "text-right" : "text-left",
                  isActivePath(l.to) && "bg-healthTeal/10 text-healthDarkBlue font-medium"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

  // Localized labels
  const L = {
    home: t("header.home"),
    about: t("header.aboutUs"),
    services: isRTL ? "الخدمات" : "Services",
    research: isRTL ? "البحث" : "Research",
    education: t("header.education"),
    findWorkers: t("header.findHealthcareWorkers"),
    contact: t("header.contact"),
    resources: isRTL ? "الموارد" : "Resources",
    programs: isRTL ? "البرامج" : "Programs",
    patientRights: isRTL ? "حقوق المريض" : "Patient Rights",
    communityServices: isRTL ? "خدمات المجتمع" : "Community Services",
    researchStudies: isRTL ? "الدراسات البحثية" : "Research Studies",
    researchOpps: isRTL ? "الفرص البحثية" : "Research Opportunities",
    associatedResearchers: isRTL ? "الباحثون المرتبطون بشمس" : "Researchers Associated with SHAMS",
    conferences: isRTL ? "المؤتمرات والعروض" : "Conferences & Presentations",
    abstracts: isRTL ? "الملخصات والمنشورات" : "Abstracts & Publications",
    webinars: isRTL ? "ندوات عبر الإنترنت" : "Webinars",
    recordings: isRTL ? "التسجيلات" : "Recordings",
    weeklyTopics: isRTL ? "مواضيع أسبوعية" : "Weekly Topics",
    educationalMaterials: isRTL ? "المواد التعليمية" : "Educational Materials",
    healthcareDirectory: isRTL ? "دليل العاملين في الرعاية الصحية" : "Healthcare Workers Directory",
    familyPhysicians: isRTL ? "أطباء الأسرة" : "Family Physicians",
    browseByCity: isRTL ? "التصفح حسب المدينة" : "Browse by City",
  };

  // Unified nav structure used by both desktop and mobile
  const navItems: NavItem[] = [
    { to: "/", label: L.home },
    { to: "/about", label: L.about },
    {
      label: L.services,
      to: "/services",
      children: [
        { to: "/resources", label: L.resources },
        { to: "/programs", label: L.programs },
        { to: "/resources", label: L.patientRights },
        { to: "/services", label: L.communityServices },
      ],
    },
    {
      label: L.research,
      to: "/research",
      children: [
        { to: "/research", label: L.researchStudies },
        { to: "/research", label: L.researchOpps },
        { to: "/research", label: L.associatedResearchers },
        { to: "/research", label: L.conferences },
        { to: "/research", label: L.abstracts },
      ],
    },
    {
      label: L.education,
      children: [
        { to: "/webinars", label: L.webinars },
        { to: "/recordings", label: L.recordings },
        { to: "/resources", label: L.weeklyTopics },
        { to: "/diseases", label: L.educationalMaterials },
      ],
    },
    {
      label: L.findWorkers,
      to: "/physician-directory",
      children: [
        { to: "/physician-directory", label: L.healthcareDirectory },
        { to: "/physicians/family", label: L.familyPhysicians },
        { to: "/physicians/family/cities", label: L.browseByCity },
      ],
    },
    { to: "/contact", label: L.contact },
  ];

  const closeDrawer = () => setMobileMenuOpen(false);
  const isActivePath = useCallback(
    (to: string) => location.pathname === to,
    [location.pathname]
  );

  // Close language dropdown on outside click / escape
  useEffect(() => {
    if (!languageMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLanguageMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [languageMenuOpen]);

  return (
    <>
      {(() => {
        const isRtlLang = ["ar", "ku", "fa"].includes(language);
        return (
          <a
            href="#main-content"
            dir={isRtlLang ? "rtl" : "ltr"}
            lang={language}
            className={cn(
              "fixed top-2 z-[60] bg-healthDarkBlue text-white px-4 py-2 font-medium text-sm",
              "sr-only focus:not-sr-only focus:inline-flex items-center",
              "transform -translate-y-16 opacity-0 focus:translate-y-0 focus:opacity-100",
              "transition-all duration-300 ease-out motion-reduce:transition-none",
              "border border-healthTeal/30 shadow-lg outline-none focus:ring-2 focus:ring-healthTeal focus:ring-offset-2 focus:ring-offset-healthDarkBlue",
              "rounded-md",
              language === "ar" && "font-cairo",
              isRtlLang ? "right-2 text-right" : "left-2 text-left"
            )}
          >
            {t("common.skipToContent")}
          </a>
        );
      })()}
      <header
        className="bg-healthDarkBlue text-white sticky top-0 z-50 w-full shadow-lg border-b border-healthTeal/20"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div className="flex items-center justify-between h-12 sm:h-auto gap-2">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img
                src={SHAMS_LOGO_PRIMARY}
                alt="SHAMS Logo"
                width={56}
                height={56}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <div className="text-base sm:text-lg font-bold truncate leading-tight">
                  {t("footer.title")}
                </div>
                <div className="text-[11px] text-healthGold opacity-90 hidden sm:block leading-tight">
                  {t("hero.tagline")}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center justify-center flex-1 gap-5 xl:gap-7 mx-4 bg-healthDarkBlue text-white"
            aria-label="Primary"
          >
            {navItems.map((item, idx) => {
              if (isGroup(item)) {
                return (
                  <DesktopDropdown
                    key={item.label + idx}
                    item={item}
                    isRTL={isRTL}
                    isActivePath={isActivePath}
                  />
                );
              }
              return (
                <Link
                  key={item.to + idx}
                  to={item.to}
                  className={cn(
                    "hover:text-healthTealLight transition-colors font-medium text-sm whitespace-nowrap py-2",
                    isActivePath(item.to) && "text-healthTealLight"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side: desktop search icon + language */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Compact search: icon expands to overlay panel */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                className="text-white p-2 hover:bg-healthTeal/20 rounded-md transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label={isRTL ? "بحث" : "Search"}
                aria-expanded={searchOpen}
              >
                <Search size={18} />
              </button>
              {searchOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setSearchOpen(false)}
                    aria-hidden="true"
                  />
                  <div
                    className={cn(
                      "absolute top-full mt-2 z-50 bg-white p-3 rounded-md shadow-lg border border-gray-200 w-80",
                      isRTL ? "left-0" : "right-0"
                    )}
                  >
                    <HeaderSearchButton variant="desktop" />
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-healthTeal/30 transition-colors text-sm"
                aria-label="Select language"
                aria-expanded={languageMenuOpen}
              >
                <Languages size={16} />
                <span>{currentLanguage?.flag}</span>
                <ChevronDown size={14} />
              </button>
              {languageMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLanguageMenuOpen(false)}
                    aria-hidden="true"
                  />
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
                </>
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

                <nav
                  className="flex-1 overflow-y-auto overscroll-contain px-3 py-3 space-y-1"
                  aria-label="Mobile primary"
                >
                  {navItems.map((item, idx) => {
                    if (!isGroup(item)) {
                      return (
                        <Link
                          key={item.to + idx}
                          to={item.to}
                          onClick={closeDrawer}
                          className={cn(
                            "block py-3 px-4 rounded-md hover:bg-healthTeal/20 transition-colors font-medium min-h-[48px] flex items-center touch-manipulation",
                            isRTL ? "text-right" : "text-left",
                            isActivePath(item.to) && "bg-healthTeal/30 text-white"
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
                          <div className={cn(
                            "py-1 space-y-1 border-healthTeal/30",
                            isRTL ? "border-r-2 mr-2" : "border-l-2 ml-2"
                          )}>
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
    </>
  );
};

export default Header;
