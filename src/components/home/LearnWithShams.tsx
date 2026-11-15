import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { homeRoute } from "@/lib/homeLinks";

/** One heading + one "View All Recordings" link around the homepage learning cards. */
export default function LearnWithShams({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return (
    <section aria-labelledby="learn-title" className="bg-background pt-10 md:pt-14">
      <div className={`container mx-auto px-4 flex flex-wrap items-end justify-between gap-3 ${isAr ? "font-cairo" : ""}`}>
        <div>
          <h2 id="learn-title" className="text-2xl md:text-3xl font-bold text-sun-blue">{isAr ? "تعلّم مع شمس" : "Learn with SHAMS"}</h2>
          <p className="text-sm text-muted-foreground">{isAr ? "تسجيلات ومواد تثقيفية من ندواتنا." : "Recordings and materials from our webinars."}</p>
        </div>
        <Button asChild variant="outline" className="min-h-11 border-sun-orange/50 text-sun-blue">
          <Link to={homeRoute("recordings")}>{isAr ? "عرض كل التسجيلات" : "View All Recordings"}</Link>
        </Button>
      </div>
      {children}
    </section>
  );
}
