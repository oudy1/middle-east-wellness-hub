import { Link } from "react-router-dom";
import { BookOpen, Compass, Stethoscope, Users, FlaskConical, PlayCircle, ArrowUpRight, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BENTO_KEYS, homeRoute } from "@/lib/homeLinks";
import { useReveal } from "./useReveal";

type Item = { key: (typeof BENTO_KEYS)[number]; icon: LucideIcon; span: string; en: [string, string]; ar: [string, string] };

const ITEMS: Item[] = [
  { key: "resources", icon: BookOpen, span: "md:col-span-2 md:row-span-2", en: ["Health Resources", "Arabic and English educational resources in one verified directory."], ar: ["الموارد الصحية", "موارد تثقيفية بالعربية والإنجليزية في دليل موثوق واحد."] },
  { key: "newcomer_initiative", icon: Compass, span: "", en: ["Newcomer Support", "Learn how healthcare coverage works and how to navigate it."], ar: ["دعم القادمين الجدد", "تعرّف على التغطية الصحية وكيفية التنقل في النظام الصحي."] },
  { key: "healthcare_workers", icon: Stethoscope, span: "", en: ["Find Healthcare Workers", "Search healthcare professionals by city or specialty."], ar: ["ابحث عن مقدمي الرعاية", "ابحث عن مختصين صحيين حسب المدينة أو التخصص."] },
  { key: "mentorship", icon: Users, span: "", en: ["Mentorship", "Connecting students with healthcare professionals."], ar: ["الإرشاد", "نربط الطلاب بمختصين في المجال الصحي."] },
  { key: "research", icon: FlaskConical, span: "", en: ["Research", "Studies, research opportunities and affiliated researchers."], ar: ["البحث العلمي", "دراسات وفرص بحثية وباحثون متعاونون."] },
  { key: "recordings", icon: PlayCircle, span: "md:col-span-2", en: ["Webinars & Learning", "Watch our educational webinar recordings and materials."], ar: ["الندوات والتعلّم", "شاهد تسجيلات ندواتنا التثقيفية وموادها."] },
];

export default function HelpBentoGrid() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const ref = useReveal<HTMLDivElement>();
  return (
    <section aria-labelledby="help-grid-title" className="bg-sun-cream py-6 md:py-14">
      <div ref={ref} className={`reveal container mx-auto px-4 ${isAr ? "font-cairo" : ""}`}>
        <h2 id="help-grid-title" className="text-2xl md:text-3xl font-bold text-sun-blue mb-4 md:mb-6 text-center md:text-start">
          {isAr ? "كيف يمكن لشمس أن تساعدك؟" : "What can SHAMS help you with?"}
        </h2>
        <ul className="grid gap-2.5 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[minmax(150px,auto)]">
          {ITEMS.map(({ key, icon: Icon, span, en, ar }, i) => {
            const [title, desc] = isAr ? ar : en;
            const big = i === 0;
            return (
              <li key={key} className={span}>
                <Link
                  to={homeRoute(key)}
                  data-bento-key={key}
                  className={`group relative flex h-full min-h-[44px] flex-row items-center gap-3 p-3.5 md:flex-col md:justify-between md:gap-4 md:p-5 overflow-hidden rounded-2xl border border-sun-orange/20 transition-[transform,box-shadow,border-color] duration-200 hover:border-sun-orange/60 hover:shadow-[var(--shadow-sun)] motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange focus-visible:ring-offset-2 ${big ? "text-sun-cream" : "bg-background text-sun-blue"}`}
                  style={big ? { background: "linear-gradient(150deg, hsl(var(--sun-blue)), hsl(var(--sun-teal)))" } : undefined}
                >
                  <span aria-hidden="true" className="pointer-events-none absolute -end-10 -top-10 h-32 w-32 rounded-full bg-sun-gold/20 blur-2xl transition-opacity opacity-60 group-hover:opacity-100" />
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:rotate-3 ${big ? "bg-sun-gold/20 text-sun-gold" : "bg-sun-peach/60 text-sun-orange"}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span>
                    <span className={`flex items-center gap-1 font-semibold ${big ? "text-2xl" : "text-lg"}`}>
                      {title}
                      <ArrowUpRight className="h-4 w-4 opacity-60 rtl:-scale-x-100" aria-hidden="true" />
                    </span>
                    <span className={`mt-1 block text-sm ${big ? "text-sun-cream/85" : "text-muted-foreground"}`}>{desc}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
