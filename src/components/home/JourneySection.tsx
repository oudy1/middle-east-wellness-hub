import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Route, Network, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { JOURNEY_KEYS, homeRoute } from "@/lib/homeLinks";

type Step = { icon: LucideIcon; key: (typeof JOURNEY_KEYS)[number]; en: [string, string, string]; ar: [string, string, string] };
const STEPS: Step[] = [
  { icon: FileText, key: "educational_materials", en: ["Understand Your Healthcare Options", "Clear health education in English and Arabic to help you understand how care works in Canada.", "Browse materials"], ar: ["افهم خياراتك الصحية", "تثقيف صحي واضح بالعربية والإنجليزية لتفهم كيف تعمل الرعاية الصحية في كندا.", "تصفح المواد"] },
  { icon: Route, key: "healthcare_workers", en: ["Find Resources and Guidance", "Discover healthcare workers, patient rights information and newcomer supports.", "Find healthcare workers"], ar: ["اعثر على الموارد والإرشاد", "اكتشف مقدمي الرعاية ومعلومات حقوق المرضى وخدمات دعم القادمين الجدد.", "ابحث عن مقدمي الرعاية"] },
  { icon: Network, key: "programs", en: ["Connect with Your Community", "Join mentorship, research opportunities and community learning.", "Explore programs"], ar: ["تواصل مع مجتمعك", "انضم إلى الإرشاد والفرص البحثية والتعلم المجتمعي.", "استكشف البرامج"] },
];

/** Scroll-drawn gold path through three steps. Static when motion is reduced. */
export default function JourneySection() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const wrap = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(1);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setAnimated(true);
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.max(0, Math.min(1, (vh * 0.75 - r.top) / (r.height * 0.9))));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const active = Math.min(2, Math.floor(p * 3));
  const bg = p < 0.5 ? "hsl(var(--sun-cream))" : p < 0.85 ? "hsl(var(--sun-gold) / 0.18)" : "hsl(var(--sun-sky))";

  return (
    <section aria-labelledby="journey-title" className="py-10 md:py-14 transition-colors duration-700" style={{ background: bg }}>
      <div className={`container mx-auto px-4 ${isAr ? "font-cairo" : ""}`}>
        <p className="text-sm font-semibold uppercase tracking-wide text-sun-orange text-center">{isAr ? "رحلتك مع شمس" : "Your Journey with SHAMS"}</p>
        <h2 id="journey-title" className="text-2xl md:text-3xl font-bold text-sun-blue text-center mb-8">
          {isAr ? "من الأسئلة إلى الوضوح" : "From Questions to Clarity"}
        </h2>
        <div ref={wrap} className="relative max-w-3xl mx-auto">
          {/* Path: vertical line on the start side, drawn by scroll */}
          <svg aria-hidden="true" className="absolute top-0 bottom-0 start-5 md:start-1/2 h-full w-2 -translate-x-1/2 rtl:translate-x-1/2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100">
            <line x1="1" y1="0" x2="1" y2="100" stroke="hsl(var(--sun-gold) / 0.3)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <line x1="1" y1="0" x2="1" y2="100" stroke="hsl(var(--sun-orange))" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" strokeDashoffset={animated ? 1 - p : 0} />
          </svg>
          {animated && (
            <span aria-hidden="true" className="absolute start-5 md:start-1/2 h-4 w-4 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-gold shadow-[0_0_14px_4px_hsl(var(--sun-gold)/0.7)]" style={{ top: `${p * 100}%` }} />
          )}
          <ol className="space-y-8">
            {STEPS.map(({ icon: Icon, key, en, ar }, i) => {
              const [title, body, cta] = isAr ? ar : en;
              const on = !animated || i <= active;
              const right = i % 2 === 1;
              return (
                <li key={key} data-journey-step={i + 1} className={`relative ps-14 md:ps-0 md:w-1/2 ${right ? "md:ms-auto md:ps-10" : "md:pe-10 md:text-end"}`}>
                  <span aria-hidden="true" className={`absolute start-5 top-2 h-3 w-3 -translate-x-1/2 rtl:translate-x-1/2 rounded-full md:hidden ${on ? "bg-sun-orange" : "bg-sun-gold/40"}`} />
                  <div className={`rounded-2xl border bg-background p-5 transition-[opacity,transform,border-color] duration-500 ${on ? "opacity-100 translate-y-0 border-sun-orange/40 shadow-[var(--shadow-sun)]" : "opacity-50 translate-y-2 border-transparent"}`}>
                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sun-peach/70 text-sun-orange mb-3`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <p className="text-xs font-semibold text-sun-orange">{isAr ? `المرحلة ${i + 1}` : `Step ${i + 1}`}</p>
                    <h3 className="text-lg font-semibold text-sun-blue mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{body}</p>
                    <Link to={homeRoute(key)} className="inline-flex min-h-11 items-center font-medium text-sun-teal underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange rounded">
                      {cta}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
