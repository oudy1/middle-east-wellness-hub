import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { HERO_LINKS, HERO_QUICK_KEYS, homeRoute } from "@/lib/homeLinks";
// SHAMS_LOGO_PRIMARY - Do not change this logo path
const SHAMS_LOGO_PRIMARY = "/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png";

const copy = {
  en: {
    title: "A Brighter Path to Health.",
    sub: "Healthcare education, guidance and opportunity for Middle Eastern and North African societies across Canada.",
    primary: "Explore Health Resources",
    secondary: "Discover SHAMS",
    quickLabel: "Main sections",
    quick: ["Health Resources", "Programs and Mentorship", "Healthcare Workers", "Research"],
  },
  ar: {
    title: "طريق أكثر إشراقا نحو الصحة.",
    sub: "تثقيف صحي وإرشاد وفرص للمجتمعات الشرق أوسطية وشمال الأفريقية في جميع أنحاء كندا.",
    primary: "استكشف الموارد الصحية",
    secondary: "تعرّف على شمس",
    quickLabel: "الأقسام الرئيسية",
    quick: ["الموارد الصحية", "البرامج والإرشاد", "العاملون في الرعاية الصحية", "البحث"],
  },
};

/** Decorative sunrise: rises once on load, then rests. */
const Sunrise = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(var(--sun-gold))" />
        <stop offset="100%" stopColor="hsl(var(--sun-orange))" />
      </radialGradient>
      <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(var(--sun-gold) / 0.55)" />
        <stop offset="100%" stopColor="hsl(var(--sun-gold) / 0)" />
      </radialGradient>
      <clipPath id="horizon"><rect x="0" y="0" width="400" height="240" /></clipPath>
    </defs>
    <g clipPath="url(#horizon)">
      <g className="sun-rise">
        <circle cx="200" cy="230" r="170" fill="url(#sunGlow)" />
        <g className="sun-rays" stroke="hsl(var(--sun-orange) / 0.55)" strokeWidth="3" strokeLinecap="round">
          {Array.from({ length: 11 }, (_, i) => {
            const a = Math.PI * (i / 10);
            const x1 = 200 - Math.cos(a) * 100, y1 = 230 - Math.sin(a) * 100;
            const x2 = 200 - Math.cos(a) * 140, y2 = 230 - Math.sin(a) * 140;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
        <circle cx="200" cy="230" r="82" fill="url(#sunCore)" />
      </g>
    </g>
    <path d="M0 240 H400" stroke="hsl(var(--sun-blue) / 0.35)" strokeWidth="2" />
    <path d="M40 262 H360 M100 282 H300" stroke="hsl(var(--sun-teal) / 0.2)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const HeroSection = forwardRef<HTMLElement>((_, ref) => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const c = isAr ? copy.ar : copy.en;

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "var(--gradient-sunrise)" }}>
      <div className="container mx-auto px-4 py-10 md:py-14 grid gap-6 md:grid-cols-2 md:items-center">
        <div className={`relative z-10 text-center md:text-start ${isAr ? "font-cairo" : ""}`}>
          <img
            src={SHAMS_LOGO_PRIMARY}
            alt="SHAMS Logo"
            width={256}
            height={256}
            loading="eager"
            decoding="async"
            className="h-28 w-28 md:h-36 md:w-36 object-contain mx-auto md:mx-0 mb-4 rise-in"
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sun-blue leading-tight mb-4 rise-in" style={{ animationDelay: "80ms" }}>
            {c.title}
          </h1>
          <p className="text-base md:text-lg text-sun-teal/90 mb-6 max-w-xl mx-auto md:mx-0 rise-in" style={{ animationDelay: "200ms" }}>
            {c.sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button asChild size="lg" className="group min-h-11 bg-sun-blue text-sun-cream hover:bg-sun-teal shadow-[var(--shadow-sun)] rise-in" style={{ animationDelay: "320ms" }}>
              <Link to={homeRoute(HERO_LINKS.primary)}>
                {c.primary}
                <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1 rtl:rotate-180 rtl:motion-safe:group-hover:-translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-11 border-sun-blue/40 bg-sun-cream/70 text-sun-blue hover:bg-sun-cream rise-in" style={{ animationDelay: "420ms" }}>
              <Link to={homeRoute(HERO_LINKS.secondary)}>{c.secondary}</Link>
            </Button>
          </div>
          <nav aria-label={c.quickLabel} data-testid="hero-quick-links" className="mt-4 rise-in" style={{ animationDelay: "500ms" }}>
            <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
              {HERO_QUICK_KEYS.map((key, i) => (
                <li key={key}>
                  <Link
                    to={homeRoute(key)}
                    className="inline-flex items-center min-h-[44px] px-3.5 rounded-full border border-sun-blue/25 bg-sun-cream/80 text-sm font-medium text-sun-blue hover:bg-sun-cream hover:border-sun-orange/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange"
                  >
                    {c.quick[i]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 opacity-40 md:static md:h-72 md:opacity-100 pointer-events-none">
          <Sunrise />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
